import { useMemo, useState } from "react";
import Button from "../components/Button";
import styles from "./Shop.module.css";
import { colors, layout, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

type MerchItem = {
  name: string;
  price: string;
  subtitle: string;
  image: string;
  tag: string;
  description: string;
  bullets: string[];
};

const merchItems: MerchItem[] = [
  {
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

const Shop = () => {
  const [selectedName, setSelectedName] = useState<string>(merchItems[0].name);

  const selected = useMemo(
    () =>
      merchItems.find((item) => item.name === selectedName) ?? merchItems[0],
    [selectedName],
  );

  const sectionStyle: CSSVarStyles = {
    "--layout-maxWidth": layout.maxWidth,
    "--layout-sectionPadding": "110px 24px 88px",
    "--muted": withAlpha(colors.frostGrey, 0.72),
    "--card-border": withAlpha(colors.frostGrey, 0.16),
    "--card-bg": withAlpha(colors.foreground, 0.02),
  };

  return (
    <section className={styles.shop} style={sectionStyle}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.grid}>
            {merchItems.map((item) => (
              <button
                key={item.name}
                className={styles.card}
                type="button"
                onClick={() => setSelectedName(item.name)}
                aria-pressed={selectedName === item.name}
              >
                <div className={styles.imageWrap}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.detail}>
          <h1 className={styles.detailTitle}>{selected.name}</h1>
          <p className={styles.detailPrice}>{selected.price}</p>
          <p className={styles.detailSubtitle}>{selected.subtitle}</p>
          <Button
            variant="primary"
            href="mailto:contact@arcticpandas.gg"
            block
            className={styles.cta}
          >
            Add to Cart
          </Button>
          <div className={styles.detailCopy}>
            <p>{selected.description}</p>
            <ul>
              {selected.bullets.map((bullet) => (
                <li key={`${selected.name}-${bullet}`}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
