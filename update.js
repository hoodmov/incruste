/* Nouvelle version du site : bandeau « Mettre à jour » (aucun rechargement automatique, rien ne se passe sans clic).
   Pendant l'Incruste live ou en plein écran : totalement inactif (aucune requête, aucun affichage). */
(function(){
'use strict';
var ME=window.LGI_BUILD||'';if(!ME)return;
var later='',box=null,busy=false;
function css(){if(document.getElementById('lgiupcss'))return;var s=document.createElement('style');s.id='lgiupcss';s.textContent=
'#lgiup{position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147483600;display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 24px);padding:10px 12px 10px 16px;border-radius:12px;background:#141414;color:#fff;box-shadow:0 8px 30px rgb(0 0 0 / .35);font:600 14px/1.3 system-ui,-apple-system,sans-serif}'+
'#lgiup button{border:0;border-radius:8px;padding:8px 12px;font:700 13px system-ui,-apple-system,sans-serif;cursor:pointer}#lgiup .go{background:#3ddc84;color:#06120c}#lgiup .no{background:transparent;color:#bbb}#lgiup .go:disabled{opacity:.6}';
document.head.appendChild(s)}
function busyLive(){var l=document.getElementById('lk');return !!(document.fullscreenElement||document.webkitFullscreenElement||(l&&!l.hidden))}
function host(){return document.fullscreenElement||document.webkitFullscreenElement||document.body}
function show(v){if(v===later)return;css();if(!box){box=document.createElement('div');box.id='lgiup';box.setAttribute('role','status');
  box.innerHTML='<span>Nouvelle version du site disponible</span><button type="button" class="go">Mettre à jour</button><button type="button" class="no">Plus tard</button>';
  box.querySelector('.go').onclick=go;box.querySelector('.no').onclick=function(){later=box.dataset.v||'';box.remove()}}
  box.dataset.v=v;var h=host();if(box.parentNode!==h)h.appendChild(box)}
function go(){if(busy)return;busy=true;var b=box&&box.querySelector('.go');if(b){b.disabled=true;b.textContent='Mise à jour…'}
  var p=[];try{if(navigator.serviceWorker&&navigator.serviceWorker.getRegistration)p.push(navigator.serviceWorker.getRegistration().then(function(r){return r&&r.update()}).catch(function(){}))}catch(e){}
  ['./','index.html','live.html'].forEach(function(u){p.push(fetch(u,{cache:'reload'}).catch(function(){}))});
  var done=false;function rl(){if(done)return;done=true;location.reload()}
  Promise.all(p).then(function(){setTimeout(rl,300)});setTimeout(rl,6000)}
function check(){if(document.hidden||busy||busyLive()){if(box&&box.parentNode&&busyLive())box.remove();return}fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(j){if(j&&j.v&&j.v!==ME)show(j.v)}).catch(function(){})}
document.addEventListener('visibilitychange',function(){if(!document.hidden)check()});
document.addEventListener('fullscreenchange',function(){if(box&&box.parentNode)box.remove()});
setTimeout(check,8000);setInterval(check,60000);
})();
