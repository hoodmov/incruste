#!/bin/bash
n="$1"; f="$2"
ffmpeg -y -v error -i "$f" -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset veryfast -crf 26 -maxrate 1500k -bufsize 3000k -pix_fmt yuv420p -c:a aac -b:a 64k -ac 1 -movflags +faststart "/home/claude/vid_hd/$n.mp4" && echo done $n
