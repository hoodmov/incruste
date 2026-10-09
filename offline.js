/* Enregistre le mode hors ligne + entrées du menu ⋯ */
(function(){
'use strict';
var ok='serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost');
if(ok){try{navigator.serviceWorker.register('sw.js').catch(function(){})}catch(e){}}
var menu=document.getElementById('edmenu');if(!menu||!window.caches)return;
var b1=document.createElement('button'),b2=document.createElement('button');b1.type=b2.type='button';b1.id='edoff';b2.id='edvid';
menu.insertBefore(b2,menu.firstChild);menu.insertBefore(b1,menu.firstChild);
function cnt(n){return caches.open(n).then(function(c){return c.keys()}).then(function(k){return k.length}).catch(function(){return 0})}
function vids(){var s={};[].forEach.call(document.querySelectorAll('[data-vid]'),function(b){s[new URL(b.dataset.vid,location.href).href]=1});return Object.keys(s)}
function paint(){Promise.all([cnt('lgi-img-v1'),cnt('lgi-vid-v1')]).then(function(r){var nv=vids().length;
  b1.textContent='📲 Hors ligne : '+(r[0]?'images prêtes ('+r[0]+')':ok?'préparation en cours…':'indisponible ici');
  b2.textContent='⬇ Vidéos hors ligne : '+r[1]+'/'+nv+(r[1]<nv?' — télécharger (~220 Mo)':' ✓')})}
document.getElementById('edmore').addEventListener('click',paint);paint();
b1.onclick=function(){paint();alert("Mode hors ligne : après la première ouverture avec du réseau, le site, les textes et toutes les images restent disponibles sans connexion.\n\nSur iPhone : pour que ça reste en mémoire, ajoute le site à l'écran d'accueil (Partager → Sur l'écran d'accueil). La synchro et le live ont, eux, besoin du réseau.")};
b2.onclick=function(){var l=vids();if(!l.length)return;if(!confirm('Télécharger les vidéos de référence pour les voir sans connexion (environ 220 Mo) ? Mieux vaut être en Wi-Fi.'))return;
  b2.disabled=true;caches.open('lgi-vid-v1').then(function(c){var i=0,fail=0;
    function next(){if(i>=l.length){b2.disabled=false;paint();if(fail)alert(fail+' vidéo(s) non téléchargée(s). Réessaie.');return}
      var u=l[i++];b2.textContent='⬇ Téléchargement '+i+'/'+l.length+'…';
      c.match(u).then(function(h){if(h)return;return fetch(u).then(function(r){if(!r.ok)throw 0;return c.put(u,r)})}).catch(function(){fail++}).then(next)}
    next()})};
})();
