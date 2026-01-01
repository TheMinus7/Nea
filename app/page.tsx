"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import SnowLayer from "@/components/SnowLayer";
import FooterNote from "@/components/FooterNote";
import { GALLERY } from "@/data/gallery";

export default function Home() {
  const [snowOn, setSnowOn] = useState(true);

  return (
    <main>
      <SnowLayer enabled={snowOn} />
      <Header snowOn={snowOn} onToggleSnow={() => setSnowOn((v) => !v)} />
      <Gallery items={GALLERY} />
      <FooterNote />
    </main>
  );
}
