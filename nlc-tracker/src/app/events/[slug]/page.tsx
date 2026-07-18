import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventHeader from "@/components/event/EventHeader";
import EventView from "@/components/event/EventView";
import { events, getEventBySlug } from "@/data/events";
import { getEventMatches } from "@/data/matches";
import { computeStandings } from "@/lib/standings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  return { title: event?.name ?? "Event not found" };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const matches = getEventMatches(event.id);
  const standings = computeStandings(matches, event.teamIds);

  return (
    <>
      <EventHeader event={event} />
      <EventView event={event} matches={matches} standings={standings} />
    </>
  );
}
