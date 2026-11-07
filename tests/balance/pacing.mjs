import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {pool,jobs,drive,stat,med,deadline,jsonl} from './pool.mjs'
const here=path.dirname(fileURLToPath(import.meta.url))
const arg=k=>{const i=process.argv.indexOf('--'+k);return i>0?process.argv[i+1]:null}
const CLS=['wizard','bow','rogue','priest','knight'],cls=arg('cls')?arg('cls').split(','):CLS,seeds=+(arg('seeds')||20),par=+(arg('par')||8),tmax=+(arg('tmax')||1800),flmax=+(arg('flmax')||40),file=arg('file'),tag=arg('tag')||'now',tiers=(arg('tiers')||'low,mid,high,auto,stand,afk').split(',')
fs.mkdirSync(path.join(here,'out'),{recursive:true})
const raw=jsonl(path.join(here,'out','pacing-'+tag+'.jsonl'))
deadline(+(arg('limit')||5400))
const list=[];for(const tier of tiers)for(const cl of cls)for(let s=0;s<seeds;s++){const o={cl,tier,seed:7919*(s+1)+CLS.indexOf(cl)};o.key=tier+'/'+cl+'/'+o.seed;if(!raw.have.has(o.key))list.push(o)}
const t0=Date.now()
if(list.length){const Q=await pool(par,file?path.resolve(file):undefined);await jobs(Q,list,(t,o)=>{const quick=o.tier==='stand'||o.tier==='afk';return drive(t,o,{flmax,tmax:quick?600:tmax,stop:quick?'__b.R&&__b.R.deaths.length>0':'__b.R&&(__b.R.deaths.length>1||(__b.R.fl.length>3&&__b.R.t-__b.R.fl[__b.R.fl.length-1].t0>600))'})},{ms:600000,log:20,each:(o,r)=>raw.add(o.key,{cl:o.cl,tier:o.tier,seed:o.seed,...r})});await Q.close()}
const rows=[...raw.have.values()].filter(r=>tiers.includes(r.tier))
const cell={};for(const r of rows){const k=r.tier+'/'+r.cl;(cell[k]||(cell[k]=[])).push(r)}
const pick=(a,fl,f)=>stat(a.map(r=>{const x=(r.floors||[]).find(q=>q.fl===fl&&q[f]!=null);return x?x[f]:null}))
const sum={}
for(const[k,a]of Object.entries(cell)){const alive=r=>(r.floors||[]).filter(f=>!r.deaths||!r.deaths.length||f.fl<r.deaths[0].fl||f.t0<r.deaths[0].t),reg=a.flatMap(r=>(r.floors||[]).filter(f=>!f.boss&&!f.prep&&f.tc!=null&&!f.died)),zc=zi=>{const q=reg.filter(f=>Math.floor((f.fl-1)/10)===zi);return q.length?{n:q.length,med:med(q.map(f=>f.tc))}:null},boss=a.flatMap(r=>(r.floors||[]).filter(f=>f.boss&&f.tc!=null)),bossall=a.flatMap(r=>(r.floors||[]).filter(f=>f.boss))
const lpf=a.map(r=>{const f=alive(r).filter(f=>f.lv1!=null&&!f.prep);if(!f.length)return null;const hi=f.reduce((m,x)=>x.fl>m.fl?x:m,f[0]);return hi.fl>1?(hi.lv1-1)/hi.fl:null})
sum[k]={n:a.length,errs:a.filter(r=>r.err||r.jserr).length,reached:stat(a.map(r=>r.floors&&r.floors.length?Math.max(...r.floors.map(f=>f.fl)):null)),firstdeath:stat(a.map(r=>r.deaths&&r.deaths.length?r.deaths[0].fl:flmax+1)),nodeath:a.filter(r=>r.deaths&&!r.deaths.length).length,simt:stat(a.map(r=>r.t)),lvperfloor:stat(lpf),clear:stat(reg.map(f=>f.tc)),nofoe:stat(reg.map(f=>f.nf)),roomw:stat(reg.map(f=>f.W)),roomh:stat(reg.map(f=>f.H)),sizes:new Set(reg.map(f=>f.W+'x'+f.H)).size,clearz:[0,1,2,3].map(zc),bossclear:stat(boss.map(f=>f.tc)),bosswin:bossall.length?+(boss.length/bossall.length).toFixed(2):null,htkreg:stat(a.map(r=>r.htk&&r.htk.reg&&r.htk.reg.med)),htkmini:stat(a.map(r=>r.htk&&r.htk.mini&&r.htk.mini.med)),ttkmini:stat(a.map(r=>r.ttk&&r.ttk.mini&&r.ttk.mini.med)),ttkboss:stat(a.map(r=>r.ttk&&r.ttk.boss&&r.ttk.boss.med)),goldfloor:stat(reg.map(f=>f.g1-f.g0)),dmgfloor:stat(reg.map(f=>f.dmg)),lv5:pick(a,5,'lv1'),lv9:pick(a,9,'lv1'),lv19:pick(a,19,'lv1'),atk9:pick(a,9,'atk'),atk19:pick(a,19,'atk'),mhp9:pick(a,9,'mhp'),gold9:pick(a,9,'g1')}}
const src={};for(const r of rows){if(!r.dmg)continue;const s=src[r.tier]||(src[r.tier]={});for(const[q,v]of Object.entries(r.dmg)){const b=q.split('/')[1];s[b]=+((s[b]||0)+v).toFixed(2)}}
const outf=path.join(here,'out','pacing-'+tag+'.json');fs.writeFileSync(outf,JSON.stringify({when:new Date().toISOString(),file:file||'index.html',seeds,tmax,flmax,sum,src},null,1))
for(const[k,v]of Object.entries(sum))console.log(k.padEnd(14),'reach',v.reached.med,'['+v.reached.p10+'-'+v.reached.p90+']','die1',v.firstdeath.med,'lv/fl',v.lvperfloor.med,'clear',v.clear.med,'nofoe',v.nofoe.med,'room',v.roomw.p10+'-'+v.roomw.p90+'x'+v.roomh.p10+'-'+v.roomh.p90,'boss',v.bossclear.med,'bwin',v.bosswin,'htk',v.htkmini.med,'ttk',v.ttkmini.med,'errs',v.errs)
console.log('wall',Math.round((Date.now()-t0)/1000)+'s, wrote '+outf)
process.exit(0)
