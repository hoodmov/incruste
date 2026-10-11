import sys
from playwright.sync_api import sync_playwright
css='''
@page{size:210mm 297mm;margin:7mm}
table.wrapt{width:100%;border-collapse:collapse}table.wrapt>thead{display:table-header-group}table.wrapt td{padding:0}
.dayhead{scroll-margin-top:20mm}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
nav.days{position:static!important;display:flex!important;flex-wrap:nowrap;margin:0!important;padding:6px 0!important;background:#0e1211!important;z-index:50;border:0!important}
nav.days a{font-size:15px!important;padding:6px 12px!important;flex:1}
.wrap{padding-top:0!important}
.back{position:absolute;right:0;top:6px;font:600 13px sans-serif;color:#3cc583!important;text-decoration:none;border:1px solid #2a3331;border-radius:6px;padding:4px 10px}
.dayhead{position:relative}
.dayhead{break-before:page}
section.day:first-of-type .dayhead{break-before:auto}
.shot{break-inside:avoid}
.keep{break-inside:avoid}
.zoom{display:none!important}
.wrap{max-width:none!important}
.pic img{max-height:105mm!important}
'''
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':900,'height':1400},color_scheme='dark'); pg.goto('file:///home/claude/site/index.html'); pg.wait_for_timeout(2000)
    pg.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')"); pg.wait_for_timeout(3000); pg.evaluate("document.querySelector('nav.days').id='top';"); pg.evaluate('''const nav=document.querySelector('nav.days');const w=document.querySelector('.wrap');const t=document.createElement('table');t.className='wrapt';t.innerHTML='<thead><tr><td></td></tr></thead><tbody><tr><td></td></tr></tbody>';t.querySelector('thead td').appendChild(nav);t.querySelector('tbody td').appendChild(w.cloneNode(false));document.body.appendChild(t);const nw=t.querySelector('tbody td').firstChild;while(w.firstChild)nw.appendChild(w.firstChild);w.remove();'''); pg.evaluate("document.querySelectorAll('.dayhead').forEach(h=>{const a=document.createElement('a');a.href='#top';a.className='back';a.textContent='↑ Sommaire';h.appendChild(a)})"); pg.emulate_media(color_scheme='dark'); pg.add_style_tag(content=css+'html,body{background:#0e1211!important}')
    pg.pdf(path=sys.argv[1],outline=True,tagged=True,prefer_css_page_size=True,scale=0.82,print_background=True)
    b.close()
