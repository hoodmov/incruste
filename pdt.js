/* Bouton PDT + horaires de journée (source : tableur « Déroulé tournage » Google Sheets) */
(function(){
'use strict';
var URL_PDT='https://docs.google.com/spreadsheets/d/1PLOfV565TSiZAZUXRAENBZw_GuMrHH9G365ocodiuzE/edit?usp=drivesdk';
var bar=document.getElementById('edbar');
if(bar){var b=document.createElement('button');b.type='button';b.id='edpdt';b.textContent='🗓 PDT';b.setAttribute('aria-label','Plan de travail (Google Sheets)');
  b.onclick=function(){window.open(URL_PDT,'_blank','noopener')};var rp=document.getElementById('edrep');bar.insertBefore(b,rp?rp.nextSibling:bar.firstChild)}
var css=document.createElement('style');css.textContent='.pdtline{display:flex;flex-wrap:wrap;gap:6px 14px;margin:8px 0 0;padding:8px 12px;border:1px solid var(--line,#444);border-left:4px solid var(--key,#3ddc84);border-radius:6px;background:var(--surface,#222);font:600 .85rem var(--body,system-ui)}.pdtline span small{display:block;font:500 .65rem var(--body,system-ui);text-transform:uppercase;letter-spacing:.06em;color:var(--muted,#999)}.pdtline a{margin-left:auto;align-self:center;font:600 .8rem var(--body,system-ui);color:inherit}';
document.head.appendChild(css);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
fetch('pdt.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(P){
  Object.keys(P).forEach(function(id){var d=document.getElementById(id),p=P[id];if(!d)return;var head=d.querySelector('.dayhead');if(!head)return;
    var items=[['Lieu',p.lieu],['Installation',p.install],['Convocation',p.conv],['PAT',p.pat],['Pause repas',p.repas],['Fin prévue',p.fin]].filter(function(x){return x[1]});
    if(!items.length)return;var el=document.createElement('div');el.className='pdtline';
    el.innerHTML=items.map(function(x){return '<span><small>'+x[0]+'</small>'+esc(x[1])+'</span>'}).join('')+'<a href="'+URL_PDT+'" target="_blank" rel="noopener">Voir le PDT ↗</a>';
    head.insertAdjacentElement('afterend',el)})}).catch(function(){});
})();
