/* Diffusion de l'Incruste live entre appareils (WebRTC pair à pair).
   Signalisation : fichier data/live.json sur la branche "data" du dépôt (même jeton que la synchro).
   L'image ne passe JAMAIS par GitHub : seul l'échange de connexion (SDP) y transite. */
(function(){
'use strict';
var GH={repo:'hoodmov/incruste',path:'data/live.json',branch:'data'};
var ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
var MAXW=960,MAXBR=2500000,MAXFPS=30;
var QP={fl:{w:640,br:1200000,fps:30,jb:0,n:'Réactif'},eq:{w:960,br:2500000,fps:30,jb:0,n:'Équilibré'},hd:{w:1280,br:6000000,fps:30,jb:60,n:'HD'},max:{w:99999,br:12000000,fps:25,jb:150,n:'Max'}};
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function token(){return lsGet('lgi.gh')||''}
var DID=lsGet('lgi.did');if(!DID){DID=Math.random().toString(36).slice(2,10);lsSet('lgi.did',DID)}
function myName(){return lsGet('lgi.name')||('Appareil '+DID.slice(0,3))}
function hdr(){var h={Accept:'application/vnd.github+json'};if(token())h.Authorization='Bearer '+token();return h}
function dec(b){var bin=atob(b.replace(/\s/g,'')),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder().decode(u)}
function enc(s){var u=new TextEncoder().encode(s),r='';for(var i=0;i<u.length;i++)r+=String.fromCharCode(u[i]);return btoa(r)}
function tfetch(u,o,ms){o=o||{};var ac=window.AbortController?new AbortController():null;if(ac)o.signal=ac.signal;var t=setTimeout(function(){if(ac)ac.abort()},ms||10000);
  return fetch(u,o).then(function(r){clearTimeout(t);return r},function(e){clearTimeout(t);throw e})}
function wait(ms){return new Promise(function(ok){setTimeout(ok,ms)})}
var URL_=function(){return 'https://api.github.com/repos/'+GH.repo+'/contents/'+GH.path};
/* lecture (etag = lecture conditionnelle, gratuite côté quota si rien n'a changé) */
var etag=null,cache={host:null,sig:{}},sha=null;
function rd(cond){var h=hdr();if(cond&&etag)h['If-None-Match']=etag;
  return tfetch(URL_()+'?ref='+GH.branch+'&t='+Date.now(),{headers:h,cache:'no-store'},8000).then(function(r){
    if(r.status===304)return{d:cache,same:true};
    if(r.status===404){sha=null;etag=null;cache={host:null,sig:{}};return{d:cache}}
    if(!r.ok)throw new Error('http '+r.status);
    etag=r.headers.get('ETag')||null;
    return r.json().then(function(j){sha=j.sha;var d={};try{d=JSON.parse(dec(j.content))}catch(e){}d.sig=d.sig||{};d.host=d.host||null;cache=d;return{d:d}})})}
/* écriture avec relecture/fusion en cas de conflit */
var wq=Promise.resolve();
function upd(fn,n){n=n||0;
  return rd(false).then(function(R){var d=fn(JSON.parse(JSON.stringify(R.d)));if(!d)return R.d;
    var body={message:'live',content:enc(JSON.stringify(d)),branch:GH.branch};if(sha)body.sha=sha;
    return tfetch(URL_(),{method:'PUT',headers:hdr(),body:JSON.stringify(body)},12000).then(function(r){
      if((r.status===409||r.status===422||r.status===403||r.status===429||r.status>=500)&&n<6)return wait(250+Math.random()*900*(n+1)).then(function(){return upd(fn,n+1)});
      if(!r.ok)throw new Error('http '+r.status);
      return r.json().then(function(j){sha=j.content.sha;etag=null;cache=d;return d})})})}
function wupd(fn){var p=wq.then(function(){return upd(fn)},function(){return upd(fn)});wq=p.catch(function(){});return p}
function iceDone(pc,ms){return new Promise(function(ok){if(pc.iceGatheringState==='complete')return ok();var t=setTimeout(fin,ms);function fin(){clearTimeout(t);pc.removeEventListener('icegatheringstatechange',ch);ok()}
  function ch(){if(pc.iceGatheringState==='complete')fin()}pc.addEventListener('icegatheringstatechange',ch)})}
var supported=!!(window.RTCPeerConnection&&window.fetch);

/* ===== HÔTE : l'ordinateur qui reçoit la caméra ===== */
var lk=document.getElementById('lk'),cv=document.getElementById('lkc');
var H={on:false,stream:null,peers:{},seen:{},poll:null,hb:null,btn:null};
function hcount(){return Object.keys(H.peers).filter(function(k){var s=H.peers[k].connectionState;return s==='connected'||s==='connecting'}).length}
function hpaint(){if(!H.btn)return;var n=hcount();H.btn.textContent=H.on?('📡 En direct'+(n?' · '+n+' 👁':'')+(H.err&&Date.now()-H.err<20000?' · ⚠ synchro':'')):'📡 Diffuser';H.btn.classList.toggle('on',H.on)}
/* faible latence : H.264 en priorité (décodage matériel iPhone/Mac), tampon de lecture minimal */
function lowLat(tr){try{if(!tr||!tr.setCodecPreferences||!window.RTCRtpReceiver||!RTCRtpReceiver.getCapabilities)return;var c=RTCRtpReceiver.getCapabilities('video');if(!c||!c.codecs)return;
  var h=c.codecs.filter(function(x){return /h264/i.test(x.mimeType)}),o=c.codecs.filter(function(x){return !/h264/i.test(x.mimeType)});if(h.length)tr.setCodecPreferences(h.concat(o))}catch(e){}
  try{if(tr&&tr.receiver){tr.receiver.jitterBufferTarget=0;tr.receiver.playoutDelayHint=0}}catch(e){}}
function tune(pc){try{pc.getSenders().forEach(function(s){if(!s.track||s.track.kind!=='video')return;var p=s.getParameters();if(!p.encodings||!p.encodings.length)p.encodings=[{}];
  var q=QP[pc._q]||QP.eq;p.encodings[0].maxBitrate=q.br;p.encodings[0].maxFramerate=q.fps;p.encodings[0].priority='high';p.encodings[0].networkPriority='high';try{p.degradationPreference='maintain-framerate'}catch(_){}try{s.track.contentHint='motion'}catch(_){}var w=cv.width||1280;p.encodings[0].scaleResolutionDownBy=Math.max(1,w/q.w);s.setParameters(p).catch(function(){})})}catch(e){}}
function accept(k,s){var id=k+'|'+s.t;if(H.seen[id])return;H.seen[id]=1;if(H.peers[k]){try{H.peers[k].close()}catch(e){}delete H.peers[k]}
  var pc=new RTCPeerConnection(ICE);H.peers[k]=pc;
  H.stream.getTracks().forEach(function(t){pc.addTrack(t,H.stream)});
  pc.ondatachannel=function(e){var ch=e.channel;ch.onmessage=function(m){try{var j=JSON.parse(m.data);if(j.q&&QP[j.q]){pc._q=j.q;tune(pc);try{ch.send(JSON.stringify({ok:j.q}))}catch(_){}}}catch(_){}}};
  pc.onconnectionstatechange=function(){var st=pc.connectionState;if(st==='failed'||st==='closed'||st==='disconnected'){if(st!=='disconnected'){try{pc.close()}catch(e){}if(H.peers[k]===pc)delete H.peers[k]}}hpaint()};
  pc.setRemoteDescription({type:'offer',sdp:s.o}).then(function(){return pc.createAnswer()}).then(function(a){return pc.setLocalDescription(a)}).then(function(){return iceDone(pc,3500)}).then(function(){tune(pc);
    return wupd(function(d){if(!d.sig[k]||d.sig[k].t!==s.t)return null;d.sig[k].a=pc.localDescription.sdp;return d})}).then(hpaint).catch(function(e){try{pc.close()}catch(x){}if(H.peers[k]===pc)delete H.peers[k];delete H.seen[id];H.err=Date.now();hpaint()})}
function hscan(R){var now=Date.now();Object.keys(R.d.sig||{}).forEach(function(k){var s=R.d.sig[k];if(s&&s.o&&!s.a&&now-s.t<120000)accept(k,s)})}
function hbeat(){return wupd(function(d){H.ok=Date.now();d.host={id:DID,n:myName(),t:Date.now()};var now=Date.now();Object.keys(d.sig).forEach(function(k){if(now-d.sig[k].t>180000)delete d.sig[k]});return d}).then(function(){H.err=0;hpaint()},function(){H.err=Date.now();hpaint()})}
function startHost(){if(H.on)return;if(!token()){alert("Pour diffuser, active d'abord la synchro (⋯ → ☁ Synchro entre appareils) avec le jeton GitHub.");return}
  if(!cv||!cv.captureStream){alert("Ce navigateur ne sait pas diffuser le rendu. Utilise Chrome ou Edge sur l'ordinateur.");return}
  H.stream=cv.captureStream(MAXFPS);H.on=true;H.seen={};hpaint();hbeat();
  H.hb=setInterval(hbeat,30000);
  H.poll=setInterval(function(){rd(true).then(function(R){H.ok=Date.now();hscan(R)}).catch(function(){H.err=Date.now();hpaint()})},2000)}
function stopHost(){if(!H.on)return;H.on=false;clearInterval(H.poll);clearInterval(H.hb);Object.keys(H.peers).forEach(function(k){try{H.peers[k].close()}catch(e){}});H.peers={};
  if(H.stream){H.stream.getTracks().forEach(function(t){t.stop()});H.stream=null}hpaint();
  wupd(function(d){if(d.host&&d.host.id===DID)d.host=null;return d}).catch(function(){})}
if(lk&&cv&&supported){
  var tb=lk.querySelector('.tb'),fs=document.getElementById('lkfs');
  if(tb&&token()){H.btn=document.createElement('button');H.btn.type='button';H.btn.id='lkdiff';H.btn.title="Diffuser le rendu aux autres appareils synchronisés";tb.insertBefore(H.btn,fs||tb.lastChild);H.btn.onclick=function(){H.on?stopHost():startHost()};hpaint()}
  /* Ferme la diffusion quand l'incruste est fermée */
  new MutationObserver(function(){if(lk.hidden)stopHost()}).observe(lk,{attributes:true,attributeFilter:['hidden']});
}

/* ===== SPECTATEUR : scripte, client, autre appareil ===== */
var bar=document.getElementById('edbar');
if(bar&&supported){
  var css=document.createElement('style');css.textContent='#lv[hidden]{display:none!important}#lv{position:fixed;inset:0;z-index:70;background:#000;color:#fff;display:flex;flex-direction:column;font:14px system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'+
  '#lv .tb{display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 8px) 8px 8px}#lv .tb p{flex:1;margin:0;font-size:.85rem;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
  '#lv button{background:#222;color:#fff;border:1px solid #555;border-radius:4px;font:600 .85rem system-ui,sans-serif;padding:8px 10px;cursor:pointer}'+
  '#lv video{flex:1;min-height:0;width:100%;object-fit:contain;background:#000}#lv .qb{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:0 8px 8px}#lv .seg{display:flex;gap:2px;background:#1a1a19;border:1px solid #2c2c2a;border-radius:12px;padding:3px}#lv .seg button{border:0;background:transparent;border-radius:9px;padding:7px 12px;min-height:34px}#lv .seg button.on{background:#f1f0eb;color:#0b0b0b}#lv .seg button.wait{opacity:.6}#lv #lvst{font:500 .74rem ui-monospace,Menlo,monospace;color:#9d9c96;font-variant-numeric:tabular-nums}#lv.fs .qb{display:none}#lv.fs .tb{display:none}#lvx{display:none;position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:80;background:rgba(0,0,0,.55);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:6px;padding:10px 14px;font:600 .9rem system-ui,sans-serif}#lv.fs #lvx{display:block}'+
  '#lv .msg{position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);text-align:center;padding:0 16px;font-size:.95rem;text-shadow:0 1px 4px #000;pointer-events:none}';
  document.head.appendChild(css);
  var lv=document.createElement('div');lv.id='lv';lv.hidden=true;lv.setAttribute('role','dialog');lv.setAttribute('aria-label','Incruste live (diffusion)');
  lv.innerHTML='<div class="tb"><p id="lvcap">Incruste live</p><button id="lvfs" type="button">⛶ Plein écran</button><button id="lvre" type="button" hidden>↻ Reconnecter</button><button id="lvclose" type="button">Fermer</button></div><div class="qb"><div class="seg" id="lvq"><button type="button" data-q="fl">Réactif</button><button type="button" data-q="eq">Équilibré</button><button type="button" data-q="hd">HD</button><button type="button" data-q="max">Max</button></div><span id="lvst"></span></div><video id="lvv" autoplay muted playsinline></video><div class="msg" id="lvmsg"></div><button id="lvx" type="button">✕ Quitter le plein écran</button>';
  document.body.appendChild(lv);
  var V={pc:null,t:0,poll:null,watch:null,timer:null,host:null},vv=document.getElementById('lvv'),vm=document.getElementById('lvmsg'),vre=document.getElementById('lvre');
  function msg(t){vm.textContent=t||''}
  var lb=document.createElement('button');lb.type='button';lb.id='edlive';lb.hidden=true;var rep=document.getElementById('edrep');bar.insertBefore(lb,rep?rep.nextSibling:bar.firstChild);
  function hostLive(d){return d.host&&d.host.id!==DID&&Date.now()-d.host.t<100000?d.host:null}
  function paintLb(d){var h=hostLive(d);V.host=h;lb.hidden=!h;if(h){lb.textContent='📺 Live · '+h.n;lb.title='Live · '+h.n;lb.setAttribute('aria-label','Voir le live de '+h.n)}}
  function chk(){if(!token()||document.hidden)return;rd(true).then(function(R){if(!R.same||lb.hidden)paintLb(R.d)}).catch(function(){})}
  setTimeout(chk,2500);setInterval(chk,15000);document.addEventListener('visibilitychange',function(){if(!document.hidden)chk()});
  /* réglage de qualité côté écran qui reçoit : chaque téléphone choisit son compromis latence / qualité */
var LQ=(function(){try{return localStorage.getItem('lgi.lvq')||'eq'}catch(e){return 'eq'}})();
function qui(){[].forEach.call(document.querySelectorAll('#lvq button'),function(b){b.classList.toggle('on',b.dataset.q===LQ);b.classList.toggle('wait',b.dataset.q===LQ&&V.qok!==LQ&&!!V.pc)})}
function applyJb(){try{var q=QP[LQ]||QP.eq;if(V.pc)V.pc.getReceivers().forEach(function(r){try{r.jitterBufferTarget=q.jb}catch(_){}try{r.playoutDelayHint=q.jb/1000}catch(_){}})}catch(e){}}
function sendQ(){applyJb();if(V.ch&&V.ch.readyState==='open'){try{V.ch.send(JSON.stringify({q:LQ}))}catch(e){}}qui()}
[].forEach.call(document.querySelectorAll('#lvq button'),function(b){b.onclick=function(){LQ=b.dataset.q;try{localStorage.setItem('lgi.lvq',LQ)}catch(e){}sendQ()}});
var lastB=0,lastT=0,stEl=document.getElementById('lvst');
setInterval(function(){if(lv.hidden||!V.pc){stEl.textContent='';return}V.pc.getStats().then(function(st){var t='';st.forEach(function(v){if(v.type==='inbound-rtp'&&v.kind==='video'){var now=v.timestamp,br=lastT&&now>lastT?(v.bytesReceived-lastB)*8/((now-lastT)/1000):0;lastB=v.bytesReceived;lastT=now;
  var jb=v.jitterBufferEmittedCount?Math.round(v.jitterBufferDelay/v.jitterBufferEmittedCount*1000):null;
  t=(v.frameWidth?v.frameWidth+'×'+v.frameHeight+' · ':'')+(v.framesPerSecond?Math.round(v.framesPerSecond)+' i/s · ':'')+(br?(br/1e6).toFixed(1).replace('.',',')+' Mb/s':'')+(jb!=null?' · tampon '+jb+' ms':'')}});stEl.textContent=t}).catch(function(){})},1000);
qui();
  function vstop(keep){clearInterval(V.poll);clearInterval(V.watch);clearTimeout(V.timer);if(V.pc){try{V.pc.close()}catch(e){}V.pc=null}vv.srcObject=null;
    if(!keep)wupd(function(d){if(d.sig[DID]){delete d.sig[DID];return d}return null}).catch(function(){})}
  function fail(t){msg(t);vre.hidden=false}
  function vconnect(){vstop(true);vre.hidden=true;msg('Connexion à '+(V.host?V.host.n:'l’ordinateur')+'…');
    var pc=new RTCPeerConnection(ICE);V.pc=pc;var t=Date.now();V.t=t;var tr=pc.addTransceiver('video',{direction:'recvonly'});lowLat(tr);V.ch=pc.createDataChannel('q');V.ch.onopen=function(){sendQ()};V.ch.onmessage=function(m){try{var j=JSON.parse(m.data);if(j.ok)V.qok=j.ok;qui()}catch(_){}};
    pc.ontrack=function(e){setTimeout(applyJb,0);vv.srcObject=e.streams[0]||new MediaStream([e.track]);var p=vv.play();if(p&&p.catch)p.catch(function(){})};
    pc.onconnectionstatechange=function(){if(V.pc!==pc)return;var s=pc.connectionState;
      if(s==='connected'){clearTimeout(V.timer);msg('');wupd(function(d){if(d.sig[DID]){delete d.sig[DID];return d}return null}).catch(function(){})}
      else if(s==='failed'){fail("Connexion impossible (réseaux différents ou pare-feu). Mets-toi sur le même Wi-Fi que l’ordinateur.")}
      else if(s==='disconnected'){msg('Connexion instable…')}};
    pc.createOffer().then(function(o){return pc.setLocalDescription(o)}).then(function(){return iceDone(pc,3500)}).then(function(){
      return wupd(function(d){d.sig[DID]={o:pc.localDescription.sdp,t:t};return d})}).then(function(){
      msg('En attente de l’ordinateur…');var tries=0,sent=Date.now();
      V.poll=setInterval(function(){if(V.pc!==pc){clearInterval(V.poll);return}tries++;
        rd(true).then(function(R){var s=R.d.sig&&R.d.sig[DID];if(s&&s.t===t&&s.a){clearInterval(V.poll);msg('Connexion…');pc.setRemoteDescription({type:'answer',sdp:s.a}).catch(function(){fail('Réponse invalide, réessaie.')})}
          else if(tries>80){clearInterval(V.poll);fail("L’ordinateur ne répond pas. Vérifie que « 📡 Diffuser » est actif.")}
          else if(Date.now()-sent>12000&&!(s&&s.t===t&&s.o)){sent=Date.now();msg('En attente de l’ordinateur… (nouvel envoi)');wupd(function(d){d.sig[DID]={o:pc.localDescription.sdp,t:t};return d}).catch(function(){})}}).catch(function(){})},1500);
      V.timer=setTimeout(function(){if(V.pc===pc&&pc.connectionState!=='connected')fail("Connexion trop longue. Réessaie, ou mets-toi sur le même Wi-Fi que l’ordinateur.")},90000)}).catch(function(e){fail('Erreur : '+e.message)});
    V.watch=setInterval(function(){rd(true).then(function(R){if(!R.same&&!hostLive(R.d)&&V.pc){vstop(true);fail('La diffusion est terminée.')}}).catch(function(){})},8000)}
  lb.onclick=function(){if(!token()){alert('Active la synchro avec le jeton GitHub pour voir le live.');return}lv.hidden=false;document.getElementById('lvcap').textContent='Incruste live · '+(V.host?V.host.n:'');document.body.style.overflow='hidden';vconnect()};
  vre.onclick=function(){rd(false).then(function(R){paintLb(R.d);if(!V.host){fail('Aucune diffusion en cours.');return}vconnect()}).catch(function(){vconnect()})};
  document.getElementById('lvclose').onclick=function(){setFs(false);lv.hidden=true;document.body.style.overflow='';vstop(false)};
  function setFs(on){lv.classList.toggle('fs',on);try{if(on){var r=lv.requestFullscreen||lv.webkitRequestFullscreen;if(r){var p=r.call(lv);if(p&&p.catch)p.catch(function(){})}}else if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}}catch(e){}}
  document.getElementById('lvfs').onclick=function(){setFs(true)};document.getElementById('lvx').onclick=function(){setFs(false)};
  document.addEventListener('fullscreenchange',function(){if(!document.fullscreenElement)lv.classList.remove('fs')});
}
})();
