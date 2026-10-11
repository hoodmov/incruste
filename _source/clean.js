/* Clean plate – efface une zone de la réf (LaMa, open source, calcul local) ou importe une version faite ailleurs (Gemini…).
   Les clean plates enregistrés sont partagés via la branche « data » du dépôt (clean.json + clean/<id>.jpg). */
(function(){
'use strict';
var lk=document.getElementById('lk');if(!lk)return;
var REPO='hoodmov/incruste',BR='data',RAW='https://raw.githubusercontent.com/'+REPO+'/'+BR+'/';
var ORTV='1.20.1',ORT='https://cdn.jsdelivr.net/npm/onnxruntime-web@'+ORTV+'/dist/';
var MODEL='lama/lama.onnx',MCACHE='lgi-lama-v1',S=512;
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function token(){return ls('lgi.gh')||''}
function hdr(){var h={Accept:'application/vnd.github+json'};if(token())h.Authorization='Bearer '+token();return h}
function api(p){return 'https://api.github.com/repos/'+REPO+'/contents/'+p}
function enc(s){var u=new TextEncoder().encode(s),r='';for(var i=0;i<u.length;i++)r+=String.fromCharCode(u[i]);return btoa(r)}
function dec(b){var bin=atob(b.replace(/\s/g,'')),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder().decode(u)}
function b64(blob){return new Promise(function(ok){var r=new FileReader();r.onload=function(){ok(String(r.result).split(',')[1])};r.readAsDataURL(blob)})}
function idOf(src){if(!src)return null;var m=String(src).split('?')[0].match(/([^\/]+)\.(jpe?g|png|webp)$/i);return m?m[1]:null}

/* ---------- index des clean plates ---------- */
var C={};try{C=JSON.parse(ls('lgi.clean.v1')||'{}')||{}}catch(e){C={}}
var LOC={};                       /* résultats locaux pas encore enregistrés : id -> blob URL */
var on=ls('lgi.clean.on')!=='0';
var csha=null;
function readIdx(){return fetch(api('clean.json')+'?ref='+BR+'&t='+Date.now(),{headers:hdr(),cache:'no-store'}).then(function(r){
  if(r.status===404){csha=null;return {}}if(!r.ok)throw new Error('GitHub '+r.status);
  return r.json().then(function(j){csha=j.sha;var d={};try{d=JSON.parse(dec(j.content)).c||{}}catch(e){}return d})})}
function refreshIdx(){return readIdx().then(function(d){var ch=JSON.stringify(d)!==JSON.stringify(C);C=d;ls('lgi.clean.v1',JSON.stringify(C));if(ch){ui();decorate();if(window.lkRefresh)window.lkRefresh()}}).catch(function(){})}
function updIdx(fn,n){n=n||0;return readIdx().then(function(d){fn(d);var body={message:'clean plates',content:enc(JSON.stringify({v:1,c:d})),branch:BR};if(csha)body.sha=csha;
  return fetch(api('clean.json'),{method:'PUT',headers:hdr(),body:JSON.stringify(body)}).then(function(r){
    if((r.status===409||r.status===422)&&n<4)return updIdx(fn,n+1);if(!r.ok)throw new Error('GitHub '+r.status);C=d;ls('lgi.clean.v1',JSON.stringify(C));return d})})}
function putFile(path,data,n){n=n||0;return fetch(api(path)+'?ref='+BR+'&t='+Date.now(),{headers:hdr(),cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(j){
  var body={message:path,content:data,branch:BR};if(j&&j.sha)body.sha=j.sha;
  return fetch(api(path),{method:'PUT',headers:hdr(),body:JSON.stringify(body)}).then(function(r){if((r.status===409||r.status===422)&&n<3)return putFile(path,data,n+1);if(!r.ok)throw new Error('GitHub '+r.status)})})}

/* clean plates livrés avec le site (img/clean/NNN.jpg, attribut data-clean) */
var ST={};[].forEach.call(document.querySelectorAll('.pic[data-clean]'),function(p){var id=idOf(p.getAttribute('data-full'));if(id)ST[id]=p.getAttribute('data-clean')});
function cleanUrl(id){if(!id)return null;if(LOC[id])return LOC[id];if(C[id]){return C[id].del?(ST[id]||null):RAW+'clean/'+id+'.jpg?v='+C[id].t}return ST[id]||null}
window.lgiCleanUrl=function(id){return cleanUrl(id)};window.lgiIdOf=idOf;
window.lkMapSrc=function(src){if(!on)return src;var u=cleanUrl(idOf(src));return u||src};
function cur(){var s=window.lkSrc&&window.lkSrc();return s?{src:s,id:idOf(s)}:null}
function has(id){return !!cleanUrl(id)}

/* ---------- barre dans Incruste live ---------- */
var css=document.createElement('style');css.textContent=
'#cprow button.on{border-color:var(--key,#3ddc84)}'+
'#cp{position:fixed;inset:0;z-index:2147483000;background:#0b0d0c;color:#e8eeec;display:flex;flex-direction:column;font:500 .9rem var(--body,system-ui)}'+
'#cp[hidden]{display:none}#cp .bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 10px;border-bottom:1px solid #2a302e}'+
'#cp .bar b{margin-right:auto;font-weight:700}#cp button,#cp label.btn{background:#1b201e;color:#e8eeec;border:1px solid #3a423f;border-radius:6px;padding:7px 11px;font:600 .82rem var(--body,system-ui);cursor:pointer}'+
'#cp button.on{border-color:#3ddc84;color:#3ddc84}#cp button.go{background:#3ddc84;color:#06120c;border-color:#3ddc84}#cp button:disabled{opacity:.45;cursor:default}'+
'#cp .stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:8px;touch-action:none}#cp canvas{max-width:100%;max-height:100%;touch-action:none;cursor:crosshair}'+
'#cp .st{padding:6px 10px;min-height:1.6em;color:#9aa5a1;font-size:.8rem}#cp input[type=range]{width:110px}'+
'#cp .prog{height:3px;background:#2a302e}#cp .prog i{display:block;height:100%;width:0;background:#3ddc84;transition:width .2s}';
document.head.appendChild(css);
var ct=lk.querySelector('.ct');
var row=document.createElement('div');row.className='row';row.id='cprow';
row.innerHTML='<button id="cptog" type="button">Fond : clean plate</button><button id="cpmk" type="button" hidden>🧽 Créer un clean plate</button><label id="cpimpl" style="display:inline-flex"><button id="cpimp" type="button">⬆ Importer un clean (Gemini…)</button></label><input id="cpfile" type="file" accept="image/*" hidden><button id="cpdel" type="button">🗑 Supprimer le clean</button>';
var gf=document.getElementById('lkgfond');if(gf)gf.insertBefore(row,gf.children[1]||null);else if(ct)ct.insertBefore(row,ct.firstChild);
var tog=document.getElementById('cptog'),bdel=document.getElementById('cpdel'),fin=document.getElementById('cpfile');
function ui(){var c=cur(),h=c&&has(c.id);tog.hidden=!h;bdel.hidden=!(c&&C[c.id]&&!C[c.id].del&&token())&&!(c&&LOC[c.id]);
  tog.textContent=on?'Fond : clean plate ✓':'Fond : réf d’origine';tog.classList.toggle('on',on)}
tog.onclick=function(){on=!on;ls('lgi.clean.on',on?'1':'0');ui();if(window.lkRefresh)window.lkRefresh()};
document.getElementById('cpimp').onclick=function(){fin.value='';fin.click()};
fin.onchange=function(){var f=fin.files&&fin.files[0],c=cur();if(!f||!c||!c.id)return;
  Promise.all([loadImage(URL.createObjectURL(f)),loadImage(c.src)]).then(function(a){var im=a[0],ref=a[1];
    /* recadré « cover » aux proportions exactes de la réf */
    var W=ref.naturalWidth,H=ref.naturalHeight,s=Math.max(W/im.naturalWidth,H/im.naturalHeight),w=im.naturalWidth*s,h=im.naturalHeight*s;
    var cv=document.createElement('canvas');cv.width=W;cv.height=H;cv.getContext('2d').drawImage(im,(W-w)/2,(H-h)/2,w,h);
    return finish(c.id,cv)}).catch(function(e){alert('Import impossible : '+(e&&e.message||e))})};
bdel.onclick=function(){var c=cur();if(!c||!c.id)return;if(!confirm('Supprimer le clean plate de cette réf ?'))return;
  if(LOC[c.id]){URL.revokeObjectURL(LOC[c.id]);delete LOC[c.id]}
  var p=(C[c.id]&&token())?updIdx(function(d){d[c.id]={del:1,t:Date.now()}}):Promise.resolve();
  p.then(function(){ui();decorate();window.lkRefresh&&window.lkRefresh()}).catch(function(e){alert('Suppression : '+e.message)})};
document.getElementById('cpmk').onclick=function(){var c=cur();if(c&&c.id)openEd(c)};
/* mise à jour quand Incruste live s'ouvre */
new MutationObserver(function(){if(!lk.hidden){ui();refreshIdx()}}).observe(lk,{attributes:true,attributeFilter:['hidden']});

/* ---------- dans le document : flèche (ou glisser) pour passer de la réf au clean ---------- */
var css2=document.createElement('style');css2.textContent=
'.shot-pic{position:relative}.cpsw{position:absolute;left:12px;z-index:3;display:flex;gap:2px;padding:3px;border-radius:999px;border:0;background:rgb(20 20 20 / .55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);cursor:pointer;touch-action:manipulation}'+
'.cpsw span{font:600 .76rem/1 var(--body,system-ui);color:#fff;padding:7px 13px;border-radius:999px;transition:background-color .18s ease,color .18s ease}.cpsw span:first-child,.cpsw.on span:last-child{background:#fff;color:#141414}.cpsw.on span:first-child{background:transparent;color:#fff}.cpsw:focus-visible{outline:2px solid #3ddc84;outline-offset:2px}.cpsw:active{transform:scale(.97)}'+
'.shot-pic .pic{touch-action:pan-y}.shot-pic .pic img{-webkit-user-drag:none;user-select:none}.cpbadge{position:absolute;left:8px;top:8px;z-index:2;padding:3px 7px;border-radius:4px;background:#3ddc84;color:#06120c;font:700 .66rem var(--body,system-ui);letter-spacing:.06em;pointer-events:none}.cpbadge[hidden]{display:none}';
document.head.appendChild(css2);
function place(sp){var p=sp.querySelector('.pic'),b=sp.querySelector('.cpsw');if(p&&b)b.style.top=(p.offsetTop+p.offsetHeight-12-(b.offsetHeight||34))+'px'}
function setPic(p,clean){var img=p.querySelector('img');if(!img)return;if(!p.dataset.ref)p.dataset.ref=p.getAttribute('data-full');
  var id=idOf(p.dataset.ref),u=clean?cleanUrl(id):null;var src=u||p.dataset.ref;
  p.setAttribute('data-full',src);p.dataset.showing=u?'clean':'ref';
  if(img.getAttribute('src')!==src){img.classList.add('swp');var pre=new Image();pre.onload=pre.onerror=function(){img.src=src;requestAnimationFrame(function(){img.classList.remove('swp')})};pre.src=src}
  var bd=p.querySelector('.cpbadge');if(bd)bd.hidden=!u;var b=p.parentNode.querySelector('.cpsw');
  if(b){b.classList.toggle('on',!!u);if(!b.firstChild||b.firstChild.nodeType!==1)b.innerHTML='<span>Réf</span><span>Clean</span>';b.setAttribute('aria-pressed',u?'true':'false');b.title=u?'Revenir à la réf':'Voir le clean plate';b.setAttribute('aria-label','Clean plate')}}
function decorate(){[].forEach.call(document.querySelectorAll('.shot-pic'),function(sp){var p=sp.querySelector('.pic');if(!p)return;
  var id=idOf(p.dataset.ref||p.getAttribute('data-full')),u=cleanUrl(id),b=sp.querySelector('.cpsw');
  if(!u){if(b){setPic(p,false);b.remove();var bd0=p.querySelector('.cpbadge');if(bd0)bd0.remove()}return}
  if(!b){b=document.createElement('button');b.type='button';b.className='cpsw';sp.appendChild(b);
    var bd=document.createElement('span');bd.className='cpbadge';bd.textContent='CLEAN';bd.hidden=true;bd.style.display='none';p.appendChild(bd);
    b.addEventListener('click',function(e){e.stopPropagation();setPic(p,p.dataset.showing!=='clean')});
    /* glisser horizontalement sur l'image = basculer */
    var x0=null,moved=false;
    p.addEventListener('pointerdown',function(e){x0=e.clientX;moved=false});
    p.addEventListener('pointerup',function(e){if(x0!==null&&Math.abs(e.clientX-x0)>40){moved=true;setPic(p,p.dataset.showing!=='clean')}x0=null});
    sp.addEventListener('click',function(e){if(moved&&p.contains(e.target)){e.stopPropagation();e.preventDefault();moved=false}},true);
    var im=p.querySelector('img');if(im){im.draggable=false;im.addEventListener('load',function(){place(sp)})}
    p.addEventListener('pointercancel',function(){x0=null})}
  setPic(p,p.dataset.showing==='clean');place(sp)})}
window.addEventListener('resize',function(){[].forEach.call(document.querySelectorAll('.shot-pic'),place)});
decorate();if(Object.keys(C).length||true)refreshIdx();
ui();

/* ---------- utilitaires image ---------- */
function loadImage(src){return new Promise(function(ok,ko){var im=new Image();im.crossOrigin='anonymous';im.onload=function(){ok(im)};im.onerror=function(){ko(new Error('image illisible'))};im.src=src})}
function toBlob(cv,q){return new Promise(function(ok){cv.toBlob(ok,'image/jpeg',q||.92)})}
/* enregistre le résultat : local tout de suite, puis partagé si un jeton GitHub est présent */
function finish(id,cv,st){st=st||function(){};
  return toBlob(cv,.92).then(function(blob){if(LOC[id])URL.revokeObjectURL(LOC[id]);LOC[id]=URL.createObjectURL(blob);on=true;ls('lgi.clean.on','1');ui();decorate();window.lkRefresh&&window.lkRefresh();
    if(!token()){st('Clean plate actif sur cet appareil. (Pour le partager avec les autres appareils, active la synchro dans le menu.)');return 'local'}
    st('Envoi sur GitHub…');var t=Date.now();
    return b64(blob).then(function(d){return putFile('clean/'+id+'.jpg',d)}).then(function(){return updIdx(function(d){d[id]={t:t}})}).then(function(){st('Clean plate enregistré et partagé ✓');return 'ok'})
      .catch(function(e){st('Clean actif ici, mais envoi impossible : '+e.message);return 'local'})})}

/* ---------- moteur LaMa (onnxruntime-web, chargé à la demande) ---------- */
var sessP=null;
function loadScript(u){return new Promise(function(ok,ko){if(window.ort)return ok();var s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=function(){ko(new Error('moteur IA introuvable (réseau ?)'))};document.head.appendChild(s)})}
function getModel(prog){var cP=('caches' in window)?caches.open(MCACHE).catch(function(){return null}):Promise.resolve(null);
  return cP.then(function(c){return (c?c.match(MODEL):Promise.resolve(null)).then(function(hit){if(hit)return hit.arrayBuffer();
    return fetch(MODEL).then(function(r){if(!r.ok)throw new Error('modèle introuvable ('+r.status+')');var tot=+r.headers.get('Content-Length')||92591623;
      if(!r.body||!r.body.getReader)return r.arrayBuffer();var rd=r.body.getReader(),parts=[],got=0;
      return (function pump(){return rd.read().then(function(x){if(x.done){var u=new Uint8Array(got),o=0;parts.forEach(function(p){u.set(p,o);o+=p.length});return u.buffer}
        parts.push(x.value);got+=x.value.length;prog(got/tot);return pump()})})()}).then(function(buf){if(c)c.put(MODEL,new Response(buf.slice(0),{headers:{'Content-Type':'application/octet-stream'}})).catch(function(){});return buf})})})}
function session(prog){if(!sessP)sessP=loadScript(ORT+'ort.min.js').then(function(){ort.env.wasm.wasmPaths=ORT;ort.env.wasm.numThreads=self.crossOriginIsolated?Math.min(4,navigator.hardwareConcurrency||2):1;return getModel(prog)})
  .then(function(buf){return ort.InferenceSession.create(buf,{executionProviders:['wasm'],graphOptimizationLevel:'all'})}).catch(function(e){sessP=null;throw e});return sessP}

/* remplissage lissé des trous (pull-push) avant LaMa : évite les zones grises sur les grands trous */
function pullPush(px,known,w,h){var L=[{w:w,h:h,c:[px[0].slice(),px[1].slice(),px[2].slice()],k:known.slice()}];
  for(var i=0;i<3;i++)for(var j=0;j<w*h;j++)L[0].c[i][j]*=known[j];
  while(L[L.length-1].w>1||L[L.length-1].h>1){var a=L[L.length-1],W2=Math.max(1,a.w>>1),H2=Math.max(1,a.h>>1),b={w:W2,h:H2,c:[new Float32Array(W2*H2),new Float32Array(W2*H2),new Float32Array(W2*H2)],k:new Float32Array(W2*H2)};
    for(var y=0;y<a.h;y++)for(var x=0;x<a.w;x++){var s=y*a.w+x,d=Math.min(H2-1,y>>1)*W2+Math.min(W2-1,x>>1);b.k[d]+=a.k[s];b.c[0][d]+=a.c[0][s];b.c[1][d]+=a.c[1][s];b.c[2][d]+=a.c[2][s]}
    L.push(b)}
  for(var l=L.length-2;l>=0;l--){var f=L[l],g=L[l+1];for(var y2=0;y2<f.h;y2++)for(var x2=0;x2<f.w;x2++){var s2=y2*f.w+x2;if(f.k[s2]>=1e-3)continue;
    var d2=Math.min(g.h-1,y2>>1)*g.w+Math.min(g.w-1,x2>>1),kk=g.k[d2]||1e-6;f.c[0][s2]=g.c[0][d2]/kk;f.c[1][s2]=g.c[1][d2]/kk;f.c[2][s2]=g.c[2][d2]/kk;f.k[s2]=1}
  }
  var out=[new Float32Array(w*h),new Float32Array(w*h),new Float32Array(w*h)],z=L[0];
  for(var p=0;p<w*h;p++){var kn=known[p];for(var c=0;c<3;c++)out[c][p]=kn?px[c][p]:z.c[c][p]}
  /* lissage des zones remplies */
  for(var it=0;it<12;it++)for(var c3=0;c3<3;c3++){var o=out[c3];for(var yy=1;yy<h-1;yy++)for(var xx=1;xx<w-1;xx++){var pp=yy*w+xx;if(known[pp])continue;o[pp]=(o[pp-1]+o[pp+1]+o[pp-w]+o[pp+w])/4}}
  return out}
function boxBlur(a,w,h,r){var t=new Float32Array(w*h),o=new Float32Array(w*h);
  for(var y=0;y<h;y++){var s=0;for(var x=-r;x<=r;x++)s+=a[y*w+Math.min(w-1,Math.max(0,x))];for(x=0;x<w;x++){t[y*w+x]=s/(2*r+1);s+=a[y*w+Math.min(w-1,x+r+1)]-a[y*w+Math.max(0,x-r)]}}
  for(x=0;x<w;x++){s=0;for(y=-r;y<=r;y++)s+=t[Math.min(h-1,Math.max(0,y))*w+x];for(y=0;y<h;y++){o[y*w+x]=s/(2*r+1);s+=t[Math.min(h-1,y+r+1)*w+x]-t[Math.max(0,y-r)*w+x]}}return o}

/* calcule le clean plate : img (Image), mk (canvas masque même taille) -> canvas résultat */
function inpaint(img,mk,st,prog){var W=img.naturalWidth,H=img.naturalHeight;
  var md=mk.getContext('2d').getImageData(0,0,W,H).data,x0=W,y0=H,x1=-1,y1=-1;
  for(var y=0;y<H;y++)for(var x=0;x<W;x++)if(md[(y*W+x)*4+3]>20){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  if(x1<0)return Promise.reject(new Error('peins d’abord la zone à effacer'));
  /* zone de travail carrée autour du masque, avec du contexte autour */
  var side=Math.min(Math.max(W,H),Math.max(256,Math.round(Math.max(x1-x0,y1-y0)*2)));
  var cw=Math.min(W,side),ch=Math.min(H,side),cx=Math.round((x0+x1)/2-cw/2),cy=Math.round((y0+y1)/2-ch/2);cx=Math.max(0,Math.min(W-cw,cx));cy=Math.max(0,Math.min(H-ch,cy));
  st('Préparation…');
  var a=document.createElement('canvas');a.width=a.height=S;var ax=a.getContext('2d',{willReadFrequently:true});ax.imageSmoothingQuality='high';ax.drawImage(img,cx,cy,cw,ch,0,0,S,S);
  var m=document.createElement('canvas');m.width=m.height=S;var mx=m.getContext('2d',{willReadFrequently:true});mx.drawImage(mk,cx,cy,cw,ch,0,0,S,S);
  var id=ax.getImageData(0,0,S,S).data,mm=mx.getImageData(0,0,S,S).data,N=S*S,hole=new Float32Array(N);
  for(var i=0;i<N;i++)hole[i]=mm[i*4+3]>20?1:0;
  /* dilatation légère du trou (bords du visage, cheveux) */
  var dl=boxBlur(hole,S,S,3);for(i=0;i<N;i++)hole[i]=dl[i]>0.01?1:0;
  var known=new Float32Array(N),px=[new Float32Array(N),new Float32Array(N),new Float32Array(N)];
  for(i=0;i<N;i++){known[i]=1-hole[i];px[0][i]=id[i*4];px[1][i]=id[i*4+1];px[2][i]=id[i*4+2]}
  var pre=pullPush(px,known,S,S),inp=new Float32Array(3*N);
  for(i=0;i<N;i++){inp[i]=pre[0][i]/255;inp[N+i]=pre[1][i]/255;inp[2*N+i]=pre[2][i]/255}
  st('Chargement du moteur IA (1re fois : ~93 Mo)…');
  return session(prog).then(function(s){st('Calcul en cours… (quelques secondes)');
    return new Promise(function(ok){setTimeout(ok,30)}).then(function(){return s.run({image:new ort.Tensor('float32',inp,[1,3,S,S]),mask:new ort.Tensor('float32',hole,[1,1,S,S])})})})
  .then(function(res){var o=res.output||res[Object.keys(res)[0]],od=o.data;
    var r=document.createElement('canvas');r.width=r.height=S;var rx=r.getContext('2d'),ri=rx.createImageData(S,S);
    for(var j=0;j<N;j++){ri.data[j*4]=od[j];ri.data[j*4+1]=od[N+j];ri.data[j*4+2]=od[2*N+j];ri.data[j*4+3]=255}rx.putImageData(ri,0,0);
    /* recomposition pleine résolution avec bord adouci */
    var out=document.createElement('canvas');out.width=W;out.height=H;var ox=out.getContext('2d',{willReadFrequently:true});ox.drawImage(img,0,0);
    var t=document.createElement('canvas');t.width=cw;t.height=ch;var tx=t.getContext('2d',{willReadFrequently:true});tx.imageSmoothingQuality='high';tx.drawImage(r,0,0,cw,ch);
    var fill=tx.getImageData(0,0,cw,ch).data,base=ox.getImageData(cx,cy,cw,ch),bd=base.data;
    var hm=new Float32Array(cw*ch),mfull=mk.getContext('2d').getImageData(cx,cy,cw,ch).data;for(var k=0;k<cw*ch;k++)hm[k]=mfull[k*4+3]>20?1:0;
    var rr=Math.max(2,Math.round(Math.max(cw,ch)/170)),grow=boxBlur(hm,cw,ch,rr);for(k=0;k<cw*ch;k++)hm[k]=grow[k]>0.01?1:0;var al=boxBlur(hm,cw,ch,rr);
    for(k=0;k<cw*ch;k++){var A=Math.min(1,al[k]*1.6);if(A<=0)continue;for(var c=0;c<3;c++)bd[k*4+c]=Math.round(bd[k*4+c]*(1-A)+fill[k*4+c]*A)}
    ox.putImageData(base,cx,cy);return out})}
window.__lgiClean={inpaint:inpaint,pullPush:pullPush};

/* ---------- éditeur ---------- */
var ed=null;
function openEd(c){var isMobile=/iPhone|iPad|Android/i.test(navigator.userAgent);
  if(!ed){ed=document.createElement('div');ed.id='cp';ed.hidden=true;ed.innerHTML=
    '<div class="bar"><b>🧽 Clean plate</b><button id="cpb" type="button" class="on">Pinceau</button><button id="cpe" type="button">Gomme</button><label>Taille <input id="cpsz" type="range" min="4" max="200" value="40"></label><button id="cpu" type="button">↶ Annuler</button><button id="cpx" type="button">Tout effacer</button></div>'+
    '<div class="prog"><i id="cppr"></i></div><div class="stage"><canvas id="cpc"></canvas></div><div class="st" id="cpst"></div>'+
    '<div class="bar"><button id="cpgo" type="button" class="go">✨ Effacer la zone peinte</button><button id="cpab" type="button" disabled>Avant / après</button><button id="cpok" type="button" disabled>✓ Utiliser ce clean</button><button id="cpdl" type="button" disabled>⬇ Télécharger</button><button id="cpq" type="button">Fermer</button></div>';
    document.body.appendChild(ed)}
  var cv=ed.querySelector('#cpc'),cx=cv.getContext('2d'),st=function(t){ed.querySelector('#cpst').textContent=t},pr=ed.querySelector('#cppr');
  var img=null,mk=document.createElement('canvas'),undo=[],erase=false,res=null,showRes=false,drawing=false,lastP=null;
  st(isMobile?'Peins la zone à effacer (visage, personnage…). Conseil : le calcul est plus confortable sur ordinateur.':'Peins la zone à effacer (visage, personnage…), puis « Effacer la zone peinte ».');pr.style.width='0';
  ['cpab','cpok','cpdl'].forEach(function(i){ed.querySelector('#'+i).disabled=true});
  ed.hidden=false;
  /* toujours partir de la réf d'origine, pas d'un clean existant */
  loadImage(c.src).then(function(im){img=im;cv.width=mk.width=im.naturalWidth;cv.height=mk.height=im.naturalHeight;draw()}).catch(function(e){st('Réf illisible : '+e.message)});
  function draw(){if(!img)return;cx.globalAlpha=1;cx.drawImage(showRes&&res?res:img,0,0);if(!(showRes&&res)){cx.globalAlpha=.55;cx.drawImage(mk,0,0);cx.globalAlpha=1}}
  function pos(e){var r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height}}
  function seg(a,b){var g=mk.getContext('2d');g.save();g.globalCompositeOperation=erase?'destination-out':'source-over';g.strokeStyle='#ff2d2d';g.fillStyle='#ff2d2d';
    var sz=+ed.querySelector('#cpsz').value*cv.width/Math.max(320,cv.getBoundingClientRect().width);g.lineWidth=sz;g.lineCap=g.lineJoin='round';g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x+.01,b.y);g.stroke();g.restore();draw()}
  cv.onpointerdown=function(e){if(!img)return;e.preventDefault();cv.setPointerCapture(e.pointerId);showRes=false;undo.push(mk.getContext('2d').getImageData(0,0,mk.width,mk.height));if(undo.length>20)undo.shift();drawing=true;lastP=pos(e);seg(lastP,lastP)};
  cv.onpointermove=function(e){if(!drawing)return;var p=pos(e);seg(lastP,p);lastP=p};
  cv.onpointerup=cv.onpointercancel=function(){drawing=false};
  ed.querySelector('#cpb').onclick=function(){erase=false;this.classList.add('on');ed.querySelector('#cpe').classList.remove('on')};
  ed.querySelector('#cpe').onclick=function(){erase=true;this.classList.add('on');ed.querySelector('#cpb').classList.remove('on')};
  ed.querySelector('#cpu').onclick=function(){var u=undo.pop();if(u){mk.getContext('2d').putImageData(u,0,0);showRes=false;draw()}};
  ed.querySelector('#cpx').onclick=function(){undo.push(mk.getContext('2d').getImageData(0,0,mk.width,mk.height));mk.getContext('2d').clearRect(0,0,mk.width,mk.height);showRes=false;draw()};
  ed.querySelector('#cpgo').onclick=function(){var b=this;if(!img)return;b.disabled=true;var t0=Date.now();
    inpaint(img,mk,st,function(f){pr.style.width=Math.round(f*100)+'%'}).then(function(out){res=out;showRes=true;draw();pr.style.width='100%';
      st('Terminé en '+((Date.now()-t0)/1000).toFixed(1)+' s. Vérifie avec « Avant / après », repeins et relance si besoin.');['cpab','cpok','cpdl'].forEach(function(i){ed.querySelector('#'+i).disabled=false})})
    .catch(function(e){st('Échec : '+(e&&e.message||e))}).then(function(){b.disabled=false})};
  ed.querySelector('#cpab').onclick=function(){showRes=!showRes;draw()};
  ed.querySelector('#cpdl').onclick=function(){if(!res)return;toBlob(res,.92).then(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download=(c.id||'ref')+'_clean.jpg';document.body.appendChild(a);a.click();a.remove()})};
  ed.querySelector('#cpok').onclick=function(){if(!res)return;var b=this;b.disabled=true;finish(c.id,res,st).then(function(r){if(r==='ok'||r==='local')setTimeout(function(){ed.hidden=true},r==='ok'?700:2500)})};
  ed.querySelector('#cpq').onclick=function(){ed.hidden=true}}
})();
