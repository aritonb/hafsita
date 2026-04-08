// Image data store (base64 replaced by build script)
const IMGS = {
  IMG1: 'media/img1.jpg',
  IMG2: 'media/img2.jpg',
  IMG3: 'media/img3.jpg'
};

let prog=0,iv=null,hold=false,cur=1;
const C=2*Math.PI*85;
const rf=document.getElementById('rf');
rf.style.strokeDasharray=C;
rf.style.strokeDashoffset=C;
const hi=document.getElementById('hi');
const hsv=hi.querySelector('svg');

function setP(p){rf.style.strokeDashoffset=C-(p/100)*C;}
function startH(e){
  e.preventDefault();hold=true;
  hsv.style.fill='white';rf.style.stroke='white';
  iv=setInterval(()=>{if(prog<100){prog+=2.2;setP(prog);}else{clearInterval(iv);flashTransition();}},30);
}
function stopH(){
  if(!hold)return;hold=false;clearInterval(iv);
  if(prog<100){prog=0;setP(0);hsv.style.fill='var(--blue)';rf.style.stroke='var(--blue)';}
}
const hw=document.getElementById('hwrap');
hw.addEventListener('mousedown',startH);
window.addEventListener('mouseup',stopH);
hw.addEventListener('touchstart',startH,{passive:false});
window.addEventListener('touchend',stopH);

function flashTransition(){
  const fl=document.getElementById('flash');
  fl.style.transition='opacity 0.35s ease';
  fl.style.opacity='1';
  setTimeout(()=>{
    goTo(2);
    fl.style.transition='opacity 1s ease';
    fl.style.opacity='0';
  },400);
}

function goTo(n){
  document.getElementById('s'+cur).classList.remove('on');
  window.scrollTo(0,0);
  const nx=document.getElementById('s'+n);
  nx.classList.add('on');
  cur=n;
  if(n===2)startMap();
  if(n===3)animMedia();
  if(n===4)animFavs();
  if(n===5)animChat();
  if(n===6)animStr();
  if(n===7)animFinal();
}

function startMap(){
  const a1=document.getElementById('arc1'),a2=document.getElementById('arc2');
  const dl=document.getElementById('distline'),b2=document.getElementById('btn2');
  const cd=document.getElementById('cdot'),cd2=document.getElementById('cdot2');
  const cl1=document.getElementById('clabel1');
  const h1=document.getElementById('heart1'),h2=document.getElementById('heart2');
  // Arc 1: Sivas → Casablanca (slow: 1.5px per 20ms = ~3.7s)
  let o1=280;
  setTimeout(()=>{
    const t=setInterval(()=>{
      o1-=1.5;
      a1.style.strokeDashoffset=Math.max(0,o1);
      // Show heart1 halfway
      if(o1<=140 && o1>138) h1.style.opacity='1';
      if(o1<=0){clearInterval(t);cd.style.opacity='1';cd2.style.opacity='0.4';if(cl1)cl1.style.opacity='1';}
    },20);
  },600);
  // Arc 2: Casablanca → Tübingen (slow: starts after arc1)
  let o2=210;
  setTimeout(()=>{
    const t=setInterval(()=>{
      o2-=1.2;
      a2.style.strokeDashoffset=Math.max(0,o2);
      if(o2<=105 && o2>103) h2.style.opacity='1';
      if(o2<=0)clearInterval(t);
    },20);
  },4200);
  // Distline typewriter
  setTimeout(()=>{
    let txt='Sivas → Casablanca → Tübingen  ·  3 Continents, 1 Heart 💙';
    let i=0;const t=setInterval(()=>{dl.textContent=txt.slice(0,i++);if(i>txt.length)clearInterval(t);},40);
  },7500);
  setTimeout(()=>{b2.style.opacity='1';b2.style.pointerEvents='auto';},8600);
  b2.onclick=()=>goTo(3);
}

function animMedia(){document.querySelectorAll('.mcard').forEach((c,i)=>setTimeout(()=>c.classList.add('vis'),i*100));}
function animFavs(){document.querySelectorAll('.fcard').forEach((c,i)=>setTimeout(()=>c.classList.add('fadein'),i*110));}
function animChat(){
  const items=document.querySelectorAll('#chatbox .her-w,#chatbox .him-w');
  items.forEach((el,i)=>setTimeout(()=>{
    el.classList.add('vis');
    el.querySelectorAll('.bmsg,.btick,.bname').forEach(c=>c.style.opacity='1');
  },i*300));
}
function animStr(){document.querySelectorAll('.sitem').forEach((el,i)=>setTimeout(()=>el.classList.add('vis'),i*200));}
function animFinal(){
  setTimeout(()=>{
    document.getElementById('bdayt').classList.add('vis');
    document.getElementById('bdayn').classList.add('vis');
  },100);
  setTimeout(()=>document.getElementById('hburst').classList.add('vis'),600);
  setTimeout(()=>document.getElementById('bnum').classList.add('vis'),900);
  setTimeout(()=>document.getElementById('bsub').classList.add('vis'),1100);
  setTimeout(()=>document.getElementById('fmsg').classList.add('vis'),1500);
  setTimeout(()=>document.getElementById('fsig').classList.add('vis'),2000);
}

function flipCard(card){card.classList.toggle('flipped');}

function openImg(key,cap){
  document.getElementById('lbx-img').src=IMGS[key];
  document.getElementById('lbx-img').style.display='block';
  document.getElementById('lbx-vid').style.display='none';
  document.getElementById('lbx-cap').textContent=cap;
  document.getElementById('lbx').classList.add('on');
}
function openVid(src,cap){
  const v=document.getElementById('lbx-vid');
  v.src=src;v.style.display='block';
  document.getElementById('lbx-img').style.display='none';
  document.getElementById('lbx-cap').textContent=cap;
  document.getElementById('lbx').classList.add('on');
}
function closeLbx(){
  document.getElementById('lbx').classList.remove('on');
  const v=document.getElementById('lbx-vid');v.pause();v.src='';
}

function restartApp(){
  document.getElementById('s'+cur).classList.remove('on');
  // Reset all animation states
  document.querySelectorAll('.vis,.fadein,.flipped').forEach(el=>{
    el.classList.remove('vis','fadein','flipped');
  });
  // Reset map arcs
  const a1=document.getElementById('arc1'),a2=document.getElementById('arc2');
  if(a1){a1.style.strokeDashoffset='280';}
  if(a2){a2.style.strokeDashoffset='210';}
  const cd=document.getElementById('cdot'),cd2=document.getElementById('cdot2'),cl1=document.getElementById('clabel1');
  const h1=document.getElementById('heart1'),h2=document.getElementById('heart2');
  if(cd){cd.style.opacity='0';} if(cd2){cd2.style.opacity='0';}
  if(cl1){cl1.style.opacity='0';} if(h1){h1.style.opacity='0';} if(h2){h2.style.opacity='0';}
  // Reset map distline and btn
  const dl=document.getElementById('distline'),b2=document.getElementById('btn2');
  if(dl)dl.textContent='';
  if(b2){b2.style.opacity='0';b2.style.pointerEvents='none';}
  // Reset final section elements
  ['bdayt','bdayn','hburst','bnum','bsub','fmsg','fsig'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.classList.remove('vis');
  });
  // Reset heart ring
  prog=0; setP(0);
  const hsv=document.getElementById('hi').querySelector('svg');
  hsv.style.fill='var(--blue)';
  document.getElementById('rf').style.stroke='var(--blue)';
  // Reset media cards opacity
  document.querySelectorAll('.mcard').forEach(c=>c.classList.remove('vis'));
  // Go back to section 1
  cur=1;
  window.scrollTo(0,0);
  document.getElementById('s1').classList.add('on');
}

// Typewriter
const phrases=['Establishing connection...','Syncing our hearts...'];
let pi=0;const tw=document.getElementById('tw');
function typePhrase(p,cb){let i=0;tw.textContent='';const t=setInterval(()=>{tw.textContent+=p[i++];if(i>=p.length){clearInterval(t);setTimeout(cb,1500);}},45);}
function cycle(){typePhrase(phrases[pi++%phrases.length],cycle);}
cycle();