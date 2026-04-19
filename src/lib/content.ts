// Bilingual content + shared data for the site

export type Lang = "en" | "hi";

export const projects = [
  {
    name: "Sloppy",
    status: "in progress",
    descEn: "An AI video social platform where your feed is generated, not curated.",
    descHi: "एक AI वीडियो सोशल प्लेटफ़ॉर्म जहाँ आपका फ़ीड क्यूरेट नहीं, जनरेट होता है।",
    url: null,
  },
  {
    name: "Mnemos",
    status: null,
    descEn: "Transforms audio onsets into rhythmic spikes in an E/I neural network, visualised in real time.",
    descHi: "ऑडियो को E/I न्यूरल नेटवर्क में लयबद्ध स्पाइक्स में बदलता है, रियल-टाइम में विज़ुअलाइज़ किया गया।",
    url: "https://github.com/priyansh-x/Mnemos",
  },
  {
    name: "Nirogi AI",
    status: null,
    descEn: "Converting unstructured medical PDFs into structured, EHR-ready formats.",
    descHi: "असंरचित मेडिकल PDFs को संरचित, EHR-तैयार फ़ॉर्मेट में बदलता है।",
    url: "https://nirogi-ai.vercel.app/",
  },
  {
    name: "DeHack Website",
    status: null,
    descEn: "Website for BITS Pilani's flagship hackathon, with education modules and real-time logistics.",
    descHi: "BITS पिलानी के प्रमुख हैकाथॉन की वेबसाइट — शिक्षा मॉड्यूल और रियल-टाइम लॉजिस्टिक्स के साथ।",
    url: "https://dehack.vercel.app",
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
  tagline: {
    en: "I believe technology is the most powerful lever we have to help people — and that's what I'm here to build.",
    hi: "मेरा मानना है कि तकनीक सबसे शक्तिशाली माध्यम है जिससे हम लोगों की मदद कर सकते हैं — और यही मैं बनाने आया हूँ।",
  },
  bioStart: {
    en: "First-year EEE student at BITS Pilani. Running growth and tech at Conquest — India's largest student-run startup accelerator. Building Sloppy, an AI video social platform. JEE '25: 99.4%ile. Interested in rockets, startups, and what comes next. See my ",
    hi: "BITS पिलानी में EEE प्रथम वर्ष का छात्र। Conquest — भारत के सबसे बड़े छात्र-संचालित स्टार्टअप एक्सेलरेटर — में ग्रोथ और टेक संभाल रहा हूँ। Sloppy बना रहा हूँ, एक AI वीडियो सोशल प्लेटफ़ॉर्म। JEE '25: 99.4%ile। रॉकेट्स, स्टार्टअप्स और आगे क्या आएगा — इसमें रुचि। मेरे ",
  },
  projectsLink: { en: "projects", hi: "प्रोजेक्ट्स" },
  bioMid: { en: ", read ", hi: " देखें, " },
  logxLink: { en: "LogX", hi: "LogX" },
  bioEnd: { en: ", or ", hi: " पढ़ें, या " },
  contactLink: { en: "get in touch", hi: "संपर्क करें" },
  bioFinal: { en: ".", hi: "।" },
  sectionProjects: { en: "projects", hi: "प्रोजेक्ट्स" },
  sectionWriting: { en: "LogX", hi: "LogX" },
  writingSub: {
    en: "Unfiltered writing. Personal, technical, and everything between.",
    hi: "बिना फ़िल्टर के लेखन। निजी, तकनीकी, और बीच का सब कुछ।",
  },
  sectionContact: { en: "contact", hi: "संपर्क" },
  contactLine: {
    en: "Open to interesting conversations, collaborations, and opportunities.",
    hi: "दिलचस्प बातचीत, सहयोग और अवसरों के लिए हमेशा खुला।",
  },
  resume: { en: "resume", hi: "रिज़्यूमे" },
  toggleLabel: { en: "हिंदी", hi: "English" },
  rocket: { en: "↑ still launching", hi: "↑ अभी उड़ान पर" },
  comingSoon: { en: "coming soon", hi: "जल्द आ रहा है" },
  back: { en: "← back", hi: "← वापस" },
  inProgress: { en: "in progress", hi: "जारी है" },
} as const;
