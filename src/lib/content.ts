// Bilingual content + shared data for the site

export type Lang = "en" | "hi";

export const projects = [
  {
    name: "Sloppy",
    status: "active",
    descEn: "Your feed, generated not curated. Sloppy is an AI video social platform that builds a personalised stream from scratch — no follower graphs, no engagement bait, just content that fits where you are right now.",
    descHi: "आपका फ़ीड — क्यूरेट नहीं, जनरेट किया हुआ। Sloppy एक AI वीडियो सोशल प्लेटफ़ॉर्म है जो आपकी पर्सनलाइज़्ड स्ट्रीम शून्य से बनाता है — न फ़ॉलोअर ग्राफ़, न एंगेजमेंट बेट, बस वही कंटेंट जो आपकी अभी की जगह से मेल खाए।",
    url: "https://github.com/priyansh-x/sloppy-reels",
  },
  {
    name: "Mnemos",
    status: "shipped",
    descEn: "An interactive application that transforms audio onsets into rhythmic spikes inside an E/I neural network, visualised live through synced rasters, traces, and browser animations.",
    descHi: "एक इंटरैक्टिव ऐप्लिकेशन जो ऑडियो ऑनसेट्स को E/I न्यूरल नेटवर्क के अंदर लयबद्ध स्पाइक्स में बदलता है — सिंक्ड रास्टर्स, ट्रेसेस और ब्राउज़र एनिमेशन के ज़रिए लाइव विज़ुअलाइज़्ड।",
    url: "https://github.com/priyansh-x/Mnemos",
  },
  {
    name: "Novus",
    status: "active",
    descEn: "Predict the whole-brain neural response to a video — second by second — before publishing it. Built on Meta FAIR's TRIBE v2 brain-encoding foundation model.",
    descHi: "किसी वीडियो की पूरे-ब्रेन न्यूरल प्रतिक्रिया का पूर्वानुमान करें — सेकंड दर सेकंड — पब्लिश करने से पहले। Meta FAIR के TRIBE v2 ब्रेन-एन्कोडिंग फ़ाउंडेशन मॉडल पर बना।",
    url: "https://github.com/priyansh-x/Novus",
  },
] as const;

export const posts = [
  {
    slug: "first-year-at-bits-pilani",
    titleEn: "First year at BITS Pilani",
    titleHi: "BITS पिलानी का पहला साल",
    year: "2025",
  },
  {
    slug: "trekking-everest-base-camp",
    titleEn: "Trekking Everest Base Camp",
    titleHi: "एवरेस्ट बेस कैंप ट्रेक",
    year: "2025",
  },
] as const;

export const quotes = [
  { textEn: "The only way to do great work is to love what you do.", textHi: "महान काम करने का एकमात्र तरीका है — जो आप करते हैं, उससे प्रेम करना।", author: "Steve Jobs" },
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
  bioIntern: {
    en: "First-year electrical engineering student at BITS Pilani. Currently a generalist intern at ",
    hi: "BITS पिलानी में इलेक्ट्रिकल इंजीनियरिंग का प्रथम वर्ष का छात्र। फ़िलहाल ",
  },
  samoraLink: { en: "Samora AI (YC W26)", hi: "Samora AI (YC W26)" },
  bioSamoraDesc: {
    en: ", building AI agents that automate enterprise workflows. Also working in capital advisory and tech at ",
    hi: " में जनरलिस्ट इंटर्न — एंटरप्राइज़ वर्कफ़्लो को ऑटोमेट करने वाले AI एजेंट्स बना रहा हूँ। साथ ही ",
  },
  conquestLink: { en: "Conquest", hi: "Conquest" },
  bioAfterConquest: {
    en: ", India's largest student-run startup accelerator.",
    hi: " — भारत के सबसे बड़े छात्र-संचालित स्टार्टअप एक्सेलरेटर — में कैपिटल एडवाइज़री और टेक पर काम कर रहा हूँ।",
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
    en: "I'm fascinated by the future, what technology is about to make possible, and who gets to shape it. Today I'm learning AI and building with it. But what started everything was rockets: the sheer ambition of the thing. I play sport to stay sane, learn to stay curious, and I trekked to Everest Base Camp with my dad because some things you just have to go do. I care about geopolitics for the same reason I care about tech — the world is being written right now, and I'd rather understand it than watch it happen.",
    hi: "मैं भविष्य से मोहित हूँ — कि तकनीक अभी क्या मुमकिन करने वाली है, और उसे आकार देने का मौक़ा किसे मिलेगा। आज मैं AI सीख रहा हूँ और उससे बना रहा हूँ। लेकिन सब कुछ शुरू हुआ था रॉकेट्स से — उस चीज़ की निरी महत्वाकांक्षा से। मैं खेल खेलता हूँ ख़ुद को संतुलित रखने के लिए, सीखता हूँ जिज्ञासा बनाए रखने के लिए, और अपने पिताजी के साथ एवरेस्ट बेस कैंप तक ट्रेक किया क्योंकि कुछ चीज़ें बस करनी पड़ती हैं। मुझे जियोपॉलिटिक्स की परवाह उसी वजह से है जिस वजह से तकनीक की — दुनिया अभी लिखी जा रही है, और मैं उसे देखने के बजाय समझना पसंद करूँगा।",
  },
  sectionProjects: { en: "Projects", hi: "प्रोजेक्ट्स" },
  sectionWriting: { en: "LogX", hi: "LogX" },
  writingSub: {
    en: "Unfiltered writing. Personal, technical, and everything between.",
    hi: "बिना फ़िल्टर के लेखन। निजी, तकनीकी, और बीच का सब कुछ।",
  },
  resume: { en: "resume", hi: "रिज़्यूमे" },
  toggleLabel: { en: "हिंदी", hi: "English" },
  rocket: { en: "↑ still launching", hi: "↑ अभी उड़ान पर" },
  comingSoon: { en: "coming soon", hi: "जल्द आ रहा है" },
  back: { en: "← back", hi: "← वापस" },
  location: { en: "Bangalore", hi: "बेंगलुरु" },
} as const;
