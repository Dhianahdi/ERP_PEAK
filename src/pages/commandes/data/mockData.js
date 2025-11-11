// Données mockées pour les produits PEAK - Catalogue étendu
export const produits = [
  {
    id: 1,
    nom: "Basket PEAK Taichi Flash 2.0",
    categorie: "Baskets Performance",
    prix: 149.99,
    stock: 45,
    fournisseurId: 1,
    description: "Basket de running haut de gamme avec technologie Taichi améliorée",
    details: {
      commentaire: "La Taichi Flash 2.0 repousse les limites de la performance avec sa semelle innovante à absorption des chocs. Conçue pour les runners exigeants, elle offre un confort optimal sur de longues distances. La tige en mesh technique assure une respirabilité exceptionnelle.",
      caracteristiques: ["Semelle Taichi 2.0", "Mesh technique respirant", "Amorti renforcé", "Poids: 280g"],
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir/Rouge", "Blanc/Bleu", "Gris/Orange"],
      tailles: ["38", "39", "40", "41", "42", "43", "44", "45"]
    }
  },
  {
    id: 2,
    nom: "PEAK Streetball Pro Urban",
    categorie: "Baskets Lifestyle",
    prix: 119.99,
    stock: 78,
    fournisseurId: 1,
    description: "Chaussure de basketball streetwear design édition limitée",
    details: {
      commentaire: "Inspirée par la culture urbaine, la Streetball Pro Urban allie style et performance. Son design audacieux et ses couleurs vibrantes en font la chaussure idéale pour dominer le playground. La semelle extérieure en caoutchouc durable offre une excellente adhérence sur tous les terrains.",
      caracteristiques: ["Cuir synthétique premium", "Semelle gomme durable", "Col rembourré", "Style rétro moderne"],
      images: [
        "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir/Or", "Blanc/Noir", "Bleu électrique"],
      tailles: ["39", "40", "41", "42", "43", "44"]
    }
  },
  {
    id: 3,
    nom: "PEAK Running Pro Carbon",
    categorie: "Running Compétition",
    prix: 189.99,
    stock: 35,
    fournisseurId: 1,
    description: "Chaussure de running professionnelle avec plaque carbone",
    details: {
      commentaire: "La Running Pro Carbon est l'arme ultime pour la compétition. Équipée d'une plaque carbone rigide, elle propulse le coureur vers l'avant avec un retour d'énergie optimal. Réservée aux athlètes confirmés cherchant à battre leurs records personnels.",
      caracteristiques: ["Plaque carbone complète", "Mesh aéro dynamique", "Semelle Speed Roll", "Poids: 240g"],
      images: [
        "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop"
      ],
      couleurs: ["Fluo Vert", "Noir/Carbone", "Blanc/Rose"],
      tailles: ["40", "41", "42", "43", "44", "45"]
    }
  },
  {
    id: 4,
    nom: "Survêtement PEAK Team Pro",
    categorie: "Vêtements Performance",
    prix: 129.99,
    stock: 60,
    fournisseurId: 2,
    description: "Survêtement technique complet équipe professionnelle",
    details: {
      commentaire: "Conçu pour les athlètes professionnels, le survêtement Team Pro offre une liberté de mouvement totale grâce à son tissu stretch technique. L'évacuation de l'humidité et la régulation thermique en font l'équipement idéal pour l'entraînement intensif.",
      caracteristiques: ["Tissu technique stretch", "Evacuation humidité", "Zip ventilation", "Poches zippées"],
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1584735264932-963b82da3bd6?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Bleu Marine", "Rouge", "Vert"],
      tailles: ["S", "M", "L", "XL", "XXL"]
    }
  },
  {
    id: 5,
    nom: "Maillot PEAK Basketball Elite",
    categorie: "Vêtements Sport",
    prix: 69.99,
    stock: 150,
    fournisseurId: 2,
    description: "Maillot de basketball officiel équipe nationale",
    details: {
      commentaire: "Porté par les plus grandes équipes internationales, le maillot Basketball Elite allie performance et style. Son tissu ultra-léger et respirant garde les joueurs au sec même pendant les matchs les plus intenses. Le design emblématique arbore fièrement les couleurs PEAK.",
      caracteristiques: ["Tissu Dri-FIT", "Coupe athlétique", "Logo brodé", "Légèreté optimale"],
      images: [
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop"
      ],
      couleurs: ["Rouge/Blanc", "Bleu/Blanc", "Noir/Or"],
      tailles: ["S", "M", "L", "XL", "XXL"]
    }
  },
  {
    id: 6,
    nom: "Short PEAK Training Flex",
    categorie: "Vêtements Entraînement",
    prix: 49.99,
    stock: 200,
    fournisseurId: 2,
    description: "Short d'entraînement flexible avec poches",
    details: {
      commentaire: "Le short Training Flex a été pensé pour les sessions d'entraînement les plus exigeantes. Sa matière extensible à 4 sens permet une amplitude de mouvement complète, tandis que ses poches sécurisées gardent vos essentiels en place pendant l'effort.",
      caracteristiques: ["Matière 4-way stretch", "Poches zippées", "Ceinture élastique", "Bandes réfléchissantes"],
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Gris anthracite", "Bleu royal", "Vert armée"],
      tailles: ["S", "M", "L", "XL"]
    }
  },
  {
    id: 7,
    nom: "PEAK Defender Pro Max",
    categorie: "Baskets Basketball",
    prix: 169.99,
    stock: 40,
    fournisseurId: 3,
    description: "Basket de défense basketball édition premium",
    details: {
      commentaire: "Spécialement conçue pour les joueurs défensifs, la Defender Pro Max offre un maintien latéral exceptionnel et une stabilité inégalée. Sa technologie d'amorti avancée absorbe les impacts lors des sauts et changements de direction brusques.",
      caracteristiques: ["Stabilité renforcée", "Amorti PEAK Cushion", "Tige support haute", "Semelle multidirectionnelle"],
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e6c447?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir/Blanc", "Rouge/Noir", "Blanc/Métal"],
      tailles: ["40", "41", "42", "43", "44", "45", "46"]
    }
  },
  {
    id: 8,
    nom: "PEAK Speed 10.0 Fly",
    categorie: "Running Compétition",
    prix: 149.99,
    stock: 25,
    fournisseurId: 3,
    description: "Chaussure de course compétition dernière génération",
    details: {
      commentaire: "La Speed 10.0 Fly représente l'aboutissement de notre recherche en matière de chaussures de compétition. Son design aérodynamique et son poids plume en font l'outil parfait pour les coureurs visant le podium. Chaque gramme a été optimisé pour la performance pure.",
      caracteristiques: ["Poids: 210g", "Tige monofilament", "Plaque nylon carbone", "Drop 8mm"],
      images: [
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
      ],
      couleurs: ["Orange Fluorescent", "Blanc/Néon", "Noir/Argent"],
      tailles: ["39", "40", "41", "42", "43", "44"]
    }
  },
  {
    id: 9,
    nom: "PEAK Court Vision Street",
    categorie: "Baskets Lifestyle",
    prix: 109.99,
    stock: 85,
    fournisseurId: 3,
    description: "Basket polyvalente style rétro moderne",
    details: {
      commentaire: "Mélange parfait entre héritage rétro et design contemporain, la Court Vision Street s'adapte à toutes les situations. Que ce soit pour un match de basketball occasionnel ou pour un style urbain affirmé, cette chaussure offre confort et style sans compromis.",
      caracteristiques: ["Style rétro moderne", "Semelle gomme crêpe", "Logo PEAK vintage", "Confort toute la journée"],
      images: [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop"
      ],
      couleurs: ["Blanc/Cassis", "Noir/Blanc", "Beige/Brun"],
      tailles: ["38", "39", "40", "41", "42", "43", "44"]
    }
  },
  {
    id: 10,
    nom: "Sac Sport PEAK Pro 45L",
    categorie: "Accessoires Sport",
    prix: 79.99,
    stock: 55,
    fournisseurId: 4,
    description: "Sac de sport professionnel multifonction 45L",
    details: {
      commentaire: "Le sac Pro 45L est le compagnon idéal des athlètes mobiles. Avec ses multiples compartiments spécialisés, il organise parfaitement équipements, chaussures et effets personnels. Sa construction robuste résiste aux conditions les plus extrêmes.",
      caracteristiques: ["Capacité 45L", "Compartiment chaussures", "Porte-USB intégré", "Matériau waterproof"],
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Bleu Navy", "Rouge", "Vert Kaki"]
    }
  },
  {
    id: 11,
    nom: "Chaussettes PEAK Performance 3-Pack",
    categorie: "Accessoires Sport",
    prix: 24.99,
    stock: 300,
    fournisseurId: 4,
    description: "Pack de 3 paires chaussettes techniques compression",
    details: {
      commentaire: "Nos chaussettes Performance offrent un maintien optimal grâce à leur technologie de compression graduée. Les zones renforcées au talon et à la pointe du pied assurent une durabilité exceptionnelle, tandis que les zones aérées gardent vos pieds au sec.",
      caracteristiques: ["Compression graduée", "Zones renforcées", "Technologie anti-odeurs", "3 paires assorties"],
      images: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1586351934193-6dabfbd8d066?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir/Blanc", "Blanc/Gris", "Noir/Rouge"],
      tailles: ["36-39", "40-43", "44-47"]
    }
  },
  {
    id: 12,
    nom: "Casquette PEAK Heritage",
    categorie: "Accessoires Lifestyle",
    prix: 34.99,
    stock: 120,
    fournisseurId: 4,
    description: "Casquette ajustable logo PEAK vintage",
    details: {
      commentaire: "La casquette Heritage rend hommage à l'histoire riche de PEAK avec un design rétro et des finitions premium. Le logo brodé et la visière courbée en font un accessoire intemporel qui complète parfaitement toute tenue sportive ou décontractée.",
      caracteristiques: ["Logo brodé vintage", "Visière courbée", "Ajusteur métal", "100% coton"],
      images: [
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Bleu Marine", "Vert Olive", "Bordeaux"]
    }
  },
  {
    id: 13,
    nom: "PEAK Triple Black Limited",
    categorie: "Baskets Édition Limitée",
    prix: 199.99,
    stock: 15,
    fournisseurId: 5,
    description: "Basket lifestyle édition limitée tout noir",
    details: {
      commentaire: "Édition ultra-exclusive, la Triple Black Limited incarne l'élégance discrète et le luxe sportif. Chaque paire est numérotée et livrée dans un écrin premium. Les matériaux sélectionnés - cuir nubuck, suède et mesh technique - créent une texture riche et sophistiquée.",
      caracteristiques: ["Édition numérotée", "Cuir nubuck premium", "Emballage luxe", "Quantité limitée"],
      images: [
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
      ],
      couleurs: ["Triple Black"],
      tailles: ["40", "41", "42", "43", "44"]
    }
  },
  {
    id: 14,
    nom: "PEAK Winter Jacket Pro",
    categorie: "Vêtements Outdoor",
    prix: 179.99,
    stock: 30,
    fournisseurId: 5,
    description: "Veste d'hiver technique haute performance",
    details: {
      commentaire: "Conçue pour affronter les conditions hivernales les plus rigoureuses, la Winter Jacket Pro combine isolation thermique avancée et respirabilité exceptionnelle. Sa membrane imperméable et coupe-vent protège des éléments tout en permettant une liberté de mouvement complète.",
      caracteristiques: ["Isolation 200g", "Membrane Windproof", "Capuche amovible", "Poches chauffe-mains"],
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Bleu Nuit", "Rouge Sang", "Vert Forêt"],
      tailles: ["S", "M", "L", "XL", "XXL"]
    }
  },
  {
    id: 15,
    nom: "Ballon PEAK Basketball Pro",
    categorie: "Équipement Sport",
    prix: 89.99,
    stock: 80,
    fournisseurId: 5,
    description: "Ballon de basketball officiel taille 7 compétition",
    details: {
      commentaire: "Le ballon Basketball Pro répond aux standards les plus exigeants des compétitions internationales. Sa surface en cuir composite offre une prise en main optimale et une durabilité exceptionnelle. Chaque ballon est testé pour assurer un rebond parfait et une trajectoire stable.",
      caracteristiques: ["Taille 7 officielle", "Cuir composite", "Rebond régulier", "Certifié FIBA"],
      images: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&h=500&fit=crop"
      ],
      couleurs: ["Orange Classique", "Noir/Or", "Bleu/Blanc"]
    }
  },
  {
    id: 16,
    nom: "PEAK Trail Master GTX",
    categorie: "Outdoor",
    prix: 219.99,
    stock: 25,
    fournisseurId: 1,
    description: "Chaussure randonnée technique Gore-Tex",
    details: {
      commentaire: "La Trail Master GTX est la chaussure de randonnée ultime pour les aventuriers. Équipée d'une membrane Gore-Tex, elle garde vos pieds au sec dans toutes les conditions. Sa semelle Vibram offre une adhérence exceptionnelle sur tous types de terrains.",
      caracteristiques: ["Membrane Gore-Tex", "Semelle Vibram", "Protection renforcée", "Poids: 420g"],
      images: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop"
      ],
      couleurs: ["Vert Sauge", "Gris/Bleu", "Terre Brûlée"],
      tailles: ["40", "41", "42", "43", "44", "45", "46"]
    }
  },
  {
    id: 17,
    nom: "Sac PEAK Gym Duffel 60L",
    categorie: "Accessoires Sport",
    prix: 99.99,
    stock: 45,
    fournisseurId: 4,
    description: "Sac de sport grande capacité format duffel",
    details: {
      commentaire: "Le Gym Duffel 60L offre un espace de stockage généreux pour tous vos équipements de sport. Son design pratique avec multiples poches et son compartiment séparé pour les chaussures sales en font le sac idéal pour les sportifs complets.",
      caracteristiques: ["Capacité 60L", "Compartiment chaussures sale", "Sangles réglables", "Matériau TPU durable"],
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir Carbone", "Rouge Racing", "Bleu Océan"]
    }
  },
  {
    id: 18,
    nom: "Gants PEAK Training Pro",
    categorie: "Accessoires Fitness",
    prix: 39.99,
    stock: 90,
    fournisseurId: 4,
    description: "Gants d'entraînement renforcés protection complète",
    details: {
      commentaire: "Les gants Training Pro protègent vos mains lors des séances de musculation intensives. Les paumes en cuir renforcé évitent les ampoules, tandis que le design ergonomique assure un maintien parfait des poignets pour soulever des charges lourdes en toute sécurité.",
      caracteristiques: ["Paumes cuir renforcé", "Support poignet", "Doigts ouverts", "Boucle Velcro ajustable"],
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1584735264932-963b82da3bd6?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Rouge/Noir", "Bleu/Noir"],
      tailles: ["S", "M", "L", "XL"]
    }
  },
  {
    id: 19,
    nom: "PEAK Running Shorts 2-in-1",
    categorie: "Vêtements Running",
    prix: 59.99,
    stock: 110,
    fournisseurId: 2,
    description: "Short de running 2-en-1 avec compression",
    details: {
      commentaire: "Le short 2-in-1 combine le confort d'un short classique avec le soutien d'un caleçon de compression. Idéal pour les longues distances, il réduit la fatigue musculaire et améliore la récupération. Les poches latérales zippées sécurisent vos clés et gels énergétiques.",
      caracteristiques: ["Caleçon compression intégré", "Poches zippées", "Tissu léger rapide", "Reflecteurs sécurité"],
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop"
      ],
      couleurs: ["Noir", "Bleu électrique", "Vert fluo", "Gris anthracite"],
      tailles: ["S", "M", "L", "XL"]
    }
  },
  {
    id: 20,
    nom: "PEAK Lifestyle Hoodie",
    categorie: "Vêtements Lifestyle",
    prix: 89.99,
    stock: 75,
    fournisseurId: 2,
    description: "Sweat à capuche lifestyle coupe oversized",
    details: {
      commentaire: "Le Lifestyle Hoodie allie confort ultime et style streetwear avec sa coupe oversized tendance. Fabriqué en coton biologique doux au toucher, il devient rapidement l'élément essentiel de votre garde-robe décontractée. Le logo PEAK brodé discrètement ajoute une touche d'authenticité.",
      caracteristiques: ["Coton biologique", "Coupe oversized", "Poche kangourou", "Logo brodé discret"],
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=500&h=500&fit=crop"
      ],
      couleurs: ["Gris Heather", "Noir", "Bleu Lavande", "Vert Sage"],
      tailles: ["S", "M", "L", "XL", "XXL"]
    }
  }
];

// Données mockées pour les fournisseurs PEAK
export const fournisseurs = [
  {
    id: 1,
    nom: "PEAK Usine Principale Chine",
    contact: "production@peak-sport.com",
    telephone: "+86 21 1234 5678",
    adresse: "123 Sport Avenue, Shanghai, Chine",
    delaiLivraison: "15-20 jours",
    note: 4.8,
    typeProduits: ["Baskets Performance", "Running Compétition", "Outdoor"]
  },
  {
    id: 2,
    nom: "PEAK Textile Division",
    contact: "textile@peak-sport.com",
    telephone: "+86 21 2345 6789",
    adresse: "456 Fabric Street, Guangzhou, Chine",
    delaiLivraison: "10-15 jours",
    note: 4.6,
    typeProduits: ["Vêtements Performance", "Vêtements Sport", "Vêtements Entraînement", "Vêtements Running", "Vêtements Lifestyle"]
  },
  {
    id: 3,
    nom: "PEAK Footwear Europe",
    contact: "europe@peak-shoes.com",
    telephone: "+33 1 23 45 67 89",
    adresse: "78 Chaussée Sport, Paris, France",
    delaiLivraison: "3-5 jours",
    note: 4.9,
    typeProduits: ["Baskets Basketball", "Baskets Lifestyle", "Running Compétition"]
  },
  {
    id: 4,
    nom: "PEAK Accessories Hub",
    contact: "accessories@peak-gear.com",
    telephone: "+33 1 34 56 78 90",
    adresse: "90 Accessory Road, Lyon, France",
    delaiLivraison: "2-4 jours",
    note: 4.7,
    typeProduits: ["Accessoires Sport", "Accessoires Lifestyle", "Accessoires Fitness"]
  },
  {
    id: 5,
    nom: "PEAK Limited Editions",
    contact: "limited@peak-collection.com",
    telephone: "+33 1 45 67 89 01",
    adresse: "12 Exclusive Avenue, Marseille, France",
    delaiLivraison: "7-10 jours",
    note: 4.5,
    typeProduits: ["Baskets Édition Limitée", "Vêtements Outdoor", "Équipement Sport"]
  }
];

// Fonction pour générer un numéro de commande unique
const genererNumeroCommande = () => {
  const prefixe = 'PEAK';
  const annee = new Date().getFullYear();
  const numero = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefixe}${annee}${numero}`;
};

// Fonction pour générer une date aléatoire dans les 60 derniers jours
const genererDateAleatoire = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 60));
  return date.toISOString().split('T')[0];
};

// Types de cartons disponibles
const typesCartons = [
  { type: "Petit", capacite: 10, dimensions: "30x20x15cm" },
  { type: "Moyen", capacite: 25, dimensions: "40x30x25cm" },
  { type: "Grand", capacite: 50, dimensions: "60x40x30cm" },
  { type: "Palette", capacite: 200, dimensions: "120x80x150cm" }
];

// Fonction pour générer des cartons aléatoires pour une commande
const genererCartons = (produits) => {
  const cartons = [];
  let produitsRestants = [...produits];
  
  while (produitsRestants.length > 0) {
    const typeCarton = typesCartons[Math.floor(Math.random() * typesCartons.length)];
    const produitsDansCarton = [];
    let capaciteUtilisee = 0;
    
    for (let i = 0; i < produitsRestants.length && capaciteUtilisee < typeCarton.capacite; i++) {
      const produit = produitsRestants[i];
      const quantiteDansCarton = Math.min(
        produit.quantite,
        typeCarton.capacite - capaciteUtilisee
      );
      
      if (quantiteDansCarton > 0) {
        produitsDansCarton.push({
          id: produit.id,
          nom: produit.nom,
          quantite: quantiteDansCarton
        });
        
        produit.quantite -= quantiteDansCarton;
        capaciteUtilisee += quantiteDansCarton;
      }
    }
    
    if (produitsDansCarton.length > 0) {
      cartons.push({
        type: typeCarton.type,
        dimensions: typeCarton.dimensions,
        capacite: typeCarton.capacite,
        produits: produitsDansCarton,
        quantiteTotale: produitsDansCarton.reduce((sum, p) => sum + p.quantite, 0)
      });
    }
    
    // Retirer les produits complètement emballés
    produitsRestants = produitsRestants.filter(p => p.quantite > 0);
  }
  
  return cartons;
};

// Données mockées pour les commandes PEAK avec cartons
export const commandes = [
  {
    id: 1,
    numero: genererNumeroCommande(),
    fournisseurId: 1,
    fournisseurNom: "PEAK Usine Principale Chine",
    fournisseurContact: "production@peak-sport.com",
    dateCommande: genererDateAleatoire(),
    statut: "confirme",
    produits: [
      { id: 1, nom: "Basket PEAK Taichi Flash 2.0", quantite: 50, prixUnitaire: 149.99, prixTotal: 7499.50 },
      { id: 3, nom: "PEAK Running Pro Carbon", quantite: 30, prixUnitaire: 189.99, prixTotal: 5699.70 },
      { id: 16, nom: "PEAK Trail Master GTX", quantite: 20, prixUnitaire: 219.99, prixTotal: 4399.80 }
    ],
    cartons: [],
    sousTotal: 17599.00,
    tva: 3519.80,
    fraisPort: 0,
    montantTotal: 21118.80,
    notes: "Commande stock saison printemps-été 2024. Livraison urgente pour lancement campagne marketing. Vérifier l'étiquetage en français."
  },
  {
    id: 2,
    numero: genererNumeroCommande(),
    fournisseurId: 2,
    fournisseurNom: "PEAK Textile Division",
    fournisseurContact: "textile@peak-sport.com",
    dateCommande: genererDateAleatoire(),
    statut: "livre",
    produits: [
      { id: 4, nom: "Survêtement PEAK Team Pro", quantite: 80, prixUnitaire: 129.99, prixTotal: 10399.20 },
      { id: 5, nom: "Maillot PEAK Basketball Elite", quantite: 150, prixUnitaire: 69.99, prixTotal: 10498.50 },
      { id: 6, nom: "Short PEAK Training Flex", quantite: 120, prixUnitaire: 49.99, prixTotal: 5998.80 },
      { id: 19, nom: "PEAK Running Shorts 2-in-1", quantite: 90, prixUnitaire: 59.99, prixTotal: 5399.10 },
      { id: 20, nom: "PEAK Lifestyle Hoodie", quantite: 60, prixUnitaire: 89.99, prixTotal: 5399.40 }
    ],
    cartons: [],
    sousTotal: 37695.00,
    tva: 7539.00,
    fraisPort: 350,
    montantTotal: 45584.00,
    notes: "Collection vêtements équipe nationale. Contrôle qualité strict requis. Vérifier les tailles selon le plan de distribution."
  },
  // ... (les autres commandes restent similaires avec l'ajout de cartons)
];

// Générer les cartons pour chaque commande
commandes.forEach(commande => {
  commande.cartons = genererCartons(commande.produits.map(p => ({ ...p })));
});

// Catégories étendues pour le catalogue
export const categories = [
  "Baskets Performance",
  "Baskets Lifestyle", 
  "Baskets Basketball",
  "Baskets Édition Limitée",
  "Running Compétition",
  "Outdoor",
  "Vêtements Performance",
  "Vêtements Sport",
  "Vêtements Entraînement", 
  "Vêtements Running",
  "Vêtements Lifestyle",
  "Vêtements Outdoor",
  "Accessoires Sport",
  "Accessoires Lifestyle",
  "Accessoires Fitness",
  "Équipement Sport"
];