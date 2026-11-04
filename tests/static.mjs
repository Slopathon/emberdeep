import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import {root,check} from './lib.mjs'
export async function run(){const s=fs.readFileSync(path.join(root,'index.html'),'utf8'),m=s.match(/<script>([\s\S]*?)<\/script>/g)||[];check('static: one inline script',m.length===1,m.length+' found');const js=m[0].replace(/^<script>|<\/script>$/g,'');let ok=1,err='';try{new vm.Script(js)}catch(e){ok=0;err=e.message}check('static: inline script compiles',ok,err);const names={};for(const x of js.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g))names[x[1]]=(names[x[1]]||0)+1;const dup=Object.keys(names).filter(k=>names[k]>1);check('static: no duplicate function names',!dup.length,dup.join(',')||Object.keys(names).length+' functions');check('static: no test hooks shipped',!/window\.__t\b/.test(s));check('static: no Pixelify font',!/pixelify/i.test(s));check('static: no em dash',!/—/.test(s))}
if(import.meta.url===`file://${process.argv[1]}`)run().then(()=>import('./lib.mjs').then(l=>l.done()))
