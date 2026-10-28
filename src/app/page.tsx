import SiteNav from "@/components/ui/SiteNav";
import OpeningScreen from "@/components/sections/OpeningScreen";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Invitation from "@/components/sections/Invitation";
import EventDetails from "@/components/sections/EventDetails";
import Location from "@/components/sections/Location";
import Rsvp from "@/components/sections/Rsvp";
import Closing from "@/components/sections/Closing";
import Marquee from "@/components/ui/Marquee";
import FloatingPetals from "@/components/ui/FloatingPetals";
import LocationJump from "@/components/ui/LocationJump";
import MusicToggle from "@/components/ui/MusicToggle";
import MusicProvider from "@/components/providers/MusicProvider";

export default function Home() {
  return (
    <MusicProvider>
      <main className="page-canvas">
        <OpeningScreen />
        <SiteNav />
        <Hero />
        <Marquee />
        <Countdown />
        <Invitation />
        <EventDetails />
        <Location />
        <Rsvp />
        <Closing />
        <FloatingPetals />
      </main>

      <div className="fixed right-4 bottom-4 z-[90] flex flex-col-reverse gap-3 print:hidden">
        <LocationJump />
        <MusicToggle />
      </div>
    </MusicProvider>
  );
}
