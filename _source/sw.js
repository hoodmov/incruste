/* Mode hors ligne – La Grande Incruste 3 */
const CORE='__CORE__',IMG='lgi-img-v2',VID='lgi-vid-v1',RUN='lgi-run-v1';
const FILES=['./','index.html','live.html','textes.json','diffusion.js','pdt.js','pdt.json','clean.js','offline.js','manifest.json','icon-192.png','icon-512.png'];
const IMGS=__IMGS__;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil((async()=>{
  const c=await caches.open(CORE);await Promise.all(FILES.map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})));
  const ic=await caches.open(IMG);const todo=[];for(const u of IMGS){if(!(await ic.match(u)))todo.push(u)}
  for(let i=0;i<todo.length;i+=8){await Promise.all(todo.slice(i,i+8).map(u=>ic.add(u).catch(()=>{})))}
})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys()){if((k.startsWith('lgi-core-')&&k!==CORE)||(k.startsWith('lgi-img-')&&k!==IMG))await caches.delete(k)}
  await self.clients.claim()})())});
async function networkFirst(req){
  const cache=await caches.open(CORE);
  const net=fetch(req).then(r=>{if(r&&r.ok)cache.put(req,r.clone());return r});net.catch(()=>{});
  const to=new Promise(res=>setTimeout(()=>res(null),4000));
  try{const r=await Promise.race([net,to]);if(r)return r}catch(e){}
  const c=await cache.match(req,{ignoreSearch:true})||(req.mode==='navigate'?await cache.match('index.html'):null);
  return c||net}
async function cacheFirst(req,name){const c=await caches.open(name);const h=await c.match(req.url);if(h)return h;
  const r=await fetch(req);if(r&&r.ok)c.put(req.url,r.clone());return r}
async function ranged(req,resp){const m=/bytes=(\d*)-(\d*)/.exec(req.headers.get('range')||'');if(!m||!resp)return resp;
  const b=await resp.blob(),size=b.size;let s=m[1]?+m[1]:0,e=m[2]?+m[2]:size-1;if(!m[1]&&m[2]){s=Math.max(0,size-+m[2]);e=size-1}e=Math.min(e,size-1);
  return new Response(b.slice(s,e+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':resp.headers.get('Content-Type')||'video/mp4','Content-Range':'bytes '+s+'-'+e+'/'+size,'Content-Length':String(e-s+1)}})}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const u=new URL(req.url);
  if(u.origin===location.origin){
    if(u.pathname.includes('/lama/'))return;
    if(u.pathname.includes('/img/')){e.respondWith(cacheFirst(req,IMG));return}
    if(u.pathname.includes('/vid/')){e.respondWith((async()=>{const c=await caches.open(VID);const h=await c.match(u.href);return h?ranged(req,h):fetch(req)})());return}
    e.respondWith(networkFirst(req));return}
  if(u.hostname==='raw.githubusercontent.com'){e.respondWith((async()=>{const c=await caches.open(RUN);const h=await c.match(u.href);if(h)return h;
    const r=await fetch(u.href,{mode:'cors'});if(r.ok)c.put(u.href,r.clone());return r})());return}
  if(u.hostname==='cdn.jsdelivr.net'&&u.pathname.includes('onnxruntime-web')){e.respondWith(cacheFirst(req,RUN));return}
  if(u.hostname==='cdnjs.cloudflare.com'&&u.pathname.includes('qrcode-generator')){e.respondWith(cacheFirst(req,RUN));return}
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith((async()=>{const c=await caches.open(RUN);const h=await c.match(req);
    const n=fetch(req).then(r=>{c.put(req,r.clone());return r}).catch(()=>h);return h||n})())}
});
