export type MerchItem = {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  image: string;
  tag: string;
  description: string;
  bullets: string[];
};

export const merchItems: MerchItem[] = [
  {
    id: "arctic-rig-frost",
    name: "Arctic Rig // Frost",
    price: "€3,199",
    subtitle: "AMD 7 7800X3D · 5080",
    image: "/koneen kotelo.png",
    tag: "Ready to ship",
    description:
      "Studiovalmis kokoonpano jäähdytyksellä, joka on rakennettu pitkille scrim-illoille.",
    bullets: [
      "Hiljainen ilmavirtaus, frost-säädetty BIOS",
      "Ready-to-stream, capture-kortti valmiina",
      "Cable management + valmiiksi asennetut fan curves",
    ],
  },
  {
    id: "ap-control-mat",
    name: "AP Control Mat",
    price: "€49",
    subtitle: "XL desk surface · stitched edges",
    image: "/hiirimatto.png",
    tag: "Ready to ship",
    description:
      "Laaja hiirimatto, jossa on frost-siniset reunat ja pehmeä liikepinta – suunniteltu pitkille analyysisessioille.",
    bullets: [
      "900 x 400 mm, liukumaton pohja",
      "Ompeleet, jotka eivät hankaa rannetta",
      "Matta pinta, ei heijastuksia studiovaloissa",
    ],
  },
  {
    id: "facility-jersey",
    name: "Facility Jersey",
    price: "€95",
    subtitle: "Support drop · fan edition",
    image: "/paitapanda.png",
    tag: "Core fanwear",
    description: "Lempeä fanipaita analyytikkopöydästä katsomoon.",
    bullets: [
      "Matta kangas, ei häikäisyä kamerassa",
      "Frost-siniset saumat",
      "Esipesty, ready-to-wear",
    ],
  },
  {
    id: "nordic-green-jersey",
    name: "Nordic Green Jersey",
    price: "€92",
    subtitle: "Limited alt · fan edition",
    image: "/vihreepaita.png",
    tag: "Limited",
    description: "Vihreä alt-paita kylmälle studiolle ja kisakatsomoihin.",
    bullets: [
      "Hengittävä kangas, mattapinta kameralle",
      "Frost-siniset tikit ja lievästi pidennetty helma",
      "Rajoitettu erä, numerointi sisäpuolella",
    ],
  },
];
