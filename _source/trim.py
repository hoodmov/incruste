import numpy as np
from PIL import Image
def runs(mask):
    best=(0,0);s=None
    for i,v in enumerate(list(mask)+[False]):
        if v and s is None: s=i
        if not v and s is not None:
            if i-s>best[1]-best[0]: best=(s,i)
            s=None
    return best
def trim(im):
    g=np.asarray(im.convert('L')).astype(int)
    white=(g>232)
    rows=white.mean(1)<0.80
    r0,r1=runs(rows); g2=white[r0:r1]
    cols=g2.mean(0)<0.80
    c0,c1=runs(cols)
    return im.crop((c0,r0,c1,r1))
