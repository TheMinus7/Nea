export type GalleryItem = {
  id: string;
  title: string;
  note?: string;
  images: { src: string; title?: string; alt?: string; note?: string; igUrl?: string }[];
};

export const GALLERY: GalleryItem[] = [
  {
    id:"amazing",
    title: "Баяр хөөр, аз жаргал шиг",
    note: "Энэ зургийг Story-г нь хараад айймр их баярлаж байж билээ hh. Яагаад ч юм өөр юм бодогдохгүй эргэн тойро алслагдаал, дээгүүр дүүлж байгаа юм шиг л. Миний хувьд их үнэтэй 2 зураг юм байгаан. Энэ хоёр зураг миний хувьд түр зогс гэсэн товч шиг.Амьдралын дунд гэнэт баяр хөөр сануулдаг агшин.",
    images:[
      { src: "/photos/9.png", alt: "9", note: "", igUrl: "" },
      { src: "/photos/40.PNG", alt: "40", note: "", igUrl: "" }
    ]
  },
  {
    id:"shock",
    title: "Баярлалт",
    note: "Энэ story-г нь бас хараад их баярлаж байсийн hh. Ашгүй ойр ойрхон уулзаж чадах нь УРА УРА гээл хаха.",
    images:[
      { src: "/photos/33.PNG", alt: "33", note: "", igUrl: "" }
    ]
  },
  {
    id: "baigaliin-saihan-gej-gaihaltaishuu",
    title: "Байгалийн сайхан гэж гайхалтайшүү",
    note: "Байгалийн сайханд өөрийн сайхныг гайхуулах гэж байгаа юм шиг л зургууд юмаа тэ hh\n\nэнэ story-г нь хараад за ингээд нэг юм ойр ойрхон уулзаж чаддаг нь дээ гэж их баярлаж байж билээ. Харин ирээдүйд хамтдаа ийм дурсамж бүтээж магадгүй юм тэ hh",
    images: [
      { src: "/photos/19.png", alt: "19", note: "", igUrl: "" },
      { src: "/photos/11.JPG", alt: "11", note: "", igUrl: "" },
      { src: "/photos/8.png", alt: "8", note: "", igUrl: "" },
      { src: "/photos/15.png", alt: "15", note: "", igUrl: "" },
    ],
  },
  {
    id: "erhluulmeer",
    title: "Эрхлүүлээд баймаар",
    note: "Энэ эхний зургийг хараа hh, энэ чатыг би байнга хардийшд хх аймар хөөрхөн \"Odoo tsonh gej aahgu\" гээл. бас энэ зургийг нь харахаар толгойг нь илээд, тэврээд баймаар hh. Энэ зургуудыг харахаар толгойг нь илээд, \зүгээр ээ\ гэж хэлээд, багахан эрхлүүлмээр санагддаг. Ямар ч шалтгаангүйгээр. Хэзээ нэг өдөр яг ингэж зургийг нь харах биш, яг дэргэд нь суугаад эрхлүүлж чадвал гоё л санагдсан.",
    images: [
      { src: "/photos/27.jpg", alt: "27", note: "", igUrl: "" },
      { src: "/photos/1.png", alt: "1", note: "", igUrl: "" },
      { src: "/photos/3.png", alt: "3", note: "", igUrl: "" },
      { src: "/photos/5.png", alt: "5", note: "", igUrl: "" },
      { src: "/photos/6.PNG", alt: "6", note: "", igUrl: "" },
      { src: "/photos/17.PNG", alt: "17", note: "", igUrl: "" },
      { src: "/photos/18.PNG", alt: "18", note: "", igUrl: "" },
      { src: "/photos/22.png", alt: "22", note: "", igUrl: "" },
      { src: "/photos/23.png", alt: "23", note: "", igUrl: "" },

    ],
  },
  {
    id: "kue-neeree-mundag-ohin-shuu",
    title: "Күэ нэрээ мундаг охин шүү",
    note: "Ийм жooхoн байхад нь л за энэ хүнийг л авч суунадаа гэж бодож байж билээ hh\n\nжич: одоо ч жooхoн. Жooхoн ч гэлээ, дотор нь маш их зүйл багтдаг хүн шиг санагддаг.",
    images: [
      { src: "/photos/2.JPG", alt: "2", note: "", igUrl: "" },
      { src: "/photos/34.JPEG", alt: "3", note: "", igUrl: "" },
      { src: "/photos/35.JPEG", alt: "4", note: "", igUrl: "" },
      { src: "/photos/30.JPG", alt: "30", note: "", igUrl: "" },
      { src: "/photos/31.JPG", alt: "31", note: "", igUrl: "" },
    ],
  },
  {
    id: "angel",
    title: "Аngel",
    note: "Күэ нэрээ энэ хараад байгаарай бараг angel юм бишүү, яая гэж байгаан намайг ухаан алдчихоо гээд байгаа юм шиг л, яахаараа ийм хөөрхөн байдаг байнаа. Заримдаа хүн гоё харагддаг болохоор биш, зүгээр л байгаагаараа тайвшруулдаг. Хэтэрхий гоё гэдгийг нь магтахаас илүү, хэтэрхий дулаахан гэдгийг нь л хэлмээр санагдсан.",
    images: [
      { src: "/photos/7.PNG", alt: "7", note: "", igUrl: "" },
      { src: "/photos/4.png", alt: "4", note: "", igUrl: "" },
      { src: "/photos/20.png", alt: "20", note: "", igUrl: "" },
      { src: "/photos/21.png", alt: "21", note: "", igUrl: "" },
      { src: "/photos/24.JPG", alt: "24", note: "", igUrl: "" },
    ],
  },
  {
    id: "notification",
    title: "Notification",
    note: "Яг энэ notification намайг 24/7 хүлээлгэж байгааоо hh, энэ notification-ийг харахаар ямар их баярладаг гэдгийг чи мэддэг ч болоосой hh.",
    images: [
      { src: "/photos/28.PNG", alt: "28", note: "", igUrl: "" },
      { src: "/photos/29.jpg", alt: "29", note: "", igUrl: "" },
      { src: "/photos/32.jpg", alt: "32", note: "", igUrl: "" },
    
    ],
  },
];
