# Arctic Pandas – pandas.gg

Suomalaisen League of Legends -esports-organisaation (Arctic Pandas Oy, NLC-liiga) nettisivut. Hostattu Vercelissä (`vercel.json`), domain pandas.gg.

## Tekniikka

- **Next.js 16 (App Router) + React 19 + TypeScript (strict)** – ei Tailwindia, tyylit CSS Modules -tiedostoina.
- **Zod 4** validoi kaiken sisältödatan (pelaajat, joukkueet, matsit).
- HUOM: `README.md` on vanhentunut Vite-template-readme – projekti on migratoitu Vitestä Next.jsiin. Sekä `package-lock.json` että `bun.lockb` ovat repossa; npm on käytännössä käytössä.

### Komennot

```bash
npm run dev        # kehityspalvelin
npm run build      # ajaa ensin validate, sitten next build
npm run validate   # scripts/validate-data.ts – validoi src/data/**/*.json Zod-skeemoja vasten
npm run lint
```

## Rakenne ja reitit

Kaksi route-ryhmää `src/app/`:ssa:

| Reitti | Tiedosto | Sisältö |
|---|---|---|
| `/` | `(site)/page.tsx` | Hero → HomeMatches → Team → CTA |
| `/[player]` | `(site)/[player]/page.tsx` | Pelaajaprofiilit juuritasolla: `/nille`, `/dibu`, `/simpli`, `/kehvo`, `/boltox` |
| `/matches` | `(site)/matches/page.tsx` | Kausitilastot + `MatchTimeline` |
| `/matches/[gameId]` | `(site)/matches/[gameId]/page.tsx` | Matsisivu; slug voi olla mikä tahansa pelin `slugs`-listasta tai id |
| `/for-partners` | `(standalone)/for-partners/page.tsx` | Sponsorideck (753 riviä, client component, EN/FI-kielivalinta, noindex) |

- `(site)/layout.tsx` lisää Headerin, Footerin ja SmoothScrollin; `(standalone)/layout.tsx` on paljas (ei headeria) ja asettaa `robots: noindex`.
- Juurilayout `src/app/layout.tsx`: metadata, OG-tagit, JSON-LD (Organization) ja teeman CSS-muuttujien injektointi inline-tyylinä.

### Keskeiset komponentit

- `src/components/Header.tsx` – navi (`src/data/navigation.ts`) + somelinkit inline-SVG:inä (Twitch, X, Discord, YouTube, Instagram). SVG:t on duplikoitu mobiili- ja desktop-lohkoihin.
- `src/components/sections/Hero.tsx` – etusivun hero; pelaajien cutout-kuvien sijainnit kovakoodattu taulukkoon `[id, name, left%, bottom%, z, scale]`. HUOM: Simplin kuvatiedosto on `simple-cutout.webp` (id "simple", ei "simpli").
- `src/components/sections/Team.tsx` – rosteri (`roster` ← `src/data/index.ts`) `MemberCard`-korteilla. (Johto-osio poistettu etusivulta 2026-07; `src/data/management.ts` jäi käyttämättömäksi.)
- `src/components/sections/CTA.tsx` – Contact-osio (`/#contact`): partner deck -linkki + sähköposti.
- `src/components/MemberCard.tsx` – 4 varianttia: default / leader / compact / creator; tukee myös videokuvia.
- `src/app/(site)/matches/MatchCard.tsx` + `MatchTimeline.tsx` – matsikortit ja aikajana (client components).

## Data (tärkein osa ymmärtää)

Kaikki sisältö on **staattista dataa reposssa** – ei CMS:ää, ei tietokantaa.

- `src/data/players/*.json` – pelaajaprofiilit (PlayerSchema: bio, tags, highlights, playbook, peak-rank, esportsIds…)
- `src/data/teams/*.json` – AP + 9 NLC-vastustajaa (logo `public/logos/`, `invertLogo`-lippu)
- `src/data/games/*.json` – matsit (GameSchema: teams-tuple, per-pelaaja statsit, dragons, vods, `slugs`-lista URL:eja varten)
- `src/data/lol/champions.json`, `dragons.json` – LoL-referenssidata (champion-ikonit Riotin Data Dragon CDN:stä, versio kovakoodattu `DDRAGON_VERSION` = index.ts)
- `src/data/schemas/*.ts` – Zod-skeemat ja typet
- `src/data/index.ts` – **keskuslataaja**: staattiset importit + `Schema.parse()` moduulin latauksessa + kaikki apurit (`getAPGames`, `getSeasonTotals`, `partitionAPGames`, `getGameSlug`, `getChampionIconUrl`…). Sisältää myös compat-kerroksen (`playersArray`, `playersBySlug`, `roster`, `rosterOrder`).
- `src/lib/config.ts` – somelinkit, yhteystiedot (tapio@pandas.gg), site-URL.
- `src/data/slugs.ts` – slug-generointiapurit uusille matseille.

### Uuden matsin lisääminen

1. Luo `src/data/games/<vastustaja>-<pvm>.json` (tuleva matsi: ei `result`-kenttää → näkyy "Upcoming").
2. **Rekisteröi se käsin `src/data/index.ts`:ään**: import + `gameDataArray`. Tämä unohtuu helposti – validate ei huomaa puuttuvaa importtia, koska se skannaa hakemiston suoraan.
3. Anna `slugs`-lista (apuri: `generateGameSlugs()` slugs.ts:ssä). Aja `npm run validate`.
4. Tulosdata voidaan hakea LoL Esports API:sta: `scripts/fetch-lolesports.ts` (myös `fetch-champions.ts`, `fetch-rank-emblems.ts`).

### Uuden pelaajan lisääminen

1. `src/data/players/<id>.json` + rekisteröinti `index.ts`:ään (import + `playerDataArray` + `rosterOrder`).
2. Kuvat: `public/portraits/<id>.webp` ja `<id>-cutout.webp` (hero).
3. Heron kovakoodattu `players`-taulukko (`Hero.tsx`) pitää päivittää käsin.

## Tyylit ja teema

- Design tokenit: `src/theme.ts` (mustavalkopohja + `frostBlue #4ED0FF`, `frostGrey #C8C8C8`, glow-värit, `withAlpha()`-apuri). Injektoidaan CSS-muuttujiksi (`--color-frostBlue` jne.) root-layoutissa.
- Komponenttityylit: CSS Modules (`*.module.css`) komponentin vieressä. Globaalit: `src/app/globals.css` (radial-gradient-tausta, container-pattern).
- Fontit: globals.css viittaa Interiin ja Space Grotesk:iin, mutta **niitä ei ladata mistään** (ei next/font) → käytännössä system-fontit renderöityvät.

## Tunnetut puutteet / sudenkuopat (tilanne 2026-07)

- `src/lib/config.ts` → `assets.heroVideo: "/Hiivapromo.mp4"` viittaa tiedostoon jota ei ole `public/`-kansiossa (jäänne).
- **Käyttämättömät moduulit**: `src/data/merch.ts` (merch-tuotteet, kuvatiedostojakaan ei ole), `src/data/sponsors.ts` (placeholder-labelit, ei oikeita sponsoreita), `src/data/management.ts` (johto-osio poistettu etusivulta) ja `navigation.ts`:n `headerCta` ja `footerLinks`.
- `getAPTeam()`/`getOpponentTeam()` käyttävät non-null assertionia – kaatuu jos peli-JSON:sta puuttuu AP-joukkue (validate ei tarkista tätä).
- Header renderöi navilinkit `<a>`-elementteinä (ei `next/link`) → `/matches`-navigointi on full page load.
- Headerin some-SVG:t duplikoitu kahteen kertaan (~120 riviä toistoa).
- `scripts/fetch-lolesports.ts` sisältää kovakoodatun API-avaimen (Riotin julkinen lolesports-avain).
- `public/` sisältää duplikaattiformaatteja (png+jpg+webp samoista potreteista) ja `MaskedPanda.ai`-lähdetiedoston.
- Ei testejä eikä CI:tä; ainoa portti on `validate` buildissa.

## Konventiot

- Commit-viestit ovat usein suomeksi ("Tulosten päivitys", "Päivitetty pelit").
- Sivuston kieli on englanti; partner deck on kaksikielinen (EN/FI) `content`-objektilla.
- Kausi/otsikkotekstit ("NLC 2026 Winter") on kovakoodattu Hero-, HomeMatches- ja matches-sivuille – päivitä kaikki kolme kauden vaihtuessa.
