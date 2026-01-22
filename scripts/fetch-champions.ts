const DDRAGON_VERSION_URL = "https://ddragon.leagueoflegends.com/api/versions.json";

async function fetchChampions() {
  // Get latest version
  const versionsRes = await fetch(DDRAGON_VERSION_URL);
  const versions = await versionsRes.json();
  const latestVersion = versions[0];
  console.log(`Fetching champions from Data Dragon ${latestVersion}`);

  // Fetch champion data
  const champUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`;
  const champRes = await fetch(champUrl);
  const champData = await champRes.json();

  // Transform to our format
  const champions: Record<string, { id: string; name: string }> = {};
  for (const [key, champ] of Object.entries(champData.data as Record<string, { id: string; name: string }>)) {
    champions[key] = {
      id: champ.id,
      name: champ.name,
    };
  }

  // Write to file
  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "src/data/lol/champions.json");
  fs.writeFileSync(outPath, JSON.stringify(champions, null, 2) + "\n");
  console.log(`Wrote ${Object.keys(champions).length} champions to ${outPath}`);
}

fetchChampions().catch(console.error);
