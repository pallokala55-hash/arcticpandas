"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contactConfig } from "../../../lib/config";

// Verified roster data from online research (esportsearnings, liquipedia)
const rosterData = [
  { name: "Nille", role: "Top", image: "/nille.webp", note: "200+ pro matches · Nordic Champion" },
  { name: "Dibu", role: "Jungle", image: "/dipu.webp", note: "ERL veteran · LowLandLions, Sector One" },
  { name: "Simpli", role: "Mid", image: "/simpli.webp", note: "Prime League 2nd · UoL Sexy Edition" },
  { name: "Kehvo", role: "ADC", image: "/Kehvo.webp", note: "ENCE, Verdant, Riddle alumni" },
  { name: "Boltox", role: "Support", image: "/boltox.webp", note: "Estonia · BlueWhites, NLC 2nd Div" },
];

type Lang = "en" | "fi";

// Verified sources for inline citations
const sources = {
  paypalReport: "https://newsroom.uk.paypal-corp.com/PayPal-Report-on-Esports-in-Europe-2020",
  esportsChartsNLC: "https://escharts.com/tournaments/lol/nlc-winter-2025",
  esportsEarningsFI: "https://www.esportsearnings.com/countries/fi",
  pelaajabarometri: "https://trepo.tuni.fi/handle/10024/162303",
  seulOlympic: "https://seul.fi/liitto-on-hyvaksytty-suomen-olympiakomitean-jaseneksi/",
  esportsChartsSpring: "https://escharts.com/tournaments/lol/nlc-2025-spring",
  esportsChartsSummer: "https://escharts.com/tournaments/lol/nlc-summer-2025",
  liquipediaAP: "https://liquipedia.net/leagueoflegends/Arctic_Pandas",
  liquipediaHiiva: "https://liquipedia.net/leagueoflegends/Hiiva",
  twitchXpetu: "https://www.twitch.tv/xpetu",
};

const content = {
  en: {
    // Cover
    coverTagline1: "Finland's next esports story.",
    coverTagline2: "Partner with us.",
    // Opportunity
    opportunityEyebrow: "The Opportunity",
    opportunityTitle1: "Finnish esports is",
    opportunityTitle2: "ready to break out.",
    stat1Label: "of Finnish 18-20 year olds engaged in esports",
    stat1Compare: "vs 21% in UK",
    stat2Label: "NLC viewership growth in 2025",
    stat2Compare: "Peak: 360,545 viewers",
    stat3Label: "prize money earned by Finnish players",
    stat3Compare: "2,215 players · 4,588 tournaments",
    pullQuote1: "Major brands are entering Nordic esports.",
    pullQuote2: "The window is open.",
    // Team
    teamEyebrow: "The Team",
    teamTitle1: "Built by experts.",
    teamTitle2: "Ready to compete.",
    headCoach: "Head Coach",
    contentCreator: "Content & Co-Streamer",
    twitchFollowers: "Twitch Followers",
    youtubeViews: "YouTube Views",
    creatorNote: "Built-in audience from day one.",
    rosterTitle: "The Roster",
    rosterSubtitle: "ERL veterans · 4 Finnish + 1 Estonian",
    rosterRecord: "Season started. Trajectory set.",
    // Hiiva credits
    credit1: "Assistant Coach 2022-2024",
    credit2: "LEC Finals 2024 — 2nd Place",
    credit3: "LFL Championship Winner",
    credit4: "Former Professional Player",
    // Brand
    brandEyebrow: "The Brand",
    brandTitle1: "Nordic by nature.",
    brandTitle2: "Professional by design.",
    brandValue1Title: "Camera-Ready Players",
    brandValue1Desc: "Professional presentation, interview-trained, sponsor-friendly content",
    brandValue2Title: "Consistent Aesthetic",
    brandValue2Desc: "Unified brand across stream, social, and all partner activations",
    brandValue3Title: "Content Engine",
    brandValue3Desc: "Daily streams, match coverage, behind-the-scenes, player content",
    // Market
    marketEyebrow: "The Market",
    marketTitle1: "NLC is exploding.",
    marketTitle2: "The numbers prove it.",
    peakViewership: "Peak Viewership 2025",
    concurrentViewers: "concurrent viewers",
    upFrom: "Up from 2,080 in 2024",
    mediaValue: "Media Value 2025",
    combinedSplits: "combined across splits",
    mediaSplits: "Winter: $3M · Spring: $2.2M · Summer: $1M",
    lecPathway: "LEC Pathway",
    directRoute: "Direct",
    routeToTier1: "route to Tier 1",
    losRatones: "Los Ratones now in LEC Versus 2026",
    audienceProfile: "Finnish Audience Profile",
    coreDemographic: "Core demographic",
    finnsPlayGames: "of Finns play digital games",
    olympicRecognition: "Olympic Committee member (SEUL)",
    // Partnership
    partnerEyebrow: "Partnership Opportunities",
    partnerTitle1: "Multiple ways to",
    partnerTitle2: "join the journey.",
    jerseyTitle: "Jersey & Apparel",
    jerseyDesc: "Logo placement, co-branded merchandise, player gear",
    streamTitle: "Stream & Content",
    streamDesc: "Overlay branding, sponsored segments, xPetu collaborations",
    nutritionTitle: "Nutrition & Energy",
    nutritionDesc: "Team fuel partner, product placement, athlete endorsement",
    techTitle: "Tech & Peripherals",
    techDesc: "Equipment partner, setup features, gear reviews",
    telecomTitle: "Telecom",
    telecomDesc: "Connectivity partner, streaming infrastructure, digital activations",
    gamingTitle: "Gaming & Entertainment",
    gamingDesc: "Platform partnerships, gaming lifestyle integrations",
    partnerNote1: "Flexible structures. Custom activations.",
    partnerNote2: "Let's build something together.",
    // Sources
    sourcesEyebrow: "Sources",
    sourcesTitle1: "Data you can",
    sourcesTitle2: "verify.",
    marketData: "Market & Audience Data",
    nlcViewership: "NLC Viewership & Media Value",
    teamInfo: "Team & Player Information",
    // Contact
    contactCta: "Let's talk.",
  },
  fi: {
    // Cover
    coverTagline1: "Suomen seuraava esports-tarina.",
    coverTagline2: "Ryhdy kumppaniksi.",
    // Opportunity
    opportunityEyebrow: "Mahdollisuus",
    opportunityTitle1: "Suomalainen esports on",
    opportunityTitle2: "valmis läpimurtoon.",
    stat1Label: "suomalaisista 18-20-vuotiaista seuraa esportsia",
    stat1Compare: "vs. 21% Isossa-Britanniassa",
    stat2Label: "NLC:n katsojalukujen kasvu 2025",
    stat2Compare: "Huippu: 360 545 katsojaa",
    stat3Label: "palkintorahaa suomalaisten pelaajien voittamana",
    stat3Compare: "2 215 pelaajaa · 4 588 turnausta",
    pullQuote1: "Suuret brändit tulevat pohjoismaiseen esportsiin.",
    pullQuote2: "Ikkuna on auki.",
    // Team
    teamEyebrow: "Tiimi",
    teamTitle1: "Asiantuntijoiden rakentama.",
    teamTitle2: "Valmis kilpailemaan.",
    headCoach: "Päävalmentaja",
    contentCreator: "Sisältö & Striimaus",
    twitchFollowers: "Twitch-seuraajaa",
    youtubeViews: "YouTube-katselukertaa",
    creatorNote: "Valmis yleisö alusta asti.",
    rosterTitle: "Pelaajat",
    rosterSubtitle: "ERL-veteraaneja · 4 suomalaista + 1 virolainen",
    rosterRecord: "Kausi alkanut. Suunta selvä.",
    // Hiiva credits
    credit1: "Apuvalmentaja 2022-2024",
    credit2: "LEC-finaali 2024 — 2. sija",
    credit3: "LFL-mestari",
    credit4: "Entinen ammattilaispelaaja",
    // Brand
    brandEyebrow: "Brändi",
    brandTitle1: "Pohjoismainen luonnostaan.",
    brandTitle2: "Ammattimainen suunnittelultaan.",
    brandValue1Title: "Kameravalmis tiimi",
    brandValue1Desc: "Ammattimainen olemus, haastattelukoulutus, sponsoriystävällinen sisältö",
    brandValue2Title: "Yhtenäinen ilme",
    brandValue2Desc: "Sama brändi striimeissä, somessa ja kaikissa kumppaniaktivoinneissa",
    brandValue3Title: "Sisältökone",
    brandValue3Desc: "Päivittäiset striimit, otteluanalyysit, kulissien takaa, pelaajaprofilit",
    // Market
    marketEyebrow: "Markkinat",
    marketTitle1: "NLC räjähtää.",
    marketTitle2: "Luvut todistavat sen.",
    peakViewership: "Huippukatsojaluku 2025",
    concurrentViewers: "samanaikaista katsojaa",
    upFrom: "Nousu vuoden 2024 luvusta 2 080",
    mediaValue: "Media-arvo 2025",
    combinedSplits: "yhteensä kausilta",
    mediaSplits: "Talvi: $3M · Kevät: $2.2M · Kesä: $1M",
    lecPathway: "Reitti LEC:iin",
    directRoute: "Suora",
    routeToTier1: "yhteys huipulle",
    losRatones: "Los Ratones nyt LEC Versus 2026 -turnauksessa",
    audienceProfile: "Suomalainen yleisöprofiili",
    coreDemographic: "Ydinkohderyhmä",
    finnsPlayGames: "suomalaisista pelaa digitaalisia pelejä",
    olympicRecognition: "Olympiakomitean jäsen (SEUL)",
    // Partnership
    partnerEyebrow: "Kumppanuusmahdollisuudet",
    partnerTitle1: "Monta tapaa",
    partnerTitle2: "liittyä matkalle.",
    jerseyTitle: "Pelipaita & Vaatteet",
    jerseyDesc: "Logonäkyvyys, yhteisbrändätyt tuotteet, pelaajien varusteet",
    streamTitle: "Striimit & Sisältö",
    streamDesc: "Overlay-brändäys, sponsoroidut segmentit, xPetu-yhteistyöt",
    nutritionTitle: "Ravitsemus & Energia",
    nutritionDesc: "Tiimin energiakumppani, tuotesijoittelu, urheilijaedustus",
    techTitle: "Teknologia & Oheislaitteet",
    techDesc: "Laitepartneruus, setup-esittelyt, laitearvostelut",
    telecomTitle: "Televiestintä",
    telecomDesc: "Yhteyspartneri, striimausinfrastruktuuri, digitaaliset aktivoinnit",
    gamingTitle: "Pelaaminen & Viihde",
    gamingDesc: "Alustakumppanuudet, pelaajaelämäntapa-integraatiot",
    partnerNote1: "Joustavat rakenteet. Räätälöidyt aktivoinnit.",
    partnerNote2: "Rakennetaan jotain yhdessä.",
    // Sources
    sourcesEyebrow: "Lähteet",
    sourcesTitle1: "Dataa, jonka voit",
    sourcesTitle2: "vahvistaa.",
    marketData: "Markkina- ja yleisödata",
    nlcViewership: "NLC:n katsojaluvut ja media-arvo",
    teamInfo: "Tiimi- ja pelaajainfo",
    // Contact
    contactCta: "Ollaan yhteydessä.",
  },
};

import styles from "./Deck.module.css";

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, suffix: string = "") {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && ref.current) {
            hasAnimated.current = true;
            const start = 0;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(start + (end - start) * eased);

              if (ref.current) {
                ref.current.textContent = current.toLocaleString() + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, suffix]);

  return ref;
}

export default function DeckPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  const stat1Ref = useCountUp(52, 1500, "%");
  const stat2Ref = useCountUp(8400, 2000, "%");
  const stat3Ref = useCountUp(34, 1500, "M+");
  const viewerRef = useCountUp(360545, 2500, "");
  const youtubeRef = useCountUp(102, 1800, "M");
  const twitchRef = useCountUp(100, 1500, "K+");

  return (
    <div className={styles.deck}>
      {/* Cover */}
      <section className={styles.cover}>
        <div className={styles.coverBg} aria-hidden="true" />
        <div className={styles.langToggle}>
          <button
            onClick={() => setLang("en")}
            className={lang === "en" ? styles.langActive : undefined}
          >
            English
          </button>
          <button
            onClick={() => setLang("fi")}
            className={lang === "fi" ? styles.langActive : undefined}
          >
            Suomi
          </button>
        </div>
        <div className={styles.coverContent}>
          <Image
            src="/logo.svg"
            alt="Arctic Pandas"
            width={120}
            height={120}
            className={styles.coverLogo}
          />
          <h1 className={styles.coverTitle}>Arctic Pandas</h1>
          <p className={styles.coverTagline}>
            {t.coverTagline1}<br />
            <span className={styles.accent}>{t.coverTagline2}</span>
          </p>
        </div>
        <div className={styles.scrollHint} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* The Opportunity */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{t.opportunityEyebrow}</p>
          <h2 className={styles.sectionTitle}>
            {t.opportunityTitle1}<br />
            <span className={styles.accent}>{t.opportunityTitle2}</span>
          </h2>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber} ref={stat1Ref}>0%</span>
              <span className={styles.statLabel}>
                {t.stat1Label}
                <a href={sources.paypalReport} target="_blank" rel="noreferrer" className={styles.cite} title="PayPal Esports Report 2020">¹</a>
              </span>
              <span className={styles.statCompare}>{t.stat1Compare}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber} ref={stat2Ref}>0%</span>
              <span className={styles.statLabel}>
                {t.stat2Label}
                <a href={sources.esportsChartsNLC} target="_blank" rel="noreferrer" className={styles.cite} title="Esports Charts">²</a>
              </span>
              <span className={styles.statCompare}>{t.stat2Compare}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>$<span ref={stat3Ref}>0M+</span></span>
              <span className={styles.statLabel}>
                {t.stat3Label}
                <a href={sources.esportsEarningsFI} target="_blank" rel="noreferrer" className={styles.cite} title="Esports Earnings">³</a>
              </span>
              <span className={styles.statCompare}>{t.stat3Compare}</span>
            </div>
          </div>
          <p className={styles.pullQuote}>
            {t.pullQuote1}<br />
            <span className={styles.accent}>{t.pullQuote2}</span>
          </p>
        </div>
      </section>

      {/* The Team */}
      <section className={styles.section + " " + styles.sectionDark}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{t.teamEyebrow}</p>
          <h2 className={styles.sectionTitle}>
            {t.teamTitle1}<br />
            <span className={styles.accent}>{t.teamTitle2}</span>
          </h2>

          {/* Hiiva */}
          <div className={styles.leaderCard}>
            <div className={styles.leaderImage}>
              <video
                src="/Hiivapromo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className={styles.leaderVideo}
              />
            </div>
            <div className={styles.leaderInfo}>
              <p className={styles.leaderRole}>{t.headCoach}</p>
              <h3 className={styles.leaderName}>Hiiva</h3>
              <p className={styles.leaderRealName}>Aleksi Kaikkonen</p>
              <ul className={styles.leaderCredits}>
                <li><span className={styles.creditOrg}>Fnatic</span> {t.credit1}</li>
                <li>{t.credit2}</li>
                <li><span className={styles.creditOrg}>Misfits</span> {t.credit3}</li>
                <li>{t.credit4}</li>
              </ul>
            </div>
          </div>

          {/* xPetu */}
          <div className={styles.creatorCard}>
            <div className={styles.creatorInfo}>
              <p className={styles.leaderRole}>{t.contentCreator}</p>
              <h3 className={styles.leaderName}>xPetu</h3>
              <p className={styles.leaderRealName}>Challenger Shen · M.Sc. Mathematics</p>
              <div className={styles.creatorStats}>
                <div className={styles.creatorStat}>
                  <span className={styles.creatorNumber} ref={twitchRef}>0K+</span>
                  <span className={styles.creatorLabel}>{t.twitchFollowers}<a href={sources.twitchXpetu} target="_blank" rel="noreferrer" className={styles.cite} title="Twitch - xPetu">⁷</a></span>
                </div>
                <div className={styles.creatorStat}>
                  <span className={styles.creatorNumber} ref={youtubeRef}>0M</span>
                  <span className={styles.creatorLabel}>{t.youtubeViews}<a href={sources.twitchXpetu} target="_blank" rel="noreferrer" className={styles.cite} title="xPetu content stats">⁷</a></span>
                </div>
              </div>
              <p className={styles.creatorNote}>{t.creatorNote}</p>
            </div>
          </div>

          {/* Roster */}
          <div className={styles.rosterSection}>
            <h4 className={styles.rosterTitle}>{t.rosterTitle}</h4>
            <p className={styles.rosterSubtitle}>{t.rosterSubtitle}</p>
            <div className={styles.rosterGrid}>
              {rosterData.map((player) => (
                <div key={player.name} className={styles.playerCard}>
                  <div className={styles.playerImageWrap}>
                    <Image
                      src={player.image}
                      alt={player.name}
                      width={80}
                      height={80}
                      className={styles.playerImage}
                    />
                  </div>
                  <div className={styles.playerInfo}>
                    <span className={styles.playerRole}>{player.role}</span>
                    <span className={styles.playerName}>{player.name}</span>
                    <span className={styles.playerPeak}>{player.note}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.rosterRecord}>
              <span className={styles.accent}>1-0</span> · {t.rosterRecord}
            </p>
          </div>
        </div>
      </section>

      {/* The Brand */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{t.brandEyebrow}</p>
          <h2 className={styles.sectionTitle}>
            {t.brandTitle1}<br />
            <span className={styles.accent}>{t.brandTitle2}</span>
          </h2>
          <div className={styles.brandValues}>
            <div className={styles.brandValue}>
              <div className={styles.brandIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4>{t.brandValue1Title}</h4>
              <p>{t.brandValue1Desc}</p>
            </div>
            <div className={styles.brandValue}>
              <div className={styles.brandIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h4>{t.brandValue2Title}</h4>
              <p>{t.brandValue2Desc}</p>
            </div>
            <div className={styles.brandValue}>
              <div className={styles.brandIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4>{t.brandValue3Title}</h4>
              <p>{t.brandValue3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Market */}
      <section className={styles.section + " " + styles.sectionDark}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{t.marketEyebrow}</p>
          <h2 className={styles.sectionTitle}>
            {t.marketTitle1}<br />
            <span className={styles.accent}>{t.marketTitle2}</span>
          </h2>

          <div className={styles.marketGrid}>
            <div className={styles.marketCard}>
              <h4>{t.peakViewership}<a href={sources.esportsChartsNLC} target="_blank" rel="noreferrer" className={styles.cite} title="Esports Charts - NLC Winter 2025">²</a></h4>
              <span className={styles.marketNumber} ref={viewerRef}>0</span>
              <p>{t.concurrentViewers}</p>
              <div className={styles.marketBar}>
                <div className={styles.marketBarFill} style={{ width: "100%" }} />
              </div>
              <span className={styles.marketNote}>{t.upFrom}</span>
            </div>
            <div className={styles.marketCard}>
              <h4>{t.mediaValue}<a href={sources.esportsChartsNLC} target="_blank" rel="noreferrer" className={styles.cite} title="Esports Charts - NLC 2025">²</a></h4>
              <span className={styles.marketNumber}>$6.1M</span>
              <p>{t.combinedSplits}</p>
              <div className={styles.marketBar}>
                <div className={styles.marketBarFill} style={{ width: "75%" }} />
              </div>
              <span className={styles.marketNote}>{t.mediaSplits}</span>
            </div>
            <div className={styles.marketCard}>
              <h4>{t.lecPathway}</h4>
              <span className={styles.marketNumber}>{t.directRoute}</span>
              <p>{t.routeToTier1}</p>
              <div className={styles.marketBar}>
                <div className={styles.marketBarFill} style={{ width: "60%" }} />
              </div>
              <span className={styles.marketNote}>{t.losRatones}</span>
            </div>
          </div>

          <div className={styles.audienceBlock}>
            <h4>{t.audienceProfile}</h4>
            <div className={styles.audienceStats}>
              <div className={styles.audienceStat}>
                <span>18-35</span>
                <p>{t.coreDemographic}</p>
              </div>
              <div className={styles.audienceStat}>
                <span>64%</span>
                <p>
                  {t.finnsPlayGames}
                  <a href={sources.pelaajabarometri} target="_blank" rel="noreferrer" className={styles.cite} title="Pelaajabarometri 2024 - Tampere University">⁵</a>
                </p>
              </div>
              <div className={styles.audienceStat}>
                <span>✓</span>
                <p>
                  {t.olympicRecognition}
                  <a href={sources.seulOlympic} target="_blank" rel="noreferrer" className={styles.cite} title="SEUL - Olympic Committee Membership (Finnish)">⁶</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{t.partnerEyebrow}</p>
          <h2 className={styles.sectionTitle}>
            {t.partnerTitle1}<br />
            <span className={styles.accent}>{t.partnerTitle2}</span>
          </h2>

          <div className={styles.partnerGrid}>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>👕</div>
              <h4>{t.jerseyTitle}</h4>
              <p>{t.jerseyDesc}</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>🎬</div>
              <h4>{t.streamTitle}</h4>
              <p>{t.streamDesc}</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>⚡</div>
              <h4>{t.nutritionTitle}</h4>
              <p>{t.nutritionDesc}</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>🖥️</div>
              <h4>{t.techTitle}</h4>
              <p>{t.techDesc}</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>📡</div>
              <h4>{t.telecomTitle}</h4>
              <p>{t.telecomDesc}</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>🎮</div>
              <h4>{t.gamingTitle}</h4>
              <p>{t.gamingDesc}</p>
            </div>
          </div>

          <p className={styles.partnerNote}>
            {t.partnerNote1}<br />
            <span className={styles.accent}>{t.partnerNote2}</span>
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className={styles.section + " " + styles.sectionDark}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{t.sourcesEyebrow}</p>
          <h2 className={styles.sectionTitle}>
            {t.sourcesTitle1}<br />
            <span className={styles.accent}>{t.sourcesTitle2}</span>
          </h2>
          <div className={styles.sourcesList}>
            <div className={styles.sourceGroup}>
              <h4>{t.marketData}</h4>
              <ul>
                <li><sup>1</sup> <a href={sources.paypalReport} target="_blank" rel="noreferrer">PayPal Esports Report - Europe 2020</a></li>
                <li><sup>3</sup> <a href={sources.esportsEarningsFI} target="_blank" rel="noreferrer">Esports Earnings - Finland</a></li>
                <li><sup>5</sup> <a href={sources.pelaajabarometri} target="_blank" rel="noreferrer">Pelaajabarometri 2024 - Tampere University (PDF)</a></li>
                <li><sup>6</sup> <a href={sources.seulOlympic} target="_blank" rel="noreferrer">SEUL - Olympic Committee Membership (Finnish)</a></li>
              </ul>
            </div>
            <div className={styles.sourceGroup}>
              <h4>{t.nlcViewership}</h4>
              <ul>
                <li><sup>2</sup> <a href={sources.esportsChartsNLC} target="_blank" rel="noreferrer">Esports Charts - NLC Winter 2025</a></li>
                <li><a href={sources.esportsChartsSpring} target="_blank" rel="noreferrer">Esports Charts - NLC Spring 2025</a></li>
                <li><a href={sources.esportsChartsSummer} target="_blank" rel="noreferrer">Esports Charts - NLC Summer 2025</a></li>
              </ul>
            </div>
            <div className={styles.sourceGroup}>
              <h4>{t.teamInfo}</h4>
              <ul>
                <li><a href={sources.liquipediaAP} target="_blank" rel="noreferrer">Liquipedia - Arctic Pandas</a></li>
                <li><a href={sources.liquipediaHiiva} target="_blank" rel="noreferrer">Liquipedia - Hiiva (Head Coach)</a></li>
                <li><sup>7</sup> <a href={sources.twitchXpetu} target="_blank" rel="noreferrer">Twitch - xPetu</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact}>
        <div className={styles.contactInner}>
          <Image
            src="/logo.svg"
            alt="Arctic Pandas"
            width={80}
            height={80}
            className={styles.contactLogo}
          />
          <p className={styles.contactCta}>{t.contactCta}</p>
          <div className={styles.contactInfo}>
            <p className={styles.contactName}>Tapio Salomaa</p>
            <p className={styles.contactRole}>CEO</p>
            <a href={contactConfig.emailHref} className={styles.contactEmail}>
              {contactConfig.email}
            </a>
          </div>
          <div className={styles.contactFooter}>
            <span>pandas.gg</span>
            <span>·</span>
            <span>NLC 2026 Winter</span>
          </div>
        </div>
      </section>
    </div>
  );
}
