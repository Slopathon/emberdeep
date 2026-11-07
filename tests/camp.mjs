import {closeall,check,done,sleep} from './lib.mjs'
import {party} from './party.mjs'
const box=(t,sel)=>t.page.evaluate(s=>{const b=document.querySelector(s);if(!b)return null;const q=b.getBoundingClientRect();return{x:q.x+q.width/2,y:q.y+q.height/2,off:b.disabled}},sel)
async function press(t,sel){const r=await box(t,sel);if(!r)return false;await t.page.mouse.move(r.x,r.y);await t.page.mouse.down();await sleep(70);await t.page.mouse.up();return true}
async function until(fn,ms=8000,step=100){const t0=Date.now();for(;;){try{if(await fn())return true}catch(e){}if(Date.now()-t0>ms)return false;await sleep(step)}}
async function scenario(who,slot){const S=await party(),{P}=S,tag='camp, '+who+' in the door: ';try{await sleep(700);for(const t of P)await t.ev('hub.rdy=1;0');const up=await until(async()=>{for(const t of P)if(!(await t.ev('!!(NET.inrun&&run&&!inhub)')))return false;return true},12000);check(tag+'run starts',up);if(!up)return
await P[0].ev(`fora(()=>{g.fl=5;g.camp=0;g.prep=0;g.pend=0;g.gold=1e7});startfloor();nfl();0`);await until(async()=>{for(const t of P)if((await t.ev('g.fl'))!==5)return false;return true})
await P[0].ev(`run.en.length=0;run.spawned=1e9;run.rsv=[];fora(()=>{P.inv=1e6;g.gold=1e7;g.pend=0;g.gemc=null});0`);await sleep(500)
await P[0].ev(`{const o=PL.find(p=>p.id===PL[${slot}].id);const q={x:o.P.x,y:o.P.y,to:1};for(let i=0;i<300;i++)nev(['s','x',-1]);run.portal=q;run.portals=[q]};0`)
const opened=await until(async()=>{for(const t of P)if((await t.ev('ovk'))!=='camp')return false;return true});check(tag+'everyone gets the camp screen',opened);if(!opened)return
await sleep(400)
await P[1].ev('hide();0');check(tag+'a client that loses the screen gets it back',await until(async()=>(await P[1].ev('ovk'))==='camp',2000))
for(const[i,t]of[[0,P[0]],[1,P[1]]]){await t.page.evaluate(()=>{const b=document.querySelector('#box .sh');if(b)b.__mark=1});await sleep(600);const kept=await t.page.evaluate(()=>{const b=document.querySelector('#box .sh');return!!(b&&b.__mark)});check(tag+(i?'client':'host')+' screen holds still long enough to click',kept)}
for(const[i,t]of[[0,P[0]],[1,P[1]]]){const n=i?'client':'host',a=await t.ev('g.buy.w'),ok=await press(t,'#box .sh[data-buy=whet]'),got=await until(async()=>(await t.ev('g.buy.w'))>a,2500);check(tag+n+' can buy a whetstone with a real click',ok&&got,a+' to '+await t.ev('g.buy.w'))}
for(const t of P){await until(async()=>{const r=await box(t,'#box .go');return r&&!r.off},2000);await press(t,'#box .go')}
const t0=Date.now(),moved=await until(async()=>{for(const t of P)if((await t.ev('g.fl'))!==6||(await t.ev('ovk')))return false;return true},8000);check(tag+'everyone ready moves the party to floor 6 well before the 60s timer',moved,(Date.now()-t0)+'ms')}finally{await S.close()}}
export async function run(){await scenario('host',0);await scenario('client',1)}
if(process.argv[1]&&process.argv[1].replace(/\\/g,'/').endsWith('tests/camp.mjs')){try{await run()}catch(e){check('camp suite ran',false,String(e&&e.stack||e).slice(0,400))}await closeall();done()}
