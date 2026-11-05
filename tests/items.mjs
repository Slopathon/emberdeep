import {serve,open,closeall,check} from './lib.mjs'
import {BOT} from './bot.mjs'
const J=s=>JSON.parse(s)
const SCEN=(cl,id)=>`(()=>{hide();__seed(4242);tdstart('${cl}');${id?`g.its[ITM['${id}'].sl]='${id}';itsync();`:''}__b.god=0;__b.mode='fight';__b.skills=0;__b.pots=0;__b.dodge=0;const go=(x,y)=>{P.x=AC.x+x;P.y=AC.y+y},foe=()=>itn(P.x,P.y,700)[0],cast1=()=>{const t=foe();if(t){aov={x:t.x,y:t.y};for(let i=0;i<g.acts.length;i++){P.cd[g.acts[i]]=0;cast(i)}aov=null}},hurtme=(py)=>{const t=foe();P.inv=0;P.ifr=0;P.gd=2;P.swt=py?run.t:-9;run.tgt=t;hurt(0,t,{pct:0.05,pf:1})},m0=mouse.down;let dmg=0;P.faith=100;P.edge=6;go(330,-290);__sim(3);cast1();__sim(1.5);dodge();__sim(0.4);blink({x:P.x+60,y:P.y});__sim(0.4);hurtme(0);__sim(0.2);hurtme(1);__sim(0.2);perfect();__sim(0.2);P.hp=S.mhp*0.25;hurtme(0);heal(S.mhp*0.5);__sim(0.5);go(200,40);__sim(2);cast1();__sim(1);go(380,330);__sim(1.5);go(-200,-30);__sim(1.5);go(-230,360);__sim(1);for(const q of run.tdl)dmg+=q[1];mouse.down=m0;return JSON.stringify({dmg:Math.round(dmg),n:run.tdl.length,hp:Math.round(P.hp),mhp:S.mhp,spd:Math.round(S.spd),fr:+S.fr.toFixed(3),bcd:+S.bcd.toFixed(3),x:Math.round(P.x),y:Math.round(P.y),cd:Math.round(Object.values(P.cd).reduce((a,b)=>a+b,0)*100),f:Math.round(P.faith||0),e:P.edge||0,dch:P.dch,bolts:run.bolts.length,it:Object.keys(P.it||{}).length})})()`
export async function run(){const {server,url}=await serve(),t=await open(url);await t.page.addInitScript(()=>{let s=1;Math.random=()=>{s=(s*16807)%2147483647;return(s-1)/2147483646};window.__seed=v=>{s=v}});await t.page.reload();await t.page.waitForFunction(()=>window.__t&&window.__fr>2);await t.ev(BOT+';0')
const IT=J(await t.ev(`JSON.stringify(Object.values(ITM).map(q=>({id:q.id,n:q.n,cl:q.cl,sl:q.sl,d:q.d,act:!!q.act,mv:!!q.mv})))`)),cls=['wizard','bow','rogue','priest','knight']
for(const c of cls){const L=IT.filter(q=>q.cl===c),by=s=>L.filter(q=>q.sl===s).length;check('items: '+c+' has 15 items, 5 weapons, 4 abilities, 3 armors, 3 rings',L.length===15&&by('w')===5&&by('a')===4&&by('r')===3&&by('n')===3,[L.length,by('w'),by('a'),by('r'),by('n')].join())}
check('items: all names and descriptions are different',new Set(IT.map(q=>q.n)).size===IT.length&&new Set(IT.map(q=>q.d)).size===IT.length,IT.length+' items')
check('items: no em dashes in item text',!IT.some(q=>/—/.test(q.n+q.d)))
const cc=J(await t.ev(`(()=>{leavehub();hide();g=fresh('wizard');startfloor();const out=new Set();for(let i=0;i<300;i++){g.ab={};g.acts=[];g.sp={};for(const k of cards())out.add(k)}const r=[...out].filter(k=>ab[k]&&ab[k].it);enterhub();return JSON.stringify({r,itl:0})})()`));check('items: item abilities never show up as level up cards',!cc.r.length,cc.r.join())
const hb=J(await t.ev(`(()=>{SET.tdok=0;saveset();hub.x=HS.shade.x;hub.y=HS.shade.y+50;updhub(0.016);const near=hub.near&&hub.near.k;hubuse();return JSON.stringify({near,ov:ovk,inp:!!document.querySelector('#tdpw')})})()`));check('yard: the stranger stands in the Hearth and asks for the word',hb.near==='shade'&&hb.ov==='shade'&&hb.inp,JSON.stringify(hb))
await t.page.fill('#tdpw','nope');await t.page.click('[data-go=tdpw]');const w=J(await t.ev(`JSON.stringify({ov:ovk,g:!!g,hub:inhub,msg:document.querySelector('.bx-shade p').textContent})`));check('yard: a wrong word keeps you out',w.ov==='shade'&&!w.g&&w.hub&&/not the word/.test(w.msg),JSON.stringify(w))
const pwd=await t.ev('TDPW');await t.page.fill('#tdpw',pwd);await t.page.click('[data-go=tdpw]');await t.page.waitForFunction(()=>window.__t.ev('!!(g&&g.td&&run&&ovk==="tdui")'));check('yard: the right word lets you in and opens the item panel',true)
const cardsn=await t.ev(`document.querySelectorAll('.tdi').length`);check('yard: the panel lists the 15 items of the class',cardsn===15,cardsn)
await t.page.click('[data-go="td:cl:knight"]');const kn=await t.ev(`g.cl+':'+document.querySelectorAll('.tdi').length`);check('yard: the class tabs switch class',kn==='knight:15',kn)
await t.page.click('[data-go="td:eq:ironclad"]');const eq=J(await t.ev(`JSON.stringify({r:g.its.r,on:document.querySelectorAll('.tdi.on').length,mhp:S.mhp})`));check('yard: clicking an item equips it',eq.r==='ironclad'&&eq.on===1,JSON.stringify(eq));await t.page.click('[data-go="td:eq:ironclad"]');const off=await t.ev('g.its.r||null');check('yard: clicking it again takes it off',off===null);await t.page.click('[data-go=close]')
const gr=J(await t.ev(`(()=>{tdstart('wizard');const n={};for(const e of run.en)n[e.sg]=(n[e.sg]||0)+1;return JSON.stringify(n)})()`));check('yard: every dummy setup is there',Object.keys(gr).length===10&&gr.Packed===9&&gr.Chain===6&&gr.Line===7&&gr.Swarm===12&&gr.Attackers===2,JSON.stringify(gr))
const rs=J(await t.ev(`(()=>{tdstart('wizard');const A=run.en.filter(e=>e.sg==='Swarm');for(const e of A)hit(e,1e6,{el:'phys'});const d0=run.en.filter(e=>e.sg==='Swarm'&&!e.dead).length;__b.mode='afk';__sim(1.5);const S2=run.en.filter(e=>e.sg==='Swarm'&&!e.dead).length,si=run.en.find(e=>e.sg==='Single');for(let i=0;i<4;i++)hit(si,1e7,{el:'phys'});__sim(0.1);const G=tdstats();P.hp=5;P.inv=0;P.ifr=0;hurt(1e9,si,{});return JSON.stringify({d0,S2,sidead:!!si.dead,hp:si.hp/si.mhp,dps:G.dps,G:G.G.map(q=>q[0]),php:P.hp,dead:!!g.dead,xp:g.xp,gold:g.gold,drops:run.drops.length})})()`));check('yard: dead dummies come back, and tough ones never die',rs.d0===0&&rs.S2===12&&!rs.sidead&&rs.hp===1,JSON.stringify(rs));check('yard: the meter counts damage per setup',rs.dps>0&&rs.G.includes('Single')&&rs.G.includes('Swarm'),JSON.stringify(rs.G));check('yard: you cannot die here, and dummies give no xp, gold or drops',rs.php>=1&&!rs.dead&&rs.xp===0&&rs.gold===0&&rs.drops===0,JSON.stringify(rs))
const dm=J(await t.ev(`(()=>{tdstart('rogue');__b.mode='afk';const a=run.en.find(e=>e.tp==='armor');P.x=a.x;P.y=a.y+160;__sim(4);const f=hit(a,1000,{el:'phys'});P.x=a.x+Math.cos(a.fa+Math.PI)*160;P.y=a.y+Math.sin(a.fa+Math.PI)*160;const b=hit(a,1000,{el:'phys'});const x=run.en.find(e=>e.sg==='Execute'),e0=x.hp/x.mhp;__sim(0.1);const e1=x.hp/x.mhp;const sh=run.en.find(e=>e.tp==='shoot');P.x=sh.x+200;P.y=sh.y;P.inv=0;const hp0=P.hp;__sim(3);const hp1=P.hp;run.tdoff=1;const n0=run.shots.length;__sim(6);const n1=run.shots.length;return JSON.stringify({f,b,e1,hp0,hp1,n0,n1})})()`));check('yard: the armored dummy blocks from the front and takes full damage from behind',dm.b>dm.f*3,JSON.stringify(dm));check('yard: the execute dummy holds at 20%',Math.abs(dm.e1-0.2)<0.001,dm.e1);check('yard: attackers hit you and can be switched off',dm.hp1<dm.hp0&&dm.n1===0,JSON.stringify(dm))
const Y=(cl,id)=>"hide();__seed(99);tdstart('"+cl+"');g.its[ITM['"+id+"'].sl]='"+id+"';itsync();__b.mode='afk';__b.god=0;run.tdoff=1;autofire=false;P.inv=0;const si=run.en.find(e=>e.sg==='Single'),x=run.en.find(e=>e.sg==='Afflicted'),sw=run.en.find(e=>e.sg==='Swarm'),ln=run.en.find(e=>e.sg==='Line'),pk=run.en.find(e=>e.sg==='Packed'),dmg=()=>run.tdl.reduce((a,q)=>a+q[1],0),H=(e,o)=>hit(e,1000,{el:'phys',crit:false,...o}),ow=()=>{P.inv=0;P.ifr=0},at=e=>{P.x=e.x+e.r+P.r+20;P.y=e.y},bolts=()=>run.bolts.length;__sim(0.03);"
const TG={stillhide:"P.still=2;const a=H(si);ow();const h0=P.hp;hurt(100,si,{});const l1=h0-P.hp;P.still=0;const b=H(si);ow();P.hp=h0;hurt(100,si,{});const l2=h0-P.hp;return a>b&&l1<l2",
razorhide:"P.x=ln.x-60;P.y=ln.y;P.ddx=1;P.ddy=0;P.dt=0.14;P.ph=new Set();const e0=P.edge||0;__sim(0.1);return dmg()>0&&P.edge>e0",
knifeseye:"P.cd[g.acts[0]]=5;perfect();return P.cd[g.acts[0]]===0",
widowcoil:"x.st.pt=3;x.st.pd=1;P.edge=0;H(x,{basic:1});return x.st.pt>3&&P.edge===2",
oathring:"aov={x:si.x,y:si.y};P.x=si.x+200;P.y=si.y;P.gd=1;P.swt=run.t;P.cd.bash=5;ow();hurt(100,si,{});const a=P.cd.bash===0;aov=null;return a&&P.gd>=1",
grudgering:"P.gd=0;ow();hurt(100,si,{});const n=itp().gg,a=H(si,{basic:1});__sim(0.1);const b=H(si,{basic:1});return n===1&&a>b*1.2",
hawkeye:"P.cd[g.acts[0]]=5;H(si,{basic:1,amb:true});return Math.abs(P.cd[g.acts[0]]-3.5)<0.01",
hemorrhage:"P.x=x.x+60;P.y=x.y;x.st.pt=4;x.st.pd=50;CLF.hemorrhage(1,{x:x.x,y:x.y});return run.tdpk>=800",
beacon:"P.x=si.x+120;P.y=si.y;P.hp=50;CLF.beacon(1,{x:P.x,y:P.y});bx(si,0,0,0.05,{x:P.x+40,y:P.y,life:9});const n0=run.shots.length;__sim(0.5);return P.hp>50&&n0===1&&run.shots.length===0",
tithes:"P.hp=S.mhp;P.faith=0;heal(S.mhp*0.2);return P.faith>0",
heatsink:"itp().h2=100;P.x=si.x+60;P.y=si.y;const h=P.hp;ow();hurt(100,si,{});return P.hp===h&&itp().h2===0&&dmg()>0",
confluence:"x.st.ch=2;x.st.bt=3;const a=H(x);const b=H(si);return Math.abs(a/b-1.5)<0.01",
ouroboros:"P.cd[g.acts[0]]=5;hit(sw,1e6,{el:'phys'});return Math.abs(P.cd[g.acts[0]]-4.3)<0.01",
blinkstone:"const c=S.bcd;blink({x:P.x+30,y:P.y});const a=H(si,{basic:1}),b=H(si,{basic:1});return c===1.75&&Math.abs(a/b-3)<0.01",
decoycloak:"ow();hurt(100,si,{});return !!run.decoy",
frostmantle:"at(pk);ow();hurt(100,si,{});return pk.st.ch>=2",
echorobe:"let n=0;const of=fire;fire=function(k){n++;return of(k)};at(si);cast(0);__sim(1.2);fire=of;return n===2",
shadowweave:"itp().dg=run.t+99;let miss=0;for(let i=0;i<60;i++){ow();P.hp=S.mhp;const h=P.hp;hurt(100,si,{});if(P.hp===h)miss++}return miss>5&&miss<50",
banditharness:"P.dch=0;hit(sw,1e6,{el:'phys'});return P.dch===1",
edgekeeper:"P.edge=5;P.edt=0;__sim(5);const a=P.edge===5;const v=hit(si,1000,{el:'phys',basic:1});return a&&v>=1000*S.cd*0.99",
pilgrim:"P.hp=S.mhp;ow();hurt(100,si,{});const h=P.hp;H(si,{basic:1});return P.hp>h",
reliquary:"P.hp=S.mhp*0.31;ow();P.x=si.x+60;P.y=si.y;hurt(S.mhp*0.3,si,{});return P.hp>S.mhp*0.3&&itp().rq>run.t",
vigilring:"P.faith=100;const a=H(si,{basic:1});P.faith=0;const b=H(si,{basic:1});return Math.abs(a/b-1.5)<0.01",
censure:"P.x=si.x+60;P.y=si.y;P.hp=1;heal(S.mhp*0.3);return dmg()>0",
sanctified:"P.hfat=999;__sim(0.05);P.hp=10;const v=S.mhp*0.1;heal(v,true);return P.hfat<v&&Math.abs(P.hp-10-v*0.75)<1",
spikedbulwark:"aov={x:si.x,y:si.y};P.x=si.x+300;P.y=si.y;P.gd=1;ow();const n=bolts();hurt(100,si,{});aov=null;return bolts()-n===8",
wardenknot:"aov={x:si.x,y:si.y};P.x=si.x+300;P.y=si.y;P.gd=1;ow();hurt(100,si,{});aov=null;return dmg()>0",
momentumplate:"itp().mo=1;const a=H(si,{basic:1}),b=H(si,{basic:1});return Math.abs(a/b-2)<0.01",
ironclad:"P.hp=S.mhp;P.gd=0;ow();hurt(1e6,si,{});return S.mhp-P.hp<=S.mhp*0.15+1",
tailwind:"P.vx=200;itp().w=1;const a=H(si,{basic:1}),b=H(si,{basic:1});P.x=si.x+300;itp().w=0.5;__sim(0.02);return Math.abs(a/b-2)<0.01&&P.itsp>=0",
quarry:"H(si);const a=H(si),b=H(x);const q0=itp().q===si;itp().q=sw;hit(sw,1e6,{el:'phys'});return q0&&Math.abs(a/b-1.4)<0.01&&itp().q&&itp().q!==sw",
fletcher:"const m={x:P.x+200,y:P.y};run.bwm=1;const n=bolts();for(let i=0;i<4;i++)clatk(m);const a=bolts()-n;clatk(m);return a===4&&bolts()-n===10",
halo:"P.x=si.x+60;P.y=si.y;CLF.halo();let saved=0;for(let i=0;i<3;i++){ow();const h=P.hp;hurt(100,si,{});if(P.hp===h)saved++}ow();const h=P.hp;hurt(100,si,{});return saved===3&&P.hp<h",
martyrex:"P.hp=S.mhp;const b=H(si);const h=P.hp;CLF.martyrex();const a=H(si);const af=P.hp;P.hp=10;P.hfat=0;heal(10,true);return af<h&&Math.abs(a/b-1.4)<0.01&&P.hp>=29",
counterstance:"P.x=si.x+60;P.y=si.y;CLF.counterstance();const h=P.hp;for(let i=0;i<2;i++){ow();hurt(100,si,{})}const hs=P.hp;__sim(1.6);return hs===h&&run.tdpk>0&&!itp().cs",
vanish:"CLF.vanish();const i0=P.inv;const a=H(si,{basic:1}),b=H(si,{basic:1});return i0>=3&&Math.abs(a/b-4)<0.01",
grapnel:"P.x=si.x+500;P.y=si.y;const ox=P.x;CLF.grapnel(1,{x:si.x,y:si.y});__sim(0.3);const v=hit(si,1000,{el:'phys',basic:1});return Math.abs(P.x-ox)>100&&v>=1000*S.cd*0.99",
timeslip:"const ox=P.x;__sim(1);P.x=ox+400;const ok=CLF.timeslip();return ok!==false&&Math.abs(P.x-ox)<40",
tethershot:"const L=run.en.filter(e=>e.sg==='Line').slice(0,2);CLF.tethershot(1,{x:L[0].x,y:L[0].y});hit(L[0],100,{el:'phys',crit:false});return L[0].lnk>run.t&&L[1].hp<L[1].mhp",
flarearrow:"P.x=si.x+200;P.y=si.y;const b=H(si);CLF.flarearrow(1,{x:si.x,y:si.y});__sim(0.1);const a=H(si);return Math.abs(a/b-1.35)<0.01",
caltrops:"P.x=pk.x+200;P.y=pk.y;CLF.caltrops(1,{x:pk.x,y:pk.y});__sim(0.3);return dmg()>0",
mirrorimage:"P.x=si.x+200;P.y=si.y;CLF.mirrorimage(1,{x:si.x+100,y:si.y});__sim(1);return dmg()>0",
riftlens:"const L=run.en.filter(e=>e.sg==='Line'),e=L[3],q={x:e.x+150,y:e.y},x0=e.x;P.x=q.x+100;P.y=q.y;CLF.riftlens(1,q);__sim(0.4);const moved=e.x>x0+5;__sim(2.8);return moved&&dmg()>0",
prismbeam:"P.x=si.x+300;P.y=si.y;aov={x:si.x,y:si.y};CLF.prismbeam();__sim(0.6);aov=null;return dmg()>0",
hookchain:"P.x=ln.x+300;P.y=ln.y;const x0=ln.x;CLF.hookchain(1,{x:ln.x,y:ln.y});return ln.x>x0+150&&dmg()>0",
seismicslam:"P.x=ln.x+300;P.y=ln.y;CLF.seismicslam(1,{x:ln.x,y:ln.y});return Math.abs(P.x-ln.x)<120&&dmg()>0",
miragestep:"P.x=ln.x+300;P.y=ln.y;CLF.miragestep(1,{x:ln.x+100,y:ln.y});const nx=P.x;__sim(1.1);return nx<ln.x+150&&dmg()>0",
absolution:"P.x=si.x+200;P.y=si.y;P.faith=100;CLF.absolution(1,{x:si.x,y:si.y});const a=run.tdpk;run.tdpk=0;P.faith=0;CLF.absolution(1,{x:si.x,y:si.y});return P.faith===0&&a>run.tdpk*2",
chainblade:"P.x=ln.x+200;P.y=ln.y;P.edge=0;CLF.chainblade(1,{x:ln.x,y:ln.y});__sim(0.5);const n=run.en.filter(e=>e.sg==='Line'&&e.hp<e.mhp).length;return n>=5&&P.edge>=5"}
const bad=[];for(const id in TG){const q=IT.find(o=>o.id===id);const v=await t.ev("(()=>{"+Y(q.cl,id)+TG[id]+"})()");if(!v)bad.push(id)}
check('items: conditional items do what they say when their trigger happens',!bad.length,bad.length?'broken: '+bad.join():Object.keys(TG).length+' checked')
const base={};for(const c of cls)base[c]=await t.ev(SCEN(c,null));const same=[],errs0=t.errs.length,tb={};for(const q of IT){const v=await t.ev(SCEN(q.cl,q.id));if(v===base[q.cl])same.push(q.id);tb[q.id]=J(v).dmg}
check('items: all 75 change the outcome against no item on the same seed',!same.filter(k=>!TG[k]).length,same.filter(k=>!TG[k]).join()||IT.length+' items')
for(const c of cls)console.log('  '+c+' base '+J(base[c]).dmg+' | '+IT.filter(q=>q.cl===c).map(q=>q.id+' '+tb[q.id]).join(', '))
const au=J(await t.ev(`(()=>{const L=Object.values(ITM).filter(q=>q.mv).map(q=>q.id);return JSON.stringify({ok:L.every(k=>NOAUTO.has(k)&&NOFOCUS.has(k)),n:L.length})})()`));check('items: movement abilities stay out of Autocast and the Hollow King phase',au.ok&&au.n===4,JSON.stringify(au))
const nr=J(await t.ev(`(()=>{enterhub();hub.tit=0;hide();newgame('wizard');return JSON.stringify({itl:g.itl===undefined,td:g.td===undefined,dummies:run.en.filter(e=>e.dum).length,bcd:S.bcd})})()`));check('items: a normal run has no items and no dummies',nr.itl&&nr.td&&nr.dummies===0,JSON.stringify(nr))
await t.ev(`enterhub();0`);check('items: no JS errors',!t.errs.length,t.errs.slice(0,3).join(' | ').slice(0,500));await closeall();server.close()}
