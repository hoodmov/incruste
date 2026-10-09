/* Mode hors ligne – La Grande Incruste 3 */
const CORE='lgi-core-2eb350ec04',IMG='lgi-img-v1',VID='lgi-vid-v1',RUN='lgi-run-v1';
const FILES=['./','index.html','live.html','textes.json','diffusion.js','pdt.js','pdt.json','manifest.json','icon-192.png','icon-512.png'];
const IMGS=["img/001.jpg", "img/002.jpg", "img/003.jpg", "img/004.jpg", "img/005.jpg", "img/006.jpg", "img/007.jpg", "img/008.jpg", "img/009.jpg", "img/010.jpg", "img/011.jpg", "img/012.jpg", "img/013.jpg", "img/014.jpg", "img/015.jpg", "img/016.jpg", "img/017.jpg", "img/018.jpg", "img/019.jpg", "img/020.jpg", "img/021.jpg", "img/022.jpg", "img/023.jpg", "img/024.jpg", "img/025.jpg", "img/026.jpg", "img/027.jpg", "img/028.jpg", "img/029.jpg", "img/030.jpg", "img/031.jpg", "img/032.jpg", "img/033.jpg", "img/034.jpg", "img/035.jpg", "img/036.jpg", "img/037.jpg", "img/038.jpg", "img/039.jpg", "img/040.jpg", "img/041.jpg", "img/042.jpg", "img/043.jpg", "img/044.jpg", "img/045.jpg", "img/046.jpg", "img/047.jpg", "img/048.jpg", "img/049.jpg", "img/050.jpg", "img/051.jpg", "img/052.jpg", "img/053.jpg", "img/054.jpg", "img/055.jpg", "img/056.jpg", "img/057.jpg", "img/058.jpg", "img/059.jpg", "img/060.jpg", "img/061.jpg", "img/062.jpg", "img/063.jpg", "img/064.jpg", "img/065.jpg", "img/066.jpg", "img/067.jpg", "img/068.jpg", "img/069.jpg", "img/070.jpg", "img/071.jpg", "img/072.jpg", "img/073.jpg", "img/074.jpg", "img/075.jpg", "img/076.jpg", "img/077.jpg", "img/078.jpg", "img/079.jpg", "img/080.jpg", "img/081.jpg", "img/082.jpg", "img/083.jpg", "img/084.jpg", "img/085.jpg", "img/086.jpg", "img/087.jpg", "img/088.jpg", "img/089.jpg", "img/090.jpg", "img/091.jpg", "img/092.jpg", "img/093.jpg", "img/094.jpg", "img/095.jpg", "img/096.jpg", "img/097.jpg", "img/098.jpg", "img/099.jpg", "img/100.jpg", "img/101.jpg", "img/102.jpg", "img/103.jpg", "img/104.jpg", "img/105.jpg", "img/106.jpg", "img/107.jpg", "img/108.jpg", "img/109.jpg", "img/110.jpg", "img/111.jpg", "img/112.jpg", "img/113.jpg", "img/114.jpg", "img/115.jpg", "img/116.jpg", "img/117.jpg", "img/118.jpg", "img/119.jpg", "img/120.jpg", "img/121.jpg", "img/122.jpg", "img/123.jpg", "img/124.jpg", "img/125.jpg", "img/126.jpg", "img/127.jpg", "img/128.jpg", "img/129.jpg", "img/130.jpg", "img/131.jpg", "img/132.jpg", "img/133.jpg", "img/134.jpg", "img/135.jpg", "img/136.jpg", "img/137.jpg", "img/138.jpg", "img/139.jpg", "img/140.jpg", "img/141.jpg", "img/142.jpg", "img/143.jpg", "img/144.jpg", "img/145.jpg", "img/146.jpg", "img/147.jpg", "img/148.jpg", "img/149.jpg", "img/150.jpg", "img/151.jpg", "img/152.jpg", "img/153.jpg", "img/154.jpg", "img/155.jpg", "img/156.jpg", "img/157.jpg", "img/158.jpg", "img/159.jpg", "img/160.jpg", "img/161.jpg", "img/162.jpg", "img/163.jpg", "img/164.jpg", "img/V_court.jpg", "img/V_moto_large.jpg", "img/V_moto_serre.jpg", "img/V_sol.jpg"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil((async()=>{
  const c=await caches.open(CORE);await Promise.all(FILES.map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})));
  const ic=await caches.open(IMG);const todo=[];for(const u of IMGS){if(!(await ic.match(u)))todo.push(u)}
  for(let i=0;i<todo.length;i+=8){await Promise.all(todo.slice(i,i+8).map(u=>ic.add(u).catch(()=>{})))}
})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys()){if(k.startsWith('lgi-core-')&&k!==CORE)await caches.delete(k)}
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
    if(u.pathname.includes('/img/')){e.respondWith(cacheFirst(req,IMG));return}
    if(u.pathname.includes('/vid/')){e.respondWith((async()=>{const c=await caches.open(VID);const h=await c.match(u.href);return h?ranged(req,h):fetch(req)})());return}
    e.respondWith(networkFirst(req));return}
  if(u.hostname==='raw.githubusercontent.com'){e.respondWith((async()=>{const c=await caches.open(RUN);const h=await c.match(u.href);if(h)return h;
    const r=await fetch(u.href,{mode:'cors'});if(r.ok)c.put(u.href,r.clone());return r})());return}
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith((async()=>{const c=await caches.open(RUN);const h=await c.match(req);
    const n=fetch(req).then(r=>{c.put(req,r.clone());return r}).catch(()=>h);return h||n})())}
});
