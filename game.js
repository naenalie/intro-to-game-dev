const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const ui = {
  score: document.querySelector('#score'), best: document.querySelector('#best'), state: document.querySelector('#state'), led: document.querySelector('#led'),
  control: document.querySelector('#control-status'), overlay: document.querySelector('#overlay'), start: document.querySelector('#start'), bloom: document.querySelector('#bloom'), message: document.querySelector('#message'), day: document.querySelector('#day')
};
let best = Number(localStorage.getItem('petal-post-best') || 0);
let playing = false, buttonDown = false, pressed = false, score = 0, frame = 0, last = 0, speed = 2.25, audio;
let letters = [], petals = [], lives = 3, seal = 0, sealing = false, current = null;
ui.best.textContent = String(best).padStart(3,'0');

function tone(freq, duration=.07, type='square', vol=.025) { if (!audio) return; const o=audio.createOscillator(), g=audio.createGain(); o.type=type; o.frequency.value=freq; g.gain.setValueAtTime(vol,audio.currentTime); g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration); o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime+duration); }
function setState(s) { ui.state.textContent=s; ui.control.textContent=s; const colors={PRESSED:'#d94b95',HELD:'#dbe780',RELEASED:'#b7c9ec',READY:'#aaa',OUCH:'#f46d6d'}; ui.led.style.background=colors[s]||'#aaa'; }
function reset() { score=0; frame=0; speed=1.55; lives=3; seal=0; sealing=false; current=null; letters=[]; petals=[]; ui.score.textContent='000'; ui.day.textContent='BATCH 01'; ui.message.textContent='SEAL THE LETTERS!'; spawnLetter(610); }
function startGame() { if (!audio) audio=new (window.AudioContext||window.webkitAudioContext)(); audio.resume(); reset(); playing=true; ui.overlay.classList.add('hidden'); setState('RELEASED'); tone(523,.1,'triangle'); }
function endGame() { playing=false; buttonDown=false; sealing=false; setState('OUCH'); tone(110,.3,'sawtooth',.035); setTimeout(()=>{ui.overlay.classList.remove('hidden'); ui.overlay.querySelector('h1').textContent='MAILROOM CLOSED'; ui.overlay.querySelector('p').textContent=`You sealed ${score} letter${score===1?'':'s'}!`; ui.start.textContent='OPEN AGAIN';},350); if(score>best){best=score;localStorage.setItem('petal-post-best',best);ui.best.textContent=String(best).padStart(3,'0');} }
function spawnLetter(x) { letters.push({x, target:42+Math.random()*37, stamp:0, active:false, released:false, done:false, color:['#f8c4d6','#dbe780','#b7c9ec'][Math.floor(Math.random()*3)]}); }
function inputDown(e) { if(e) e.preventDefault(); if (!playing) return; buttonDown=true; pressed=true; ui.bloom.classList.add('active'); setState('PRESSED'); tone(520,.05,'square'); }
function inputUp(e) { if(e) e.preventDefault(); if (!playing) return; buttonDown=false; ui.bloom.classList.remove('active'); setState('RELEASED'); if(current && current.active && !current.released){current.released=true; current.done=true; const accurate=Math.abs(current.stamp-current.target)<12; if(accurate){score++;speed+=.065;ui.score.textContent=String(score).padStart(3,'0');ui.day.textContent=`BATCH ${String(score+1).padStart(2,'0')}`;ui.message.textContent='PERFECT SEAL!';tone(880,.11,'triangle');burst();}else{lives--;ui.message.textContent='WAX WASN’T READY!';tone(180,.12,'sawtooth');} current=null; sealing=false;} }
ui.start.addEventListener('click', startGame); ui.bloom.addEventListener('pointerdown',inputDown); window.addEventListener('pointerup',inputUp); window.addEventListener('keydown',e=>{if(e.code==='Space'){if(!e.repeat) inputDown(e);}}); window.addEventListener('keyup',e=>{if(e.code==='Space')inputUp(e);});

function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function cloud(x,y,s){ctx.fillStyle='#fff9e8'; [[0,10,42,22],[18,0,35,32],[42,10,48,22]].forEach(a=>ctx.fillRect(x+a[0]*s,y+a[1]*s,a[2]*s,a[3]*s));}
function drawMailroom(){rect(0,0,W,H,'#b6dcea');cloud(64,52,.7);cloud(535,62,.8);rect(0,315,W,165,'#f8e5c5');rect(0,315,W,9,'#e5b98d'); // wall art
rect(58,125,105,95,'#fff9e8');rect(62,129,97,87,'#8cb9b4');rect(68,177,85,35,'#94c47a');cloud(77,146,.45);rect(510,115,124,108,'#fff9e8');rect(514,119,116,100,'#f5c5d9');rect(535,145,75,45,'#dbe780');
// conveyor
rect(0,342,W,67,'#76506d');rect(0,350,W,51,'#9c8aab');for(let x=-20;x<W;x+=45){rect(x,354,28,9,'#c4b6cc');rect(x,387,28,9,'#c4b6cc');}rect(0,405,W,8,'#542c4d'); // desk
rect(218,277,210,13,'#9c6a60');rect(229,290,12,62,'#9c6a60');rect(405,290,12,62,'#9c6a60');}
function drawPress(){const x=323,y=238;rect(x-34,y+49,68,13,'#542c4d');rect(x-28,y+42,56,10,'#d94b95');rect(x-10,y-7,20,50,'#7b668e');rect(x-31,y-18,62,13,'#542c4d');rect(x-25,y-14,50,7,'#f5b6d3');rect(x-6,y+9,12,16,'#dbe780');ctx.fillStyle=buttonDown?'#d94b95':'#f4a5c8';ctx.fillRect(x-17,y+25,34,12);ctx.fillStyle='#542c4d';ctx.fillRect(x-4,y+29,8,5);}
function drawLetter(l){const x=Math.round(l.x),y=357;rect(x,y,86,35,'#542c4d');rect(x+3,y+3,80,29,'#fff9e8');rect(x+6,y+6,74,23,l.color);rect(x+10,y+10,35,3,'#fff9e8');rect(x+10,y+17,50,3,'#fff9e8');if(l.active){ctx.strokeStyle='#542c4d';ctx.lineWidth=3;ctx.strokeRect(x+10,y-18,64,8);rect(x+12,y-16,Math.min(60,l.stamp*60/l.target),4,'#d94b95');rect(x+10,y-31,64,8,'#fff9e8');rect(x+12,y-29,l.target,4,'#dbe780');}}
function burst(){for(let i=0;i<9;i++)petals.push({x:350,y:285,vx:(Math.random()-.5)*3,vy:-Math.random()*2,life:23});}
function update(dt){if(!playing)return;frame+=dt;letters.forEach(l=>{l.x-=speed*dt;if(l.x<370&&l.x+86>323&&!l.done){l.active=true;current=l;if(buttonDown){l.stamp=Math.min(100,l.stamp+1.05*dt);sealing=true;setState(pressed?'PRESSED':'HELD');}pressed=false;}else if(l.active&&!l.done&&l.x+86<=323){l.done=true;lives--;current=null;sealing=false;ui.message.textContent='MISSED THE PRESS!';tone(150,.12,'sawtooth');}});if(letters.length&&letters[0].x<-110){letters.shift();if(lives<=0)endGame();else spawnLetter(720);}petals.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt});petals=petals.filter(p=>p.life>0);}
function render(){drawMailroom();drawPress();letters.forEach(drawLetter);petals.forEach(p=>rect(p.x,p.y,4,4,'#e891bb'));ctx.fillStyle='#542c4d';ctx.font='18px Pixelify Sans';ctx.fillText('LIVES  '+ '♥ '.repeat(lives)+'♡ '.repeat(3-lives),18,452);ctx.fillText('WAX SEAL STATION',260,245);}
function loop(t){let dt=Math.min((t-last)/16.67,2);last=t;update(dt);render();requestAnimationFrame(loop)} requestAnimationFrame(loop); setState('READY');
