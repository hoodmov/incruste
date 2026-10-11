import json,re,glob,os
docs={}
for f in glob.glob('/tmp/docs/*.json'):
    d=json.load(open(f))
    if 'error' in d: continue
    docs[d['id']]=d
def clean(t):
    t=t.replace('\r','')
    t=re.sub(r'\\([!\.\-\(\)\[\]#>\*_~+=|{}])',r'\1',t)
    t=re.sub(r'[ \t]+\n','\n',t)
    t=re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+','\n\n',t)
    # \n  (deux espaces + \n) déjà nettoyés ; retire lignes d'espaces seuls
    t=t.strip()
    # onglets dupliqués
    parts=re.split(r'(?m)^# Onglet \d+\s*$',t)
    parts=[p.strip() for p in parts if p.strip()]
    if len(parts)>1:
        norm=lambda s:re.sub(r'\s+','',re.sub(r'\[TC *:[^\]]*\]\([^)]*\)','',s))
        uniq=[]
        for p in parts:
            if not any(norm(p)==norm(u) for u in uniq): uniq.append(p)
        if len(uniq)==1: t=uniq[0]
        else: t='\n\n'.join(f'# Onglet {i+1}\n\n{p}' for i,p in enumerate(uniq))
    return t
out={}
for i,d in docs.items():
    out[i]={'t':d['title'].strip(),'u':f'https://docs.google.com/document/d/{i}/edit','x':clean(d['text'])}
M={ # séquence du site -> ids Drive (préfixes)
"Intro Hotu":["1Sm8OCz"],
"Love Actually (V1 + V2 Franck Leboeuf)":["1MYCPTj","1XprQQT"],
"L'Exorciste":["1F2lska"],
"La Femme de ménage (en rouge au plan)":["10qBtOP"],
"Tapie":["1pz1n59"],
"L'Odyssée":["1GbgTYQ"],
"Fast & Furious":["1L3Xmy5"],
"Titanic":["1muRCBs"],
"Titanic short":["1SX8_rq"],
"Dune":["1sUqVJr"],
"James Bond – Casino poker":["1TuVG3a"],
"Le Comte de Monte-Cristo":["1gLdvmD"],
"Les Choristes":["1SYt6nw"],
"Terminator (V1 + V2 Franck Leboeuf)":["1Wzb_9Z","126d262"],
"Stranger Things":["1fiuMHv"],
"Le Seigneur des anneaux":["1dwjtPs"],
"Star Wars – Kylo":["14LDSaQ"],
"Star Wars – Vador":["1xeE6RG"],
"Gourou":["1Uqbtj1"],
"Un dimanche à la campagne":["1ZeL8kD"],
"INA – Piercings":["1_QgFP2"],
"INA – Mode":["1c5Xoy7"],
"INA – Internet":["1j_37Fi"],
"Qui veut épouser mon fils":["1lsMJEI"],
"Qui veut être mon associé":["1UKL_e9"],
"Danse avec les stars":["1-YSNjv"],
"The Voice":["1pQwNyK"],
"Tous les sports (extérieurs)":["1BfqwkhI"],
"Tous les sports (studio)":["1BfqwkhI"],
"Couronnement roi Charles":["1B-aGhm"],
"Couronnement roi Charles – short":["1ElRcW4"],
"Fort Boyard":["1R3I2P7"],
"1000% Logique":["1Xp2oa3"],
"Maillon faible":["157GVxQ"],
"JT 2h":["1_5cMyq"],
"Pink – So What":["1qFEcn5"],
"Gims – Parisienne":["1B10hfc"],
"Gold – Plus près des étoiles":["1rpgQna"],
"Gold – Laissez-nous chanter":["1pcryt2"],
"Le 5ème Beatles – Hello Goodbye":["18mtcDK"],
"Michael Jackson – Thriller":["1PEniTA"],
"Miley Cyrus – Wrecking Ball":["1_cLj2p"],
"Vanessa Carlton":["1x1oZu3"],
"Céline Dion JO":["1qlz-gJ"],
"Mariah Carey – It's Time":["1uEi1Ak"],
"Fruit Love Island":["13lCQKt"],
"Trump":["1ai3JfM"],
"Love Cam Coldplay":["1Jun-iX"],
"Tiny Desk":["1V_V0Ht"],
"Poltronesofà":["1iqARPZ"],
"Poltronesofà – Franck Leboeuf":["1jBG3nv"],
"Lipsync voiture":["1RblMlm"],
"ITW Sophie Adenot – ISS":["1TzLsYO","1LebxsmepOoo"[:7]],
"Macron / Atol":[],
}
full={}
def res(p):
    r=[i for i in out if i.startswith(p)]
    assert len(r)==1,(p,r)
    return r[0]
seq={}
used=set()
for k,v in M.items():
    ids=[res(p) for p in v]
    if ids: seq[k]=ids; used.update(ids)
other=[i for i in out if i not in used]
print('non rattachés:',[(i[:7],out[i]['t']) for i in other])
json.dump({'docs':out,'seq':seq,'other':other},open('/home/claude/site/textes.json','w'),ensure_ascii=False,separators=(',',':'))
json.dump({k:len(v) for k,v in seq.items()},open('/home/claude/textes_map.json','w'),ensure_ascii=False)
print(os.path.getsize('/home/claude/site/textes.json'),len(seq))
