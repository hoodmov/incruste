exec(open('/home/claude/shots.py').read()); exec(open('/home/claude/ana.py').read())
DAYS={"J1":("Mardi 13/10","Cyclo fond vert","INT"),"J2":("Mercredi 14/10","Cyclo fond vert","INT"),"J3":("Jeudi 15/10","Cyclo fond vert","INT"),
"J4":("Vendredi 16/10","Extérieur / décors naturels","INT/EXT"),"J6":("Mardi 20/10","Extérieur / décors naturels","INT/EXT"),"J7":("Mercredi 21/10","Plateau XR fond vert","INT"),
"J8":("Jeudi 22/10","Plateau XR fond vert","INT"),"J9":("Vendredi 23/10","Plateau XR fond vert","INT"),"J10":("Lundi 26/10","Plateau XR vidéo","INT"),"J11":("Mardi 27/10","Plateau XR vidéo","INT")}
SRC={
"L'Exorciste":"Origine : Arriflex 35 IIC « Panavisée », 35 mm sphérique, 1.85 (ASC).",
"Dune":"Origine : ARRI Alexa 65 + Mini LF, optiques sphériques Moviecam re-boîtées, pas d'anamorphique (British Cinematographer).",
"Le Seigneur des anneaux":"Origine : Arricam / Arri 435-535, Zeiss Ultra Prime + zooms Angénieux Optimo, Super 35 2.39 (IMDb, AC 2004).",
"Titanic":"Origine : Panavision Panaflex + Arri 35 III, Panavision Primo + zooms Primo, Super 35 2.39 (American Cinematographer 1997).",
"Titanic short":"Origine : même film que Titanic (Panavision Primo, Super 35).",
"L'Odyssée":"Origine : caméras IMAX film 65 mm 15-perf (Kodak, 2026). Série d'optiques non publiée.",
"Michael Jackson – Thriller":"Origine : 35 mm (BSC, Robert Paynter). Caméra et optiques non publiées.",
"Le Comte de Monte-Cristo":"Origine : Panavision C Series anamorphiques (fiche Panavision).",
"Tapie":"Origine : série Netflix 2023, ratio 1.85. Caméra et optiques non publiées.",
"Star Wars – Kylo":"Origine (probablement Le Réveil de la Force) : Panavision Millennium XL2 35 mm, anamorphiques Panavision « Retro C » (British Cinematographer).",
"Star Wars – Vador":"Origine : Star Wars 1977, Panavision PSR 35 mm anamorphique.",
"Stranger Things":"Origine : saison 4 tournée en ARRI Alexa LF avec optiques vintage re-boîtées (Canon) et Falcon ; saison 5 non vérifiée.",
"Gourou":"Origine : Gourou (Yann Gozlan, 2025), image Antoine Sanier, 1.85. Caméra et optiques non publiées.",
"Les Choristes":"Origine : 35 mm « widescreen » (Variety 2004). Caméra et optiques non publiées.",
"Love Actually (V1 + V2 Franck Leboeuf)":"Origine : Moviecam Compact / SL, Super 35 2.39 (IMDb). Optiques non publiées.",
"Terminator (V1 + V2 Franck Leboeuf)":"Origine : Arriflex 35 III, Zeiss Super Speed, 1.85 (source secondaire).",
"James Bond – Casino poker":"Origine : Arricam ST/LT, Arri 435/235, Cooke S4 + zooms Angénieux, Super 35 2.39 (American Cinematographer).",
"Fast & Furious":"Origine : F9 en ARRI Alexa 3.4K + Panavision Primo ; Fast X en Alexa LF / Mini LF (épisode à confirmer).",
"La Femme de ménage (en rouge au plan)":"Origine : The Housemaid (2025), Sony Venice 2 + Panavision Panaspeed (Panavision).",
}
TVNOTE="Origine : plateau télé, caméras broadcast 2/3\" et zooms (déduit, non publié). Sur FX6, fermer pour garder le fond aussi net."
for k in ["Fort Boyard","Danse avec les stars","The Voice","Tous les sports (studio)","Maillon faible","1000% Logique","Qui veut être mon associé","Couronnement roi Charles","Qui veut épouser mon fils"]: SRC[k]=TVNOTE
SRC["Qui veut épouser mon fils"]="Origine : télé-réalité, caméras type Sony FS7/FX9 et zooms (déduit). 16:9."
for k in ["INA – Piercings","INA – Mode","INA – Internet"]: SRC[k]="Origine : archive INA (16 mm ou vidéo ENG selon l'époque, déduit). À tourner au zoom télé vintage."
EXTRA={"Love Cam Coldplay":"On ne tourne que le plan de Camille et de la personne à côté de lui. Il y a 4 panneaux filés : 1) panneau filé d'entrée, de la droite vers la gauche, qui arrive sur eux ; ils disent « non, nous on n'est pas en couple, regardez à gauche » ; 2) panneau filé de sortie vers la gauche, sur un contre-champ que l'on ne tourne pas ; 3) panneau filé d'entrée, de la gauche vers la droite, de retour sur Camille et sa voisine ; 4) panneau filé de sortie vers la droite.","Fast & Furious":"Seul Camille est tourné : il est côté passager, à la place de la miniature à côté de Vin Diesel. Deux plans seulement (face, ¾ profil). Les plans de Vin Diesel au volant sont des références de médias à afficher dans l'écran XR, ils ne sont pas dans ce document.","Un dimanche à la campagne":"Texte : Frédéric Lopez accueille de l'autre côté de l'eau. Camille joue plein d'invités différents (backgammon, etc.) et tombe à l'eau à chaque fois, en montage jumpcut. Un seul plan est tourné : Camille dans la forêt. La chute et le « plouf » sont faits en post-prod.","Tous les sports (extérieurs)":"Texte : « Tout le sport », magazine sportif parodique. Camille joue les sportifs, avec une tenue de sport différente pour chaque personnage. Plusieurs petits magnétos de sportifs à tourner en extérieur. Pas de média de référence : voici ce qu'il faut tourner. Optique : tout au G Master 24-70.","Pink – So What":"Réf. costume : Ned Flanders (Les Simpson).","Poltronesofà – Franck Leboeuf":"L'artisan reprend la même réf. que Poltronesofà.","Lipsync voiture":"La vue voiture d'origine est upscalée en post (droite et gauche) : seul Camille est tourné.","Danse avec les stars":"Le schéma prévoit un écran XR, un plan au Steadicam, une machine à brouillard, une passe Steadicam et une passe à la branche au ralenti."}
REMOVED=["Plans I.A. et plaques sans prise de vue réelle (papamobile, désert, tarmac, mur béton, plateau, voiture)","Barbie : toutes les scènes (annulées)","Dune : 2 plans de grue (I.A.) + plan serré (retiré le 13/10)","Maillon faible : plateau large (I.A., effacer/ajouter un participant)","Gims – Parisienne : plan I.A. full + 2 plans volés au vrai clip","Un dimanche à la campagne : la chute (faite en post)","ITW ISS : 2 plans « prompt I.A. Camille de dos qui se cogne »","Love Cam : goodies déco (accessoires) ; la transition panneau se fait en post","Pour le plaisir : upscale uniquement"]
HORS=["Nos jours heureux (rangé en RIP)","Arrivée des joueurs à Clairefontaine","Verisure","Pour le plaisir","Star Ac' (pas de screen)","Chirac / Camille en Bernadette (RIP)"]

import re as _re
GREEN={"Fruit Love Island","Lipsync voiture","Pape mobile","L'Exorciste","Fort Boyard","Pink – So What","Macron / Atol","Dune","Le Seigneur des anneaux","Titanic","Titanic short","Gold – Plus près des étoiles","Gold – Laissez-nous chanter","Mariah Carey – It's Time","Trump","Céline Dion JO","Hollande sous la pluie","Michael Jackson – Thriller","Star Wars – Kylo","Star Wars – Vador","Le 5ème Beatles – Hello Goodbye","Intro Hotu","Zidane – coup de pied","Couronnement roi Charles – short","Les Choristes","Miley Cyrus – Wrecking Ball","ITW Sophie Adenot – ISS","Vanessa Carlton","Gims – Parisienne","Poltronesofà","Poltronesofà – Franck Leboeuf","Love Actually (V1 + V2 Franck Leboeuf)","Terminator (V1 + V2 Franck Leboeuf)","James Bond – Casino poker","Qui veut être mon associé","Couronnement roi Charles","1000% Logique","L'Odyssée"}
REMOVE_N={17,86,87,109,133,135,91,92,138,143,144,145,146,147,148,149,150,151,152,153,154,155,83,94,99,113,34,36,82,119,126,158}
def _gm(n,name):
    if n not in A: return
    v=A[n]
    if name in GREEN and v['s']=='Canon FD':
        m=_re.search(r'@ (\d+)',v['f']) or _re.match(r'(\d+)',v['f']); f=int(m.group(1))
        v['s']=GM16 if f<=35 else GM24 if f<=70 else GM70
        if v['s']==GM16 and f<16: f=16
        v['f']=f"{f} mm"; v['d']=v['d'] if v['d'] not in('f/2','f/1.8','f/1.4') else 'f/2.8'
        v['lec']+=" (FD remplacé par G Master : même angle de champ.)"
_n=0
for _j,_s,_sh in PLAN:
    for _t in _sh:
        if len(_t)>3: _gm(_t[3],_s); continue
        _n+=1; _gm(_n,_s)

def _ref(n,lum=None,lec="Référence, non tournée."):
    v=A[n]; v.update(s=None,f=None,d=None,dist=None,h=None,tilt=None,lec=lec)
    if lum: v['lum']=lum
_ref(3,lec="Plan large pour référence, non tourné (papamobile + gardes du corps).")
_ref(8); _ref(18); _ref(6)
for _k in (55,56,57,59,67,80,93,101,103,112): _ref(_k)
_ref(38,lum="Plein jour, soleil voilé et haut : lumière quasi frontale douce venant de la gauche du cadre, visage lumineux, ombres très douces (légèrement plus sombre côté droit du visage), tarmac clair et surexposé derrière. ≈ 5600 K.",lec="Référence de lumière pour Trump, non tournée. Le plan tourné est celui de Camille au sèche-cheveux.")
A[2]['lec']="Camille est assis sur le siège arrière. Smartphone tenu proche, grand-angle, tout net. Cadre vertical : tourner en 16:9 et recadrer."
A[2]['h']="1,15 (assis à l'arrière)"
A[1].update(s=GM24,f="50 mm",d="f/4",dist="0,9",h="1,50",tilt="0° (face)",lec="Valeur visage : gros plan tête et épaules, face caméra, fond tropical flou.")
A[19]['lec']="Camille joue Pippin. Le plan de Gandalf n'est pas tourné : on garde 50 mm pour rester cohérent avec la ref."

A[159].update(s=FD,f="50 mm",d="f/2.8",lec=A[159]['lec']+" (Tourné au Canon FD pour le rendu vintage.)")
A[58].update(s=FD,f="50 mm",d="f/2.8",lec=A[58]['lec']+" (Film looké : tourné au Canon FD.)")

# --- Mises à jour V14 ---
A[58]=dict(s=FD,f="50 mm",d="f/2.8",dist="2,2",h="1,20",tilt="0°",lum="Jour de bureau : grande fenêtre derrière (contre-jour doux, plantes), face douce et neutre de face/gauche (≈ 5600 K), rebond clair pour déboucher les visages.",lec="Deux personnes serrées derrière un bureau, ordinateur portable flou au premier plan. La vignette en haut à droite (visage au téléphone) est ajoutée en post. Seul plan Gourou à tourner. (Film looké : tourné au Canon FD.)")
A[70].update(f="85 mm",d="f/2.8",dist="3,8",h="1,10",tilt="0°",lum="Nuit de stade : projecteurs hauts multiples, mi-durs (≈ 5600 K), public flou et sombre derrière ; drapeau jaune/rouge au premier plan.",lec="Arbitre assis, mains jointes, plan taille serré. Fond de stade très fondu, drapeau flou à droite.")
A[51].update(lum="Plateau Sgt Pepper : frontale douce et plate, high key, décor peint éclairé uniformément (≈ 3200 K, look pellicule), costumes très colorés.",lec="Groupe entier sur l'estrade (décor rose/jaune, tapis vert). (FD remplacé par G Master : même angle de champ.)")
A[52].update(lum="Idem plan 1 : frontale douce, peu d'ombres, couleurs saturées.",lec="Plan moyen sur 3 membres, toile peinte nette. (FD remplacé par G Master : même angle de champ.)")
A[53].update(lum="Frontale douce + léger contre ; fond peint rose/orange net.",lec="Plan taille sur 2 membres. (FD remplacé par G Master : même angle de champ.)")
A[54].update(lum="Idem plan 1, très large, bords noirs du plateau.",lec="Scène entière. Option studio : Camille en pied au 35-70 @ 50 à ≈ 5 m, réduit en post. (FD remplacé par G Master : même angle de champ.)")
A[125]=dict(s=GM70,f="85 mm",d="f/4",dist="2,9",h="1,45",tilt="0°",lum="Plateau Tous les sports : key douce frontale chaude, fond graphique noir et jaune lumineux, légère contre sur les épaules.",lec="Présentateur au micro, plan poitrine, fond graphique flou.")
A[162]=dict(s=GM24,f="50 mm",d="f/4",dist="4,2",h="1,20",tilt="0°",lum="Plateau JT de nuit : key douce frontale froide (≈ 5600 K), fond écran LED « Paris de nuit » éclairé, léger rebond sur le bureau.",lec="Présentateur assis au bureau, plan large du plateau, logo à gauche.")
A[163]=dict(s=GM70,f="100 mm",d="f/2.8",dist="2,5",h="1,45",tilt="0°",lum="Key douce de face-gauche (≈ 5600 K), fond de ciel et de Paris flou clair.",lec="Présentateur en plan poitrine, fond fondu.")
A[164]=dict(s=GM16,f="24 mm",d="f/5.6",dist="5,0",h="1,60",tilt="plongée 5°",lum="Plateau TV : éclairage uniforme, haut et diffus (≈ 5600 K), sol brillant et reflets, fond extérieur clair.",lec="Plateau entier avec fenêtre d'insert vidéo à droite (ajoutée en post).")

DAYOF={"Pink – So What":"J8","Zidane – coup de pied":"J1","Le 5ème Beatles – Hello Goodbye":"J8","Les Choristes":"J3"}
ORDER={
"J1":["Fruit Love Island","Lipsync voiture","Zidane – coup de pied","L'Exorciste","Fort Boyard","Pape mobile","Macron / Atol","Dune","Le Seigneur des anneaux"],
"J2":["Titanic","Titanic short","L'Odyssée","Gold – Plus près des étoiles","Gold – Laissez-nous chanter","Mariah Carey – It's Time","Trump","Céline Dion JO","Hollande sous la pluie"],
"J3":["Michael Jackson – Thriller","Le Comte de Monte-Cristo","Tapie","Star Wars – Kylo","Star Wars – Vador","Les Choristes"],
"J4":["Stranger Things","Gourou","Tiny Desk","Tous les sports (extérieurs)","INA – Piercings","Un dimanche à la campagne"],
"J6":["INA – Mode","INA – Internet","Qui veut épouser mon fils"],
"J8":["Pink – So What","Couronnement roi Charles – short","Le 5ème Beatles – Hello Goodbye","Miley Cyrus – Wrecking Ball","ITW Sophie Adenot – ISS","Vanessa Carlton","Gims – Parisienne"],
"J9":["Poltronesofà","Poltronesofà – Franck Leboeuf","Love Actually (V1 + V2 Franck Leboeuf)","Terminator (V1 + V2 Franck Leboeuf)","James Bond – Casino poker","Qui veut être mon associé","Couronnement roi Charles"],
"J10":["Danse avec les stars","Tous les sports (studio)","The Voice","Love Cam Coldplay"],
"J11":["1000% Logique","Maillon faible","JT 2h","Fast & Furious"]}

# Notes lumière : effets lumière à faire en vrai au tournage (pas la description de la lumière)
LFX={
49:"Flash d'explosion à faire en vrai sur le plateau : flash blanc-bleu dur (≈ 6500 K), frontal légèrement haut gauche, qui éclaire tout le décor, puis retour à l'ambiance du plan 1.",
28:"Lumière tournante : effet de lumière qui tourne en contre derrière Camille, à faire pendant la prise.",
127:"Allumage à tourner : la lumière s'allume sur l'animatrice pendant la prise.",
77:"Changement de lumière : plus sombre que le plan 4, à caler entre les deux plans.",
45:"Flamme : source unique de bougie ou torche, à faire vaciller légèrement.",
102:"Fente de lumière par l'entrebâillement de la porte : découpe nette sur le visage, tout le reste noir.",
103:"Fente de lumière par l'entrebâillement de la porte : découpe nette sur le visage, tout le reste noir.",
118:"Machine à brouillard (cf. schéma) pour faire vivre les faisceaux de l'écran XR.",
}
A[27]=dict(A[27],s=None,f=None,d=None,dist=None,h=None,tilt=None)

# Focales validées par Hood (11/10) : distance recalculée pour garder le même cadre (d × f_nouvelle / f_ancienne)
GM={'16-35':'G Master 16-35','24-70':'G Master 24-70','70-200':'G Master 70-200'}
OVR={
1:dict(s=GM['70-200'],f='100 mm',dist='1,8',h='1,70',tilt='0° (hauteur des yeux)'),
2:dict(f='20 mm',dist='1,50',h='1,10 (yeux de Camille assis)',tilt='0°',lec_add=" Focale : équivalent caméra frontale d'iPhone (≈ 20-24 mm, Apple ne publie pas la valeur) ; téléphone posé sur le tableau de bord, ≈ 1,50 m des sièges arrière."),
4:dict(f='200 mm',dist='8,4'),
70:dict(f='115 mm',dist='9,0',lec_add=" Plan large (V14) : corps entier assis ; à 9 m, 115 mm donne le cadre du pied à la tête en 16:9 (le 200 mm ne cadrait que du visage aux genoux)."),
16:dict(s=GM['24-70'],f='50 mm',dist='2,8'),
20:dict(s=GM['70-200'],f='85 mm',dist='7,4'),
22:dict(f='35 mm',dist='3,8'),
25:dict(s=GM['70-200'],f='85 mm',dist='1,9'),
26:dict(f='100 mm',dist='0,9'),
29:dict(f='50 mm',dist='3,3'),
35:dict(f='135 mm',dist='2,1'),
40:dict(f='35 mm',dist='2,0'),
42:dict(f='100 mm',dist='2,4'),
43:dict(f='100 mm',dist='1,8'),
44:dict(s=GM['24-70'],f='50 mm',dist='1,6 (au-dessus du corps)',h='2,2 (au-dessus du sol, grill)'),
73:dict(s=GM['24-70'],f='50 mm',dist='3,6'),
75:dict(f='50 mm',dist='3,3'),
76:dict(f='50 mm',dist='2,5'),
77:dict(s=GM['70-200'],f='85 mm',dist='2,1'),
78:dict(s=GM['70-200'],f='85 mm',dist='2,6'),
79:dict(f='50 mm',dist='2,5'),
}
for _n,_v in OVR.items():
    _v=dict(_v);_a=_v.pop('lec_add','')
    A[_n].update(_v)
    if _a and _a not in A[_n]['lec']:A[_n]['lec']=A[_n]['lec']+_a

A[2]['lec']=A[2]['lec'].replace("Smartphone tenu proche, grand-angle, tout net.","Smartphone posé sur le tableau de bord, grand-angle, tout net.")
A[16]['lec']=A[16]['lec'].replace("Désert complètement fondu derrière : longue focale.","Désert fondu derrière (incruste ancienne), mais Camille est assez au contact : 50 mm.")
A[78]['lec']=A[78]['lec'].replace("Champ/contrechamp avec #77 : même focale.","Champ/contrechamp avec le plan 5 : même focale (85 mm).")
def build():
    order=["J1","J2","J3","J4","J6","J7","J8","J9","J10","J11"]
    allseq=[];n=0
    for j,s,sh in PLAN:
        shots=[]
        for t in sh:
            f,l,v=t[:3]
            if len(t)>3: nn=t[3]
            else: n+=1; nn=n
            if nn in REMOVE_N: continue
            shots.append((nn,l,v))
        if not shots and not CARDS.get(s): continue
        allseq.append((DAYOF.get(s,j),s,shots))
    out=[];dn=0
    for d in order:
        ss=[q for q in allseq if q[0]==d]
        o=ORDER.get(d,[])
        ss.sort(key=lambda q:o.index(q[1]) if q[1] in o else 999)
        seqs=[]
        for _,s,shots in ss:
            L=[]
            for nn,l,v in shots:
                x=A[nn]; isref=x['s'] is None
                if not isref: dn+=1
                L.append(dict(n=None if isref else dn,ref=isref,img=f"img/{nn:03d}.jpg",plan=l,vfx=v,lfx=LFX.get(nn,''),**x))
            seqs.append(dict(name=s,src=SRC.get(s,""),extra=EXTRA.get(s,""),shots=L,cards=CARDS.get(s,[])))
        jd,lieu,ie=DAYS[d]
        out.append(dict(id=d,date=jd,lieu=lieu,ie=ie,missing=MISSING.get(d,[]),seqs=seqs))
    return out


CARDS={"Tous les sports (extérieurs)":[
("Tennis de table basse","Table de ping-pong extrêmement basse. Camille joue plié en deux et montre ses douleurs de dos. Plan serré.","Table de ping-pong très basse"),
("Lancer de disque","Camille lance un CD hors de sa jaquette, comme un disque d'athlétisme. Plan d'action.","CD, boîtier de CD"),
("Monocycle (Tour de France)","Camille en cycliste avec casque de vélo pro. Il vérifie ses roues et se déplace sur un monocycle.","Monocycle x1, casque de vélo pro"),
("Saut en hauteur à l'élastique","Camille a un élastique à la taille, fixé au sol, et tente un saut limité par l'élastique.","Gros élastique"),
("Bricolage artistique","Atelier avec planche de bois, tréteaux et matériel. Camille et une comédienne en collants à paillettes poncent délicatement et enfoncent un clou léger.","Ponceuse, marteau, clou, mallette de bricolage, tréteaux"),
("Course d'orientation synchronisée","Forêt. Camille et son double jouent des jumeaux en synchronisation parfaite, avec une boussole. Seul segment clairement prévu en forêt.","Boussole"),
("Lancer de javelot miniature","Camille fait des lancers miniaturisés. Une championne d'Europe du javelot est interviewée dans le texte.","Mini javelot")]}

CARDS["Vanessa Carlton"]=[
("Plan 3 – Camille court en plan serré","Camille court en plan serré (violon à la main), tapis de marche devant le fond vert. G Master 70-200 à 100 mm, f/2.8, caméra à environ 3 m, hauteur poitrine (1,40 m), tilt 0°, léger travelling arrière dans la course. Lumière : soleil bas chaud de côté 3/4 face (≈ 3200 K), source dure type fresnel, contre-jour doux à 5600 K pour détacher des cheveux.","—","newrefs/V_court.jpg"),
("Plan 4 – Camille allongé au sol, complètement mort","Top shot très serré sur le visage de Camille au sol, sans VFX (tourné comme tel). G Master 24-70 à 40 mm, f/2.8, caméra à la verticale à environ 1 m au-dessus du visage (perche ou grue), tilt -90°. Lumière : soleil dur de côté (≈ 5600 K) pour les ombres sur le visage, léger remplissage opposé.","Aucun","newrefs/V_sol.jpg"),
("Plan 5 – Camille sur une Harley (large)","Camille sur une moto, plan large vu de l'avant côté piano, en route. À tourner. G Master 24-70 à 28 mm, f/2.8, caméra à environ 2,5 m, hauteur 1 m, tilt -10°. Lumière : soleil de plein jour (≈ 5600 K), dur de côté, remplissage doux.","Harley (ou moto de studio sur support)","newrefs/V_moto_large.jpg"),
("Plan 6 – Camille sur une Harley (serré)","Camille sur la moto en plan serré, vu de l'avant. Même installation que le plan 5. G Master 70-200 à 85 mm, f/2.8, caméra à environ 2,5 m, hauteur poitrine, tilt 0°. Lumière : idem plan 5.","Harley (ou moto de studio sur support)","newrefs/V_moto_serre.jpg")]

VIDEOS={"Couronnement roi Charles":"couronnement_roi","Couronnement roi Charles – short":"couronnement_short","Dune":"dune","Fast & Furious":"fast_x","Fort Boyard":"fort_boyard","ITW Sophie Adenot – ISS":"iss","La Femme de ménage (en rouge au plan)":"femme_de_menage","L'Odyssée":"odyssee","Qui veut épouser mon fils":"qvemf","Star Wars – Vador":"vador","Star Wars – Kylo":"kylo","Terminator (V1 + V2 Franck Leboeuf)":"terminator","The Voice":"the_voice","Titanic":"titanic","Vanessa Carlton":"vanessa","Un dimanche à la campagne":"dimanche","L'Exorciste":"exorciste","Les Choristes":"choristes","Miley Cyrus – Wrecking Ball":"miley","Stranger Things":"stranger","Michael Jackson – Thriller":"thriller","Gims – Parisienne":"gims"}
