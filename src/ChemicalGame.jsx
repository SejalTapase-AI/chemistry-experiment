
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Droplets,
  RotateCw,
  Thermometer,
  Volume2,
  VolumeX,
  Trophy,
  RotateCcw,
  CheckCircle2,
  Hand,
} from "lucide-react";
import "./ChemicalGame.css";

const INGREDIENTS = [
  { id: "water", name: "Distilled Water", amount: "20 mL", color: "#39bdf8", icon: "💧" },
  { id: "oil", name: "Castor Oil", amount: "2 mL", color: "#f5bd48", icon: "🟡" },
  { id: "glycerol", name: "Glycerol", amount: "2 mL", color: "#b79aff", icon: "🧪" },
  { id: "ethanol", name: "Ethanol", amount: "2 mL", color: "#91dfb1", icon: "🫧" },
];

export default function ChemicalGame() {
  const [added, setAdded] = useState([]);
  const [selected, setSelected] = useState(null);
  const [stirred, setStirred] = useState(false);
  const [heated, setHeated] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [message, setMessage] = useState("Drag an ingredient bottle into the beaker!");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const audioRef = useRef(null);

  const playSound = (frequency = 600) => {
    if (!soundOn) return;

    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!audioRef.current) {
        audioRef.current = new AudioContextClass();
      }

      const ctx = audioRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.16
      );
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.16);
    } catch {
      // The game still works if browser audio is unavailable.
    }
  };

  const addIngredient = (id) => {
    if (added.includes(id)) {
      setMessage("That ingredient is already in the beaker!");
      return;
    }

    const ingredient = INGREDIENTS.find((item) => item.id === id);
    if (!ingredient) return;

    setAdded((previous) => [...previous, id]);
    setSelected(null);
    setStirred(false);
    setHeated(false);
    setFinished(false);
    setScore((previous) => previous + 10);
    setMessage(`${ingredient.name} added to the virtual beaker!`);
    playSound(740);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const id =
      event.dataTransfer.getData("ingredient") || selected;

    if (id) addIngredient(id);
  };

  const stir = () => {
    if (added.length !== INGREDIENTS.length) {
      setMessage("Add all four ingredients before stirring.");
      return;
    }
    if (stirred) {
      setMessage("The virtual mixture has already been stirred.");
      return;
    }

    setStirred(true);
    setHeated(false);
    setScore((previous) => previous + 20);
    setMessage("Great stirring! The virtual mixture is swirling.");
    playSound(500);
  };

  const heat = () => {
    if (!stirred) {
      setMessage("Stir the mixture before completing this simulation stage.");
      return;
    }
    if (heated) return;

    setHeated(true);
    setScore((previous) => previous + 20);
    setMessage("Virtual heating stage complete!");
    playSound(820);
  };

  const completeGame = () => {
    if (!heated || finished) return;

    setFinished(true);
    setScore((previous) => previous + 30);
    setMessage("Challenge complete! You earned your lab badge.");
    playSound(950);
  };

  const resetGame = () => {
    setAdded([]);
    setSelected(null);
    setStirred(false);
    setHeated(false);
    setFinished(false);
    setScore(0);
    setMessage("Fresh beaker! Drag an ingredient to begin.");
  };

  const progress = (added.length / INGREDIENTS.length) * 100;

  return (
    <section className="chemical-game">
      <div className="game-heading">
        <div>
          <span className="game-eyebrow">PROTOTYPING — GROUP 4</span>
          <h2>Mix It! <span>Virtual Lab</span></h2>
          <p>Drag, drop, stir and complete your chemistry challenge.</p>
        </div>

        <div className="score-pill">
          <Trophy size={20} />
          <div>
            <strong>{score}</strong>
            <small>POINTS</small>
          </div>
        </div>
      </div>

      <div className="game-progress">
        <div>
          <span>INGREDIENTS ADDED</span>
          <strong>{added.length}/4</strong>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="lab-layout">
        <div className="ingredient-station">
          <div className="station-title">
            <Droplets size={19} />
            <h3>Ingredient station</h3>
          </div>
          <p className="station-hint">
            <Hand size={15} /> Drag a bottle, or tap it and tap the beaker.
          </p>

          <div className="ingredient-bottles">
            {INGREDIENTS.map((ingredient) => {
              const isAdded = added.includes(ingredient.id);
              const isSelected = selected === ingredient.id;

              return (
                <motion.button
                  key={ingredient.id}
                  type="button"
                  className={`ingredient-bottle ${isAdded ? "is-added" : ""} ${
                    isSelected ? "is-selected" : ""
                  }`}
                  draggable={!isAdded}
                  onDragStart={(event) => {
                    event.dataTransfer.setData(
                      "ingredient",
                      ingredient.id
                    );
                    event.dataTransfer.effectAllowed = "copy";
                    setSelected(ingredient.id);
                  }}
                  onDragEnd={() => setSelected(null)}
                  onClick={() => {
                    if (isAdded) return;
                    setSelected(ingredient.id);
                    setMessage(
                      `${ingredient.name} selected. Now tap the beaker to add it.`
                    );
                  }}
                  aria-label={`Select ${ingredient.name}, ${ingredient.amount}`}
                  disabled={isAdded}
                  whileHover={!isAdded ? { y: -4, scale: 1.02 } : {}}
                  whileTap={!isAdded ? { scale: 0.97 } : {}}
                >
                  <span
                    className="bottle-illustration"
                    style={{ "--liquid-color": ingredient.color }}
                  >
                    <span className="bottle-cap" />
                    <span className="bottle-liquid" />
                    <span className="bottle-emoji">{ingredient.icon}</span>
                  </span>

                  <span className="bottle-details">
                    <strong>{ingredient.name}</strong>
                    <small>{ingredient.amount}</small>
                  </span>

                  <span className="bottle-status">
                    {isAdded ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <span className="add-symbol">+</span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="sound-row">
            <span>
              {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
              Sound effects
            </span>
            <button
              type="button"
              className={`sound-toggle ${soundOn ? "sound-active" : ""}`}
              onClick={() => setSoundOn((value) => !value)}
              aria-pressed={soundOn}
            >
              {soundOn ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <div className="beaker-station">
          <div className="station-title">
            <FlaskConical size={20} />
            <h3>Your mixing beaker</h3>
          </div>

          <motion.div
            className={`beaker-drop-zone ${selected ? "drop-ready" : ""} ${
              stirred ? "is-stirring" : ""
            } ${heated ? "is-heated" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
            }}
            onDrop={handleDrop}
            onClick={() => selected && addIngredient(selected)}
            animate={{
              scale: selected ? [1, 1.015, 1] : 1,
            }}
            transition={{
              duration: 1.2,
              repeat: selected ? Infinity : 0,
            }}
            role="button"
            tabIndex={0}
            aria-label="Beaker drop zone. Drop or tap here to add the selected ingredient."
            onKeyDown={(event) => {
              if (
                (event.key === "Enter" || event.key === " ") &&
                selected
              ) {
                event.preventDefault();
                addIngredient(selected);
              }
            }}
          >
            <div className="beaker-label">MIXING ZONE</div>

            <div className="beaker">
              <div className="beaker-neck" />
              <div className="beaker-glass">
                <div className="beaker-liquid-stack">
                  {added.map((id, index) => {
                    const ingredient = INGREDIENTS.find(
                      (item) => item.id === id
                    );

                    return (
                      <motion.div
                        key={id}
                        className="liquid-layer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: `${Math.min(24, 86 / Math.max(1, added.length))}%`,
                          opacity: 0.82,
                        }}
                        transition={{ duration: 0.65 }}
                        style={{
                          backgroundColor: ingredient.color,
                          zIndex: index + 1,
                        }}
                      />
                    );
                  })}
                </div>

                <AnimatePresence>
                  {added.length === 0 && (
                    <motion.div
                      className="beaker-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FlaskConical size={35} />
                      <span>DROP HERE</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {stirred && (
                  <motion.div
                    className="swirl-lines"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  >
                    <span />
                    <span />
                    <span />
                  </motion.div>
                )}

                {heated && (
                  <div className="steam-particles" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                )}

                <div className="beaker-glint" />
              </div>
              <div className="beaker-base" />
            </div>

            {selected && (
              <motion.div
                className="drop-instruction"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Tap here to add {INGREDIENTS.find(
                  (item) => item.id === selected
                )?.name}
              </motion.div>
            )}
          </motion.div>

          <div className="beaker-counter">
            <span>{added.length} ingredients poured</span>
            <span>{stirred ? "Stirred ✓" : "Not stirred yet"}</span>
          </div>

          <div className="lab-controls">
            <button
              type="button"
              className="lab-action stir-action"
              onClick={stir}
              disabled={added.length !== 4 || stirred}
            >
              <RotateCw size={18} />
              Stir mixture
            </button>

            <button
              type="button"
              className="lab-action heat-action"
              onClick={heat}
              disabled={!stirred || heated}
            >
              <Thermometer size={18} />
              Virtual heat
            </button>
          </div>

          <p className="virtual-warning">
            <span>⚠</span> Virtual heating only. Ethanol is flammable; do not
            heat it over a flame. Follow your instructor's approved lab
            safety procedure for any real experiment.
          </p>
        </div>
      </div>

      <motion.div
        className={`game-message ${finished ? "success-message" : ""}`}
        layout
      >
        <span className="message-icon">{finished ? "🏆" : "🧫"}</span>
        <div>
          <strong>{finished ? "Challenge completed!" : "Lab status"}</strong>
          <p>{message}</p>
        </div>
      </motion.div>

      {heated && !finished && (
        <motion.button
          type="button"
          className="complete-challenge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={completeGame}
        >
          <Trophy size={19} /> Complete challenge
        </motion.button>
      )}

      <AnimatePresence>
        {finished && (
          <motion.div
            className="completion-badge"
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="badge-medal">
              <Trophy size={32} />
            </div>
            <div>
              <span>UNLOCKED</span>
              <h3>Virtual Lab Explorer</h3>
              <p>You completed every stage of the simulation.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="reset-game"
        onClick={resetGame}
      >
        <RotateCcw size={16} /> Restart experiment
      </button>

      <p className="simulation-note">
        This game illustrates the steps, not a verified chemical reaction.
        Liquid colors, swirling and bubbles are visual effects; they do not
        establish solubility, actual temperature, skin safety or mosquito
        repellent effectiveness.
      </p>
    </section>
  );
}
