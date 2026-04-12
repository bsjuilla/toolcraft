/* ToolCraft Collections JS */
(function(){
'use strict';

// ── TOOL KITS ─────────────────────────────────────────────────────────────────
const KITS = {
  student: {
    label: 'Student Kit',
    icon: '🎓',
    tools: ['Word Counter','Readability Score','Citation Generator','Grade Calculator','Pomodoro Timer','Scratchpad','Age Calculator','Percentage Calc']
  },
  developer: {
    label: 'Developer Kit',
    icon: '💻',
    tools: ['JWT Decoder','Base64 Encoder','JSON Formatter','Regex Tester','Hash Generator','Diff Checker','What Is My IP','Number Base Converter','URL Encoder','Markdown Preview']
  },
  freelancer: {
    label: 'Freelancer Kit',
    icon: '💼',
    tools: ['Invoice Generator','ROI Calculator','Salary Converter','Tip Calculator','Loan Calculator','Timezone Converter','Break-Even Calculator','Compound Interest']
  },
  designer: {
    label: 'Designer Kit',
    icon: '🎨',
    tools: ['Colour Converter','Contrast Checker','Color Palette Generator','CSS Gradient Generator','Aspect Ratio Calc','Box Shadow Generator','Unicode & Emoji Finder','QR Code Generator']
  },
  health: {
    label: 'Health Kit',
    icon: '💪',
    tools: ['BMI Calculator','Calorie Calculator','Water Intake Calc','Macro Calculator','Sleep Calculator','Habit Tracker','Age Calculator','Due Date Calculator']
  }
};

// ── LEARN MORE CONTENT ────────────────────────────────────────────────────────
const LEARN_MORE = {
  'Word Counter': {
    body: 'The Word Counter analyses your text in real time, counting words, characters, sentences and paragraphs. It also estimates reading time based on an average reading speed of 200 words per minute.',
    tip: '💡 Tip: Most blog posts rank better when they are between 1,500–2,500 words. Use this tool to hit your target length.'
  },
  'Password Generator': {
    body: 'This tool uses your browser\'s built-in <strong>crypto.getRandomValues()</strong> API — the same cryptographic randomness used in banking software. Your password is generated entirely in your browser and never transmitted anywhere.',
    tip: '💡 Tip: Use at least 16 characters with all four character types for a password that would take centuries to crack.'
  },
  'BMI Calculator': {
    body: 'Body Mass Index (BMI) is calculated by dividing your weight in kilograms by your height in metres squared. It gives a general indication of healthy weight ranges but does not account for muscle mass, bone density or body composition.',
    tip: '💡 Tip: BMI is a screening tool, not a diagnosis. Consult a healthcare professional for a full health assessment.'
  },
  'Compound Interest': {
    body: 'Compound interest is often called the eighth wonder of the world. Unlike simple interest which is calculated only on the principal, compound interest is calculated on the principal <em>plus</em> all previously earned interest.',
    tip: '💡 Tip: Monthly compounding grows your money 0.4% faster per year than annual compounding on the same rate. Always check how often your investment compounds.'
  },
  'QR Code Generator': {
    body: 'QR codes (Quick Response codes) store data in a grid of black and white squares readable by any smartphone camera. This tool generates them via the free api.qrserver.com service — the only tool on ToolCraft that sends data to an external server.',
    tip: '💡 Tip: For printed QR codes, always test scanning at the actual print size before mass production. Small QR codes can be hard to scan.'
  },
  'JWT Decoder': {
    body: 'JSON Web Tokens (JWTs) are encoded in Base64 and consist of three parts separated by dots: Header (algorithm), Payload (claims), and Signature. This tool decodes the header and payload without verifying the signature.',
    tip: '💡 Tip: Never paste production JWTs containing sensitive data into online tools. This tool is browser-only and sends nothing to our servers.'
  },
  'Regex Tester': {
    body: 'Regular expressions (regex) are patterns used to match character combinations in strings. The flags field controls behaviour: <strong>g</strong> finds all matches, <strong>i</strong> ignores case, <strong>m</strong> treats each line separately.',
    tip: '💡 Tip: Test your regex with edge cases — empty strings, special characters, and very long inputs — before using it in production code.'
  },
  'Calorie Calculator': {
    body: 'This calculator uses the Mifflin-St Jeor equation — the most accurate formula for estimating Basal Metabolic Rate (BMR). Your result is multiplied by an activity factor to give your Total Daily Energy Expenditure (TDEE).',
    tip: '💡 Tip: To lose 0.5kg per week, subtract 500 calories from your TDEE. To gain, add 500. Always prioritise protein at 1.6–2.2g per kg of bodyweight.'
  },
  'Loan Calculator': {
    body: 'This tool calculates EMI (Equated Monthly Instalment) using the standard amortisation formula. Each monthly payment covers both interest and a portion of the principal, with the interest portion decreasing over time.',
    tip: '💡 Tip: Making one extra payment per year on a 30-year mortgage can shave 4–6 years off the loan and save thousands in interest.'
  },
  'Sleep Calculator': {
    body: 'Sleep occurs in 90-minute cycles, each consisting of light sleep, deep sleep and REM sleep. Waking in the middle of a cycle causes grogginess. This calculator adds 15 minutes for the average time it takes to fall asleep.',
    tip: '💡 Tip: Most adults need 5–6 complete cycles (7.5–9 hours). Teenagers need 6–7 cycles. Consistency matters more than total hours.'
  },
  'Contrast Checker': {
    body: 'WCAG (Web Content Accessibility Guidelines) defines contrast ratios required for accessible web design. AA standard requires 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1 and 4.5:1 respectively.',
    tip: '💡 Tip: About 8% of men and 0.5% of women have colour blindness. Always design with contrast ratios in mind, not just colour alone.'
  },
  'Pomodoro Timer': {
    body: 'The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s. Work in 25-minute focused intervals ("pomodoros") separated by 5-minute breaks. After 4 pomodoros, take a longer 15–30 minute break.',
    tip: '💡 Tip: During a pomodoro, write down any distracting thoughts on paper instead of acting on them. Return to them during breaks.'
  },
  'Typing Speed Test': {
    body: 'Typing speed is measured in WPM (Words Per Minute), where a "word" is defined as 5 characters. The average office worker types 40 WPM. Professional typists average 65–75 WPM. World record holders exceed 200 WPM.',
    tip: '💡 Tip: Focus on accuracy first, not speed. Speed naturally increases as accurate patterns become muscle memory. Slow down to go fast.'
  },
  'CSS Gradient Generator': {
    body: 'CSS gradients are generated natively by the browser — no images required. Linear gradients go in one direction, radial gradients radiate from a centre point. Both support multiple colour stops for complex effects.',
    tip: '💡 Tip: Use gradients subtly for backgrounds. High-contrast gradients can cause readability issues with overlaid text.'
  }
};

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id: 'first', name: 'First Tool', icon: '🔧', desc: 'Used your first tool', condition: s => s.toolsUsed >= 1 },
  { id: 'explorer', name: 'Explorer', icon: '🗺️', desc: 'Used 5 different tools', condition: s => s.toolsUsed >= 5 },
  { id: 'power', name: 'Power User', icon: '⚡', desc: 'Used 15 different tools', condition: s => s.toolsUsed >= 15 },
  { id: 'master', name: 'ToolMaster', icon: '🏆', desc: 'Used 30 different tools', condition: s => s.toolsUsed >= 30 },
  { id: 'streak3', name: '3-Day Streak', icon: '🔥', desc: 'Visited 3 days in a row', condition: s => s.streak >= 3 },
  { id: 'streak7', name: 'Week Warrior', icon: '🔥🔥', desc: 'Visited 7 days in a row', condition: s => s.streak >= 7 },
  { id: 'sharer', name: 'Sharer', icon: '🔗', desc: 'Shared a tool link', condition: s => s.shared >= 1 },
  { id: 'voter', name: 'Voter', icon: '👍', desc: 'Voted on a tool', condition: s => s.voted >= 1 },
  { id: 'darkside', name: 'Dark Side', icon: '🌙', desc: 'Enabled dark mode', condition: s => s.darkMode },
  { id: 'favourite', name: 'Collector', icon: '⭐', desc: 'Added 3 favourites', condition: s => s.favourites >= 3 }
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let stats = JSON.parse(localStorage.getItem('tc-stats') || '{"toolsUsed":0,"usedSet":[],"streak":0,"lastVisit":"","shared":0,"voted":0,"darkMode":false,"favourites":0}');
let compareSelected = [];

function saveStats() { localStorage.setItem('tc-stats', JSON.stringify(stats)); }

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  updateStreak();
  initKits();
  initHistory();
  initAchievements();
  initNewsletter();
  initLearnMore();
  initVoting();
  initShareResult();
  initEmbedButtons();
  initCompareMode();
  initLangSwitcher();
});

// ── STREAK TRACKER ────────────────────────────────────────────────────────────
function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (stats.lastVisit === today) return;
  if (stats.lastVisit === yesterday) stats.streak++;
  else stats.streak = 1;
  stats.lastVisit = today;
  saveStats();
}

// ── TOOL KITS ─────────────────────────────────────────────────────────────────
function initKits() {
  const navTabs = document.getElementById('tabs');
  if (!navTabs) return;
  const section = document.createElement('div');
  section.className = 'kit-section';
  const label = document.createElement('div');
  label.className = 'kit-label';
  label.setAttribute('data-i18n', 'kits_label');
  label.textContent = 'Quick Kits — tools for your workflow';
  const strip = document.createElement('div');
  strip.className = 'kit-strip';
  Object.entries(KITS).forEach(function([key, kit]) {
    const btn = document.createElement('button');
    btn.className = 'kit-btn';
    btn.innerHTML = '<span class="kit-icon">' + kit.icon + '</span>' + kit.label;
    btn.onclick = function() {
      const isActive = btn.classList.contains('active');
      document.querySelectorAll('.kit-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tool-card').forEach(function(c) {
        c.classList.toggle('active', !isActive || c.dataset.tool === 'all');
      });
      if (!isActive) {
        btn.classList.add('active');
        // Show only kit tools
        document.querySelectorAll('.tool-card').forEach(function(c) {
          const title = c.querySelector('.card-title');
          if (!title) return;
          c.classList.toggle('active', kit.tools.includes(title.textContent.trim()));
        });
        // Reset tab
        document.querySelectorAll('.nav-tab').forEach(function(t, i) { t.classList.toggle('on', i === 0); });
        document.getElementById('search-input') && (document.getElementById('search-input').value = '');
      } else {
        document.querySelectorAll('.tool-card').forEach(function(c) { c.classList.add('active'); });
      }
    };
    strip.appendChild(btn);
  });
  section.appendChild(label);
  section.appendChild(strip);
  navTabs.parentNode.insertBefore(section, navTabs);
}

// ── SESSION HISTORY ───────────────────────────────────────────────────────────
function initHistory() {
  let history = JSON.parse(localStorage.getItem('tc-session-history') || '[]');
  if (!history.length) return;
  const section = document.createElement('div');
  section.className = 'history-section visible';
  section.innerHTML = '<div class="history-label">Last session</div><div class="history-strip" id="history-strip"></div>';
  const navTabs = document.getElementById('tabs');
  if (navTabs) navTabs.parentNode.insertBefore(section, navTabs);
  const strip = document.getElementById('history-strip');
  history.slice(0, 5).forEach(function(name) {
    const chip = document.createElement('button');
    chip.className = 'history-chip';
    chip.textContent = name;
    chip.onclick = function() { scrollToNamedTool(name); };
    strip.appendChild(chip);
  });
  // Save new session on unload
  window.addEventListener('beforeunload', function() {
    const recent = JSON.parse(localStorage.getItem('tc-recent') || '[]');
    if (recent.length) localStorage.setItem('tc-session-history', JSON.stringify(recent.slice(0, 5)));
  });
}

// ── LEARN MORE ────────────────────────────────────────────────────────────────
function initLearnMore() {
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const content = LEARN_MORE[name];
    if (!content) return;
    const body = card.querySelector('.card-body');
    if (!body) return;
    const toggle = document.createElement('button');
    toggle.className = 'learn-more-toggle';
    toggle.innerHTML = '<span class="toggle-arrow">▶</span> How does this work?';
    const lmBody = document.createElement('div');
    lmBody.className = 'learn-more-body';
    lmBody.innerHTML = '<p>' + content.body + '</p>' + (content.tip ? '<div class="learn-more-tip">' + content.tip + '</div>' : '');
    toggle.onclick = function() {
      const open = lmBody.classList.toggle('visible');
      toggle.classList.toggle('open', open);
    };
    body.appendChild(toggle);
    body.appendChild(lmBody);
  });
}

// ── VOTING ────────────────────────────────────────────────────────────────────
function initVoting() {
  const votes = JSON.parse(localStorage.getItem('tc-votes') || '{}');
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const body = card.querySelector('.card-body');
    if (!body) return;
    const count = votes[name] || 0;
    const myVote = votes[name + '_mine'] || false;
    const btn = document.createElement('button');
    btn.className = 'vote-btn' + (myVote ? ' voted' : '');
    btn.innerHTML = '👍 <span class="vote-count">' + (count || '') + '</span>';
    btn.title = 'Found this useful?';
    btn.onclick = function() {
      const v = JSON.parse(localStorage.getItem('tc-votes') || '{}');
      if (v[name + '_mine']) {
        v[name] = Math.max(0, (v[name] || 1) - 1);
        v[name + '_mine'] = false;
        btn.classList.remove('voted');
      } else {
        v[name] = (v[name] || 0) + 1;
        v[name + '_mine'] = true;
        btn.classList.add('voted');
        stats.voted++;
        saveStats();
        checkAchievements();
      }
      localStorage.setItem('tc-votes', JSON.stringify(v));
      btn.querySelector('.vote-count').textContent = v[name] || '';
    };
    body.appendChild(btn);
  });
}

// ── SHAREABLE RESULTS ─────────────────────────────────────────────────────────
function initShareResult() {
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const body = card.querySelector('.card-body');
    if (!body) return;
    const btn = document.createElement('button');
    btn.className = 'share-result-btn';
    btn.innerHTML = '🔗 Share this tool';
    btn.onclick = function() {
      const url = window.location.origin + '/?tool=' + slug;
      navigator.clipboard.writeText(url).then(function() {
        showMainToast('Link copied! Share it anywhere ✓');
        stats.shared++;
        saveStats();
        checkAchievements();
      });
    };
    body.appendChild(btn);
  });
}

// ── EMBED BUTTONS ─────────────────────────────────────────────────────────────
function initEmbedButtons() {
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const body = card.querySelector('.card-body');
    if (!body) return;
    const btn = document.createElement('button');
    btn.className = 'embed-btn';
    btn.innerHTML = '&lt;/&gt; Embed';
    btn.onclick = function() {
      const code = '<iframe src="https://toolcraft.online/embed.html?tool=' + slug + '" width="400" height="500" frameborder="0" style="border:none;border-radius:8px"></iframe>';
      // Show in modal
      const overlay = document.getElementById('tc-modal-overlay');
      if (!overlay) return;
      const modal = overlay.querySelector('.modal');
      if (!modal) return;
      modal.querySelector('h3').textContent = 'Embed ' + name;
      modal.querySelector('p').textContent = 'Copy this code and paste it into any webpage to embed this tool:';
      // Replace modal btns with textarea
      const existing = modal.querySelector('.embed-modal-code');
      if (existing) existing.remove();
      const ta = document.createElement('textarea');
      ta.className = 'embed-modal-code';
      ta.rows = 4;
      ta.readOnly = true;
      ta.value = code;
      modal.querySelector('.modal-btns').insertAdjacentElement('beforebegin', ta);
      modal.querySelector('.modal-submit').textContent = 'Copy Code';
      modal.querySelector('.modal-submit').onclick = function() {
        navigator.clipboard.writeText(code);
        showMainToast('Embed code copied!');
        overlay.classList.remove('open');
      };
      overlay.classList.add('open');
      ta.select();
    };
    body.appendChild(btn);
  });
}

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────────────
function initAchievements() {
  const earned = JSON.parse(localStorage.getItem('tc-earned') || '[]');
  if (!earned.length) return;
  const bar = document.createElement('div');
  bar.className = 'achievements-bar visible';
  bar.id = 'achievements-bar';
  const header = document.querySelector('header');
  if (header) header.after(bar);
  renderAchievements(earned);
  // Inject toast
  const aToast = document.createElement('div');
  aToast.className = 'achievement-toast';
  aToast.id = 'achievement-toast';
  document.body.appendChild(aToast);
}

function renderAchievements(earned) {
  const bar = document.getElementById('achievements-bar');
  if (!bar) return;
  bar.innerHTML = '';
  ACHIEVEMENTS.forEach(function(a) {
    if (!earned.includes(a.id)) return;
    const badge = document.createElement('div');
    badge.className = 'achievement-badge earned';
    badge.title = a.desc;
    badge.innerHTML = '<span class="achievement-icon">' + a.icon + '</span><span class="achievement-name">' + a.name + '</span>';
    bar.appendChild(badge);
  });
  bar.classList.toggle('visible', bar.children.length > 0);
}

function checkAchievements() {
  const earned = JSON.parse(localStorage.getItem('tc-earned') || '[]');
  ACHIEVEMENTS.forEach(function(a) {
    if (earned.includes(a.id)) return;
    if (a.condition(stats)) {
      earned.push(a.id);
      localStorage.setItem('tc-earned', JSON.stringify(earned));
      // Show toast
      const toast = document.getElementById('achievement-toast');
      if (toast) {
        toast.textContent = a.icon + ' Achievement unlocked: ' + a.name + '!';
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 3000);
      }
      // Init bar if not exists
      if (!document.getElementById('achievements-bar')) {
        const bar = document.createElement('div');
        bar.className = 'achievements-bar visible';
        bar.id = 'achievements-bar';
        const header = document.querySelector('header');
        if (header) header.after(bar);
        const aToast = document.createElement('div');
        aToast.className = 'achievement-toast';
        aToast.id = 'achievement-toast';
        document.body.appendChild(aToast);
      }
      renderAchievements(earned);
    }
  });
}

// Track tool usage for achievements
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelectorAll('.tool-card').forEach(function(card) {
      const title = card.querySelector('.card-title');
      if (!title) return;
      const name = title.textContent.trim();
      const inputs = card.querySelectorAll('input, textarea, select, button');
      let tracked = false;
      inputs.forEach(function(inp) {
        inp.addEventListener('focus', function() {
          if (tracked) return;
          tracked = true;
          if (!stats.usedSet.includes(name)) {
            stats.usedSet.push(name);
            stats.toolsUsed = stats.usedSet.length;
            saveStats();
            checkAchievements();
          }
          // Dark mode tracking
          if (document.body.classList.contains('dark') && !stats.darkMode) {
            stats.darkMode = true;
            saveStats();
            checkAchievements();
          }
          // Favourites tracking
          const favs = JSON.parse(localStorage.getItem('tc-favs') || '[]');
          stats.favourites = favs.length;
          saveStats();
          checkAchievements();
        }, { passive: true });
      });
    });
    // Run initial achievement check
    const favs = JSON.parse(localStorage.getItem('tc-favs') || '[]');
    stats.favourites = favs.length;
    stats.darkMode = document.body.classList.contains('dark');
    checkAchievements();
  }, 1000);
});

// ── NEWSLETTER ────────────────────────────────────────────────────────────────
function initNewsletter() {
  const grid = document.getElementById('grid');
  if (!grid) return;
  const section = document.createElement('div');
  section.className = 'newsletter-section';
  const subscribed = localStorage.getItem('tc-newsletter') === '1';
  if (subscribed) return; // Don't show if already subscribed
  section.innerHTML =
    '<div class="newsletter-left">' +
      '<div class="newsletter-tag">Tool of the Week</div>' +
      '<div class="newsletter-title">Never miss a new tool</div>' +
      '<div class="newsletter-sub">One email per week. One underrated tool explained. Unsubscribe anytime.</div>' +
    '</div>' +
    '<div>' +
      '<div class="newsletter-form">' +
        '<input class="newsletter-input" type="email" id="nl-email" placeholder="your@email.com"/>' +
        '<button class="newsletter-submit" onclick="subscribeNewsletter()">Subscribe</button>' +
      '</div>' +
      '<div class="newsletter-success" id="nl-success">✓ You\'re subscribed! First email coming soon.</div>' +
    '</div>';
  grid.parentNode.insertBefore(section, grid);
}

window.subscribeNewsletter = function() {
  const email = document.getElementById('nl-email');
  if (!email || !email.value.includes('@')) {
    if (email) email.style.borderColor = 'var(--accent)';
    return;
  }
  // Store locally (integrate with Brevo/Mailchimp later via their form embed)
  localStorage.setItem('tc-newsletter', '1');
  localStorage.setItem('tc-newsletter-email', email.value);
  document.getElementById('nl-success').style.display = 'block';
  email.style.display = 'none';
  email.nextElementSibling.style.display = 'none';
  showMainToast('Subscribed! ✓');
};

// ── COMPARE MODE ──────────────────────────────────────────────────────────────
function initCompareMode() {
  // Add compare button to each card
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const title = card.querySelector('.card-title');
    if (!title) return;
    const name = title.textContent.trim();
    const body = card.querySelector('.card-body');
    if (!body) return;
    const btn = document.createElement('button');
    btn.className = 'compare-toggle';
    btn.innerHTML = '⊞ Compare';
    btn.onclick = function() {
      if (compareSelected.includes(name)) {
        compareSelected = compareSelected.filter(function(n) { return n !== name; });
        btn.classList.remove('selected');
      } else if (compareSelected.length < 2) {
        compareSelected.push(name);
        btn.classList.add('selected');
      } else {
        showMainToast('Max 2 tools to compare. Deselect one first.');
        return;
      }
      updateCompareBanner();
    };
    body.appendChild(btn);
  });
  // Build compare banner
  const banner = document.createElement('div');
  banner.className = 'compare-banner';
  banner.id = 'compare-banner';
  banner.innerHTML =
    '<div class="compare-info" id="compare-info">Select 2 tools to compare side by side</div>' +
    '<button class="compare-close" id="compare-go" onclick="openCompareView()" style="display:none">Compare Side by Side →</button>' +
    '<button class="compare-close" onclick="clearCompare()">Cancel</button>';
  const grid = document.getElementById('grid');
  if (grid) grid.parentNode.insertBefore(banner, grid);
  // Build compare view
  const view = document.createElement('div');
  view.className = 'compare-view';
  view.id = 'compare-view';
  view.innerHTML =
    '<div class="compare-view-header">' +
      '<div class="compare-view-title" id="compare-view-title">Compare Tools</div>' +
      '<button class="compare-exit" onclick="closeCompareView()">✕ Close</button>' +
    '</div>' +
    '<div class="compare-grid" id="compare-grid"></div>';
  document.body.appendChild(view);
}

function updateCompareBanner() {
  const banner = document.getElementById('compare-banner');
  const info = document.getElementById('compare-info');
  const go = document.getElementById('compare-go');
  if (!banner) return;
  if (compareSelected.length > 0) {
    banner.classList.add('visible');
    info.innerHTML = '<strong>' + compareSelected.join('</strong> vs <strong>') + '</strong>';
    if (go) go.style.display = compareSelected.length === 2 ? 'block' : 'none';
  } else {
    banner.classList.remove('visible');
    if (go) go.style.display = 'none';
  }
}

window.openCompareView = function() {
  if (compareSelected.length < 2) return;
  const view = document.getElementById('compare-view');
  const grid = document.getElementById('compare-grid');
  const titleEl = document.getElementById('compare-view-title');
  if (!view || !grid) return;
  if (titleEl) titleEl.textContent = compareSelected[0] + ' vs ' + compareSelected[1];
  grid.innerHTML = '';
  compareSelected.forEach(function(name) {
    const original = findCardByName(name);
    if (!original) return;
    const panel = document.createElement('div');
    panel.className = 'compare-panel';
    const panelTitle = document.createElement('div');
    panelTitle.className = 'compare-panel-title';
    panelTitle.textContent = name;
    panel.appendChild(panelTitle);
    const clone = original.cloneNode(true);
    clone.classList.add('active');
    clone.style.border = 'none';
    clone.style.borderRadius = '0';
    panel.appendChild(clone);
    grid.appendChild(panel);
  });
  view.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeCompareView = function() {
  const view = document.getElementById('compare-view');
  if (view) view.classList.remove('open');
  document.body.style.overflow = '';
};

window.clearCompare = function() {
  compareSelected = [];
  document.querySelectorAll('.compare-toggle').forEach(function(b) { b.classList.remove('selected'); });
  updateCompareBanner();
};

function findCardByName(name) {
  let found = null;
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const t = card.querySelector('.card-title');
    if (t && t.textContent.trim() === name) found = card;
  });
  return found;
}

// ── LANGUAGE SWITCHER ─────────────────────────────────────────────────────────
function initLangSwitcher() {
  const header = document.querySelector('header');
  if (!header) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'lang-switcher';
  const currentLang = localStorage.getItem('tc-lang') || 'en';
  const LANG_NAMES = { en: '🌐 EN', fr: '🌐 FR', es: '🌐 ES' };
  const btn = document.createElement('button');
  btn.className = 'lang-btn';
  btn.textContent = LANG_NAMES[currentLang] || '🌐 EN';
  const dropdown = document.createElement('div');
  dropdown.className = 'lang-dropdown';
  [['en','🇬🇧 English'],['fr','🇫🇷 Français'],['es','🇪🇸 Español']].forEach(function(pair) {
    const opt = document.createElement('button');
    opt.className = 'lang-option' + (currentLang === pair[0] ? ' active' : '');
    opt.textContent = pair[1];
    opt.onclick = function() {
      localStorage.setItem('tc-lang', pair[0]);
      dropdown.classList.remove('open');
      applyLanguage(pair[0]);
      btn.textContent = LANG_NAMES[pair[0]];
      dropdown.querySelectorAll('.lang-option').forEach(function(o) { o.classList.remove('active'); });
      opt.classList.add('active');
    };
    dropdown.appendChild(opt);
  });
  btn.onclick = function(e) { e.stopPropagation(); dropdown.classList.toggle('open'); };
  document.addEventListener('click', function() { dropdown.classList.remove('open'); });
  wrapper.appendChild(btn);
  wrapper.appendChild(dropdown);
  const count = header.querySelector('#tool-count') || header.querySelector('.header-count');
  if (count) header.insertBefore(wrapper, count);
  else header.appendChild(wrapper);
  // Apply saved language
  if (currentLang !== 'en') applyLanguage(currentLang);
}

function applyLanguage(lang) {
  if (!window.TC_TRANSLATIONS) return;
  const t = window.TC_TRANSLATIONS[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  // Hero
  const h1 = document.querySelector('.hero h1');
  if (h1 && t.hero_h1) h1.innerHTML = t.hero_h1;
  const heroPara = document.querySelector('.hero p');
  if (heroPara && t.hero_p) heroPara.textContent = t.hero_p;
  const searchInput = document.getElementById('search-input');
  if (searchInput && t.search_placeholder) searchInput.placeholder = t.search_placeholder;
}

// ── UTILS ─────────────────────────────────────────────────────────────────────
function showMainToast(msg) {
  const toast = document.getElementById('tc-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2200);
}

function scrollToNamedTool(name) {
  document.querySelectorAll('.tool-card').forEach(function(card) {
    const t = card.querySelector('.card-title');
    if (t && t.textContent.trim() === name) {
      card.classList.add('active');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.boxShadow = '0 0 0 2px var(--accent)';
      setTimeout(function() { card.style.boxShadow = ''; }, 2000);
    }
  });
}

})();
