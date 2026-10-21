# Intro La Grande Incruste – J7 (21/10, IM SO PROD Boulogne) + 2 plans régie le 26/10.
# Ordre : déroulé J6 de la prod (mail de Sabine du 20/10, 20:32). Réfs : PDF « DOC PARTAGÉ – DÉCOUPAGE INTRO ».
# img/NNN.jpg = réf (avec Camille) · img/source/NNN.jpg = image source brute (sans Camille) · img/clean/NNN.jpg = clean (à venir)
def _i(n,s,f,d,dist,h,tilt,hz,lum,dlg=''):
    A[n]=dict(s=s,f=f,d=d,dist=dist,h=h,tilt=tilt,hz=hz,lum=lum,lec='',dlg=dlg)

SW_LUM="Ambiance de bataille enfumée : lumière diffuse froide venant du haut (look ≈ 6500 K), faible contraste ; flammes à droite cadre qui donnent un latéral/contre orangé vacillant (≈ 2000 K) sur le côté droit."
LGV_LUM="Jour couvert de montagne : lumière douce et frontale, légèrement gauche cadre (≈ 5600 K), visages très éclairés, peu d'ombres, pas de contre. Fond de végétation et de falaise claire."
STUDIO="Vrai studio fond vert (le décor réel reste à l'image) : key douce de face, légèrement haute (≈ 5600 K), fond vert éclairé uniformément."
GLAD="Soleil de l'arène : source dure et chaude ¾ haute gauche cadre (look ≈ 4500 K), ombres nettes côté droit, sable clair qui renvoie une lumière chaude."
FG="Jour couvert : lumière plate et diffuse du ciel (≈ 6000 K), très faible contraste, aucune ombre marquée."

# --- Scan stormtrooper
_i(166,GM24,"50 mm","f/4","6,0","1,50","0°","Non visible (fumée) ; axe à hauteur de poitrine, milieu du cadre",SW_LUM,
 "Camille\n« Mais j'ai rien à faire là moi ! »\n(puis s'adressant à la régie) « On peut repartir sur des trucs plus cool ?! »")
_i(167,GM24,"70 mm","f/2.8","1,5 → 4,5 (travelling arrière)","1,70","0°","Non visible : fond de bataille flou",
 "Même ambiance Star Wars : diffuse froide du haut, flammes orangées droite cadre ; visage éclairé doux de face.",
 "Camille\n« Ah bah… Pourquoi pas ! »")
_i(168,GM24,"70 mm","f/4","4,5","1,90 (poitrine de Camille assis sur le support)","0°","Non visible (falaise) ; axe à hauteur de poitrine de Camille assis sur les épaules",LGV_LUM,
 "Bourvil\n« Non mais dites donc… vous ne croyez tout de même pas que je vais vous trimballer sur mon dos ! »\n\nCamille\n« Ah c'est pas moi, c'est Chantal Ladesou qui décide ! »")
_i(169,GM24,"35 mm","f/4","5,0","1,40","0°","Non visible (falaise)",LGV_LUM,
 "Camille (hurlant)\n« Stop stop ! Ça suffit là ! »")
# --- Scan costume
_i(170,GM70,"85 mm","f/2.8","8,0","1,00 (hauteur des hanches)","légère contre-plongée 2°","Très bas : horizon du désert au 1/5 inférieur du cadre, il coupe Camille au niveau des hanches",
 "Tempête de sable : lumière très diffuse et chaude (look ≈ 4000 K orangé, désaturé), forte brume, pas de soleil direct ; contre doux venant du fond (brume claire derrière les vers), dos de Camille un peu plus sombre que le fond.",
 "Pas de texte au déroulé J6.\n(Dans le texte V2, « Je vais avoir du sable plein les chaussures ! » est dit sur ce plan ; le déroulé le met sur le plan 20.)")
_i(171,GM24,"70 mm","f/4","7,5","1,50","0°","Un peu au-dessus du milieu : pied des bâtiments du terminal, à hauteur de tête des coureurs",
 "Plein jour voilé sur tarmac : lumière haute et diffuse, légèrement de face droite cadre (≈ 6000 K), ciel blanc très lumineux derrière, sol clair qui renvoie de la lumière ; faible contraste.",
 "Camille\n« Ah super les gars, vous allez pouvoir m'aider, y'a un énorme… »\n(coupé dans sa phrase par la transition)")
# --- Chevalier
_i(172,GM24,"35 mm","f/4","3,0","1,60 (yeux de Camille sur le cheval d'arçon)","0°","Studio : pas d'horizon ; sol du cyclo au tiers bas",STUDIO,
 "Camille\n« Hé oh, c'est quoi ce délire ?! »")
_i(195,GM70,"85 mm","f/2.8","2,2","1,60 (yeux de Camille sur le cheval d'arçon)","0°","Studio : pas d'horizon","Lumière du plateau fond vert : key douce de face (≈ 5600 K), même réglage que le 7A.",
 "Long dialogue avec la régie (texte « Intro V2 ») :\n\nPhilippe Katerine (off, régie) « Ça va Camille ?! »\nCamille « Philippe ? »\nKaterine « Oui c'est moi !! »\nCamille « Mais qu'est-ce que tu fous là, qu'est-ce qu'il se passe ? »\nKaterine « En fait Chantal c'est la nouvelle boss de TF1 et elle m'a demandé de réaliser La Grande Incruste, et c'est toi qui vas présenter. »\nCamille « Chantal ? »\nKaterine « Ladesou. »\nCamille « Quoi ? Mais ça va pas ! Moi je fais plus La Grande Incruste, moi je pêche. »\nKaterine « Tu veux revoir tes enfants Camille ? »\nCamille « Mes enfants ? Mais j'en ai qu'un ! Et il est chez sa nounou. »\nKaterine « Booder ? »\nCamille « Comment tu sais ? »\nKaterine « Il est un peu cher ? »\nCamille « Un peu, mais franchement ils ont une super relation, donc ça va. »\nChantal Ladesou (au micro) « Bon Camille, c'est Chantal ! Soit tu présentes La Grande Incruste maintenant, soit je fais bouffer Denis Brogniart par des requins. »\nCamille « Quoi ? Mais c'est impossible ! »\nChantal « Alors ? »\nCamille « Ok Chantal ! Je vais le faire pour sauver Denis ! » (il enfile le casque de chevalier)")
_i(173,GM24,"35 mm","f/4","1,2 → 4,5 (travelling avant puis enroulé arrière)","1,50","légère contre-plongée 5° en fin de plan","Fin du plan : ligne des collines au tiers haut du cadre",
 "Fin du plan dans les collines : jour légèrement couvert, lumière douce ¾ face gauche cadre (≈ 5600 K), ciel clair, pas de contre marqué.",
 "Camille\n« La Grande Incruste, c'est maintenant !! »\n« Vous connaissez le principe : grâce à des technologies de pointe et des techniciens incroyablement compétents, je vais pouvoir m'incruster dans n'importe quel film, émission, clip, etc. Ah, d'ailleurs je vous laisse, j'ai mon premier rdv. »")
_i(174,GM24,"50 mm","f/4","3,5","≈ 2,00 (yeux de Camille sur le cheval d'arçon)","0°","Crête des collines au tiers haut, à hauteur des yeux",
 "Jour couvert en montagne : lumière diffuse venant du haut, légèrement droite cadre (≈ 6000 K), très faible contraste, brume dans la vallée.",
 "Camille\n« Bonjour ! Moi aussi j'ai un cheval, on fait la course ? »\n\nJean Reno\n« Je ne veux point faire attendre ma promise. »")
_i(175,GM70,"85 mm","f/2.8","2,2","≈ 2,00 (yeux de Camille)","0°","Ligne des collines au niveau des épaules (milieu bas du cadre)",
 "Jour couvert : lumière douce venant de gauche cadre (côté Jean Reno), ≈ 6000 K, faible contraste.",
 "Camille\n« Ah oui je comprends… Mais petit conseil, prenez un bain avant… Avec du savon… Et le cheval aussi… »\n(puis il tourne la tête vers le ciel)")
_i(176,GM24,"35 mm","f/5.6","6,0","1,20 (hauteur de la selle)","légère contre-plongée 3°","Un peu sous le milieu du cadre : ligne des collines au niveau de la selle",
 "Jour légèrement voilé : soleil doux haut gauche cadre, ciel bleu pâle (≈ 5600 K) ; lueurs rouges des lasers et feu orangé au loin.",
 "Camille (regardant le ciel, surpris)\n« Qu'est-ce que c'est qu'ce binz ?! »")
# --- Suspension + Gladiator
_SUSP="Camille\n« Bah il se passe quoi ? »\n\nPhilippe Katerine (off, en train de manger des sushis)\n« Pardon, fausse manip ! »\n\nCamille\n« Et c'est possible de m'incruster dans des trucs un peu moins dangereux ? »\n\nPhilippe Katerine\n« Bien sûr ! »"
_i(177,GM24,"35 mm","f/4","3,0","1,60","contre-plongée 10° (Camille suspendu ≈ 2 m)","Studio : pas d'horizon (vrai fond vert à l'image)",STUDIO+" Câbles de suspension visibles.",_SUSP)
_i(178,GM16,"24 mm","f/5.6","6,0","1,60","contre-plongée 5°","Studio : pas d'horizon (vrai fond vert à l'image)",STUDIO+" Câbles de suspension visibles.",_SUSP)
_i(179,GM24,"50 mm","f/4","6,5 → 3,0 (il s'approche de la caméra)","1,05 (hauteur de taille)","0°","Pas d'horizon (gradins) ; axe à hauteur de taille, milieu du cadre",GLAD,
 "Camille (face à Maximus)\n« Tu te moques de moi Philippe ?! »\n\nPhilippe Katerine (au micro)\n« Non Camille, tu n'as pas peur, tu es un gladiateur ! »")
_i(180,GM24,"70 mm","f/2.8","1,2 (amorce)","1,55 (épaule)","0°","Pas d'horizon ; sol de l'arène au tiers bas",
 "Soleil dur et chaud ¾ arrière gauche cadre : il découpe le dos et l'épaule de Camille (look ≈ 4500 K) ; Maximus éclairé depuis la gauche cadre.",
 "Pas de texte au déroulé J6.\n(Découpage : « Tu te moques de moi Philippe ?! … En plus y'a lui là, qui tue tout le monde ! »)")
_i(181,GM70,"85 mm","f/2.8","4,0","1,65","0°","Pas d'horizon (gradins flous)",
 "Soleil chaud ¾ haute gauche cadre, ombre douce côté droit du visage, gradins sombres derrière ; look ≈ 4500 K.",
 "Camille\n« Je vais avoir du sable plein les chaussures ! »")
# --- Men in Black
_i(182,GM16,"24 mm","f/4","2,5 (au-dessus de Camille)","≈ 3,00 (grue ; Camille allongé sur le support)","plongée 90° (top shot)","Aucun : le ciel remplit le fond",
 "Plein jour ensoleillé : soleil dur venant du haut gauche cadre (≈ 5600 K), ciel bleu. En top shot, la key vient du côté « haut du cadre » (sommet de l'immeuble).",
 "Camille (hurlant)\n« Stop stop ! Ça suffit là ! »")
# --- Course
_i(183,GM24,"35 mm","f/2.8","3,0","1,10","contre-plongée 5°","Aucun (nuit)",
 "Nuit sous la pluie : contre dur et froid venant du haut arrière (look ≈ 7000 K) qui fait briller la pluie, presque pas de face ; feux arrière et torche rouges comme seules sources chaudes.",
 "Camille\n« …T-Rex qui me poursuit ! C'est pas possible Philippe !!! »")
_i(184,GM24,"50 mm","f/4","4,0","1,40","0°","Un peu au-dessus du milieu : pied des arbres et des gradins à hauteur d'épaule",FG,
 "Camille\n« Hey Forrest ! Toi aussi t'as vu le T-Rex ? »\n(il s'arrête et se fait plaquer par un joueur)")
_i(186,GM24,"35 mm","f/2.8","2,0","2,20","plongée 45°","Aucun (sol)",
 "Intérieur : key douce et chaude de face gauche cadre sur le visage (≈ 3800 K), tapis bleu froid autour, fond sombre.",
 "Camille\n« Ah merci de m'aider… » (il regarde face à lui) « Ah ! Harry, alors justement tu tombes bien, j'aurais besoin de ton aide pour sortir de cette… »")
_i(187,GM24,"50 mm","f/2.8","2,5","1,80","0°","Pas d'horizon ; vitraux en haut du cadre",
 "Grande salle sombre (low key) : key chaude et douce de face droite cadre (≈ 3800 K), vitraux froids derrière à gauche (contre bleuté), brasero à droite cadre.",
 "Pas de texte : Rogue relève Camille puis le pousse devant Harry.")
_i(188,GM70,"85 mm","f/2.8","2,2","1,70","0°","Pas d'horizon ; vitraux flous au tiers haut",
 "Douce et frontale, légèrement haute (≈ 4000 K) ; fond de vitraux violet froid très flou ; faible contraste.",
 "Camille\n« Aïeeee, ça fait 2 fois que je tombe par terre, j'ai mal aux fesses Philippe ?! »")
_i(190,GM24,"35 mm","f/4","3,0","2,20","plongée 30°","Studio",STUDIO,"Pas de texte : Camille atterrit sur le fond vert.")
_i(191,GM24,"70 mm","f/2.8","1,5","1,00","plongée 30°","Studio",STUDIO+" Camille au sol.",
 "Chantal (off)\n« Alors mon loulou, t'es reparti comme en 40 ! C'est bien. »\n\nCamille\n« Chantal ? »\n\nChantal\n« L'incruste, c'est comme le vélo, ça ne s'oublie pas. »")
_i(192,GM16,"24 mm","f/5.6","7,0","1,60","0°","Studio (plan d'ensemble du plateau)","Vrai studio : lumière d'ensemble du plateau, douce et haute (≈ 5600 K).","Pas de texte au déroulé (plan pour clôturer).")
# --- Options (absents du déroulé J6)
_i(185,GM24,"40 mm","f/4","1,5 (amorce)","1,60","0°","Au milieu du cadre : pied des arbres derrière le terrain",FG,"Pas de texte : Camille s'arrête et se fait plaquer par un joueur.")
_i(189,GM24,"35 mm","f/5.6","6,0","≈ 4,50 (grue)","plongée 50°","Aucun (sol de l'arène)",
 "Plein soleil haut gauche cadre, dur (≈ 5600 K), ombres portées nettes vers la droite cadre, sable clair.","Pas de texte (l'empereur lève le bras).")
# --- Régie (26/10)
_i(193,GM24,"35 mm","f/2.8","4,0 → 1,2 (travelling avant)","1,30 (assis)","0°","Régie : pas d'horizon",
 "Régie technique sombre : visage éclairé par les écrans en face (lumière froide bleutée, ≈ 6500 K), voyants et practicals derrière.",
 "Version du découpage (à vérifier, le texte V2 a changé) :\nRéalisateur « Le script, le script… Il a que ce mot à la bouche celui-là. Camille, tu n'es pas juste une ligne dans un script, tu es un être humain, un être cosmique… chacune de tes cellules a été forgée dans une étoile, tu comprends ? »\n« Mais voilà ! C'est super c'que tu proposes là Camille ! »\n« Non Camille, tu n'as pas peur, tu es un gladiateur ! »")
_i(194,GM24,"70 mm","f/2.8","0,8","1,10","plongée 30°","—","Régie : lumière des écrans et voyants du pupitre.","Pas de texte : le technicien appuie sur le bouton pour relancer les incrustes.")

LFX.update({
166:"Flammes : source orange vacillante droite cadre, en latéral/contre, pendant toute la prise.",
167:"Changement d'éclairage en direct pendant le travelling arrière : de l'ambiance Star Wars (froide + flammes) au jour couvert neutre de La Grande Vadrouille (≈ 5600 K).",
170:"Ventilateur : vent de face pour le sable (cheveux, veste).",
173:"Passage en direct de la lumière studio (7A/7B) à la lumière de jour des collines pendant le recul.",
176:"Option : éclat rouge bref (projecteur rouge flashé) au moment des tirs de laser.",
179:"Allumage en direct : quand le fond devient l'arène, allumer le « soleil » (source dure et chaude ¾ haute gauche cadre).",
182:"Ventilateur fort pour la chute (cheveux et veste tirés vers le haut du cadre).",
183:"Torche rouge (fusée) tenue/agitée : lumière rouge vacillante ; pluie/arrosage + contre froid pour faire briller l'eau.",
187:"Brasero droite cadre : source chaude légèrement vacillante.",
188:"Impact du sort : flash blanc-bleu bref de face + souffle (ventilateur) quand il se prend le sort.",
190:"Pano filé de sortie (transition).",
193:"Pano filé d'entrée (transition).",
})

_DER="Déroulé J6 (mail de Sabine du 20/10) : "
SRC.update({
"Intro – Scan Camille en stormtrooper":_DER+"10:00 → 12:00, grand fond vert. Sources : Star Wars – Le Réveil de la Force (Panavision Millennium XL2 35 mm, anamorphiques Panavision « Retro C », British Cinematographer) puis La Grande Vadrouille (1966, 35 mm ; caméra et optiques non vérifiées).",
"Intro – Scan Camille en costume":_DER+"dans le créneau 10:00 → 12:00. Sources : Dune : deuxième partie (ARRI Alexa 65 + Alexa Mini LF, optiques sphériques re-boîtées, Newsshooter) et Captain America : Civil War (aéroport tourné en ARRI Alexa 65, The Hollywood Reporter).",
"Intro – Chevalier : studio puis Les Visiteurs":_DER+"13:15 → 14:30, cheval d'arçon sur travelling. Source : Les Visiteurs (1993, 35 mm ; caméra et optiques non vérifiées). Le plan du vaisseau est une image retravaillée.",
"Intro – Suspension puis arène de Gladiator":_DER+"15:00 → 16:30 (mise en place suspension 14:30). Source : Gladiator (2000) – Super 35, Panavision Platinum / GII et Arri III, zooms Panavision Primo (American Cinematographer). Les images « homme en costume » dans l'arène sont retravaillées.",
"Intro – Chute dans Men in Black (grue)":_DER+"16:50 → 17:10 (mise en place grue 16:30). Source : Men in Black 3 (2012), tourné en pellicule, 3D convertie en post (Digital Media World).",
"Intro – Course : Jurassic Park, Forrest Gump, Harry Potter":_DER+"17:15 → 19:15, Camille mouillé, HMC sur set. Sources : Jurassic Park (1993, format 1.85, No Film School), Forrest Gump (1994, image Don Burgess) et Harry Potter et la Chambre des secrets (2002, image Roger Pratt) ; caméras et optiques non vérifiées pour ces deux derniers.",
"Intro – Plans en option (absents du déroulé)":"Plans du découpage qui ne figurent pas au déroulé J6 : à tourner seulement si le temps le permet.",
"Intro – Réalisateur en régie":"Mail de Sabine du 20/10 : le reste de l'intro avec les autres personnages est tourné le 26/10. Plans du découpage, sans réf image.",
})
