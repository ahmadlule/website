// TheBestSearchEngine - app.js
// Features:
// - Engine launcher (with SearchDeen and many others), sorted
// - Autocomplete (DuckDuckGo JSONP, client-only)
// - Chatbot via OpenRouter: streaming, Markdown with copy buttons
// - Vision image upload for supported models
// - Speech-to-text (Web Speech API) and text-to-speech (SpeechSynthesis)

// =========================
// Engines (categories) and UI build
// =========================
const CATEGORIES = [
  {
    name: "Academic / Research",
    engines: [
      { name: "arXiv", url: "https://arxiv.org/search/?query={q}&searchtype=all", icon: "https://arxiv.org/favicon.ico" },
      { name: "BASE", url: "https://www.base-search.net/Search/Results?lookfor={q}", icon: "https://www.base-search.net/favicon.ico" },
      { name: "Google Scholar", url: "https://scholar.google.com/scholar?q={q}", icon: "https://scholar.google.com/favicon.ico" },
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term={q}", icon: "https://pubmed.ncbi.nlm.nih.gov/favicon.ico" },
      { name: "Semantic Scholar", url: "https://www.semanticscholar.org/search?q={q}", icon: "https://www.semanticscholar.org/favicon.ico" }
    ]
  },
  {
    name: "AI / LLM",
    engines: [
      { name: "Perplexity", url: "https://www.perplexity.ai/search?q={q}", icon: "https://www.perplexity.ai/favicon.ico" },
      { name: "Phind", url: "https://www.phind.com/search?q={q}", icon: "https://www.phind.com/favicon.ico" },
      { name: "WolframAlpha", url: "https://www.wolframalpha.com/input?i={q}", icon: "https://www.wolframalpha.com/_next/static/images/favicons/favicon-32x32.png" }
    ]
  },
  {
    name: "Developers / Docs",
    engines: [
      { name: "DevDocs", url: "https://devdocs.io/#q={q}", icon: "https://devdocs.io/favicon.ico" },
      { name: "Docker Hub", url: "https://hub.docker.com/search?q={q}&type=image", icon: "https://www.docker.com/wp-content/uploads/2022/03/cropped-favicon-32x32.png" },
      { name: "Go Packages", url: "https://pkg.go.dev/search?q={q}", icon: "https://pkg.go.dev/static/frontend/img/favicon.ico" },
      { name: "MDN", url: "https://developer.mozilla.org/en-US/search?q={q}", icon: "https://developer.mozilla.org/favicon-48x48.cbbd161b.png" },
      { name: "Maven Central", url: "https://search.maven.org/search?q={q}", icon: "https://search.maven.org/assets/images/favicon.ico" },
      { name: "npm", url: "https://www.npmjs.com/search?q={q}", icon: "https://static.npmjs.com/da3f3f76c3b6f1c07f9f9e4f07a8c12c.png" },
      { name: "PyPI", url: "https://pypi.org/search/?q={q}", icon: "https://pypi.org/static/images/favicons/favicon.5e3047d30ed9.ico" },
      { name: "Rust crates", url: "https://crates.io/search?q={q}", icon: "https://crates.io/favicon.ico" },
      { name: "Sourcegraph", url: "https://sourcegraph.com/search?q={q}", icon: "https://sourcegraph.com/.assets/img/sourcegraph-mark.svg" },
      { name: "Stack Exchange", url: "https://stackexchange.com/search?q={q}", icon: "https://cdn.sstatic.net/Sites/stackexchange/Img/favicon.ico" },
      { name: "StackOverflow", url: "https://stackoverflow.com/search?q={q}", icon: "https://stackoverflow.design/assets/img/favicons/favicon.ico" }
    ]
  },
  {
    name: "General",
    engines: [
      { name: "Ask", url: "https://www.ask.com/web?q={q}", icon: "https://www.ask.com/favicon.ico" },
      { name: "Bing", url: "https://www.bing.com/search?q={q}", icon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico" },
      { name: "Brave", url: "https://search.brave.com/search?q={q}", icon: "https://search.brave.com/favicon.ico" },
      { name: "DuckDuckGo", url: "https://duckduckgo.com/?q={q}", icon: "https://duckduckgo.com/favicon.ico" },
      { name: "Ecosia", url: "https://www.ecosia.org/search?q={q}", icon: "https://www.ecosia.org/favicon.ico" },
      { name: "Google", url: "https://www.google.com/search?q={q}", icon: "https://www.google.com/favicon.ico" },
      { name: "Metager", url: "https://metager.org/meta/meta.ger3?eingabe={q}", icon: "https://metager.org/favicon.ico" },
      { name: "Qwant", url: "https://www.qwant.com/?q={q}", icon: "https://www.qwant.com/favicon-32x32.png" },
      { name: "SearchDeen", url: "https://searchdeen.com/search?q={q}", icon: "https://searchdeen.com/favicon.ico" },
      { name: "Startpage", url: "https://www.startpage.com/sp/search?query={q}", icon: "https://www.startpage.com/sp/cdn/favicons/favicon--dark.ico" },
      { name: "Swisscows", url: "https://swisscows.com/web?query={q}", icon: "https://swisscows.com/favicon.ico" },
      { name: "Yahoo", url: "https://search.yahoo.com/search?p={q}", icon: "https://s.yimg.com/rz/l/favicon.ico" },
      { name: "YEP", url: "https://yep.com/web?q={q}", icon: "https://yep.com/favicon.ico" },
      { name: "You.com", url: "https://you.com/search?q={q}", icon: "https://you.com/favicon.ico" }
    ]
  },
  {
    name: "Islamic Resources",
    engines: [
      { name: "Ahadith", url: "https://ahadith.co.uk/searchresults.php?q={q}", icon: "https://ahadith.co.uk/favicon.ico" },
      { name: "Corpus Quran", url: "https://corpus.quran.com/search.jsp?q={q}", icon: "https://corpus.quran.com/favicon.ico" },
      { name: "IslamPub", url: "https://islamhouse.com/en/search/?q={q}", icon: "https://islamhouse.com/favicon.ico" },
      { name: "IslamQnA", url: "https://islamqa.info/en/search?query={q}", icon: "https://islamqa.info/favicon.ico" },
      { name: "IslamWeb Fatwa", url: "https://www.islamweb.net/en/search?search_word={q}", icon: "https://www.islamweb.net/favicon.ico" },
      { name: "Quran.com", url: "https://quran.com/search?q={q}", icon: "https://quran.com/favicon.ico" },
      { name: "SearchDeen", url: "https://searchdeen.com/search?q={q}", icon: "https://searchdeen.com/favicon.ico" },
      { name: "Sunnah.com", url: "https://sunnah.com/search?q={q}", icon: "https://sunnah.com/favicon.ico" }
    ]
  },
  {
    name: "Maps / Places",
    engines: [
      { name: "Apple Maps (web)", url: "https://maps.apple.com/?q={q}", icon: "https://apple.com/favicon.ico" },
      { name: "Google Maps", url: "https://www.google.com/maps/search/{q}", icon: "https://www.google.com/favicon.ico" },
      { name: "OpenStreetMap", url: "https://www.openstreetmap.org/search?query={q}", icon: "https://www.openstreetmap.org/favicon.ico" }
    ]
  },
  {
    name: "Media",
    engines: [
      { name: "Giphy", url: "https://giphy.com/search/{q}", icon: "https://giphy.com/static/img/favicon.png" },
      { name: "IMDb", url: "https://www.imdb.com/find?q={q}", icon: "https://www.imdb.com/favicon.ico" },
      { name: "Pixabay", url: "https://pixabay.com/images/search/{q}/", icon: "https://pixabay.com/apple-touch-icon.png" },
      { name: "SoundCloud", url: "https://soundcloud.com/search?q={q}", icon: "https://a-v2.sndcdn.com/assets/images/sc-icons/ios-a62dfc9db5.ico" },
      { name: "Spotify", url: "https://open.spotify.com/search/{q}", icon: "https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico" }
    ]
  },
  {
    name: "Privacy Focused",
    engines: [
      { name: "SearXNG (searx.be)", url: "https://searx.be/search?q={q}", icon: "https://searx.be/favicon.ico" },
      { name: "Whoogle (sdf.org)", url: "https://whoogle.sdf.org/search?q={q}", icon: "https://whoogle.sdf.org/favicon.ico" }
    ]
  },
  {
    name: "Shopping",
    engines: [
      { name: "AliExpress", url: "https://www.aliexpress.com/wholesale?SearchText={q}", icon: "https://ae01.alicdn.com/images/eng/wholesale/icon/aliexpress.ico" },
      { name: "Amazon", url: "https://www.amazon.com/s?k={q}", icon: "https://www.amazon.com/favicon.ico" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw={q}", icon: "https://ir.ebaystatic.com/favicon.ico" },
      { name: "Google Shopping", url: "https://www.google.com/search?tbm=shop&q={q}", icon: "https://www.google.com/favicon.ico" }
    ]
  },
  {
    name: "Social / Media",
    engines: [
      { name: "GitHub", url: "https://github.com/search?q={q}", icon: "https://github.githubassets.com/favicons/favicon.svg" },
      { name: "LinkedIn", url: "https://www.linkedin.com/search/results/all/?keywords={q}", icon: "https://www.linkedin.com/favicon.ico" },
      { name: "Reddit", url: "https://www.reddit.com/search/?q={q}", icon: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png" },
      { name: "Threads", url: "https://www.threads.net/search?q={q}", icon: "https://www.threads.net/favicon.ico" },
      { name: "TikTok", url: "https://www.tiktok.com/search?q={q}", icon: "https://www.tiktok.com/favicon.ico" },
      { name: "YouTube", url: "https://www.youtube.com/results?search_query={q}", icon: "https://www.youtube.com/favicon.ico" }
    ]
  },
  {
    name: "Knowledge / Reference",
    engines: [
      { name: "Archive.org", url: "https://archive.org/search.php?query={q}", icon: "https://archive.org/images/favicon.ico" },
      { name: "Openverse", url: "https://openverse.org/search?q={q}", icon: "https://openverse.org/favicon.ico" },
      { name: "Wikipedia", url: "https://en.wikipedia.org/w/index.php?search={q}", icon: "https://en.wikipedia.org/static/favicon/wikipedia.ico" }
    ]
  }
];

// Sort engines and categories alphabetically
CATEGORIES.forEach(cat => cat.engines.sort((a, b) => a.name.localeCompare(b.name)));
CATEGORIES.sort((a, b) => a.name.localeCompare(b.name));

const sectionsEl = document.getElementById("sections");
const queryInput = document.getElementById("query");
const form = document.getElementById("searchForm");

function makeEngineButton(engine) {
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.type = "button";
  btn.setAttribute("data-url", engine.url);
  btn.setAttribute("aria-label", "Search with " + engine.name);

  const icon = document.createElement("img");
  icon.className = "favicon";
  icon.alt = "";
  icon.referrerPolicy = "no-referrer";
  icon.loading = "lazy";
  icon.src = engine.icon || "";
  btn.appendChild(icon);

  const label = document.createElement("span");
  label.textContent = engine.name;
  btn.appendChild(label);

  btn.addEventListener("click", () => openSearch(engine.url));
  return btn;
}

function renderSections() {
  sectionsEl.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const section = document.createElement("section");
    section.className = "section";

    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = cat.name;
    section.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "engines";
    cat.engines.forEach(engine => grid.appendChild(makeEngineButton(engine)));
    section.appendChild(grid);

    sectionsEl.appendChild(section);
  });
}

function openSearch(urlPattern) {
  const q = queryInput.value.trim();
  const encoded = encodeURIComponent(q);
  const url = urlPattern.replace("{q}", encoded);
  window.open(url, "_blank", "noopener,noreferrer");
}

function getDefaultEngine() {
  for (const cat of CATEGORIES) {
    const g = cat.engines.find(e => e.name.toLowerCase() === "google");
    if (g) return g;
  }
  for (const cat of CATEGORIES) if (cat.engines.length) return cat.engines[0];
  return null;
}

renderSections();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const def = getDefaultEngine();
  if (def) openSearch(def.url);
});

queryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const def = getDefaultEngine();
    if (def) openSearch(def.url);
  }
});

// =========================
// Autocomplete (DuckDuckGo JSONP, no backend)
// =========================
let acTimer = null;
let acDropdown = null;

function ensureDropdown() {
  if (acDropdown) return acDropdown;
  acDropdown = document.createElement("div");
  Object.assign(acDropdown.style, {
    position: "absolute",
    zIndex: "1000",
    background: "rgba(20,24,32,0.98)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "10px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
    padding: "6px 0",
    display: "none",
    maxHeight: "260px",
    overflowY: "auto",
    minWidth: "260px"
  });
  document.body.appendChild(acDropdown);
  return acDropdown;
}

function positionDropdown() {
  const bar = document.getElementById("searchForm");
  const rect = bar.getBoundingClientRect();
  const d = ensureDropdown();
  d.style.left = `${rect.left + window.scrollX}px`;
  d.style.top = `${rect.bottom + window.scrollY + 6}px`;
  d.style.width = `${rect.width}px`;
}

function hideDropdown() {
  if (acDropdown) acDropdown.style.display = "none";
}

function showDropdown(items) {
  const d = ensureDropdown();
  d.innerHTML = "";
  items.forEach(text => {
    const item = document.createElement("div");
    item.textContent = text;
    Object.assign(item.style, {
      padding: "8px 12px",
      cursor: "pointer",
      color: "#e8ecf1"
    });
    item.addEventListener("mouseenter", () => item.style.background = "rgba(255,255,255,0.08)");
    item.addEventListener("mouseleave", () => item.style.background = "transparent");
    item.addEventListener("click", () => {
      queryInput.value = text;
      hideDropdown();
      const def = getDefaultEngine();
      if (def) openSearch(def.url);
    });
    d.appendChild(item);
  });
  positionDropdown();
  d.style.display = items.length ? "block" : "none";
}

function fetchAutocomplete(q) {
  const cb = "ddgCallback_" + Math.random().toString(36).slice(2);
  const script = document.createElement("script");
  const url = `https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}&type=list&callback=${cb}`;
  window[cb] = function (data) {
    try {
      const suggestions = Array.isArray(data) ? data.slice(0, 8) : [];
      showDropdown(suggestions);
    } finally {
      delete window[cb];
      script.remove();
    }
  };
  script.src = url;
  script.onerror = () => {
    delete window[cb];
    script.remove();
    hideDropdown();
  };
  document.body.appendChild(script);
}

queryInput.addEventListener("input", () => {
  const q = queryInput.value.trim();
  if (!q) { hideDropdown(); return; }
  clearTimeout(acTimer);
  acTimer = setTimeout(() => fetchAutocomplete(q), 180);
});
window.addEventListener("resize", positionDropdown);
window.addEventListener("scroll", positionDropdown, { passive: true });
document.addEventListener("click", (e) => {
  const bar = document.getElementById("searchForm");
  if (!bar.contains(e.target) && (!acDropdown || !acDropdown.contains(e.target))) hideDropdown();
});

// =========================
// Chatbot via OpenRouter (Streaming + Markdown + Vision + STT/TTS)
// =========================

// IMPORTANT: Client-side keys are public. Prefer a proxy.
const encodedKey = "c2stb3ItdjEtMzA3NzViOTNhZGY5NGUzMTc2NmM0OTEwZTcxMTBiMWMxMmM1MTFlMzNiNzFiOTNjNjk2M2E0NjA2YmU1ZjQyNQ=="
const OPENROUTER_API_KEY = atob(encodedKey);
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Model mapping (ensure your select uses these values)
const MODEL_ALIASES = {
  "openrouter/horizon-beta": "openrouter/horizon-beta",
  "qwen/qwen3-coder:free": "qwen/qwen3-coder:free",
  "google/gemini-2.5-pro-exp-03-25": "google/gemini-2.5-pro-exp-03-25",
  "google/gemini-2.0-flash-exp:free": "google/gemini-2.0-flash-exp:free",
  "tngtech/deepseek-r1t2-chimera:free": "tngtech/deepseek-r1t2-chimera:free",
  "moonshotai/kimi-dev-72b:free": "moonshotai/kimi-dev-72b:free",
  "z-ai/glm-4.5-air:free": "z-ai/glm-4.5-air:free"
};

// Vision-capable models
const VISION_MODELS = new Set([
  "openrouter/horizon-beta",
  "google/gemini-2.5-pro-exp-03-25",
  "google/gemini-2.0-flash-exp:free"
]);

const expandChatBtn = document.getElementById("expandChatBtn");
const chatPanel = document.getElementById("chatPanel");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const insertQueryBtn = document.getElementById("insertQueryBtn");
const modelSelect = document.getElementById("modelSelect");

function ensureChatEnhancementsUI() {
  if (document.getElementById("chatExtras")) return;
  const footer = chatPanel.querySelector(".chat-footer");
  const container = document.createElement("div");
  container.id = "chatExtras";
  container.style.gridColumn = "1 / -1";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "8px";
  container.style.alignItems = "center";
  container.style.marginTop = "2px";

  // Image upload
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.id = "imageInput";
  fileInput.style.display = "none";

  const uploadBtn = document.createElement("button");
  uploadBtn.type = "button";
  uploadBtn.className = "small-btn";
  uploadBtn.textContent = "Attach Image";
  uploadBtn.title = "Attach an image (vision-capable models only)";
  uploadBtn.addEventListener("click", () => fileInput.click());

  const imgChip = document.createElement("span");
  imgChip.id = "imageChip";
  imgChip.textContent = "";
  imgChip.style.display = "none";
  imgChip.style.padding = "6px 8px";
  imgChip.style.border = "1px solid rgba(255,255,255,0.16)";
  imgChip.style.borderRadius = "8px";
  imgChip.style.fontSize = "12px";
  imgChip.style.color = "#b7c0cc";

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) {
      imgChip.textContent = `Attached: ${fileInput.files[0].name}`;
      imgChip.style.display = "inline-block";
    } else {
      imgChip.textContent = "";
      imgChip.style.display = "none";
    }
  });

  // STT
  const sttBtn = document.createElement("button");
  sttBtn.type = "button";
  sttBtn.className = "small-btn";
  sttBtn.textContent = "🎤 Speak";
  sttBtn.title = "Speech-to-text";

  // TTS
  const ttsBtn = document.createElement("button");
  ttsBtn.type = "button";
  ttsBtn.className = "small-btn";
  ttsBtn.textContent = "🔊 Read";
  ttsBtn.title = "Read last response";

  container.appendChild(uploadBtn);
  container.appendChild(imgChip);
  container.appendChild(fileInput);
  container.appendChild(sttBtn);
  container.appendChild(ttsBtn);
  footer.appendChild(container);

  // STT logic
  let recognition = null;
  let recognizing = false;
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new Rec();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (e) => {
      let finalTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        const res = e.results[i];
        if (res.isFinal) finalTranscript += res[0].transcript;
      }
      if (finalTranscript) {
        chatInput.value = (chatInput.value ? chatInput.value + " " : "") + finalTranscript.trim();
      }
    };
    recognition.onstart = () => {
      recognizing = true;
      sttBtn.textContent = "🛑 Stop";
    };
    recognition.onend = () => {
      recognizing = false;
      sttBtn.textContent = "🎤 Speak";
    };
    sttBtn.addEventListener("click", () => {
      if (!recognition) return;
      if (!recognizing) recognition.start();
      else recognition.stop();
    });
  } else {
    sttBtn.disabled = true;
    sttBtn.title = "Speech recognition not supported in this browser";
  }

  // TTS logic
  ttsBtn.addEventListener("click", () => {
    const lastBot = Array.from(chatBody.querySelectorAll(".bubble.bot")).pop();
    if (!lastBot) return;
    const text = lastBot.textContent || "";
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    speechSynthesis.speak(utter);
  });
}
ensureChatEnhancementsUI();

expandChatBtn.addEventListener("click", () => {
  const show = chatPanel.style.display !== "block";
  chatPanel.style.display = show ? "block" : "none";
  expandChatBtn.textContent = show ? "Hide Chatbot" : "Expand Chatbot";
  if (show) chatInput.focus();
});

insertQueryBtn.addEventListener("click", () => {
  const q = queryInput.value.trim();
  if (q) {
    if (chatInput.value) chatInput.value += (chatInput.value.endsWith(" ") ? "" : " ") + q;
    else chatInput.value = q;
    chatInput.focus();
  }
});

clearBtn.addEventListener("click", () => {
  chatBody.innerHTML = "";
});

// =========================
// Markdown renderer (lightweight) with copy buttons
// =========================
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
function renderMarkdown(md) {
  // code blocks ```
  md = md.replace(/```([\s\S]*?)```/g, (m, p1) => {
    const code = escapeHtml(p1.trim());
    return `<pre class="md-code"><code>${code}</code><button class="copy-btn" title="Copy">Copy</button></pre>`;
  });
  // inline code `
  md = md.replace(/`([^`]+)`/g, (m, p1) => `<code class="md-inline">${escapeHtml(p1)}</code>`);
  // headings
  md = md.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
  md = md.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
  md = md.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
  md = md.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  md = md.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  md = md.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  // bold/italic
  md = md.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  md = md.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // links
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`);
  // lists (basic)
  md = md.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  md = md.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");
  // tables (basic: lines with |)
  md = md.replace(/^(?:\|.+\|\r?\n)+/gm, (block) => {
    const rows = block.trim().split(/\r?\n/).map(r => r.replace(/^\||\|$/g, "").split("|"));
    const thead = rows.shift();
    const header = `<thead><tr>${thead.map(c => `<th>${escapeHtml(c.trim())}</th>`).join("")}</tr></thead>`;
    const body = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(c.trim())}</td>`).join("")}</tr>`).join("")}</tbody>`;
    return `<table class="md-table">${header}${body}</table>`;
  });
  // paragraphs
  md = md.replace(/^(?!<h\d|<ul|<table|<pre|<\/ul|<li|<\/li|<blockquote)[^\n]+$/gm, "<p>$&</p>");
  return md;
}

function addBubble(role, text, isMarkdown = false) {
  const div = document.createElement("div");
  div.className = "bubble " + (role === "user" ? "user" : "bot");
  if (isMarkdown) {
    div.innerHTML = renderMarkdown(text);
    // copy buttons
    div.querySelectorAll(".copy-btn").forEach(btn => {
      if (btn._bound) return;
      btn._bound = true;
      btn.addEventListener("click", () => {
        const code = btn.previousElementSibling?.textContent || "";
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = "Copy"), 1200);
        });
      });
    });
  } else {
    div.textContent = text;
  }
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
sendBtn.addEventListener("click", sendMessage);

const history = [];
let currentSSEController = null;

function getSelectedModelId() {
  const v = modelSelect.value;
  return MODEL_ALIASES[v] || v || "qwen/qwen3-coder:free";
}

async function fileToBase64(file) {
  const buf = await file.arrayBuffer();
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  return { b64, mime: file.type || "image/*" };
}

async function sendMessage() {
  const content = chatInput.value.trim();
  const fileInput = document.getElementById("imageInput");
  const hasFile = fileInput && fileInput.files && fileInput.files[0];
  const model = getSelectedModelId();
  if (!content && !hasFile) return;

  const partsDesc = [content];
  if (hasFile) partsDesc.push(`[Image: ${fileInput.files[0].name}]`);
  addBubble("user", partsDesc.filter(Boolean).join("\n"));

  const userMessageParts = [];
  if (content) userMessageParts.push({ type: "text", text: content });
  if (hasFile && VISION_MODELS.has(model)) {
    const { b64, mime } = await fileToBase64(fileInput.files[0]);
    userMessageParts.push({ type: "input_image", image_data: b64, mime_type: mime });
  } else if (hasFile && !VISION_MODELS.has(model)) {
    addBubble("bot", "Note: The selected model is not vision-capable. Image ignored.");
  }

  const chip = document.getElementById("imageChip");
  if (chip) { chip.textContent = ""; chip.style.display = "none"; }
  if (fileInput) fileInput.value = "";

  const userMsg = userMessageParts.length > 1
    ? { role: "user", content: userMessageParts }
    : { role: "user", content: (content || "") };
  history.push(userMsg);
  chatInput.value = "";
  setSendingState(true);

  const botDiv = addBubble("bot", "", true);

  try {
    await streamChat({
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant. Use Markdown for code and tables when appropriate." },
        ...history
      ]
    }, botDiv);
  } catch (err) {
    console.error(err);
    botDiv.innerHTML = renderMarkdown("Error: " + (err?.message || "Request failed."));
  } finally {
    setSendingState(false);
  }
}

function setSendingState(sending) {
  sendBtn.disabled = sending;
  chatInput.disabled = sending;
  modelSelect.disabled = sending;
  sendBtn.textContent = sending ? "Sending..." : "Send";
  if (!sending && currentSSEController) currentSSEController = null;
}

// SSE streaming via fetch ReadableStream
async function streamChat(payload, botDiv) {
  if (currentSSEController) {
    try { currentSSEController.abort(); } catch {}
  }
  const ctrl = new AbortController();
  currentSSEController = ctrl;

  const resp = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENROUTER_API_KEY,
      "HTTP-Referer": location.origin,
      "X-Title": "TheBestSearchEngine Chat"
    },
    body: JSON.stringify({ ...payload, stream: true }),
    signal: ctrl.signal
  });
  if (!resp.ok || !resp.body) {
    const t = await resp.text().catch(() => "");
    throw new Error("API error " + resp.status + ": " + t);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let mdText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split(/\r?\n/);
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") continue;
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content;
        if (typeof delta === "string") {
          mdText += delta;
          botDiv.innerHTML = renderMarkdown(mdText);
          botDiv.querySelectorAll(".copy-btn").forEach(btn => {
            if (btn._bound) return;
            btn._bound = true;
            btn.addEventListener("click", () => {
              const code = btn.previousElementSibling?.textContent || "";
              navigator.clipboard.writeText(code).then(() => {
                btn.textContent = "Copied";
                setTimeout(() => (btn.textContent = "Copy"), 1200);
              });
            });
          });
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      } catch { /* ignore parse errors */ }
    }
  }

  if (mdText) {
    history.push({ role: "assistant", content: mdText });
  } else {
    botDiv.innerHTML = renderMarkdown("[No response]");
  }
}

// Focus search input on load
window.addEventListener("load", () => {
  queryInput.focus({ preventScroll: true });
});
