# live.html = page autonome (en-tête) + composant Incruste live + fin
h=open('/home/claude/live_head.html').read();l=open('/home/claude/livekey.html').read();t=open('/home/claude/live_tail.html').read()
import json as _js
try:_B=_js.load(open('/home/claude/incruste/version.json'))['v']
except Exception:_B=''
t=t.replace('</body></html>','<script>window.LGI_BUILD='+repr(_B)+'</script><script src="update.js"></script></body></html>',1) if _B else t
open('/home/claude/incruste/live.html','w').write(h+l+t)
