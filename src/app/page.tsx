import SiteNav from "@/components/ui/SiteNav";
import { ScrollProgress } from "@/components/ui/Motion";
import OpeningScreen from "@/components/sections/OpeningScreen";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Invitation from "@/components/sections/Invitation";
import EventDetails from "@/components/sections/EventDetails";
import Location from "@/components/sections/Location";
import Rsvp from "@/components/sections/Rsvp";
import Closing from "@/components/sections/Closing";
import Marquee from "@/components/ui/Marquee";
import LocationJump from "@/components/ui/LocationJump";
import MusicToggle from "@/components/ui/MusicToggle";
import MusicProvider from "@/components/providers/MusicProvider";

export default function Home() {
  return (
    <MusicProvider>
      <main>
        <OpeningScreen />
        <ScrollProgress />
        <SiteNav />
        {/* the first screen: hero fills the viewport down to the ribbon */}
        <div className="flex min-h-dvh flex-col">
          <Hero />
          <Marquee />
        </div>
        <Countdown />
        <Invitation />
        <EventDetails />
        <Location />
        <Rsvp />
        <Closing />
      </main>

      <div className="fixed right-3 bottom-3 z-[90] flex flex-col-reverse gap-2 sm:right-4 sm:bottom-4 sm:gap-3 print:hidden">
        <LocationJump />
        <MusicToggle />
      </div>
    </MusicProvider>
  );
}
