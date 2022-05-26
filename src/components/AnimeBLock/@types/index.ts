export type TAnimeBlock = {
  posts: TPosts;
  removeButton?: boolean;
  verticalView?: boolean;
};

export type TPosts = {
  id: number;
  bannerImage: string;
  title: { english: string; native: string };
}[];

export type TPost = {
  id: number;
  bannerImage: string;
  title: { english: string; native: string };
};
