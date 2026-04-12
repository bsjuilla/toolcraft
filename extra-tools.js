/* ToolCraft Extra Tools JS */
(function(){
'use strict';

// ── POMODORO TIMER ────────────────────────────────────────────────────────────
let pomoInterval=null,pomoSeconds=25*60,pomoMode='work',pomoSession=1,pomoRunning=false;
const POMO_TIMES={work:25*60,short:5*60,long:15*60};
function pomoDraw(){
  const m=Math.floor(pomoSeconds/60),s=pomoSeconds%60;
  const el=document.getElementById('pomo-display');
  if(el)el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  const total=POMO_TIMES[pomoMode];
  const fill=document.getElementById('pomo-fill');
  if(fill)fill.style.width=(((total-pomoSeconds)/total)*100)+'%';
  const mode=document.getElementById('pomo-mode-label');
  if(mode)mode.textContent=pomoMode==='work'?'Focus Time':pomoMode==='short'?'Short Break':'Long Break';
  const sess=document.getElementById('pomo-sessions');
  if(sess)sess.textContent='Session '+pomoSession+' of 4';
}
window.pomoToggle=function(){
  if(pomoRunning){clearInterval(pomoInterval);pomoRunning=false;const b=document.getElementById('pomo-btn');if(b)b.textContent='▶ Resume';}
  else{pomoInterval=setInterval(function(){pomoSeconds--;if(pomoSeconds<=0){clearInterval(pomoInterval);pomoRunning=false;pomoNext();return;}pomoDraw();},1000);pomoRunning=true;const b=document.getElementById('pomo-btn');if(b)b.textContent='⏸ Pause';}
};
window.pomoNext=function(){
  clearInterval(pomoInterval);pomoRunning=false;
  if(pomoMode==='work'){pomoSession++;if(pomoSession>4){pomoSession=1;pomoMode='long';}else pomoMode='short';}
  else pomoMode='work';
  pomoSeconds=POMO_TIMES[pomoMode];
  const b=document.getElementById('pomo-btn');if(b)b.textContent='▶ Start';
  pomoDraw();
  try{new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA==').play();}catch(e){}
};
window.pomoReset=function(){
  clearInterval(pomoInterval);pomoRunning=false;pomoSeconds=25*60;pomoMode='work';pomoSession=1;
  const b=document.getElementById('pomo-btn');if(b)b.textContent='▶ Start';
  pomoDraw();
};
window.pomoSetMode=function(mode){
  clearInterval(pomoInterval);pomoRunning=false;pomoMode=mode;pomoSeconds=POMO_TIMES[mode];
  const b=document.getElementById('pomo-btn');if(b)b.textContent='▶ Start';
  pomoDraw();
};

// ── TYPING SPEED TEST ─────────────────────────────────────────────────────────
const TYPING_PASSAGES=[
  'The quick brown fox jumps over the lazy dog near the riverbank at dawn.',
  'Technology is best when it brings people together and solves real problems.',
  'Practice makes perfect when learning any new skill over a period of time.',
  'The early bird catches the worm but the second mouse gets the cheese.',
  'Success is not final and failure is not fatal but courage to continue counts.',
  'An investment in knowledge always pays the best interest in the long run.'
];
let typingState={active:false,start:0,errors:0,typed:0,passage:'',interval:null,elapsed:0};
window.startTypingTest=function(){
  const p=TYPING_PASSAGES[Math.floor(Math.random()*TYPING_PASSAGES.length)];
  typingState={active:false,start:0,errors:0,typed:0,passage:p,interval:null,elapsed:0};
  renderPassage(p,0);
  const inp=document.getElementById('typing-input');
  if(inp){inp.value='';inp.style.display='block';inp.focus();}
  setTypingStats(0,0,0,100);
  clearInterval(typingState.interval);
};
function renderPassage(p,pos){
  const el=document.getElementById('typing-passage');
  if(!el)return;
  el.innerHTML=p.split('').map(function(c,i){
    if(i<pos)return '<span class="char-correct">'+escHtml(c)+'</span>';
    if(i===pos)return '<span class="char-current">'+escHtml(c)+'</span>';
    return '<span>'+escHtml(c)+'</span>';
  }).join('');
}
function escHtml(c){return c==='<'?'&lt;':c==='>'?'&gt;':c==='&'?'&amp;':c===' '?'&nbsp;':c;}
window.onTypingInput=function(e){
  const val=e.target.value;
  const p=typingState.passage;
  if(!typingState.active&&val.length>0){typingState.active=true;typingState.start=Date.now();typingState.interval=setInterval(function(){typingState.elapsed=((Date.now()-typingState.start)/1000).toFixed(0);},1000);}
  const pos=val.length;
  let errors=0;
  for(let i=0;i<val.length;i++){if(val[i]!==p[i])errors++;}
  typingState.errors=errors;typingState.typed=pos;
  // Render with corrections
  const el=document.getElementById('typing-passage');
  if(el){el.innerHTML=p.split('').map(function(c,i){if(i<val.length){return val[i]===c?'<span class="char-correct">'+escHtml(c)+'</span>':'<span class="char-wrong">'+escHtml(c)+'</span>';}if(i===val.length)return '<span class="char-current">'+escHtml(c)+'</span>';return '<span>'+escHtml(c)+'</span>';}).join('');}
  if(pos>=p.length){
    clearInterval(typingState.interval);
    const elapsed=(Date.now()-typingState.start)/1000/60;
    const words=p.trim().split(' ').length;
    const wpm=Math.round(words/elapsed);
    const acc=Math.round(((pos-errors)/pos)*100);
    setTypingStats(wpm,acc,Math.round((Date.now()-typingState.start)/1000),0);
    e.target.value='';typingState.active=false;
    el.innerHTML=p.split('').map(function(c){return '<span class="char-correct">'+escHtml(c)+'</span>';}).join('');
  } else {
    if(typingState.active){const elapsed=(Date.now()-typingState.start)/60000;const words=val.trim().split(' ').length;const wpm=elapsed>0?Math.round(words/elapsed):0;const acc=pos>0?Math.round(((pos-errors)/pos)*100):100;setTypingStats(wpm,acc,null,null);}
  }
};
function setTypingStats(wpm,acc,secs,pct){
  const w=document.getElementById('type-wpm');if(w)w.textContent=wpm;
  const a=document.getElementById('type-acc');if(a)a.textContent=acc+'%';
  const t=document.getElementById('type-time');if(t&&secs!==null)t.textContent=secs+'s';
}

// ── WHAT IS MY IP ─────────────────────────────────────────────────────────────
window.loadMyIP=function(){
  const el=document.getElementById('ip-display');
  const grid=document.getElementById('ip-detail-grid');
  if(el)el.textContent='Loading…';
  fetch('https://ipapi.co/json/')
    .then(function(r){return r.json();})
    .then(function(d){
      if(el)el.textContent=d.ip||'Unknown';
      if(grid)grid.innerHTML=
        ipDetail('Country',d.country_name||'—')+
        ipDetail('City',d.city||'—')+
        ipDetail('Region',d.region||'—')+
        ipDetail('ISP',d.org||'—')+
        ipDetail('Timezone',d.timezone||'—')+
        ipDetail('Currency',d.currency||'—');
    })
    .catch(function(){if(el)el.textContent='Could not fetch';});
};
function ipDetail(label,val){return '<div class="ip-detail"><span class="ip-detail-label">'+label+'</span><span class="ip-detail-value">'+val+'</span></div>';}

// ── PASSWORD STRENGTH CHECKER ─────────────────────────────────────────────────
window.checkPwStrength=function(){
  const pw=document.getElementById('pws-input').value;
  const segments=document.querySelectorAll('.strength-segment');
  const label=document.getElementById('pws-label');
  const crack=document.getElementById('pws-crack');
  const checks=document.getElementById('pws-checks');
  if(!pw){segments.forEach(function(s){s.style.background='var(--border)';});if(label)label.textContent='';if(crack)crack.textContent='';if(checks)checks.innerHTML='';return;}
  let score=0;
  const c={length:pw.length>=8,longLength:pw.length>=12,upper:/[A-Z]/.test(pw),lower:/[a-z]/.test(pw),number:/[0-9]/.test(pw),symbol:/[^A-Za-z0-9]/.test(pw),noCommon:!['password','123456','qwerty','abc123','letmein'].some(function(w){return pw.toLowerCase().includes(w);})};
  score=[c.length,c.longLength,c.upper&&c.lower,c.number,c.symbol,c.noCommon].filter(Boolean).length;
  const levels=[{label:'Very Weak',color:'#e74c3c'},{label:'Weak',color:'#e67e22'},{label:'Fair',color:'#f1c40f'},{label:'Strong',color:'#2ecc71'},{label:'Very Strong',color:'#1abc9c'},{label:'Excellent',color:'#1a7a4a'}];
  const lvl=levels[Math.min(score,5)];
  segments.forEach(function(s,i){s.style.background=i<=score-1?lvl.color:'var(--border)';});
  if(label){label.textContent=lvl.label;label.style.color=lvl.color;}
  // Crack time estimate
  const pool=(c.upper?26:0)+(c.lower?26:0)+(c.number?10:0)+(c.symbol?32:0)||26;
  const combinations=Math.pow(pool,pw.length);
  const guessesPerSec=1e10;const seconds=combinations/guessesPerSec;
  let crackStr='';
  if(seconds<1)crackStr='Instantly';
  else if(seconds<60)crackStr=Math.round(seconds)+' seconds';
  else if(seconds<3600)crackStr=Math.round(seconds/60)+' minutes';
  else if(seconds<86400)crackStr=Math.round(seconds/3600)+' hours';
  else if(seconds<31536000)crackStr=Math.round(seconds/86400)+' days';
  else if(seconds<3153600000)crackStr=Math.round(seconds/31536000)+' years';
  else crackStr='Centuries';
  if(crack)crack.textContent='Estimated crack time: '+crackStr;
  if(checks)checks.innerHTML=
    checkItem('At least 8 characters',c.length)+
    checkItem('At least 12 characters',c.longLength)+
    checkItem('Uppercase letters',c.upper)+
    checkItem('Lowercase letters',c.lower)+
    checkItem('Numbers',c.number)+
    checkItem('Special symbols',c.symbol)+
    checkItem('No common words',c.noCommon);
};
function checkItem(label,pass){return '<div style="font-size:.78rem;color:'+(pass?'var(--green,#1a7a4a)':'var(--ink-soft)')+';">'+(pass?'✓':'✗')+' '+label+'</div>';}

// ── ZODIAC CALCULATOR ─────────────────────────────────────────────────────────
const ZODIAC=[
  {name:'Capricorn',symbol:'♑',dates:'Dec 22 – Jan 19',traits:['Ambitious','Disciplined','Patient','Practical'],start:[12,22],end:[1,19]},
  {name:'Aquarius',symbol:'♒',dates:'Jan 20 – Feb 18',traits:['Independent','Innovative','Humanitarian','Eccentric'],start:[1,20],end:[2,18]},
  {name:'Pisces',symbol:'♓',dates:'Feb 19 – Mar 20',traits:['Compassionate','Artistic','Intuitive','Gentle'],start:[2,19],end:[3,20]},
  {name:'Aries',symbol:'♈',dates:'Mar 21 – Apr 19',traits:['Brave','Energetic','Confident','Impulsive'],start:[3,21],end:[4,19]},
  {name:'Taurus',symbol:'♉',dates:'Apr 20 – May 20',traits:['Reliable','Patient','Devoted','Stubborn'],start:[4,20],end:[5,20]},
  {name:'Gemini',symbol:'♊',dates:'May 21 – Jun 20',traits:['Adaptable','Curious','Witty','Inconsistent'],start:[5,21],end:[6,20]},
  {name:'Cancer',symbol:'♋',dates:'Jun 21 – Jul 22',traits:['Loyal','Emotional','Protective','Moody'],start:[6,21],end:[7,22]},
  {name:'Leo',symbol:'♌',dates:'Jul 23 – Aug 22',traits:['Generous','Loyal','Creative','Dramatic'],start:[7,23],end:[8,22]},
  {name:'Virgo',symbol:'♍',dates:'Aug 23 – Sep 22',traits:['Analytical','Kind','Hardworking','Critical'],start:[8,23],end:[9,22]},
  {name:'Libra',symbol:'♎',dates:'Sep 23 – Oct 22',traits:['Cooperative','Diplomatic','Gracious','Indecisive'],start:[9,23],end:[10,22]},
  {name:'Scorpio',symbol:'♏',dates:'Oct 23 – Nov 21',traits:['Brave','Passionate','Stubborn','Resourceful'],start:[10,23],end:[11,21]},
  {name:'Sagittarius',symbol:'♐',dates:'Nov 22 – Dec 21',traits:['Generous','Idealistic','Humorous','Impatient'],start:[11,22],end:[12,21]}
];
window.calcZodiac=function(){
  const dob=new Date(document.getElementById('zodiac-dob').value);
  if(isNaN(dob))return;
  const m=dob.getMonth()+1,d=dob.getDate();
  let sign=null;
  for(const z of ZODIAC){
    if((m===z.start[0]&&d>=z.start[1])||(m===z.end[0]&&d<=z.end[1])){sign=z;break;}
  }
  if(!sign)sign=ZODIAC[0];
  const res=document.getElementById('zodiac-result');
  if(!res)return;
  res.innerHTML='<span class="zodiac-symbol">'+sign.symbol+'</span><div class="zodiac-name">'+sign.name+'</div><div class="zodiac-dates">'+sign.dates+'</div><div class="zodiac-traits">'+sign.traits.map(function(t){return '<span class="zodiac-trait">'+t+'</span>';}).join('')+'</div>';
  res.style.display='block';
};

// ── ASCII ART GENERATOR ───────────────────────────────────────────────────────
const ASCII_CHARS=['█','▓','▒','░',' '];
window.genAsciiArt=function(){
  const text=document.getElementById('ascii-input').value.toUpperCase().trim();
  const style=document.getElementById('ascii-style').value;
  const res=document.getElementById('ascii-output');
  if(!text||!res)return;
  // Simple block letter art using predefined patterns
  const FONT={
    A:['  █  ','  █  ',' █ █ ','█████','█   █'],
    B:['████ ','█   █','████ ','█   █','████ '],
    C:[' ████','█    ','█    ','█    ',' ████'],
    D:['████ ','█   █','█   █','█   █','████ '],
    E:['█████','█    ','████ ','█    ','█████'],
    F:['█████','█    ','████ ','█    ','█    '],
    G:[' ████','█    ','█  ██','█   █',' ████'],
    H:['█   █','█   █','█████','█   █','█   █'],
    I:['█████','  █  ','  █  ','  █  ','█████'],
    J:['█████','    █','    █','█   █',' ███ '],
    K:['█   █','█  █ ','███  ','█  █ ','█   █'],
    L:['█    ','█    ','█    ','█    ','█████'],
    M:['█   █','██ ██','█ █ █','█   █','█   █'],
    N:['█   █','██  █','█ █ █','█  ██','█   █'],
    O:[' ███ ','█   █','█   █','█   █',' ███ '],
    P:['████ ','█   █','████ ','█    ','█    '],
    Q:[' ███ ','█   █','█ █ █','█  ██',' ████'],
    R:['████ ','█   █','████ ','█ █  ','█  ██'],
    S:[' ████','█    ',' ███ ','    █','████ '],
    T:['█████','  █  ','  █  ','  █  ','  █  '],
    U:['█   █','█   █','█   █','█   █',' ███ '],
    V:['█   █','█   █','█   █',' █ █ ','  █  '],
    W:['█   █','█   █','█ █ █','██ ██','█   █'],
    X:['█   █',' █ █ ','  █  ',' █ █ ','█   █'],
    Y:['█   █',' █ █ ','  █  ','  █  ','  █  '],
    Z:['█████','   █ ','  █  ',' █   ','█████'],
    ' ':['     ','     ','     ','     ','     '],
    '0':[' ███ ','█  ██','█ █ █','██  █',' ███ '],
    '1':['  █  ',' ██  ','  █  ','  █  ','█████'],
    '!':['  █  ','  █  ','  █  ','     ','  █  '],
    '?':[' ███ ','█   █','   █ ','  █  ','  █  ']
  };
  const chars=text.slice(0,8).split('');
  const lines=['','','','',''];
  chars.forEach(function(c){
    const glyph=FONT[c]||FONT[' '];
    for(let i=0;i<5;i++)lines[i]+=(glyph[i]||'     ')+'  ';
  });
  const fill=style==='block'?'█':style==='hash'?'#':'*';
  res.textContent=lines.join('\n').replace(/█/g,fill);
  res.style.display='block';
};

// ── COIN FLIP & DICE ──────────────────────────────────────────────────────────
window.flipCoin=function(){
  const res=document.getElementById('flip-result');
  if(!res)return;
  res.classList.add('spin');
  setTimeout(function(){
    res.classList.remove('spin');
    res.textContent=Math.random()<0.5?'Heads 🪙':'Tails 🪙';
  },300);
};
window.rollDice=function(){
  const count=+document.getElementById('dice-count').value||1;
  const sides=+document.getElementById('dice-sides').value||6;
  const grid=document.getElementById('dice-grid');
  const total=document.getElementById('dice-total');
  if(!grid)return;
  grid.innerHTML='';let sum=0;
  for(let i=0;i<Math.min(count,12);i++){
    const val=Math.floor(Math.random()*sides)+1;sum+=val;
    const d=document.createElement('div');d.className='die-face';d.textContent=val;grid.appendChild(d);
  }
  if(total)total.textContent='Total: '+sum+(count>1?' (avg: '+(sum/count).toFixed(1)+')':'');
};

// ── SCRATCHPAD ────────────────────────────────────────────────────────────────
window.initScratchpad=function(){
  const ta=document.getElementById('scratchpad-ta');
  if(!ta)return;
  ta.value=localStorage.getItem('tc-scratchpad')||'';
  ta.addEventListener('input',function(){
    localStorage.setItem('tc-scratchpad',ta.value);
    const saved=document.getElementById('pad-saved');
    if(saved){saved.classList.add('show');clearTimeout(saved._t);saved._t=setTimeout(function(){saved.classList.remove('show');},1500);}
  });
};
window.clearScratchpad=function(){
  const ta=document.getElementById('scratchpad-ta');
  if(ta&&confirm('Clear scratchpad?')){ta.value='';localStorage.removeItem('tc-scratchpad');}
};
window.copyScratchpad=function(){
  const ta=document.getElementById('scratchpad-ta');
  if(ta)navigator.clipboard.writeText(ta.value);
};

// ── WHITE NOISE ───────────────────────────────────────────────────────────────
let noiseCtx=null,noiseSource=null,noiseGain=null,noiseActive='';
function getAudioCtx(){if(!noiseCtx)noiseCtx=new(window.AudioContext||window.webkitAudioContext)();return noiseCtx;}
window.playNoise=function(type){
  stopNoise();
  if(noiseActive===type){noiseActive='';document.querySelectorAll('.noise-btn').forEach(function(b){b.classList.remove('active');});return;}
  noiseActive=type;
  document.querySelectorAll('.noise-btn').forEach(function(b){b.classList.toggle('active',b.dataset.type===type);});
  const ctx=getAudioCtx();
  noiseGain=ctx.createGain();noiseGain.gain.value=+document.getElementById('noise-vol').value||0.3;noiseGain.connect(ctx.destination);
  const bufferSize=ctx.sampleRate*4;
  const buffer=ctx.createBuffer(1,bufferSize,ctx.sampleRate);
  const data=buffer.getChannelData(0);
  if(type==='white'){for(let i=0;i<bufferSize;i++)data[i]=Math.random()*2-1;}
  else if(type==='brown'){let last=0;for(let i=0;i<bufferSize;i++){const w=Math.random()*2-1;data[i]=(last+(0.02*w))/1.02;last=data[i];data[i]*=3.5;}}
  else{// Rain — brown + filter
    let last=0;for(let i=0;i<bufferSize;i++){const w=Math.random()*2-1;data[i]=(last+(0.02*w))/1.02;last=data[i];}
    const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1000;noiseGain.disconnect();noiseGain.connect(filter);filter.connect(ctx.destination);
  }
  noiseSource=ctx.createBufferSource();noiseSource.buffer=buffer;noiseSource.loop=true;noiseSource.connect(noiseGain);noiseSource.start();
};
function stopNoise(){if(noiseSource){try{noiseSource.stop();}catch(e){}noiseSource=null;}}
window.setNoiseVol=function(v){if(noiseGain)noiseGain.gain.value=+v;};

// ── HABIT TRACKER ─────────────────────────────────────────────────────────────
let habits=[];
function loadHabits(){
  const today=new Date().toDateString();
  const saved=JSON.parse(localStorage.getItem('tc-habits-v2')||'{"date":"","habits":[]}');
  if(saved.date===today){habits=saved.habits;}
  else{habits=(saved.habits||[]).map(function(h){return{name:h.name,done:false};});saveHabits();}
}
function saveHabits(){localStorage.setItem('tc-habits-v2',JSON.stringify({date:new Date().toDateString(),habits:habits}));}
window.renderHabits=function(){
  loadHabits();
  const list=document.getElementById('habit-list');
  if(!list)return;
  const done=habits.filter(function(h){return h.done;}).length;
  const pct=habits.length?Math.round(done/habits.length*100):0;
  const fill=document.getElementById('habit-progress-fill');
  if(fill)fill.style.width=pct+'%';
  list.innerHTML=habits.map(function(h,i){
    return '<div class="habit-row">'+
      '<div class="habit-check'+(h.done?' done':'')+'" onclick="toggleHabit('+i+')">'+(h.done?'✓':'')+'</div>'+
      '<span class="habit-name'+(h.done?' done':'')+'">'+h.name+'</span>'+
      '<span class="habit-del" onclick="deleteHabit('+i+')">✕</span>'+
    '</div>';
  }).join('')+(habits.length===0?'<div style="font-size:.8rem;color:var(--ink-soft);padding:.4rem 0">Add your first habit below</div>':'');
};
window.toggleHabit=function(i){habits[i].done=!habits[i].done;saveHabits();window.renderHabits();};
window.deleteHabit=function(i){habits.splice(i,1);saveHabits();window.renderHabits();};
window.addHabit=function(){
  const inp=document.getElementById('habit-input');
  if(!inp||!inp.value.trim())return;
  loadHabits();habits.push({name:inp.value.trim(),done:false});inp.value='';saveHabits();window.renderHabits();
};

// ── KANBAN BOARD ──────────────────────────────────────────────────────────────
let kanban={todo:[],doing:[],done:[]};
function loadKanban(){kanban=JSON.parse(localStorage.getItem('tc-kanban')||'{"todo":[],"doing":[],"done":[]}');}
function saveKanban(){localStorage.setItem('tc-kanban',JSON.stringify(kanban));}
window.renderKanban=function(){
  loadKanban();
  ['todo','doing','done'].forEach(function(col){
    const el=document.getElementById('kanban-'+col);
    if(!el)return;
    const items=kanban[col];
    el.innerHTML=items.map(function(item,i){
      return '<div class="kanban-item" onclick="moveKanban(\''+col+'\','+i+')">'+
        '<span class="kanban-item-text">'+item+'</span>'+
        '<span class="kanban-item-del" onclick="event.stopPropagation();delKanban(\''+col+'\','+i+')">✕</span>'+
      '</div>';
    }).join('');
  });
};
window.addKanban=function(){
  const inp=document.getElementById('kanban-input');
  if(!inp||!inp.value.trim())return;
  loadKanban();kanban.todo.push(inp.value.trim());inp.value='';saveKanban();window.renderKanban();
};
window.moveKanban=function(col,i){
  loadKanban();
  const item=kanban[col].splice(i,1)[0];
  const next=col==='todo'?'doing':col==='doing'?'done':'todo';
  kanban[next].push(item);saveKanban();window.renderKanban();
};
window.delKanban=function(col,i){loadKanban();kanban[col].splice(i,1);saveKanban();window.renderKanban();};

// ── TEXT TO SPEECH ────────────────────────────────────────────────────────────
let ttsUtterance=null;
window.speakText=function(){
  const text=document.getElementById('tts-input').value.trim();
  if(!text||!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  ttsUtterance=new SpeechSynthesisUtterance(text);
  ttsUtterance.rate=+document.getElementById('tts-rate').value||1;
  ttsUtterance.pitch=+document.getElementById('tts-pitch').value||1;
  const voiceSel=document.getElementById('tts-voice');
  const voices=window.speechSynthesis.getVoices();
  if(voiceSel&&voices[voiceSel.value])ttsUtterance.voice=voices[voiceSel.value];
  window.speechSynthesis.speak(ttsUtterance);
};
window.stopSpeech=function(){if(window.speechSynthesis)window.speechSynthesis.cancel();};
window.loadVoices=function(){
  const sel=document.getElementById('tts-voice');
  if(!sel)return;
  const voices=window.speechSynthesis.getVoices();
  sel.innerHTML=voices.map(function(v,i){return '<option value="'+i+'">'+v.name+' ('+v.lang+')</option>';}).join('');
};
if(window.speechSynthesis)window.speechSynthesis.onvoiceschanged=window.loadVoices;

// ── SCREEN RESOLUTION ─────────────────────────────────────────────────────────
window.checkResolution=function(){
  const res=document.getElementById('res-display');
  const details=document.getElementById('res-details');
  if(res)res.textContent=window.screen.width+' × '+window.screen.height;
  if(details)details.innerHTML=
    '<div class="stat-chip"><span>Viewport</span><strong>'+window.innerWidth+'×'+window.innerHeight+'</strong></div>'+
    '<div class="stat-chip"><span>Pixel Ratio</span><strong>'+window.devicePixelRatio+'x</strong></div>'+
    '<div class="stat-chip"><span>Color Depth</span><strong>'+window.screen.colorDepth+' bit</strong></div>'+
    '<div class="stat-chip"><span>Orientation</span><strong>'+(window.screen.width>window.screen.height?'Landscape':'Portrait')+'</strong></div>';
};

// ── TWITTER CHARACTER COUNTER ─────────────────────────────────────────────────
window.countTweet=function(){
  const text=document.getElementById('tw-input').value;
  const len=text.length;
  const limit=280;
  const remaining=limit-len;
  const el=document.getElementById('tw-count');
  const fill=document.getElementById('tw-fill');
  const msg=document.getElementById('tw-msg');
  if(el){el.textContent=Math.abs(remaining);el.className='tw-number'+(remaining<0?' over':remaining<20?' warn':'');}
  if(fill){const pct=Math.min(len/limit*100,100);fill.style.width=pct+'%';fill.style.background=remaining<0?'var(--accent)':remaining<20?'#e67e22':'var(--green,#1a7a4a)';}
  if(msg)msg.textContent=remaining<0?'Over by '+Math.abs(remaining)+' characters':remaining===0?'Perfect!':remaining+' characters remaining';
};

// ── TIMEZONE CONVERTER ────────────────────────────────────────────────────────
window.convertTimezone=function(){
  const time=document.getElementById('tz-time').value;
  const from=document.getElementById('tz-from').value;
  const to=document.getElementById('tz-to').value;
  const res=document.getElementById('tz-result');
  if(!time||!res)return;
  try{
    const date=new Date();
    const[h,m]=time.split(':').map(Number);
    date.setHours(h,m,0,0);
    const fromTime=new Date(date.toLocaleString('en-US',{timeZone:from}));
    const toTime=new Date(date.toLocaleString('en-US',{timeZone:to}));
    const diff=(date-fromTime);
    const converted=new Date(date.getTime()+diff+(toTime-fromTime+diff));
    // Simple approach
    const fromStr=date.toLocaleTimeString('en-US',{timeZone:from,hour:'2-digit',minute:'2-digit',hour12:false});
    const toStr=date.toLocaleTimeString('en-US',{timeZone:to,hour:'2-digit',minute:'2-digit',hour12:false});
    res.textContent=time+' '+from.split('/').pop()+' = '+toStr+' '+to.split('/').pop();
    res.classList.remove('hidden');
  }catch(e){res.textContent='Invalid timezone';res.classList.remove('hidden');}
};

// ── CONTRAST CHECKER ──────────────────────────────────────────────────────────
function hexToRgbContrast(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return{r,g,b};}
function relativeLuminance(r,g,b){const srgb=[r,g,b].map(function(c){c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);});return 0.2126*srgb[0]+0.7152*srgb[1]+0.0722*srgb[2];}
window.checkContrast=function(){
  const fg=document.getElementById('contrast-fg').value;
  const bg=document.getElementById('contrast-bg').value;
  const preview=document.getElementById('contrast-preview');
  const ratio=document.getElementById('contrast-ratio');
  const badges=document.getElementById('contrast-badges');
  if(preview){preview.style.background=bg;preview.style.color=fg;preview.textContent='Sample Text Aa';}
  const fgRgb=hexToRgbContrast(fg);const bgRgb=hexToRgbContrast(bg);
  const l1=relativeLuminance(fgRgb.r,fgRgb.g,fgRgb.b);const l2=relativeLuminance(bgRgb.r,bgRgb.g,bgRgb.b);
  const r=((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2);
  if(ratio)ratio.textContent=r+':1';
  if(badges)badges.innerHTML=
    badge('AA Normal',r>=4.5)+badge('AA Large',r>=3)+badge('AAA Normal',r>=7)+badge('AAA Large',r>=4.5);
};
function badge(label,pass){return '<span class="contrast-badge '+(pass?'badge-pass':'badge-fail')+'">'+(pass?'✓':'✗')+' '+label+'</span>';}

// ── CITATION GENERATOR ────────────────────────────────────────────────────────
window.genCitation=function(){
  const style=document.getElementById('cite-style').value;
  const author=document.getElementById('cite-author').value.trim()||'Author, A.';
  const year=document.getElementById('cite-year').value.trim()||new Date().getFullYear();
  const title=document.getElementById('cite-title').value.trim()||'Title of Work';
  const publisher=document.getElementById('cite-publisher').value.trim()||'Publisher';
  const url=document.getElementById('cite-url').value.trim();
  const res=document.getElementById('cite-result');
  if(!res)return;
  let citation='';
  const parts=author.split(',');
  const last=parts[0]?parts[0].trim():'Author';
  const first=parts[1]?parts[1].trim().charAt(0)+'.':'A.';
  if(style==='apa'){
    citation=last+', '+first+' ('+year+'). <em>'+title+'</em>. '+publisher+'.'+(url?' Retrieved from '+url:'');
  }else if(style==='mla'){
    citation=last+', '+first.replace('.','')+'. <em>'+title+'</em>. '+publisher+', '+year+'.'+(url?' Web. <'+url+'>':'');
  }else{
    citation=last+', '+first+' '+year+'. <em>'+title+'</em>. '+publisher+'.'+(url?' Available at: '+url:'');
  }
  res.innerHTML=citation;res.style.display='block';
};

// ── READABILITY SCORE ─────────────────────────────────────────────────────────
window.calcReadability=function(){
  const text=document.getElementById('read-input').value.trim();
  const res=document.getElementById('read-result');
  if(!text||!res){if(res)res.classList.add('hidden');return;}
  const sentences=Math.max(1,(text.match(/[.!?]+/g)||[]).length);
  const words=text.trim().split(/\s+/).length;
  const syllables=text.toLowerCase().split(/\s+/).reduce(function(acc,word){
    word=word.replace(/[^a-z]/g,'');
    if(!word)return acc;
    let count=word.replace(/[^aeiouy]/g,'').length;
    word.replace(/[aeiouy]{2,}/g,function(){count--;});
    return acc+Math.max(1,count);
  },0);
  const fk=206.835-1.015*(words/sentences)-84.6*(syllables/words);
  const score=Math.max(0,Math.min(100,Math.round(fk)));
  const grade=score>=90?'5th grade — Very Easy':score>=80?'6th grade — Easy':score>=70?'7th grade — Fairly Easy':score>=60?'8th–9th grade — Standard':score>=50?'10th–12th grade — Fairly Difficult':score>=30?'College level — Difficult':'Professional — Very Difficult';
  const scoreEl=document.getElementById('read-score');const gradeEl=document.getElementById('read-grade');
  if(scoreEl)scoreEl.textContent=score;if(gradeEl)gradeEl.textContent=grade;
  res.classList.remove('hidden');
};

// ── UNICODE FINDER ────────────────────────────────────────────────────────────
const UNICODE_CATS={
  Emoji:['😀','😂','🥰','😎','🤔','😴','🎉','🔥','💡','⭐','❤️','✅','❌','⚠️','🚀','🌍','🎨','🛠️','📊','🔐'],
  Arrows:['→','←','↑','↓','↔','↕','⇒','⇐','⇑','⇓','⇔','↩','↪','↗','↘','↖','↙','➡','⬅','⬆','⬇'],
  Math:['±','×','÷','≠','≤','≥','≈','∞','√','∑','∏','∫','∂','∇','∈','∉','∩','∪','⊂','⊃'],
  Currency:['$','€','£','¥','₹','₿','¢','₩','₱','฿','₫','₴','₪','₺','₦','₡','₲','₵','₸','₼'],
  Symbols:['©','®','™','°','§','¶','†','‡','•','…','‰','‱','′','″','‾','⁰','¹','²','³','⁴'],
  Brackets:['«','»','‹','›','„','"','"','\'','\'','【','】','《','》','〈','〉','｢','｣','⟨','⟩','⌊'],
};
window.filterUnicode=function(){
  const q=document.getElementById('unicode-search').value.toLowerCase();
  const cat=document.getElementById('unicode-cat').value;
  const grid=document.getElementById('unicode-grid');
  if(!grid)return;
  let chars=cat==='all'?Object.values(UNICODE_CATS).flat():UNICODE_CATS[cat]||[];
  if(q)chars=chars.filter(function(c){return c.toLowerCase().includes(q)||c.codePointAt(0).toString(16).includes(q);});
  grid.innerHTML=chars.map(function(c){return '<div class="unicode-char" title="U+'+c.codePointAt(0).toString(16).toUpperCase()+'" onclick="copyUnicode(\''+c+'\')">'+c+'</div>';}).join('');
};
window.copyUnicode=function(c){
  navigator.clipboard.writeText(c);
  const toast=document.getElementById('tc-toast');
  if(toast){toast.textContent='Copied: '+c;toast.classList.add('show');setTimeout(function(){toast.classList.remove('show');},1500);}
};

// ── INIT ALL ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  pomoDraw();
  window.checkResolution();
  window.renderHabits();
  window.renderKanban();
  window.initScratchpad();
  window.filterUnicode();
  window.loadMyIP();
  window.loadVoices();
  // Init typing test
  const tp=document.getElementById('typing-passage');
  if(tp){tp.addEventListener('click',function(){window.startTypingTest();});}
  const ti=document.getElementById('typing-input');
  if(ti){ti.addEventListener('input',window.onTypingInput);}
  window.startTypingTest();
  // Contrast defaults
  window.checkContrast();
  window.countTweet();
});

})();
