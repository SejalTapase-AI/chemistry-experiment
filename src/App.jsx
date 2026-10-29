import { useState } from "react";
import ChemicalGame from "./ChemicalGame";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Beaker,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FlaskConical,
  GraduationCap,
  Image as ImageIcon,
  Leaf,
  Menu,
  Microscope,
  Play,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const tabs = [
  { id: "home", label: "Home", number: "01" },
  { id: "chemicals", label: "Chemicals", number: "02" },
  { id: "process", label: "Step-wise Process", number: "03" },
  { id: "flow", label: "Process Flow", number: "04" },
  { id: "lab", label: "Our Lab", number: "05" },
  { id: "applications", label: "Applications", number: "06" },
  { id: "quiz", label: "Quiz Zone", number: "07" },
];

const procedure = [
  {
    number: "01",
    title: "Measure the ingredients",
    description:
      "Measure castor oil, distilled water, glycerol, and ethanol according to the quantities used in the experiment.",
    video: `${BASE_URL}videos/vid-01.mp4`,
  },
  {
    number: "02",
    title: "Prepare the liquids",
    description:
      "Arrange the measured ingredients and laboratory apparatus on a clean work surface.",
    video: "/videos/vid-02.mp4",
  },
  {
    number: "03",
    title: "Combine the ingredients",
    description:
      "Add the measured ingredients together, following the method used by your group.",
    video: "/videos/vid-03.mp4",
  },
  {
    number: "04",
    title: "Stir the mixture",
    description:
      "Stir the combined ingredients. Observe and record the actual appearance of the mixture.",
    video: "/videos/vid-04.mp4",
  },
  {
    number: "05",
    title: "Controlled heating",
    description:
      "Your group reported using a little heating. Any heating must follow the instructor's approved method. Ethanol is flammable.",
    video: "/videos/vid-05.mp4",
  },
  {
    number: "06",
    title: "Observe the formulation",
    description:
      "Record the colour, appearance, consistency, and any separation you actually observe.",
    video: "/videos/vid-06.mp4",
  },
  {
    number: "07",
    title: "Document the experiment",
    description:
      "Record the quantities, procedure, observations, and limitations for your presentation.",
    video: "/videos/vid-07.mp4",
  },
];

const galleryPhotos = [
  {
    src: `${BASE_URL}images/img-1.jpeg`,
    title: "Our Experiment — Photo 1",
    tag: "LAB MOMENT 01",
  },
  {
    src: `${BASE_URL}images/img-2.jpeg`,
    title: "Our Experiment — Photo 2",
    tag: "LAB MOMENT 02",
  },
];

const quizQuestions = [
  {
    question: "How much distilled water did our group use?",
    options: ["2 mL", "10 mL", "20 mL", "25 mL"],
    correct: 2,
    explanation: "The recorded quantity of distilled water was 20 mL.",
  },
  {
    question: "Which ingredient is flammable?",
    options: [
      "Distilled water",
      "Ethanol",
      "Glycerol",
      "All are equally flammable",
    ],
    correct: 1,
    explanation:
      "Ethanol is flammable. Keep it away from flames and ignition sources.",
  },
  {
    question: "What should be recorded after mixing?",
    options: [
      "Only the group name",
      "The observed appearance and consistency",
      "An assumed result",
      "Nothing",
    ],
    correct: 1,
    explanation:
      "Scientific observations should describe what was actually seen.",
  },
  {
    question: "What is the purpose of a process-flow diagram?",
    options: [
      "To decorate a report only",
      "To replace laboratory safety",
      "To show the sequence of steps",
      "To calculate ingredient prices",
    ],
    correct: 2,
    explanation:
      "A process-flow diagram shows the main stages in their order.",
  },
  {
    question:
      "Does preparing this mixture alone prove mosquito-repellent effectiveness?",
    options: [
      "Yes, always",
      "Only if it smells strong",
      "No, controlled testing is needed",
      "Yes, if it looks clear",
    ],
    correct: 2,
    explanation:
      "Effectiveness requires appropriate testing. The recipe alone does not establish repellent performance or skin safety.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <Sparkles size={15} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[quizIndex];

  function navigateTo(tabId) {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseAnswer(index) {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === currentQuestion.correct) {
      setQuizScore((score) => score + 1);
    }
  }

  function nextQuestion() {
    if (quizIndex + 1 >= quizQuestions.length) {
      setQuizFinished(true);
      return;
    }

    setQuizIndex((index) => index + 1);
    setSelectedAnswer(null);
    setAnswered(false);
  }

  function restartQuiz() {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setAnswered(false);
    setQuizFinished(false);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => navigateTo("home")}
          aria-label="Go to home"
        >
          <span className="brand-icon">
            <FlaskConical size={23} />
          </span>
          <span className="brand-copy">
            <strong>PROTOTYPING</strong>
            <small>GROUP 4 · CHEMISTRY PROJECT</small>
          </span>
        </button>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={`navigation ${
            mobileMenuOpen ? "navigation-open" : ""
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-link ${
                activeTab === tab.id ? "nav-link-active" : ""
              }`}
              onClick={() => navigateTo(tab.id)}
            >
              <span className="nav-number">{tab.number}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {/* TAB 1: HOME */}
          {activeTab === "home" && (
            <motion.section
              key="home"
              className="hero"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              >
                <source
                  src={`${BASE_URL}videos/mosquito-lab.mp4`}
                  type="video/mp4"
                />
              </video>

              <div className="hero-overlay" />

              <div className="hero-content">
                <div className="hero-label">
                  <span className="status-dot" />
                  STUDENT EXPERIMENT · GROUP 4
                </div>

                <h1>
                  Science in
                  <br />
                  <span>every drop.</span>
                </h1>

                <p className="hero-description">
                  Exploring a castor-oil-based mosquito-repellent
                  formulation through ingredients, laboratory steps,
                  observations, and interactive learning.
                </p>

                <div className="hero-actions">
                  <button
                    className="button button-primary"
                    onClick={() => navigateTo("process")}
                  >
                    Explore the experiment <ArrowRight size={18} />
                  </button>

                  <button
                    className="button button-glass"
                    onClick={() => navigateTo("lab")}
                  >
                    <Play size={17} /> Our lab moments
                  </button>
                </div>

                <div className="hero-stats">
                  <div>
                    <strong>04</strong>
                    <span>Ingredients</span>
                  </div>
                  <div>
                    <strong>07</strong>
                    <span>Procedure clips</span>
                  </div>
                  <div>
                    <strong>01</strong>
                    <span>Curious team</span>
                  </div>
                </div>
              </div>

              <div className="hero-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="hero-flask">
                  <FlaskConical size={100} strokeWidth={1.1} />
                  <span className="flask-bubble bubble-one" />
                  <span className="flask-bubble bubble-two" />
                  <span className="flask-bubble bubble-three" />
                </div>
                <span className="floating-tag tag-top">LAB NOTES ✳</span>
                <span className="floating-tag tag-bottom">
                  IDEA → EXPERIMENT
                </span>
              </div>

              <button
                className="scroll-hint"
                onClick={() => navigateTo("chemicals")}
              >
                <ArrowDown size={15} /> SCROLL INTO SCIENCE
              </button>
            </motion.section>
          )}

          {/* TAB 2: INTERACTIVE CHEMICAL GAME */}
          {activeTab === "chemicals" && (
            <motion.section
              key="chemicals"
              className="page-section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ChemicalGame />
            </motion.section>
          )}

          {/* TAB 3: STEP-WISE PROCESS */}
          {activeTab === "process" && (
            <motion.section
              key="process"
              className="page-section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading
                eyebrow="FROM MEASUREMENT TO OBSERVATION"
                title="The experiment, step by step."
                description="Seven video slots in order. Use your group's actual recordings."
              />

              <div className="procedure-list">
                {procedure.map((step, index) => (
                  <motion.article
                    className="procedure-card"
                    key={step.number}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <div className="procedure-number">{step.number}</div>

                    <div className="procedure-copy">
                      <span className="procedure-kicker">
                        EXPERIMENT STAGE {step.number}
                      </span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>

                    <div className="procedure-video">
                      <video controls preload="metadata">
                        <source src={step.video} type="video/mp4" />
                        Your browser does not support embedded video.
                      </video>
                      <span>
                        <Play size={13} /> VIDEO {step.number}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="safety-note">
                <ShieldCheck size={22} />
                <div>
                  <strong>Important heating precaution</strong>
                  <p>
                    Never heat an ethanol-containing mixture over an
                    open flame. Follow your instructor's approved method
                    and laboratory safety rules.
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* TAB 4: PROCESS FLOW + BOTH DIAGRAMS */}
          {activeTab === "flow" && (
            <motion.section
              key="flow"
              className="page-section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading
                eyebrow="THE BIG PICTURE"
                title="Follow the flow."
                description="A visual summary of the experiment from preparation to recorded observations."
              />

              {/* Existing process flow */}
              <div className="flow-board">
                <div className="flow-board-heading">
                  <span className="flow-live-dot" />
                  EXPERIMENT PROCESS MAP
                  <span className="flow-board-badge">GROUP 04</span>
                </div>

                <div className="flow-steps">
                  <div className="flow-node flow-start">
                    <span className="flow-node-icon">
                      <GraduationCap size={27} />
                    </span>
                    <small>STAGE 01</small>
                    <strong>Prepare</strong>
                    <p>Gather apparatus and follow safety instructions.</p>
                  </div>

                  <div className="flow-connector">
                    <ArrowRight />
                  </div>

                  <div className="flow-node flow-measure">
                    <span className="flow-node-icon">
                      <Beaker size={27} />
                    </span>
                    <small>STAGE 02</small>
                    <strong>Measure</strong>
                    <p>Measure the four ingredients accurately.</p>
                  </div>

                  <div className="flow-connector">
                    <ArrowRight />
                  </div>

                  <div className="flow-node flow-mix">
                    <span className="flow-node-icon">
                      <Zap size={27} />
                    </span>
                    <small>STAGE 03</small>
                    <strong>Combine & stir</strong>
                    <p>Combine the ingredients and stir the mixture.</p>
                  </div>

                  <div className="flow-connector">
                    <ArrowRight />
                  </div>

                  <div className="flow-node flow-observe">
                    <span className="flow-node-icon">
                      <Microscope size={27} />
                    </span>
                    <small>STAGE 04</small>
                    <strong>Observe</strong>
                    <p>Record actual observations and appearance.</p>
                  </div>
                </div>

                <div className="flow-down">
                  <ArrowDown size={20} />
                </div>
              </div>

              {/* Existing block diagram */}
              <div className="block-diagram">
                <h3>Block diagram</h3>
                <p>Inputs → processing → recorded output</p>

                <div className="block-diagram-row">
                  <div className="block-box">
                    <FlaskConical size={22} />
                    <strong>Inputs</strong>
                    <span>4 measured ingredients</span>
                  </div>

                  <ArrowRight className="block-arrow" />

                  <div className="block-box block-box-highlight">
                    <Zap size={22} />
                    <strong>Processing</strong>
                    <span>Combine and stir</span>
                  </div>

                  <ArrowRight className="block-arrow" />

                  <div className="block-box">
                    <Microscope size={22} />
                    <strong>Output</strong>
                    <span>Observed mixture + notes</span>
                  </div>
                </div>

                <p className="diagram-footnote">
                  Heating was reported by the group. Any heating must
                  follow an instructor-approved safe method.
                </p>
              </div>

              {/* NEW: BOTH UPLOADED REFERENCE DIAGRAMS */}
              <div className="reference-diagrams">
                <SectionHeading
                  eyebrow="VISUAL REFERENCE"
                  title="Our process diagrams."
                  description="Two additional diagrams showing the ingredient inputs, mixing stage, and intended process."
                />

                <div className="reference-diagram-grid">
                  <article className="reference-diagram-card">
                    <span className="reference-diagram-label">
                      DIAGRAM 01
                    </span>
                    <h3>Process Flowchart</h3>

                    <img
                      src={`${BASE_URL}images/diagram-1.png`}
                      alt="Black-and-white flowchart showing glycerol, distilled water, castor oil and an alcohol ingredient leading to mixing and subsequent processing"
                      loading="lazy"
                    />

                    <p>
                      This diagram shows how the ingredients feed into
                      the mixing stage and how the process continues.
                    </p>
                  </article>

                  <article className="reference-diagram-card">
                    <span className="reference-diagram-label">
                      DIAGRAM 02
                    </span>
                    <h3>Illustrated Process</h3>

                    <img
                      src={`${BASE_URL}images/diagram-2.png`}
                      alt="Illustrated process diagram showing ingredient inputs, mixing, heating and the intended formulation"
                      loading="lazy"
                    />

                    <p>
                      This illustrated version gives a pictorial
                      overview of the experimental workflow.
                    </p>
                  </article>
                </div>

                <div className="safety-note">
                  <ShieldCheck size={22} />
                  <div>
                    <strong>Scientific accuracy and safety</strong>
                    <p>
                      Your experiment used ethanol, not methanol. Update
                      the second reference diagram's methanol label before
                      presenting it as your actual procedure. Ethanol is
                      flammable: never heat an ethanol-containing mixture
                      over an open flame. These diagrams do not establish
                      repellent effectiveness or skin safety.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* TAB 5: OUR LAB */}
          {activeTab === "lab" && (
            <motion.section
              key="lab"
              className="page-section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading
                eyebrow="REAL PEOPLE. REAL LAB WORK."
                title="Our lab, our story."
                description="Select a photo to view it larger."
              />

              <div className="gallery-grid">
                {galleryPhotos.map((photo, index) => (
                  <motion.button
                    type="button"
                    className={`gallery-card gallery-card-${index + 1}`}
                    key={photo.src}
                    onClick={() => setSelectedImage(photo)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="gallery-image-wrap">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <span className="gallery-zoom">
                        <ImageIcon size={18} />
                        View photo
                      </span>
                    </div>

                    <div className="gallery-caption">
                      <span>{photo.tag}</span>
                      <strong>{photo.title}</strong>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="lab-video-section">
                <div>
                  <span className="eyebrow">
                    <Play size={14} /> BEHIND THE SCENES
                  </span>
                  <h3>Watch the experiment unfold.</h3>
                  <p>
                    These clips use the first two procedure videos.
                    All seven clips are available in the Step-wise
                    Process tab.
                  </p>
                </div>

                <div className="lab-video-grid">
                  {procedure.slice(0, 2).map((step) => (
                    <div className="lab-video-card" key={step.number}>
                      <video controls preload="metadata">
                        <source src={step.video} type="video/mp4" />
                        Your browser does not support embedded video.
                      </video>
                      <span>
                        {step.number} / {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gallery-tip">
                <Sparkles size={19} />
                <p>
                  Add more photos to <code>public/images/</code> and
                  add their details to the <code>galleryPhotos</code>
                  list in <code>App.jsx</code>.
                </p>
              </div>
            </motion.section>
          )}

          {/* TAB 6: APPLICATIONS */}
          {activeTab === "applications" && (
            <motion.section
              key="applications"
              className="page-section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading
                eyebrow="WHERE SCIENCE MEETS DAILY LIFE"
                title="Possibilities & limitations."
                description="Explore the project aim, potential advantages, and what still needs to be verified."
              />

              <div className="application-hero">
                <div className="application-hero-icon">
                  <Leaf size={43} />
                </div>

                <div>
                  <span className="application-tag">PROJECT AIM</span>
                  <h3>Exploring a mosquito-repellent formulation</h3>
                  <p>
                    This student experiment explores a mixture containing
                    castor oil, distilled water, glycerol, and ethanol.
                    Its actual repellent performance has not been
                    established by the ingredient list alone.
                  </p>
                </div>
              </div>

              <div className="pros-cons-grid">
                <article className="pros-card">
                  <span className="pros-icon">
                    <CheckCircle2 size={24} />
                  </span>
                  <h3>Potential advantages</h3>
                  <ul>
                    <li>Uses a small, measured ingredient list.</li>
                    <li>
                      Provides hands-on practice in mixing and observation.
                    </li>
                    <li>Connects chemistry with a real-world problem.</li>
                    <li>
                      Supports further controlled laboratory investigation.
                    </li>
                  </ul>
                </article>

                <article className="cons-card">
                  <span className="cons-icon">
                    <ShieldCheck size={24} />
                  </span>
                  <h3>Limitations & concerns</h3>
                  <ul>
                    <li>Repellent effectiveness has not been verified.</li>
                    <li>Stability and separation need evaluation.</li>
                    <li>Ethanol is flammable and needs careful handling.</li>
                    <li>Skin safety has not been established.</li>
                  </ul>
                </article>
              </div>

              <div className="next-experiments">
                <div className="next-experiments-icon">
                  <Microscope size={25} />
                </div>

                <div>
                  <span className="eyebrow">WHAT COMES NEXT?</span>
                  <h3>Test before making claims.</h3>
                  <p>
                    A suitable supervised study would assess stability,
                    formulation properties, and repellent performance
                    using an approved protocol. Do not apply this
                    unvalidated mixture to skin or treat it as a proven
                    mosquito-control product.
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* TAB 7: QUIZ ZONE */}
          {activeTab === "quiz" && (
            <motion.section
              key="quiz"
              className="page-section quiz-page"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading
                eyebrow="TIME TO TEST YOUR KNOWLEDGE"
                title="Welcome to Quiz Zone."
                description="Five quick questions about our experiment."
              />

              <div className="quiz-card">
                {quizFinished ? (
                  <div className="quiz-result">
                    <div className="quiz-result-icon">
                      <GraduationCap size={42} />
                    </div>

                    <span className="eyebrow">QUIZ COMPLETE</span>

                    <h3>
                      You scored {quizScore} / {quizQuestions.length}
                    </h3>

                    <p>
                      {quizScore === quizQuestions.length
                        ? "Perfect score! Your experiment knowledge is on point."
                        : quizScore >= 3
                          ? "Nice work! Review the explanations and keep exploring."
                          : "Good start! Review the experiment sections and try again."}
                    </p>

                    <button
                      className="button button-primary"
                      onClick={restartQuiz}
                    >
                      <Zap size={17} /> Try again
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="quiz-topline">
                      <span>
                        <CircleHelp size={17} /> QUESTION {quizIndex + 1} OF{" "}
                        {quizQuestions.length}
                      </span>
                      <span className="quiz-score">
                        SCORE: {quizScore}
                      </span>
                    </div>

                    <div className="quiz-progress">
                      <span
                        style={{
                          width: `${
                            ((quizIndex + 1) / quizQuestions.length) * 100
                          }%`,
                        }}
                      />
                    </div>

                    <h3 className="quiz-question">
                      {currentQuestion.question}
                    </h3>

                    <div className="quiz-options">
                      {currentQuestion.options.map((option, index) => {
                        let className = "quiz-option";

                        if (
                          answered &&
                          index === currentQuestion.correct
                        ) {
                          className += " quiz-option-correct";
                        } else if (
                          answered &&
                          index === selectedAnswer &&
                          index !== currentQuestion.correct
                        ) {
                          className += " quiz-option-wrong";
                        } else if (selectedAnswer === index) {
                          className += " quiz-option-selected";
                        }

                        return (
                          <button
                            className={className}
                            key={option}
                            onClick={() => chooseAnswer(index)}
                            disabled={answered}
                          >
                            <span className="option-letter">
                              {String.fromCharCode(65 + index)}
                            </span>

                            {option}

                            {answered &&
                              index === currentQuestion.correct && (
                                <CheckCircle2
                                  size={19}
                                  className="answer-check"
                                />
                              )}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className="quiz-explanation">
                        <CheckCircle2 size={19} />
                        <p>
                          <strong>
                            {selectedAnswer === currentQuestion.correct
                              ? "Correct!"
                              : "Not quite."}
                          </strong>{" "}
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    )}

                    <div className="quiz-footer">
                      <span>
                        {answered
                          ? "Answer recorded"
                          : "Choose one answer to continue"}
                      </span>

                      <button
                        className="button button-primary"
                        onClick={nextQuestion}
                        disabled={!answered}
                      >
                        {quizIndex === quizQuestions.length - 1
                          ? "See results"
                          : "Next question"}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <button
          className="footer-brand"
          onClick={() => navigateTo("home")}
        >
          <span className="footer-brand-icon">
            <FlaskConical size={19} />
          </span>
          <span>PROTOTYPING — GROUP 4</span>
        </button>

        <p>Curiosity is where every experiment begins.</p>

        <div className="footer-links">
          {tabs.slice(1, 4).map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="footer-copyright">
          STUDENT PROJECT · LEARN · EXPERIMENT · OBSERVE
        </span>
      </footer>

      {/* PHOTO LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close photo"
            >
              <X size={25} />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
              />
              <p>{selectedImage.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;