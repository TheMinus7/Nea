"use client";

import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import SnowLayer from "@/components/SnowLayer";
import FooterNote from "@/components/FooterNote";
import { GALLERY } from "@/data/gallery";

export default function Home() {
  return (
    <main>
      <SnowLayer enabled={true} />
      <Header />
      <Gallery items={GALLERY} />
      <FooterNote />
    </main>
  );
}
