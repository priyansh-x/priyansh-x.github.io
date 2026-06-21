// Bilingual content + shared data for the site

export type Lang = "en" | "hi";

export const projects = [
  {
    name: "DevStats",
    status: "shipped",
    descEn: "Telemetry and leaderboard for AI coding tools. Track tokens, sessions and streaks across Claude Code, Cursor, Codex, Windsurf and Antigravity. Private by default.",
    descHi: "AI कोडिंग टूल्स के लिए टेलीमेट्री और लीडरबोर्ड। Claude Code, Cursor, Codex, Windsurf और Antigravity में टोकन, सेशन और स्ट्रीक ट्रैक करें। डिफ़ॉल्ट रूप से प्राइवेट।",
    url: "https://github.com/priyansh-x/devstats",
    longDescEn: "DevStats is a telemetry and leaderboard platform for AI coding tools. It tracks tokens, sessions and streaks across Claude Code, Cursor, Codex, Windsurf and Antigravity. Everything is private by default. Built with Next.js and TypeScript.",
    longDescHi: "DevStats AI कोडिंग टूल्स के लिए एक टेलीमेट्री और लीडरबोर्ड प्लेटफ़ॉर्म है। यह Claude Code, Cursor, Codex, Windsurf और Antigravity में टोकन, सेशन और स्ट्रीक ट्रैक करता है। सब कुछ डिफ़ॉल्ट रूप से प्राइवेट है। Next.js और TypeScript से बना।",
  },
  {
    name: "Sloppy",
    status: "shipped",
    descEn: "Your feed, generated not curated. Sloppy is an AI video social platform that builds a personalised stream from scratch. No follower graphs, no engagement bait, just content that fits where you are right now.",
    descHi: "आपका फ़ीड, क्यूरेट नहीं, जनरेट किया हुआ। Sloppy एक AI वीडियो सोशल प्लेटफ़ॉर्म है जो आपकी पर्सनलाइज़्ड स्ट्रीम शून्य से बनाता है। न फ़ॉलोअर ग्राफ़, न एंगेजमेंट बेट, बस वही कंटेंट जो आपकी अभी की जगह से मेल खाए।",
    url: "https://github.com/priyansh-x/sloppy-reels",
    longDescEn: "Sloppy is an AI video social platform that generates your feed instead of curating it. It builds a personalised stream from scratch with no follower graphs and no engagement bait. Just content that fits where you are right now.",
    longDescHi: "Sloppy एक AI वीडियो सोशल प्लेटफ़ॉर्म है जो आपके फ़ीड को क्यूरेट करने की बजाय जनरेट करता है। यह बिना फ़ॉलोअर ग्राफ़ और बिना एंगेजमेंट बेट के शून्य से एक पर्सनलाइज़्ड स्ट्रीम बनाता है।",
  },
  {
    name: "Mnemos",
    status: "shipped",
    descEn: "An interactive application that transforms audio onsets into rhythmic spikes inside an E/I neural network, visualised live through synced rasters, traces and browser animations.",
    descHi: "एक इंटरैक्टिव ऐप्लिकेशन जो ऑडियो ऑनसेट्स को E/I न्यूरल नेटवर्क के अंदर लयबद्ध स्पाइक्स में बदलता है, सिंक्ड रास्टर्स, ट्रेसेस और ब्राउज़र एनिमेशन के ज़रिए लाइव विज़ुअलाइज़्ड।",
    url: "https://github.com/priyansh-x/Mnemos",
    longDescEn: "Mnemos is an interactive application that transforms audio onsets into rhythmic spikes inside an excitatory/inhibitory neural network. The simulation is visualised live through synced raster plots, voltage traces and browser animations.",
    longDescHi: "Mnemos एक इंटरैक्टिव ऐप्लिकेशन है जो ऑडियो ऑनसेट्स को एक एक्साइटेटरी/इनहिबिटरी न्यूरल नेटवर्क के अंदर लयबद्ध स्पाइक्स में बदलता है। सिमुलेशन सिंक्ड रास्टर प्लॉट्स, वोल्टेज ट्रेसेस और ब्राउज़र एनिमेशन के ज़रिए लाइव विज़ुअलाइज़ किया जाता है।",
  },
] as const;

export const posts = [
  {
    slug: "the-chinese-farmer",
    titleEn: "The Chinese Farmer",
    titleHi: "चीनी किसान की कहानी",
    year: "2025",
    date: "2026-05-23",
  },
  {
    slug: "trekking-everest-base-camp",
    titleEn: "Trekking Everest Base Camp",
    titleHi: "एवरेस्ट बेस कैंप ट्रेक",
    year: "2025",
    date: null,
  },
] as const;

export const postContent: Record<string, string[]> = {
  "the-chinese-farmer": [
    "There is an old story about a Chinese farmer that I keep coming back to.",
    "The farmer lived with his only son, and together they worked their land with one horse. One day, the son forgot to lock the stable, and the horse ran away. The neighbours came by and said, what terrible luck. The farmer said, maybe yes, maybe no.",
    "The next day, the horse returned with six wild horses. The neighbours came by and said, what wonderful luck. The farmer said, maybe yes, maybe no.",
    "The day after that, the son was trying to break in one of the wild horses, fell, and broke his leg. The neighbours came by and said, what terrible luck. The farmer said, maybe yes, maybe no.",
    "The next day, soldiers arrived to draft every young man in the village into a war they were almost certain to die in. They passed over the son because of his broken leg. The neighbours came by and said, what wonderful luck. The farmer said, maybe yes, maybe no.",
    "That is the whole story. Nothing fancy, no big reveal at the end.",
    "What I take from it is pretty simple. We almost never know what something means in the moment. The thing that feels like a disaster today often turns out to be the reason something good happens later, and the thing that feels like a win sometimes sets up a problem we did not see coming. We are very confident, very fast, about labelling events good or bad, and most of the time we are just guessing.",
    "I keep returning to this story whenever something happens in my life that feels heavy. A rejection, a plan falling apart, something not going the way I wanted it to. And every time, I remind myself that I genuinely do not know yet. It is not good. It is not bad. It is just a thing that happened, and life still has to play out.",
    "There is a strange freedom in that. If I cannot really tell whether something is good or bad in the moment, then the most reasonable thing I can do is stay steady, stay curious, and assume it is all going to work out in some form I cannot see yet. Not in a forced, fake positive way. More like a quiet trust that the story is not over.",
    "So whenever something happens, good or bad, I try to remember the farmer and say to myself, maybe yes, maybe no. And then I keep going.",
  ],
  "trekking-everest-base-camp": [],
};


export const quotes = [
  { textEn: "The only way to do great work is to love what you do.", textHi: "महान काम करने का एकमात्र तरीका है, जो आप करते हैं उससे प्रेम करना।", author: "Steve Jobs" },
  { textEn: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.", textHi: "जो आपको सबसे ज़्यादा रुचिकर लगे, उसे सबसे अनुशासनहीन, बेधड़क और मौलिक तरीक़े से पढ़ें।", author: "Richard Feynman" },
  { textEn: "Make something people want.", textHi: "ऐसा कुछ बनाओ जो लोग चाहते हों।", author: "Paul Graham" },
  { textEn: "The best time to plant a tree was 20 years ago. The second best time is now.", textHi: "पेड़ लगाने का सबसे अच्छा समय 20 साल पहले था। दूसरा सबसे अच्छा समय अभी है।", author: "Chinese Proverb" },
  { textEn: "You can't connect the dots looking forward.", textHi: "आगे देखते हुए आप बिंदुओं को नहीं जोड़ सकते।", author: "Steve Jobs" },
] as const;

export const t = {
  fullName: { en: "Priyansh Joshi", hi: "प्रियांश जोशी" },
  belovedPart: { en: "beloved part", hi: "प्रिय अंश" },
  belovedMeaning: {
    en: "* Priyansh (प्रिय) = beloved, Ansh (अंश) = part",
    hi: "* प्रिय = beloved, अंश = part",
  },
  bioBeforeBits: {
    en: "First-year electrical engineering student at ",
    hi: "",
  },
  bitsLink: { en: "BITS Pilani", hi: "BITS पिलानी" },
  bioAfterBits: {
    en: ". Currently a generalist intern at ",
    hi: " में इलेक्ट्रिकल इंजीनियरिंग का प्रथम वर्ष का छात्र। फ़िलहाल ",
  },
  samoraLink: { en: "Samora AI (YC W26)", hi: "Samora AI (YC W26)" },
  bioSamoraDesc: {
    en: ", building AI agents that automate enterprise workflows. Also working in capital advisory and tech at ",
    hi: " में जनरलिस्ट इंटर्न, एंटरप्राइज़ वर्कफ़्लो को ऑटोमेट करने वाले AI एजेंट्स बना रहा हूँ। साथ ही ",
  },
  conquestLink: { en: "Conquest", hi: "Conquest" },
  bioAfterConquest: {
    en: ", India's largest student-run startup accelerator.",
    hi: ", भारत के सबसे बड़े छात्र-संचालित स्टार्टअप एक्सेलरेटर, में कैपिटल एडवाइज़री और टेक पर काम कर रहा हूँ।",
  },
  bioSeeStart: { en: "See my ", hi: "मेरे " },
  projectsLink: { en: "projects", hi: "प्रोजेक्ट्स" },
  bioMid: { en: ", read ", hi: " देखें, " },
  logxLink: { en: "LogX", hi: "LogX" },
  bioEnd: { en: ", or ", hi: " पढ़ें, या " },
  contactLink: { en: "get in touch", hi: "संपर्क करें" },
  bioFinal: { en: ".", hi: "।" },
  sectionAbout: { en: "About", hi: "परिचय" },
  aboutPara: {
    en: "I'm fascinated by the future, what technology is about to make possible, and who gets to shape it. Today I'm learning AI and building with it. But what started everything was rockets: the sheer ambition of the thing. I play sport to stay sane, learn to stay curious, and I trekked to Everest Base Camp with my dad because some things you just have to go do. I care about geopolitics for the same reason I care about tech. The world is being written right now, and I'd rather understand it than watch it happen.",
    hi: "मैं भविष्य से मोहित हूँ, कि तकनीक अभी क्या मुमकिन करने वाली है, और उसे आकार देने का मौक़ा किसे मिलेगा। आज मैं AI सीख रहा हूँ और उससे बना रहा हूँ। लेकिन सब कुछ शुरू हुआ था रॉकेट्स से, उस चीज़ की निरी महत्वाकांक्षा से। मैं खेल खेलता हूँ ख़ुद को संतुलित रखने के लिए, सीखता हूँ जिज्ञासा बनाए रखने के लिए, और अपने पिताजी के साथ एवरेस्ट बेस कैंप तक ट्रेक किया क्योंकि कुछ चीज़ें बस करनी पड़ती हैं। मुझे जियोपॉलिटिक्स की परवाह उसी वजह से है जिस वजह से तकनीक की। दुनिया अभी लिखी जा रही है, और मैं उसे देखने के बजाय समझना पसंद करूँगा।",
  },
  sectionProjects: { en: "Projects", hi: "प्रोजेक्ट्स" },
  sectionWriting: { en: "LogX", hi: "LogX" },
  writingSub: {
    en: "Unfiltered writing. Personal, technical, and everything in between.",
    hi: "बिना फ़िल्टर के लेखन। निजी, तकनीकी, और बीच का सब कुछ।",
  },
  resume: { en: "resume", hi: "रिज़्यूमे" },
  toggleLabel: { en: "हिंदी", hi: "English" },
  viewAll: { en: "view all →", hi: "सब देखें →" },
  comingSoon: { en: "coming soon", hi: "जल्द आ रहा है" },
  back: { en: "← back", hi: "← वापस" },
  location: { en: "Bangalore", hi: "बेंगलुरु" },
} as const;
