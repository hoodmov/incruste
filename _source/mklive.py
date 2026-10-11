# live.html = page autonome (en-tête) + composant Incruste live + fin
h=open('/home/claude/live_head.html').read();l=open('/home/claude/livekey.html').read();t=open('/home/claude/live_tail.html').read()
open('/home/claude/incruste/live.html','w').write(h+l+t)
