import Link from "next/link";
import SectionEyebrow from "../SectionEyebrow";
import MatchCard from "../../app/(site)/matches/MatchCard";
import {
  getAPGames,
  getAPTeam,
  getOpponentTeam,
  getTeam,
  getGameSlug,
  isPerfectGame,
} from "../../data";
import styles from "./MatchHighlight.module.css";

export default function MatchHighlight() {
  const games = getAPGames();
  const apData = getTeam("ap");

  const upcoming = games
    .filter((g) => !getAPTeam(g).result)
    .sort((a, b) => a.date.localeCompare(b.date));

  const completed = games
    .filter((g) => getAPTeam(g).result)
    .sort((a, b) => b.date.localeCompare(a.date));

  const nextUpcoming = upcoming[0];
  const latestWin = completed.find((g) => getAPTeam(g).result === "win");

  // Convert to MatchCard format
  const toCardGame = (game: typeof games[0]) => {
    const apTeam = getAPTeam(game);
    const oppTeam = getOpponentTeam(game);
    const oppData = getTeam(oppTeam.teamId);

    return {
      id: game.id,
      slug: getGameSlug(game.id),
      date: game.date,
      time: game.time,
      result: apTeam.result ?? null,
      apKills: apTeam.kills ?? null,
      oppKills: oppTeam.kills ?? null,
      oppCode: oppData?.code ?? oppTeam.teamId.toUpperCase(),
      oppName: oppData?.name ?? oppTeam.teamId,
      oppLogo: oppData?.logo ?? null,
      oppInvertLogo: oppData?.invertLogo ?? false,
      isPerfect: isPerfectGame(game),
    };
  };

  const apLogo = apData?.logo ?? null;
  const apInvertLogo = apData?.invertLogo ?? false;

  if (!latestWin && !nextUpcoming) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionEyebrow>NLC 2026 Winter</SectionEyebrow>

        <div className={styles.cards}>
          {latestWin && (
            <MatchCard
              game={toCardGame(latestWin)}
              apLogo={apLogo}
              apInvertLogo={apInvertLogo}
              variant="featured"
            />
          )}
          {nextUpcoming && (
            <MatchCard
              game={toCardGame(nextUpcoming)}
              apLogo={apLogo}
              apInvertLogo={apInvertLogo}
              variant="featured"
            />
          )}
        </div>

        <Link href="/matches" className={styles.viewAll}>
          View all matches →
        </Link>
      </div>
    </section>
  );
}
