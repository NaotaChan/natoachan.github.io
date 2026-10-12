
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const languageButtons = document.querySelectorAll("[data-lang]");

const translations = {
    it: {
        eyebrow: "PROFILO PROFESSIONALE",
        intro: "Una selezione di certificazioni, formazione complementare e progetti digitali che completano il mio percorso professionale.",
        certificates: "Certificazioni professionali",
        yourPower: "FFS · Formazione complementare",
        lrd: "FFS · Attestato relativo alla lotta contro il riciclaggio di denaro",
        viewPdf: "Apri PDF ↗",
        education: "Formazione complementare",
        projects: "Progetti videoludici selezionati",
        resMutatae: "Puzzle game fantascientifico sviluppato durante il percorso di studi in game programming.",
        canvasConspiracy: "Progetto videoludico realizzato in un contesto collaborativo di game jam.",
        como: "Progetto web legato a una caccia al tesoro culturale dedicata alla scoperta della città di Como.",
        backToTop: "Torna all'inizio ↑",
        darkMode: "Attiva tema scuro",
        lightMode: "Attiva tema chiaro"
    },
    en: {
        eyebrow: "PROFESSIONAL PROFILE",
        intro: "A selection of certificates, additional education and digital projects that complement my professional experience.",
        certificates: "Professional certificates",
        yourPower: "FFS · Additional training",
        lrd: "FFS · Anti-money laundering certificate",
        viewPdf: "View PDF ↗",
        education: "Additional education",
        projects: "Selected game projects",
        resMutatae: "A science-fiction puzzle game developed during my game programming studies.",
        canvasConspiracy: "A game project created in a collaborative game jam setting.",
        como: "A web project connected to a cultural treasure hunt exploring the city of Como.",
        backToTop: "Back to top ↑",
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode"
    },
    de: {
        eyebrow: "BERUFLICHES PROFIL",
        intro: "Eine Auswahl an Zertifikaten, ergänzender Weiterbildung und digitalen Projekten, die meine Berufserfahrung ergänzen.",
        certificates: "Berufliche Zertifikate",
        yourPower: "SBB · Ergänzende Weiterbildung",
        lrd: "SBB · Zertifikat zur Geldwäschebekämpfung",
        viewPdf: "PDF öffnen ↗",
        education: "Ergänzende Ausbildung",
        projects: "Ausgewählte Game-Projekte",
        resMutatae: "Ein Science-Fiction-Puzzle-Spiel, das während meiner Ausbildung in Game Programming entwickelt wurde.",
        canvasConspiracy: "Ein Spielprojekt aus einem kollaborativen Game-Jam-Umfeld.",
        como: "Ein Webprojekt rund um eine kulturelle Schatzsuche zur Entdeckung der Stadt Como.",
        backToTop: "Nach oben ↑",
        darkMode: "Dunkles Design aktivieren",
        lightMode: "Helles Design aktivieren"
    }
};

function setLanguage(language) {
    const dictionary = translations[language] || translations.it;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;

        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });

    languageButtons.forEach((button) => {
        const isActive = button.dataset.lang === language;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem("preferred-language", language);
}

function setTheme(theme) {
    const isDark = theme === "dark";

    html.dataset.theme = theme;
    themeIcon.textContent = isDark ? "☼" : "☾";

    const language = localStorage.getItem("preferred-language") || "it";
    themeToggle.setAttribute(
        "aria-label",
        translations[language][isDark ? "lightMode" : "darkMode"]
    );

    localStorage.setItem("preferred-theme", theme);
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);

        const theme = html.dataset.theme;
        const language = button.dataset.lang;

        themeToggle.setAttribute(
            "aria-label",
            translations[language][theme === "dark" ? "lightMode" : "darkMode"]
        );
    });
});

themeToggle.addEventListener("click", () => {
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
});

setLanguage(localStorage.getItem("preferred-language") || "it");
setTheme(localStorage.getItem("preferred-theme") || "light");
