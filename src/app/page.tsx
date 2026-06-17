import Hero from "./components/HeroSection";
import Metrics from "./components/Metrics";
import HomepageSections from "./components/HomepageSections";

export default function Home() {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <main id="home" className="flex flex-col">
        <Hero />
        <Metrics />
        <HomepageSections />
      </main>
    </div>
  );
}
