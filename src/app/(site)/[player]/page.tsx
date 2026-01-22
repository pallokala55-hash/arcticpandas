import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayerProfile from "../../../components/sections/PlayerProfile";
import { playersArray, playersBySlug } from "../../../data";
import { siteConfig } from "../../../lib/config";

type Props = {
  params: Promise<{ player: string }>;
};

// Generate static paths for all players at build time
export async function generateStaticParams() {
  return playersArray.map((player) => ({
    player: player.slug,
  }));
}

// Generate dynamic metadata for each player
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { player: slug } = await params;
  const player = playersBySlug[slug.toLowerCase()];

  if (!player) {
    return {
      title: "Player Not Found",
    };
  }

  return {
    title: `${player.name} - ${player.role}`,
    description: player.bio,
    openGraph: {
      title: `${player.name} | ${siteConfig.name}`,
      description: player.subtitle,
      images: [
        {
          url: player.image,
          width: 800,
          height: 800,
          alt: player.name,
        },
      ],
    },
  };
}

export default async function PlayerPage({ params }: Props) {
  const { player: slug } = await params;
  const player = playersBySlug[slug.toLowerCase()];

  if (!player) {
    notFound();
  }

  return <PlayerProfile player={player} />;
}
