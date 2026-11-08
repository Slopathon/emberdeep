import {serve,open,closeall,check} from './lib.mjs'
function kit(){const LT=new Float32Array(256);for(let i=0;i<256;i++){const v=i/255;LT[i]=v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}
const lum=(r,g,b)=>0.2126*LT[r]+0.7152*LT[g]+0.0722*LT[b],dl=(r,g,b)=>{const R=LT[r],G=LT[g],B=LT[b],m=0.29275*R+0.70725*G;return 0.2126*m+0.7152*m+0.0722*(-0.02234*R+0.02234*G+B)},cr=(a,b)=>(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)
const pc=(a,q)=>{if(!a.length)return 0;const s=Float64Array.from(a).sort();return s[Math.min(s.length-1,Math.floor(s.length*q))]},med=a=>pc(a,0.5),T0=123456,r2=v=>Math.round(v*100)/100
const fr=()=>draw(0,T0),grab=(x,y,R)=>{const sx=Math.round(((x-cam.x)*zm+vw/2)*dpr),sy=Math.round(((y-cam.y)*zm+vh/2)*dpr),r=Math.round(R*zm*dpr);return cx0.getImageData(sx-r,sy-r,r*2,r*2).data}
const cmp=(a,b,sk)=>{const n=[],d=[];for(let i=0;i<a.length;i+=4){const r0=a[i],g0=a[i+1],b0=a[i+2],r1=b[i],g1=b[i+1],b1=b[i+2];if(Math.abs(r0-r1)+Math.abs(g0-g1)+Math.abs(b0-b1)<24)continue;if(sk&&r1<=r0&&g1<=g0&&b1<=b0){const k0=r1/(r0||1),k1=g1/(g0||1),k2=b1/(b0||1);if(Math.max(k0,k1,k2)-Math.min(k0,k1,k2)<0.12)continue}n.push(cr(lum(r0,g0,b0),lum(r1,g1,b1)));d.push(cr(dl(r0,g0,b0),dl(r1,g1,b1)))}return{n:n.length,med:med(n),p90:pc(n,0.9),dmed:med(d),dp90:pc(d,0.9)}}
const setz=zi=>{leavehub();hide();newgame('wizard');g.fl=zi*10+3;startfloor();run.en.length=0;run.shots.length=0;run.tele.length=0;run.drops.length=0;run.portal=null;run.lava.length=0;pt.length=0;fx.length=0;tx.length=0;ovk='art';shk=0;redf=0;const Q=run.rm;if(Q){P.x=(Q.x0+Q.x1)/2;P.y=Q.cy}P.vx=P.vy=0;draw(0.5,T0);draw(0.5,T0)}
const spots=()=>{const L=[],Q=run.rm;if(!Q)return L;for(let i=1;i<500&&L.length<3;i++){const x=Q.x0+130+((i*0.618034)%1)*(Q.x1-Q.x0-260),y=Q.y0+130+((i*0.7548777)%1)*(Q.y1-Q.y0-260);let ok=!inobs(x,y);for(let k=0;k<8&&ok;k++){const t=k*0.785;if(inobs(x+Math.cos(t)*95,y+Math.sin(t)*95))ok=false}if(ok&&run.obs&&run.obs.some(o=>o.r&&Math.hypot(o.x-x,o.y-y)<o.r+90))ok=false;if(!ok||L.some(q=>Math.hypot(q.x-x,q.y-y)<220))continue;if(view({x,y}))L.push({x,y})}return L}
const view=p=>{const Q=run.rm;P.x=p.x-240<Q.x0+40?p.x+240:p.x-240;P.y=p.y;P.vx=P.vy=0;draw(0.5,T0);draw(0.5,T0);const sx=(p.x-cam.x)*zm+vw/2,sy=(p.y-cam.y)*zm+vh/2;return sx>190&&sx<vw-190&&sy>170&&sy<vh-170}
const one=(e,R)=>{run.en.length=0;run.en.push(e);e.hide=1;fr();const a=grab(e.x,e.y,R);e.hide=0;fr();const b=grab(e.x,e.y,R);run.en.length=0;return cmp(a,b,1)}
const BR=[50,48,58,50,54,52,50,62,50,60]
const mkboss=(zi,x,y)=>{const z=zones[zi],b=mkmob('boss',x,y);b.n=z.boss;b.c=z.ac;b.boss=1;b.bz=zi;b.r=BR[zi];b.cd2=2.2;b.pi=0;b.phs=0;b.act=null;b.sc=1+0.11*zi;b.vs=1+0.05*zi;b.tl=1-0.035*zi;b.cm=1-0.035*zi;if(zi===4)b.sc=b.vs=b.tl=b.cm=1;return b}
const TL=[['circle',p=>({k:'c',x:p.x,y:p.y,r:70}),80],['line',p=>({k:'l',x:p.x-110,y:p.y,ux:1,uy:0,len:220,w:44}),120],['ring',p=>({k:'w',x:p.x,y:p.y,r:70,w:10}),85],['tile',p=>({k:'r',x:p.x,y:p.y,s:120}),75],['cone',p=>({k:'cone',x:p.x-100,y:p.y,a:0,arc:0.9,len:200}),110],['nod',p=>({k:'c',x:p.x,y:p.y,r:60,nod:1}),70],['donut',p=>({k:'d',x:p.x,y:p.y,r0:30,r:75}),85]]
window.__art={zone(zi){setz(zi);const S=spots(),out={mob:{},mini:{},boss:null,tele:{},spots:S.length};if(!S.length){ovk=null;return JSON.stringify(out)}
const add=(o,k,v)=>(o[k]||(o[k]=[])).push(v);out.boss=[]
for(const p of S){view(p);for(const k of Object.keys(mt)){if(k==='boss')continue;const e=mkmob(k,p.x,p.y);add(out.mob,k,one(e,e.r*2.2+14))}for(const k of Object.keys(MB)){if(k==='dummy')continue;const e=mkmini(k,p.x,p.y);add(out.mini,k,one(e,e.r*2.2+14))}const e=mkboss(zi,p.x,p.y);out.boss.push(one(e,e.r*2.4+10))}
const p=S[0];view(p);for(const [n,f,R] of TL){const t={...f(p),t:0.5,m:1,dmg:1,pct:0,src:null};run.tele.length=0;fr();const a=grab(p.x,p.y,R);run.tele.push(t);fr();const b=grab(p.x,p.y,R);run.tele.length=0;out.tele[n]=cmp(a,b,0)}
ovk=null;return JSON.stringify(out,(k,v)=>typeof v==='number'?r2(v):v)},
hero(cl,an,st,hp,now){if(!g||!run||P.cl0!==cl){leavehub();hide();newgame(cl);run.en.length=0;P.cl0=cl}ovk='art';const c=document.createElement('canvas');c.width=c.height=200;const x=c.getContext('2d'),old=cx;cos().an=an;P.vx=st==='walk'?200:0;P.vy=0;P.fl=st==='hurt'?0.2:0;P.rec=st==='atk'?1:0;P.lt=st==='atk'?run.t:-9;P.la=0;P.inv=0;P.anf=null;P.hp=S.mhp*hp;if(CUR)CUR.down=st==='down'?1:0;P.an={};cx=x;try{cx.translate(100-P.x,110-P.y);drawp(now)}finally{cx=old;if(CUR)CUR.down=0}return x.getImageData(0,0,200,200).data},
herotest(cl,ANS){const iou=(a,b)=>{let i=0,u=0;for(let k=3;k<a.length;k+=4){const p=a[k]>40,q=b[k]>40;if(p&&q)i++;if(p||q)u++}return u?i/u:1},delta=(a,b)=>{let d=0,u=0;for(let k=0;k<a.length;k+=4){const p=a[k+3]>40,q=b[k+3]>40;if(!p&&!q)continue;u++;if(Math.abs(a[k]-b[k])+Math.abs(a[k+1]-b[k+1])+Math.abs(a[k+2]-b[k+2])+Math.abs(a[k+3]-b[k+3])>60)d++}return u?d/u:0},H=this.hero,N=200000
const idle=H(cl,'cat','idle',1,N),wf=[];for(let i=0;i<8;i++)wf.push(H(cl,'cat','walk',1,N+i*125));let mn=1;for(let i=0;i<8;i++)for(let j=i+1;j<8;j++)mn=Math.min(mn,iou(wf[i],wf[j]))
const o={walk:mn,atk:delta(idle,H(cl,'cat','atk',1,N)),hurt:delta(idle,H(cl,'cat','hurt',1,N)),down:iou(idle,H(cl,'cat','down',1,N)),cur:!!CUR,dmg:{}};for(const an of ANS)o.dmg[an]=delta(H(cl,an,'idle',1,N),H(cl,an,'idle',0.2,N));ovk=null;return JSON.stringify(o,(k,v)=>typeof v==='number'?r2(v):v)},
windtest(){setz(0);const Q=run.rm,x0=(Q.x0+Q.x1)/2,y0=Q.cy,W=260,N=200000,out={}
const snap=e=>{const c=document.createElement('canvas');c.width=c.height=W;const x=c.getContext('2d'),old=cx,b0=e.boss;e.boss=1;cx=x;try{cx.translate(W/2-e.x,W*0.6-e.y);enart.mini(e,N)}finally{cx=old;e.boss=b0}return x.getImageData(0,0,W,W).data}
const iou=(a,b)=>{let i=0,u=0;for(let k=3;k<a.length;k+=4){const p=a[k]>40,q=b[k]>40;if(p&&q)i++;if(p||q)u++}return u?i/u:1}
const pin=()=>{P.x=x0;P.y=y0;P.vx=P.vy=0;P.hp=S.mhp;P.inv=999}
for(const k of Object.keys(MB)){if(k==='dummy')continue;run.en.length=0;run.tele.length=0;run.shots.length=0;run.lava.length=0;pin();const e=mkmini(k,x0+150,y0);e.sleep=0;run.en.push(e);let live=0,bad=0,on=0,sh=null,sx=0,sy=0
for(let i=0;i<1500;i++){run.t+=1/60;updenemies(1/60);updtele(1/60);pin();if(e.dead||e.hide)continue;const L=run.tele.some(t=>t.src===e),m=enart.ms(e,Math.hypot(P.x-e.x,P.y-e.y));if(L){live++;if(!m)bad++}if(m===1&&(L||e.state)){on++;if(on===8&&!sh){sh=snap(e);sx=e.x;sy=e.y}}}
run.en.length=0;run.tele.length=0;let v=null;if(sh){const f=mkmini(k,sx,sy);f.sleep=0;f.cd=9;f.t1=9;f.mir=k==='mirrorglass'?1:0;if(k==='tideeel'){f.state='up';f.wt=2}v=iou(sh,snap(f))}out[k]={live,bad,iou:v}}
ovk=null;run.en.length=0;run.tele.length=0;return JSON.stringify(out,(k,v)=>typeof v==='number'?r2(v):v)}}}
const r2=v=>Math.round(v*100)/100
export async function run(){const {server,url}=await serve(),t=await open(url,{viewport:{width:1280,height:800}}),res={zones:[],hero:{}}
await t.ev(`(${kit})();0`)
const Z=JSON.parse(await t.ev('JSON.stringify(zones.map(z=>z.n))'))
for(let zi=0;zi<Z.length;zi++){const t0=Date.now();res.zones.push(JSON.parse(await t.ev(`__art.zone(${zi})`)));if(process.env.ARTLOG)console.log(Z[zi],res.zones[zi].spots,'spots',Date.now()-t0,'ms')}
check('art: every zone has open floor to test on',res.zones.every(z=>z.spots>0),res.zones.map((z,i)=>Z[i]+' '+z.spots).join(', '))
const worst=(kind,f)=>{const L=[];res.zones.forEach((z,zi)=>{const o=kind==='boss'?{boss:z.boss}:z[kind];for(const k in o){const v=o[k];if(!v)continue;L.push({k,z:Z[zi],v:f(v)})}});return L.sort((a,b)=>a.v-b.v)}
const mm=a=>med(a.map(x=>x.med))
for(const kind of['mob','mini','boss']){const L=worst(kind,mm),bad=L.filter(x=>x.v<3);check(`art: every ${kind==='mob'?'enemy':kind==='mini'?'miniboss':'boss'} keeps 3:1 contrast against every zone floor`,!bad.length,(bad.length?bad.length+' of '+L.length+' below, worst ':'worst ')+L.slice(0,4).map(x=>x.k+'@'+x.z+' '+r2(x.v)).join(', '))}
const tw=[];res.zones.forEach((z,zi)=>{for(const k in z.tele){const v=z.tele[k];tw.push({k,z:Z[zi],e:v.p90,f:v.med,de:v.dp90,df:v.dmed})}})
const te=tw.filter(x=>Math.min(x.e,x.de)<3),tf=tw.filter(x=>Math.min(x.f,x.df)<1.5)
check('art: telegraph edges keep 3:1 contrast on every floor, also with deuteranopia simulated',!te.length,te.length?te.length+' of '+tw.length+' below, e.g. '+te.slice(0,4).map(x=>x.k+'@'+x.z+' '+r2(x.e)+'/'+r2(x.de)).join(', '):'min '+r2(Math.min(...tw.map(x=>Math.min(x.e,x.de)))))
check('art: telegraph fills keep 1.5:1 contrast on every floor, also with deuteranopia simulated',!tf.length,tf.length?tf.length+' of '+tw.length+' below, e.g. '+tf.slice(0,4).map(x=>x.k+'@'+x.z+' '+r2(x.f)+'/'+r2(x.df)).join(', '):'min '+r2(Math.min(...tw.map(x=>Math.min(x.f,x.df)))))
const CLS=JSON.parse(await t.ev('JSON.stringify(Object.keys(CL))')),ANS=JSON.parse(await t.ev('JSON.stringify(Object.keys(AN))'))
const walk=[],atk=[],hurt=[],down=[],dmg=[]
for(const cl of CLS){const o=JSON.parse(await t.ev(`__art.herotest('${cl}',${JSON.stringify(ANS)})`));walk.push({cl,v:o.walk});atk.push({cl,v:o.atk});hurt.push({cl,v:o.hurt});down.push({cl,v:o.down});for(const an in o.dmg)dmg.push({cl,an,v:o.dmg[an]})}
res.hero={walk,atk,hurt,down,dmg}
const f=(L,bad,lab)=>(L.filter(bad).length?L.filter(bad).length+' of '+L.length+' fail: ':'all pass: ')+L.map(x=>(x.an?x.cl+'/'+x.an:x.cl)+' '+r2(x.v)).slice(0,lab||5).join(', ')
check('art: walk cycle frames differ, the most different pair of walk frames overlaps under 80%',walk.every(x=>x.v<0.8),f(walk,x=>x.v>=0.8))
check('art: the attack pose changes at least 12% of the hero',atk.every(x=>x.v>=0.12),f(atk,x=>x.v<0.12))
check('art: the hurt pose changes at least 12% of the hero',hurt.every(x=>x.v>=0.12),f(hurt,x=>x.v<0.12))
const fk=JSON.parse(await t.ev(`new Promise(res=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;c.getContext('2d').drawImage(i,0,0);const a=c.getContext('2d').getImageData(0,0,c.width,c.height).data,b=pxflc(c,1).getContext('2d').getImageData(0,0,c.width,c.height).data;let ink=0,kept=0,cl=0,fl=0;for(let k=0;k<a.length;k+=4){if(a[k+3]<200)continue;const same=a[k]===b[k]&&a[k+1]===b[k+1]&&a[k+2]===b[k+2];if(a[k]*0.3+a[k+1]*0.59+a[k+2]*0.11<46){ink++;kept+=same}else{cl++;fl+=!same}}res(JSON.stringify({ink:kept/ink,cloth:fl/cl}))};i.onerror=()=>res('{}');i.src='heroes.png'})`))
check('art: the hit flash on the hero atlas keeps every ink outline pixel and tints the rest',fk.ink===1&&fk.cloth>0.9,JSON.stringify(fk))
check('art: the down pose has a different silhouette, under 80% overlap with standing',down.every(x=>x.v<0.8),f(down,x=>x.v>=0.8))
check('art: every class and animal looks damaged at 20% health, at least 8% of the hero changes',dmg.every(x=>x.v>=0.08),f(dmg.slice().sort((a,b)=>a.v-b.v),x=>x.v<0.08,6))
const W=JSON.parse(await t.ev('__art.windtest()')),WK=Object.keys(W),wl=(bad,v)=>{const L=WK.filter(bad);return(L.length?L.length+' of '+WK.length+' fail: '+L:'all '+WK.length+' pass')+', '+WK.map(k=>k+' '+v(W[k])).join(', ')};res.wind=W
check('art: every miniboss holds a wind-up pose for the whole telegraph of its attack',WK.every(k=>W[k].live>0&&!W[k].bad),wl(k=>!(W[k].live>0&&!W[k].bad),o=>o.bad+'/'+o.live))
check('art: every miniboss wind-up changes its silhouette, under 85% overlap with idle',WK.every(k=>W[k].iou!=null&&W[k].iou<0.85),wl(k=>!(W[k].iou!=null&&W[k].iou<0.85),o=>o.iou))
check('art: no page errors',!t.errs.length,t.errs.slice(0,2).join(' | '))
if(process.env.ARTOUT)(await import('node:fs')).writeFileSync(process.env.ARTOUT,JSON.stringify(res))
await t.close();await closeall();server.close();return res}
function med(a){if(!a.length)return 0;const s=a.slice().sort((x,y)=>x-y);return s[s.length>>1]}
if(import.meta.url===`file://${process.argv[1]}`)run().then(async()=>(await import('./lib.mjs')).done())
