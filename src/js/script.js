
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const languageButtons = document.querySelectorAll("[data-lang]");

const translations = {
    it: {
        eyebrow: "GAME PROGRAMMER",
        intro: "Il mio percorso di formazione tra design visivo, programmazione e intelligenza artificiale per i videogiochi, con i progetti e le certificazioni che lo accompagnano.",
        certificates: "Certificazioni professionali",
        yourPower: "Corso di sicurezza e prevenzione: comportamento in caso di rapina, conflitti ed emergenze.",
        lrd: "Attestato relativo alla lotta contro il riciclaggio di denaro",
        viewPdf: "Apri PDF ↗",
        education: "Formazione in game development",
        professional: "Certificazioni professionali",
        viewBadge: "Vedi badge ↗",
        eduVisual: "Design Visivo · indirizzo Gaming",
        eduGame: "Master in Game Programming",
        eduAI: "Specializzazione in AI Programming",
        projects: "Progetti videoludici",
        resMutatae: "Puzzle game fantascientifico sviluppato durante il percorso di studi in game programming.",
        canvasConspiracy: "Progetto videoludico realizzato in un contesto collaborativo di game jam.",
        mutateBug: "Simulatore idle di crescita: coltivi insetti in piastre di Petri, ognuno con mutazioni e rarità casuali. Realizzato per sperimentare Claude Code con MCP in Roblox Studio.",
        backToTop: "Torna all'inizio ↑",
        darkMode: "Attiva tema scuro",
        lightMode: "Attiva tema chiaro"
    },
    en: {
        eyebrow: "GAME PROGRAMMER",
        intro: "My educational path through visual design, programming and artificial intelligence for games, along with the projects and certificates that go with it.",
        certificates: "Professional certificates",
        yourPower: "Safety and prevention course: how to act in case of a robbery, conflicts and emergencies.",
        lrd: "Anti-money laundering certificate",
        viewPdf: "View PDF ↗",
        education: "Game development education",
        professional: "Professional certificates",
        viewBadge: "View badge ↗",
        eduVisual: "Visual Design · Gaming specialization",
        eduGame: "Master in Game Programming",
        eduAI: "AI Programming specialization",
        projects: "Game projects",
        resMutatae: "A science-fiction puzzle game developed during my game programming studies.",
        canvasConspiracy: "A game project created in a collaborative game jam setting.",
        mutateBug: "An idle growth simulator: you grow bugs in Petri dishes, each with random mutations and rarities. Built to test Claude Code with MCP in Roblox Studio.",
        backToTop: "Back to top ↑",
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode"
    },
    de: {
        eyebrow: "GAME PROGRAMMER",
        intro: "Mein Ausbildungsweg zwischen visuellem Design, Programmierung und künstlicher Intelligenz für Games, mit den dazugehörigen Projekten und Zertifikaten.",
        certificates: "Berufliche Zertifikate",
        yourPower: "Sicherheits- und Präventionskurs: Verhalten bei Überfällen, Konflikten und Notfällen.",
        lrd: "Zertifikat zur Geldwäschebekämpfung",
        viewPdf: "PDF öffnen ↗",
        education: "Ausbildung in Game Development",
        professional: "Berufliche Zertifikate",
        viewBadge: "Badge ansehen ↗",
        eduVisual: "Visuelles Design · Schwerpunkt Gaming",
        eduGame: "Master in Game Programming",
        eduAI: "Spezialisierung in AI Programming",
        projects: "Game-Projekte",
        resMutatae: "Ein Science-Fiction-Puzzle-Spiel, das während meiner Ausbildung in Game Programming entwickelt wurde.",
        canvasConspiracy: "Ein Spielprojekt aus einem kollaborativen Game-Jam-Umfeld.",
        mutateBug: "Ein Idle-Wachstumssimulator: Käfer in Petrischalen züchten, jeder mit zufälligen Mutationen und Seltenheiten. Entstanden, um Claude Code mit MCP in Roblox Studio zu testen.",
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

    try { localStorage.setItem("preferred-language", language); } catch {}
}

function setTheme(theme) {
    const isDark = theme === "dark";

    html.dataset.theme = theme;

    const language = html.lang in translations ? html.lang : "it";
    themeToggle.setAttribute(
        "aria-label",
        translations[language][isDark ? "lightMode" : "darkMode"]
    );

    try { localStorage.setItem("preferred-theme", theme); } catch {}
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

function storedValue(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}

// ?lang=it|en|de lets a QR code open the page directly in a given language
const urlLanguage = new URLSearchParams(location.search).get("lang");
const initialLanguage = translations[urlLanguage] ? urlLanguage : storedValue("preferred-language") || "it";
const systemTheme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

setLanguage(initialLanguage);
setTheme(storedValue("preferred-theme") || systemTheme);

const carousel = document.getElementById("carousel");
let drag = null;

// Mouse drag-to-scroll (touch already scrolls natively)
carousel.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") return;
    drag = { x: event.clientX, left: carousel.scrollLeft, moved: false };
});

window.addEventListener("pointermove", (event) => {
    if (!drag) return;

    const delta = event.clientX - drag.x;

    if (Math.abs(delta) > 5) {
        drag.moved = true;
        carousel.classList.add("dragging");
    }

    carousel.scrollLeft = drag.left - delta;
});

window.addEventListener("pointerup", () => {
    if (!drag) return;

    const moved = drag.moved;
    drag = null;
    carousel.classList.remove("dragging");

    if (moved) {
        carousel.addEventListener("click", (event) => event.preventDefault(), { once: true, capture: true });
    }
});

// Mouse wheel scrolls the carousel sideways, and hands control back to the page at either end
carousel.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const atStart = carousel.scrollLeft <= 5 && event.deltaY < 0;
    const atEnd = carousel.scrollLeft >= maxScroll - 5 && event.deltaY > 0;

    if (atStart || atEnd) return;

    // Firefox reports wheel steps in lines instead of pixels
    const step = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY;

    event.preventDefault();
    carousel.scrollLeft += step;
}, { passive: false });
