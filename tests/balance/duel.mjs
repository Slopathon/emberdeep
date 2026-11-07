import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {pool,jobs,deadline,stat,med,jsonl} from './pool.mjs'
import {PARTY} from '../bot.mjs'
const here=path.dirname(fileURLToPath(import.meta.url))
export const CLS=['wizard','bow','rogue','priest','knight']
export const DUELBOT=PARTY+String.raw`
window.__db=function(dt){const p=CUR;if(!p||!p.P||p.down||p.gone||!run||!run.duel)return;dsc(p);try{__dbp(p,dt)}finally{dsc(null)}}
window.__dbp=function(p,dt){const T=__T[p.__t||'mid']||__T.mid,B=p.__b||(p.__b={dc:0,lv:[0,0],sd:0,side:p.id%2?1:-1});if(T.afk){__keys(0,0);if(!__I())autofire=false;else __I().au=0;return}if(__I())__I().au=1;else{autofire=true;mouse.down=false}if(T.stand){__keys(0,0);return}
let tgt=null,bd=1e9;for(const e of run.en){if(e.dead||!e.pv)continue;const d=Math.hypot(e.x-P.x,e.y-P.y);if(d<bd){bd=d;tgt=e}}
if(T.pot&&P.hp<S.mhp*T.pot*0.8&&g.pots>0)potion()
B.dc-=dt;if(B.dc>0){__keys(B.lv[0],B.lv[1]);return}B.dc=Math.max(0.05,T.dec||0.05)
let v=[0,0];if(tgt){const mel=g.cl==='rogue'||g.cl==='knight',want=mel?tgt.r+P.r+16:Math.min(330,wrng()*0.7);if(bd>want+40)v=[tgt.x-P.x,tgt.y-P.y];else if(bd<want-50)v=[P.x-tgt.x,P.y-tgt.y];else v=[-(tgt.y-P.y)*B.side,(tgt.x-P.x)*B.side];if(Math.random()<0.6*dt)B.side=-B.side}
if(T.tw>0){let h=null;for(const q of PL){if(q===p||q.gone||dsame(q,p))continue;for(const b of q.R.bolts||[]){if(b.dead)continue;const rx=P.x-b.x,ry=P.y-b.y,vv=b.vx*b.vx+b.vy*b.vy;if(vv<1||rx*rx+ry*ry>300*300)continue;const tc=(rx*b.vx+ry*b.vy)/vv;if(tc<0||tc>0.4)continue;const cx2=b.x+b.vx*tc-P.x,cy2=b.y+b.vy*tc-P.y;if(cx2*cx2+cy2*cy2<(b.r+P.r+8)**2){h=b;break}}if(h)break}if(h&&Math.random()<T.tw){const l=Math.hypot(h.vx,h.vy)||1;v=[-h.vy/l*100*B.side,h.vx/l*100*B.side];if(P.dch>=1&&Math.random()<T.roll){__keys(v[0],v[1]);dodge()}}}
if(T.jit){const a=Math.random()*6.283,l=Math.hypot(v[0],v[1])||1;v=[(v[0]/l+Math.cos(a)*T.jit*2)*100,(v[1]/l+Math.sin(a)*T.jit*2)*100]}
B.lv=v;__keys(v[0],v[1])
if(tgt&&(g.cl==='rogue'||g.cl==='knight')&&bd>110&&bd<300&&P.dch>=1&&Math.random()<(T.roll||0)){__keys(tgt.x-P.x,tgt.y-P.y);dodge()}
if(T.sk&&tgt&&bd<520){B.sd-=dt;if(B.sd<=0)for(let i=0;i<g.acts.length;i++){const k=g.acts[i];if(P.cd[k]<=0&&Math.random()<T.sk){aov={x:tgt.x,y:tgt.y};cast(i);aov=null;B.sd=Math.max(0.3,T.skd||0);break}}}}
window.__duel=function(o){if(!window.__mute){window.__mute=1;sfx=function(){}}__tier(o.tier||'mid');__seed(o.seed||1);hide();if(inhub)leavehub();hide();const c=o.cls;SET.cl=c[0];g=fresh(c[0]);g.seed=o.seed>>>0;PL=null;startfloor();__mkparty(c.slice(1));const T={};PL.forEach((p,i)=>{T[p.id]=o.teams[i];p.__t=(o.tiers&&o.tiers[i])||o.tier||'mid';p.__b=null;p.nm=p.nm||'P1'});duelset(T,o.seed);startfloor();for(const p of PL)p.P.hp=p.S.mhp;window.__bot=__db;return 1}
window.__dout=function(){return JSON.stringify({w:run.duel?run.duel.w:null,t:Math.round(run.t*10)/10,pl:PL.map(p=>({cl:p.cl,team:DU[p.id],tier:p.__t,hp:Math.round(Math.max(0,p.P.hp)/p.S.mhp*100)/100,mhp:Math.round(p.S.mhp),down:p.down,dmg:Math.round(p.g.cst.dmg),tk:Math.round(p.g.cst.tk)}))})}
`
export async function duel(t,o,tmax=240){await t.ev(DUELBOT+';0');await t.ev(`__duel(${JSON.stringify(o)});0`);for(let s=0;s<tmax;s+=30){const r=await t.ev(`__sim(30,()=>run&&run.duel&&run.duel.w!=null)`);if(r!=='time')break}return JSON.parse(await t.ev('__dout()'))}
function combos(n,k){const out=[];const rec=(s,a)=>{if(a.length===k){out.push(a.slice());return}for(let i=s;i<n;i++){a.push(CLS[i]);rec(i,a);a.pop()}};rec(0,[]);return out}
export function matchups(kind){const L=[];if(kind==='1v1'){for(let i=0;i<5;i++)for(let j=i;j<5;j++)L.push({a:[CLS[i]],b:[CLS[j]]})}else if(kind==='2v2'){const P=combos(5,2);for(let i=0;i<P.length;i++)for(let j=i;j<P.length;j++)L.push({a:P[i],b:P[j]})}else if(kind==='big'){const P2=combos(5,2),P3=combos(5,3);let s=7;const r=()=>(s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff;for(let i=0;i<12;i++)L.push({a:P3[Math.floor(r()*P3.length)],b:P2[Math.floor(r()*P2.length)]});for(let i=0;i<6;i++)L.push({a:[CLS[i%5]],b:combos(5,4)[Math.floor(r()*70)%combos(5,4).length]});for(let i=0;i<6;i++)L.push({a:P3[Math.floor(r()*P3.length)],b:P3[Math.floor(r()*P3.length)]})}return L}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const a=Object.fromEntries(process.argv.slice(2).map(x=>x.replace(/^--/,'').split('=')).map(([k,v])=>[k,v??'1']))
const kind=a.kind||'1v1',seeds=+a.seeds||20,par=+a.par||6,tier=a.tier||'mid',tag=a.tag||kind;deadline(+a.limit||3000)
const out=path.join(here,'out');fs.mkdirSync(out,{recursive:true});const J=jsonl(path.join(out,'duel-'+tag+'.jsonl'))
const list=[];for(const m of matchups(kind))for(let s=1;s<=seeds;s++){const sw=s%2===0,cls=sw?[...m.b,...m.a]:[...m.a,...m.b],teams=sw?[...m.b.map(()=>1),...m.a.map(()=>2)]:[...m.a.map(()=>1),...m.b.map(()=>2)],key=m.a.join('+')+'|'+m.b.join('+')+'|'+s;if(!J.have.has(key))list.push({key,m,s,sw,o:{cls,teams,seed:s*7919+13,tier}})}
console.log(list.length,'duels to run');const Q=await pool(par,a.file);let n=0
await jobs(Q,list,async(t,j)=>{const r=await duel(t,j.o,+a.tmax||240);const wa=r.w==null?null:r.w===0?0.5:((r.w===1)!==j.sw?1:0);J.add(j.key,{a:j.m.a,b:j.m.b,seed:j.s,wa,t:r.t,w:r.w,pl:r.pl});if(++n%20===0)console.log(' ',n,'/',list.length);return r},{ms:300000})
await Q.close()
const rows={};for(const v of J.have.values()){const k=v.a.join('+')+' vs '+v.b.join('+');(rows[k]||(rows[k]={a:v.a,b:v.b,wa:[],t:[],to:0})).wa.push(v.wa);rows[k].t.push(v.t);if(v.w==null)rows[k].to++}
const sum=Object.entries(rows).map(([k,r])=>({k,n:r.wa.length,awin:r.wa.filter(x=>x!=null).length?Math.round(r.wa.filter(x=>x!=null).reduce((s,x)=>s+x,0)/r.wa.filter(x=>x!=null).length*100)/100:null,t:stat(r.t),timeouts:r.to}))
for(const s of sum)console.log(s.k.padEnd(48),'A wins',s.awin,'time med',s.t.med,'p10',s.t.p10,'p90',s.t.p90,'timeouts',s.timeouts)
fs.writeFileSync(path.join(out,'duel-'+tag+'.json'),JSON.stringify({when:new Date().toISOString(),kind,seeds,tier,sum},null,1));process.exit(0)}
