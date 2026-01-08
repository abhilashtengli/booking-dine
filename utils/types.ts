export type Restaurant = {
  name: string;
  seats: number;
  image: string; // URL
  address: string;
  opening: string;
  closing: string;
};

export type CarouselItem = {
  [x: string]: any;
  images: string[]; // array of image URLs
  res_id: string; // route or restaurant id
};

export type SlotItem = {
  ref_id: `/restaurants/${string}`;
  slot: string[];
};


