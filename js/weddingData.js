/**
 * Centralized Wedding Configuration Data — Anu & Alan
 * Customized for the Betrothal celebration on October 19, 2026.
 */

const weddingData = {
  // Couple Details with User's Provided Real Photograph
  groom: {
    name: "ALAN",
    fullName: "ALAN",
    parents: "S/o Mrs. deepa salo & Mr. salo george",
    bio: "An architect who finds beauty in timeless structures, classical music, and quiet moments.",
    image: "assets/couple_real.jpg"
  },
  bride: {
    name: "ANU",
    fullName: "ANU",
    parents: "D/o Mrs. sajy tony & Mr. tony jose",
    bio: "A designer passionate about art, poetry, and bringing warmth into every space.",
    image: "assets/couple_real.jpg"
  },

  // Main Event Date & Countdown Configuration — October 19, 2026
  weddingDate: {
    dayName: "MONDAY",
    day: "19",
    month: "OCTOBER",
    year: "2026",
    fullFormatted: "October 19, 2026",
    isoDate: "2026-10-19T10:00:00+05:30",
    calendarMonth: 9, // 9 = October (0-indexed)
    calendarYear: 2026
  },

  // Hero Section Header & Quotes
  hero: {
    heading: "ANU & ALAN",
    subheading: "TWO HEARTS • ONE JOURNEY • A LIFETIME TOGETHER",
    quote: "With hearts full of love, we invite you to be part of the beginning of our forever.",
    photo: "assets/couple_real.jpg",
    video: "assets/couple_video.mp4",
    hasVideo: true
  },

  // Opening Cover Banner Text
  cover: {
    topHeader: "TOGETHER WITH OUR FAMILIES",
    invitedText: "WE JOYFULLY INVITE YOU TO CELEBRATE THE BETROTHAL OF",
    monogram: "A | A",
    subtitle: "THE BEGINNING OF FOREVER",
    groomName: "Alan",
    brideName: "Anu",
    dateText: "19 OCTOBER 2026",
    sideLeft: "TWO HEARTS ONE JOURNEY",
    sideRight: "A BEAUTIFUL CELEBRATION AWAITS",
    tagline: "A BEAUTIFUL CELEBRATION AWAITS",
    buttonText: "OPEN INVITATION →"
  },

  // 3 Separate Full-Screen Event Pages Configuration
  eventPages: {
    sangeet: {
      title: "SANGEET NIGHT",
      day: "SATURDAY",
      dateNum: "17",
      monthYear: "OCTOBER 2026",
      time: "6:00 PM ONWARDS",
      location: "OUR HOME",
      photo: "assets/sangeet_night.png",
      mapsUrl: "#"
    },
    betrothal: {
      title: "BETROTHAL",
      day: "MONDAY",
      dateNum: "19",
      monthYear: "OCTOBER 2026",
      massTime: "3:30 PM",
      massChurch: "St. Antony’s Forane Church, Pudukad",
      ceremonyTime: "6:00 PM",
      ceremonyHall: "Zion Parish Hall",
      photo: "assets/betrothal_ceremony.png",
      mapsUrl: "#"
    },
    marriage: {
      title: "MARRIAGE",
      day: "SATURDAY",
      dateNum: "31",
      monthYear: "OCTOBER 2026",
      massTime: "3:00 PM",
      massChurch: "St. Sebastian’s Catholic Church, Mutholapuram",
      ceremonyTime: "7:00 PM",
      ceremonyHall: "Jacobs Entertainments Convention Center & Health Park, Pandapilly, Muvattupuzha",
      photo: "assets/marriage_ceremony.png",
      mapsUrl: "#"
    }
  },

  // Page 6: Cinematic Parallax Couple Photo Banner
  cinematicBanner: {
    line1: "AND SO,",
    line2: "OUR FOREVER",
    line3: "BEGINS.",
    monogram: "A & A",
    photo: "assets/couple_real.jpg"
  },

  // Page 7 & Page 8: Event Details & Venues
  events: [
    {
      id: "ceremony",
      title: "BETROTHAL CEREMONY",
      time: "10:00 AM",
      timeFormatted: "10:00 AM - 12:30 PM",
      dateFormatted: "Monday, October 19, 2026",
      venue: "St. Regis Grand Cathedral",
      address: "5th Avenue & 55th Street, New York, NY 10022",
      description: "Join us as we celebrate our sacred betrothal blessing surrounded by loved ones.",
      googleMapsUrl: "https://maps.google.com/?q=St.+Regis+Grand+Cathedral+New+York",
      mapImage: "https://images.unsplash.com/photo-1548625361-18548364b63e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "reception",
      title: "RECEPTION",
      time: "07:00 PM",
      timeFormatted: "07:00 PM Onwards",
      dateFormatted: "Monday, October 19, 2026",
      venue: "The Royal Crystal Ballroom",
      address: "Grand Palace Estate, 100 Boulevard Road, New York, NY",
      description: "An elegant evening of fine dining, celebratory toasts, dancing, and joyful memories.",
      googleMapsUrl: "https://maps.google.com/?q=The+Royal+Crystal+Ballroom+New+York",
      mapImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
    }
  ],

  // Page 9: Dress Code Info
  dressCode: {
    title: "DRESS CODE",
    quote: '"FORMAL WITH A TOUCH OF ELEGANCE"',
    description: "We invite our honored guests to join us in elegant dark formal attire, black-tie tuxedos, floor-length gowns, or luxury traditional wear.",
    colors: [
      { name: "Deep Burgundy", hex: "#5A0712" },
      { name: "Midnight Black", hex: "#050505" },
      { name: "Crimson Red", hex: "#7D0B18" },
      { name: "Champagne Gold", hex: "#D4AF6A" },
      { name: "Warm Ivory", hex: "#F4EBDD" }
    ]
  },

  // Page 10: Asymmetric Masonry Editorial Photo Gallery
  gallery: [
    {
      url: "assets/couple_real.jpg",
      caption: "Eternal Vows & Starlight",
      class: "masonry-large-portrait"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000",
      caption: "Golden Hour Romance",
      class: "masonry-small-square"
    },
    {
      url: "assets/couple_real.jpg",
      caption: "Whispered Promises",
      class: "masonry-tall"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1400",
      caption: "The Beginning of Forever",
      class: "masonry-wide"
    },
    {
      url: "assets/couple_real.jpg",
      caption: "Intimate Elegance",
      class: "masonry-small-square"
    },
    {
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1000",
      caption: "Sacred Ring Details",
      class: "masonry-detail"
    }
  ],

  // Page 12: Music Settings & Track Info
  music: {
    title: "A SONG FOR OUR CELEBRATION",
    subtitle: "Soft Wedding Piano & Violin Serenade",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-113247.mp3",
    autoPlayAfterOpening: true
  },

  // Page 14: Final Message
  finalMessage: {
    monogram: "A | A",
    subtitle: "THE BEGINNING OF FOREVER",
    names: "ANU & ALAN",
    date: "19 • 10 • 2026",
    thankYou: "THANK YOU FOR BEING PART OF OUR CELEBRATION.",
    closingSignoff: "Join us and let’s celebrate together!"
  }
};

if (typeof module !== 'undefined') {
  module.exports = weddingData;
}
