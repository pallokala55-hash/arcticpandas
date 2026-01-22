import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionEyebrow from "../../../../components/SectionEyebrow";
import {
  getAPGames,
  getGameBySlug,
  getGameSlug,
  getAPTeam,
  getOpponentTeam,
  getTeam,
  isPerfectGame,
  formatDuration,
  getPlayerSlugFromId,
  type PlayerParticipation,
} from "../../../../data";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ gameId: string }>;
}

export async function generateStaticParams() {
  const games = getAPGames();
  return games.map((game) => ({ gameId: getGameSlug(game.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId } = await params;
  const game = getGameBySlug(gameId);
  if (!game) return { title: "Match Not Found" };

  const apTeam = getAPTeam(game);
  const oppTeam = getOpponentTeam(game);
  const oppData = getTeam(oppTeam.teamId);

  return {
    title: `AP vs ${oppData?.code ?? oppTeam.teamId.toUpperCase()} | Arctic Pandas`,
    description: `${apTeam.result === "win" ? "Victory" : "Defeat"} ${apTeam.kills}-${oppTeam.kills} against ${oppData?.name ?? oppTeam.teamId}`,
  };
}

function PlayerRow({ player }: { player: PlayerParticipation }) {
  const slug = getPlayerSlugFromId(player.playerId);
  const kda = ((player.kills ?? 0) + (player.assists ?? 0)) / Math.max(player.deaths ?? 0, 1);
  const kp = player.kp !== undefined ? Math.round(player.kp * 100) : null;
  const dmg = player.dmgShare !== undefined ? Math.round(player.dmgShare * 100) : null;

  const content = (
    <>
      <div className={styles.playerInfo}>
        <span className={styles.playerRole}>{player.role}</span>
        <span className={styles.playerName}>{player.name.replace("AP ", "")}</span>
        <span className={styles.playerChampion}>{player.champion}</span>
      </div>
      <div className={styles.playerKda}>
        <span className={styles.kdaNumbers}>
          {player.kills ?? 0}/{player.deaths ?? 0}/{player.assists ?? 0}
        </span>
        <span className={styles.kdaRatio}>{kda.toFixed(2)} KDA</span>
      </div>
      <div className={styles.playerStats}>
        {player.cs !== undefined && (
          <span className={styles.playerStat}>
            <span className={styles.statVal}>{player.cs}</span>
            <span className={styles.statKey}>CS</span>
          </span>
        )}
        {player.gold !== undefined && (
          <span className={styles.playerStat}>
            <span className={styles.statVal}>{(player.gold / 1000).toFixed(1)}k</span>
            <span className={styles.statKey}>Gold</span>
          </span>
        )}
        {kp !== null && (
          <span className={styles.playerStat}>
            <span className={styles.statVal}>{kp}%</span>
            <span className={styles.statKey}>KP</span>
          </span>
        )}
        {dmg !== null && (
          <span className={styles.playerStat}>
            <span className={styles.statVal}>{dmg}%</span>
            <span className={styles.statKey}>DMG</span>
          </span>
        )}
      </div>
    </>
  );

  if (slug) {
    return (
      <Link href={`/${slug}`} className={styles.playerRow} data-linked="true">
        {content}
      </Link>
    );
  }

  return <div className={styles.playerRow}>{content}</div>;
}

export default async function MatchDetailPage({ params }: Props) {
  const { gameId } = await params;
  const game = getGameBySlug(gameId);

  if (!game) {
    notFound();
  }

  const apTeam = getAPTeam(game);
  const oppTeam = getOpponentTeam(game);
  const oppData = getTeam(oppTeam.teamId);
  const perfect = isPerfectGame(game);
  const duration = formatDuration(game.duration);
  const goldDiff = (apTeam.gold ?? 0) - (oppTeam.gold ?? 0);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Link href="/matches" className={styles.backLink}>
          ← All Matches
        </Link>
        <SectionEyebrow>NLC 2026 Winter · {game.date}</SectionEyebrow>

        <div className={styles.matchup}>
          <div className={styles.teamBlock}>
            <span className={styles.teamName}>Arctic Pandas</span>
            <span className={styles.teamScore}>{apTeam.kills}</span>
          </div>
          <span className={styles.vs}>VS</span>
          <div className={styles.teamBlock}>
            <span className={styles.teamScore}>{oppTeam.kills}</span>
            <span className={styles.teamName}>{oppData?.name ?? oppTeam.teamId}</span>
          </div>
        </div>

        <div className={styles.badges}>
          <span className={styles.resultBadge} data-result={apTeam.result}>
            {apTeam.result === "win" ? "Victory" : "Defeat"}
          </span>
          {perfect && <span className={styles.perfectBadge}>Perfect Game</span>}
          {duration && <span className={styles.duration}>{duration}</span>}
        </div>
      </section>

      <section className={styles.overview}>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewStat}>
            <span className={styles.overviewLabel}>Gold Diff</span>
            <span className={styles.overviewValue} data-positive={goldDiff > 0}>
              {goldDiff > 0 ? "+" : ""}
              {(goldDiff / 1000).toFixed(1)}k
            </span>
          </div>
          <div className={styles.overviewStat}>
            <span className={styles.overviewLabel}>Towers</span>
            <span className={styles.overviewValue}>
              {apTeam.towers ?? 0} - {oppTeam.towers ?? 0}
            </span>
          </div>
          <div className={styles.overviewStat}>
            <span className={styles.overviewLabel}>Barons</span>
            <span className={styles.overviewValue}>
              {apTeam.barons ?? 0} - {oppTeam.barons ?? 0}
            </span>
          </div>
          <div className={styles.overviewStat}>
            <span className={styles.overviewLabel}>Dragons</span>
            <span className={styles.overviewValue}>
              {apTeam.dragons?.length ?? 0} - {oppTeam.dragons?.length ?? 0}
            </span>
          </div>
        </div>

        {apTeam.dragons && apTeam.dragons.length > 0 && (
          <div className={styles.dragons}>
            {apTeam.dragons.map((dragon, i) => (
              <span key={i} className={styles.dragon} data-type={dragon}>
                {dragon}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className={styles.playersSection}>
        <h2 className={styles.sectionTitle}>Arctic Pandas</h2>
        <div className={styles.playersList}>
          {apTeam.players.map((player, i) => (
            <PlayerRow key={player.playerId ?? i} player={player} />
          ))}
        </div>
      </section>

      <section className={styles.playersSection}>
        <h2 className={styles.sectionTitle}>{oppData?.name ?? oppTeam.teamId}</h2>
        <div className={styles.playersList}>
          {oppTeam.players.map((player, i) => (
            <div key={i} className={styles.playerRow}>
              <div className={styles.playerInfo}>
                <span className={styles.playerRole}>{player.role}</span>
                <span className={styles.playerName}>{player.name}</span>
                <span className={styles.playerChampion}>{player.champion}</span>
              </div>
              <div className={styles.playerKda}>
                <span className={styles.kdaNumbers}>
                  {player.kills ?? 0}/{player.deaths ?? 0}/{player.assists ?? 0}
                </span>
              </div>
              <div className={styles.playerStats}>
                {player.cs !== undefined && (
                  <span className={styles.playerStat}>
                    <span className={styles.statVal}>{player.cs}</span>
                    <span className={styles.statKey}>CS</span>
                  </span>
                )}
                {player.gold !== undefined && (
                  <span className={styles.playerStat}>
                    <span className={styles.statVal}>{(player.gold / 1000).toFixed(1)}k</span>
                    <span className={styles.statKey}>Gold</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.metaSection}>
        <p className={styles.metaText}>
          {game.patch && `Patch ${game.patch} · `}Game ID: {game.id}
        </p>
      </section>
    </main>
  );
}
