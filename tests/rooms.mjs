import {serve,open,closeall,check,done} from './lib.mjs'
const PAGE=String.raw`
window.__rt=function(seeds){const out={rooms:0,bad:[],arch:{},leftin:0,ins:0,paths:0,badpath:0,repeat:0,ordsame:0,align:0,alignbad:0,unreach:0,inwall:0,sight:0,foes:0,chests:0,pots:0,forks:0,forkzones:0,ms:0}
const t0=performance.now(),bf=bakefloor;bakefloor=function(){};const og2=g;
const clr=()=>{for(const k in zmc)delete zmc[k];for(const k in rgc)delete rgc[k]}
const pr=24,chk=(G,pts)=>{const S=12,nc=Math.ceil(G.W/S),nr=Math.ceil(G.H/S),blk=new Uint8Array(nc*nr),H={},cs=64;for(const o of G.allobs){const k=(o.x/cs|0)+','+(o.y/cs|0);(H[k]||(H[k]=[])).push(o)}const near=(x,y)=>{const a=x/cs|0,b=y/cs|0,L=[];for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const q=H[(a+i)+','+(b+j)];if(q)L.push(...q)}return L},flr=(x,y)=>{const c=Math.floor((x-G.x0)/RC),r=Math.floor((y-G.y0)/RC);return c>=0&&r>=0&&c<G.cols&&r<G.rows&&G.m[r*G.cols+c]===1};for(let j=0;j<nr;j++)for(let i=0;i<nc;i++){const x=G.x0+(i+0.5)*S,y=G.y0+(j+0.5)*S;let b=!flr(x,y)||x<G.x0+pr||y<G.y0+pr||x>G.x0+G.W-pr||y>G.y0+G.H-pr;if(!b)for(const o of near(x,y))if((o.x-x)**2+(o.y-y)**2<(o.r+pr)**2){b=1;break}blk[j*nc+i]=b}
const id=(x,y)=>{const i=Math.floor((x-G.x0)/S),j=Math.floor((y-G.y0)/S);return i<0||j<0||i>=nc||j>=nr?-1:j*nc+i},vis=new Uint8Array(nc*nr),st=[];const s0=id(pts[0][0],pts[0][1]);if(s0<0||blk[s0])return{fail:'start blocked'};vis[s0]=1;st.push(s0);while(st.length){const k=st.pop(),a=k%nc,b=k/nc|0;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const a2=a+dx,b2=b+dy;if(a2<0||b2<0||a2>=nc||b2>=nr)continue;const k2=b2*nc+a2;if(!blk[k2]&&!vis[k2]){vis[k2]=1;st.push(k2)}}}
const reach=(x,y,tol)=>{const i0=Math.floor((x-G.x0)/S),j0=Math.floor((y-G.y0)/S),R=Math.ceil(tol/S);for(let j=j0-R;j<=j0+R;j++)for(let i=i0-R;i<=i0+R;i++){if(i<0||j<0||i>=nc||j>=nr)continue;const cx2=G.x0+(i+0.5)*S,cy2=G.y0+(j+0.5)*S;if(vis[j*nc+i]&&Math.hypot(cx2-x,cy2-y)<=tol)return true}return false};return{reach,flr,near}}
for(const seed of seeds){clr();g=fresh('wizard');g.seed=seed;const prevord=[];for(let zi=0;zi<10;zi++){const M=zmap(seed,0,zi),R=M.nodes.filter(n=>!n.boss);
const ids=R.map(n=>n.arch);if(new Set(ids).size!==ids.length)out.repeat++;if(zi>0&&prevord.join()===M.ord.join())out.ordsame++;prevord.splice(0,9,...M.ord);out.forks+=M.forks.length;out.forkzones++
const paths=[];const walk=(n,acc)=>{if(n.boss){paths.push(acc);return}for(const e of n.ex)walk(M.nodes[e.to],acc.concat(n.id))};walk(M.nodes[0],[]);for(const p of paths){out.paths++;if(p.length!==ROOMS)out.badpath++}
for(const n of R){out.arch[ARCH[n.arch][0]]=(out.arch[ARCH[n.arch][0]]||0)+1;for(const e of n.en){out.ins++;if(e.d==='l')out.leftin++}
for(const e of n.ex){const b=M.nodes[e.to];if(b.boss)continue;const be=b.en.find(q=>q.from===n.id);out.align++;if(!be||be.d!==OPP[e.d]||be.t!==e.t)out.alignbad++}
for(const en of n.en){g.fl=zi*10+n.f;g.node=n.id;g.nz=zi;g.from=en.from;g.next=null;startfloor();out.rooms++;const G=run.G;if(!G.ok)out.bad.push(seed+':'+zi+':'+n.id+' notok');
const C=chk(G,[[run.ent.sx,run.ent.sy]]);if(C.fail){out.unreach++;out.bad.push(seed+':'+zi+':'+n.id+' '+C.fail);continue}
const want=[];{const en=run.ent;for(const[o,dp]of[[40,0],[-40,0],[0,46],[40,46],[-40,46]])want.push(['party spawn',en.sx+(en.ny?o:0)+en.nx*dp,en.sy+(en.nx?o:0)+en.ny*dp,16])}for(const d of G.doors){if(d.ex)want.push(['exit',d.px,d.py,44]);if(d.en)want.push(['door',d.sx,d.sy,16])}
for(const d of run.drops){if(d.k==='chest'){out.chests++;want.push(['chest',d.x,d.y,30])}if(d.k==='pot'){out.pots++;want.push(['pot',d.x,d.y,30])}}
spawnroster();for(const e of run.en){out.foes++;want.push(['foe',e.x,e.y,Math.max(30,e.r)]);if(!C.flr(e.x,e.y)||C.near(e.x,e.y).some(o=>Math.hypot(o.x-e.x,o.y-e.y)<o.r)){out.inwall++;out.bad.push(seed+':'+zi+':'+n.id+' foe in wall '+e.k)}const en2=run.ent;if(los(en2.x+en2.nx*30,en2.y+en2.ny*30,e.x,e.y)&&Math.abs(e.x-en2.x)<980&&Math.abs(e.y-en2.y)<560){out.sight++;if(out.sight<6)out.bad.push(seed+':'+zi+':'+n.id+' foe in sight '+ARCH[n.arch][0])}}
for(const d of run.drops)if(!C.flr(d.x,d.y)||C.near(d.x,d.y).some(o=>Math.hypot(o.x-d.x,o.y-d.y)<o.r)){out.inwall++;out.bad.push(seed+':'+zi+':'+n.id+' drop in wall '+d.k)}
for(const w of want)if(!C.reach(w[1],w[2],w[3])){out.unreach++;if(out.bad.length<40)out.bad.push(seed+':'+zi+':'+n.id+' unreachable '+w[0]+' '+ARCH[n.arch][0])}}}}}
bakefloor=bf;out.ms=Math.round(performance.now()-t0);return out}
window.__det=function(seed){const h=[];for(const k in zmc)delete zmc[k];for(const k in rgc)delete rgc[k];for(let zi=0;zi<10;zi++){const M=zmap(seed,0,zi);for(const n of M.nodes){if(n.boss)continue;const G=genroom(seed,0,zi,n,zi*10+n.f);let s=G.W+','+G.H+','+G.arch+','+G.m.join('')+G.doors.map(d=>d.d+d.x+','+d.y).join()+G.allobs.map(o=>(o.x|0)+','+(o.y|0)+','+o.r).join();let x=0;for(let i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))|0;h.push(x)}}return h.join(',')}`
export async function run(o={}){const {server,url}=await serve(),t=await open(url);await t.ev(PAGE+';0');await t.ev("leavehub();hide();newgame('wizard');0")
const src=await t.ev('[zmap,genroom,navgrid,navflood,msq,ARCH.map(a=>a[1]).join()].map(String).join()');check('rooms: generator never calls gameplay rnd',!/\brnd\(|Math\.random|\bri\(|\bpick\(/.test(src))
const N=o.seeds||200,seeds=Array.from({length:N},(_,i)=>(i*2654435761+12345)>>>0);let T={rooms:0,bad:[],arch:{},leftin:0,ins:0,paths:0,badpath:0,repeat:0,ordsame:0,align:0,alignbad:0,unreach:0,inwall:0,sight:0,foes:0,chests:0,pots:0,forks:0,forkzones:0,ms:0}
for(let i=0;i<N;i+=10){const r=await t.ev(`JSON.stringify(window.__rt(${JSON.stringify(seeds.slice(i,i+10))}))`),q=JSON.parse(r);for(const k in q){if(k==='arch'){for(const a in q.arch)T.arch[a]=(T.arch[a]||0)+q.arch[a]}else if(Array.isArray(q[k]))T[k].push(...q[k]);else T[k]+=q[k]}}
const nA=await t.ev('ARCH.length');check('rooms: at least 24 archetypes',nA>=24,nA+' archetypes')
check('rooms: generated '+T.rooms+' room entries over '+N+' seeds',T.rooms>=N*90,Math.round(T.ms/1000)+'s')
check('rooms: every route is exactly '+9+' rooms',T.badpath===0,T.paths+' routes, '+T.badpath+' bad')
check('rooms: no archetype repeats within a zone',T.repeat===0,T.repeat+' zones with repeats')
check('rooms: consecutive zones never share the same ordering',T.ordsame===0,T.ordsame+' same')
check('rooms: doors align on both sides of every connection',T.alignbad===0,T.align+' links, '+T.alignbad+' bad')
check('rooms: exit, doors, every foe, chest and pot reachable with player radius',T.unreach===0,T.unreach+' unreachable; '+T.bad.slice(0,6).join(' | '))
check('rooms: nothing spawns in a wall',T.inwall===0,T.inwall+' in walls')
check('rooms: no foe within sight of the entrance door (line of sight and inside a 1960 by 1120 view around it)',T.sight===0,T.sight+' of '+T.foes+' foes in sight')
check('rooms: generator validated every room',!T.bad.some(b=>/notok/.test(b)),T.bad.filter(b=>/notok/.test(b)).length+' not ok')
check('rooms: 2 or 3 forks per zone',T.forks>=2*T.forkzones&&T.forks<=3*T.forkzones,(T.forks/T.forkzones).toFixed(2)+' per zone')
const lf=T.leftin/T.ins;check('rooms: most rooms enter on the left',lf>0.5,(lf*100).toFixed(1)+'% left entrances')
const d1=await t.ev('window.__det(424242)'),d2=await t.ev('window.__det(424242)'),d3=await t.ev('window.__det(424243)');check('rooms: same seed gives identical dungeon',d1===d2&&d1!==d3)
console.log('archetype distribution: '+Object.entries(T.arch).sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+' '+v).join(', '))
console.log('foes '+T.foes+', chests '+T.chests+', pots '+T.pots)
check('rooms: no JS errors',!t.errs.length,t.errs.slice(0,3).join(' | '));await closeall();server.close();return T}
if(import.meta.url===`file://${process.argv[1]}`)run({seeds:+(process.argv[2]||200)}).then(done)
