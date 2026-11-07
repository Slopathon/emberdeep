import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {pool,jobs,deadline,stat,jsonl} from './pool.mjs'
const here=path.dirname(fileURLToPath(import.meta.url))
const arg=k=>{const i=process.argv.indexOf('--'+k);return i>0?process.argv[i+1]:null}
const cls=['wizard','bow','rogue','priest','knight'],vars=['base','noslow','nokb'],fls=(arg('fls')||'4,6,8').split(',').map(Number),seeds=+(arg('seeds')||14),par=+(arg('par')||6),hp0=+(arg('hp')||0.3),tmax=+(arg('tmax')||60),tag=arg('tag')||'spiral',tier=arg('tier')||'mid'
deadline(+(arg('limit')||2400))
export const SPIRAL=String.raw`
window.__sp=function(o){if(!window.__hs0){window.__hs0=hpslow;window.__pk0=pknock}hpslow=o.v==='noslow'?function(){return 1}:__hs0;pknock=o.v==='nokb'?function(){}:__pk0;__b.R=null;__go({cl:o.cl,seed:o.seed,tier:o.tier,fl:o.fl});__b.stopdeath=1;P.hp=S.mhp*o.hp;if(o.lava)for(let i=0;i<6;i++){const a=i*1.047+0.5;run.lava.push({x:P.x+Math.cos(a)*120,y:P.y+Math.sin(a)*120,r:40,t:999,a:1})}return 1}
window.__spo=function(o){const R=__b.R,by={};for(const k in R.dmg){const h=k.split('/').pop();by[h]=(by[h]||0)+R.dmg[k]}const hits=Object.values(R.hits).reduce((s,x)=>s+x,0);return JSON.stringify({died:R.deaths.length>0?1:0,t:Math.round(R.t*10)/10,clear:g.fl>o.fl||!!run.portal?1:0,hits,by,hp:Math.round(Math.max(0,P.hp)/S.mhp*100)/100})}
`
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){fs.mkdirSync(path.join(here,'out'),{recursive:true})
const J=jsonl(path.join(here,'out',tag+'.jsonl')),list=[]
for(const v of vars)for(const cl of cls)for(const fl of fls)for(let s=1;s<=seeds;s++){const o={v,cl,fl,seed:s*104729+fl,hp:hp0,tier,lava:1},key=v+'/'+cl+'/'+fl+'/'+s;if(!J.have.has(key))list.push({key,o})}
console.log(list.length,'trials')
if(list.length){const Q=await pool(par);await jobs(Q,list,async(t,j)=>{await t.ev(SPIRAL+';0');await t.ev(`__sp(${JSON.stringify(j.o)});0`);for(let s=0;s<tmax;s+=20){const r=await t.ev(`__sim(20,()=>__b.R.deaths.length>0||g.fl>${j.o.fl}||!!run.portal)`);if(r!=='time')break}const r=JSON.parse(await t.ev(`__spo(${JSON.stringify(j.o)})`));J.add(j.key,{...j.o,...r});return r},{ms:300000,log:60});await Q.close()}
const rows=[...J.have.values()],cell={}
for(const r of rows){const k=r.v+'/'+r.cl;(cell[k]||(cell[k]=[])).push(r)}
const av=a=>a.length?a.reduce((s,x)=>s+x,0)/a.length:0,sum={}
for(const k in cell){const a=cell[k];sum[k]={n:a.length,death:+av(a.map(r=>r.died)).toFixed(2),hazard:+av(a.map(r=>r.by.hazard||0)).toFixed(3),taken:+av(a.map(r=>Object.values(r.by).reduce((s,x)=>s+x,0))).toFixed(2),t:stat(a.map(r=>r.t))}}
let bad=0;const line=(ok,s)=>{if(!ok)bad++;console.log((ok?'pass ':'FAIL ')+s)}
for(const cl of cls){const b=sum['base/'+cl],n=sum['noslow/'+cl],k=sum['nokb/'+cl];console.log(cl.padEnd(7),'death base',b.death,'noslow',n.death,'nokb',k.death,'| hazard base',b.hazard,'nokb',k.hazard,'| taken base',b.taken,'noslow',n.taken)
line(b.death-n.death<=0.25,`spiral: ${cl} at ${hp0*100}% health dies at most 25 points more often with the low health slow (${b.death} vs ${n.death})`)
line(b.hazard<=k.hazard*1.25+0.02,`hazards: ${cl} knockback adds no more than 25% hazard damage (${b.hazard} vs ${k.hazard})`)}
const all=v=>av(cls.map(c=>sum[v+'/'+c].death))
line(all('base')-all('noslow')<=0.1,`spiral: across classes the slow adds at most 10 points of deaths (${all('base').toFixed(2)} vs ${all('noslow').toFixed(2)})`)
fs.writeFileSync(path.join(here,'out',tag+'.json'),JSON.stringify({when:new Date().toISOString(),hp:hp0,fls,seeds,sum},null,1))
console.log(bad?bad+' failed':'all passed');process.exit(bad?1:0)}
