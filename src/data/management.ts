export type ManagementMember = {
  id: string;
  name: string;
  role: string;
};

export const management: ManagementMember[] = [
  {
    id: "tapio",
    name: "Tapio Salomaa",
    role: "CEO",
  },
  {
    id: "aleksi",
    name: "Aleksi Kaikkonen",
    role: "Head Coach",
  },
];
