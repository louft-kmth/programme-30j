import { useState } from "react";

// ── Équipement réel ──────────────────────────────────────────────────
// Marcy Home Gym : Chest press assis, Butterfly/Pec deck, Lat pulldown,
//   Poulie basse (curl, tirage bas), Leg extension (PAS de leg curl)
// + Tapis de course (max 3% inclinaison), Step, Corde à sauter, Haltères 2×2,5 kg

const WEEKS = [
  {
    id: 0, tab: "S1", label: "Lancement",
    title: "Semaine 1 — Lancement",
    subtitle: "Mise en route douce, apprendre les mouvements, commencer à brûler. Le corps lâche l'eau stockée.",
    loss: "−1,5 à −2 kg", target: "104 – 104,5 kg", sessions: "4 séances",
    schedule: [
      { day: "Lun", type: "🏋️", on: true }, { day: "Mar", type: "💤", on: false },
      { day: "Mer", type: "🏋️", on: true }, { day: "Jeu", type: "💤", on: false },
      { day: "Ven", type: "🏋️", on: true }, { day: "Sam", type: "🚶", on: false },
      { day: "Dim", type: "🏋️", on: true },
    ],
    blocks: [{
      icon: "🏃", title: "Séance Type (~55 min) Lundi-Mercredi-Vendredi-Dimanche", type: "sport",
      exercises: [
        { name: "Tapis — Marche rapide", badge: "cardio", detail: "20 min à 5,5–6,5 km/h · inclinaison 2-3%. Protège les genoux à 106 kg tout en montant le cardio.", sets: "⏱ 20 min · incl. 2-3%", muscles: ["cardio"], img: null },
        { name: "Marcy — Chest press assis", badge: "muscu", detail: "Pectoraux + triceps. Assis sur la machine, pousser les poignées vers l'avant. Dos bien calé contre le dossier, pieds à plat. Poids léger pour apprendre le mouvement. Souffler en poussant.", sets: "3 × 12 reps · 60s repos", muscles: ["pectoraux", "triceps"], img: "/images/chestpress.jpg" },
        { name: "Marcy — Lat pulldown (tirage vertical)", badge: "muscu", detail: "Dos (grand dorsal). Assis, attraper la barre en haut, tirer vers la poitrine en serrant les omoplates. Dos bien droit, ne pas se balancer. Relâcher lentement.", sets: "3 × 12 reps · 60s repos", muscles: ["dos", "biceps"], img: "/images/latepulldown.jpg" },
        { name: "Marcy — Leg extension", badge: "muscu", detail: "Quadriceps (avant de la cuisse). Assis, caler les chevilles sous le coussin, tendre les jambes. Mouvement lent, ne pas verrouiller les genoux en haut.", sets: "3 × 12 reps · 60s repos", muscles: ["quadriceps"], img: "/images/leg-extension-machine.gif" },
        { name: "Squats au poids du corps", badge: "muscu", detail: "Remplace le leg curl (pas dispo sur la machine). Debout, pieds largeur épaules, descendre comme pour s'asseoir. Genoux dans l'axe des pieds. Descendre jusqu'à 90° puis remonter.", sets: "3 × 15 reps · 60s repos", muscles: ["quadriceps", "fessiers", "ischio"], img: "/images/squat.jpg" },
        { name: "Haltères — Curl biceps", badge: "muscu", detail: "Debout, bras le long du corps, plier les coudes pour monter les haltères. Ne pas balancer le corps. 2,5 kg par main.", sets: "3 × 15 reps · 45s repos", muscles: ["biceps"], img: "/images/curlbiceps.png" },
        { name: "Haltères — Élévations latérales", badge: "muscu", detail: "Épaules (deltoïdes). Bras le long du corps, lever les haltères sur les côtés jusqu'à hauteur d'épaule. Mouvement lent.", sets: "3 × 15 reps · 45s repos", muscles: ["épaules"], img: "/images/elevation-lateral.jpg" },
        { name: "Gainage planche", badge: "core", detail: "Position de pompe sur les avant-bras, corps droit. Sur les genoux si trop dur au début. Serrer le ventre, respirer.", sets: "3 × 20 sec · sur genoux ok", muscles: ["abdos"], img: "/images/gainage.jpeg" },
        { name: "Retour au calme — Tapis lent", badge: "cardio", detail: "5 min de marche lente à 4 km/h + étirements légers (quadriceps, dos, épaules).", sets: "⏱ 5 min + étirements", muscles: ["récup"], img: null },
      ],
    }],
    tip: { title: "Pourquoi ça marche vite en S1", text: "À 106 kg, le corps stocke beaucoup d'eau liée au sel, à l'alcool, aux sucres. En coupant net + sport, il va libérer 1 à 1,5 kg d'eau la 1ère semaine en plus du gras brûlé." },
  },
  {
    id: 1, tab: "S2", label: "Accélération",
    title: "Semaine 2 — Accélération",
    subtitle: "Le corps s'adapte. On introduit les supersets + 1 séance Step HIIT.",
    loss: "−1,5 kg", target: "102,5 – 103 kg", sessions: "3 muscu + 1 HIIT",
    schedule: [
      { day: "Lun", type: "🏋️", on: true }, { day: "Mar", type: "⚡", on: true },
      { day: "Mer", type: "💤", on: false }, { day: "Jeu", type: "🏋️", on: true },
      { day: "Ven", type: "💤", on: false }, { day: "Sam", type: "🏋️", on: true },
      { day: "Dim", type: "🚶", on: false },
    ],
    blocks: [
      { icon: "🏃", title: "Séance A — Muscu + Cardio (~60 min) - Lundi-Jeudi-Samedi", type: "sport", exercises: [
        { name: "Tapis — Intervalles marche/jogging", badge: "cardio", detail: "25 min : alterner 3 min marche rapide (6,5 km/h) + 1 min jogging léger (8 km/h). Inclinaison 2-3%.", sets: "⏱ 25 min · incl. 3%", muscles: ["cardio"], img: null },
        { name: "Marcy — Chest press assis", badge: "muscu", detail: "Pectoraux + triceps. Monter légèrement la charge vs S1. Descente contrôlée 2 sec, poussée explosive. Dos calé.", sets: "3 × 12 · charge ↑ · 60s", muscles: ["pectoraux", "triceps"], img: "/images/chestpress.jpg" },
        { name: "Marcy — Lat pulldown + Tirage poulie basse", badge: "muscu", detail: "SUPERSET : enchaîner les 2 sans pause. Lat pulldown = barre du haut vers poitrine. Poulie basse = assis par terre, tirer la poignée basse vers le ventre (dos droit). 90s repos après le duo.", sets: "3 × 12 chaque · superset · 90s", muscles: ["dos", "biceps"], img: "/images/combine.gif" },
        { name: "Marcy — Leg extension + Fentes haltères", badge: "muscu", detail: "SUPERSET : leg extension sur la machine puis fentes avant avec haltères 2,5 kg par main. Les fentes remplacent le leg curl en ciblant ischio + fessiers.", sets: "3 × 12 ext. + 10 fentes/jambe · 90s", muscles: ["quadriceps", "ischio", "fessiers"], img: "/images/fentes+legs.gif" },
        { name: "Haltères — Curl + Développé épaules", badge: "muscu", detail: "Curl biceps : plier les coudes. Développé épaules : pousser les haltères au-dessus de la tête. 2,5 kg par main, mouvement lent.", sets: "3 × 15 chaque · 45s repos", muscles: ["biceps", "épaules"], img: "/images/curlsdeveps.gif" },
        { name: "Gainage planche + latéral", badge: "core", detail: "Planche face 25 sec + sur le côté droit 15 sec + côté gauche 15 sec. Progression vs S1.", sets: "3 × (25s + 15s/côté)", muscles: ["abdos", "obliques"], img: "/images/Plancheslat.png" },
      ]},
      { icon: "⚡", title: "Séance B — Cardio Step HIIT (~35 min) - Mardi", type: "hiit", exercises: [
        { name: "Step — Montées basiques", badge: "hiit", detail: "Un pied sur le step, monter, redescendre. Alterner le pied d'attaque. Rythme soutenu.", sets: "3 × 20 reps · 30s repos", muscles: ["jambes", "cardio"], img: null },
        { name: "Step — Montées genoux", badge: "hiit", detail: "Monter sur le step puis lever le genou le plus haut possible. Excellent pour cardio + abdos.", sets: "3 × 15 reps · 30s repos", muscles: ["jambes", "abdos"], img: null },
        { name: "Tapis — Finition inclinée", badge: "cardio", detail: "10 min marche rapide 6,5 km/h avec inclinaison 3%. Zone brûle-graisse optimale en fin de séance.", sets: "⏱ 10 min · incl. 3% · 6,5 km/h", muscles: ["cardio"], img: null },
      ]},
    ],
    tip: { title: "Astuce S2 — Les supersets", text: "Enchaîner 2 exercices sans pause fait monter la fréquence cardiaque pendant la muscu → tu brûles plus de calories tout en gagnant du muscle. Le step ajoute un HIIT bas impact." },
  },
  {
    id: 2, tab: "S3", label: "Intensité",
    title: "Semaine 3 — Intensité",
    subtitle: "On monte d'un cran — corde ajoutée, charges augmentées, 5 séances/semaine.",
    loss: "−1 à −1,5 kg", target: "101 – 102 kg", sessions: "3 muscu + 2 HIIT",
    schedule: [
      { day: "Lun", type: "🏋️", on: true }, { day: "Mar", type: "⚡", on: true },
      { day: "Mer", type: "💤", on: false }, { day: "Jeu", type: "🏋️", on: true },
      { day: "Ven", type: "⚡", on: true }, { day: "Sam", type: "🏋️", on: true },
      { day: "Dim", type: "🚶", on: false },
    ],
    blocks: [
      { icon: "🏃", title: "Séance A — Muscu + Cardio (~65 min)- Lundi-Jeudi-Samedi", type: "sport", exercises: [
        { name: "Tapis — Intervalles + sprint", badge: "cardio", detail: "30 min : 2 min marche rapide (6,5) / 1 min jogging (8,5) / 30s sprint léger (10 km/h). Incl. 3% max.", sets: "⏱ 30 min · incl. 3%", muscles: ["cardio"], img: null },
        { name: "Marcy — Chest press + Butterfly", badge: "muscu", detail: "SUPERSET : Chest press assis (pousser les poignées devant) → enchaîner direct avec Butterfly/Pec deck (bras écartés, rapprocher les poignées devant). Charge augmentée vs S2.", sets: "3 × 10 chaque · superset · 90s", muscles: ["pectoraux", "triceps"], img: "/images/chest+butter.jpg" },
        { name: "Écarté haltères au sol", badge: "muscu", detail: "Allongé au sol sur le dos, bras écartés avec haltères 2,5 kg, remonter les bras au-dessus de la poitrine. Complète le travail pecs après le superset machine.", sets: "3 × 12 · contrôlé", muscles: ["pectoraux"], img: "/images/ecarté-au-sol.png" },
        { name: "Marcy — Lat pulldown large + Poulie basse serrée", badge: "muscu", detail: "SUPERSET : lat pulldown prise large → poulie basse prise serrée. Tirer fort, relâcher lent.", sets: "3 × 10 chaque · superset · 90s", muscles: ["dos", "biceps"], img: "/images/pullrowodwn.png" },
        { name: "Marcy Leg ext. + Squats goblet + Fentes", badge: "muscu", detail: "TRI-SET jambes : leg extension machine → squats goblet (1 haltère tenu contre la poitrine) → fentes avant haltères.", sets: "3 × 12/15/10 par jambe · 90s", muscles: ["quadriceps", "ischio", "fessiers"], img: "/images/jambesseries.png" },
        { name: "Haltères — Curl + Press + Latérales", badge: "muscu", detail: "TRI-SET : curl biceps → développé épaules → élévations latérales, sans pause entre les 3. 2,5 kg par main.", sets: "3 × 12 chaque · tri-set", muscles: ["biceps", "épaules"], img: "/images/SéquenceHaltères.png" },
        { name: "Marcy — Curl poulie basse", badge: "muscu", detail: "Bonus biceps : debout face à la machine, tirer la poulie basse en curl. Coudes fixes au corps, remonter lentement.", sets: "3 × 12 · 45s repos", muscles: ["biceps"], img: "/images/cpoulie.jpg" },
        { name: "Gainage complet", badge: "core", detail: "Planche face 30s + côté droit 20s + côté gauche 20s = 1 tour. 3 tours.", sets: "3 tours · 70s total/tour", muscles: ["abdos", "obliques"], img: "/images/Plancheslat.png" },
      ]},
      { icon: "⚡", title: "Séance B — HIIT Step + Corde (~40 min)- Mardi-Vendredi", type: "hiit", exercises: [
        { name: "Step — Circuit intensif", badge: "hiit", detail: "Montées rapides 20 reps → montées genoux 15 reps → burpees modifiés sur step 8 reps. Enchaîner.", sets: "4 séries · 30s repos", muscles: ["jambes", "cardio"], img: "/images/step.png" },
        { name: "Corde à sauter — Intervalles", badge: "hiit", detail: "30s de saut / 30s de repos. À son rythme ! Si les genoux tirent → remplacer par du step. 10 min ≈ 150 kcal.", sets: "6-8 rounds · 30s/30s", muscles: ["cardio", "mollets"], img: null },
        { name: "Tapis — Finition inclinée", badge: "cardio", detail: "12 min marche rapide 7 km/h · inclinaison 3% max. On compense l'incl. limitée avec +2 min et +1 km/h de vitesse.", sets: "⏱ 12 min · incl. 3% · 7 km/h", muscles: ["cardio"], img: null },
      ]},
    ],
    tip: { title: "Astuce S3 — La corde à sauter", text: "À 102 kg, la corde est exigeante sur les articulations. Introduite en intervalles courts (30s). Si les genoux protestent → step ou tapis incliné. Aucune honte." },
  },
  {
    id: 3, tab: "S4", label: "Finition",
    title: "Semaine 4 — Finition",
    subtitle: "Dernière ligne droite — on lâche rien. Le corps est lancé, on consolide.",
    loss: "−1 à −1,5 kg", target: "100 kg 🎯", sessions: "3 muscu + 2 HIIT",
    schedule: [
      { day: "Lun", type: "🏋️", on: true }, { day: "Mar", type: "⚡", on: true },
      { day: "Mer", type: "💤", on: false }, { day: "Jeu", type: "🏋️", on: true },
      { day: "Ven", type: "⚡", on: true }, { day: "Sam", type: "🏋️", on: true },
      { day: "Dim", type: "🚶", on: false },
    ],
    blocks: [
      { icon: "🏃", title: "Séance A — Muscu lourde + Cardio long (~70 min) - Lundi-Jeudi-Samedi", type: "sport", exercises: [
        { name: "Tapis — Endurance + sprints", badge: "cardio", detail: "35 min : base marche rapide 7,5 km/h + toutes les 5 min : 1 min à 9-10 km/h. Inclinaison 3% max.", sets: "⏱ 35 min · incl. 3% · sprints", muscles: ["cardio"], img: null },
        { name: "Marcy — Chest press + Butterfly + Écarté sol", badge: "muscu", detail: "TRI-SET pecs : chest press assis (charge max) → butterfly/pec deck → écarté haltères au sol. Charges max tolérables.", sets: "3 × 10 chaque · tri-set · 90s", muscles: ["pectoraux", "triceps"], img: "/images/EntrainementS4.png" },
        { name: "Marcy — Lat pulldown + Poulie basse", badge: "muscu", detail: "SUPERSET dos : lat pulldown prise large + tirage poulie basse prise serrée. Varier les prises = dos complet.", sets: "3 × 10 chaque · superset · 90s", muscles: ["dos", "biceps"], img: "/images/combine.gif" },
        { name: "Legs — Extension + Squats goblet + Fentes", badge: "muscu", detail: "Leg extension 3×12 + Squats goblet (haltère poitrine) 3×15 + Fentes haltères 3×10/jambe.", sets: "3 × 12/15/10 · 90s repos", muscles: ["quadriceps", "ischio", "fessiers"], img: "/images/jambesseries.png" },
        { name: "Haltères — Circuit bras/épaules complet", badge: "muscu", detail: "Curl 15 + Press épaules 15 + Latéral 15 + Front raise 15 = 1 tour. 3 tours, 60s entre tours.", sets: "3 tours · 4 exos × 15 reps", muscles: ["biceps", "épaules"], img: "/images/Epaules.png" },
        { name: "Marcy — Curl poulie basse + Triceps poulie haute", badge: "muscu", detail: "SUPERSET bras : curl poulie basse (biceps) → pousser la barre haute vers le bas (triceps). Sinon dips sur step.", sets: "3 × 12 chaque · superset · 60s", muscles: ["biceps", "triceps"], img: "/images/poulie2.png" },
        { name: "Gainage avancé + Crunchs", badge: "core", detail: "Planche 40s + latéral 25s/côté + crunchs 20 reps = 1 tour × 3.", sets: "3 tours · planche + crunchs", muscles: ["abdos"], img: "/images/abdo.png" },
      ]},
      { icon: "⚡", title: "Séance B — HIIT Total (~45 min) -Mardi-Vendredi", type: "hiit", exercises: [
        { name: "Circuit mixte — Step + Corde + Squats + Pompes + Planche", badge: "hiit", detail: "Step montées ×20 → Corde 45s → Squats goblet ×15 → Pompes (genoux ok) ×10 → Planche 30s. 1 min repos entre tours.", sets: "3 tours · 5 exos enchaînés", muscles: ["full body"], img: null },
        { name: "Tapis — Finition brûle-graisse MAX", badge: "cardio", detail: "18 min marche rapide/jogging 7,5 km/h · inclinaison 3% max. Dernière ligne droite du programme, tout donner.", sets: "⏱ 18 min · incl. 3% · 7,5 km/h · FINISHER", muscles: ["cardio"], img: null },
      ]},
    ],
    tip: { title: "Et après les 30 jours ?", text: "100 kg atteint ≠ fin. Garder 4 séances/semaine, 1 repas libre. Prochain objectif : 95 kg en 2 mois. Le métabolisme est lancé, le plus dur est fait." },
  },
];

const BADGE_STYLES = {
  cardio: { bg: "rgba(255,68,34,0.12)", color: "#ff4422", label: "CARDIO" },
  muscu: { bg: "rgba(68,136,255,0.12)", color: "#4488ff", label: "MUSCU" },
  core: { bg: "rgba(170,85,255,0.12)", color: "#aa55ff", label: "CORE" },
  hiit: { bg: "rgba(255,187,34,0.12)", color: "#ffbb22", label: "HIIT" },
};

const FOOD_WEEKS = [
  { tab: "S1", label: "Nettoyage", title: "Semaine 1 — Grand nettoyage", subtitle: "On coupe tout ce qui fait stocker : alcool, laitier, sucre, grignotage.", kcal: "~1800", budget: "~35€",
    rules: [{ icon: "🍺", text: "Zéro alcool — pas une goutte (1 bière = 200 kcal pour rien)" },{ icon: "🧀", text: "Zéro produit laitier — fromage, crème, yaourt → ballonnements" },{ icon: "🥤", text: "Zéro soda / jus — eau plate ou gazeuse (2L/jour min)" },{ icon: "🍬", text: "Zéro grignotage — 3 repas + 1 collation, c'est tout" },{ icon: "🍟", text: "Zéro friture — tout grillé, rôti ou vapeur" }],
    meals: [
      { time: "🥣 Petit-déjeuner", kcal: "~380 kcal", options: [{ name: "Base fixe — Lait d'avoine + flocons", desc: "125g flocons d'avoine cuits (=50g cru) dans 200ml lait d'avoine + 1 banane en rondelles + 1 c. café miel", price: "0,60€", note: "Cuire 3-4 min à feu doux dans le lait d'avoine" },{ name: "Variante week-end — Œufs", desc: "2 œufs brouillés (poêle anti-adhésive) + 1 tranche pain complet + 1 banane", price: "0,80€" }] },
      { time: "🍗 Déjeuner", kcal: "~550 kcal", options: [{ name: "Poulet riz", desc: "150g poulet grillé + 240g riz cuit (=80g cru) + haricots verts vapeur à volonté + 1 filet huile olive", price: "2,20€" },{ name: "Thon pâtes", desc: "1 boîte thon nature (140g) + 240g pâtes cuites (=80g cru) + sauce tomate maison", price: "1,80€" },{ name: "Steak haché patate douce", desc: "1 steak haché 5% (~100g cuit) + 200g patate douce au four + salade verte + vinaigrette citron", price: "2,50€" },{ name: "Dinde semoule", desc: "150g dinde grillée + 210g semoule cuite (=70g cru) + ratatouille maison", price: "2,30€" }] },
      { time: "🍎 Collation 16h", kcal: "~150 kcal", options: [{ name: "Fruit + compote", desc: "1 pomme + 1 compote sans sucre ajouté (90g)", price: "0,50€" },{ name: "Banane + chocolat", desc: "1 banane + 2 carrés chocolat noir 70% (10g)", price: "0,40€" },{ name: "Dinde + tomate", desc: "2 tranches blanc de dinde + 1 tomate (sel, poivre)", price: "0,60€" }] },
      { time: "🍳 Dîner", kcal: "~500 kcal", options: [{ name: "Poulet légumes", desc: "150g poulet grillé + courgettes et poivrons rôtis au four + 1 tranche pain complet", price: "2,00€" },{ name: "Omelette", desc: "Omelette 3 œufs + poivrons, oignons, tomates + salade verte", price: "1,30€" },{ name: "Soupe + œufs", desc: "Soupe maison (poireaux, carottes, pomme de terre) + 2 œufs durs + 1 tranche pain complet", price: "1,20€" },{ name: "Dinde salade", desc: "150g dinde grillée + grosse salade + ½ avocat + vinaigrette citron", price: "2,20€" }] },
    ],
    shopping: [{ cat: "🥩 Protéines", items: ["Poulet × 1 kg","Dinde × 600g","Steaks 5% × 4","Thon boîte × 4","Œufs × 18","Dinde tranchée × 1"] },{ cat: "🌾 Féculents", items: ["Riz basmati 1 kg","Pâtes complètes 500g","Semoule 500g","Pain complet","Patates douces × 4","Flocons avoine 500g","Pommes de terre 1 kg"] },{ cat: "🥦 Légumes", items: ["Haricots verts surgelés","Courgettes × 4","Brocoli × 2","Poivrons × 4","Tomates × 8","Salade × 2","Oignons × 4","Carottes 500g","Poireaux × 3","Concombre × 2"] },{ cat: "🍎 Autres", items: ["Lait d'avoine × 2L","Bananes × 10","Pommes × 7","Avocats × 3","Compotes s.s. × 4","Chocolat noir 70%","Huile olive","Tomates pelées × 2","Miel","Ail, épices, citrons"] }],
    tip: { title: "Pourquoi ça marche vite S1", text: "En coupant l'alcool + laitiers + sucre d'un coup, le corps lâche l'eau qu'il stockait (1 à 1,5 kg). Ajouté au déficit + sport = perte rapide et visible." },
  },
  { tab: "S2", label: "Routine", title: "Semaine 2 — Mise en routine", subtitle: "On installe les habitudes. Légère baisse des calories.", kcal: "~1750", budget: "~35€",
    rules: [{ icon: "🚫", text: "Toujours zéro alcool" },{ icon: "📉", text: "Féculents cuits : 210g au lieu de 240g au déjeuner" },{ icon: "📦", text: "Batch cooking dimanche : cuire riz + griller poulet pour 3-4 jours" }],
    meals: [
      { time: "🥣 Petit-déjeuner", kcal: "~360 kcal", options: [{ name: "Flocons pomme cannelle", desc: "100g flocons cuits (=40g cru) dans 200ml lait d'avoine + 1 pomme en dés + cannelle", price: "0,50€", note: "On baisse les flocons vs S1 (100g cuit au lieu de 125g)" },{ name: "Œufs avocat", desc: "2 œufs au plat + 1 tranche pain complet grillé + ½ avocat", price: "1,00€" }] },
      { time: "🍗 Déjeuner", kcal: "~530 kcal", options: [{ name: "Poulet patate douce", desc: "150g poulet grillé + 200g patate douce au four + brocoli vapeur + huile olive", price: "2,30€" },{ name: "Thon salade riz", desc: "1 boîte thon + grosse salade composée + 210g riz cuit (=70g cru)", price: "1,90€" },{ name: "Dinde ratatouille semoule", desc: "150g dinde + ratatouille maison + 210g semoule cuite (=70g cru)", price: "2,20€" },{ name: "Steak haché pâtes", desc: "1 steak 5% (~100g cuit) + 210g pâtes cuites (=70g cru) + sauce tomate + haricots verts", price: "2,00€" }] },
      { time: "🍎 Collation", kcal: "~140 kcal", options: [{ name: "Rotation des 3 options S1", desc: "Fruit + compote · OU banane + 2 carrés chocolat · OU 2 tranches dinde + tomate", price: "0,50€" }] },
      { time: "🍳 Dîner", kcal: "~480 kcal", options: [{ name: "Poulet grillé + légumes", desc: "150g poulet + légumes rôtis + 1 filet huile olive", price: "2,20€" },{ name: "Omelette champignons", desc: "Omelette 3 œufs + champignons + oignons + salade verte", price: "1,20€" },{ name: "Soupe + œufs", desc: "Soupe maison + 2 œufs durs + 1 tranche pain complet", price: "1,10€" },{ name: "Dinde avocat", desc: "150g dinde + ½ avocat + grosse salade + 1 tranche pain", price: "2,30€" }] },
    ],
    shopping: null,
    tip: { title: "Batch cooking du dimanche", text: "Cuire 600g riz (=200g cru) + griller 4 poulets + grosse ratatouille. En boîtes au frigo. En semaine = 0 excuse, repas prêt en 2 min micro-ondes." },
  },
  { tab: "S3", label: "Croisière", title: "Semaine 3 — Vitesse de croisière", subtitle: "Les habitudes sont là. 1 plaisir contrôlé le samedi.", kcal: "~1700", budget: "~35€",
    rules: [{ icon: "📉", text: "Plus de féculents au dîner → double portion légumes" },{ icon: "🥩", text: "Garder 150g protéines par repas principal" },{ icon: "🍕", text: "1 repas plaisir samedi soir : pizza/burger/kebab MAISON" },{ icon: "💧", text: "Eau : 2,5L/jour" },{ icon: "☕", text: "Café ok (sans sucre, sans lait) — max 3/jour" }],
    meals: [
      { time: "🥣 Petit-déj", kcal: "~350 kcal", options: [{ name: "Flocons + banane", desc: "100g flocons cuits dans 200ml lait d'avoine + 1 banane + 1 c. miel", price: "0,55€" }] },
      { time: "🍗 Déjeuner", kcal: "~520 kcal", options: [{ name: "Base libre", desc: "150g poulet/dinde + 210g féculents cuits OU 200g patate douce + légumes à volonté + huile olive", price: "~2,20€" }] },
      { time: "🍎 Collation", kcal: "~130 kcal", options: [{ name: "Fruit + compote", desc: "1 fruit + 1 compote sans sucre", price: "0,50€" }] },
      { time: "🍳 Dîner", kcal: "~450 kcal", options: [{ name: "Protéines + légumes (PAS de féculents)", desc: "150g poulet/dinde/œufs (3) + légumes uniquement + 1 filet huile olive", price: "~1,80€" }] },
      { time: "🍕 Samedi soir — Plaisir", kcal: "~800 kcal", options: [{ name: "Pizza maison", desc: "Pâte du commerce + sauce tomate + poulet + légumes + mozzarella", price: "3,50€" },{ name: "Burger maison", desc: "Steak 5%, pain, salade, tomate, ketchup", price: "3,00€" },{ name: "Kebab maison", desc: "Galette, poulet grillé, salade, sauce blanche light", price: "3,50€" }] },
    ],
    shopping: null,
    tip: { title: "Pourquoi le plaisir c'est ok", text: "Sur 21 repas, 1 à 800 kcal au lieu de 500 = +300 kcal, soit ~35g de gras. Rien. Mais ça change tout psychologiquement. Le piège = pas transformer en week-end plaisir." },
  },
  { tab: "S4", label: "Sprint", title: "Semaine 4 — Sprint final", subtitle: "Dernière semaine, strict. On finit sous les 100 kg.", kcal: "~1650", budget: "~30€",
    rules: [{ icon: "🚫", text: "Pas de repas plaisir cette semaine — on finit fort" },{ icon: "🚫", text: "Zéro féculents au dîner — protéines + légumes uniquement" },{ icon: "📉", text: "Féculents midi : 180g cuit (=60g cru) au lieu de 210g" },{ icon: "💧", text: "Eau : 2,5L minimum" },{ icon: "🕖", text: "Dernier repas avant 20h" }],
    meals: [
      { time: "🥣 Petit-déj", kcal: "~340 kcal", options: [{ name: "Flocons + pomme", desc: "100g flocons cuits dans 200ml lait d'avoine + 1 pomme en dés + cannelle", price: "0,50€" }] },
      { time: "🍗 Déjeuner", kcal: "~500 kcal", options: [{ name: "Protéines + féculents réduits", desc: "150g poulet/dinde + 180g riz ou pâtes cuit (=60g cru) + légumes vapeur à volonté + huile olive", price: "2,00€" }] },
      { time: "🍎 Collation", kcal: "~120 kcal", options: [{ name: "Pomme + compote", desc: "1 pomme + 1 compote sans sucre", price: "0,45€" }] },
      { time: "🍳 Dîner", kcal: "~420 kcal", options: [{ name: "Option A", desc: "150g poulet/dinde grillé + grosse portion légumes rôtis + huile olive", price: "1,80€" },{ name: "Option B", desc: "Omelette 3 œufs + légumes + salade", price: "1,20€" },{ name: "Option C", desc: "Grande soupe maison + 2 œufs durs", price: "1,00€" }] },
    ],
    shopping: [{ cat: "🥩 Protéines", items: ["Poulet/dinde × 1,2 kg","Œufs × 18","Thon boîte × 3","Steaks 5% × 2"] },{ cat: "🌾 Féculents (moins !)", items: ["Riz 500g","Pain complet","Flocons avoine 250g"] },{ cat: "🥦 Légumes (plus !)", items: ["Courgettes × 6","Brocoli × 3","Haricots verts surgelés","Poivrons × 4","Tomates × 8","Poireaux × 4","Oignons × 4","Salade × 2","Champignons 250g"] },{ cat: "🍎 Autres", items: ["Lait d'avoine 2L","Pommes × 7","Bananes × 4","Compotes s.s. × 4","Huile olive","Citrons × 3"] }],
    tip: { title: "Et après le mois ?", text: "100 kg → remonter à ~1900 kcal/jour, 1 repas plaisir/semaine, féculents le soir 2-3×/semaine. Alcool : max 2 verres le week-end. Prochain palier : 95 kg en 8 semaines." },
  },
];

const CONVERSIONS = [
  { aliment: "Riz basmati", cru: "80g", cuit: "~240g", ratio: "×3" },
  { aliment: "Pâtes", cru: "80g", cuit: "~240g", ratio: "×3" },
  { aliment: "Semoule", cru: "70g", cuit: "~210g", ratio: "×3" },
  { aliment: "Flocons avoine", cru: "50g", cuit: "~125g", ratio: "×2,5" },
  { aliment: "Patate douce", cru: "200g", cuit: "~200g", ratio: "×1" },
  { aliment: "Poulet / Dinde", cru: "150g", cuit: "~150g", ratio: "×1" },
  { aliment: "Steak haché", cru: "125g", cuit: "~100g", ratio: "×0,8" },
];

// ── Shared Components ─────────────────────────────────────────────────
function Badge({ type }) { const s = BADGE_STYLES[type]; if (!s) return null; return <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 5, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>{s.label}</span>; }
function Chip({ children, color }) { return <div style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--surface2)", border: "1px solid var(--border)", padding: "7px 12px", borderRadius: 9, fontSize: 12, fontWeight: 600, color }}>{children}</div>; }
function ExerciseIcon({ badge }) { const stroke = BADGE_STYLES[badge]?.color || "#7c7c8a"; return <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg viewBox="0 0 40 40" width="32" height="32" fill="none"><circle cx="20" cy="10" r="4" stroke={stroke} strokeWidth="1.5"/><line x1="20" y1="14" x2="20" y2="28" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="28" x2="14" y2="36" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="28" x2="26" y2="36" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="19" x2="12" y2="23" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="19" x2="28" y2="23" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/></svg></div>; }

function ExerciseDetailModal({ ex, onClose }) { if (!ex) return null; const s = BADGE_STYLES[ex.badge]; const stroke = s?.color || "#7c7c8a"; return <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.95)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"60px 20px 40px",animation:"fadeIn 0.2s ease",overflowY:"auto" }}><div onClick={onClose} style={{ position:"fixed",top:16,right:20,width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#fff",cursor:"pointer",zIndex:10000 }}>✕</div><div onClick={e=>e.stopPropagation()} style={{ maxWidth:400,width:"100%",background:"#111116",borderRadius:20,overflow:"hidden",border:"1px solid #26262e",boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}><div style={{ width:"100%",height:260,background:"#1a1a21",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative" }}>{ex.img?<img src={ex.img} alt={ex.name} style={{ width:"100%",height:"100%",objectFit:"contain",background:"#0a0a0c" }}/>:<svg viewBox="0 0 120 120" width="140" height="140" fill="none"><circle cx="60" cy="25" r="10" stroke={stroke} strokeWidth="2"/><line x1="60" y1="35" x2="60" y2="72" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="72" x2="44" y2="100" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="72" x2="76" y2="100" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="48" x2="36" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="48" x2="84" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><text x="60" y="116" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="sans-serif">Ajoute un GIF ici</text></svg>}<div style={{ position:"absolute",top:12,left:12 }}><Badge type={ex.badge}/></div></div><div style={{ padding:"20px 22px 24px" }}><div style={{ fontWeight:700,fontSize:18,lineHeight:1.3,marginBottom:12,color:"#eaeaef" }}>{ex.name}</div><div style={{ fontSize:13,color:"#9a9aa6",lineHeight:1.6,marginBottom:16 }}>{ex.detail}</div><div style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:13,fontWeight:700,padding:"8px 16px",borderRadius:10,background:s?.bg,color:s?.color }}>{ex.sets}</div>{ex.muscles?.length>0&&<div style={{ marginTop:14,display:"flex",gap:6,flexWrap:"wrap" }}>{ex.muscles.map((m,i)=><span key={i} style={{ fontSize:10,fontWeight:600,letterSpacing:0.8,textTransform:"uppercase",padding:"4px 10px",borderRadius:6,background:"rgba(255,255,255,0.05)",color:"#7c7c8a",border:"1px solid rgba(255,255,255,0.06)" }}>{m}</span>)}</div>}</div></div><div style={{ marginTop:16,color:"rgba(255,255,255,0.3)",fontSize:11 }}>Appuyer en dehors pour fermer</div></div>; }

function ExerciseCard({ ex, onExerciseClick }) { const s = BADGE_STYLES[ex.badge]; return <div onClick={()=>onExerciseClick&&onExerciseClick(ex)} style={{ display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)",cursor:"pointer",alignItems:"flex-start" }}>{ex.img?<div style={{ width:56,height:56,borderRadius:12,background:"var(--surface2)",border:"1px solid var(--border)",flexShrink:0,overflow:"hidden",position:"relative" }}><img src={ex.img} alt={ex.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/><div style={{ position:"absolute",bottom:2,right:2,width:16,height:16,borderRadius:4,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff" }}>🔍</div></div>:<ExerciseIcon badge={ex.badge}/>}<div style={{ flex:1,minWidth:0 }}><div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3 }}><span style={{ fontWeight:700,fontSize:13 }}>{ex.name}</span><Badge type={ex.badge}/></div><div style={{ fontSize:11,color:"var(--muted)",lineHeight:1.4,marginBottom:4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{ex.detail}</div><div style={{ display:"inline-flex",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:5,background:s?.bg,color:s?.color,marginTop:2 }}>{ex.sets}</div></div><div style={{ fontSize:16,color:"var(--muted)",marginTop:16,opacity:0.5 }}>›</div></div>; }

function ScheduleGrid({ schedule }) { return <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:14 }}>{schedule.map((d,i)=><div key={i} style={{ textAlign:"center",padding:"9px 3px",borderRadius:9,fontSize:10,fontWeight:600,background:d.on?"rgba(255,68,34,0.1)":"var(--surface2)",border:d.on?"1px solid rgba(255,68,34,0.25)":"1px solid var(--border)",color:d.on?"#ff4422":"var(--muted)" }}><div style={{ fontSize:8,textTransform:"uppercase",letterSpacing:1,color:"var(--muted)",marginBottom:3 }}>{d.day}</div>{d.type}</div>)}</div>; }

function WeekPanel({ week, onExerciseClick }) { return <div style={{ animation:"fadeUp 0.3s ease" }}><div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:18,marginBottom:14 }}><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:1,marginBottom:3 }}>{week.title}</div><div style={{ color:"var(--muted)",fontSize:12,marginBottom:12,lineHeight:1.4 }}>{week.subtitle}</div><div style={{ display:"flex",gap:8,flexWrap:"wrap" }}><Chip color="#ff4422">🔻 {week.loss}</Chip><Chip color="#22cc66">⚖️ {week.target}</Chip><Chip color="#4488ff">🏋️ {week.sessions}</Chip></div></div><ScheduleGrid schedule={week.schedule}/>{week.blocks.map((block,bi)=><div key={bi} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:block.type==="hiit"?"rgba(255,187,34,0.1)":"rgba(68,136,255,0.1)" }}>{block.icon}</div><div style={{ fontWeight:700,fontSize:14 }}>{block.title}</div></div><div style={{ padding:"4px 18px 14px" }}>{block.exercises.map((ex,ei)=><ExerciseCard key={ei} ex={ex} onExerciseClick={onExerciseClick}/>)}</div></div>)}{week.tip&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(255,68,34,0.1)" }}>💡</div><div style={{ fontWeight:700,fontSize:14 }}>{week.tip.title}</div></div><div style={{ padding:"14px 18px" }}><div style={{ background:"linear-gradient(135deg,rgba(255,68,34,0.06),rgba(255,68,34,0.02))",border:"1px solid rgba(255,68,34,0.18)",borderRadius:11,padding:14,fontSize:12,lineHeight:1.6,color:"var(--muted)" }}>{week.tip.text}</div></div></div>}</div>; }

function FoodTab() {
  const [week, setWeek] = useState(0);
  const w = FOOD_WEEKS[week];
  const green = "#22cc66";
  return <div>
    <div style={{ display:"flex",margin:"14px 14px 0",background:"var(--surface)",borderRadius:12,padding:4,border:"1px solid var(--border)",position:"sticky",top:8,zIndex:100 }}>{FOOD_WEEKS.map((fw,i)=><div key={i} onClick={()=>setWeek(i)} style={{ flex:1,padding:"10px 4px",textAlign:"center",fontSize:10,fontWeight:600,color:week===i?"#000":"var(--muted)",background:week===i?green:"transparent",borderRadius:9,cursor:"pointer",transition:"all 0.25s",boxShadow:week===i?"0 4px 16px rgba(34,204,102,0.3)":"none" }}><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:17,lineHeight:1 }}>{fw.tab}</div>{fw.label}</div>)}</div>
    <div style={{ padding:"18px 14px 24px",animation:"fadeUp 0.3s ease" }} key={week}>
      <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:18,marginBottom:14 }}><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:1,marginBottom:3 }}>{w.title}</div><div style={{ color:"var(--muted)",fontSize:12,marginBottom:12,lineHeight:1.4 }}>{w.subtitle}</div><div style={{ display:"flex",gap:8,flexWrap:"wrap" }}><Chip color={green}>🔥 {w.kcal} kcal/j</Chip><Chip color="#ffbb22">💰 {w.budget}/sem</Chip></div></div>
      {week===0&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(68,136,255,0.1)" }}>⚖️</div><div style={{ fontWeight:700,fontSize:14 }}>Mémo poids CUIT</div></div><div style={{ padding:"10px 18px 14px" }}><div style={{ background:"linear-gradient(135deg,rgba(68,136,255,0.06),rgba(68,136,255,0.02))",border:"1px solid rgba(68,136,255,0.18)",borderRadius:10,padding:12,fontSize:11,color:"var(--muted)",marginBottom:10,lineHeight:1.5 }}><strong style={{ color:"#4488ff" }}>Tous les poids = CUIT</strong> = dans l'assiette. Poser l'assiette sur la balance.</div><table style={{ width:"100%",borderCollapse:"collapse",fontSize:11 }}><thead><tr>{["Aliment","Cru","→ Cuit","Ratio"].map(h=><th key={h} style={{ textAlign:"left",color:"#4488ff",fontSize:9,textTransform:"uppercase",letterSpacing:1,padding:"6px",borderBottom:"1px solid var(--border)" }}>{h}</th>)}</tr></thead><tbody>{CONVERSIONS.map((c,i)=><tr key={i}><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",fontWeight:600,color:"var(--text)" }}>{c.aliment}</td><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",color:"var(--muted)" }}>{c.cru}</td><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",color:"var(--muted)" }}>{c.cuit}</td><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",color:"var(--muted)" }}>{c.ratio}</td></tr>)}</tbody></table></div></div>}
      <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(255,68,34,0.1)" }}>📋</div><div style={{ fontWeight:700,fontSize:14 }}>Règles {w.tab}</div></div><div style={{ padding:"10px 18px 14px" }}>{w.rules.map((r,i)=><div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",fontSize:13,borderBottom:i<w.rules.length-1?"1px solid var(--border)":"none" }}><span style={{ fontSize:16,flexShrink:0 }}>{r.icon}</span><span>{r.text}</span></div>)}</div></div>
      {w.meals.map((meal,mi)=><div key={mi} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ fontWeight:700,fontSize:14 }}>{meal.time}</div><div style={{ fontSize:10,fontWeight:700,color:"var(--muted)",background:"var(--surface2)",padding:"3px 8px",borderRadius:5 }}>{meal.kcal}</div></div><div style={{ padding:"6px 18px 14px" }}>{meal.options.map((opt,oi)=><div key={oi} style={{ padding:"10px 0",borderBottom:oi<meal.options.length-1?"1px solid var(--border)":"none" }}><div style={{ fontSize:12,fontWeight:700,color:green,marginBottom:4,textTransform:"uppercase",letterSpacing:0.5 }}>{opt.name}</div><div style={{ fontSize:13,lineHeight:1.55,color:"var(--text)" }}>{opt.desc}</div>{opt.price&&<div style={{ fontSize:10,color:"#ffbb22",marginTop:3,fontWeight:600 }}>💰 {opt.price}</div>}{opt.note&&<div style={{ fontSize:10,color:"#4488ff",marginTop:3,fontStyle:"italic" }}>💡 {opt.note}</div>}</div>)}</div></div>)}
      {w.shopping&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(68,136,255,0.1)" }}>🛒</div><div style={{ fontWeight:700,fontSize:14 }}>Liste de courses {w.tab} ({w.budget})</div></div><div style={{ padding:"14px 18px" }}><div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>{w.shopping.map((cat,ci)=><div key={ci} style={{ background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10,padding:12 }}><div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#4488ff",marginBottom:6 }}>{cat.cat}</div>{cat.items.map((item,ii)=><div key={ii} style={{ fontSize:11,color:"var(--muted)",padding:"2px 0",lineHeight:1.4 }}>{item}</div>)}</div>)}</div></div></div>}
      {w.tip&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(34,204,102,0.1)" }}>💡</div><div style={{ fontWeight:700,fontSize:14 }}>{w.tip.title}</div></div><div style={{ padding:"14px 18px" }}><div style={{ background:"linear-gradient(135deg,rgba(34,204,102,0.06),rgba(34,204,102,0.02))",border:"1px solid rgba(34,204,102,0.18)",borderRadius:11,padding:14,fontSize:12,lineHeight:1.6,color:"var(--muted)" }}>{w.tip.text}</div></div></div>}
    </div>
  </div>;
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("sport");
  const [activeWeek, setActiveWeek] = useState(0);
  const [selectedEx, setSelectedEx] = useState(null);
  return <div style={{ "--bg":"#08080b","--surface":"#111116","--surface2":"#1a1a21","--border":"#26262e","--text":"#eaeaef","--muted":"#7c7c8a",background:"var(--bg)",color:"var(--text)",fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",maxWidth:480,margin:"0 auto" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    {selectedEx&&<ExerciseDetailModal ex={selectedEx} onClose={()=>setSelectedEx(null)}/>}
    <div style={{ position:"relative",padding:"44px 20px 24px",textAlign:"center",overflow:"hidden" }}><div style={{ position:"absolute",top:"-50%",left:"50%",transform:"translateX(-50%)",width:500,height:500,background:"radial-gradient(circle,rgba(255,68,34,0.12) 0%,transparent 70%)",pointerEvents:"none" }}/><div style={{ display:"inline-block",background:"#ff4422",color:"#fff",fontSize:10,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",padding:"5px 14px",borderRadius:20,marginBottom:12 }}>Programme 30 Jours</div><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(38px,8vw,56px)",lineHeight:0.95,letterSpacing:2 }}><span style={{ color:"var(--muted)",textDecoration:"line-through",textDecorationColor:"#ff4422" }}>106 KG</span>{" "}→{" "}<span style={{ color:"#ff4422" }}>100 KG</span></div><div style={{ color:"var(--muted)",fontSize:13,maxWidth:400,margin:"8px auto 0",lineHeight:1.5 }}>Marcy Home Gym · Tapis de course · Step · Corde · Haltères 2×2,5 kg</div></div>
    <div style={{ display:"flex",margin:"0 14px",background:"var(--surface)",borderRadius:12,padding:4,border:"1px solid var(--border)" }}>{[{key:"sport",icon:"🏋️",label:"Sport"},{key:"food",icon:"🥗",label:"Alimentation"}].map(t=><div key={t.key} onClick={()=>setActiveTab(t.key)} style={{ flex:1,padding:"12px 8px",textAlign:"center",fontSize:13,fontWeight:700,color:activeTab===t.key?"#fff":"var(--muted)",background:activeTab===t.key?(t.key==="sport"?"#ff4422":"#22cc66"):"transparent",borderRadius:9,cursor:"pointer",transition:"all 0.25s",boxShadow:activeTab===t.key?(t.key==="sport"?"0 4px 16px rgba(255,68,34,0.3)":"0 4px 16px rgba(34,204,102,0.3)"):"none" }}>{t.icon} {t.label}</div>)}</div>
    {activeTab==="sport"&&<div><div style={{ display:"flex",margin:"14px 14px 0",background:"var(--surface)",borderRadius:12,padding:4,border:"1px solid var(--border)",position:"sticky",top:8,zIndex:100 }}>{WEEKS.map((w,i)=><div key={i} onClick={()=>setActiveWeek(i)} style={{ flex:1,padding:"10px 4px",textAlign:"center",fontSize:10,fontWeight:600,color:activeWeek===i?"#fff":"var(--muted)",background:activeWeek===i?"#ff4422":"transparent",borderRadius:9,cursor:"pointer",transition:"all 0.25s",boxShadow:activeWeek===i?"0 4px 16px rgba(255,68,34,0.3)":"none" }}><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:17,lineHeight:1 }}>{w.tab}</div>{w.label}</div>)}</div><div style={{ padding:"18px 14px 48px" }}><WeekPanel week={WEEKS[activeWeek]} onExerciseClick={setSelectedEx}/></div></div>}
    {activeTab==="food"&&<FoodTab/>}
    <div style={{ textAlign:"center",padding:"20px 14px 36px",color:"var(--muted)",fontSize:10,letterSpacing:0.5 }}>Marcy Home Gym · Tapis de course · Step · Corde à sauter · Haltères 2×2,5 kg</div>
  </div>;
}
