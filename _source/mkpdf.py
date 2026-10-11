import sys
from playwright.sync_api import sync_playwright
css='''
@page{size:A4 landscape;margin:6mm}
body{background:#fff!important}
.wrap{max-width:none!important;padding:0!important;margin:0!important}
nav.days{display:none!important}
.dayhead{break-before:page;break-after:avoid;margin:0 0 2px!important;padding-bottom:2px!important}
.dayhead .jn{font-size:20px!important}
.seq{margin-top:2px!important}
.seq h2{font-size:15px!important;margin:0!important}
.src{font-size:9px!important;margin:0!important}
.shot{display:grid!important;grid-template-columns:1.2fr 1fr!important;gap:10px!important;break-inside:avoid;margin-top:3px!important;padding:6px!important;align-items:start;height:90mm;overflow:hidden}
.pic{background:transparent!important}
.pic img{max-height:76mm!important;width:100%;object-fit:contain}
.keep{break-inside:avoid}
.zoom{display:none!important}
.shot-info{gap:4px!important;font-size:10.5px!important}
.shot-info p,.shot-info dd,.shot-info dt{font-size:10.5px!important;line-height:1.3!important;margin:0!important}
.foc{font-size:20px!important}
.plan{font-size:11px!important}
.grid{gap:2px 8px!important}
'''
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1123,'height':794}); pg.goto('file:///home/claude/site/index.html'); pg.wait_for_timeout(1500)
    pg.emulate_media(media='print'); pg.add_style_tag(content=css)
    pg.pdf(path=sys.argv[1],prefer_css_page_size=True,print_background=True)
    b.close()
