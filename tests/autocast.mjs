import {serve,open,closeall,check} from './lib.mjs'
import {BOT} from './bot.mjs'
const J=s=>JSON.parse(s)
const SETUP=(k,auto)=>`const cl=ab['${k}'].cl||'wizard';leavehub();hide();g=fresh(cl);g.fl=1;g.ab={'${k}':1${auto?',autocast:1':''}};g.acts=['${k}'];g.wep.atk=1;g.arm.hp=900000;recalc();startfloor();__b.god=1;__b.mode='afk';run.en.length=0;run.waves=0;run.pending=0;P.inv=999;for(const q of ['faith','edge','hp'])if(P[q]!=null&&q!=='hp')P[q]=100;g.faith=100;P.cd['${k}']=0;let bx=P.x+200,by=P.y;for(let i=0;i<16;i++){const a=i*0.3927,x=P.x+Math.cos(a)*220,y=P.y+Math.sin(a)*220;if(!inobs(x,y)&&(!run.G||los(P.x,P.y,x,y))){bx=x;by=y;break}}const T=mkmini('anvil',bx,by,1);T.hp=T.mhp=1e12;T.spd=0;T.cd=999;T.t1=999;T.sleep=0;run.en.push(T);const X=P.x,Y=P.y;`
const MEAS=`let far=0;const r=__sim(1,()=>{far=Math.max(far,Math.hypot(P.x-X,P.y-Y));run.en=run.en.filter(e=>e===T);T.x=bx;T.y=by;T.cd=999;return false});`
export async function run(){const {server,url}=await serve(),t=await open(url);await t.ev(BOT+';0')
const keys=J(await t.ev(`JSON.stringify(Object.keys(ab).filter(k=>ab[k].act))`)),mv=[],skip=[]
for(const k of keys){const q=J(await t.ev(`(()=>{${SETUP(k,false)}aov=T;const ok=fire('${k}');aov=null;${MEAS}return JSON.stringify({ok:ok!==false,far:Math.round(far)})})()`));if(!q.ok)skip.push(k);if(q.far>40)mv.push(k)}
const NA=J(await t.ev(`JSON.stringify([...NOAUTO])`));check('autocast: every skill that moves the player is kept out of Autocast',mv.includes('charge')&&mv.includes('step')&&mv.every(k=>NA.includes(k)),keys.length+' skills, movers: '+mv.join()+(skip.length?', refused to fire: '+skip.join():''))
check('autocast: the refused list has no skill that could hide a mover',!skip.includes('charge')&&!skip.includes('step'))
for(const k of ['charge','step']){const q=J(await t.ev(`(()=>{${SETUP(k,true)}${MEAS}return JSON.stringify({cd:P.cd['${k}'],far:Math.round(far),chg:!!P.chg})})()`));check('autocast: '+k+' does not cast itself and the player stays put',q.cd<=0&&q.far<=40,JSON.stringify(q));const m=J(await t.ev(`(()=>{${SETUP(k,true)}aov=T;cast(0);aov=null;${MEAS}return JSON.stringify({cd:P.cd['${k}'],far:Math.round(far)})})()`));check('autocast: '+k+' still works when pressed by hand',m.cd>0&&m.far>40,JSON.stringify(m))}
const others=keys.filter(k=>!NA.includes(k)&&!skip.includes(k));let fired=0;const not=[];for(const k of others){const q=J(await t.ev(`(()=>{${SETUP(k,true)}${MEAS}return JSON.stringify({cd:P.cd['${k}']})})()`));if(q.cd>0)fired++;else not.push(k)}
check('autocast: every skill that does not move still casts itself',!not.length,fired+'/'+others.length+(not.length?' missing '+not.join():''))
check('autocast: no JS errors',!t.errs.length,t.errs.slice(0,2).join(' | ').slice(0,300));await closeall();server.close()}
