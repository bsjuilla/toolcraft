/* ToolCraft Extension Popup JS */
const TOOLS = [
  { name:'Word Counter', icon:'¶', cat:'text', slug:'word-counter',
    desc:'Words, chars & reading time',
    render: function(el) {
      el.innerHTML='<textarea id="wc" rows="4" placeholder="Paste text here…" oninput="wc()"></textarea><div class="chips"><div class="chip"><span>Words</span><strong id="ww">0</strong></div><div class="chip"><span>Chars</span><strong id="wch">0</strong></div><div class="chip"><span>Read</span><strong id="wr">0s</strong></div></div>';
      window.wc=function(){const t=document.getElementById('wc').value;const w=t.trim()===''?0:t.trim().split(/\s+/).length;const rs=Math.round(w/200*60);document.getElementById('ww').textContent=w;document.getElementById('wch').textContent=t.length;document.getElementById('wr').textContent=rs<60?rs+'s':Math.round(rs/60)+'m';};
    }
  },
  { name:'Password Generator', icon:'🔑', cat:'gen', slug:'password-generator',
    desc:'Secure random passwords',
    render: function(el) {
      el.innerHTML='<label class="lbl">Length: <strong id="pl">16</strong></label><input type="range" min="8" max="64" value="16" oninput="document.getElementById(\'pl\').textContent=this.value;gp()" style="width:100%;accent-color:#1a1612;margin-bottom:.5rem"/><div class="res" id="pr" style="font-family:monospace"></div><div class="sbar"><div class="sfill" id="psf" style="width:0%"></div></div><div class="btn-row"><button class="btn" onclick="gp()">↻ New</button><button class="btn btn-g" onclick="navigator.clipboard.writeText(document.getElementById(\'pr\').textContent)">Copy</button><span class="copied" id="pc">Copied!</span></div>';
      window.gp=function(){const len=+document.querySelector('input[type=range]').value;const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}';const arr=new Uint32Array(len);crypto.getRandomValues(arr);const pw=[...arr].map(v=>chars[v%chars.length]).join('');document.getElementById('pr').textContent=pw;const score=Math.min(4,[len>=12,len>=20,/[A-Z]/.test(pw),/[a-z]/.test(pw),/[0-9]/.test(pw),/[^A-Za-z0-9]/.test(pw)].filter(Boolean).length);const fill=document.getElementById('psf');fill.style.width=(score/4*100)+'%';fill.style.background=['#e74c3c','#e67e22','#f1c40f','#2ecc71','#1abc9c'][score];};window.gp();
    }
  },
  { name:'QR Code Generator', icon:'QR', cat:'gen', slug:'qr-code-generator',
    desc:'Generate QR codes instantly',
    render: function(el) {
      el.innerHTML='<input type="text" id="qi" placeholder="https://example.com" oninput="qr()"/><div id="qo" style="display:none;text-align:center;margin-top:.6rem"><img id="qimg" style="width:140px;height:140px;border:1px solid #d4c9b8;border-radius:4px;padding:5px;background:#fff"/><div><a id="qdl" class="btn" style="text-decoration:none;display:inline-flex;margin-top:.4rem" download="qr.png">↓ Save</a></div></div>';
      window.qr=function(){const v=document.getElementById('qi').value.trim();const o=document.getElementById('qo');if(!v){o.style.display='none';return;}const url='https://api.qrserver.com/v1/create-qr-code/?size=140x140&data='+encodeURIComponent(v);document.getElementById('qimg').src=url;document.getElementById('qdl').href=url+'&format=png';o.style.display='block';};
    }
  },
  { name:'Unit Converter', icon:'⇄', cat:'math', slug:'unit-converter',
    desc:'Length, weight, temp & more',
    render: function(el) {
      const UNITS={length:{m:'Metre',km:'Kilometre',cm:'Centimetre',mi:'Mile',ft:'Foot',in:'Inch'},weight:{kg:'Kilogram',g:'Gram',lb:'Pound',oz:'Ounce'},temp:{C:'Celsius',F:'Fahrenheit',K:'Kelvin'}};
      const TO_BASE={length:{m:1,km:1e3,cm:.01,mi:1609.344,ft:.3048,in:.0254},weight:{kg:1,g:.001,lb:.453592,oz:.0283495}};
      el.innerHTML='<select id="utype" onchange="setu()" style="margin-bottom:.4rem"><option value="length">Length</option><option value="weight">Weight</option><option value="temp">Temperature</option></select><select id="ufrom" onchange="cu()"></select><label class="lbl">↓</label><select id="uto" onchange="cu()"></select><input type="number" id="uval" placeholder="Value…" oninput="cu()" style="margin-top:.4rem"/><div class="res hidden" id="ures"></div>';
      window.setu=function(){const type=document.getElementById('utype').value;const keys=Object.keys(UNITS[type]);['ufrom','uto'].forEach(function(id,i){const s=document.getElementById(id);s.innerHTML='';keys.forEach(function(k,j){const o=document.createElement('option');o.value=k;o.textContent=UNITS[type][k];if(j===i)o.selected=true;s.appendChild(o);});});document.getElementById('uto').selectedIndex=1;document.getElementById('ures').classList.add('hidden');};
      window.cu=function(){const type=document.getElementById('utype').value;const from=document.getElementById('ufrom').value;const to=document.getElementById('uto').value;const val=parseFloat(document.getElementById('uval').value);const res=document.getElementById('ures');if(isNaN(val)){res.classList.add('hidden');return;}let result;if(type==='temp'){let c=from==='C'?val:from==='F'?(val-32)*5/9:val-273.15;result=to==='C'?c:to==='F'?c*9/5+32:c+273.15;}else{result=val*TO_BASE[type][from]/TO_BASE[type][to];}res.textContent=val+' '+UNITS[type][from]+' = '+(+result.toFixed(6))+' '+UNITS[type][to];res.classList.remove('hidden');};
      window.setu();
    }
  },
  { name:'BMI Calculator', icon:'⚖', cat:'math', slug:'bmi-calculator',
    desc:'Body Mass Index',
    render: function(el) {
      el.innerHTML='<label class="lbl">Weight (kg)</label><input type="number" id="bw" placeholder="70" oninput="bmi()"/><label class="lbl">Height (cm)</label><input type="number" id="bh" placeholder="175" oninput="bmi()"/><div class="res hidden" id="br"></div>';
      window.bmi=function(){const w=parseFloat(document.getElementById('bw').value);const h=parseFloat(document.getElementById('bh').value)/100;const res=document.getElementById('br');if(!w||!h){res.classList.add('hidden');return;}const b=(w/(h*h)).toFixed(1);res.textContent='BMI: '+b+' — '+(b<18.5?'Underweight':b<25?'Normal':b<30?'Overweight':'Obese');res.classList.remove('hidden');};
    }
  },
  { name:'Tip Calculator', icon:'🍽', cat:'math', slug:'tip-calculator',
    desc:'Split the bill easily',
    render: function(el) {
      el.innerHTML='<input type="number" id="tb" placeholder="Bill amount ($)" oninput="tip()"/><label class="lbl">Tip: <strong id="tp">15</strong>%</label><input type="range" min="0" max="30" value="15" oninput="document.getElementById(\'tp\').textContent=this.value;tip()" style="width:100%;accent-color:#1a1612"/><label class="lbl">Split between</label><input type="number" id="ts" value="1" min="1" oninput="tip()"/><div class="res hidden" id="tr"></div>';
      window.tip=function(){const bill=parseFloat(document.getElementById('tb').value);const pct=+document.querySelector('input[type=range]').value;const split=Math.max(1,+document.getElementById('ts').value||1);const res=document.getElementById('tr');if(!bill){res.classList.add('hidden');return;}const t=bill*pct/100;const total=bill+t;res.textContent='Tip: $'+t.toFixed(2)+'\nTotal: $'+total.toFixed(2)+'\nEach: $'+(total/split).toFixed(2);res.classList.remove('hidden');};
    }
  },
  { name:'Text Case', icon:'Aa', cat:'text', slug:'text-case-converter',
    desc:'UPPER, lower, Title, camelCase',
    render: function(el) {
      el.innerHTML='<textarea id="tci" rows="3" placeholder="Type here…"></textarea><div class="btn-row" style="margin-top:.4rem"><button class="btn btn-g" style="margin-top:0;font-size:.65rem;padding:.3rem .5rem" onclick="tc(\'upper\')">UPPER</button><button class="btn btn-g" style="margin-top:0;font-size:.65rem;padding:.3rem .5rem" onclick="tc(\'lower\')">lower</button><button class="btn btn-g" style="margin-top:0;font-size:.65rem;padding:.3rem .5rem" onclick="tc(\'title\')">Title</button><button class="btn btn-g" style="margin-top:0;font-size:.65rem;padding:.3rem .5rem" onclick="tc(\'camel\')">camel</button></div><div class="res hidden" id="tcr"></div><button class="btn btn-g" id="tccp" style="display:none" onclick="navigator.clipboard.writeText(document.getElementById(\'tcr\').textContent)">Copy</button>';
      window.tc=function(mode){const t=document.getElementById('tci').value;if(!t.trim())return;const map={upper:t.toUpperCase(),lower:t.toLowerCase(),title:t.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()),camel:t.trim().toLowerCase().replace(/[\s_-]+(\w)/g,(_,c)=>c.toUpperCase())};const res=document.getElementById('tcr');res.textContent=map[mode];res.classList.remove('hidden');document.getElementById('tccp').style.display='inline-flex';};
    }
  },
  { name:'Colour Converter', icon:'🎨', cat:'dev', slug:'colour-converter',
    desc:'HEX ↔ RGB ↔ HSL',
    render: function(el) {
      el.innerHTML='<input type="color" id="cp" value="#3b82f6" oninput="cc(this.value)" style="width:100%;height:40px;padding:2px;border-radius:4px;border:1px solid #d4c9b8;background:#f5f0e8;cursor:pointer;margin-bottom:.4rem"/><input type="text" id="ch" value="#3b82f6" placeholder="#rrggbb" oninput="if(/^#[0-9a-fA-F]{6}$/.test(this.value))cc(this.value)"/><div id="cvals" style="margin-top:.5rem"></div>';
      function hexToRgb(hex){return{r:parseInt(hex.slice(1,3),16),g:parseInt(hex.slice(3,5),16),b:parseInt(hex.slice(5,7),16)};}
      function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;default:h=((r-g)/d+4)/6;}}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};}
      window.cc=function(hex){if(!/^#[0-9a-fA-F]{6}$/.test(hex))return;document.getElementById('cp').value=hex;document.getElementById('ch').value=hex;const{r,g,b}=hexToRgb(hex);const{h,s,l}=rgbToHsl(r,g,b);const vals=[['HEX',hex.toUpperCase()],['RGB','rgb('+r+', '+g+', '+b+')'],['HSL','hsl('+h+', '+s+'%, '+l+'%)']];document.getElementById('cvals').innerHTML=vals.map(function(v){return '<div class="res" style="cursor:pointer;font-family:monospace;font-size:.72rem;margin-bottom:.25rem" onclick="navigator.clipboard.writeText(\''+v[1]+'\')" title="Click to copy"><span style="color:#5a4e42;font-size:.63rem;letter-spacing:.08em;text-transform:uppercase">'+v[0]+'</span><br>'+v[1]+'</div>';}).join('');};
      window.cc('#3b82f6');
    }
  },
  { name:'Base64 Encoder', icon:'B64', cat:'dev', slug:'base64-encoder',
    desc:'Encode & decode Base64',
    render: function(el) {
      el.innerHTML='<textarea id="b64i" rows="3" placeholder="Text or Base64…"></textarea><div class="btn-row"><button class="btn" onclick="b64(\'e\')">Encode</button><button class="btn btn-g" onclick="b64(\'d\')">Decode</button></div><div class="res hidden" id="b64r" style="font-family:monospace;font-size:.7rem"></div><div class="btn-row"><button class="btn btn-g" id="b64cp" style="display:none" onclick="navigator.clipboard.writeText(document.getElementById(\'b64r\').textContent)">Copy</button></div>';
      window.b64=function(mode){const inp=document.getElementById('b64i').value;const res=document.getElementById('b64r');try{res.textContent=mode==='e'?btoa(unescape(encodeURIComponent(inp))):decodeURIComponent(escape(atob(inp)));res.classList.remove('hidden');document.getElementById('b64cp').style.display='inline-flex';}catch(e){res.textContent='Error: '+e.message;res.classList.remove('hidden');}};
    }
  },
  { name:'Percentage Calc', icon:'%', cat:'math', slug:'percentage-calc',
    desc:'3 percentage modes',
    render: function(el) {
      el.innerHTML='<select id="pm" onchange="pct()" style="margin-bottom:.4rem"><option value="of">What is X% of Y?</option><option value="is">X is what % of Y?</option><option value="change">% change X→Y</option></select><label class="lbl" id="pl1">X</label><input type="number" id="pa" oninput="pct()"/><label class="lbl" id="pl2">Y</label><input type="number" id="pb" oninput="pct()"/><div class="res hidden" id="pr"></div>';
      window.pct=function(){const mode=document.getElementById('pm').value;const a=parseFloat(document.getElementById('pa').value);const b=parseFloat(document.getElementById('pb').value);const res=document.getElementById('pr');if(isNaN(a)||isNaN(b)){res.classList.add('hidden');return;}let ans='';if(mode==='of')ans=a+'% of '+b+' = '+(+(a/100*b).toFixed(8));else if(mode==='is')ans=a+' is '+(+((a/b)*100).toFixed(4))+'% of '+b;else ans='Change: '+(+(((b-a)/a)*100).toFixed(4))+'%';res.textContent=ans;res.classList.remove('hidden');};
    }
  }
];

let currentTab = 'all';
let searchQuery = '';

function renderTools() {
  const container = document.getElementById('tools');
  const filtered = TOOLS.filter(function(t) {
    const matchTab = currentTab === 'all' || t.cat === currentTab;
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery) || t.desc.toLowerCase().includes(searchQuery);
    return matchTab && matchSearch;
  });
  if (!filtered.length) {
    container.innerHTML = '<div class="no-results">No tools found</div>';
    return;
  }
  container.innerHTML = filtered.map(function(t, i) {
    return '<div class="tool-item" onclick="openTool(' + TOOLS.indexOf(t) + ')">' +
      '<div class="tool-icon">' + t.icon + '</div>' +
      '<div><div class="tool-name">' + t.name + '</div><div class="tool-desc">' + t.desc + '</div></div>' +
    '</div>';
  }).join('');
}

window.setTab = function(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  renderTools();
};

window.filterTools = function() {
  searchQuery = document.getElementById('search').value.toLowerCase();
  renderTools();
};

window.openTool = function(index) {
  const tool = TOOLS[index];
  document.getElementById('tools').style.display = 'none';
  const panel = document.getElementById('tool-panel');
  panel.style.display = 'flex';
  panel.style.flexDirection = 'column';
  document.getElementById('panel-title').textContent = tool.name;
  const openFull = document.getElementById('open-full');
  openFull.href = 'https://toolcraft.online/?tool=' + tool.slug;
  const body = document.getElementById('panel-body');
  body.innerHTML = '';
  tool.render(body);
};

window.showList = function() {
  document.getElementById('tool-panel').style.display = 'none';
  document.getElementById('tools').style.display = 'block';
};

// Init
renderTools();
