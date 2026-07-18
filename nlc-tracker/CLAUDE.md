# NLC Tracker

NLC:n (League of Legends tier 2, Nordics & UK) seurantasivusto — Arctic Pandas -organisaation projekti. **Vaihe 1: pelkkä ulkoasu ja sivurakenne mock-datalla.** Ei backendia, ei admin-paneelia, ei oikeaa hakua/kirjautumista vielä.

Sijaitsee pandas.gg-repon alikansiossa `nlc-tracker/` mutta on täysin itsenäinen projekti omalla `package.json`illa. Emorepo dokumentoitu tasoa ylempänä (`../CLAUDE.md`).

## Tekniikka ja komennot

Next.js 16 (App Router, Turbopack) + TypeScript (strict) + **Tailwind CSS v4** (CSS-pohjainen konfiguraatio, ei `tailwind.config`-tiedostoa).

```bash
npm run dev     # dev-serveri porttiin 3100 (3000 on varattu pandas.gg-sivustolle)
npm run build   # tuotantobuildi (kaikki sivut staattisia/SSG)
```

HUOM: `next.config.ts` asettaa `turbopack.root = __dirname`, koska emorepolla on oma lockfile — ilman tätä Turbopack päättelee väärän juuren **eikä PostCSS/Tailwind lataudu lainkaan** (sivu renderöityy ilman tyylejä).

## Design

Referenssit: `../public/pandas_gg/` (DPM.LOL-etusivu, RFT.GG-etusivu ja -bracket). Tyyli DPM.LOL:sta, rakenne RFT.GG:stä.

- **Tokenit**: `src/app/globals.css` → `@theme`-blokki: `ink` (tausta #07060c), `panel`/`panel-2` (pinnat), `accent` #6C6CF5, `win`/`loss`/`gold`/`muted`. Taustan violetit/siniset hehkut body-radial-gradienteilla.
- **Apuluokat** (globals.css): `.card` (lasimainen tumma kortti ohuella borderilla), `.card-glow` (accent-hehkuviiva alareunassa), `.scroll-thin` (ohut scrollbar). Bracketin viivaväri: CSS-muuttuja `--bracket-line`.
- Joukkueilla ja uutisilla **ei ole kuva-assetteja** — logot ovat gradienttitiilejä (`TeamLogo`, värit `Team.colors`) ja uutiskuvat CSS-gradientteja (`NewsItem.gradient`). API pidetty sellaisena että oikeat kuvat voi pudottaa tilalle.

## Sivukartta

| Reitti | Kuvaus |
|---|---|
| `/` | Hero (logo + haku Ctrl+K + display-typo), 3 palstaa: eventit countdowneilla + Player of the Month \| matsikaruselli (Upcoming/Results) + uutisnosto + Popular News \| Recent Activity. Alimpana leaderboard (Players/Teams-välilehdet). |
| `/events` | Eventtilistaus |
| `/events/[slug]` | **Eventtisivu**: header (nimi, päivämäärät, Teams/Prize/Location), välilehdet Overview/Matches/Teams/Players/Stats, Group Stage ⇄ Playoffs -toggle, pelipuu |
| `/matches`, `/news`, `/forum` | Kevyet listaussivut navia varten |

Komponentit: `src/components/` — `layout/` (TopNav, SearchBox, Logo), `home/` (Hero, EventsList, MatchesCarousel, NewsSection, RecentActivity, PlayerOfMonth, LeaderboardCard), `event/` (EventHeader, EventView = client-tilallinen välilehti/toggle-runko, StandingsTable, `bracket/`), jaetut `MatchCard`, `ui/TeamLogo`, `ui/TierBadge`.

## Mock-data = tuleva tietokantaskeema (tärkein periaate)

Kaikki sisältö tulee `src/data/`-moduuleista, joiden tyypit ovat `src/data/types.ts`. **Komponentteihin ei kovakoodata joukkueita, matseja eikä bracket-rakennetta** — admin-paneeli tulee muokkaamaan näitä samoja muotoja.

- `teams.ts` — 8 kuvitteellista joukkuetta (`ap` = Arctic Pandas, nly, krk, ims, pvx, rvn, fjf, msn)
- `players.ts` — 40 pelaajaa (5/joukkue; AP:lla oikea rosteri Nille/Dibu/Simpli/Kehvo/Boltox)
- `events.ts` — 3 eventtiä: **NLC 2026 Summer** (ongoing: runkosarja pelattu, double elim -playoffs kesken), **Aurora Cup 2026** (upcoming, single elim), NLC 2027 Winter (ei bracketia — sivu näyttää placeholderin)
- `matches.ts` — kaikki matsit: 28 runkosarja-Bo1:tä + playoffit + cupin puu. `teamA/teamB: null` = TBD, `sourceA/sourceB` = TBD-slotin teksti ("Winner of UB Final")
- `news.ts`, `activity.ts`, `leaderboard.ts` — etusivun sisällöt

**Standings lasketaan aina matsidatasta** (`src/lib/standings.ts: computeStandings`), ei tallenneta käsin.

### Bracket-datamalli

`Event.bracket = { type: "single" | "double", columns: BracketColumnDef[] }`. Sarake: `{ id, title, grid: "upper" | "lower" | "final", order, matchIds }`.

- `grid` sijoittaa sarakkeen ylä- tai alarivin (double elim); `final` renderöityy ylärivillä.
- `order` on sarakkeen vaakasijainti jaetussa ruudukossa → alarivin kierrokset asettuvat oikeiden yläkierrosten alle ilman komponenttiin koodattua layoutia.
- `Bracket.tsx` piirtää yhdysviivat CSS:llä: parit (n → n/2) saavat pystykulmaviivan, muut suorat stubit. TBD-matsit (`teamA/teamB null`) saavat katkoviivareunan (`BracketMatchCard`).

### Uuden matsin/eventin lisääminen

1. Lisää matsi `matches.ts`-taulukkoon (id-konventio: `<eventtiprefix>-<vaihe>`).
2. Playoff-matsi: viittaa id:hen eventin `bracket.columns[].matchIds`-listassa.
3. Tulos: aseta `status: "completed"` + `scoreA/scoreB` — standings, kortit ja bracket päivittyvät itsestään.

## Tulevat vaiheet (suunnitelma)

1. **Riot/LoL Esports API -integraatio** — korvaa `src/data/*.ts` tietokannalla (skeema = nykyiset tyypit) ja hakee tulokset automaattisesti; per-pelaaja-statsit Stats-välilehdelle. Emorepossa on valmis referenssi lolesports-API:n käyttöön: `../scripts/fetch-lolesports.ts`.
2. **Admin-paneeli** — CRUD samoille rakenteille (Event/Match/Bracket/Team/Player); bracket-editori muokkaa `columns`/`matchIds`-rakennetta.
3. Haku (Ctrl+K on nyt pelkkä UI), kirjautuminen/foorumi, oikeat logo/kuva-assetit, i18n (EN/FI).

## Tunnetut rajoitteet

- Haku, Sign in ja foorumi ovat ei-toiminnallisia UI-mockeja.
- Eventtisivun välilehdet ja stage-toggle ovat client-tilaa (`EventView`) — eivät URL-parametreja; syvälinkitys välilehtiin puuttuu.
- `countdownLabel` lasketaan renderöintihetken kellosta — staattisessa buildissa "in Xd" jäätyy buildihetkeen (dev/ISR:ssä ei ongelma tässä vaiheessa).
- Ei testejä eikä lint-konfiguraatiota vielä (`next lint` -skripti on, mutta ESLint-configia ei ole luotu).
