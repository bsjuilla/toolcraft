/* ToolCraft Features JS — drop-in enhancement file */
(function() {
'use strict';

// ── TOOL DESCRIPTIONS ─────────────────────────────────────────────────────────
const DESCRIPTIONS = {
  'Word Counter': 'Count words, characters, sentences and paragraphs in any text. Estimates reading time at 200 words per minute.',
  'Percentage Calc': 'Calculate percentages three ways: find X% of a number, determine what percentage one number is of another, or calculate the percentage change between two values.',
  'Age Calculator': 'Calculate your exact age in years, months and days from your date of birth. Also shows total days lived and days until your next birthday.',
  'Password Generator': 'Generate cryptographically secure random passwords using your browser\'s built-in crypto API. Your password is never transmitted — all generation happens locally.',
  'Text Case Converter': 'Instantly convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case.',
  'BMI Calculator': 'Calculate your Body Mass Index from weight and height. Includes your health category and ideal weight range based on WHO guidelines.',
  'Unit Converter': 'Convert between hundreds of unit combinations across length, weight, temperature, speed, area and volume.',
  'Tip Calculator': 'Calculate tip amounts and split bills between any number of people. Adjust the tip percentage with a slider.',
  'Colour Converter': 'Convert any colour between HEX, RGB and HSL formats instantly. Click any value to copy it. Use the colour picker or type a HEX code directly.',
  'Loan Calculator': 'Calculate monthly loan repayments, total amount repaid, and total interest for any loan amount, interest rate and term.',
  'QR Code Generator': 'Generate QR codes for any URL or text instantly. Download as PNG for use in print, digital, or sharing.',
  'Random Picker': 'Randomly select names from a list or generate random numbers in any range. Perfect for raffles, team picks, or decisions.',
  'Stopwatch': 'Millisecond-precision stopwatch with lap tracking. Lap times are recorded in reverse order for easy reading.',
  'Countdown Timer': 'Set a custom countdown timer with hours, minutes and seconds. An alert fires when time is up.',
  'Compound Interest': 'See how investments grow over time with compound interest. Choose annual, quarterly, monthly or daily compounding.',
  'Grade Calculator': 'Enter percentage scores to calculate your average grade and GPA. Supports any number of subjects.',
  'Number Base Converter': 'Convert numbers between decimal, binary, hexadecimal and octal in real time. Indispensable for programmers.',
  'Base64 Encoder': 'Encode plain text to Base64 or decode Base64 strings back to readable text. Useful for APIs, data URIs and email attachments.',
  'JSON Formatter': 'Beautify minified JSON for readability, minify formatted JSON for production, or validate JSON syntax instantly.',
  'Text Reverser': 'Reverse characters, reverse words, or check if text is a palindrome.',
  'Roman Numerals': 'Convert numbers to Roman numerals (I–MMMCMXCIX) or convert Roman numerals back to decimal.',
  'Calorie Calculator': 'Calculate your daily calorie needs (TDEE) based on age, gender, weight, height and activity level using the Mifflin-St Jeor formula.',
  'Sleep Calculator': 'Find your optimal bedtimes and wake-up times based on 90-minute sleep cycles for maximum restfulness.',
  'Aspect Ratio Calc': 'Calculate image and video dimensions while maintaining a specific aspect ratio. Supports 16:9, 4:3, 1:1 and any custom ratio.',
  'Currency Converter': 'Convert between 20 major world currencies including USD, EUR, GBP, JPY, MUR and more. Rates are approximate.',
  'Duplicate Line Remover': 'Paste any list and remove duplicate lines instantly. Optionally sort the results alphabetically.',
  'Lorem Ipsum Generator': 'Generate placeholder text for design mockups and prototypes. Classic Lorem Ipsum or randomised word variants.',
  'Mortgage Calculator': 'Calculate monthly mortgage payments, total repayment and total interest for home loans with any down payment.',
  'Char Frequency': 'Analyse text to find the most frequently used characters and letters. Useful for cryptography and language analysis.',
  'URL Encoder': 'Encode special characters in URLs for safe transmission, or decode percent-encoded URL strings back to readable text.',
  'Invoice Generator': 'Create a simple invoice with your details, client name, description and amount. Print directly or save as PDF.',
  'Hash Generator': 'Generate SHA-256 and SHA-1 cryptographic hashes of any text. Useful for verifying file integrity and checksums.',
  'Regex Tester': 'Test regular expressions against text in real time. Shows all matches with their positions. Supports all standard JS regex flags.',
  'CSS Gradient Generator': 'Create linear or radial CSS gradients with a live preview. Adjust colours and angle, then copy the CSS with one click.',
  'Box Shadow Generator': 'Visually build CSS box-shadow values. Adjust offset, blur, spread, colour and opacity with a live preview.',
  'Color Palette Generator': 'Generate harmonious colour palettes from a base colour. Choose complementary, analogous, triadic or shade variations.',
  'JWT Decoder': 'Decode and inspect JSON Web Tokens without a server. Reveals the header, payload claims, and expiry time.',
  'Diff Checker': 'Compare two blocks of text line by line. Added lines are shown in green, removed lines in red.',
  'Markdown Preview': 'Write Markdown and see a live HTML preview. Supports headings, bold, italic, code, and lists.',
  'Meta Tag Generator': 'Generate SEO meta tags, Open Graph tags and Twitter Card tags for any webpage. Copy the complete HTML snippet.',
  'Robots.txt Generator': 'Generate a robots.txt file to control how search engine crawlers access your website.',
  'VAT / Tax Calculator': 'Add or remove VAT and sales tax from any price. Works with any tax rate for any country.',
  'Salary Converter': 'Convert salaries between annual, monthly, weekly and hourly rates. Based on a standard 40-hour work week.',
  'ROI Calculator': 'Calculate return on investment, profit/loss, and annualised ROI for any investment.',
  'Break-Even Calculator': 'Find how many units you need to sell to cover your fixed costs. Essential for business planning.',
  'Due Date Calculator': 'Calculate your pregnancy due date from your last period. Shows current week, trimester and days remaining.',
  'Water Intake Calc': 'Calculate your recommended daily water intake based on weight, activity level and climate.',
  'Macro Calculator': 'Get your daily protein, carbohydrate and fat targets based on your calorie goal and fitness objective.'
};

// ── TOOL OF THE DAY DATA ──────────────────────────────────────────────────────
const TOOL_OF_DAY_LIST = [
  'Password Generator','CSS Gradient Generator','JWT Decoder','Compound Interest',
  'Sleep Calculator','Color Palette Generator','Regex Tester','Mortgage Calculator',
  'Calorie Calculator','Diff Checker','Break-Even Calculator','Hash Generator',
  'Aspect Ratio Calc','Markdown Preview','Roman Numerals','Salary Converter',
  'VAT / Tax Calculator','Base64 Encoder','Number Base Converter','Lorem Ipsum Generator'
];

// ── INIT ON DOM READY ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initToolOfDay();
  initFavourites();
  initRecentlyUsed();
  initTabCounts();
  initDescriptions();
  initShareButtons();
  initUsageCounters();
  initKeyboardShortcut();
  initSuggestTool();
  injectToast();
  trackToolInteractions();
});

// ── DARK MODE ─────────────────────────────────────────────────────────────────
function initDarkMode() {
  const header = document.querySelector('header');
  if (!header) return;
  const btn = document.createElement('button');
  btn.className = 'dark-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  const isDark = localStorage.getItem('tc-dark') === '1';
  if (isDark) document.body.classList.add('dark');
  btn.textContent = isDark ? '☀' : '🌙';
  btn.onclick = function() {
    const dark = document.body.classList.toggle('dark');
    localStorage.setItem('tc-dark', dark ? '1' : '0');
    btn.textContent = dark ? '☀' : '🌙';
  };
  // Insert before the header count badge
  const count = header.querySelector('.header-count') || header.querySelector('[id="tool-count"]');
  if (count) {
    header.insertBefore(btn, count);
  } else {
    header.appendChild(btn);
  }
}

// ── TOOL OF THE DAY ───────────────────────────────────────────────────────────
function initToolOfDay() {
  const navTabs = document.getElementById('tabs');
  if (!navTabs) return;
  const dayIndex = Math.floor(Date.now() / 86400000) % TOOL_OF_DAY_LIST.length;
  const todName = TOOL_OF_DAY_LIST[dayIndex];
  const banner = document.createElement('div');
  banner.className = 'totd-banner';
  banner.innerHTML =
    '<div class="totd-left">' +
      '<span class="totd-label">Tool of the Day</span>' +
      '<span class="totd-name">' + todName + '</span>' +
    '</div>' +
    '<button class="totd-btn" id="totd-go">Try it now →</button>';
  navTabs.parentNode.insertBefore(banner, navTabs);
  document.getElementById('totd-go').onclick = function() {
    const cards = document.querySelectorAll('.tool-card');
    for (const card of cards) {
      const title = card.querySelector('.card-title');
      if (title && title.textContent.trim() === todName) {
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.boxShadow = '0 0 0 2px var(--accent)';
        setTimeout(() => card.style.boxShadow = '', 2000);
        break;
      }
    }
  };
}

// ── FAVOURITES ────────────────────────────────────────────────────────────────
function initFavourites() {
  let favs = JSON.parse(localStorage.getItem('tc-favs') || '[]');
  // Build favourites section
  const favsSection = document.createElement('div');
  favsSection.className = 'favs-section' + (favs.length ? ' visible' : '');
  favsSection.innerHTML = '<div class="favs-label">★ My Favourites</div><div class="favs-strip" id="favs-strip"></div>';
  const navTabs = document.getElementById('tabs');
  if (navTabs) navTabs.parentNode.insertBefore(favsSection, navTabs);

  function renderFavs() {
    const strip = document.getElementById('favs-strip');
    if (!strip) return;
    strip.innerHTML = '';
    favs.forEach(function(name) {
      const chip = document.createElement('button');
      chip.className = 'fav-chip';
      chip.textContent = name;
      chip.onclick = function() { scrollToTool(name); };
      strip.appendChild(chip);
    });
    favsSection.classList.toggle('visible', favs.length > 0);
  }

  // Add star to each card
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const btn = document.createElement('button');
    btn.className = 'fav-btn' + (favs.includes(name) ? ' active' : '');
    btn.setAttribute('aria-label', 'Favourite ' + name);
    btn.textContent = '★';
    btn.onclick = function(e) {
      e.stopPropagation();
      if (favs.includes(name)) {
        favs = favs.filter(function(f) { return f !== name; });
        btn.classList.remove('active');
      } else {
        favs.push(name);
        btn.classList.add('active');
      }
      localStorage.setItem('tc-favs', JSON.stringify(favs));
      renderFavs();
    };
    card.appendChild(btn);
  });
  renderFavs();
}

// ── RECENTLY USED ─────────────────────────────────────────────────────────────
function initRecentlyUsed() {
  let recent = JSON.parse(localStorage.getItem('tc-recent') || '[]');
  const recentSection = document.createElement('div');
  recentSection.className = 'recent-section' + (recent.length ? ' visible' : '');
  recentSection.innerHTML = '<div class="recent-label">Recently Used</div><div class="recent-strip" id="recent-strip"></div>';
  const favsSection = document.querySelector('.favs-section');
  const navTabs = document.getElementById('tabs');
  const insertBefore = favsSection || navTabs;
  if (insertBefore) insertBefore.parentNode.insertBefore(recentSection, insertBefore);

  function renderRecent() {
    const strip = document.getElementById('recent-strip');
    if (!strip) return;
    strip.innerHTML = '';
    recent.slice(0, 6).forEach(function(name) {
      const chip = document.createElement('button');
      chip.className = 'recent-chip';
      chip.textContent = name;
      chip.onclick = function() { scrollToTool(name); };
      strip.appendChild(chip);
    });
    recentSection.classList.toggle('visible', recent.length > 0);
  }
  renderRecent();
  window._tcAddRecent = function(name) {
    recent = [name, ...recent.filter(function(r) { return r !== name; })].slice(0, 6);
    localStorage.setItem('tc-recent', JSON.stringify(recent));
    renderRecent();
  };
}

// ── TAB COUNTS ────────────────────────────────────────────────────────────────
function initTabCounts() {
  const cards = document.querySelectorAll('.tool-card');
  const counts = { all: cards.length };
  cards.forEach(function(c) {
    const t = c.dataset.tool;
    if (t) counts[t] = (counts[t] || 0) + 1;
  });
  document.querySelectorAll('.nav-tab').forEach(function(btn) {
    const text = btn.textContent.trim().toLowerCase();
    let key = text;
    if (text === 'all') key = 'all';
    const count = counts[key];
    if (count !== undefined) {
      const badge = document.createElement('span');
      badge.className = 'tab-count';
      badge.textContent = count;
      btn.appendChild(badge);
    }
  });
}

// ── TOOL DESCRIPTIONS ─────────────────────────────────────────────────────────
function initDescriptions() {
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const desc = DESCRIPTIONS[name];
    if (!desc) return;
    const body = card.querySelector('.card-body');
    if (!body) return;
    const el = document.createElement('p');
    el.className = 'tool-desc';
    el.textContent = desc;
    body.appendChild(el);
  });
}

// ── PAGE TITLE UPDATE ─────────────────────────────────────────────────────────
function trackToolInteractions() {
  const originalTitle = document.title;
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const inputs = card.querySelectorAll('input, textarea, select, button');
    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        document.title = name + ' — ToolCraft';
      }, { once: false });
    });
    card.addEventListener('mouseleave', function() {
      setTimeout(function() { document.title = originalTitle; }, 3000);
    });
    // Track usage
    inputs.forEach(function(input) {
      ['input', 'change', 'click'].forEach(function(evt) {
        input.addEventListener(evt, function() {
          trackUsage(name);
          if (window._tcAddRecent) window._tcAddRecent(name);
        }, { once: true });
      });
    });
  });
}

// ── SHARE BUTTONS ─────────────────────────────────────────────────────────────
function initShareButtons() {
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const body = card.querySelector('.card-body');
    if (!body) return;
    const btn = document.createElement('button');
    btn.className = 'share-btn';
    btn.innerHTML = '&#x1F517; Share';
    btn.onclick = function() {
      const url = window.location.origin + '/?tool=' + slug;
      navigator.clipboard.writeText(url).then(function() {
        showToast('Link copied to clipboard!');
      });
    };
    body.appendChild(btn);
  });
}

// ── USAGE COUNTER ─────────────────────────────────────────────────────────────
function initUsageCounters() {
  const usage = JSON.parse(localStorage.getItem('tc-usage') || '{}');
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const count = usage[name] || 0;
    const body = card.querySelector('.card-body');
    if (!body || count === 0) return;
    const el = document.createElement('span');
    el.className = 'usage-count';
    el.innerHTML = 'Used <strong>' + count.toLocaleString() + '</strong> time' + (count !== 1 ? 's' : '') + ' by you';
    body.appendChild(el);
  });
}

function trackUsage(name) {
  const usage = JSON.parse(localStorage.getItem('tc-usage') || '{}');
  usage[name] = (usage[name] || 0) + 1;
  localStorage.setItem('tc-usage', JSON.stringify(usage));
}

// ── KEYBOARD SHORTCUT ─────────────────────────────────────────────────────────
function initKeyboardShortcut() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  // Add hint label
  const hint = document.createElement('span');
  hint.className = 'kbd-hint';
  hint.textContent = '/';
  const box = searchInput.parentElement;
  if (box) box.appendChild(hint);
  // Listen for / key
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
      searchInput.value = '';
      if (typeof doSearch === 'function') doSearch();
    }
  });
}

// ── SUGGEST A TOOL ────────────────────────────────────────────────────────────
function initSuggestTool() {
  const grid = document.getElementById('grid');
  if (!grid) return;
  // Add suggest button above grid
  const btn = document.createElement('button');
  btn.className = 'suggest-btn';
  btn.innerHTML = '&#128161; Suggest a Tool';
  grid.parentNode.insertBefore(btn, grid);

  // Build modal
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML =
    '<div class="modal">' +
      '<h3>Suggest a Tool</h3>' +
      '<p>What tool would you like us to build? We read every suggestion.</p>' +
      '<input type="text" id="sug-name" placeholder="Tool name (e.g. Pomodoro Timer)"/>' +
      '<textarea id="sug-desc" placeholder="Describe what it should do…"></textarea>' +
      '<div class="modal-btns">' +
        '<button class="modal-cancel" id="sug-cancel">Cancel</button>' +
        '<button class="modal-submit" id="sug-submit">Send Suggestion →</button>' +
      '</div>' +
      '<p class="modal-success" id="sug-success">✓ Thanks! We\'ll consider it for the next update.</p>' +
    '</div>';
  document.body.appendChild(overlay);

  btn.onclick = function() { overlay.classList.add('open'); };
  document.getElementById('sug-cancel').onclick = function() { overlay.classList.remove('open'); };
  overlay.onclick = function(e) { if (e.target === overlay) overlay.classList.remove('open'); };

  document.getElementById('sug-submit').onclick = function() {
    const name = document.getElementById('sug-name').value.trim();
    const desc = document.getElementById('sug-desc').value.trim();
    if (!name) { document.getElementById('sug-name').focus(); return; }
    // Save suggestion locally
    const suggestions = JSON.parse(localStorage.getItem('tc-suggestions') || '[]');
    suggestions.push({ name, desc, date: new Date().toISOString() });
    localStorage.setItem('tc-suggestions', JSON.stringify(suggestions));
    document.getElementById('sug-success').style.display = 'block';
    document.getElementById('sug-name').value = '';
    document.getElementById('sug-desc').value = '';
    setTimeout(function() {
      overlay.classList.remove('open');
      document.getElementById('sug-success').style.display = 'none';
    }, 2000);
  };
}

// ── TOAST NOTIFICATION ────────────────────────────────────────────────────────
function injectToast() {
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.id = 'tc-toast';
  document.body.appendChild(toast);
}

function showToast(msg) {
  const toast = document.getElementById('tc-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2200);
}

// ── SCROLL TO TOOL ────────────────────────────────────────────────────────────
function scrollToTool(name) {
  const cards = document.querySelectorAll('.tool-card');
  for (const card of cards) {
    const title = card.querySelector('.card-title');
    if (title && title.textContent.trim() === name) {
      card.classList.add('active');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.boxShadow = '0 0 0 2px var(--accent)';
      setTimeout(function() { card.style.boxShadow = ''; }, 2000);
      break;
    }
  }
}

})();
