"use client";

import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeProjects } from "@/components/sections/home/HomeProjects";
import { HomeStack } from "@/components/sections/home/HomeStack";
import { HomeAbout } from "@/components/sections/home/HomeAbout";
import { HomeContact } from "@/components/sections/home/HomeContact";
import { HomeFooter } from "@/components/sections/home/HomeFooter";

export default function Home() {
  return (
    <div className="scroll-smooth portfolio-base portfolio-text font-sans">
      <HomeHero />
      <HomeProjects />
      <HomeStack />
      <HomeAbout />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}