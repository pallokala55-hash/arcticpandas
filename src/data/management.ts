export type ManagementMember = {
  id: string;
  name: string;
  role: string;
  image?: string;
  note?: string;
};

export const management: ManagementMember[] = [
  {
    id: "tapio",
    name: "Tapio Salomaa",
    role: "CEO",
    image: "/portraits/tapio-cropped.webp",
  },
  {
    id: "aleksi",
    name: "Aleksi ‘Hiiva’ Kaikkonen",
    role: "Head Coach",
    image: "/portraits/aleksi-cropped.webp",
  },
];
