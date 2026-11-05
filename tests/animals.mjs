import {serve,open,closeall,check,sleep} from './lib.mjs'
import {BOT,PARTY} from './bot.mjs'
const J=s=>JSON.parse(s)
const SETUP=sp=>`leavehub();hide();cos().an='${sp}';newgame('wizard');__b.mode='afk';run.en.length=0;run.waves=0;run.pending=0;run.shots.length=0;P.inv=0;P.ifr=0;const A=AN['${sp}'],E={st:{}},r={};`
const CORE=`animal();r.acd=P.acd;r.on=has(A.k);r.anf=P.anf;P.acd-=1;animal();r.acd2=P.acd;`
const AFTER=`__sim(A.t+0.3);r.off=!has(A.k);r.anf2=P.anf;r.acd3=P.acd;return JSON.stringify(r)`
const SP={
cat:`P.hp=10;${CORE}P.inv=0;P.ifr=0;hurt(1e6);r.x=P.hp;r.dead=!!g.dead;`,
lion:`r.m0=clm(E,{});${CORE}r.m1=clm(E,{});`,
bear:`P.hp=S.mhp;const q=Math.round(S.mhp*0.3);let h=P.hp;hurt(q);r.d0=h-P.hp;P.hp=S.mhp*0.5;${CORE}P.inv=0;P.ifr=0;h=P.hp;hurt(q);r.d1=h-P.hp;P.hp=S.mhp*0.5;h=P.hp;__sim(1);r.heal=(P.hp-h)/S.mhp;`,
rabbit:`r.v0=clspeed();P.dch=0;${CORE}r.v1=clspeed();__sim(0.05);r.dch=P.dch===S.dmax;`,
fox:`r.m0=clm(E,{});${CORE}r.vpt=!!P.vpt;r.tick=clm(E,{tick:true});r.m1=clm(E,{});r.used=!has('vanish');`,
wolf:`r.f0=clfr();${CORE}r.f1=clfr();`,
owl:`const sh=()=>{const s={x:P.x+120,y:P.y,vx:300,vy:0,r:6,dmg:1,life:5,c:'#f00',sc:1};run.shots.push(s);return s};let s=sh(),x=s.x;__sim(0.25);r.n0=s.dead?-1:s.x-x;run.shots.length=0;${CORE}s=sh();x=s.x;__sim(0.25);r.n1=s.dead?-1:s.x-x;run.shots.length=0;`,
turtle:`${CORE}const h=P.hp;P.inv=0;P.ifr=0;hurt(500);r.hit=h-P.hp;r.v=clspeed();P.dch=1;dodge();r.ended=!has('shell');`}
export async function run(){const {server,url}=await serve(),t=await open(url);await t.ev(BOT+';'+PARTY+';0')
const R={};for(const sp in SP)R[sp]=J(await t.ev(`(()=>{${SETUP(sp)}${SP[sp]}${AFTER}})()`))
const ok=(sp,k)=>{const q=R[sp],A={cat:45,lion:30,bear:40,rabbit:30,fox:30,wolf:35,owl:40,turtle:30}[sp];return q.acd===A&&q.on&&q.acd2===A-1&&q.off&&q.anf2===0&&q.acd3<A-1-(k||0)}
check('animals: every power starts, holds its cooldown, and wears off',Object.keys(SP).every(sp=>ok(sp)),Object.keys(SP).filter(sp=>!ok(sp)).map(sp=>sp+':'+JSON.stringify(R[sp])).join(' ')||'8 animals')
check('animals: cat Nine Lives keeps you at 1 health',R.cat.x===1&&!R.cat.dead,JSON.stringify({hp:R.cat.x,dead:R.cat.dead}))
check('animals: lion Rage adds 50% damage',Math.abs(R.lion.m1-R.lion.m0-0.5)<1e-9,R.lion.m0+' to '+R.lion.m1)
check('animals: bear Thick Hide takes 40% of the hit and heals',R.bear.d1/R.bear.d0>0.33&&R.bear.d1/R.bear.d0<0.47&&R.bear.heal>0.03,JSON.stringify({d0:R.bear.d0,d1:R.bear.d1,heal1s:Math.round(R.bear.heal*1000)/1000}))
check('animals: rabbit Zoomies is 50% faster and refills dashes',Math.abs(R.rabbit.v1-R.rabbit.v0-0.5)<1e-9&&R.rabbit.dch,R.rabbit.v0+' to '+R.rabbit.v1)
check('animals: fox Vanish triples the next hit and ends on it',R.fox.vpt&&R.fox.tick===R.fox.m0&&Math.abs(R.fox.m1-R.fox.m0-2)<1e-9&&R.fox.used,JSON.stringify({m0:R.fox.m0,dot:R.fox.tick,hit:R.fox.m1,ended:R.fox.used}))
check('animals: wolf Howl attacks 30% faster',Math.abs(R.wolf.f1-R.wolf.f0-0.3)<1e-9,R.wolf.f0+' to '+R.wolf.f1)
check('animals: owl Night Watch halves foe shot speed',R.owl.n0>0&&R.owl.n1>0&&Math.abs(R.owl.n1/R.owl.n0-0.5)<0.05,R.owl.n0.toFixed(1)+'px to '+R.owl.n1.toFixed(1)+'px in 0.25s')
check('animals: turtle Shell blocks hits, roots you, and a dash ends it',R.turtle.hit===0&&R.turtle.v===0&&R.turtle.ended,JSON.stringify({hit:R.turtle.hit,speed:R.turtle.v,ended:R.turtle.ended}))
const key=J(await t.ev(`(()=>{${SETUP('lion')}return JSON.stringify(0)})()`));await t.page.keyboard.press('r');await sleep(80)
check('animals: the R key fires the power',key===0&&J(await t.ev(`JSON.stringify(has('rage')&&P.acd>29)`)))
const co=J(await t.ev(`(()=>{leavehub();hide();cos().an='wolf';newgame('wizard');__mkparty(['wizard','bow','rogue']);__b.mode='afk';run.en.length=0;run.waves=0;run.pending=0;const L=PL[0].P;PL[1].P.x=L.x+80;PL[1].P.y=L.y;PL[2].P.x=L.x+1500;PL[2].P.y=L.y;PL[3].P.x=L.x;PL[3].P.y=L.y+60;animal();const r={near:!!(PL[1].R.bf&&PL[1].R.bf.howl&&PL[1].R.bf.howl.t>0),far:!!(PL[2].R.bf&&PL[2].R.bf.howl&&PL[2].R.bf.howl.t>0)};PL[1].cos={...CDEF,an:'turtle'};PL[1].A.push(['an']);PL[3].cos={...CDEF,an:'fox'};PL[3].A.push(['an']);__sim(0.05);r.shell=PL[1].P.anf==='shell'&&PL[1].P.acd>29;r.fox=PL[3].P.anf==='vanish';const e={x:PL[3].P.x+20,y:PL[3].P.y,tgn:0};r.tgt=ptg(e).id;r.fid=PL[3].id;return JSON.stringify(r)})()`))
check('animals: Howl reaches allies close by and not far ones',co.near&&!co.far,JSON.stringify({near:co.near,far:co.far}))
check('animals: a co-op ally power runs on the host from its action',co.shell)
check('animals: foes look past a vanished fox in co-op',co.fox&&co.tgt!==co.fid,'target '+co.tgt+', fox '+co.fid)
const ui=J(await t.ev(`(()=>{leavehub();hide();enterhub();SET.cos={fur:2,eye:0,head:'class',back:'none',acc:0,trail:'none'};const old=cos().an;wardui();const n=document.querySelectorAll('[data-cos^="an:"]').length;document.querySelector('[data-cos="an:lion"]').click();const w=document.querySelector('.wab').textContent;const r={old,n,an:cos().an,fur:cos().fur,w};document.querySelector('[data-cos="an:cat"]').click();hide();return JSON.stringify(r)})()`))
check('animals: an old save without an animal loads as a cat',ui.old==='cat')
check('animals: Looking Pool lists 8 animals and picking one sets its fur and power',ui.n===8&&ui.an==='lion'&&ui.fur===8&&ui.w.startsWith('Rage'),JSON.stringify(ui))
const dr=J(await t.ev(`(()=>{const c=document.createElement('canvas');c.width=c.height=200;const old=cx;cx=c.getContext('2d');let n=0;try{for(const an in AN)for(const cl in CL)for(const f of[0,'rage','shell','vanish','howl']){drawhero(100,120,61.6,cl,0.4,1000,{anf:f,mv:1,cos:{...CDEF,an,fur:AN[an].fur}});n++}}finally{cx=old}return JSON.stringify(n)})()`))
check('animals: every animal draws in every class and power state',dr===8*Object.keys(J(await t.ev('JSON.stringify(CL)'))).length*5,dr+' drawn')
check('animals: no JS errors',!t.errs.length,t.errs.slice(0,3).join(' | '))
await t.close();await closeall();server.close()}
