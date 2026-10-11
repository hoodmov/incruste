import os
from PIL import Image as _Im
def _wh(src):
    try:
        w,h=_Im.open('/home/claude/incruste/'+src.split('?')[0]).size
        return f' width="{w}" height="{h}"'
    except Exception:
        return ''
import html, collections, re
exec(open('/home/claude/data.py').read()); D=build()
exec(open('/home/claude/ratios_data.py').read())
E=html.escape
def mm(v):
    v=str(v)
    return v.replace(' (',' m (',1) if '(' in v and ' m' not in v.split('(')[0] else v+' m'
def chip(s):
    k={'G Master 16-35':'gm','G Master 24-70':'gm','G Master 70-200':'gm','Canon FD':'fd','Zoom télé vintage':'vz'}.get(s,'')
    return f'<span class="chip {k}">{E(s)}</span>'
# kit summary
gm=collections.OrderedDict((z,collections.Counter()) for z in ['16-35','24-70','70-200']); fd=collections.Counter(); vz=collections.Counter()
for d in D:
    for s_ in d['seqs']:
        for x in s_['shots']:
            if not x['s']: continue
            if x['s'].startswith('G Master'):
                gm[x['s'].replace('G Master ','')][int(re.match(r'(\d+)',x['f']).group(1))]+=1
            elif x['s']=='Canon FD':
                m=re.match(r'(35-70|\d+)',x['f']).group(1); fd[m]+=1
            else:
                vz['Position longue ≈ 85 mm' if 'longue' in x['f'] else 'Position grand-angle ≈ 24-28 mm']+=1
def li(lbl,v): return f'<li><b>{E(lbl)}</b><span>{v} plan{"s" if v>1 else ""}</span></li>'
gmh=''.join(li(f'{z} @ '+' · '.join(f'{f}' for f in sorted(c))+' mm',sum(c.values())) for z,c in gm.items())
fdh=''.join(li(('Zoom 35-70' if k=='35-70' else f'{k} mm'),v) for k,v in sorted(fd.items(),key=lambda kv:int(kv[0].split('-')[0])))
vzh=''.join(li(k,v) for k,v in vz.items())
kits=f'<div class="kit gm"><h3>G Master</h3><p class="kd">Studio, fond vert, XR, télé récente</p><ul>{gmh}</ul></div><div class="kit fd"><h3>Canon FD</h3><p class="kd">Refs argentiques et clips anciens</p><ul>{fdh}</ul></div><div class="kit vz"><h3>Zoom télé vintage</h3><p class="kd">Archives INA</p><ul>{vzh}</ul></div>'
nav=''.join(f'<a href="#{d["id"]}"><b>{d["id"]}</b><span>{d["date"].split()[1]}</span></a>' for d in D)
body=[]
for d in D:
    nshots=sum(len(s['shots']) for s in d['seqs'])
    miss=''.join(f'<li>{E(m)}</li>' for m in d['missing'])
    body.append(f'<section class="day" id="{d["id"]}"><header class="dayhead"><div class="slate"><span class="jn">{d["id"]}</span><span class="dt">{E(d["date"])}</span></div><div class="dmeta"><span>{E(d["lieu"])}</span><span>{E(d["ie"])}</span><span>{len(d["seqs"])} séquences · {nshots} refs</span></div></header>')
    if miss: body.append(f'<ul class="missing">{miss}</ul>')
    for s in d['seqs']:
        body.append(f'<article class="seq"><div class="keep"><h2>{E(s["name"])}</h2>')
        if s['src']: body.append(f'<p class="src">{E(s["src"])}</p>')
        if s['extra']: body.append(f'<p class="src">{E(s["extra"])}</p>')
        if s['name'] in VIDEOS: body.append(f'<button class="vidbtn" type="button" data-src="vid/{VIDEOS[s["name"]]}.mp4" data-cap="Vidéo de référence · {E(s["name"])}"><span class="pl">▶</span> Voir la vidéo de référence</button>')
        for qi,x in enumerate(s['shots']):
            cap=(f'RÉFÉRENCE (non tournée) · {s["name"]} · {x["plan"]}' if x['ref'] else f'#{x["n"]} · {s["name"]} · {x["plan"]}')
            pic=f'<button class="pic" type="button" data-full="{x["img"]}"{(" data-clean=\""+x["img"].replace("img/","img/clean/")+"?v="+__import__("hashlib").md5(open("/home/claude/incruste/"+x["img"].replace("img/","img/clean/"),"rb").read()).hexdigest()[:8]+"\"") if os.path.exists("/home/claude/incruste/"+x["img"].replace("img/","img/clean/")) else ""} data-cap="{E(cap)}" aria-label="Agrandir l&#39;image"><img src="{x["img"]}" alt="{E(cap)}" loading="lazy"{_wh(x["img"])}><span class="zoom">Agrandir</span></button><button class="lkbtn" type="button" data-img="{x["img"]}" data-cap="{E(cap)}"{(" data-vid=\"vid/"+VIDEOS[s["name"]]+".mp4\"") if s["name"] in VIDEOS else ""}>◉ Incruste live</button>'
            if x['s']:
                specs=f'''<div class="lens">{chip(x["s"])}<span class="foc">{E(x["f"])}</span></div>
<dl class="grid"><div><dt>Diaph</dt><dd>{E(x["d"])}</dd></div><div><dt>Distance</dt><dd>{E(mm(x["dist"]))}</dd></div><div><dt>Hauteur caméra</dt><dd>{E(mm(x["h"]))}</dd></div><div><dt>Inclinaison</dt><dd>{E(x["tilt"])}</dd></div></dl>'''
            else:
                specs=''
            tag='<span class="refbadge">Référence · non tournée</span>' if x['ref'] else f'<span class="n">#{x["n"]}</span>'
            body.append(f'''<div class="shot{' isref' if x['ref'] else ''}"><div class="shot-pic">{pic}</div><div class="shot-info"><p class="plan">{tag}{E(x["plan"])}</p>{specs}
<div class="light"><h4>Lumière</h4><p>{E(x["lum"])}</p>{('<p class="ratio"><span>'+E(ratio_txt(x["img"][4:7]))+'</span></p>') if ratio_txt(x["img"][4:7]) else ''}</div><p class="read"><b>Lecture du screen :</b> {E(x["lec"])}</p><p class="vfx">{E(x["vfx"])}</p><p class="lfx"><span class="lfxv">{E(x.get("lfx") or "—")}</span></p></div></div>''' + ('</div>' if qi==0 else ''))
        if s.get('cards'):
            body.append('<div class="cards">'+''.join(f'<div class="card">'+(f'<img src="img/{c[3].split("/")[-1]}" style="width:100%;border-radius:6px;display:block;margin-bottom:6px">' if len(c)>3 else '')+f'<span class="refbadge">À tourner{"" if len(c)>3 else " · pas d\'image"}</span><h3>{E(c[0])}</h3><p>{E(c[1])}</p><p class="acc"><b>Accessoires :</b> {E(c[2])}</p></div>' for c in s['cards'])+'</div>')
        body.append('</article>')
    body.append('</section>')
removed=''.join(f'<li>{E(r)}</li>' for r in REMOVED); hors=''.join(f'<li>{E(r)}</li>' for r in HORS)
LIVEKEY=open('/home/claude/livekey.html').read()
PLANS=open('/home/claude/plans.html').read()
EDITOR=open('/home/claude/editor.html').read()
import json as _j
POLISH=open('/home/claude/polish.html').read()
TEXTES=open('/home/claude/textes.html').read().replace('__TXTMAP__',_j.dumps(_j.load(open('/home/claude/textes_map.json')),ensure_ascii=False))
page=f'''<title>Fiches caméra Grande Incruste</title>
<meta property="og:title" content="La Grande Incruste 3 – Fiches caméra"><meta property="og:description" content="Optique, focale, distance, hauteur et lumière pour chaque plan, J1 à J11."><meta property="og:image" content="img/001.jpg">
<link rel="manifest" href="manifest.json"><link rel="apple-touch-icon" href="apple-touch-icon.png"><meta name="theme-color" content="#ecebe6" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#101010" media="(prefers-color-scheme: dark)"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Incruste"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
/* Layout : feuille de service caméra — rail de jours collant, une fiche par ref (screen en grand, puis réglages FX6 et lumière) */
:root{{--bg:#ecebe6;--surface:#ffffff;--ink:#141414;--muted:#66655f;--line:#e2e1db;--key:#0f8a52;--gm:#c75f12;--fd:#b8232b;--vz:#2f62c4;--chipfg:#ffffff;
--display:"Big Shoulders Display","Barlow Condensed","Arial Narrow",sans-serif;--body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,monospace}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#101010;--surface:#1a1a19;--ink:#efeee9;--muted:#9d9c96;--line:#2e2e2b;--key:#3cc583;--gm:#f08a3c;--fd:#e8595f;--vz:#7099f0;--chipfg:#0e1211;color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#101010;--surface:#1a1a19;--ink:#efeee9;--muted:#9d9c96;--line:#2e2e2b;--key:#3cc583;--gm:#f08a3c;--fd:#e8595f;--vz:#7099f0;--chipfg:#0e1211;color-scheme:dark}}
*{{box-sizing:border-box}}
body{{background:var(--bg);color:var(--ink);font:15px/1.5 var(--body);margin:0}}
.wrap{{max-width:1760px;margin:0 auto;padding-inline:clamp(16px,2.5vw,48px);padding-block:20px 60px}}
h1,h2,h3{{font-family:var(--display);text-wrap:balance;margin:0;letter-spacing:.01em}}
h1{{font-size:clamp(2rem,6vw,3.2rem);line-height:1;text-transform:uppercase}}
.lede{{color:var(--muted);max-width:65ch;margin:.6rem 0 0}}
.top{{display:grid;gap:16px;margin-block:20px 8px}}
.kits{{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}}
.kit{{background:var(--surface);border:1px solid var(--line);border-top:4px solid var(--key);padding:14px 16px;border-radius:6px}}
.kit.gm{{border-top-color:var(--gm)}}.kit.fd{{border-top-color:var(--fd)}}.kit.vz{{border-top-color:var(--vz)}}
.kit h3{{font-size:1.3rem;text-transform:uppercase}}
.kd{{margin:0 0 8px;color:var(--muted);font-size:.85rem}}
.kit ul{{list-style:none;margin:0;padding:0;display:grid;gap:4px}}
.kit li{{display:flex;justify-content:space-between;gap:8px;font-variant-numeric:tabular-nums;border-bottom:1px dashed var(--line);padding-bottom:3px}}
.kit li span{{color:var(--muted)}}
details.notes{{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:12px 16px}}
details.notes summary{{cursor:pointer;font-weight:600}}
details.notes ul{{margin:.4rem 0 .8rem;padding-left:1.2rem}}
details.notes p{{max-width:70ch}}
nav.days{{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--bg);display:flex;gap:6px;overflow-x:auto;padding-block:10px;border-bottom:1px solid var(--line);margin-inline:-16px;padding-inline:16px;scrollbar-width:thin}}
nav.days a{{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;text-decoration:none;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:4px 10px;line-height:1.1}}
nav.days a b{{font-family:var(--display);font-size:1.15rem}}
nav.days a span{{font:500 .72rem var(--mono);color:var(--muted)}}
nav.days a:focus-visible,.pic:focus-visible,button:focus-visible{{outline:3px solid var(--key);outline-offset:2px}}
.day{{scroll-margin-top:72px;margin-top:34px}}
.dayhead{{display:flex;flex-wrap:wrap;align-items:end;gap:10px 20px;border-bottom:3px solid var(--ink);padding-bottom:8px}}
.slate{{display:flex;align-items:baseline;gap:12px}}
.jn{{font:700 clamp(2.4rem,8vw,3.6rem)/1 var(--display);background:var(--ink);color:var(--bg);padding:2px 12px;border-radius:4px}}
.dt{{font:700 clamp(1.4rem,4vw,2rem)/1 var(--display);text-transform:uppercase}}
.dmeta{{display:flex;flex-wrap:wrap;gap:6px}}
.dmeta span{{font:500 .78rem var(--mono);text-transform:uppercase;letter-spacing:.06em;border:1px solid var(--line);padding:2px 8px;border-radius:99px;color:var(--muted)}}
.missing{{list-style:none;padding:0;margin:10px 0 0;display:flex;flex-wrap:wrap;gap:6px}}
.missing li{{font-size:.85rem;border:1px dashed var(--muted);border-radius:4px;padding:2px 8px;color:var(--muted)}}
.seq{{margin-top:24px}}
.seq h2{{font-size:clamp(1.5rem,4.5vw,2.1rem);text-transform:uppercase;line-height:1.05}}
.src{{color:var(--muted);font-size:.86rem;margin:.25rem 0 0;max-width:80ch}}
.shot{{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(340px,1fr);gap:16px;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px;margin-top:12px}}
@media (max-width:760px){{.shot{{grid-template-columns:1fr}}}}
@media (max-width:600px){{.wrap{{padding-inline:12px}}.shot{{gap:0;padding:0 0 14px;margin-inline:-12px;border-left:0;border-right:0;border-radius:0}}.shot.isref{{border-left:0;border-right:0;border-width:2px 0}}.shot-pic .pic{{border-radius:0}}.shot-pic .pic img{{max-height:none}}.shot-pic .lkbtn{{margin:10px 12px 0}}.shot-info{{padding:12px 12px 0}}}}
.shot-info{{min-width:0;display:flex;flex-direction:column;gap:10px}}
.pic{{display:block;position:relative;width:100%;padding:0;border:0;background:#000;border-radius:4px;overflow:hidden;cursor:zoom-in}}
.pic img{{display:block;width:100%;height:auto;max-height:70vh;object-fit:contain}}
.zoom{{position:absolute;right:8px;bottom:8px;font:600 .72rem var(--body);text-transform:uppercase;letter-spacing:.06em;background:rgba(0,0,0,.6);color:#fff;padding:3px 8px;border-radius:3px}}
.plan{{margin:0;font-weight:600;font-size:1.02rem}}
.plan .n{{font:500 .8rem var(--mono);color:var(--muted);margin-right:8px}}
.lens{{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}}
.chip{{font:600 .74rem var(--body);text-transform:uppercase;letter-spacing:.06em;padding:3px 9px;border-radius:3px;color:var(--chipfg);background:var(--muted)}}
.chip.gm{{background:var(--gm)}}.chip.fd{{background:var(--fd)}}.chip.vz{{background:var(--vz)}}.cards{{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:12px}}.card{{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px}}.card h3{{margin:8px 0 4px;font-size:1.1rem}}.card p{{margin:4px 0;font-size:.95rem}}.card .acc{{color:var(--muted)}}.shot.isref{{background:transparent;border:2px dashed var(--muted)}}.refbadge{{display:inline-block;font:700 .72rem var(--body);text-transform:uppercase;letter-spacing:.08em;color:var(--ink);border:1px solid var(--muted);border-radius:3px;padding:2px 8px;margin-right:8px;background:var(--surface)}}.shot.isref .pic img{{opacity:.92}}.chip.ref{{background:var(--line);color:var(--ink)}}
.foc{{font:700 clamp(1.7rem,5vw,2.3rem)/1 var(--display)}}
.foc.small{{font-size:1.1rem}}
.grid{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden;margin:0}}
.grid div{{background:var(--surface);padding:7px 10px;min-width:0}}
.grid dt{{font:500 .68rem var(--body);text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}}
.grid dd{{margin:0;font:500 1rem var(--mono);font-variant-numeric:tabular-nums}}
.light{{border-left:4px solid var(--key);padding:2px 0 2px 10px}}
.light h4{{margin:0;font:600 .7rem var(--body);text-transform:uppercase;letter-spacing:.08em;color:var(--key)}}
.light p{{margin:2px 0 0}}
.read{{margin:0;font-size:.88rem;color:var(--muted)}}
.read b{{color:var(--ink);font-weight:600}}
.vfx{{margin:0;font:500 .78rem var(--mono);color:var(--muted);border-top:1px solid var(--line);padding-top:6px}}
.vfx::before{{content:"Note VFX · ";color:var(--ink)}}
.light .ratio{{margin:8px 0 0;padding:6px 8px;border-radius:4px;background:rgba(224,160,32,.10);font:600 .8rem var(--body);color:var(--ink)}}
.light .ratio::before{{content:"Face match · ";color:#e0a020;font-weight:700}}
.lfx{{margin:6px 0 0;font:500 .78rem var(--mono);color:var(--muted)}}
.lfx::before{{content:"Note lumière · ";color:#e0a020;font-weight:700}}
#vb[hidden]{{display:none!important}}
#vb{{position:fixed;inset:0;z-index:30;background:rgba(0,0,0,.95);display:flex;flex-direction:column;padding:calc(env(safe-area-inset-top,0px) + 8px) 8px calc(env(safe-area-inset-bottom,0px) + 8px);gap:8px}}
#vb video{{flex:1;min-height:0;width:100%;background:#000}}
#vb .bar{{display:flex;align-items:center;gap:8px;color:#fff}}
#vb .bar p{{flex:1;margin:0;font-size:.9rem}}
#vb button{{background:#222;color:#fff;border:1px solid #444;border-radius:4px;font:600 .9rem var(--body);padding:8px 12px;cursor:pointer}}
.vidbtn{{display:inline-flex;align-items:center;gap:10px;margin:10px 0 0;padding:10px 16px;border-radius:6px;border:1px solid var(--key);background:transparent;color:var(--ink);font:600 .95rem var(--body);cursor:pointer}}
.vidbtn .pl{{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--key);color:var(--chipfg);font-size:.8rem}}
.vidbtn:hover{{background:var(--surface)}}
#lb[hidden]{{display:none!important}}
#lb{{position:fixed;inset:0;z-index:20;background:rgba(0,0,0,.94);display:flex;flex-direction:column;padding:calc(env(safe-area-inset-top,0px) + 8px) 8px calc(env(safe-area-inset-bottom,0px) + 8px)}}
#lb img{{flex:1;min-height:0;width:100%;object-fit:contain}}
#lb .bar{{display:flex;align-items:center;gap:8px;color:#fff}}
#lb .bar p{{flex:1;margin:0;font-size:.85rem;min-width:0}}
#lb button{{background:#222;color:#fff;border:1px solid #444;border-radius:4px;font:600 .9rem var(--body);padding:8px 12px;cursor:pointer}}
@media (prefers-reduced-motion:no-preference){{.pic img{{transition:transform .25s}}.pic:hover img{{transform:scale(1.02)}}}}
</style>
<div class="wrap">
<nav class="days" aria-label="Jours de tournage">{nav}</nav>
{''.join(body)}
</div>
<div id="vb" hidden role="dialog" aria-modal="true" aria-label="Vidéo de référence"><div class="bar"><p id="vbcap"></p><button id="vbclose" type="button">Fermer</button></div><video id="vbvid" controls playsinline preload="none"></video></div>
<div id="lb" hidden role="dialog" aria-modal="true" aria-label="Ref en grand"><div class="bar"><button id="lbprev" type="button" aria-label="Image précédente">◀</button><p id="lbcap"></p><button id="lbnext" type="button" aria-label="Image suivante">▶</button><button id="lbclose" type="button">Fermer</button></div><img id="lbimg" alt=""></div>
{PLANS}
{LIVEKEY}
{EDITOR}
{TEXTES}
{POLISH}
<script src="diffusion.js"></script>
<script src="offline.js"></script>
<script src="pdt.js"></script>
<script src="clean.js"></script>
<script>
(function(){{
var pics=[].slice.call(document.querySelectorAll('.pic')),lb=document.getElementById('lb'),im=document.getElementById('lbimg'),cap=document.getElementById('lbcap'),i=0,last=null;
function show(k){{i=(k+pics.length)%pics.length;var p=pics[i];im.src=p.dataset.full;im.alt=p.dataset.cap;cap.textContent=p.dataset.cap;}}
pics.forEach(function(p,k){{p.addEventListener('click',function(){{last=p;show(k);lb.hidden=false;document.body.style.overflow='hidden';document.getElementById('lbclose').focus();}});}});
function close(){{lb.hidden=true;document.body.style.overflow='';if(last)last.focus();}}
document.getElementById('lbclose').onclick=close;
document.getElementById('lbprev').onclick=function(){{show(i-1)}};
document.getElementById('lbnext').onclick=function(){{show(i+1)}};
im.addEventListener('click',close);
document.addEventListener('keydown',function(e){{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1);}});
var x0=null;lb.addEventListener('touchstart',function(e){{x0=e.touches[0].clientX}},{{passive:true}});
lb.addEventListener('touchend',function(e){{if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)show(i+(dx<0?1:-1));x0=null;}});
var vb=document.getElementById('vb'),vv=document.getElementById('vbvid'),vc=document.getElementById('vbcap'),vlast=null;
function vclose(){{vv.pause();vv.removeAttribute('src');vv.load();vb.hidden=true;document.body.style.overflow='';if(vlast)vlast.focus();}}
[].forEach.call(document.querySelectorAll('.vidbtn'),function(b){{b.addEventListener('click',function(){{vlast=b;vv.src=b.dataset.src;vc.textContent=b.dataset.cap;vb.hidden=false;document.body.style.overflow='hidden';vv.play&&vv.play().catch(function(){{}});document.getElementById('vbclose').focus();}});}});
document.getElementById('vbclose').onclick=vclose;
document.addEventListener('keydown',function(e){{if(!vb.hidden&&e.key==='Escape')vclose();}});
}})();
</script>'''
open('/home/claude/site/index.html','w').write(page)
print(len(page))
