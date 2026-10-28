export const COUPLE = {
  bride: "Nazila",
  groom: "Aqib",
  shortName: "Nazila & Aqib",
  monogram: ["N", "A"],
};

export const BISMILLAH = "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

export const INVITATION_CARD = {
  filename: "nazila-aqib-nikah-invitation.png",
};

export const HERO = {
  subtitle: "Together with our beloved families",
  invitation: "Request the honour of your presence at our Nikah.",
  ceremony: "Nikah Ceremony",
  closingLine: "Your presence and heartfelt duas will be our greatest blessing.",
};

export const QURAN_VERSE = {
  arabic:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  english:
    "And among His signs is that He created for you spouses from among yourselves that you may find tranquility in one another, and He placed between you affection and mercy.",
  malayalam:
    "നിങ്ങൾക്ക് സമാധാനപൂർവ്വം ഒത്തുചേരേണ്ടതിനായി നിങ്ങളിൽ നിന്ന് തന്നെ നിങ്ങൾക്ക് ഇണകളെ സൃഷ്ടിക്കുകയും, നിങ്ങൾക്കിടയിൽ സ്നേഹവും കാരുണ്യവും ഉണ്ടാക്കുകയും ചെയ്തതും അവന്റെ ദൃഷ്ടാന്തങ്ങളിൽ പെട്ടതത്രെ.",
  reference: "Surah Ar-Rum (30:21)",
  referenceMalayalam: "സൂറത്തു റൂം (30:21)",
};

export const CLOSING_MESSAGE = "Your presence and duas will make our day truly special.";

export const FOOTER = {
  family: "With Love & Warm Regards",
};

export const EVENT = {
  date: "Monday, 28 December 2026",
  dateDay: "Monday",
  dateNumber: "28",
  dateMonthYear: "December 2026",
  nikahTime: "11:30 AM",
  countdownTarget: "2026-12-28T11:30:00",
  venue: "Milan International Convention Centre",
  address: "Chettuva, Thrissur",
  // search links resolve the venue by name, so no coordinates to keep in sync
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Milan+International+Convention+Centre+Chettuva+Thrissur",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Milan+International+Convention+Centre+Chettuva+Thrissur&z=15&output=embed",
};

export const CONTACTS = {
  familyContact: "+91 9645755777",
  whatsApp: "+91 7510644714",
};

export const RSVP = {
  dua: `Assalamu Alaikum! Sending heartfelt duas and congratulations to ${COUPLE.shortName} on their Nikah. May Allah bless your union.`,
};

export const LOCATION = {
  qrCaption: "Scan to navigate directly to the venue.",
  mapsButton: "Open in Google Maps",
};

export const CALENDAR = {
  title: `Nikah — ${COUPLE.shortName}`,
  description: `You are invited to witness and celebrate the blessed Nikah of ${COUPLE.shortName}.`,
  location: `${EVENT.venue}, ${EVENT.address}`,
  start: "20261228T113000",
  end: "20261228T143000",
  timezone: "Asia/Kolkata",
};

export const AUDIO = {
  sources: [
    { src: "/audio/wedding-nasheed.webm", type: "audio/webm" },
    { src: "/audio/wedding-nasheed.mp3", type: "audio/mpeg" },
  ],
  volume: 0.35,
};
