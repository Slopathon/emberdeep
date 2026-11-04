import {serve,open,closeall,check,done,sleep,baseline} from './lib.mjs'
import {BOT,PARTY} from './bot.mjs'
import {BUILD} from './afk.mjs'
const MEASURE=`const F0=window.__F0||(window.__F0=frame);window.__ft=[];frame=function(n){const a=performance.now();F0(n);window.__ft.push(performance.now()-a)};0`,LOOP=`window.__bl&&clearInterval(window.__bl);window.__bl=setInterval(()=>{try{if(run&&!inhub&&g){__bot(1/30);if(typeof PL!=='undefined'&&PL&&PL.length>1)for(const p of PL)if(!p.loc&&!p.gone&&p.P)withp(p,()=>__bot(1/30))}}catch(e){}},33);0`
const stat=a=>{const s=a.slice().sort((x,y)=>x-y);return{avg:s.reduce((x,y)=>x+y,0)/Math.max(1,s.length),p95:s[Math.floor(s.length*0.95)]||0,n:s.length}}
async function measure(url,setup,secs=8){const t=await open(url,{viewport:{width:1280,height:800}});await t.ev(BOT+PARTY+';0');await t.ev(setup);await t.ev(LOOP);await sleep(1500);await t.ev(MEASURE);await sleep(secs*1000);const ft=await t.ev('JSON.stringify(window.__ft)');await t.close();return stat(JSON.parse(ft))}
export async function run(){const {server,url}=await serve(),bf=baseline(),res={}
const solo="leavehub();hide();newgame('wizard');g.fl=12;g.lv=12;g.wep.atk=60;recalc();startfloor();__b.god=1;0"
res.solo=await measure(url,solo);if(bf){const b=await serve(0,bf);res.base=await measure(b.url,solo);b.server.close()}
res.party=await measure(url,"leavehub();hide();newgame('knight');__mkparty(['wizard','bow','rogue','priest']);for(const p of PL)withp(p,()=>{g.lv=12;g.wep.atk=60;recalc()});g.fl=12;startfloor();__b.god=1;0")
res.boss=await measure(url,"leavehub();hide();newgame('knight');__mkparty(['wizard','bow','rogue','priest']);for(const p of PL)withp(p,()=>{g.lv=40;g.wep.atk=400;g.arm.hp=20000;recalc()});g.fl=50;startfloor();__b.god=1;0")
const f=x=>x.avg.toFixed(2)+'ms avg, '+x.p95.toFixed(2)+'ms p95'
console.log('info, JS frame cost: solo '+f(res.solo)+(res.base?'; solo before this work '+f(res.base):'')+'; host with 5 players in a room '+f(res.party)+'; host with 5 players at the Hollow King '+f(res.boss))
check('perf: host frame with 5 players stays under 6ms on average',res.party.avg<6&&res.boss.avg<6,f(res.party)+' / '+f(res.boss))
check('perf: solo frame cost close to before',!res.base||res.solo.avg<res.base.avg*1.6+0.6,f(res.solo)+(res.base?' vs '+f(res.base):''))
const t=await open(url);await t.ev(BOT+PARTY+';0');const solo2={},SN={};for(const c of ['wizard','bow','rogue','priest','knight']){const r=JSON.parse(await t.ev(`(()=>{leavehub();hide();newgame('${c}');g.fl=25;${BUILD(25)}();(window.__gs||(window.__gs={}))['${c}']=JSON.stringify(g);startfloor();__b.god=1;__b.mode='fight';__b.stats.cl={};__b.stats.n={};__sim(70);return JSON.stringify([__b.stats.cl,__b.stats.n])})()`));solo2[c]=r[0][c]||0;SN[c]=(r[1][c]||0)/70}
const pr=JSON.parse(await t.ev(`(()=>{leavehub();hide();newgame('knight');__mkparty(['wizard','bow','rogue','priest']);for(const p of PL){p.g=JSON.parse(__gs[p.cl]);p.g.seed=PL[0].g.seed}LOC.g=PL[0].g;g=LOC.g;g.fl=25;startfloor();__b.god=1;__b.mode='fight';__b.stats.cl={};__b.stats.n={};__sim(70);return JSON.stringify([__b.stats.cl,__b.stats.n])})()`)),pn={};for(const c in pr[1])pn[c]=pr[1][c]/70;const prc=pr[0]
const sn=SN,r1=o=>JSON.stringify(Object.fromEntries(Object.entries(o).map(([k,v])=>[k,Math.round(v*10)/10])));console.log('info, peak player projectiles on screen at floor 25 (bot, built characters): solo '+JSON.stringify(solo2)+'; full party '+JSON.stringify(prc)+'. Projectiles fired per second: solo '+r1(sn)+'; full party '+r1(pn))
check('perf: no class fires projectiles faster in a full party than solo',Object.keys(sn).every(c=>(pn[c]||0)<=sn[c]*1.15+0.3),'solo '+r1(sn)+' party '+r1(pn));await t.close()
await closeall();server.close();return res}
if(import.meta.url===`file://${process.argv[1]}`)run().then(done)
