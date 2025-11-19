import { useState, useEffect, useRef } from "react";
import "./styles.css";


const TEXTS = {
  en: {
    title: "WELCOME TO KURT'S LIFE JOURNEY",
    subtitle: "A PERSONAL VIDEO MEMOIR.",
    description: "Choose your preferred language to explore his memoirs six chapters of personal reflection and historical insight.",
    thanks: "Thank you for sharing this journey.",
    langButtonEn: "English",
    langButtonDe: "Deutsch",
  },
  de: {title: "WILLKOMMEN AUF KURTS LEBENSREISE.",
    subtitle: "EINE PERSÖNLICHE VIDEO-MEMOIRE.",
    description:
      "Wählen Sie Ihre bevorzugte Sprache, um seine Erinnerungen in sechs Kapiteln persönlicher Reflexion und historischer Einblicke zu erleben.",
    thanks: "Vielen Dank, dass Sie diese Reise teilen.",
    langButtonEn: "English",
    langButtonDe: "Deutsch",
  },
};

const CHAPTERS = [
  {
    key: "austria",
    years: "1946-1967",
    image: "/cities/austria.jpg", 
    title: {en: "Austria", de: "Österreich"},
    youtubeId: "VIDEO_ID_1",
  },
  {
    key: "montreal",
    years: "1967–1973",
    image: "/cities/montreal.jpg",
    title: { en: "MONTREAL", de: "MONTREAL" },
    youtubeId: "VIDEO_ID_2",
  },
  {
    key: "moncton",
    years: "1973–1978",
    image: "/cities/moncton.jpg",
    title: { en: "MONCTON", de: "MONCTON" },
    youtubeId: "VIDEO_ID_3",
  },
  {
    key: "edmonton",
    years: "1978–1981",
    image: "/cities/edmonton.jpg",
    title: { en: "EDMONTON", de: "EDMONTON" },
    youtubeId: "VIDEO_ID_4",
  },
  {
    key: "vancouver",
    years: "1981–2001",
    image: "/cities/vancouver.jpg",
    title: { en: "VANCOUVER", de: "VANCOUVER" },
    youtubeId: "VIDEO_ID_5",
  },
  {
    key: "steyr",
    years: "2001–Present",
    image: "/cities/steyr.jpg",
    title: { en: "STEYR", de: "STEYR" },
    youtubeId: "VIDEO_ID_6",
  },
]

function App() {
  const [lang, setLang] = useState('en');
  const [activeChapter, setActiveChapter] = useState(null);
  const cardRefs = useRef([]);
  const [visibleKeys, setVisibleKeys] = useState([]);

  const t = TEXTS[lang];

  const handleOpenChapter = (chapter) => {
    setActiveChapter(chapter);
  };

  const handleCloseModal = () => {
    setActiveChapter(null);
  };
 
  useEffect(() => {
  if (window.innerWidth > 900) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const key = entry.target.getAttribute("data-key");
          setVisibleKeys((prev) =>
            prev.includes(key) ? prev : [...prev, key]
          );
        }
      });
    },
    { threshold: 0.4 } // когда ~40% карточки видны
  );

  cardRefs.current.forEach((el) => el && observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <div className="page">
      <header className='header'>
        <button
          className={`lang-btn ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
          >
          <img src="/flags/en.png" alt="English flag" className="flag-icon" />
          <span>English</span>
          </button>
        <button
          className={`lang-btn ${lang === "de" ? "active" : ""}`}
          onClick={() => setLang("de")}
          >
          <img src="/flags/de.png" alt="German flag" className="flag-icon" />
          <span>Deutsch</span>
          </button>
      </header>

      <main className="hero">
        <section className="hero-text">
          <h1 className="hero-title">{t.title}</h1>
          <h2 className="hero-subtitle">{t.subtitle}</h2>

          <p className="hero-description">{t.description}</p>
          <p className="hero-thanks">{t.thanks}</p>

          <div className="chapters">
  {CHAPTERS.map((chapter, index) => (
    <button
      key={chapter.key}
      data-key={chapter.key}
      ref={(el) => (cardRefs.current[index] = el)}
      className={`chapter-card ${
        visibleKeys.includes(chapter.key) ? "visible" : ""
      }`}
      onClick={() => handleOpenChapter(chapter)}
    >
      <div
        className="chapter-bg"
        style={{ backgroundImage: `url(${chapter.image})` }}
      />
      <div className="chapter-overlay" />
      <div className="chapter-title">
        {chapter.title[lang] ?? chapter.title.en}
      </div>
      <div className="chapter-years">{chapter.years}</div>
    </button>
  ))}
</div>
        </section>
        <section className="hero-photo">
          <div className="hero-photo-inner">
            <img src="/kurt-portrait.jpg" alt="Kurt and his mother" />
          </div>
        </section>
      </main>
      {activeChapter && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              {activeChapter.title[lang] ?? activeChapter.title.en}{" "}
              <span style={{ opacity: 0.7 }}>({activeChapter.years})</span>
              </div>
              <button className="modal-close" onClick={handleCloseModal}>
              x
              </button>
              <div className="modal-video">
                <iframe
                src={`https://www.youtube.com/embed/${activeChapter.youtubeId}?autoplay=1`}
                title={activeChapter.key}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
        </div>
  );
}

export default App
