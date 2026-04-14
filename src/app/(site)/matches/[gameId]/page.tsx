import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAPGames,
  getGameBySlug,
  getGameSlug,
  getAPTeam,
  getOpponentTeam,
  getTeam,
  getPlayer,
  isPerfectGame,
  formatDuration,
  getPlayerSlugFromId,
  getChampionIconUrl,
  type PlayerParticipation,
} from "../../../../data";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ gameId: string }>;
}

type TeamParticipationWithOptionalSeries = {
  kills?: number;
  seriesWins?: number;
};

function getDisplayedScore(
  team: TeamParticipationWithOptionalSeries,
): number | undefined {
  return team.kills ?? team.seriesWins;
}

function hasDisplayedScoreline(
  left: TeamParticipationWithOptionalSeries,
  right: TeamParticipationWithOptionalSeries,
): boolean {
  return (
    getDisplayedScore(left) !== undefined &&
    getDisplayedScore(right) !== undefined
  );
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

  const resultText =
    apTeam.result === "win"
      ? "Victory"
      : apTeam.result === "loss"
        ? "Defeat"
        : "Upcoming match";
  const apDisplayScore = getDisplayedScore(
    apTeam as TeamParticipationWithOptionalSeries,
  );
  const oppDisplayScore = getDisplayedScore(
    oppTeam as TeamParticipationWithOptionalSeries,
  );
  const hasScoreline = hasDisplayedScoreline(
    apTeam as TeamParticipationWithOptionalSeries,
    oppTeam as TeamParticipationWithOptionalSeries,
  );
  const stagePrefix =
    game.tournament?.stage && game.tournament.stage !== "Regular Season"
      ? `${game.tournament.stage} · `
      : "";
  const scoreText =
    apTeam.result && hasScoreline
      ? `${apDisplayScore ?? 0}-${oppDisplayScore ?? 0}`
      : "";

  return {
    title: `AP vs ${oppData?.code ?? oppTeam.teamId.toUpperCase()} | Arctic Pandas`,
    description: `${stagePrefix}${resultText}${scoreText ? ` ${scoreText}` : ""} against ${oppData?.name ?? oppTeam.teamId}`,
  };
}

function isStomp(
  apScore: number,
  oppScore: number,
  result: string | null,
  isSeriesScoreline = false,
): boolean {
  if (result !== "win") return false;
  if (isSeriesScoreline) return apScore >= 3 && oppScore === 0;
  return apScore - oppScore >= 15;
}

function getResultLabel(
  isUpcoming: boolean,
  perfect: boolean,
  stomp: boolean,
  isWin: boolean,
): string {
  if (isUpcoming) return "Upcoming";
  if (perfect) return "Perfect Victory";
  if (stomp) return "Dominant Victory";
  if (isWin) return "Victory";
  return "Defeat";
}

// Role colors for visual distinction
const ROLE_COLORS: Record<string, string> = {
  top: "#f59e0b", // amber
  jungle: "#22c55e", // green
  mid: "#8b5cf6", // purple
  bottom: "#3b82f6", // blue
  support: "#06b6d4", // cyan
};

function APPlayerCard({ player }: { player: PlayerParticipation }) {
  const slug = getPlayerSlugFromId(player.playerId);
  const playerData = player.playerId ? getPlayer(player.playerId) : null;
  const championIconUrl = getChampionIconUrl(player.champion);
  const kda =
    ((player.kills ?? 0) + (player.assists ?? 0)) /
    Math.max(player.deaths ?? 1, 1);
  const kp = player.kp !== undefined ? Math.round(player.kp * 100) : null;
  const dmg =
    player.dmgShare !== undefined ? Math.round(player.dmgShare * 100) : null;
  const roleColor = ROLE_COLORS[player.role ?? ""] ?? "#6b7280";
  const isPerfect =
    (player.deaths ?? 0) === 0 &&
    (player.kills ?? 0) + (player.assists ?? 0) > 0;

  const content = (
    <>
      {/* Left: Portrait */}
      <div className={styles.apPortraitCol}>
        {playerData?.photo ? (
          <Image
            src={playerData.photo}
            alt={player.name}
            width={72}
            height={72}
            className={styles.apPortraitImg}
          />
        ) : (
          <div className={styles.apPortraitPlaceholder} />
        )}
      </div>

      {/* Center: Identity + Champion */}
      <div className={styles.apMainCol}>
        <div className={styles.apIdentity}>
          <span className={styles.apName}>
            {player.name.replace("AP ", "")}
          </span>
          <span
            className={styles.apRole}
            style={{ "--role-color": roleColor } as React.CSSProperties}
          >
            {player.role}
          </span>
        </div>
        <div className={styles.apChampRow}>
          {championIconUrl && (
            <div
              className={styles.apChampIcon}
              style={{ "--role-color": roleColor } as React.CSSProperties}
            >
              <Image
                src={championIconUrl}
                alt={player.champion ?? ""}
                width={32}
                height={32}
                unoptimized
              />
            </div>
          )}
          {player.champion && player.champion !== "Unknown" && (
            <span className={styles.apChampName}>{player.champion}</span>
          )}
        </div>
      </div>

      {/* Right: Stats */}
      <div className={styles.apStatsCol}>
        {/* KDA */}
        <div className={styles.apKda} data-perfect={isPerfect}>
          <div className={styles.apKdaNums}>
            <span className={styles.apKill}>{player.kills ?? 0}</span>
            <span className={styles.apKdaSep}>/</span>
            <span className={styles.apDeath}>{player.deaths ?? 0}</span>
            <span className={styles.apKdaSep}>/</span>
            <span className={styles.apAssist}>{player.assists ?? 0}</span>
          </div>
          <span className={styles.apKdaLabel}>{kda.toFixed(2)} KDA</span>
        </div>

        {/* Stat Grid */}
        <div className={styles.apStatGrid}>
          {player.cs !== undefined && (
            <div className={styles.apStat}>
              <span className={styles.apStatVal}>{player.cs}</span>
              <span className={styles.apStatLbl}>CS</span>
            </div>
          )}
          {player.gold !== undefined && (
            <div className={styles.apStat}>
              <span className={styles.apStatVal}>
                {(player.gold / 1000).toFixed(1)}k
              </span>
              <span className={styles.apStatLbl}>Gold</span>
            </div>
          )}
          {kp !== null && (
            <div className={styles.apStat} data-highlight={kp >= 60}>
              <span className={styles.apStatVal}>{kp}%</span>
              <span className={styles.apStatLbl}>KP</span>
            </div>
          )}
          {dmg !== null && (
            <div className={styles.apStat} data-highlight={dmg >= 25}>
              <span className={styles.apStatVal}>{dmg}%</span>
              <span className={styles.apStatLbl}>DMG</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        href={`/${slug}`}
        className={styles.apCard}
        data-perfect={isPerfect}
        style={{ "--role-color": roleColor } as React.CSSProperties}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={styles.apCard}
      data-perfect={isPerfect}
      style={{ "--role-color": roleColor } as React.CSSProperties}
    >
      {content}
    </div>
  );
}

function OpponentPlayerRow({ player }: { player: PlayerParticipation }) {
  const championIconUrl = getChampionIconUrl(player.champion);
  const kda =
    ((player.kills ?? 0) + (player.assists ?? 0)) /
    Math.max(player.deaths ?? 1, 1);
  const roleColor = ROLE_COLORS[player.role ?? ""] ?? "#6b7280";

  return (
    <div
      className={styles.oppRow}
      style={{ "--role-color": roleColor } as React.CSSProperties}
    >
      {/* Champion */}
      <div className={styles.oppChamp}>
        {championIconUrl ? (
          <Image
            src={championIconUrl}
            alt={player.champion ?? ""}
            width={36}
            height={36}
            className={styles.oppChampImg}
            unoptimized
          />
        ) : (
          <div className={styles.oppChampPlaceholder} />
        )}
      </div>

      {/* Identity */}
      <div className={styles.oppInfo}>
        <span className={styles.oppName}>{player.name}</span>
        <span className={styles.oppMeta}>
          {player.role?.slice(0, 3).toUpperCase()}
          {player.champion &&
            player.champion !== "Unknown" &&
            ` · ${player.champion}`}
        </span>
      </div>

      {/* KDA */}
      <div className={styles.oppKda}>
        <span>
          {player.kills ?? 0}/{player.deaths ?? 0}/{player.assists ?? 0}
        </span>
        <span className={styles.oppKdaVal}>{kda.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default async function MatchDetailPage({ params }: Props) {
  const { gameId } = await params;
  const game = getGameBySlug(gameId);

  if (!game) {
    notFound();
  }

  const apTeam = getAPTeam(game);
  const oppTeam = getOpponentTeam(game);
  const apData = getTeam("ap");
  const oppData = getTeam(oppTeam.teamId);

  const isUpcoming = !apTeam.result;
  const isWin = apTeam.result === "win";
  const perfect = isPerfectGame(game);
  const apDisplayScore = getDisplayedScore(
    apTeam as TeamParticipationWithOptionalSeries,
  );
  const oppDisplayScore = getDisplayedScore(
    oppTeam as TeamParticipationWithOptionalSeries,
  );
  const hasScoreline = hasDisplayedScoreline(
    apTeam as TeamParticipationWithOptionalSeries,
    oppTeam as TeamParticipationWithOptionalSeries,
  );
  const isSeriesScoreline =
    apTeam.kills === undefined && oppTeam.kills === undefined && hasScoreline;
  const stageLabel =
    game.tournament?.stage && game.tournament.stage !== "Regular Season"
      ? game.tournament.stage
      : null;
  const stomp = isStomp(
    apDisplayScore ?? 0,
    oppDisplayScore ?? 0,
    apTeam.result ?? null,
    isSeriesScoreline,
  );
  const duration = formatDuration(game.duration);

  // Check what data we actually have
  const hasGold = apTeam.gold !== undefined || oppTeam.gold !== undefined;
  const hasTowers = apTeam.towers !== undefined || oppTeam.towers !== undefined;
  const hasBarons = apTeam.barons !== undefined || oppTeam.barons !== undefined;
  const hasDragons =
    (apTeam.dragons?.length ?? 0) > 0 || (oppTeam.dragons?.length ?? 0) > 0;
  const hasTeamStats = hasGold || hasTowers || hasBarons || hasDragons;
  const goldDiff = (apTeam.gold ?? 0) - (oppTeam.gold ?? 0);

  // Real player data = champions that aren't placeholders
  const hasRealPlayers = (players: typeof apTeam.players) =>
    players?.some((p) => p.champion && p.champion !== "Unknown") ?? false;

  const dateObj = new Date(game.date);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main
      className={styles.main}
      data-result={isUpcoming ? "upcoming" : apTeam.result}
      data-perfect={perfect}
      data-stomp={stomp}
    >
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/matches" className={styles.backLink}>
            ← Matches
          </Link>

          <div className={styles.heroContent}>
            {/* Result Label */}
            <div className={styles.resultLabelWrap}>
              <div className={styles.heroGlow} />
              <div className={styles.resultLabel}>
                {getResultLabel(isUpcoming, perfect, stomp, isWin)}
              </div>
            </div>

            {/* Matchup */}
            <div className={styles.matchup}>
              {/* AP Side */}
              <div
                className={styles.teamSide}
                data-winner={isUpcoming ? undefined : isWin}
              >
                {apData?.logo && (
                  <Image
                    src={apData.logo}
                    alt="AP"
                    width={80}
                    height={80}
                    className={[
                      styles.teamLogo,
                      apData?.invertLogo && styles.invertLogo,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                )}
                <span className={styles.teamName}>Arctic Pandas</span>
              </div>

              {/* Score or VS */}
              <div className={styles.scoreBlock}>
                {isUpcoming ? (
                  <span className={styles.vsText}>VS</span>
                ) : hasScoreline ? (
                  <>
                    <div className={styles.scoreRow}>
                      <span className={styles.score} data-winner={isWin}>
                        {apDisplayScore ?? 0}
                      </span>
                      <span className={styles.scoreSep}>–</span>
                      <span className={styles.score} data-winner={!isWin}>
                        {oppDisplayScore ?? 0}
                      </span>
                    </div>
                    {duration && (
                      <span className={styles.duration}>{duration}</span>
                    )}
                  </>
                ) : (
                  <>
                    <span className={styles.vsText}>FINAL</span>
                    {duration && (
                      <span className={styles.duration}>{duration}</span>
                    )}
                  </>
                )}
              </div>

              {/* Opponent Side */}
              <div
                className={styles.teamSide}
                data-winner={isUpcoming ? undefined : !isWin}
              >
                {oppData?.logo && (
                  <Image
                    src={oppData.logo}
                    alt={oppData?.code ?? ""}
                    width={80}
                    height={80}
                    className={[
                      styles.teamLogo,
                      oppData?.invertLogo && styles.invertLogo,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                )}
                <span className={styles.teamName}>
                  {oppData?.name ?? oppTeam.teamId}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className={styles.heroMeta}>
              {stageLabel && <span>{stageLabel}</span>}
              <span>{dateStr}</span>
              {game.patch && <span>Patch {game.patch}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Game Stats - only show if we have any stats data */}
      {hasTeamStats && (
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {hasGold && (
              <div className={styles.statCard}>
                <span className={styles.statCardLabel}>Gold Diff</span>
                <span
                  className={styles.statCardValue}
                  data-positive={goldDiff > 0}
                >
                  {goldDiff > 0 ? "+" : ""}
                  {(goldDiff / 1000).toFixed(1)}k
                </span>
              </div>
            )}
            {hasTowers && (
              <div className={styles.statCard}>
                <span className={styles.statCardLabel}>Towers</span>
                <span className={styles.statCardValue}>
                  {apTeam.towers ?? 0} – {oppTeam.towers ?? 0}
                </span>
              </div>
            )}
            {hasBarons && (
              <div className={styles.statCard}>
                <span className={styles.statCardLabel}>Barons</span>
                <span className={styles.statCardValue}>
                  {apTeam.barons ?? 0} – {oppTeam.barons ?? 0}
                </span>
              </div>
            )}
            {hasDragons && (
              <div className={styles.statCard}>
                <span className={styles.statCardLabel}>Dragons</span>
                <span className={styles.statCardValue}>
                  {apTeam.dragons?.length ?? 0} – {oppTeam.dragons?.length ?? 0}
                </span>
              </div>
            )}
          </div>

          {apTeam.dragons && apTeam.dragons.length > 0 && (
            <div className={styles.dragonList}>
              {apTeam.dragons.map((dragon, i) => (
                <span key={i} className={styles.dragonTag} data-type={dragon}>
                  {dragon}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* AP Players - only if we have real player data */}
      {hasRealPlayers(apTeam.players) && (
        <section className={styles.apSection}>
          <h2 className={styles.sectionTitle}>Arctic Pandas</h2>
          <div className={styles.apGrid}>
            {apTeam.players!.map((player, i) => (
              <APPlayerCard key={player.playerId ?? i} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Opponent Players - only if we have real player data */}
      {hasRealPlayers(oppTeam.players) && (
        <section className={styles.oppSection}>
          <h2 className={styles.sectionTitle}>
            {oppData?.name ?? oppTeam.teamId}
          </h2>
          <div className={styles.oppGrid}>
            {oppTeam.players!.map((player, i) => (
              <OpponentPlayerRow key={i} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Footer - only show game ID when we have real player data */}
      {hasRealPlayers(apTeam.players) && (
        <footer className={styles.footer}>
          <span className={styles.footerText}>Game ID: {game.id}</span>
        </footer>
      )}
    </main>
  );
}
