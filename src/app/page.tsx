import { Hero } from "@/sections/Hero";
import { NexumIntro } from "@/sections/NexumIntro";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Projects } from "@/sections/Projects";
import { RenderVsReality } from "@/sections/RenderVsReality";
import { Alliance } from "@/sections/Alliance";
import { NexumFinale } from "@/sections/NexumFinale";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <NexumIntro />
      <Services />
      <Process />
      <Projects />
      <RenderVsReality />
      <Alliance />
      <NexumFinale />
      <Contact />
    </>
  );
}
