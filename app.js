// =========================
// Search engines and UI build
// =========================
const CATEGORIES = [
  {
    name: "General Search Engines",
    engines: [
      { name: "Ask", url: "https://www.ask.com/web?q={q}", icon: "https://www.ask.com/favicon.ico" },
      { name: "Bing", url: "https://www.bing.com/search?q={q}", icon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico" },
      { name: "Brave", url: "https://search.brave.com/search?q={q}", icon: "https://search.brave.com/favicon.ico" },
      { name: "DuckDuckGo", url: "https://duckduckgo.com/?q={q}", icon: "https://duckduckgo.com/favicon.ico" },
      { name: "Google", url: "https://www.google.com/search?q={q}", icon: "https://www.google.com/favicon.ico" },
      { name: "Startpage", url: "https://www.startpage.com/sp/search?query={q}", icon: "https://www.startpage.com/sp/cdn/favicons/favicon--dark.ico" },
      { name: "Yahoo", url: "https://search.yahoo.com/search?p={q}", icon: "https://s.yimg.com/rz/l/favicon.ico" },
      { name: "YEP", url: "https://yep.com/web?q={q}", icon: "https://yep.com/favicon.ico" },
      { name: "SearXNG instances", url: "https://searx.be/search?q={q}", icon: "https://searx.be/favicon.ico" },
    ]
  },
  {
    name: "AI & Semantic Search Tools",
    engines: [
      { name: "ChatGPT", url: "https://chat.openai.com/?q={q}", icon: "https://chat.openai.com/favicon.ico" },
      { name: "Perplexity", url: "https://www.perplexity.ai/search?q={q}", icon: "https://www.perplexity.ai/favicon.ico" },
      { name: "Phind", url: "https://www.phind.com/search?q={q}", icon: "https://www.phind.com/favicon.ico" },
      { name: "WolframAlpha", url: "https://www.wolframalpha.com/input?i={q}", icon: "https://www.wolframalpha.com/_next/static/images/favicons/favicon-32x32.png" },
    ]
  },
  {
    name: "Academic & Research Databases",
    engines: [
      { name: "arXiv", url: "https://arxiv.org/search/?query={q}&searchtype=all", icon: "https://arxiv.org/favicon.ico" },
      { name: "BASE", url: "https://www.base-search.net/Search/Results?lookfor={q}", icon: "https://www.base-search.net/favicon.ico" },
      { name: "Google Scholar", url: "https://scholar.google.com/scholar?q={q}", icon: "https://scholar.google.com/favicon.ico" },
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term={q}", icon: "https://pubmed.ncbi.nlm.nih.gov/favicon.ico" },
      { name: "Semantic Scholar", url: "https://www.semanticscholar.org/search?q={q}", icon: "https://www.semanticscholar.org/favicon.ico" },
      { name: "Wikipedia", url: "https://en.wikipedia.org/w/index.php?search={q}", icon: "https://en.wikipedia.org/static/favicon/wikipedia.ico" },
      { name: "Archive.org", url: "https://archive.org/search.php?query={q}", icon: "https://archive.org/images/favicon.ico" },
    ]
  },
  {
    name: "Islamic Resources",
    engines: [
      { name: "Ahadith", url: "https://ahadith.co.uk/searchresults.php?q={q}", icon: "https://ahadith.co.uk/favicon.ico" },
      { name: "Corpus Quran", url: "https://corpus.quran.com/search.jsp?q={q}", icon: "https://corpus.quran.com/favicon.ico" },
      { name: "IslamPub", url: "https://islamhouse.com/en/search/?q={q}", icon: "https://islamhouse.com/favicon.ico" },
      { name: "IslamQnA", url: "https://islamqa.info/en/search?query={q}", icon: "https://islamqa.info/favicon.ico" },
      { name: "Quran.com", url: "https://quran.com/search?q={q}", icon: "https://quran.com/favicon.ico" },
      { name: "Sunnah.com", url: "https://sunnah.com/search?q={q}", icon: "https://sunnah.com/favicon.ico" },
    ]
  },
  {
    name: "Developer & Programming Resources",
    engines: [
      { name: "Docker Hub", url: "https://hub.docker.com/search?q={q}&type=image", icon: "https://hub.docker.com/static/favicon.ico" },
      { name: "GitHub", url: "https://github.com/search?q={q}", icon: "https://github.githubassets.com/favicons/favicon.svg" },
      { name: "Go pkg", url: "https://pkg.go.dev/search?q={q}", icon: "https://pkg.go.dev/favicon.ico" },
      { name: "Maven Central", url: "https://search.maven.org/search?q={q}", icon: "https://search.maven.org/favicon.ico" },
      { name: "MDN", url: "https://developer.mozilla.org/en-US/search?q={q}", icon: "https://developer.mozilla.org/favicon-48x48.cbbd161b.png" },
      { name: "npm", url: "https://www.npmjs.com/search?q={q}", icon: "https://www.npmjs.com/static/images/touch-icons/favicon-32x32.png" },
      { name: "PyPI", url: "https://pypi.org/search/?q={q}", icon: "https://pypi.org/static/images/favicon.6a76275d.ico" },
      { name: "Rust crates", url: "https://crates.io/search?q={q}", icon: "https://crates.io/favicon.ico" },
      { name: "Stack Exchange", url: "https://stackexchange.com/search?q={q}", icon: "https://stackexchange.com/favicon.ico" },
      { name: "StackOverflow", url: "https://stackoverflow.com/search?q={q}", icon: "https://stackoverflow.design/assets/img/favicons/favicon.ico" },
    ]
  },
  {
    name: "Social Media & Community Platforms",
    engines: [
      { name: "LinkedIn", url: "https://www.linkedin.com/search/results/all/?keywords={q}", icon: "https://www.linkedin.com/favicon.ico" },
      { name: "Reddit", url: "https://www.reddit.com/search/?q={q}", icon: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png" },
      { name: "Threads", url: "https://www.threads.net/search?q={q}", icon: "https://www.threads.net/favicon.ico" },
      { name: "TikTok", url: "https://www.tiktok.com/search?q={q}", icon: "https://www.tiktok.com/favicon.ico" },
      { name: "YouTube", url: "https://www.youtube.com/results?search_query={q}", icon: "https://www.youtube.com/favicon.ico" },
    ]
  },
  {
    name: "E-commerce & Shopping",
    engines: [
      { name: "AliExpress", url: "https://www.aliexpress.com/wholesale?SearchText={q}", icon: "https://www.aliexpress.com/favicon.ico" },
      { name: "Amazon", url: "https://www.amazon.com/s?k={q}", icon: "https://www.amazon.com/favicon.ico" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw={q}", icon: "https://www.ebay.com/favicon.ico" },
      { name: "Google Shopping", url: "https://www.google.com/search?tbm=shop&q={q}", icon: "https://www.google.com/favicon.ico" },
    ]
  },
  {
    name: "Media, Entertainment & Creative Content",
    engines: [
      { name: "Giphy", url: "https://giphy.com/search/{q}", icon: "https://giphy.com/favicon.ico" },
      { name: "IMDb", url: "https://www.imdb.com/find?q={q}", icon: "https://www.imdb.com/favicon.ico" },
      { name: "Openverse", url: "https://openverse.org/search?q={q}", icon: "https://openverse.org/favicon.ico" },
      { name: "Pixabay", url: "https://pixabay.com/images/search/{q}/", icon: "https://pixabay.com/favicon.ico" },
      { name: "SoundCloud", url: "https://soundcloud.com/search?q={q}", icon: "https://soundcloud.com/favicon.ico" },
      { name: "Spotify", url: "https://open.spotify.com/search/{q}", icon: "https://open.spotify.com/favicon.ico" },
    ]
  }
];

// Sort engines in each category alphabetically
CATEGORIES.forEach(cat => cat.engines.sort((a, b) => a.name.localeCompare(b.name)));

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

// Google as default on Enter
function getDefaultEngine() {
  for (const cat of CATEGORIES) {
    const g = cat.engines.find(e => e.name.toLowerCase() === "google");
    if (g) return g;
  }
  for (const cat of CATEGORIES) if (cat.engines.length) return cat.engines[0];
  return null;
}

// Build UI
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
// Chatbot via OpenRouter
// =========================
const encodedKey = "c2stb3ItdjEtMzA3NzViOTNhZGY5NGUzMTc2NmM0OTEwZTcxMTBiMWMxMmM1MTFlMzNiNzFiOTNjNjk2M2E0NjA2YmU1ZjQyNQ==" 
const OPENROUTER_API_KEY = atob(encodedKey);// Replace securely in production
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const expandChatBtn = document.getElementById("expandChatBtn");
const chatPanel = document.getElementById("chatPanel");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const insertQueryBtn = document.getElementById("insertQueryBtn");
const modelSelect = document.getElementById("modelSelect");

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

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
sendBtn.addEventListener("click", sendMessage);

const history = []; // chat history

function addBubble(role, text) {
  const div = document.createElement("div");
  div.className = "bubble " + (role === "user" ? "user" : "bot");
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage() {
  const content = chatInput.value.trim();
  if (!content) return;
  addBubble("user", content);
  history.push({ role: "user", content });
  chatInput.value = "";
  setSendingState(true);

  try {
    const model = modelSelect.value || "qwen3-coder:free";
    const resp = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENROUTER_API_KEY,
        "HTTP-Referer": location.origin,
        "X-Title": "TheBestSearchEngine Chat"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are a helpful assistant. Keep responses concise unless asked otherwise." },
          ...history
        ],
        stream: false
      })
    });

    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      throw new Error("API error " + resp.status + ": " + t);
    }

    const data = await resp.json();
    const botText = data.choices?.[0]?.message?.content || "[No response]";
    addBubble("assistant", botText);
    history.push({ role: "assistant", content: botText });
  } catch (err) {
    console.error(err);
    addBubble("assistant", "Error: " + (err?.message || "Request failed."));
  } finally {
    setSendingState(false);
  }
}

function setSendingState(sending) {
  sendBtn.disabled = sending;
  chatInput.disabled = sending;
  modelSelect.disabled = sending;
  sendBtn.textContent = sending ? "Sending..." : "Send";
}

// Focus search input on load
window.addEventListener("load", () => {
  queryInput.focus({ preventScroll: true });
});
