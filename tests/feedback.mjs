import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {execSync} from 'node:child_process'
import {serve,open,closeall,check,done,sleep,root} from './lib.mjs'
import {relay} from './relay.mjs'
import {BOT} from './bot.mjs'
import {pool} from './balance/pool.mjs'
import {MINIPROBE} from './balance/probe.mjs'
import {DUELBOT,duel} from './balance/duel.mjs'
const J=s=>JSON.parse(s),CLS=['wizard','priest','rogue','bow','knight']
async function until(fn,ms=8000,step=100){const t0=Date.now();for(;;){try{if(await fn())return true}catch(e){}if(Date.now()-t0>ms)return false;await sleep(step)}}
const SPY=`(()=>{if(window.__sp)return;window.__sp={n:[],o:smp};smp=(n,v,o)=>{__sp.n.push([n,v,o&&o.pri||0,ac?ac.currentTime:0]);return __sp.o(n,v,o)}})();`
function mainfile(){const f=path.join(os.tmpdir(),'emberdeep-main.html');try{fs.writeFileSync(f,execSync('git show 0b9b55a:index.html',{cwd:root,maxBuffer:1<<24}));return f}catch(e){return null}}
async function storm(t){await t.ev('au();0');await until(async()=>J(await t.ev('JSON.stringify(!!(SB&&ac))')),15000);await t.ev(`(()=>{leavehub();hide();newgame('wizard');run.en.length=0;run.spawned=1e9;${SPY}window.__sp.n.length=0;window.__st=setInterval(()=>{for(const k of['hit','swing','kill','coin','bolt','hitb','crit'])sfx(k,P.x+80,P.y)},16)})();0`);await sleep(3000);return J(await t.ev(`(()=>{clearInterval(window.__st);const L=__sp.n;return JSON.stringify({n:L.length,v:L.reduce((a,q)=>a+q[1],0),max:SV.length})})()`))}
async function solo(){const {server,url}=await serve(),t=await open(url);await t.ev(BOT+';0')
try{
const src=fs.readFileSync(path.join(root,'index.html'),'utf8')
const sh=J(await t.ev(`(()=>{leavehub();hide();newgame('wizard');g.gold=1e9;g.fl=12;const a=shop().map(q=>q.k),p=g.pend;const r=buy1('tome');return JSON.stringify({a,r,p0:p,p1:g.pend})})()`))
check('feedback 11: the shop offers no card hands',!sh.a.includes('tome')&&!/Tome of power/.test(src),sh.a.join(','))
check('feedback 11: buying a card hand does nothing',sh.r===false&&sh.p0===sh.p1)
await t.ev(`hide();enterhub();hide();SET.nm='Cat';saveset();0`);await sleep(200)
await t.page.keyboard.press('Escape');await sleep(200)
const has=await t.page.evaluate(()=>{const e=document.querySelector('#rnm');return e?{ml:e.maxLength,ov:window.__t.ev('ovk')}:null})
check('feedback 12: Esc in the Hearth shows a name field',!!has&&has.ov==='hubset',JSON.stringify(has))
const h0=J(await t.ev('JSON.stringify([hub.x,hub.y])'))
await t.page.click('#rnm',{clickCount:3});await t.page.keyboard.type('Ash Wd',{delay:30});await sleep(300)
const n1=J(await t.ev(`JSON.stringify({nm:SET.nm,ls:JSON.parse(localStorage.getItem('emberdeep-set')).nm,ov:ovk,h:[hub.x,hub.y]})`))
check('feedback 12: typing a name with a space renames and saves it',n1.nm==='Ash Wd'&&n1.ls==='Ash Wd',JSON.stringify(n1))
check('feedback 12: typing in the name field does not walk or trigger keys',n1.ov==='hubset'&&Math.hypot(n1.h[0]-h0[0],n1.h[1]-h0[1])<2,JSON.stringify([h0,n1.h]))
await t.page.click('#rnm',{clickCount:3});await t.page.keyboard.type('Abcdefghijklmnopqrstuvwxyz',{delay:5});await sleep(200)
const n2=J(await t.ev(`JSON.stringify({nm:SET.nm,v:document.querySelector('#rnm').value})`))
check('feedback 12: names stop at 12 characters',n2.nm.length===12&&n2.v.length<=12,JSON.stringify(n2))
const lob=J(await t.ev(`(()=>{const o=LOB;LOB={me:1,ws:{readyState:1,send:s=>window.__ls=s},t:0,c:9,mv:false};window.__ls='';rename('Ember Fox');lobtick(0.016);const r=window.__ls;LOB=o;return JSON.stringify(r)})()`))
check('feedback 12: the Hearth hears the new name right away',lob.includes('"nm":"Ember Fox"'),lob.slice(0,120))
const bad=J(await t.ev(`JSON.stringify([rename('<img src=x onerror=alert(1)>'),rename('a&b"c\\'d'),rename('   '),rename('Ä Ölmo')])`))
check('feedback 12: names lose markup and odd characters',bad.every(s=>!/[<>&"']/.test(s))&&bad[2]==='Cat'&&bad[3]==='Ä Ölmo',JSON.stringify(bad))
await t.ev(`hide();leavehub();newgame('knight');startfloor();0`);await sleep(300);await t.page.keyboard.press('Escape');await sleep(200)
const pz=await t.page.evaluate(()=>({ov:window.__t.ev('ovk'),f:!!document.querySelector('#rnm')}))
await t.page.click('#rnm',{clickCount:3});await t.page.keyboard.type('Run Name',{delay:20});await sleep(200)
const pn=J(await t.ev('JSON.stringify({nm:LOC.nm,s:SET.nm})'))
check('feedback 12: the Esc menu in a run has the name field and renames the hero',pz.ov==='pause'&&pz.f&&pn.nm==='Run Name'&&pn.s==='Run Name',JSON.stringify([pz,pn]))
await t.ev(`hide();0`)
const kb=J(await t.ev(`(()=>{__b.mode='afk';run.en.length=0;run.spawned=1e9;__sim(1.5);run.spawned=1e9;run.tele=[];run.shots=[];run.lava=[];P.inv=0;P.ifr=0;P.gd=0;P.hp=S.mhp;const x0=P.x,y0=P.y,h0=P.hp;hurt(S.mhp*0.1,{x:P.x-60,y:P.y,atk:10});const h1=P.hp;__sim(0.5);const r={dx:P.x-x0,dy:P.y-y0};P.x=x0;P.y=y0;P.kbx=P.kby=0;P.inv=0;P.ifr=0;P.gd=0;run.lava=[{x:x0+70,y:y0,r:46,t:99,a:1}];hurt(S.mhp*0.1,{x:x0-60,y:y0,atk:10});__sim(0.5);r.lava=lavaat(P.x,P.y);r.hx=P.x-x0;run.lava=[];P.x=x0;P.y=y0;P.kbx=P.kby=0;P.inv=0;P.ifr=0;P.gd=0;hurt(1,{x:x0-60,y:y0,atk:10},{hz:1});__sim(0.5);r.hz=P.x-x0;const s=[];for(const f of[1,0.6,0.3,0.1]){P.hp=S.mhp*f;s.push(+hpslow().toFixed(3))}r.s=s;r.h=[h0,h1];P.hp=S.mhp;return JSON.stringify(r)})()`))
check('feedback 6: a hit pushes the hero away from the attacker',kb.dx>40&&kb.dx<140&&Math.abs(kb.dy)<10,JSON.stringify(kb))
check('feedback 6: knockback never pushes the hero into lava',!kb.lava&&kb.hx<30,JSON.stringify(kb))
check('feedback 6: hazards do not knock back',Math.abs(kb.hz)<2,kb.hz)
check('feedback 6: lower health means slower movement, never under 78%',kb.s[0]===1&&kb.s[1]<1&&kb.s[2]<kb.s[1]&&kb.s[3]<kb.s[2]&&kb.s[3]>=0.78,kb.s.join(','))
const dm=J(await t.ev(`(()=>{const C=Object.keys(CL),A=Object.keys(AN),F=['',...Object.keys(BD)],out={n:0,same:[],err:''};const pix=(cl,an,hk,anf)=>{cx.save();cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,220,240);drawhero(110,150,64,cl,0,5000,{cos:{...cos(),an},hk,anf:anf||undefined,mv:0});cx.restore();return cx.getImageData(0,0,220,240).data};try{for(const cl of C)for(const an of A)for(const anf of F){out.n++;const a=pix(cl,an,1,anf),b=pix(cl,an,0.1,anf),c=pix(cl,an,0.45,anf);let d=0,e=0;for(let i=0;i<a.length;i+=4){if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])+Math.abs(a[i+3]-b[i+3])>40)d++;if(Math.abs(a[i]-c[i])+Math.abs(a[i+3]-c[i+3])>40)e++}if(d<80||e<30)out.same.push(cl+'/'+an+'/'+anf+':'+d+','+e)}}catch(x){out.err=String(x)}return JSON.stringify(out)})()`))
check('feedback 6: every class, animal and animal form looks hurt at low health',!dm.err&&!dm.same.length&&dm.n>=25,dm.n+' combos'+(dm.err?' '+dm.err:'')+(dm.same.length?' same: '+dm.same.slice(0,6).join(' '):''))
const red=J(await t.ev(`(()=>{const L=[];const o=cx.fillStyle;let d=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'fillStyle');Object.defineProperty(cx,'fillStyle',{set(v){L.push(String(v));d.set.call(cx,v)},get(){return d.get.call(cx)},configurable:true});scuffs(100,100,64,1,1,5000);delete cx.fillStyle;return JSON.stringify(L)})()`))
check('feedback 6: the hurt look uses no red',red.every(c=>{const m=/^#([0-9a-f]{6})$/i.exec(c);if(!m)return true;const v=parseInt(m[1],16),r=v>>16,g=v>>8&255,b=v&255;return!(r>160&&g<110&&b<120)}),red.join(','))
await t.ev('au();0');await until(async()=>J(await t.ev('JSON.stringify(!!SB)')),15000)
const v2=J(await t.ev(`(()=>{${SPY}let max=0;const K=Object.keys(SX);for(let i=0;i<4;i++)for(const k of K){for(const q in sl)delete sl[q];sfx(k,P.x+40,P.y);max=Math.max(max,SV.length)}return JSON.stringify({max,cap:VCAP})})()`))
check('feedback 9: the voice cap is 12 and holds under every sound at once',v2.cap===12&&v2.max<=12&&v2.max>=8,JSON.stringify(v2))
const hs=J(await t.ev(`(()=>{const L=__sp.n,top=k=>{for(const q in sl)delete sl[q];const n0=L.length;sfx(k,P.x,P.y);return L.slice(n0)};const h=top('hurt'),R=['hit','swing','slash','bolt','arrow','holy','shoot','kill','coin','crit','hitb','zap'].map(k=>[k,Math.max(0,...top(k).map(q=>q[1]))]);const full=()=>{for(let i=0;i<14;i++){for(const q in sl)delete sl[q];sfx('boomb',P.x,P.y);for(const q in sl)delete sl[q];sfx('kill',P.x,P.y)}};full();const s0=SV.length;for(const q in sl)delete sl[q];const n1=L.length;sfx('hurt',P.x,P.y);const got=L.slice(n1).length;return JSON.stringify({hv:Math.max(...h.map(q=>q[1])),hp:Math.min(...h.map(q=>q[2])),R,s0,got,cap:SV.length})})()`))
const rmax=Math.max(...hs.R.map(r=>r[1]))
check('feedback 9: hurt plays at full volume and louder than any routine sound',hs.hv>=1&&hs.hv>=rmax*1.6,'hurt '+hs.hv+' vs loudest routine '+rmax.toFixed(2)+' '+JSON.stringify(hs.R))
check('feedback 9: hurt cuts through a full voice list',hs.s0>=12&&hs.got>=2&&hs.cap<=12,JSON.stringify({s0:hs.s0,got:hs.got,cap:hs.cap}))
const cue=J(await t.ev(`(()=>{const L=__sp.n;run.tele=[];run.en.length=0;const n0=L.length;for(const q in sl)delete sl[q];tc(P.x,P.y,60,0.9,0.1,{x:P.x+200,y:P.y,atk:10,k:'grub'});updtele(0.016);const a=L.slice(n0).map(q=>q[0]);for(const q in sl)delete sl[q];const n1=L.length;updtele(0.016);const b=L.slice(n1).length;run.tele=[];for(const q in sl)delete sl[q];const n2=L.length;tc(P.x,P.y,60,1.2,0.1,{x:P.x+200,y:P.y,atk:10,boss:1,bz:2});updtele(0.016);const c=L.slice(n2).map(q=>q[0]);run.tele=[];return JSON.stringify({a,b,c})})()`))
check('feedback 9: an enemy telegraph sounds a cue as it appears, once',cue.a.includes('rise')&&cue.b===0,JSON.stringify(cue))
check('feedback 9: boss telegraphs get a heavier cue',cue.c.includes('sub')&&cue.c.includes('rise'),JSON.stringify(cue.c))
const xp=J(await t.ev('JSON.stringify([2,5,10,20,30].map(l=>[need(l),Math.round(10*Math.pow(l,1.6))]))'))
check('feedback 10: every level needs more XP than before, at least 1.5x from level 5',xp.every(([n,o],i)=>n>o&&(i<1||n>=o*1.5)),JSON.stringify(xp))
const cap=J(await t.ev(`(()=>{hide();leavehub();newgame('wizard');startfloor();g.picks=CCAP-1;g.pend=2;g.cards=null;levelui();const h1=(document.querySelector('#box').innerText.match(/card [0-9]+ of [0-9]+/)||[''])[0],g0=g.gold;choose(g.cards[0]);const p1=g.picks;if(g.pend>0){g.cards=null;levelui()}const r={cap:CCAP,h1,p1,gold:g.gold-g0,pend:g.pend,cards:cards().length};hide();return JSON.stringify(r)})()`))
check('feedback 1: the card screen counts toward the cap',cap.h1==='card '+cap.cap+' of '+cap.cap,JSON.stringify(cap))
check('feedback 1: no more card offers once the cap is reached',cap.p1===cap.cap&&cap.cards===0,JSON.stringify(cap))
check('feedback 1: level ups past the cap turn into gold',cap.gold>0&&cap.pend===0,JSON.stringify(cap))
const hr=J(await t.ev(`(()=>{const r=[];for(let k=0;k<=5;k++){g.ab.reach=k;r.push(Math.round(HRNG*hreach()))}delete g.ab.reach;return JSON.stringify({r,card:!!ab.reach&&ab.reach.cl==='priest'&&ab.reach.max===5})})()`))
check('feedback 3: Wide Grace is a 5 rank priest card',hr.card)
check('feedback 3: each Wide Grace rank widens healing reach by 20%',hr.r.join()==='280,336,392,448,504,560',hr.r.join())
check('feedback 3: shared heals, Sanctuary and Beacon all use the healing reach',(src.match(/hreach\(\)/g)||[]).length>=3)
const car=J(await t.ev(`(()=>{localStorage.removeItem('emberdeep-career');SET.nm='Ash';hide();leavehub();newgame('rogue');startfloor();const e=mkmini('sporeback',P.x+200,P.y);e.xp=1;run.en.push(e);hit(e,3);P.inv=0;P.ifr=0;P.hp=S.mhp;hurt(S.mhp*0.1,{x:P.x-50,y:P.y,atk:10});heal(5);g.kills=7;g.best=4;g.bestcombo=9;enterhub();const ov=ovk,box=document.querySelector('#box').innerText,c1=JSON.parse(localStorage.getItem('emberdeep-career'));hide();leavehub();newgame('wizard');startfloor();g.kills=3;g.best=2;enterhub();const c2=JSON.parse(localStorage.getItem('emberdeep-career'));hide();leavehub();tdstart('wizard');g.kills=50;enterhub();const ov3=ovk,c3=JSON.parse(localStorage.getItem('emberdeep-career'));hide();return JSON.stringify({ov,box,c1,c2,c3,ov3,keys:Object.keys(localStorage).filter(k=>/^emberdeep/.test(k))})})()`))
check('feedback 5: ending a run shows its stats',car.ov==='sum'&&/Ash/.test(car.box)&&/Kills/.test(car.box),car.ov+' '+car.box.replace(/\s+/g,' ').slice(0,160))
check('feedback 5: career stats are saved under their own key',!!car.c1&&car.c1.runs===1&&car.c1.kills===7&&car.c1.best===4&&car.c1.combo===9&&car.c1.dmg>0&&car.c1.tk>0&&car.c1.hl>0&&car.c1.cl.rogue.runs===1,JSON.stringify(car.c1))
check('feedback 5: career stats add up across runs',car.c2.runs===2&&car.c2.kills===10&&car.c2.best===4&&car.c2.cl.wizard.best===2,JSON.stringify(car.c2))
check('feedback 5: the dummy yard does not count as a run',car.c3.runs===2&&car.c3.kills===10&&car.ov3!=='sum',JSON.stringify(car.c3))
check('feedback 5: runs still do not save',car.keys.every(k=>['emberdeep-set','emberdeep-meta','emberdeep-rush','emberdeep-career'].includes(k)),car.keys.join(','))
await t.ev('hubset();0');await t.page.click('[data-go=career]');await sleep(150)
const cv=await t.page.evaluate(()=>({ov:window.__t.ev('ovk'),tx:document.querySelector('#box').innerText}))
check('feedback 5: the Hearth settings open a career page',cv.ov==='career'&&/Runs\s+2/.test(cv.tx)&&/Rogue/.test(cv.tx),cv.tx.replace(/\s+/g,' ').slice(0,200))
await t.ev(`hide();leavehub();newgame('bow');startfloor();ptab='stats';pauseui();0`);const ps=await t.page.evaluate(()=>document.querySelector('#box').innerText)
check('feedback 5: the pause menu has a stats tab for the current run',/Stats/.test(ps)&&/Damage/.test(ps)&&/Career/.test(ps),ps.replace(/\s+/g,' ').slice(0,160))
await t.ev('ptab="game";hide();enterhub();hide();0')
await sleep(300);check('feedback: no JS errors in solo',!t.errs.length,t.errs.slice(0,3).join(' | '))
}finally{await t.close();server.close()}}
async function density(){const mf=mainfile();if(!mf){check('feedback 9: sound density compared to main',false,'git show failed');return}const a=await serve(0,mf),b=await serve(),ta=await open(a.url),tb=await open(b.url)
try{const r0=await storm(ta),r1=await storm(tb)
check('feedback 9: a hit and kill storm plays at most 60% as many sounds as before',r1.n<=r0.n*0.6,r0.n+' plays before, '+r1.n+' now')
check('feedback 9: the same storm is at most half as loud in total',r1.v<=r0.v*0.5,r0.v.toFixed(1)+' before, '+r1.v.toFixed(1)+' now')}finally{await ta.close();await tb.close();a.server.close();b.server.close()}}
async function minis(){const mf=mainfile(),Q=await pool(1),O=mf?await pool(1,mf):null
try{const o=J(await Q.P[0].ev(MINIPROBE({fl:12,sec:14}))),K=Object.keys(o).filter(k=>k!=='dummy'),bad=f=>K.filter(k=>!f(o[k])).join(',')||'none'
check('feedback 7: every enemy type shows a telegraph within 4 s',!K.some(k=>!(o[k].first!=null&&o[k].first<=4&&o[k].tel+o[k].nod>0)),'failing: '+bad(q=>q.first!=null&&q.first<=4&&q.tel+q.nod>0))
check('feedback 7: every enemy type has one heavy hit, 20% of max health or 2.5x its attack',!K.some(k=>!(Math.max(o[k].tpct,o[k].hpct)>=0.2||o[k].sdmg>=2.5||o[k].tdmg>=2.5)),'failing: '+bad(q=>Math.max(q.tpct,q.hpct)>=0.2||q.sdmg>=2.5||q.tdmg>=2.5))
check('feedback 7: every enemy type lands its attack on a player who stands still',!K.some(k=>o[k].nh+o[k].no<1),'failing: '+bad(q=>q.nh+q.no>0))
check('feedback 7: no enemy type sprays bullets, at most 4 shots in 14 s',!K.some(k=>o[k].shots>4),K.map(k=>k+':'+o[k].shots).join(' '))
const ch=K.filter(k=>o[k].dist<=100),kp=K.filter(k=>o[k].dist>=280)
check('feedback 8: some enemies chase and some keep their distance',ch.length>=4&&kp.length>=4,'chase '+ch.join(',')+' | keep away '+kp.join(','))
const sp=K.map(k=>o[k].spd).filter(v=>v>0);check('feedback 8: enemy speeds vary at least 3x',Math.max(...sp)>=3*Math.min(...sp),Math.min(...sp)+' to '+Math.max(...sp))
if(O){const b=J(await O.P[0].ev(MINIPROBE({fl:12,sec:14}))),s0=K.reduce((a,k)=>a+(b[k]?b[k].shots:0),0),s1=K.reduce((a,k)=>a+o[k].shots,0)
check('feedback 7: enemies fire at least 80% fewer shots than before',s1<=s0*0.2,s0+' shots before, '+s1+' now')}
for(const t of [Q.P[0],...(O?O.P:[])])check('feedback 7: no JS errors in the enemy probe',!t.errs.length,t.errs.slice(0,2).join(' | '))
}finally{await Q.close();if(O)await O.close()}}
async function coop(){const R=await relay({}),{server,url}=await serve(),q='?relay='+encodeURIComponent(R.url),P=[]
try{for(let i=0;i<3;i++){const t=await open(url,{q,viewport:{width:1100,height:700}});await t.ev(BOT+';0');await t.ev(`SET.cl='${CLS[i]}';0`);P.push(t)}
await P[0].ev(`nconn(ncode(),1,'Host');0`);await until(async()=>(await P[0].ev('NET&&NET.me'))>0);const code=await P[0].ev('NET.code')
for(let i=1;i<3;i++){await P[i].ev(`nconn('${code}',0,'P${i+1}');0`);await sleep(150)}
const met=await until(async()=>{for(const t of P)if((await t.ev('NET&&NET.me?Object.keys(NET.peers).length:0'))!==2)return false;return true},10000)
check('feedback 12: three players form a party',met);if(!met)return
const me=await P[1].ev('NET.me');await P[1].page.keyboard.press('Escape');await sleep(200);await P[1].page.click('#rnm',{clickCount:3});await P[1].page.keyboard.type('Moss',{delay:20})
const seen=await until(async()=>(await P[0].ev(`NET.peers[${me}]&&NET.peers[${me}].nm`))==='Moss'&&(await P[2].ev(`NET.peers[${me}]&&NET.peers[${me}].nm`))==='Moss',5000)
check('feedback 12: a Hearth rename reaches the host and the other players',seen)
await P[0].ev('partyui();0');const lst=await P[0].page.evaluate(()=>document.querySelector('#box').innerText)
check('feedback 12: the host party list shows the new name',/Moss/.test(lst),lst.replace(/\s+/g,' ').slice(0,160))
await P[0].ev('hide();0');await P[1].ev('hide();0')
await P[2].ev(`nsend({k:'nm',nm:'<img src=x onerror=window.__x=1>'});0`);await sleep(600)
const inj=J(await P[0].ev(`(()=>{partyui();const h=document.querySelector('#box').innerHTML;hide();return JSON.stringify({nm:NET.peers[${await P[2].ev('NET.me')}].nm,img:/<img/i.test(h),x:!!window.__x})})()`))
check('feedback 12: a hostile name from a modded client is cleaned and never runs',!/[<>]/.test(inj.nm)&&!inj.img&&!inj.x,JSON.stringify(inj))
for(const t of P)await t.ev('hub.rdy=1;0')
const up=await until(async()=>{for(const t of P)if(!(await t.ev('!!(NET.inrun&&run&&!inhub)')))return false;return true},12000)
check('feedback 12: the party starts a run',up);if(!up)return
await sleep(500);await P[1].page.keyboard.press('Escape');await sleep(200);await P[1].page.click('#rnm',{clickCount:3});await P[1].page.keyboard.type('Fern',{delay:20})
const inrun=await until(async()=>{for(const t of P)if((await t.ev(`(PL.find(p=>p.id===${me})||{}).nm`))!=='Fern')return false;return true},5000)
check('feedback 12: a rename in a run updates every player list',inrun,JSON.stringify(await Promise.all(P.map(t=>t.ev(`(PL.find(p=>p.id===${me})||{}).nm`)))))
const pr=J(await P[0].ev(`(()=>{const pp=PL.find(p=>p.g&&p.g.cl==='priest'),al=PL.find(p=>p!==pp&&p.P),r=[];for(const k of[0,5]){al.P.x=pp.P.x+420;al.P.y=pp.P.y;withp(al,()=>{P.hp=S.mhp*0.5});const h0=al.P.hp;withp(pp,()=>{g.ab.reach=k;P.hp=S.mhp*0.5;P.hfat=0;heal(40)});r.push(Math.round(al.P.hp-h0))}withp(pp,()=>{delete g.ab.reach});return JSON.stringify(r)})()`))
check('feedback 3: a priest heal reaches an ally 420 px away only with Wide Grace',pr[0]===0&&pr[1]>0,JSON.stringify(pr))
await P[0].ev(`(()=>{const e=run.en.find(q=>!q.dead);if(e)hit(e,4);hpst()})();0`)
const ps=await until(async()=>{const r=J(await P[2].ev('JSON.stringify(PST)'));return r&&r.length===3&&r.some(q=>q.nm==='Fern')&&r.some(q=>q.cl==='wizard'&&q.dmg>0)},6000)
check('feedback 5: party stats reach every player during the run',ps,await P[2].ev('JSON.stringify(PST)'))
const pst0=await P[1].ev('JSON.stringify(PST)');await P[2].ev(`nsend({k:'pst',L:[{id:1,nm:'<b>x</b>',cl:'wizard',dmg:1e12}]});0`);await sleep(600)
const pst1=await P[1].ev('JSON.stringify(PST)')
check('feedback 5: a non-host player cannot fake party stats',pst1===pst0||!/<b>|1000000000000/.test(pst1),pst1)
await P[0].ev('fadeto(enterhub);0')
const sm=await until(async()=>{for(const t of P)if((await t.ev('ovk'))!=='sum')return false;return true},8000)
check('feedback 5: the whole party sees party stats when the run ends',sm,JSON.stringify(await Promise.all(P.map(t=>t.ev('ovk')))))
const tx=await P[2].page.evaluate(()=>document.querySelector('#box').innerText)
check('feedback 5: the end screen lists every party member',/Party stats/.test(tx)&&/Fern/.test(tx)&&/Host/.test(tx),tx.replace(/\s+/g,' ').slice(0,200))
const cc=J(await P[2].ev(`localStorage.getItem('emberdeep-career')`))
check('feedback 5: each player keeps their own career from a party run',!!cc&&cc.runs===1&&cc.party===1,JSON.stringify(cc))
for(const [i,t] of P.entries())check('feedback 12: no JS errors on player '+(i+1),!t.errs.length,t.errs.slice(0,2).join(' | '))
}finally{for(const t of P)try{await t.close()}catch(e){}server.close();R.close()}}
async function doors(){const Q=await pool(1),t=Q.P[0]
try{const s1=J(await t.ev(`(()=>{__go({cl:'knight',seed:4,tier:'afk',fl:3});__sim(0.4);const fl0=g.fl;run.en.length=0;spawner(0);const q=(run.portals||[run.portal])[0],o={open:!!run.portal};P.x=q.x;P.y=q.y;__sim(1);o.stay=g.fl===fl0&&!(fadeS&&!fadeS.done);const en=run.ent,a=en?Math.atan2(en.sy-q.y,en.sx-q.x):Math.PI;P.x=q.x+Math.cos(a)*150;P.y=q.y+Math.sin(a)*150;__sim(0.3);P.x=q.x;P.y=q.y;__sim(3);o.went=g.fl===fl0+1;__sim(1);run.en.length=0;spawner(0);const q2=(run.portals||[run.portal])[0];P.x=q2.x;P.y=q2.y;__sim(1);o.stay2=g.fl===fl0+1;__sim(1.5);o.dwell=g.fl===fl0+2;return JSON.stringify(o)})()`))
check('feedback 2: a door that opens under the player waits until they step into it',s1.open&&s1.stay&&s1.went,JSON.stringify(s1))
check('feedback 2: a player who stays on an open door goes through after a short wait instead of getting stuck',s1.stay2&&s1.dwell,JSON.stringify(s1))
const s2=J(await t.ev(`(()=>{__go({cl:'knight',seed:3,tier:'afk',fl:10});__sim(2);P.inv=999;const b=run.en.find(e=>e.boss),o={boss:!!b};if(!b)return JSON.stringify(o);for(let i=0;i<40&&!run.portal;i++){P.x=b.x;P.y=b.y;b.shield=0;b.hide=0;b.dspd=1;b.hfl=0;b.dsp=0;hit(b,1e9);if(!run.portal)__sim(0.25)}const q=run.portal;o.open=!!q;o.dw=typeof run.dw==='number';if(!q)return JSON.stringify(o);__sim(1);o.stay=!g.camp&&g.fl===10;P.x=q.x+160;P.y=q.y;__sim(0.3);P.x=q.x;P.y=q.y;__sim(2);o.went=!!g.camp||g.fl===11;return JSON.stringify(o)})()`))
check('feedback 2: the boss portal starts the door timer and waits for the player to step in',s2.boss&&s2.open&&s2.dw&&s2.stay&&s2.went,JSON.stringify(s2))
check('feedback 2: no JS errors in the solo door checks',!t.errs.length,t.errs.slice(0,3).join(' | '))}finally{await Q.close()}
const R=await relay({delay:60}),{server,url}=await serve(),q='?relay='+encodeURIComponent(R.url),P=[]
try{for(let i=0;i<3;i++){const t=await open(url,{q,viewport:{width:1000,height:640}});await t.ev(BOT+';0');await t.ev(`SET.cl='${CLS[i]}';0`);P.push(t)}
await P[0].ev(`nconn(ncode(),1,'Host');0`);await until(async()=>(await P[0].ev('NET&&NET.me'))>0);const code=await P[0].ev('NET.code')
for(let i=1;i<3;i++){await P[i].ev(`nconn('${code}',0,'P${i+1}');0`);await sleep(150)}
const met=await until(async()=>{for(const t of P)if((await t.ev('NET&&NET.me?Object.keys(NET.peers).length:0'))!==2)return false;return true},10000)
for(const t of P)await t.ev('hub.rdy=1;0')
const up=met&&await until(async()=>{for(const t of P)if(!(await t.ev('!!(NET.inrun&&run&&!inhub)')))return false;return true},15000)
check('feedback 2: a party of three starts a run at 120ms lag',up);if(!up)return
await sleep(1500)
const st=async()=>Promise.all(P.map(t=>t.ev(`JSON.stringify({fl:g&&g.fl,camp:g&&g.camp||0,P:P?[Math.round(P.x),Math.round(P.y)]:null,pend:g&&g.pend})`).then(J)))
const walk=async(done,ms)=>{const door=J(await P[2].ev(`JSON.stringify((run.portals||[run.portal])[0])`)),t0=Date.now(),o={pick:'',me:'',seen:0,went:0};await P[2].ev('hide();0')
for(;Date.now()-t0<ms;){const s=await st();if(done(s)){o.went=Date.now();break}await P[2].ev(`(()=>{const v=__dir(${door.x},${door.y}),l=Math.hypot(v[0],v[1])||1,x=v[0]/l,y=v[1]/l;key.w=y<-0.3;key.s=y>0.3;key.a=x<-0.3;key.d=x>0.3;0})()`)
if(!o.seen&&await P[0].ev('!!run.dh'))o.seen=Date.now()
const a=await P[0].ev('(document.getElementById("dwait")||{}).textContent||""'),b=await P[2].ev('dmsg()');if(/at the door/.test(a))o.pick=a;if(/at the door/.test(b))o.me=b;await sleep(100)}
await P[2].ev('key.w=key.s=key.a=key.d=false;0');o.wait=o.went&&o.seen?(o.went-o.seen)/1000:null;return o}
await P[0].ev(`(()=>{for(const e of run.en)e.dead=1;for(const p of PL)p.g.pend=p.id===PL[2].id?0:1;0})()`)
await until(async()=>!!(await P[2].ev('!!run.portal')),6000)
const w1=await walk(s=>s.every(x=>x.fl===2),45000)
check('feedback 2: a player still picking cards sees who is at the door and the countdown',/P3 is at the door/.test(w1.pick)&&/leaving in [0-9]+s/.test(w1.pick),w1.pick)
check('feedback 2: the player at the door sees who the party is waiting on',/You are at the door/.test(w1.me)&&/Host/.test(w1.me),w1.me)
check('feedback 2: the party leaves within 10s of a player reaching the door at 120ms lag',w1.went>0&&w1.wait!=null&&w1.wait<=13,JSON.stringify(w1))
await sleep(1500)
const s3=await st(),hp=J(await P[0].ev(`JSON.stringify(PL.map(p=>[p.id,Math.round(p.P.x),Math.round(p.P.y),inobs(p.P.x,p.P.y)]))`)),ids=await Promise.all(P.map(t=>t.ev('LOC.id')))
const off=s3.map((x,i)=>{const h=hp.find(r=>r[0]===ids[i]);return h&&x.P?Math.round(Math.hypot(h[1]-x.P[0],h[2]-x.P[1])):999})
check('feedback 2: every player lands on the next floor where the host has them, with picks resolved',s3.every(x=>x.fl===2&&x.pend===0)&&off.every(d=>d<=48)&&hp.every(r=>!r[3]),JSON.stringify({s3,off}))
await P[0].ev('(()=>{for(const p of PL)p.g.fl=9;for(const e of run.en)e.dead=1;0})()');await until(async()=>!!(await P[0].ev('!!run.portal')),6000);await P[0].ev('withp(LOC,descend);0')
await until(async()=>{for(const t of P)if((await t.ev('g&&g.fl'))!==10||(await t.ev('!!(fadeS&&!fadeS.done)')))return false;return true},15000);await sleep(1200)
await P[0].ev('fora(()=>{P.inv=999});withp(LOC,descend);0')
const fight=await until(async()=>{for(const t of P)if(!(await t.ev('!!(run&&!run.prep&&run.en.some(e=>e.boss))')))return false;return true},15000)
await P[0].ev(`(()=>{for(const p of PL)p.g.pend=p.id===PL[2].id?0:1;0})()`)
const down=fight&&await until(async()=>{await P[0].ev('(()=>{fora(()=>{P.inv=99});for(const e of run.en)if(e.boss&&!e.dead){e.shield=0;e.hide=0;e.dspd=1;e.hfl=0;e.dsp=0;hit(e,1e9)}0})()');return !!(await P[2].ev('!!run.portal'))},20000)
const w2=down?await walk(s=>s.every(x=>x.camp),45000):{}
check('feedback 2: after a boss the party is not stuck at the portal when someone is still picking',down&&w2.went>0&&w2.wait!=null&&w2.wait<=13,JSON.stringify({fight,down,w2}))
for(const [i,t] of P.entries())check('feedback 2: no JS errors on door player '+(i+1),!t.errs.length,t.errs.slice(0,2).join(' | '))
}finally{for(const t of P)try{await t.close()}catch(e){}server.close();R.close()}}
async function duels(){const Q=await pool(1),t=Q.P[0]
try{await t.ev(DUELBOT+';0')
const ru=J(await t.ev(`(()=>{__duel({cls:['knight','priest','wizard','rogue'],teams:[1,1,2,2],seed:5,tier:'afk'});const [a,b,c,d]=PL,px=id=>run.dp.find(e=>e.pv===id),o={fl:g.fl,boss:run.en.some(e=>e.boss&&!e.pv),np:run.dp.length,side:Math.sign(c.P.x-a.P.x)};const hp=()=>PL.map(p=>Math.round(p.P.hp));for(const p of PL){p.P.inv=0;p.P.ifr=0}const h0=hp();wps(a,()=>{hit(px(b.id),S.atk*6);hit(px(a.id),S.atk*6)});const h1=hp();wps(a,()=>hit(px(c.id),S.atk*6));const h2=hp();o.friendly=h1[0]===h0[0]&&h1[1]===h0[1];o.foe=h2[2]<h1[2];c.P.hp=1;d.P.hp=d.S.mhp*0.5;b.P.hp=b.S.mhp*0.5;const hd=d.P.hp,hb=b.P.hp;withp(b,()=>{const m=P;P.x=d.P.x-30;P.y=d.P.y;heal(40)});o.healfoe=Math.round(d.P.hp-hd);o.healown=Math.round(b.P.hp-hb);for(const p of PL)p.P.inv=0;wps(a,()=>{for(let i=0;i<40&&!c.down;i++){c.P.inv=0;c.P.ifr=0;hit(px(c.id),S.atk*8)}});o.cdown=c.down;a.P.x=c.P.x+20;a.P.y=c.P.y;__sim(4);o.foerev=c.down;d.P.x=c.P.x+20;d.P.y=c.P.y;a.P.x=c.P.x+400;__sim(4);o.teamrev=!c.down;o.errs=0;return JSON.stringify(o)})()`))
check('feedback 4: a duel builds an arena with no boss and sides facing each other',ru.fl%10===0&&!ru.boss&&ru.np===4&&ru.side===1,JSON.stringify(ru))
check('feedback 4: duel hits skip yourself and teammates and land on the other team',ru.friendly&&ru.foe,JSON.stringify(ru))
check('feedback 4: priest heals reach teammates only in a duel',ru.healown>0&&ru.healfoe===0,JSON.stringify(ru))
check('feedback 4: only a teammate can revive a downed duelist',ru.cdown===1&&ru.foerev===1&&ru.teamrev,JSON.stringify(ru))
const af=[];for(const cl of CLS){const r=await duel(t,{cls:[cl,cl],teams:[1,2],seed:11,tiers:['afk','mid']},200);af.push(cl+':'+r.w)}
check('feedback 4: a fully AFK duelist loses to a playing one in every class',af.every(x=>x.endsWith(':2')),af.join(' '))
const st=await duel(t,{cls:['knight','wizard'],teams:[1,2],seed:3,tiers:['stand','stand']},220)
check('feedback 4: a duel where nobody fights still ends',st.w!=null&&st.t<=(await t.ev('DCAP'))+2,JSON.stringify(st))
check('feedback 4: no JS errors in local duels',!t.errs.length,t.errs.slice(0,3).join(' | '))}finally{await Q.close()}
const R=await relay({delay:60}),{server,url}=await serve(),q='?relay='+encodeURIComponent(R.url),P=[]
try{for(let i=0;i<2;i++){const t=await open(url,{q,viewport:{width:1000,height:640}});await t.ev(BOT+';0');await t.ev(`SET.cl='${['knight','wizard'][i]}';0`);P.push(t)}
await P[0].ev(`nconn(ncode(),1,'Host');0`);await until(async()=>(await P[0].ev('NET&&NET.me'))>0);const code=await P[0].ev('NET.code')
await P[1].ev(`nconn('${code}',0,'Moss');0`);const met=await until(async()=>{for(const t of P)if((await t.ev('NET&&NET.me?Object.keys(NET.peers).length:0'))!==1)return false;return true},10000)
check('feedback 4: two players form a party for a duel',met);if(!met)return
await P[0].ev('partyui();0');await P[0].page.click('[data-go=pduel]');await sleep(300)
const hb=await P[0].page.evaluate(()=>document.querySelector('#box').innerText)
const seen=await until(async()=>!!(await P[1].ev('!!(NET.du&&NET.du.on)')),4000);await P[1].ev('partyui();0');const cb=await P[1].page.evaluate(()=>document.querySelector('#box').innerText)
check('feedback 4: the host turns on a duel and the other player sees the teams',/Duel on/.test(hb)&&/team 2/.test(hb)&&seen&&/Duel:/.test(cb)&&/team 1/.test(cb),hb.replace(/\s+/g,' ').slice(0,200)+' || '+cb.replace(/\s+/g,' ').slice(0,200))
for(const t of P)await t.ev('hide();hub.rdy=1;0')
const up=await until(async()=>{for(const t of P)if(!(await t.ev('!!(NET.inrun&&run&&!inhub&&run.duel)')))return false;return true},15000)
check('feedback 4: readying up starts the duel for both players',up);if(!up)return
await sleep(1200)
const cv=J(await P[1].ev('JSON.stringify({pv:run.en.some(e=>e.pv),du:DU,fl:g.fl})')),hv=J(await P[0].ev('JSON.stringify({np:run.dp.length,du:DU})'))
check('feedback 4: the host runs the duel and the hidden targets never reach the client',hv.np===2&&!cv.pv&&JSON.stringify(cv.du)===JSON.stringify(hv.du),JSON.stringify({cv,hv}))
const mid=await P[1].ev('NET.me'),h0=await P[1].ev('Math.round(P.hp)')
await P[0].ev(`(()=>{const a=PL.find(p=>p.loc),e=run.dp.find(x=>x.pv===${mid});const v=PL.find(p=>p.id===${mid});v.P.inv=0;v.P.ifr=0;wps(a,()=>hit(e,S.atk*4));0})()`)
const hit1=await until(async()=>(await P[1].ev('Math.round(P.hp)'))<h0,4000)
check('feedback 4: a duel hit from the host lowers the other player health on their screen',hit1)
await P[0].ev(`(()=>{const a=PL.find(p=>p.loc),e=run.dp.find(x=>x.pv===${mid}),v=PL.find(p=>p.id===${mid});wps(a,()=>{for(let i=0;i<60&&!v.down;i++){v.P.inv=0;v.P.ifr=0;hit(e,S.atk*8)}});0})()`)
const won=await until(async()=>/Host wins/.test(await P[1].ev('banner?banner.t:""')),5000)
check('feedback 4: the winner is announced to every player',won,await P[1].ev('banner?banner.t:""'))
const back=await until(async()=>{for(const t of P)if((await t.ev('ovk'))!=='sum')return false;return true},12000)
const tx=back?await P[1].page.evaluate(()=>document.querySelector('#box').innerText):''
check('feedback 4: both players return to the Hearth with the duel result and party stats',back&&/Host wins/.test(tx)&&/Moss/.test(tx),tx.replace(/\s+/g,' ').slice(0,200))
const cc=J(await P[1].ev(`localStorage.getItem('emberdeep-career')||'null'`))
check('feedback 4: a duel does not count as a run in career stats',!cc||!cc.runs,JSON.stringify(cc))
for(const [i,t] of P.entries())check('feedback 4: no JS errors on duel player '+(i+1),!t.errs.length,t.errs.slice(0,2).join(' | '))
}finally{for(const t of P)try{await t.close()}catch(e){}server.close();R.close()}}
async function feel(){const Q=await pool(1),t=Q.P[0]
try{await t.ev('au();0');await until(async()=>J(await t.ev('JSON.stringify(!!(SB&&ac))')),15000);const o=J(await t.ev(`(()=>{const sf0=sfx;__go({cl:'knight',seed:3,tier:'afk',fl:2});sfx=sf0;__sim(0.5);run.en.length=0;run.spawned=1e9;run.tele=[];run.shots=[];P.inv=999;const L=[],sm0=smp;smp=(n,v,q)=>{L.push([n,v,q&&q.pri||0,0,q&&q.r||1]);return sm0(n,v,q)};const o={},clr=()=>{for(const q in sl)delete sl[q]},mob=(dx,dy,hp)=>{const e=mkmob('grub',P.x+dx,P.y+dy);e.hp=e.mhp=hp;e.wake=0;e.spd=0;run.en.push(e);return e};const e=mob(80,0,1e9),x0=e.x,y0=e.y,n0=pt.length;hit(e,1);o.jolt=[e.jh>0,Math.round(e.jx*10)/10,Math.round(e.jy*10)/10,e.x-x0,e.y-y0];const sp=pt.slice(n0);o.sp=sp.length;o.cone=sp.filter(q=>Math.cos(Math.atan2(q.vy,q.vx))>0.8).length;run.en.length=0;run.combo=0;run.combot=0;run.mkt=[];const kr=()=>{clr();const n=L.length;const m=mob(60,0,1);hit(m,1e6);__sim(0.6);const q=L.slice(n).filter(q=>q[0]==='thuds');return q.length?[Math.round((q[0][4]||1)*1000)/1000,q[0][1]]:null};const r=[];for(let i=0;i<6;i++)r.push(kr());run.combot=0.01;__sim(0.2);o.reset=kr();o.r=r;run.en.length=0;run.mkt=[];tx.length=0;const n1=L.length;for(let i=0;i<2;i++){clr();hit(mob(60+i*10,0,1),1e6)}o.two=tx.some(q=>Object.values(q).includes('TRIPLE'));__sim(0.6);run.mkt=[];const sx=P.x+60,sy=P.y-100,g0=flc.getContext('2d').getImageData(sx-3,sy-3,6,6).data.join();for(let i=0;i<3;i++){clr();hit(mob(60,-100,1),1e6)}o.three=tx.some(q=>Object.values(q).includes('TRIPLE'));o.bell=L.slice(n1).some(q=>q[0]==='bell');o.dcn=run.dcn;const g1=flc.getContext('2d').getImageData(sx-3,sy-3,6,6).data.join();__sim(5);const g2=flc.getContext('2d').getImageData(sx-3,sy-3,6,6).data.join();o.dec=[g0!==g1,g1===g2];run.en.length=0;g.fl++;startfloor();o.dcn2=run.dcn||0;P.lt=run.t;P.la=0;drawp(performance.now());o.lk=Math.round(P.lx*10)/10;P.lt=run.t-1;drawp(performance.now());o.lk0=Math.round(P.lx*10)/10;const T=[],tr=cx.translate;cx.translate=function(x,y){T.push(x);return tr.call(cx,x,y)};const rec=cl=>{T.length=0;cx.save();drawweapon(cl,0,0,39,0,0.5,'#fff',performance.now(),0);cx.restore();return Math.round(T[1]*10)/10};o.rc={bow:rec('bow'),wizard:rec('wizard')};cx.translate=tr;smp=sm0;return JSON.stringify(o)})()`))
check('feel: a hit jolts the enemy away from the player without moving its hitbox',o.jolt[0]&&o.jolt[1]>=4&&Math.abs(o.jolt[2])<0.5&&o.jolt[3]===0&&o.jolt[4]===0,JSON.stringify(o.jolt))
check('feel: hit sparks spray along the attack direction',o.sp>=3&&o.cone===o.sp,o.cone+' of '+o.sp)
const rr=o.r.map(x=>x&&x[0]),vv=o.r.map(x=>x&&x[1])
check('feel: kill pitch rises through a combo without getting louder',rr.every(x=>x)&&rr.every((x,i)=>!i||x>rr[i-1])&&Math.max(...vv)-Math.min(...vv)<1e-6,JSON.stringify(o.r))
check('feel: kill pitch resets when the combo ends',o.reset&&o.reset[0]===rr[0],JSON.stringify(o.reset))
check('feel: three kills within half a second get a callout and a sound, two do not',o.three&&o.bell&&!o.two,JSON.stringify({two:o.two,three:o.three,bell:o.bell}))
check('feel: kills leave marks on the floor that stay and clear on the next floor',o.dec[0]&&o.dec[1]&&o.dcn>=3&&o.dcn2===0,JSON.stringify({dec:o.dec,dcn:o.dcn,dcn2:o.dcn2}))
check('feel: the knight lunges into a swing and settles after',o.lk>=5&&o.lk0===0,o.lk+' then '+o.lk0)
check('feel: bows recoil harder than other weapons',o.rc.bow<=o.rc.wizard*2.5,JSON.stringify(o.rc))
check('feel: no JS errors',!t.errs.length,t.errs.slice(0,3).join(' | '))}finally{await Q.close()}}
export async function run(only){const L={solo,density,minis,coop,doors,duels,feel};for(const k in L)if(!only||!only.length||only.includes(k))await L[k]()}
if(process.argv[1]&&process.argv[1].replace(/\\/g,'/').endsWith('tests/feedback.mjs')){const k=setTimeout(()=>{console.log('FAIL feedback suite timed out');process.exit(3)},600000);k.unref();try{await run(process.argv.slice(2))}catch(e){check('feedback suite ran',false,String(e&&e.stack||e).slice(0,400))}await closeall();done();process.exit(process.exitCode||0)}
