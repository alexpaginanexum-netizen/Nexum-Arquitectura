import { Hero } from "@/sections/Hero";
import { NexumIntro } from "@/sections/NexumIntro";
import { Services } from "@/sections/Services";
import { Projects } from "@/sections/Projects";
import { Alliance } from "@/sections/Alliance";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <NexumIntro />
      <Services />
      <Projects />
      <Alliance />
      <Contact />
    </>
  );
}
