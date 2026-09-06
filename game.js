const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const ui = {
  score: document.querySelector('#score'), best: document.querySelector('#best'), state: document.querySelector('#state'), led: document.querySelector('#led'),
  control: document.querySelector('#control-status'), overlay: document.querySelector('#overlay'), start: document.querySelector('#start'), bloom: document.querySelector('#bloom'), message: document.querySelector('#message'), day: document.querySelector('#day')
};
let best = Number(localStorage.getItem('petal-post-best') || 0);
let playing = false, buttonDown = false, pressed = false, score = 0, frame = 0, last = 0, speed = 2.25, audio;
const courier = { x:150, y:230, vy:0, r:16, wing:0 };
let gates = [], petals = [];
ui.best.textContent = String(best).padStart(3,'0');

function tone(freq, duration=.07, type='square', vol=.025) { if (!audio) return; const o=audio.createOscillator(), g=audio.createGain(); o.type=type; o.frequency.value=freq; g.gain.setValueAtTime(vol,audio.currentTime); g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration); o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime+duration); }
function setState(s) { ui.state.textContent=s; ui.control.textContent=s; const colors={PRESSED:'#d94b95',HELD:'#dbe780',RELEASED:'#b7c9ec',READY:'#aaa',OUCH:'#f46d6d'}; ui.led.style.background=colors[s]||'#aaa'; }
function reset() { score=0; frame=0; speed=2.25; courier.y=230; courier.vy=0; gates=[]; petals=[]; ui.score.textContent='000'; ui.day.textContent='DAY 01'; ui.message.textContent='DELIVER THE LETTERS!'; addGate(530); addGate(850); addGate(1170); }
function startGame() { if (!audio) audio=new (window.AudioContext||window.webkitAudioContext)(); audio.resume(); reset(); playing=true; ui.overlay.classList.add('hidden'); setState('PRESSED'); tone(523,.1,'triangle'); }
function endGame() { playing=false; buttonDown=false; setState('OUCH'); tone(110,.3,'sawtooth',.035); setTimeout(()=>{ui.overlay.classList.remove('hidden'); ui.overlay.querySelector('h1').textContent='DELIVERY PAUSED'; ui.overlay.querySelector('p').textContent=`You delivered ${score} letter${score===1?'':'s'}!`; ui.start.textContent='TRY AGAIN';},350); if(score>best){best=score;localStorage.setItem('petal-post-best',best);ui.best.textContent=String(best).padStart(3,'0');} }
function addGate(x) { const gap=130-Math.min(score*2,35), top=95+Math.random()*(H-190-gap); gates.push({x, top, gap, counted:false, flower:Math.random()>.4}); }
function inputDown(e) { if(e) e.preventDefault(); if (!playing) return; if (!buttonDown) { pressed=true; courier.vy=-5.8; tone(680,.055,'square'); } buttonDown=true; ui.bloom.classList.add('active'); setState(pressed?'PRESSED':'HELD'); }
function inputUp(e) { if(e) e.preventDefault(); if (!playing) return; buttonDown=false; ui.bloom.classList.remove('active'); setState('RELEASED'); }
ui.start.addEventListener('click', startGame); ui.bloom.addEventListener('pointerdown',inputDown); window.addEventListener('pointerup',inputUp); window.addEventListener('keydown',e=>{if(e.code==='Space'){if(!e.repeat) inputDown(e);}}); window.addEventListener('keyup',e=>{if(e.code==='Space')inputUp(e);});

function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function cloud(x,y,s){ctx.fillStyle='#fff9e8'; [[0,10,42,22],[18,0,35,32],[42,10,48,22]].forEach(a=>ctx.fillRect(x+a[0]*s,y+a[1]*s,a[2]*s,a[3]*s));}
function drawGarden(){ rect(0,0,W,H,'#b6dcea'); cloud(50,80,.7);cloud(400,46,1);cloud(590,175,.6); rect(0,H-45,W,45,'#94c47a'); rect(0,H-38,W,9,'#74a66e'); for(let i=0;i<20;i++){let x=(i*83+31)%W;rect(x,H-53-(i%3)*4,3,12,'#537556');rect(x-4,H-54-(i%3)*4,11,4,i%2?'#f2a0c0':'#f8e8a3');} }
function drawGate(g){ const x=Math.round(g.x), bw=54; rect(x,0,bw,g.top,'#dbe780'); rect(x+5,0,8,g.top,'#b0c55f'); rect(x,g.top-9,bw,9,'#e7f09b'); rect(x,g.top+g.gap,bw,H-(g.top+g.gap),'#dbe780');rect(x+5,g.top+g.gap,8,H-(g.top+g.gap),'#b0c55f');rect(x,g.top+g.gap,bw,9,'#e7f09b'); if(g.flower){for(let y=24;y<g.top-8;y+=35){rect(x+29,y,10,10,'#e891bb');rect(x+32,y+3,4,4,'#ffe99d')}} }
function drawCourier(){ const x=courier.x,y=courier.y; ctx.save();ctx.translate(x,y);ctx.rotate(Math.max(-.35,Math.min(.45,courier.vy*.06))); // envelope wings
rect(-22,-6,14,11,'#f7d1df');rect(-26,-3,8,5,'#d94b95');rect(8,-6,14,11,'#f7d1df');rect(18,-3,8,5,'#d94b95');
rect(-15,-14,30,29,'#fff9e8');rect(-12,-17,24,5,'#d94b95');rect(-10,-9,20,3,'#f8c4d6');rect(-2,-1,5,5,'#542c4d');rect(-13,13,26,4,'#542c4d');ctx.restore(); }
function burst(){ for(let i=0;i<5;i++)petals.push({x:courier.x-10,y:courier.y+(i-2)*5,vx:-1-Math.random()*1.5,vy:(i-2)*.4,life:18}); }
function update(dt){ if(!playing)return; frame+=dt; if(pressed){burst();pressed=false;} const gravity=buttonDown?.19:.36; courier.vy+=gravity*dt; if(buttonDown) courier.vy=Math.min(courier.vy,1.8); courier.y+=courier.vy*dt; gates.forEach(g=>{g.x-=speed*dt;if(!g.counted&&g.x+54<courier.x){g.counted=true;score++;speed+=.06;ui.score.textContent=String(score).padStart(3,'0');ui.day.textContent=`DAY ${String(score+1).padStart(2,'0')}`;tone(880,.08,'triangle');} if(courier.x+courier.r>g.x&&courier.x-courier.r<g.x+54&&(courier.y-courier.r<g.top||courier.y+courier.r>g.top+g.gap))endGame();});if(gates[0].x<-70){gates.shift();addGate(gates[gates.length-1].x+320);} if(courier.y<11||courier.y>H-60)endGame(); petals.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt});petals=petals.filter(p=>p.life>0); }
function render(){drawGarden();gates.forEach(drawGate);petals.forEach(p=>rect(p.x,p.y,4,4,'#e891bb'));drawCourier();}
function loop(t){let dt=Math.min((t-last)/16.67,2);last=t;update(dt);render();requestAnimationFrame(loop)} requestAnimationFrame(loop); setState('READY');
