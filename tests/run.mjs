import {done,check,closeall} from './lib.mjs'
const want=process.argv.slice(2),all=['static','rooms','solo','afk','autocast','items','relay','lobby','party','camp','animals','autorange','sound','feedback','phone','perf','art']
const pick=want.length?want:all
for(const k of pick){console.log('\n== '+k);let m;try{m=await import('./'+k+'.mjs')}catch(e){check(k+': suite present',false,e.message.split('\n')[0]);continue}try{await m.run({})}catch(e){check(k+': suite ran without throwing',false,String(e&&e.stack||e).split('\n').slice(0,3).join(' '))}}
try{await closeall()}catch(e){}
done();process.exit()
