import fs from 'node:fs'
import {serve,pw} from '../lib.mjs'
import {BOT,PARTY} from '../bot.mjs'
import {SEED,TIER} from './bot.mjs'
export const sleep=ms=>new Promise(r=>setTimeout(r,ms))
export function deadline(sec){const t=setTimeout(()=>{console.log('deadline hit after '+sec+'s, exiting');process.exit(3)},sec*1000);t.unref();return t}
export async function pool(n,file){const {server,url}=await serve(0,file),br=await pw().chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--mute-audio']}),P=[]
async function mk(){const ctx=await br.newContext({viewport:{width:640,height:400}});await ctx.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());await ctx.addInitScript(SEED);const page=await ctx.newPage(),errs=[];page.on('pageerror',e=>errs.push(String(e&&e.message||e).slice(0,300)));await page.goto(url);await page.waitForFunction(()=>window.__t&&window.__fr>2,null,{timeout:30000});const ev=s=>page.evaluate(s=>window.__t.ev(s),s);await ev(BOT+PARTY+TIER+';0');return{page,ctx,ev,errs}}
for(let i=0;i<n;i++)P.push(await mk())
return{P,mk,async renew(i){try{await P[i].ctx.close()}catch(e){}P[i]=await mk();return P[i]},async close(){for(const t of P)try{await t.ctx.close()}catch(e){}await br.close();server.closeAllConnections&&server.closeAllConnections();server.close()}}}
export async function jobs(Q,list,fn,{ms=600000,log=null,each=null}={}){const out=new Array(list.length);let next=0,doneN=0;const t0=Date.now()
async function worker(i){for(;;){const j=next++;if(j>=list.length)return;let t=Q.P[i],r;try{r=await Promise.race([fn(t,list[j]),sleep(ms).then(()=>({err:'timeout'}))])}catch(e){r={err:String(e&&e.message||e).slice(0,300)}}if(r&&r.err){try{await Q.renew(i)}catch(e){}}if(t.errs.length){r=r||{};r.jserr=t.errs.splice(0)}out[j]=r;if(each)each(list[j],r);doneN++;if(log&&(doneN%log===0||doneN===list.length))console.log(`  ${doneN}/${list.length} jobs, ${Math.round((Date.now()-t0)/1000)}s`)}}
await Promise.all(Q.P.map((_,i)=>worker(i)));return out}
export async function drive(t,o,{flmax=100,tmax=3600,chunk=30,stop=''}={}){await t.ev(`__go(${JSON.stringify({cl:o.cl,seed:o.seed,tier:o.tier,fl:o.fl||0})});0`);if(o.pre)await t.ev(o.pre+';startfloor();P.hp=S.mhp;0');let r
for(let s=0;s<tmax;s+=chunk){r=await t.ev(`__sim(${chunk},()=>(g&&g.fl>${flmax})${stop?'||('+stop+')':''})`);if(r!=='time')break}
return JSON.parse(await t.ev('__out()'))}
export const med=a=>{const b=a.filter(x=>x!=null&&isFinite(x)).sort((x,y)=>x-y);if(!b.length)return null;const m=b.length>>1;return b.length%2?b[m]:(b[m-1]+b[m])/2}
export const qt=(a,q)=>{const b=a.filter(x=>x!=null&&isFinite(x)).sort((x,y)=>x-y);if(!b.length)return null;const i=(b.length-1)*q,lo=Math.floor(i),hi=Math.ceil(i);return b[lo]+(b[hi]-b[lo])*(i-lo)}
export const stat=a=>{const m=med(a);return{med:m==null?null:+m.toFixed(3),p10:qt(a,0.1)==null?null:+qt(a,0.1).toFixed(3),p90:qt(a,0.9)==null?null:+qt(a,0.9).toFixed(3),n:a.filter(x=>x!=null&&isFinite(x)).length}}
export function jsonl(f){const have=new Map();if(fs.existsSync(f))for(const l of fs.readFileSync(f,'utf8').split(/\r?\n/))if(l.trim())try{const o=JSON.parse(l);have.set(o.key,o)}catch(e){}return{have,add(key,o){const v={key,...o};have.set(key,v);fs.appendFileSync(f,JSON.stringify(v)+'\n')}}}
