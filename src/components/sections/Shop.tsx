"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { merchItems } from "../../data/merch";
import { contactConfig } from "../../lib/config";
import styles from "./Shop.module.css";
import { colors, layout, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

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
                key={item.id}
                className={styles.card}
                type="button"
                onClick={() => setSelectedName(item.name)}
                aria-pressed={selectedName === item.name}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
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
            href={contactConfig.emailHref}
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
