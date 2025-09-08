import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/herosection";

export default function Home() {
  return (
    <div className="h-full w-full bg-[#121212]">
      <Navbar />
      <HeroSection />
    </div>
  );
}
