// Bilingual content + shared data for the site

export type Lang = "en" | "hi";

export const projects = [
  {
    name: "Sloppy",
    status: "active",
    descEn: "Your feed, generated not curated. Sloppy is an AI video social platform that builds a personalised stream from scratch — no follower graphs, no engagement bait, just content that fits where you are right now.",
    descHi: "आपका फ़ीड — क्यूरेट नहीं, जनरेट किया हुआ। Sloppy एक AI वीडियो सोशल प्लेटफ़ॉर्म है जो आपकी पर्सनलाइज़्ड स्ट्रीम शून्य से बनाता है — न फ़ॉलोअर ग्राफ़, न एंगेजमेंट बेट, बस वही कंटेंट जो आपकी अभी की जगह से मेल खाए।",
    url: null,
  },
  {
    name: "Mnemos",
    status: "shipped",
    descEn: "An interactive application that transforms audio onsets into rhythmic spikes inside an E/I neural network, visualised live through synced rasters, traces, and browser animations.",
    descHi: "एक इंटरैक्टिव ऐप्लिकेशन जो ऑडियो ऑनसेट्स को E/I न्यूरल नेटवर्क के अंदर लयबद्ध स्पाइक्स में बदलता है — सिंक्ड रास्टर्स, ट्रेसेस और ब्राउज़र एनिमेशन के ज़रिए लाइव विज़ुअलाइज़्ड।",
    url: "https://github.com/priyansh-x/Mnemos",
  },
  {
    name: "NeuralX",
    status: "active",
    descEn: "An AI-native research tool that sits between you and the literature — surfaces what's relevant, connects what's related, and gets out of the way. Built for people who think faster than they can read.",
    descHi: "एक AI-नेटिव रिसर्च टूल जो आपके और साहित्य के बीच बैठता है — जो प्रासंगिक है उसे सामने लाता है, जो जुड़ा है उसे जोड़ता है, और बीच में नहीं आता। उन लोगों के लिए जो पढ़ने से तेज़ सोचते हैं।",
    url: null,
  },
] as const;

export const posts = [
  {
    slug: "the-death-of-my-tauji",
    titleEn: "The death of my Tauji",
    titleHi: "मेरे ताऊजी का जाना",
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
  bioStart: {
    en: "First-year electrical engineering student at BITS Pilani. Working at Conquest, India's largest student-run startup accelerator. See my ",
    hi: "BITS पिलानी में इलेक्ट्रिकल इंजीनियरिंग का प्रथम वर्ष का छात्र। Conquest — भारत के सबसे बड़े छात्र-संचालित स्टार्टअप एक्सेलरेटर — में काम कर रहा हूँ। मेरे ",
  },
  projectsLink: { en: "projects", hi: "प्रोजेक्ट्स" },
  bioMid: { en: ", read ", hi: " देखें, " },
  logxLink: { en: "LogX", hi: "LogX" },
  bioEnd: { en: ", or ", hi: " पढ़ें, या " },
  contactLink: { en: "get in touch", hi: "संपर्क करें" },
  bioFinal: { en: ".", hi: "।" },
  sectionAbout: { en: "about", hi: "परिचय" },
  aboutPara: {
    en: "I'm drawn to things that move fast and matter — rockets, startups, AI, the messy overlap between all three. I got into engineering because I wanted to understand how things work. I stayed because I realised building things is the closest you can get to changing them. Outside of that, I follow Formula 1 probably more seriously than I should, read whatever I can get my hands on, and spend a lot of time thinking about what the next ten years of technology actually look like for people who aren't already in the room.",
    hi: "मुझे वो चीज़ें खींचती हैं जो तेज़ चलती हैं और मायने रखती हैं — रॉकेट्स, स्टार्टअप्स, AI, और इन तीनों के बीच का बिखरा हुआ ओवरलैप। इंजीनियरिंग में इसलिए आया क्योंकि समझना चाहता था कि चीज़ें कैसे काम करती हैं। टिका इसलिए क्योंकि एहसास हुआ कि चीज़ें बनाना उन्हें बदलने के सबसे क़रीब है। इसके अलावा, Formula 1 शायद ज़रूरत से ज़्यादा गंभीरता से देखता हूँ, जो हाथ लगे पढ़ता हूँ, और बहुत सारा वक़्त इस सोच में बिताता हूँ कि अगले दस साल की तकनीक उन लोगों के लिए असल में कैसी दिखेगी जो अभी उस कमरे में नहीं हैं।",
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
} as const;
