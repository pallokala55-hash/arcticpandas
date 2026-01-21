"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { contactConfig } from "../../../lib/config";
import { players } from "../../../data/players";
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
  const stat1Ref = useCountUp(52, 1500, "%");
  const stat2Ref = useCountUp(8400, 2000, "%");
  const stat3Ref = useCountUp(27, 1500, "M");
  const viewerRef = useCountUp(360545, 2500, "");
  const youtubeRef = useCountUp(102, 1800, "M");
  const twitchRef = useCountUp(100, 1500, "K+");

  return (
    <div className={styles.deck}>
      {/* Cover */}
      <section className={styles.cover}>
        <div className={styles.coverBg} aria-hidden="true" />
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
            Finland's next esports story.<br />
            <span className={styles.accent}>Partner with us.</span>
          </p>
          <div className={styles.scrollHint}>
            <span>Scroll</span>
            <div className={styles.scrollLine} />
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The Opportunity</p>
          <h2 className={styles.sectionTitle}>
            Finnish esports is<br />
            <span className={styles.accent}>ready to break out.</span>
          </h2>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber} ref={stat1Ref}>0%</span>
              <span className={styles.statLabel}>of Finnish 18-20 year olds engaged in esports</span>
              <span className={styles.statCompare}>vs 21% in UK</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber} ref={stat2Ref}>0%</span>
              <span className={styles.statLabel}>NLC viewership growth in 2025</span>
              <span className={styles.statCompare}>Peak: 360,545 viewers</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>€<span ref={stat3Ref}>0M</span></span>
              <span className={styles.statLabel}>Finnish esports market by 2029</span>
              <span className={styles.statCompare}>Growing 6.5% annually</span>
            </div>
          </div>
          <p className={styles.pullQuote}>
            Samsung, Kit Kat, and Red Bull are already in.<br />
            <span className={styles.accent}>The window is open.</span>
          </p>
        </div>
      </section>

      {/* The Team */}
      <section className={styles.section + " " + styles.sectionDark}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The Team</p>
          <h2 className={styles.sectionTitle}>
            Built by experts.<br />
            <span className={styles.accent}>Ready to compete.</span>
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
              <p className={styles.leaderRole}>Head Coach</p>
              <h3 className={styles.leaderName}>Hiiva</h3>
              <p className={styles.leaderRealName}>Aleksi Kaikkonen</p>
              <ul className={styles.leaderCredits}>
                <li><span className={styles.creditOrg}>Fnatic</span> Assistant Coach 2022-2024</li>
                <li>LEC Finals 2024 — 2nd Place</li>
                <li><span className={styles.creditOrg}>Misfits</span> LFL Championship Winner</li>
                <li>Former LEC Professional Player</li>
              </ul>
            </div>
          </div>

          {/* xPetu */}
          <div className={styles.creatorCard}>
            <div className={styles.creatorInfo}>
              <p className={styles.leaderRole}>Content & Co-Streamer</p>
              <h3 className={styles.leaderName}>xPetu</h3>
              <p className={styles.leaderRealName}>Challenger Shen · M.Sc. Mathematics</p>
              <div className={styles.creatorStats}>
                <div className={styles.creatorStat}>
                  <span className={styles.creatorNumber} ref={twitchRef}>0K+</span>
                  <span className={styles.creatorLabel}>Twitch Followers</span>
                </div>
                <div className={styles.creatorStat}>
                  <span className={styles.creatorNumber} ref={youtubeRef}>0M</span>
                  <span className={styles.creatorLabel}>YouTube Views</span>
                </div>
              </div>
              <p className={styles.creatorNote}>Our content engine. Built-in audience from day one.</p>
            </div>
          </div>

          {/* Roster */}
          <div className={styles.rosterSection}>
            <h4 className={styles.rosterTitle}>The Roster</h4>
            <p className={styles.rosterSubtitle}>3 Challengers · 2 Grandmasters · All Nordic</p>
            <div className={styles.rosterGrid}>
              {players.map((player) => (
                <div key={player.slug} className={styles.playerCard}>
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
                    <span className={styles.playerPeak}>{player.peak.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.rosterRecord}>
              <span className={styles.accent}>1-0</span> · Season started. Trajectory set.
            </p>
          </div>
        </div>
      </section>

      {/* The Brand */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The Brand</p>
          <h2 className={styles.sectionTitle}>
            Nordic by nature.<br />
            <span className={styles.accent}>Professional by design.</span>
          </h2>
          <div className={styles.brandValues}>
            <div className={styles.brandValue}>
              <div className={styles.brandIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4>Camera-Ready Players</h4>
              <p>Professional presentation, interview-trained, sponsor-friendly content</p>
            </div>
            <div className={styles.brandValue}>
              <div className={styles.brandIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h4>Consistent Aesthetic</h4>
              <p>Unified brand across stream, social, and all partner activations</p>
            </div>
            <div className={styles.brandValue}>
              <div className={styles.brandIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4>Content Engine</h4>
              <p>Daily streams, match coverage, behind-the-scenes, player content</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Market */}
      <section className={styles.section + " " + styles.sectionDark}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The Market</p>
          <h2 className={styles.sectionTitle}>
            NLC is exploding.<br />
            <span className={styles.accent}>The numbers prove it.</span>
          </h2>

          <div className={styles.marketGrid}>
            <div className={styles.marketCard}>
              <h4>Peak Viewership 2025</h4>
              <span className={styles.marketNumber} ref={viewerRef}>0</span>
              <p>concurrent viewers</p>
              <div className={styles.marketBar}>
                <div className={styles.marketBarFill} style={{ width: "100%" }} />
              </div>
              <span className={styles.marketNote}>Up from 2,080 in 2024</span>
            </div>
            <div className={styles.marketCard}>
              <h4>Media Value 2025</h4>
              <span className={styles.marketNumber}>$6.1M</span>
              <p>combined across splits</p>
              <div className={styles.marketBar}>
                <div className={styles.marketBarFill} style={{ width: "75%" }} />
              </div>
              <span className={styles.marketNote}>Winter: $3M · Spring: $2.2M · Summer: $1M</span>
            </div>
            <div className={styles.marketCard}>
              <h4>LEC Pathway</h4>
              <span className={styles.marketNumber}>Direct</span>
              <p>route to Tier 1</p>
              <div className={styles.marketBar}>
                <div className={styles.marketBarFill} style={{ width: "60%" }} />
              </div>
              <span className={styles.marketNote}>Los Ratones now in LEC Versus 2026</span>
            </div>
          </div>

          <div className={styles.audienceBlock}>
            <h4>Finnish Audience Profile</h4>
            <div className={styles.audienceStats}>
              <div className={styles.audienceStat}>
                <span>18-35</span>
                <p>Core demographic</p>
              </div>
              <div className={styles.audienceStat}>
                <span>55%</span>
                <p>of Finns play games</p>
              </div>
              <div className={styles.audienceStat}>
                <span>2nd</span>
                <p>country with Olympic esports recognition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Partnership Opportunities</p>
          <h2 className={styles.sectionTitle}>
            Multiple ways to<br />
            <span className={styles.accent}>join the journey.</span>
          </h2>

          <div className={styles.partnerGrid}>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>👕</div>
              <h4>Jersey & Apparel</h4>
              <p>Logo placement, co-branded merchandise, player gear</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>🎬</div>
              <h4>Stream & Content</h4>
              <p>Overlay branding, sponsored segments, xPetu collaborations</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>⚡</div>
              <h4>Nutrition & Energy</h4>
              <p>Team fuel partner, product placement, athlete endorsement</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>🖥️</div>
              <h4>Tech & Peripherals</h4>
              <p>Equipment partner, setup features, gear reviews</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>📡</div>
              <h4>Telecom</h4>
              <p>Connectivity partner, streaming infrastructure, digital activations</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerIcon}>🎮</div>
              <h4>Gaming & Entertainment</h4>
              <p>Platform partnerships, gaming lifestyle integrations</p>
            </div>
          </div>

          <p className={styles.partnerNote}>
            Flexible structures. Custom activations.<br />
            <span className={styles.accent}>Let's build something together.</span>
          </p>
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
          <p className={styles.contactCta}>Let's talk.</p>
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
