import os from 'node:os'
import {execSync} from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
const req=createRequire(import.meta.url)
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
export function pw(){for(const p of ['playwright','/opt/node22/lib/node_modules/playwright','/usr/local/lib/node_modules_global/playwright']){try{return req(p)}catch(e){}}throw new Error('playwright not found, run npm i in tests/')}
export function patched(file){const src=fs.readFileSync(file||path.join(root,'index.html'),'utf8'),m='})()\n</script>',n=src.split(m).length-1;if(n!==1)throw new Error('hook anchor count '+n);return src.replace(/const RELAY='[^']*'/,"const RELAY=''").replace(m,'window.__t={ev:s=>eval(s)};window.__fr=0;(function q(){window.__fr++;requestAnimationFrame(q)})();})()\n</script>')}
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'}
export function serve(port=0,file){const html=patched(file);return new Promise(r=>{const s=http.createServer((q,res)=>{let u=decodeURIComponent(q.url.split('?')[0].split('#')[0]);if(u==='/'||u==='/index.html'){res.writeHead(200,{'content-type':'text/html'});res.end(html);return}const f=path.join(root,path.normalize(u).replace(/^(\.\.[/\\])+/,''));if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end();return}res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res)});s.listen(port,'127.0.0.1',()=>r({server:s,url:'http://127.0.0.1:'+s.address().port+'/'}))})}
let browser=null
export async function launch(){if(!browser)browser=await pw().chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});return browser}
export async function closeall(){if(browser){await browser.close();browser=null}}
export async function open(url,o={}){const b=await launch(),ctx=await b.newContext({viewport:o.viewport||{width:1280,height:800},deviceScaleFactor:o.dsf||1,hasTouch:!!o.touch,isMobile:!!o.mobile,userAgent:o.ua});await ctx.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());const page=await ctx.newPage(),errs=[];page.on('pageerror',e=>errs.push(String(e&&e.stack||e)));page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});await page.goto(url+(o.q||''));await page.waitForFunction(()=>window.__t&&window.__fr>2);const ev=s=>page.evaluate(s=>window.__t.ev(s),s);return{page,ctx,errs,ev,close:()=>ctx.close()}}
let fails=0,passes=0
export function check(name,ok,info=''){if(ok){passes++;console.log('pass '+name+(info?' ('+info+')':''))}else{fails++;console.log('FAIL '+name+(info?' ('+info+')':''))}return ok}
export function summary(){return{fails,passes}}
export function done(){console.log(`\n${passes} passed, ${fails} failed`);process.exitCode=fails?1:0}
export const sleep=ms=>new Promise(r=>setTimeout(r,ms))
export async function alive(t,ms=400){const a=await t.page.evaluate(()=>window.__fr),l0=await t.ev('last');await sleep(ms);const b=await t.page.evaluate(()=>window.__fr),l1=await t.ev('last');return b>a&&l1>l0}
export function baseline(){const f=path.join(os.tmpdir(),'emberdeep-baseline.html');try{fs.writeFileSync(f,execSync('git show 9a5add7:index.html',{cwd:root,maxBuffer:1<<24}));return f}catch(e){return null}}
