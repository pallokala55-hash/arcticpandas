export type ManagementMember = {
  id: string;
  name: string;
  role: string;
  image?: string;
};

export const management: ManagementMember[] = [
  {
    id: "tapio",
    name: "Tapio Salomaa",
    role: "CEO",
    image: "/Tapsa%20promo.mov",
  },
  {
    id: "aleksi",
    name: "Aleksi Kaikkonen",
    role: "Head Coach",
    image: "/Hiivapromo.mp4",
  },
];
