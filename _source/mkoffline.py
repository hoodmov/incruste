import os,hashlib,re
R='/home/claude/incruste'
h=hashlib.md5()
for f in ['index.html','live.html','textes.json','diffusion.js','pdt.js','pdt.json','clean.js','offline.js','manifest.json']:
    h.update(open(f'{R}/{f}','rb').read())
imgs=sorted('img/'+f for f in os.listdir(f'{R}/img') if f.endswith('.jpg'))+sorted('img/clean/'+f for f in os.listdir(f'{R}/img/clean') if f.endswith('.jpg'))
s=open('/home/claude/sw.js').read().replace('__CORE__','lgi-core-'+h.hexdigest()[:10]).replace('__IMGS__',repr(imgs).replace("'",'"'))
open(f'{R}/sw.js','w').write(s);print('sw',len(imgs),'images')
