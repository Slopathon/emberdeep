import {serve,open,closeall,check} from './lib.mjs'
import {BOT} from './bot.mjs'
const J=s=>JSON.parse(s)
const CASE=(cl,id,off,sec)=>`(()=>{leavehub();hide();window.__bot=()=>{};tdstart('${cl}');__sim(0.05);${id?`g.its[ITM['${id}'].sl]='${id}';itsync();`:''}P.gd=2;autofire=true;mouse.down=false;const e=run.en.find(q=>!q.dead&&q.tp!=='move'&&q.tp!=='brawl');run.en=[e];run.obs=[];run.rm=null;run.mk=null;buildobs();e.x=e.hx=WW/2+680;e.y=e.hy=WH/2;P.x=e.x-(wrng()+e.r+(${off}));P.y=e.y;run.tdl=[];let n=0;const c0=clatk;clatk=m=>{n++;return c0(m)};const rg=wrng(),want=Math.hypot(P.x-e.x,P.y-e.y);__sim(${sec});clatk=c0;let dmg=0;for(const q of run.tdl)dmg+=q[1];autofire=false;return JSON.stringify({rg,n,dmg,want:Math.round(want),dist:Math.round(Math.hypot(P.x-e.x,P.y-e.y)),en:run.en.length})})()`
export async function run(){const {server,url}=await serve(),t=await open(url);await t.ev(BOT+';0')
const W=J(await t.ev(`JSON.stringify(Object.keys(ITM).filter(k=>ITM[k].sl==='w').map(k=>[ITM[k].cl,k]))`))
check('autorange: all 25 weapons state a range',W.length===25&&J(await t.ev(`JSON.stringify(Object.values(ITM).filter(q=>q.sl==='w').every(q=>q.rg))`)),W.length+' weapons')
const L=[...['wizard','bow','rogue','priest','knight'].map(c=>[c,'']),...W],badin=[],badout=[],rows=[]
for(const [cl,id] of L){const a=J(await t.ev(CASE(cl,id,-8,5)));if(!(a.n>0&&a.dmg>0&&Math.abs(a.want-a.dist)<3))badin.push((id||cl)+':'+JSON.stringify(a));const b=J(await t.ev(CASE(cl,id,40,1.5)));if(b.n!==0||Math.abs(b.want-b.dist)>=3)badout.push((id||cl)+':'+JSON.stringify(b));rows.push((id||cl)+'='+a.rg)}
check('autorange: every weapon fires and lands a hit just inside its range',!badin.length,badin.slice(0,6).join(' ')||rows.join(' '))
check('autorange: every weapon holds fire just outside its range',!badout.length,badout.slice(0,6).join(' ')||L.length+' checked')
const sc=J(await t.ev(`(()=>{leavehub();hide();window.__bot=()=>{};tdstart('bow');__sim(0.05);const e=run.en.find(q=>!q.dead&&q.tp!=='move'&&q.tp!=='brawl');run.en=[e];run.obs=[];run.rm=null;run.mk=null;buildobs();e.x=e.hx=WW/2+680;e.y=e.hy=WH/2;P.x=e.x-800;P.y=e.y;autofire=true;const on=(()=>{__sim(0.2);return !!run.tgt})();autofire=false;__sim(0.1);const off=!!run.tgt;return JSON.stringify({on,off})})()`))
check('autorange: a bow can target past the old 680 limit',sc.on&&!sc.off,JSON.stringify(sc))
check('autorange: no JS errors',!t.errs.length,t.errs.slice(0,3).join(' | '))
await t.close();await closeall();server.close()}
if(import.meta.url===`file://${process.argv[1]}`)run().then(()=>import('./lib.mjs').then(l=>l.done()))
