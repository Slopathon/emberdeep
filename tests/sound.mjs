import fs from 'node:fs'
import path from 'node:path'
import {serve,open,closeall,check,sleep,root} from './lib.mjs'
import {BOT} from './bot.mjs'
const J=s=>JSON.parse(s)
const SPY=`(()=>{if(window.__sp)return;window.__sp={n:[],o:smp};smp=(n,v,o)=>{__sp.n.push([n,o&&o.p||0]);return __sp.o(n,v,o)}})();`
export async function run(){const {server,url}=await serve(),t=await open(url);await t.ev(BOT+';0')
const src=fs.readFileSync(path.join(root,'index.html'),'utf8'),lit=[...new Set([...src.matchAll(/sfx\('([a-z0-9_.]+)'[,)]/g)].map(m=>m[1]))]
await t.ev('au();0');let ld=false;for(let i=0;i<150&&!ld;i++){await sleep(100);ld=J(await t.ev('JSON.stringify(!!(SB&&SA))'))}
check('sound: both sprites load and decode',ld)
const m=J(await t.ev(`(()=>{const r={sb:SB.duration,sa:SA.duration,o1:SBo,o2:SAo,bad:[],n:0};for(const[T,B,o]of[[SM,SB,SBo],[AM,SA,SAo]])for(const k in T)for(let i=0;i<T[k].length;i+=2){r.n++;if(T[k][i]/1000+o<0||(T[k][i]+T[k][i+1])/1000+o>B.duration+0.01)r.bad.push(k)}return JSON.stringify(r)})()`))
check('sound: every clip sits inside its sprite',m.n>200&&!m.bad.length,m.n+' clips in '+m.sb.toFixed(1)+'s and '+m.sa.toFixed(1)+'s'+(m.bad.length?' bad '+m.bad.join(','):''))
check('sound: the sync marker lines up within 5ms',Math.abs(m.o1)<0.005&&Math.abs(m.o2)<0.005,(m.o1*1000).toFixed(2)+'ms, '+(m.o2*1000).toFixed(2)+'ms')
const keys=J(await t.ev(`(()=>{leavehub();hide();newgame('wizard');__b.mode='afk';const L=${JSON.stringify(lit)},E=['grub','rat','archer','warlock','slime','bomber','lancer','brute','charger','shaman','wisp','leaper','spire','herald','egg'],B=['burrow','burrow3','tp','spit','eggs','wave','wave2','trident','geyser','whirlpool','spiral','wall','breath','breath2','spikes','shards','icefall','charge','charge3','hammer','tiles','pools','beams','beams4','rose','rose3','shotgun','shotgun2','bramble','bramble5','vines','roots','orbit','stars','stars2','homing','meteor','prophecy','pent','pent2','bwall','bwall2','bwalls','ringgap','bones','slam','grid','grid2','timestop','gear','hands','halt','move','beat','inferno','inferno2','cinders','solar','flare','flare6','nova','phase','die','hit','hitb'];const K=[...L,...E.map(e=>e+'.hit'),...[0,1,2,3,4,5,6,7,8,9].flatMap(z=>B.map(b=>'b'+z+'.'+b)),...Object.values(AN).map(a=>'an_'+a.k)];return JSON.stringify(K)})()`)),dies=['grub','rat','archer','warlock','slime','bomber','lancer','brute','charger','shaman','wisp','leaper','spire','herald'].map(e=>e+'.die')
const r=J(await t.ev(`(()=>{${SPY}const K=${JSON.stringify(keys)},miss=new Set(),quiet=[];let max=0;for(const k of K){for(const q in sl)delete sl[q];const n0=__sp.n.length;sfx(k,P.x+200,P.y);for(const[n]of __sp.n.slice(n0))if(!SM[n])miss.add(n);if(__sp.n.length===n0)quiet.push(k);max=Math.max(max,SV.length)}return JSON.stringify({miss:[...miss],quiet,max,n:K.length})})()`))
check('sound: every recipe only plays clips that exist',!r.miss.length,r.miss.join(',')||r.n+' keys')
check('sound: every sound key in the game plays samples',!r.quiet.length,r.quiet.slice(0,12).join(',')||lit.length+' literal keys')
check('sound: the voice cap holds',r.max<=26,r.max+' voices at most')
const bv=J(await t.ev(`(()=>{const o={};for(const z of[0,3,4,9]){for(const q in sl)delete sl[q];const n0=__sp.n.length;sfx('b'+z+'.atk',P.x,P.y);const a=__sp.n.slice(n0).map(x=>x[0]);for(const q in sl)delete sl[q];const n1=__sp.n.length;sfx('b'+z+'.meteor',P.x,P.y);o[z]={atk:a,big:__sp.n.slice(n1).map(x=>x[0])}}return JSON.stringify(o)})()`))
check('sound: each boss has its own voice and big attacks add layers',new Set([0,3,4,9].map(z=>bv[z].atk[0])).size===4&&[0,3,4,9].every(z=>bv[z].big.length>bv[z].atk.length),JSON.stringify(bv))
const sw=J(await t.ev(`(()=>{const s=[],o=__sp.o;smp=(n,v,q)=>{if(n==='swing'&&q)s.push(+(q.r||1).toFixed(2));return o(n,v,q)};for(let i=0;i<60;i++){for(const q in sl)delete sl[q];sfx('swing')}const vs=new Set();for(let i=0;i<60;i++){vs.add(SLV.swing);smp('swing',0)}smp=(n,v,q)=>{__sp.n.push([n,q&&q.p||0]);return o(n,v,q)};return JSON.stringify({r:[...new Set(s)].sort(),v:vs.size})})()`))
check('sound: sword swings use 3 pitches and 3 samples',sw.r.length===3&&sw.v===3,JSON.stringify(sw))
const pan=J(await t.ev(`(()=>{for(const q in sl)delete sl[q];const n0=__sp.n.length;cev(['s','kill',0,cam.x+400,cam.y]);const a=__sp.n.slice(n0);for(const q in sl)delete sl[q];const n1=__sp.n.length;cev(['s','kill',0,cam.x-400,cam.y]);const b=__sp.n.slice(n1);return JSON.stringify({r:a[0]&&a[0][1],l:b[0]&&b[0][1]})})()`))
check('sound: a party sound pans toward where it happened',pan.r>0.1&&pan.l<-0.1,JSON.stringify(pan))
const am=J(await t.ev(`(()=>{const r={};ambtick(0.02);r.z0=AMB.k;r.n0=AMB.L.length;g.fl=55;ambtick(0.02);r.z5=AMB.k;g.fl=85;ambtick(0.02);r.z8=AMB.k;r.n8=AMB.L.length;AMB.t=0;const n0=__sp.n.length;ambtick(0.02);r.os=__sp.n.slice(n0).map(x=>x[0]);leavehub();hide();enterhub();ambtick(0.02);r.h=AMB.k;r.nh=AMB.L.length;mute=true;ambtick(0.02);r.mv=AMB.v;mute=false;ambtick(0.02);r.uv=AMB.v;return JSON.stringify(r)})()`))
check('sound: ambience follows the zone and the Hearth',am.z0==='z0'&&am.n0>0&&am.z5==='z5'&&am.z8==='z8'&&am.n8>0&&am.os.length===1&&am.h==='h'&&am.nh===2,JSON.stringify(am))
check('sound: mute silences the ambience',am.mv===0&&am.uv>0)
const ui=J(await t.ev(`(()=>{hubset();const e=document.querySelector('#amr');if(!e)return JSON.stringify(0);e.value=25;e.dispatchEvent(new Event('input',{bubbles:true}));const r={v:SET.amb,t:document.querySelector('#amv').textContent};SET.amb=60;hide();return JSON.stringify(r)})()`))
check('sound: the Ambience slider sets its volume',ui&&ui.v===25&&ui.t==='25',JSON.stringify(ui))
const mu=J(await t.ev(`(()=>{mute=true;const n0=SV.length;for(const q in sl)delete sl[q];sfx('boomb');const r=SV.length;mute=false;return JSON.stringify(r<=n0)})()`))
check('sound: nothing plays while muted',mu)
const fb=J(await t.ev(`(()=>{const b=SB;SB=null;let e='';try{for(const k of ${JSON.stringify([...keys,...dies])}){for(const q in sl)delete sl[q];sfx(k,100,100)}}catch(x){e=String(x)}SB=b;return JSON.stringify(e)})()`))
check('sound: the synth fallback runs every key before the sprite loads',fb==='',fb)
await sleep(300);check('sound: no JS errors',!t.errs.length,t.errs.slice(0,3).join(' | '))
await t.close();await closeall();server.close()}
if(import.meta.url===`file://${process.argv[1]}`)run().then(()=>import('./lib.mjs').then(l=>l.done()))
