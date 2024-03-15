export type Tdata = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

export type Image = Tdata & {
  value: number;
};
