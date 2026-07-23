import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════
// PROGRAMME V3 — FULL BODY CHAQUE SÉANCE
// Marcy HG3000 · Tapis (max 5,5 km/h, incl. max 3%) · Step · Corde
// Haltères 2,5 kg + 5 kg · 4 séances/semaine
// Tout le corps à chaque entraînement
// ═══════════════════════════════════════════════════════════════════════

const DAYS = [
  {
    id: "lun", label: "Lundi", emoji: "🏋️", active: true,
    title: "FULL BODY A",
    subtitle: "Tout le corps en une séance. Focus poussée : chest press, développé épaules, squats, triceps.",
    duration: "~80 min",
    sections: [
      { title: "Cardio — Tapis 40 min", icon: "🏃", exercises: [
        { name: "Marche endurance", badge: "cardio", detail: "40 min à 5–5,5 km/h · inclinaison 2-3%. Brûle-graisse longue durée. Boire régulièrement.", sets: "⏱ 40 min · 5,5 km/h · incl. 2-3%", muscles: ["cardio", "brûle-graisse"], img: null },
      ]},
      { title: "Pectoraux", icon: "💪", exercises: [
        { name: "Marcy — Chest press", badge: "muscu", detail: "Pousser les poignées vers l'avant, dos calé contre le dossier. Charge progressive.", sets: "3 × 12 · 60s repos", muscles: ["pectoraux", "triceps"], img: "/images/chestpress.jpg" },
        { name: "Marcy — Pec dec / Butterfly", badge: "muscu", detail: "Bras écartés, rapprocher les poignées devant la poitrine. Serrer 1 sec quand les mains se rejoignent.", sets: "3 × 12 · 60s repos", muscles: ["pectoraux"], img: "/images/butterfly.jpeg" },
      ]},
      { title: "Dos", icon: "💪", exercises: [
        { name: "Marcy — Lat pulldown prise large", badge: "muscu", detail: "Mains écartées sur la barre haute, tirer vers la poitrine. Serrer les omoplates. Dos large = taille en V.", sets: "3 × 12 · 60s repos", muscles: ["grand dorsal", "dos"], img: "/images/latepulldown.jpg" },
        { name: "Marcy — Seated row (poulie basse)", badge: "muscu", detail: "Assis au sol, tirer la poignée basse vers le ventre. Dos droit, coudes au corps.", sets: "3 × 12 · 60s repos", muscles: ["dos", "biceps"], img: "/images/poulie.gif" },
      ]},
      { title: "Épaules", icon: "💪", exercises: [
        { name: "Haltères 5 kg — Développé épaules", badge: "muscu", detail: "Pousser les haltères au-dessus de la tête. Épaules larges = silhouette en V.", sets: "3 × 12 · 60s repos", muscles: ["épaules"], img: "images/dev_op.png" },
        { name: "Haltères 2,5 kg — Élévations latérales", badge: "muscu", detail: "Lever les haltères sur les côtés jusqu'à hauteur d'épaule. Mouvement lent.", sets: "3 × 15 · 45s repos", muscles: ["deltoïdes latéraux"], img: "/images/elevation-lateral.jpg" },
      ]},
      { title: "Jambes", icon: "💪", exercises: [
        { name: "Marcy — Leg extension", badge: "muscu", detail: "Quadriceps. Assis, tendre les jambes sous le coussin. Ne pas verrouiller en haut.", sets: "3 × 12 · 60s repos", muscles: ["quadriceps"], img: "/images/leg-extension-machine.gif" },
        { name: "Marcy — Leg curl", badge: "muscu", detail: "Ischio-jambiers (arrière de la cuisse). Ramener les chevilles vers soi.", sets: "3 × 12 · 60s repos", muscles: ["ischio-jambiers"], img: "/images/leg_curl.png" },
        { name: "Squats goblet — Haltère 5 kg", badge: "muscu", detail: "Tenir l'haltère contre la poitrine. Descendre en squat, dos droit, serrer les fessiers en remontant.", sets: "3 × 15 · 60s repos", muscles: ["quadriceps", "fessiers"], img: "/images/squat.jpg" },
      ]},
      { title: "Bras", icon: "💪", exercises: [
        { name: "Haltères 5 kg — Curl biceps", badge: "muscu", detail: "Debout, plier les coudes pour monter les haltères. Ne pas balancer le corps.", sets: "3 × 12 · 45s repos", muscles: ["biceps"], img: "/images/curlbiceps.png" },
        { name: "Marcy — Triceps pushdown (poulie haute)", badge: "muscu", detail: "Debout, pousser la barre haute vers le bas. Coudes collés au corps.", sets: "3 × 12 · 45s repos", muscles: ["triceps"], img: "/images/triceps.png" },
      ]},
      { title: "Abdos / Taille en V", icon: "🔥", exercises: [
        { name: "Marcy — Ab crunch (poulie haute)", badge: "core", detail: "À genoux, cruncher vers le bas avec la résistance de la poulie haute.", sets: "3 × 15 · 45s repos", muscles: ["abdos"], img: "/images/crunch.png" },
        { name: "Crunchs obliques (coude-genou)", badge: "core", detail: "Allongé, coude droit vers genou gauche, alterner. Creuse la taille.", sets: "3 × 15/côté", muscles: ["obliques"], img: "/images/C_oblique.png" },
        { name: "Stomach vacuum", badge: "core", detail: "Debout, expirer tout l'air, rentrer le ventre au max, tenir 10-15s. Rétrécit la taille.", sets: "5 × 15s tenue", muscles: ["transverse", "taille en V"], img: "/images/vaccum.png" },
      ]},
    ],
  },
  {
    id: "mar", label: "Mardi", emoji: "💤", active: false,
    title: "REPOS",
    subtitle: "Repos musculaire. Juste les vacuum dans la journée.",
    duration: "Repos",
    sections: [
      { title: "Vacuum quotidien", icon: "🧘", exercises: [
        { name: "Stomach vacuum", badge: "core", detail: "3 × 5 vacuum dans la journée. Partout : taxi, maison, debout, assis. Expirer à fond, rentrer le ventre, tenir 10-15s.", sets: "3 × 5 reps · 15s tenue", muscles: ["transverse", "taille en V"], img: "/images/vaccum.png"  },
      ]},
    ],
  },
  {
    id: "mer", label: "Mercredi", emoji: "🏋️", active: true,
    title: "FULL BODY B",
    subtitle: "Tout le corps, variante B. Focus tirage : lat pulldown lourd, curl, fentes, leg curl.",
    duration: "~80 min",
    sections: [
      { title: "Cardio — Tapis 40 min", icon: "🏃", exercises: [
        { name: "Marche endurance", badge: "cardio", detail: "40 min à 5–5,5 km/h · inclinaison 3%. Brûle-graisse.", sets: "⏱ 40 min · 5,5 km/h · incl. 3%", muscles: ["cardio", "brûle-graisse"], img: null },
      ]},
      { title: "Dos (priorité)", icon: "💪", exercises: [
        { name: "Marcy — Lat pulldown prise large", badge: "muscu", detail: "Charge lourde aujourd'hui. Le roi du V. Mains très écartées, tirer vers la poitrine.", sets: "4 × 10 · charge lourde · 60s repos", muscles: ["grand dorsal"], img: "/images/latepulldown.jpg" },
        { name: "Marcy — Seated row (poulie basse)", badge: "muscu", detail: "Tirer la poignée vers le ventre. Serrer les omoplates.", sets: "3 × 12 · 60s repos", muscles: ["dos", "rhomboïdes"], img: "/images/poulie.gif" },
        { name: "Marcy — Upright row (poulie basse)", badge: "muscu", detail: "Debout, tirer la poignée vers le menton. Coudes vers le haut et l'extérieur. Trapèzes + épaules.", sets: "3 × 12 · 60s repos", muscles: ["trapèzes", "épaules"], img: "/images/Trapèze.png" },
      ]},
      { title: "Pectoraux", icon: "💪", exercises: [
        { name: "Marcy — Chest press", badge: "muscu", detail: "Descente lente 3 sec, remontée explosive. Tempo lent = plus de tension.", sets: "3 × 12 · tempo lent · 60s repos", muscles: ["pectoraux", "triceps"], img: "/images/chestpress.jpg" },
      ]},
      { title: "Épaules", icon: "💪", exercises: [
        { name: "Haltères 5 kg — Développé épaules", badge: "muscu", detail: "Pousser au-dessus de la tête.", sets: "3 × 12 · 60s repos", muscles: ["épaules"], img: "/images/dev_op.png" },
        { name: "Marcy — Upright row (poulie basse)", badge: "muscu", detail: "Poignée basse vers le menton. Complète les épaules.", sets: "3 × 12 · 60s repos", muscles: ["épaules", "trapèzes"], img: "/images/Trapèze.png" },
      ]},
      { title: "Jambes", icon: "💪", exercises: [
        { name: "Marcy — Leg extension", badge: "muscu", detail: "Quadriceps. 3×12.", sets: "3 × 12 · 60s repos", muscles: ["quadriceps"], img: "/images/leg-extension-machine.gif" },
        { name: "Marcy — Leg curl", badge: "muscu", detail: "Ischio-jambiers. 3×12.", sets: "3 × 12 · 60s repos", muscles: ["ischio-jambiers"], img: "/images/leg_curl.png" },
        { name: "Fentes avant — Haltères 2,5 kg", badge: "muscu", detail: "Grand pas en avant, descendre le genou arrière. 2,5 kg par main.", sets: "3 × 10/jambe · 60s repos", muscles: ["fessiers", "ischio", "quadriceps"], img: "/images/fentes.jpg" },
      ]},
      { title: "Bras", icon: "💪", exercises: [
        { name: "Marcy — Preacher curl (pad)", badge: "muscu", detail: "Bras calé sur le pad, curl avec la poulie basse. Isole le biceps à 100%.", sets: "3 × 12 · 45s repos", muscles: ["biceps"], img: "/images/preacher.png" },
        { name: "Marcy — Curl poulie basse", badge: "muscu", detail: "Debout, curl avec la poulie basse. Coudes fixes.", sets: "3 × 12 · 45s repos", muscles: ["biceps"], img: "/images/cpoulie.jpg" },
        { name: "Marcy — Triceps pushdown (poulie haute)", badge: "muscu", detail: "Pousser la barre vers le bas. Coudes collés au corps.", sets: "3 × 12 · 45s repos", muscles: ["triceps"], img: "images/triceps.png" },
      ]},
      { title: "Abdos / Taille en V", icon: "🔥", exercises: [
        { name: "Marcy — Ab crunch (poulie haute)", badge: "core", detail: "À genoux, crunch avec résistance.", sets: "3 × 15 · 45s repos", muscles: ["abdos"], img: "/images/crunch.png" },
        { name: "Russian twist — Haltère 2,5 kg", badge: "core", detail: "Assis, pieds décollés, tourner le buste gauche-droite avec l'haltère. Le roi des obliques.", sets: "3 × 20 (10/côté)", muscles: ["obliques"], img: "/images/russian.png" },
        { name: "Planche face + latérale", badge: "core", detail: "Planche face 40s → latérale droite 25s → latérale gauche 25s.", sets: "3 tours · 90s/tour", muscles: ["abdos", "obliques"], img: "/images/Plancheslat.png" },
        { name: "Stomach vacuum", badge: "core", detail: "5 × 15s. Finir chaque séance par ça.", sets: "5 × 15s tenue", muscles: ["transverse", "taille en V"], img: "/images/vaccum.png" },
      ]},
    ],
  },
  {
    id: "jeu", label: "Jeudi", emoji: "💤", active: false,
    title: "REPOS",
    subtitle: "Repos complet. Dormir max. Juste les vacuum.",
    duration: "Repos",
    sections: [
      { title: "Vacuum quotidien", icon: "🧘", exercises: [
        { name: "Stomach vacuum", badge: "core", detail: "3 × 5 vacuum. Partout, tout le temps.", sets: "3 × 5 reps · 15s tenue", muscles: ["transverse", "taille en V"], img: "/images/vaccum.png" },
      ]},
    ],
  },
  {
    id: "ven", label: "Vendredi", emoji: "🏋️", active: true,
    title: "FULL BODY C",
    subtitle: "Tout le corps, variante C. Supersets pour brûler plus. Tempo rapide.",
    duration: "~80 min",
    sections: [
      { title: "Cardio — Tapis 40 min", icon: "🏃", exercises: [
        { name: "Marche endurance", badge: "cardio", detail: "40 min à 5–5,5 km/h · inclinaison 3%. Brûle-graisse.", sets: "⏱ 40 min · 5,5 km/h · incl. 3%", muscles: ["cardio"], img: null },
      ]},
      { title: "SUPERSET Pecs + Dos", icon: "💪", exercises: [
        { name: "Marcy — Chest press + Lat pulldown", badge: "muscu", detail: "SUPERSET : chest press 10 reps → enchaîner direct lat pulldown 10 reps, sans pause. 90s repos après le duo. Le cœur monte = plus de calories brûlées.", sets: "4 × 10 chaque · superset · 90s", muscles: ["pectoraux", "dos"], img: "/images/CL.png" },
        { name: "Marcy — Butterfly + Seated row", badge: "muscu", detail: "SUPERSET : butterfly 12 reps → seated row poulie basse 12 reps. Pecs intérieur + dos épaisseur.", sets: "3 × 12 chaque · superset · 90s", muscles: ["pectoraux", "dos"], img: "/images/BR.png" },
      ]},
      { title: "SUPERSET Épaules + Bras", icon: "💪", exercises: [
        { name: "Développé épaules 5 kg + Curl biceps 5 kg", badge: "muscu", detail: "SUPERSET : développé épaules 10 reps → curl biceps 10 reps. Sans pause entre les 2.", sets: "3 × 10 chaque · superset · 60s", muscles: ["épaules", "biceps"], img: "/images/DC.png" },
        { name: "Élévations latérales 2,5 kg + Triceps pushdown", badge: "muscu", detail: "SUPERSET : élévations latérales 15 reps → triceps pushdown poulie haute 12 reps.", sets: "3 × 15/12 · superset · 60s", muscles: ["épaules", "triceps"], img: "/images/ET.png" },
      ]},
      { title: "SUPERSET Jambes", icon: "💪", exercises: [
        { name: "Marcy — Leg extension + Leg curl", badge: "muscu", detail: "SUPERSET : extension 12 reps → curl 12 reps. Avant + arrière de la cuisse sans pause.", sets: "3 × 12 chaque · superset · 90s", muscles: ["quadriceps", "ischio"], img: "/images/leg-extension-machine.gif" },
        { name: "Squats goblet 5 kg + Step montées", badge: "muscu", detail: "SUPERSET : squats goblet 15 reps → step montées 15 reps/jambe. Jambes + cardio.", sets: "3 × 15 chaque · superset · 90s", muscles: ["quadriceps", "fessiers", "cardio"], img: "/images/squat.jpg" },
      ]},
      { title: "Abdos / Taille en V", icon: "🔥", exercises: [
        { name: "Circuit abdos enchaîné", badge: "core", detail: "Ab crunch poulie haute ×15 → Crunchs obliques ×15/côté → Russian twist 2,5 kg ×20 → Planche 40s → Vacuum ×5. Tout enchaîné, 1 min repos entre tours.", sets: "3 tours · 1 min repos", muscles: ["abdos", "obliques", "transverse"], img: "/images/final.png" },
      ]},
    ],
  },
  {
    id: "sam", label: "Samedi", emoji: "🏋️", active: true,
    title: "FULL BODY D + CARDIO LONG",
    subtitle: "Tout le corps + 1h de marche. La plus grosse séance de la semaine. Charges lourdes.",
    duration: "~90 min",
    sections: [
      { title: "Cardio — Tapis 1h", icon: "🏃", exercises: [
        { name: "Marche longue durée", badge: "cardio", detail: "1h à 5–5,5 km/h · inclinaison 2-3%. Sa zone de confort, il rallonge plutôt que sprinter. ~350-400 kcal. Podcast ou musique.", sets: "⏱ 60 min · 5,5 km/h · incl. 2-3%", muscles: ["cardio", "brûle-graisse max"], img: null },
      ]},
      { title: "Pectoraux — Charge lourde", icon: "💪", exercises: [
        { name: "Marcy — Chest press", badge: "muscu", detail: "Charge max tolérable. Pousser fort. C'est le jour des records.", sets: "4 × 8 · charge MAX · 90s repos", muscles: ["pectoraux", "triceps"], img: "/images/chestpress.jpg" },
        { name: "Marcy — Pec dec / Butterfly", badge: "muscu", detail: "Après le chest press lourd, butterfly en contrôlé pour finir les pecs.", sets: "3 × 12 · 60s repos", muscles: ["pectoraux"], img: "/images/butterfly.jpeg" },
      ]},
      { title: "Dos — Charge lourde", icon: "💪", exercises: [
        { name: "Marcy — Lat pulldown prise large", badge: "muscu", detail: "Charge max tolérable. Le V-shape se construit ici.", sets: "4 × 8 · charge MAX · 90s repos", muscles: ["grand dorsal"], img: "/images/latepulldown.jpg" },
        { name: "Marcy — Seated row (poulie basse)", badge: "muscu", detail: "Charge lourde aussi. Tirer fort vers le ventre.", sets: "3 × 10 · 60s repos", muscles: ["dos", "biceps"], img: "/images/poulie.gif" },
      ]},
      { title: "Épaules — Charge lourde", icon: "💪", exercises: [
        { name: "Haltères 5 kg — Développé épaules", badge: "muscu", detail: "4×10. Pousser fort.", sets: "4 × 10 · 60s repos", muscles: ["épaules"], img: "/images/dev_op.png" },
        { name: "Haltères 2,5 kg — Élévations latérales", badge: "muscu", detail: "3×15. Finition épaules.", sets: "3 × 15 · 45s repos", muscles: ["deltoïdes"], img: "/images/elevation-lateral.jpg" },
      ]},
      { title: "Jambes — Complet", icon: "💪", exercises: [
        { name: "Marcy — Leg extension + Leg curl", badge: "muscu", detail: "SUPERSET : extension → curl sans pause.", sets: "4 × 12 chaque · superset · 90s", muscles: ["quadriceps", "ischio"], img: "/images/LL.png" },
        { name: "Squats goblet 5 kg + Fentes 2,5 kg", badge: "muscu", detail: "SUPERSET : squats 15 reps → fentes 10/jambe.", sets: "3 × 15/10 · superset · 90s", muscles: ["quadriceps", "fessiers", "ischio"], img: "/images/SM.png" },
      ]},
      { title: "Bras — Circuit", icon: "💪", exercises: [
        { name: "Circuit bras 3 exos", badge: "muscu", detail: "Preacher curl pad ×12 → Curl poulie basse ×12 → Triceps pushdown ×12. Enchaîner les 3 sans pause. 60s repos entre tours.", sets: "3 tours · 3 exos enchaînés · 60s", muscles: ["biceps", "triceps"], img: "/images/bras.png" },
      ]},
      { title: "Abdos — Finisher de la semaine", icon: "🔥", exercises: [
        { name: "Circuit V-TAPER final", badge: "core", detail: "Ab crunch poulie haute ×15 → Russian twist 2,5 kg ×20 → Crunchs obliques ×15/côté → Planche face 45s → Planche latérale 30s/côté → Vacuum ×5. Le finisher de la semaine. Tout donner.", sets: "3 tours · 1 min repos entre tours", muscles: ["abdos", "obliques", "transverse", "taille en V"], img: "/images/final.png" },
      ]},
    ],
  },
  {
    id: "dim", label: "Dimanche", emoji: "💤", active: false,
    title: "REPOS COMPLET",
    subtitle: "Pas de sport. Dormir, manger propre, récupérer. Juste les vacuum.",
    duration: "Repos",
    sections: [
      { title: "Vacuum quotidien", icon: "🧘", exercises: [
        { name: "Stomach vacuum", badge: "core", detail: "3 × 5 vacuum. Le dimanche aussi. Ça se fait devant la télé.", sets: "3 × 5 reps · 15s tenue", muscles: ["transverse", "taille en V"], img: null },
      ]},
    ],
  },
];

// ── Badge / Food / Components (identiques à V2) ──────────────────────
const BADGE_STYLES = {
  cardio: { bg: "rgba(255,68,34,0.12)", color: "#ff4422", label: "CARDIO" },
  muscu: { bg: "rgba(68,136,255,0.12)", color: "#4488ff", label: "MUSCU" },
  core: { bg: "rgba(170,85,255,0.12)", color: "#aa55ff", label: "CORE" },
  hiit: { bg: "rgba(255,187,34,0.12)", color: "#ffbb22", label: "HIIT" },
};

const FOOD_WEEKS = [
  { tab: "S1", label: "Base", title: "Alimentation — Base", subtitle: "Repas simples, pas chers, sans poisson, sans noix.", kcal: "~1800", budget: "~35€",
    rules: [{ icon: "🍺", text: "Alcool : max 1 soirée/mois, 3 verres" },{ icon: "🥤", text: "Zéro soda/jus — eau 2L/jour min" },{ icon: "🍬", text: "Zéro grignotage — 3 repas + 1 collation" },{ icon: "🍟", text: "Zéro friture" }],
    meals: [
      { time: "🥣 Petit-déjeuner", kcal: "~380 kcal", options: [{ name: "Lait d'avoine + flocons", desc: "125g flocons cuits dans 200ml lait d'avoine + 1 banane + miel", price: "0,60€" }] },
      { time: "🍗 Déjeuner", kcal: "~550 kcal", options: [{ name: "Poulet riz", desc: "150g poulet + 240g riz cuit + haricots verts + huile olive", price: "2,20€" },{ name: "Thon pâtes", desc: "1 boîte thon + 240g pâtes cuites + sauce tomate maison", price: "1,80€" },{ name: "Steak patate douce", desc: "1 steak 5% + 200g patate douce + salade", price: "2,50€" },{ name: "Dinde semoule", desc: "150g dinde + 210g semoule cuite + ratatouille", price: "2,30€" }] },
      { time: "🍎 Collation", kcal: "~150 kcal", options: [{ name: "Fruit + compote", desc: "1 pomme + 1 compote sans sucre", price: "0,50€" },{ name: "Banane + chocolat", desc: "1 banane + 2 carrés chocolat noir 70%", price: "0,40€" },{ name: "Dinde + tomate", desc: "2 tranches dinde + 1 tomate", price: "0,60€" }] },
      { time: "🍳 Dîner", kcal: "~500 kcal", options: [{ name: "Poulet légumes", desc: "150g poulet + légumes rôtis + pain complet", price: "2,00€" },{ name: "Omelette", desc: "3 œufs + poivrons, oignons, tomates + salade", price: "1,30€" },{ name: "Soupe + œufs", desc: "Soupe maison + 2 œufs durs + pain complet", price: "1,20€" }] },
    ],
    shopping: [{ cat: "🥩 Protéines", items: ["Poulet 1kg","Dinde 600g","Steaks 5% ×4","Thon ×4","Œufs ×18"] },{ cat: "🌾 Féculents", items: ["Riz 1kg","Pâtes 500g","Semoule 500g","Pain complet","Flocons avoine 500g"] },{ cat: "🥦 Légumes", items: ["Haricots verts","Courgettes ×4","Brocoli ×2","Poivrons ×4","Tomates ×8","Salade ×2","Oignons ×4"] },{ cat: "🍎 Autres", items: ["Lait d'avoine 2L","Bananes ×10","Pommes ×7","Compotes ×4","Chocolat noir","Huile olive","Miel"] }],
    tip: { title: "Le principe", text: "Protéines à chaque repas (150g), féculents contrôlés (pesés cuits), légumes à volonté. Pas compliqué, pas cher, efficace." },
  },
  { tab: "S2", label: "Plaisir", title: "Avec repas plaisir", subtitle: "Même base + 1 plaisir samedi soir.", kcal: "~1750", budget: "~35€",
    rules: [{ icon: "📉", text: "Féculents : 210g cuit au lieu de 240g" },{ icon: "🍕", text: "1 repas plaisir samedi soir MAISON" },{ icon: "💧", text: "Eau 2,5L/jour" }],
    meals: [
      { time: "🥣 Petit-déj", kcal: "~360 kcal", options: [{ name: "Flocons", desc: "100g flocons cuits + lait d'avoine + fruit + cannelle", price: "0,50€" }] },
      { time: "🍗 Déjeuner", kcal: "~530 kcal", options: [{ name: "Au choix", desc: "150g protéine + 210g féculents cuits + légumes + huile olive", price: "~2,20€" }] },
      { time: "🍎 Collation", kcal: "~140 kcal", options: [{ name: "Rotation", desc: "Fruit+compote / banane+chocolat / dinde+tomate", price: "0,50€" }] },
      { time: "🍳 Dîner", kcal: "~480 kcal", options: [{ name: "Protéines + légumes", desc: "Pas de féculents le soir → double légumes", price: "~1,80€" }] },
      { time: "🍕 Plaisir samedi", kcal: "~800 kcal", options: [{ name: "Pizza/Burger/Kebab MAISON", desc: "Fait maison, portion normale", price: "~3,50€" }] },
    ],
    shopping: null, tip: { title: "Le plaisir c'est ok", text: "1 repas sur 21 à 800 kcal = +300 kcal = rien. Mais ça change tout pour la motivation." },
  },
];

const CONVERSIONS = [
  { aliment: "Riz", cru: "80g", cuit: "~240g", ratio: "×3" },
  { aliment: "Pâtes", cru: "80g", cuit: "~240g", ratio: "×3" },
  { aliment: "Semoule", cru: "70g", cuit: "~210g", ratio: "×3" },
  { aliment: "Flocons", cru: "50g", cuit: "~125g", ratio: "×2,5" },
  { aliment: "Patate douce", cru: "200g", cuit: "~200g", ratio: "×1" },
  { aliment: "Poulet/Dinde", cru: "150g", cuit: "~150g", ratio: "×1" },
  { aliment: "Steak haché", cru: "125g", cuit: "~100g", ratio: "×0,8" },
];

// ── Shared Components ─────────────────────────────────────────────────
function Badge({ type }) { const s = BADGE_STYLES[type]; if (!s) return null; return <span style={{ fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase",padding:"3px 8px",borderRadius:5,background:s.bg,color:s.color,whiteSpace:"nowrap" }}>{s.label}</span>; }
function Chip({ children, color }) { return <div style={{ display:"flex",alignItems:"center",gap:5,background:"var(--surface2)",border:"1px solid var(--border)",padding:"7px 12px",borderRadius:9,fontSize:12,fontWeight:600,color }}>{children}</div>; }
function ExerciseIcon({ badge }) { const stroke = BADGE_STYLES[badge]?.color || "#7c7c8a"; return <div style={{ width:56,height:56,borderRadius:12,background:"var(--surface2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><svg viewBox="0 0 40 40" width="32" height="32" fill="none"><circle cx="20" cy="10" r="4" stroke={stroke} strokeWidth="1.5"/><line x1="20" y1="14" x2="20" y2="28" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="28" x2="14" y2="36" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="28" x2="26" y2="36" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="19" x2="12" y2="23" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="19" x2="28" y2="23" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/></svg></div>; }

function ExerciseDetailModal({ ex, onClose }) { if (!ex) return null; const s = BADGE_STYLES[ex.badge]; const stroke = s?.color || "#7c7c8a"; return <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.95)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"60px 20px 40px",animation:"fadeIn 0.2s ease",overflowY:"auto" }}><div onClick={onClose} style={{ position:"fixed",top:16,right:20,width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#fff",cursor:"pointer",zIndex:10000 }}>✕</div><div onClick={e=>e.stopPropagation()} style={{ maxWidth:400,width:"100%",background:"#111116",borderRadius:20,overflow:"hidden",border:"1px solid #26262e",boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}><div style={{ width:"100%",height:260,background:"#1a1a21",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>{ex.img?<img src={ex.img} alt={ex.name} style={{ width:"100%",height:"100%",objectFit:"contain",background:"#0a0a0c" }}/>:<svg viewBox="0 0 120 120" width="140" height="140" fill="none"><circle cx="60" cy="25" r="10" stroke={stroke} strokeWidth="2"/><line x1="60" y1="35" x2="60" y2="72" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="72" x2="44" y2="100" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="72" x2="76" y2="100" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="48" x2="36" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><line x1="60" y1="48" x2="84" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round"/><text x="60" y="116" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="sans-serif">Ajoute un GIF ici</text></svg>}<div style={{ position:"absolute",top:12,left:12 }}><Badge type={ex.badge}/></div></div><div style={{ padding:"20px 22px 24px" }}><div style={{ fontWeight:700,fontSize:18,lineHeight:1.3,marginBottom:12,color:"#eaeaef" }}>{ex.name}</div><div style={{ fontSize:13,color:"#9a9aa6",lineHeight:1.6,marginBottom:16 }}>{ex.detail}</div><div style={{ display:"inline-flex",fontSize:13,fontWeight:700,padding:"8px 16px",borderRadius:10,background:s?.bg,color:s?.color }}>{ex.sets}</div>{ex.muscles?.length>0&&<div style={{ marginTop:14,display:"flex",gap:6,flexWrap:"wrap" }}>{ex.muscles.map((m,i)=><span key={i} style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",padding:"4px 10px",borderRadius:6,background:"rgba(255,255,255,0.05)",color:"#7c7c8a",border:"1px solid rgba(255,255,255,0.06)" }}>{m}</span>)}</div>}</div></div><div style={{ marginTop:16,color:"rgba(255,255,255,0.3)",fontSize:11 }}>Appuyer en dehors pour fermer</div></div>; }

function ExerciseCard({ ex, onClick }) { const s = BADGE_STYLES[ex.badge]; return <div onClick={()=>onClick&&onClick(ex)} style={{ display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)",cursor:"pointer",alignItems:"flex-start" }}>{ex.img?<div style={{ width:56,height:56,borderRadius:12,background:"var(--surface2)",border:"1px solid var(--border)",flexShrink:0,overflow:"hidden",position:"relative" }}><img src={ex.img} alt={ex.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/><div style={{ position:"absolute",bottom:2,right:2,width:16,height:16,borderRadius:4,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff" }}>🔍</div></div>:<ExerciseIcon badge={ex.badge}/>}<div style={{ flex:1,minWidth:0 }}><div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3 }}><span style={{ fontWeight:700,fontSize:13 }}>{ex.name}</span><Badge type={ex.badge}/></div><div style={{ fontSize:11,color:"var(--muted)",lineHeight:1.4,marginBottom:4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{ex.detail}</div><div style={{ display:"inline-flex",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:5,background:s?.bg,color:s?.color,marginTop:2 }}>{ex.sets}</div></div><div style={{ fontSize:16,color:"var(--muted)",marginTop:16,opacity:0.5 }}>›</div></div>; }

function DayPanel({ day, onExClick }) {
  return <div style={{ animation:"fadeUp 0.3s ease" }}>
    <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:18,marginBottom:14 }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
        <span style={{ fontSize:28 }}>{day.emoji}</span>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:1 }}>{day.title}</div>
          <div style={{ color:"var(--muted)",fontSize:12,lineHeight:1.4 }}>{day.subtitle}</div>
        </div>
      </div>
      <div style={{ display:"flex",gap:8,marginTop:10 }}>
        <Chip color={day.active?"#ff4422":"var(--muted)"}>{day.active?"🏋️":"💤"} {day.duration}</Chip>
      </div>
    </div>
    {day.sections.map((sec,si)=><div key={si} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}>
        <div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:sec.icon==="🔥"?"rgba(170,85,255,0.1)":sec.icon==="🏃"?"rgba(255,68,34,0.1)":sec.icon==="🧘"?"rgba(34,204,102,0.1)":"rgba(68,136,255,0.1)" }}>{sec.icon}</div>
        <div style={{ fontWeight:700,fontSize:14 }}>{sec.title}</div>
      </div>
      <div style={{ padding:"4px 18px 14px" }}>{sec.exercises.map((ex,ei)=><ExerciseCard key={ei} ex={ex} onClick={onExClick}/>)}</div>
    </div>)}
  </div>;
}

function FoodTab() {
  const [week, setWeek] = useState(0);
  const w = FOOD_WEEKS[week];
  const green = "#22cc66";
  return <div>
    <div style={{ display:"flex",margin:"14px 14px 0",background:"var(--surface)",borderRadius:12,padding:4,border:"1px solid var(--border)",position:"sticky",top:8,zIndex:100 }}>{FOOD_WEEKS.map((fw,i)=><div key={i} onClick={()=>setWeek(i)} style={{ flex:1,padding:"10px 4px",textAlign:"center",fontSize:10,fontWeight:600,color:week===i?"#000":"var(--muted)",background:week===i?green:"transparent",borderRadius:9,cursor:"pointer",transition:"all 0.25s",boxShadow:week===i?"0 4px 16px rgba(34,204,102,0.3)":"none" }}><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:17,lineHeight:1 }}>{fw.tab}</div>{fw.label}</div>)}</div>
    <div style={{ padding:"18px 14px 24px",animation:"fadeUp 0.3s ease" }} key={week}>
      <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:18,marginBottom:14 }}><div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:1,marginBottom:3 }}>{w.title}</div><div style={{ color:"var(--muted)",fontSize:12,marginBottom:12,lineHeight:1.4 }}>{w.subtitle}</div><div style={{ display:"flex",gap:8,flexWrap:"wrap" }}><Chip color={green}>🔥 {w.kcal} kcal/j</Chip><Chip color="#ffbb22">💰 {w.budget}/sem</Chip></div></div>
      {week===0&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(68,136,255,0.1)" }}>⚖️</div><div style={{ fontWeight:700,fontSize:14 }}>Mémo poids CUIT</div></div><div style={{ padding:"10px 18px 14px" }}><div style={{ background:"linear-gradient(135deg,rgba(68,136,255,0.06),rgba(68,136,255,0.02))",border:"1px solid rgba(68,136,255,0.18)",borderRadius:10,padding:12,fontSize:11,color:"var(--muted)",marginBottom:10 }}><strong style={{ color:"#4488ff" }}>Tous les poids = CUIT</strong> = dans l'assiette.</div><table style={{ width:"100%",borderCollapse:"collapse",fontSize:11 }}><thead><tr>{["Aliment","Cru","Cuit","×"].map(h=><th key={h} style={{ textAlign:"left",color:"#4488ff",fontSize:9,textTransform:"uppercase",padding:"6px",borderBottom:"1px solid var(--border)" }}>{h}</th>)}</tr></thead><tbody>{CONVERSIONS.map((c,i)=><tr key={i}><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",fontWeight:600,color:"var(--text)" }}>{c.aliment}</td><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",color:"var(--muted)" }}>{c.cru}</td><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",color:"var(--muted)" }}>{c.cuit}</td><td style={{ padding:"5px 6px",borderBottom:"1px solid var(--border)",color:"var(--muted)" }}>{c.ratio}</td></tr>)}</tbody></table></div></div>}
      <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(255,68,34,0.1)" }}>📋</div><div style={{ fontWeight:700,fontSize:14 }}>Règles</div></div><div style={{ padding:"10px 18px 14px" }}>{w.rules.map((r,i)=><div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",fontSize:13,borderBottom:i<w.rules.length-1?"1px solid var(--border)":"none" }}><span style={{ fontSize:16,flexShrink:0 }}>{r.icon}</span><span>{r.text}</span></div>)}</div></div>
      {w.meals.map((meal,mi)=><div key={mi} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ fontWeight:700,fontSize:14 }}>{meal.time}</div><div style={{ fontSize:10,fontWeight:700,color:"var(--muted)",background:"var(--surface2)",padding:"3px 8px",borderRadius:5 }}>{meal.kcal}</div></div><div style={{ padding:"6px 18px 14px" }}>{meal.options.map((opt,oi)=><div key={oi} style={{ padding:"10px 0",borderBottom:oi<meal.options.length-1?"1px solid var(--border)":"none" }}><div style={{ fontSize:12,fontWeight:700,color:green,marginBottom:4,textTransform:"uppercase" }}>{opt.name}</div><div style={{ fontSize:13,lineHeight:1.55 }}>{opt.desc}</div>{opt.price&&<div style={{ fontSize:10,color:"#ffbb22",marginTop:3,fontWeight:600 }}>💰 {opt.price}</div>}</div>)}</div></div>)}
      {w.shopping&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,marginBottom:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(68,136,255,0.1)" }}>🛒</div><div style={{ fontWeight:700,fontSize:14 }}>Courses ({w.budget})</div></div><div style={{ padding:"14px 18px" }}><div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>{w.shopping.map((cat,ci)=><div key={ci} style={{ background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10,padding:12 }}><div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#4488ff",marginBottom:6 }}>{cat.cat}</div>{cat.items.map((item,ii)=><div key={ii} style={{ fontSize:11,color:"var(--muted)",padding:"2px 0" }}>{item}</div>)}</div>)}</div></div></div>}
      {w.tip&&<div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden" }}><div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)" }}><div style={{ width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:"rgba(34,204,102,0.1)" }}>💡</div><div style={{ fontWeight:700,fontSize:14 }}>{w.tip.title}</div></div><div style={{ padding:"14px 18px" }}><div style={{ background:"linear-gradient(135deg,rgba(34,204,102,0.06),rgba(34,204,102,0.02))",border:"1px solid rgba(34,204,102,0.18)",borderRadius:11,padding:14,fontSize:12,lineHeight:1.6,color:"var(--muted)" }}>{w.tip.text}</div></div></div>}
    </div>
  </div>;
}

// ── Main App ──────────────────────────────────────────────────────────
export default function AppV3() {
  const [tab, setTab] = useState("sport");
  const [dayIdx, setDayIdx] = useState(0);
  const [selEx, setSelEx] = useState(null);

  return <div style={{ "--bg":"#08080b","--surface":"#111116","--surface2":"#1a1a21","--border":"#26262e","--text":"#eaeaef","--muted":"#7c7c8a",background:"var(--bg)",color:"var(--text)",fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",maxWidth:480,margin:"0 auto" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    {selEx&&<ExerciseDetailModal ex={selEx} onClose={()=>setSelEx(null)}/>}

    <div style={{ position:"relative",padding:"44px 20px 24px",textAlign:"center",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"-50%",left:"50%",transform:"translateX(-50%)",width:500,height:500,background:"radial-gradient(circle,rgba(255,187,34,0.12) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ display:"inline-block",background:"#ffbb22",color:"#000",fontSize:10,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",padding:"5px 14px",borderRadius:20,marginBottom:12 }}>Programme V3 — Full Body</div>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,7vw,48px)",lineHeight:0.95,letterSpacing:2 }}>
        TOUT LE CORPS<br/><span style={{ color:"#ffbb22" }}>CHAQUE SÉANCE</span>
      </div>
      <div style={{ color:"var(--muted)",fontSize:12,maxWidth:400,margin:"8px auto 0",lineHeight:1.5 }}>4 variantes Full Body · 4 séances/semaine · V-shape + force</div>
      <div style={{ color:"var(--muted)",fontSize:10,marginTop:4 }}>Marcy HG3000 · Tapis (5,5 km/h max) · Step · Haltères 2,5 + 5 kg</div>
    </div>

    <div style={{ display:"flex",margin:"0 14px",background:"var(--surface)",borderRadius:12,padding:4,border:"1px solid var(--border)" }}>
      {[{key:"sport",icon:"🏋️",label:"Sport"},{key:"food",icon:"🥗",label:"Alimentation"}].map(t=><div key={t.key} onClick={()=>setTab(t.key)} style={{ flex:1,padding:"12px 8px",textAlign:"center",fontSize:13,fontWeight:700,color:tab===t.key?"#fff":"var(--muted)",background:tab===t.key?(t.key==="sport"?"#ff4422":"#22cc66"):"transparent",borderRadius:9,cursor:"pointer",transition:"all 0.25s",boxShadow:tab===t.key?(t.key==="sport"?"0 4px 16px rgba(255,68,34,0.3)":"0 4px 16px rgba(34,204,102,0.3)"):"none" }}>{t.icon} {t.label}</div>)}
    </div>

    {tab==="sport"&&<div>
      <div style={{ display:"flex",margin:"14px 14px 0",background:"var(--surface)",borderRadius:12,padding:4,border:"1px solid var(--border)",position:"sticky",top:8,zIndex:100,gap:2 }}>
        {DAYS.map((d,i)=><div key={i} onClick={()=>setDayIdx(i)} style={{ flex:1,padding:"8px 2px",textAlign:"center",fontSize:9,fontWeight:600,color:dayIdx===i?"#fff":d.active?"var(--text)":"var(--muted)",background:dayIdx===i?(d.active?"#ff4422":"#555"):"transparent",borderRadius:9,cursor:"pointer",transition:"all 0.25s",boxShadow:dayIdx===i&&d.active?"0 4px 12px rgba(255,68,34,0.3)":"none",opacity:dayIdx===i?1:d.active?0.8:0.5 }}>
          <div style={{ fontSize:14,lineHeight:1 }}>{d.emoji}</div>
          <div style={{ marginTop:2 }}>{d.label.slice(0,3)}</div>
        </div>)}
      </div>
      <div style={{ padding:"18px 14px 48px" }}><DayPanel day={DAYS[dayIdx]} onExClick={setSelEx}/></div>
    </div>}

    {tab==="food"&&<FoodTab/>}

    <div style={{ textAlign:"center",padding:"20px 14px 36px",color:"var(--muted)",fontSize:10 }}>Marcy HG3000 · Tapis · Step · Haltères 2,5 + 5 kg</div>
  </div>;
}