export type GalleryItem = {
  id: string;
  title: string;
  note?: string;
  images: { src: string; alt?: string; note?: string; igUrl?: string }[];
};

export const GALLERY: GalleryItem[] = [
  {
    id: "winter-1",
    title: "Baigaliin saihand ooriin saihniig bisheej bui ni",
    note: "",
    images: [
      {
        src: "/photos/1.png",
        alt: "1",
        note: "",
        igUrl: "",
      },
      {
        src: "/photos/3.png",
        alt: "3",
        note: "",
        igUrl: "",
      },
      {
        src: "/photos/4.png",
        alt: "4",
        note: "",
        igUrl: "",
      },
    ],
  },
  {
    id: "winter-2",
    title: "Zuvhun chi l meddeg dulaahan agshin",
    note: "",
    images: [
      {
        src: "/photos/5.png",
        alt: "5",
        note: "",
        igUrl: "",
      },
      {
        src: "/photos/6.PNG",
        alt: "6",
        note: "",
        igUrl: "",
      },
    ],
  },
];
