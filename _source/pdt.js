/* Bouton PDT + horaires — lus en direct dans le tableur Google Sheets (repli : pdt.json, puis dernier état en cache) */
(function(){
'use strict';
var SID='1PLOfV565TSiZAZUXRAENBZw_GuMrHH9G365ocodiuzE';
var URL_PDT='https://docs.google.com/spreadsheets/d/'+SID+'/edit?usp=drivesdk';
var TABS={J1:'sheet=Jour%201',J2:'gid=570741923',J3:'gid=1003886348',J4:'gid=1859686738',J5:'gid=2138050842'};
var bar=document.getElementById('edbar');
if(bar){var b=document.createElement('button');b.type='button';b.id='edpdt';b.textContent='🗓 PDT';b.setAttribute('aria-label','Plan de travail (Google Sheets)');
  b.onclick=function(){window.open(URL_PDT,'_blank','noopener')};var rp=document.getElementById('edrep');bar.insertBefore(b,rp?rp.nextSibling:bar.firstChild)}
var css=document.createElement('style');css.textContent='.pdtline{display:flex;flex-wrap:wrap;gap:6px 14px;margin:8px 0 0;padding:8px 12px;border:1px solid var(--line,#444);border-left:4px solid var(--key,#3ddc84);border-radius:6px;background:var(--surface,#222);font:600 .85rem var(--body,system-ui)}.pdtline span small{display:block;font:500 .65rem var(--body,system-ui);text-transform:uppercase;letter-spacing:.06em;color:var(--muted,#999)}.pdtline a{margin-left:auto;align-self:center;font:600 .8rem var(--body,system-ui);color:inherit}.pdtline em{flex-basis:100%;font:500 .65rem var(--body,system-ui);color:var(--muted,#999);font-style:normal}.pdtseq{display:flex;flex-wrap:wrap;gap:4px 12px;margin:4px 0 8px;font:600 .8rem var(--body,system-ui);color:var(--muted,#999)}.pdtseq b{color:var(--key,#3ddc84)}';
document.head.appendChild(css);
function esc(s){return String(s).replace(/\u0300-\u036f]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var STOP={le:1,la:1,les:1,l:1,de:1,du:1,des:1,d:1,the:1};
function toks(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim().split(' ').filter(function(w){return w&&!STOP[w]})}
function same(a,b){var A=toks(a),B=toks(b);if(!A.length||!B.length)return false;if(A[0]===B[0])return true;return A.every(function(w){return B.indexOf(w)>=0})||B.every(function(w){return A.indexOf(w)>=0})}
function hhmm(c){if(!c)return '';var s=c.f!=null&&c.f!==''?String(c.f):(c.v!=null?String(c.v):'');var m=s.match(/(\d{1,2})[:h](\d{2})/);if(m)return ('0'+m[1]).slice(-2)+':'+m[2];m=s.match(/Date\(\d+,\d+,\d+,(\d+),(\d+)/);return m?('0'+m[1]).slice(-2)+':'+('0'+m[2]).slice(-2):''}
function txt(c){return c?String(c.f!=null&&c.f!==''?c.f:(c.v!=null?c.v:'')).trim():''}
/* Tableau gviz -> {seqs:[{name,d,f,n,p[]}], install, repas, pat, fin} */
function parse(tbl){var out={seqs:[]},cur=null,rows=(tbl.rows||[]);
  rows.forEach(function(r){var c=r.c||[],d=hhmm(c[0]),f=hhmm(c[1]),n=txt(c[2]),p=txt(c[3]),s=txt(c[4]),all=c.map(txt).join(' ').toLowerCase();
    if(/optionnel/.test(all)&&!d){cur=null;out.stop=true;return}
    if(out.stop)return;
    if(/installation/.test(all)&&d){out.install=d;return}
    if(/pause/.test(all)&&d){out.repas=d+(f?'–'+f:'');return}
    if(/fin de journ|rambal|wrap/.test(all)){return}
    if(d&&f&&n&&s){cur={name:s,d:d,f:f,n:n,p:[p||'1']};out.seqs.push(cur);return}
    if(!d&&!f&&p&&cur&&(!s||same(s,cur.name))){cur.p.push(p);return}
    if(!d&&!f&&!n&&s&&p&&cur&&!/^\(?vide/i.test(s)&&!same(s,cur.name)){/* ligne sans horaire d'un autre sketch : ignorée */}
  });
  if(out.seqs.length){out.pat=out.seqs[0].d;out.fin=out.seqs[out.seqs.length-1].f}
  return out}
function render(id,base,live,src){var d=document.getElementById(id);if(!d)return;var head=d.querySelector('.dayhead');if(!head)return;
  Array.prototype.forEach.call(d.querySelectorAll('.pdtline,.pdtseq'),function(e){e.remove()});
  var p={};['lieu','conv','install','pat','repas','fin'].forEach(function(k){p[k]=(live&&live[k])||(base&&base[k])||''});
  var items=[['Lieu',p.lieu],['Installation',p.install],['Convocation',p.conv],['PAT',p.pat],['Pause repas',p.repas],['Fin prévue',p.fin]].filter(function(x){return x[1]});
  if(items.length){var el=document.createElement('div');el.className='pdtline';
    el.innerHTML=items.map(function(x){return '<span><small>'+x[0]+'</small>'+esc(x[1])+'</span>'}).join('')+'<a href="'+URL_PDT+'" target="_blank" rel="noopener">Voir le PDT ↗</a>'+(src?'<em>'+esc(src)+'</em>':'');
    head.insertAdjacentElement('afterend',el)}
  var seqs=(live&&live.seqs&&live.seqs.length)?live.seqs:((base&&base.seqs)||[]).map(function(q){return{name:q.m,d:q.d,f:q.f,n:q.n,p:String(q.p).split(' + ')}});
  var arts=d.querySelectorAll('article.seq'),used={};
  seqs.forEach(function(q){for(var i=0;i<arts.length;i++){if(used[i])continue;var h2=arts[i].querySelector('h2');if(!h2||!same(q.name,h2.textContent))continue;used[i]=1;
    var bx=document.createElement('div');bx.className='pdtseq';bx.innerHTML='<b>'+esc(q.d)+' → '+esc(q.f)+'</b><span>Séq. '+esc(q.n)+'</span><span>Plan '+esc(q.p.join(' + '))+'</span>';h2.insertAdjacentElement('afterend',bx);break}})}
/* lecture du tableur (JSONP : fonctionne depuis n'importe quel domaine, sans CORS) */
var BASE={},LIVE={},seq=0;
function load(id,cb){var fn='__lgiPdt'+(++seq),s=document.createElement('script'),done=false;
  window[fn]=function(r){done=true;try{if(r&&r.status==='ok'&&r.table)cb(parse(r.table))}catch(e){}cleanup()};
  function cleanup(){try{delete window[fn]}catch(e){window[fn]=undefined}s.remove()}
  s.onerror=function(){if(!done)cleanup()};
  s.src='https://docs.google.com/spreadsheets/d/'+SID+'/gviz/tq?headers=0&'+TABS[id]+'&tqx=responseHandler:'+fn;
  document.head.appendChild(s);setTimeout(function(){if(!done)cleanup()},15000)}
function refresh(){Object.keys(TABS).forEach(function(id){if(!document.getElementById(id))return;
  load(id,function(live){if(!live.seqs.length)return;live.t=Date.now();LIVE[id]=live;try{localStorage.setItem('lgi.pdt.'+id,JSON.stringify(live))}catch(e){}
    render(id,BASE[id],live,'Synchronisé avec le tableur à '+new Date().toTimeString().slice(0,5))})})}
fetch('pdt.json',{cache:'no-cache'}).then(function(r){return r.json()}).catch(function(){return {}}).then(function(P){
  BASE=P;
  Object.keys(TABS).concat(Object.keys(P)).forEach(function(id){if(!document.getElementById(id))return;var c=null;
    try{c=JSON.parse(localStorage.getItem('lgi.pdt.'+id)||'null')}catch(e){}
    if(c){LIVE[id]=c;render(id,P[id],c,'Dernière synchro tableur : '+new Date(c.t).toLocaleString('fr-FR',{weekday:'short',hour:'2-digit',minute:'2-digit'}))}
    else render(id,P[id],null,'')});
  if(navigator.onLine!==false)refresh();
  setInterval(function(){if(!document.hidden&&navigator.onLine!==false)refresh()},60000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)refresh()});
  window.addEventListener('online',refresh)});
})();
