DONE=set('couronnement_roi couronnement_short dune fast_x fort_boyard iss femme_de_menage odyssee'.split())
import subprocess,concurrent.futures as cf,os
jobs=[l.strip().split('|',1) for l in open('/home/claude/vid/map.txt') if '|' in l]
jobs=[j for j in jobs if not (os.path.exists('/home/claude/vid_hd/%s.mp4'%j[0]) and subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','/home/claude/vid_hd/%s.mp4'%j[0]],capture_output=True).returncode==0 and j[0] in DONE)]
def run(j):
    n,f=j
    if not os.path.exists(f): return n+' MISSING'
    r=subprocess.run(['ffmpeg','-y','-v','error','-i',f,'-vf',"scale='min(1280,iw)':-2",'-c:v','libx264','-preset','veryfast','-crf','26','-maxrate','1500k','-bufsize','3000k','-pix_fmt','yuv420p','-c:a','aac','-b:a','64k','-ac','1','-movflags','+faststart','/home/claude/vid_hd/%s.mp4'%n],capture_output=True,text=True)
    return n+(' ok' if r.returncode==0 else ' ERR '+r.stderr[:200])
with cf.ThreadPoolExecutor(2) as ex:
    for m in ex.map(run,jobs): print(m,flush=True)
print('ALLDONE',flush=True)
