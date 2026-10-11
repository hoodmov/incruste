import json
from PIL import Image
B=json.load(open('/home/claude/v12boxes.json'))
MAN={('4','0'):(26,83,570,351),('5','3'):(22,212,274,357),('8','1'):(44,767,307,920),('8','5'):(44,1106,307,1282),
('12','4'):(55,1249,449,1534),('26','1'):(66,1019,986,1534),('29','1'):(26,412,471,756),('30','5'):(28,1413,438,1654),
('17','2'):(18,734,508,1023),('35','0'):(263,903,815,1218),('35','2'):(307,1288,771,1764)}
def crop(p,i):
    b=MAN.get((str(p),str(i))) or B[str(p)][i]
    x0,y0,x1,y1=[int(v*2) for v in b]
    x0,y0=max(0,x0),max(0,y0); x1,y1=min(2160,x1),min(3840,y1)
    im=Image.open(f'/home/claude/v12hr/p-{p:02d}.png').convert('RGB').crop((x0,y0,x1,y1))
    out=f'/home/claude/refs/p{p:02d}_{i}.jpg'; im.save(out,quality=90); return out
if __name__=='__main__':
    for p,bl in B.items():
        for i in range(len(bl)): crop(int(p),i)
    print('ok')
