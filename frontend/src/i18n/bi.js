import {
  COMPLAINT_CATEGORY_CODES,
  COMPLAINT_STATUS_CODES,
  SUGGESTION_CATEGORY_CODES,
  SUGGESTION_STATUS_CODES,
} from "./constants";

const complaintCategories = Object.fromEntries(
  COMPLAINT_CATEGORY_CODES.map((code) => [
    code,
    {
      ROAD: "सड़क",
      GARBAGE: "कचरा",
      WATER: "पानी",
      ELECTRICITY: "बिजली",
      STREET_LIGHT: "सड़क बत्ती",
      OTHER: "अन्य",
    }[code],
  ])
);

const suggestionCategories = Object.fromEntries(
  SUGGESTION_CATEGORY_CODES.map((code) => [
    code,
    {
      TRANSPORT: "परिवहन",
      CLEANLINESS: "सफाई",
      WATER_MANAGEMENT: "जल प्रबंधन",
      STREET_LIGHTING: "सड़क प्रकाश",
      PARKS_AND_GREENERY: "पार्क और हरियाली",
      PUBLIC_SAFETY: "सार्वजनिक सुरक्षा",
      OTHER: "अन्य",
    }[code],
  ])
);

const complaintStatuses = Object.fromEntries(
  COMPLAINT_STATUS_CODES.map((code) => [
    code,
    {
      PENDING: "लंबित",
      ONGOING: "चलरहल",
      RESOLVED: "हल",
    }[code],
  ])
);

const suggestionStatuses = Object.fromEntries(
  SUGGESTION_STATUS_CODES.map((code) => [
    code,
    {
      NEW: "नया",
      UNDER_REVIEW: "समीक्षा में",
      APPROVED: "मंजूर",
      REJECTED: "अस्वीकृत",
      IMPLEMENTED: "लागू",
    }[code],
  ])
);

const BI = {
  meta: {
    title: "CivicResolver | स्मार्ट नागरिक रिपोर्टिंग",
    description:
      "CivicResolver नागरिकों को नागरिक समस्याएं रिपोर्ट करने, समाधान की प्रगति ट्रैक करने, और शहर सुधारने के लिए सुझाव साझा करने में मदद करता है।",
  },
  language: { label: "बिहारी" },
  common: {
    unknown: "अज्ञात",
    notProvided: "उपलब्ध नहीं",
    loading: "लोड हो रहल...",
    retry: "फिर कोशिश करै",
    reset: "रीसेट",
    submit: "जमा करै",
    submitting: "जमा कइल जा रहल...",
    all: "सब",
    noRecords: "कोनो रिकॉर्ड नहीं मिलल",
    noData: "कोनो डेटा उपलब्ध नहीं",
    geoTag: "भौगोलिक",
  },
  labels: {
    roles: {
      citizen: "नागरिक",
      admin: "प्रशासक",
    },
    complaintCategory: complaintCategories,
    complaintStatus: complaintStatuses,
    suggestionCategory: suggestionCategories,
    suggestionStatus: suggestionStatuses,
  },
  nav: {
    home: "घर",
    trackReport: "रिपोर्ट ट्रैक करै",
    suggestions: "सुझाव",
    gallery: "गैलरी",
    about: "हमरा बारे में",
    getStarted: "शुरू करै",
    profile: "प्रोफाइल खोलै",
    closeMenu: "मेनू बंद करै",
    openMenu: "मेनू खोलै",
    switchThemeToDark: "डार्क मोड पर जाय",
    switchThemeToLight: "लाइट मोड पर जाय",
  },
  footer: {
    description:
      "नागरिकों को नागरिक समस्याएं रिपोर्ट करने और पारदर्शी, प्रभावी शासन के माध्यम से उनके समाधान को ट्रैक करने में सक्षम बनाना।",
    pillFast: "तेज़ रिपोर्ट",
    pillTrack: "लाइव ट्रैक",
    pillImprove: "साथ मिलकर सुधार",
    tagline: "आवाज़ उठाओ, बदलाव लाओ",
    quickLinks: "जल्दी लिंक",
    contact: "संपर्क",
    rights: "सब अधिकार सुरक्षित। एक रिपोर्ट के साथे बेहतर शहर बनात हैं।",
  },
  home: {
    hero: {
      kicker: "नागरिक रिपोर्टिंग, नया रूप",
      titleLead: "एक ही जगह पर",
      titleAccent: "रिपोर्ट करै, ट्रैक करै, और सुधारै।",
      description:
        "CivicResolver नागरिकों को संदर्भ के साथ समस्याएं दर्ज करने, हर अपडेट देखने, और रोज़मर्रा की बातों को सार्वजनिक कार्रवाई में बदलने में मदद करता है।",
      primaryAction: "समस्या दर्ज करै",
      secondaryAction: "सार्वजनिक गैलरी देखै",
      pills: {
        photo: "फोटो के साथे आसान",
        map: "नक्शा आधारित",
        status: "पारदर्शी स्थिति",
      },
      panel: {
        eyebrow: "अंतरक्रियात्मक नागरिक प्रवाह",
        title: "अपना अगला कदम चुनै",
        live: "लाइव",
      },
    },
    actions: {
      report: {
        title: "समस्या दर्ज करै",
        summary: "फोटो लै, स्थान चिन्हित करै, और सही विवरण भेजै।",
        badge: "सबसे तेज़ रास्ता",
        detail:
          "निर्देशित फॉर्म खोलै और स्थान, श्रेणी, और प्रमाण के साथे पूरी शिकायत जमा करै।",
        points: [
          "बेहतर संदर्भ के लिए फोटो जोड़ै",
          "नक्शा पर सही स्थान चिन्हित करै",
          "ऐसी शिकायत भेजै जिस पर शहर कार्रवाई कर सकै",
        ],
      },
      track: {
        title: "प्रगति ट्रैक करै",
        summary: "हर शिकायत को लंबित से समाधान तक जाते देखै।",
        badge: "सूचित रहै",
        detail:
          "अपनी जमा की गई शिकायतों की लाइव स्थिति जांचै और एक ही जगह पर समाधान ट्रेल फॉलो करै।",
        points: [
          "लंबित, चलरहल, और हल की गई रिपोर्ट देखै",
          "हर अपडेट की स्पष्ट समयरेखा रखै",
          "स्थिति परिवर्तन के लिए कभी भी वापस आइए",
        ],
      },
      suggest: {
        title: "सुझाव साझा करै",
        summary: "ऐसे विचार दिए जो सड़कों, पार्कों और सेवाओं को बेहतर बनाते हैं।",
        badge: "एकसाथे बनाइए",
        detail:
          "पड़ोस के विचारों को कार्रवाई योग्य प्रस्तावों में बदलै और शहर टीमों को कुछ ठोस दे।",
        points: [
          "अपने क्षेत्र के लिए सुधार का सुझाव दिए",
          "कुछ पंक्तियों में प्रभाव का वर्णन करै",
          "भविष्य की नागरिक निर्णयों को आकार देने में मदद करै",
        ],
      },
    },
    impact: {
      location: {
        title: "स्थान-पहली रिपोर्टिंग",
        description:
          "एक पिन ड्रॉप करै और हर समस्या को सही टीम तक पहुंचने के लिए आवश्यक संदर्भ दिए।",
      },
      actions: {
        title: "त्वरित, निर्देशित कार्य",
        description:
          "अतिरिक्त कदमों के माध्यम से न जाते रिपोर्ट, ट्रैक, या सुधार का सुझाव दिए।",
      },
      visibility: {
        title: "नागरिक-अनुकूल दृश्यता",
        description:
          "शिकायतें दृश्यमान रखै ताकि प्रक्रिया छिपी की जगह पारदर्शी महसूस हो।",
      },
    },
    problems: {
      title: "समस्याएं जो हम हल करते हैं",
      description:
        "पारंपरिक नागरिक समस्या रिपोर्टिंग धीमी, अक्षम, और पारदर्शिता की कमी है। नागरिक अक्सर नहीं जानते कि समस्याओं की रिपोर्ट कहां करनी है या उनके समाधान को कैसे ट्रैक करना है।",
      items: {
        complex: {
          title: "जटिल रिपोर्टिंग प्रक्रिया",
          description:
            "नागरिकों को सही विभाग खोजने और नौकरशाही प्रक्रियाओं को नेविगेट करने में संघर्ष करना पड़ता है।",
        },
        transparency: {
          title: "पारदर्शिता की कमी",
          description: "शिकायत स्थिति या समाधान समयरेखा में कोई दृश्यता नहीं।",
        },
        slow: {
          title: "धीमी प्रतिक्रिया समय",
          description:
            "अक्षम रूटिंग के कारण समस्याओं को हल होने में हफ्ते या महीने लगते हैं।",
        },
      },
      solution: {
        title: "हमारा समाधान",
        points: [
          "रीयल-टाइम ट्रैकिंग और अपडेट",
          "पहुंच के लिए मोबाइल-पहली डिज़ाइन",
          "पारदर्शी संचार चैनल",
        ],
      },
    },
    features: {
      title: "शक्तिशाली विशेषताएं",
      subtitle: "नागरिक समस्याओं को कुशलतापूर्वक रिपोर्ट, ट्रैक, और हल करने के लिए आपको सब कुछ।",
      items: {
        tracking: {
          title: "रीयल-टाइम ट्रैकिंग",
          description: "अपनी शिकायतों को सबमिशन से समाधान तक रीयल टाइम में ट्रैक करै।",
        },
        response: {
          title: "त्वरित प्रतिक्रिया",
          description: "स्वचालित विभाग रूटिंग के साथ तेज़ प्रतिक्रिया समय प्राप्त करै।",
        },
        security: {
          title: "सुरक्षित मंच",
          description: "आपका डेटा एंटरप्राइज-ग्रेड सुरक्षा के साथ संरक्षित है।",
        },
      },
    },
    cta: {
      eyebrow: "प्रभाव डालने के लिए तैयार हो?",
      title: "नागरिक निराशा को दृश्यमान प्रगति में बदलै।",
      description:
        "समस्याओं की रिपोर्ट करै, उनकी स्थिति देखै, और एक ही जगह पर अपने पड़ोस के लिए बेहतर विचार साझा करै।",
      primaryAction: "शुरू करै",
      secondaryAction: "और जानै",
    },
  },
  about: {
    heroTitleLead: "स्वागत है",
    heroTitleAccent: "CivicResolver में",
    heroDescription:
      "एक नागरिक-संचालित मंच जो समुदायों को पारदर्शी तरीके से नागरिक समस्याओं की रिपोर्ट, ट्रैक, और समाधान करने में मदद करता है।",
    missionTitle: "हमारा मिशन",
    missionDescription:
      "नागरिकों को नागरिक समस्याओं की आसानी से रिपोर्ट करने के लिए सशक्त बनाना और पारदर्शिता और प्रौद्योगिकी के माध्यम से तेजी से समाधान सुनिश्चित करना।",
    visionTitle: "हमारी दृष्टि",
    visionDescription:
      "स्मार्ट, स्वच्छ, और अधिक उत्तरदायी शहर बनाना जहां हर नागरिक की आवाज़ वास्तविक परिवर्तन लाता है।",
    whyTitle: "CivicResolver क्यों चुनें",
    features: {
      location: {
        title: "स्थान-आधारित रिपोर्टिंग",
        description: "नक्शा का उपयोग करके समस्याओं को सटीक रूप से इंगित करै।",
      },
      transparent: {
        title: "पारदर्शी ट्रैकिंग",
        description: "रीयल टाइम में शिकायत स्थिति ट्रैक करै।",
      },
      empowerment: {
        title: "नागरिक सशक्तिकरण",
        description: "आपकी आवाज़ सीधे आपके शहर को सुधारती है।",
      },
    },
    stats: {
      fast: { title: "तेज़ रिपोर्टिंग", description: "सेकंडों में समस्याएं सबमिट करै" },
      realtime: { title: "रीयल-टाइम अपडेट", description: "समाधान प्रगति ट्रैक करै" },
      community: { title: "समुदाय द्वारा संचालित", description: "नागरिक प्रभाव बनाते हैं" },
    },
  },
  auth: {
    login: {
      title: "स्वागत है",
      subtitle: "फर्क लाना जारी रखने के लिए साइन इन करै",
      citizen: "नागरिक",
      admin: "प्रशासक",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करै",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करै",
      remember: "मुझे याद रखै",
      forgot: "पासवर्ड भूल गए?",
      submit: "साइन इन करै",
      noAccount: "खाता नहीं है?",
      signUp: "साइन अप करै",
      invalid: "अमान्य ईमेल या पासवर्ड",
    },
    register: {
      title: "खाता बनाइए",
      subtitle: "हमसे जुड़ै और फर्क लाना शुरू करै",
      nameLabel: "पूरा नाम",
      namePlaceholder: "अपना नाम दर्ज करै",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करै",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "पासवर्ड बनाइए",
      submit: "रजिस्टर करै",
      haveAccount: "पहले से खाता है?",
      login: "लॉगिन करै",
      successAlert: "रजिस्ट्रेशन सफल। कृपया लॉगिन करै।",
      failure: "रजिस्ट्रेशन विफल",
    },
    forgot: {
      title: "पासवर्ड भूल गए",
      subtitle: "अपना ईमेल दर्ज करै और हम आपको रीसेट लिंक भेजेंगे",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करै",
      submit: "रीसेट लिंक भेजै",
      success: "रीसेट लिंक आपके ईमेल पर भेज दिया गया है",
      backToLogin: "लॉगिन पर वापस जाय",
    },
  },
  profile: {
    title: "प्रोफाइल",
    roleLabel: "भूमिका",
    emailLabel: "ईमेल",
    logout: "लॉगआउट",
  },
  report: {
    title: "नागरिक समस्या दर्ज करै",
    issueTitle: "समस्या का शीर्षक",
    category: "श्रेणी",
    description: "विवरण",
    selectLocation: "स्थान चुनै",
    locationFallback: "भद्रावती, चंद्रपुर",
    uploadPhoto: "फोटो अपलोड करै",
    submit: "समस्या जमा करै",
    success: "शिकायत सफलतापूर्वक जमा की गई ✅",
    errorFill: "कृपया सभी फील्ड भरै और स्थान चुनै",
    errorSubmit: "शिकायत जमा करने में विफल",
  },
  track: {
    title: "अपनी शिकायतें ट्रैक करै",
    error: "शिकायतें प्राप्त करने में विफल",
    empty: "कोनो शिकायत नहीं मिली। रिपोर्ट समस्या पेज से एक सबमिट करै।",
    complaintId: "शिकायत ID",
    category: "श्रेणी",
    description: "विवरण",
    location: "स्थान",
    date: "तारीख",
  },
  suggestions: {
    title: "शहर सुधार सुझाव",
    subtitle: "सड़कों, सार्वजनिक स्थानों, और शहर सेवाओं को सुधारने के लिए अपने विचार साझा करै।",
    submitTitle: "एक सुझाव सबमिट करै",
    listTitle: "मेरे सुझाव",
    titleLabel: "शीर्षक",
    categoryLabel: "श्रेणी",
    descriptionLabel: "विवरण",
    areaLabel: "क्षेत्र / इलाका",
    latitudeLabel: "अक्षांश (वैकल्पिक)",
    longitudeLabel: "देशांतर (वैकल्पिक)",
    mapLabel: "नक्शे पर स्थान चुनै (वैकल्पिक)",
    selectedLabel: "चुना गया",
    titlePlaceholder: "उदाहरण: स्कूलों के पास अधिक जेब्रा क्रॉसिंग जोड़ै",
    descriptionPlaceholder: "अपने विचार का वर्णन करै और यह शहर को कैसे मदद करता है",
    areaPlaceholder: "उदाहरण: वार्ड 3, मुख्य बाजार सड़क",
    latitudePlaceholder: "उदाहरण: 18.5204",
    longitudePlaceholder: "उदाहरण: 73.8567",
    submit: "सुझाव जमा करै",
    submitting: "जमा किया जा रहल...",
    loading: "सुझाव लोड हो रहल...",
    empty: "अभी कोनो सुझाव नहीं। अपना पहला विचार साझा करै।",
    loadError: "अपने सुझाव लोड करने में विफल",
    submitError: "सुझाव जमा करने में विफल",
    validationBoth: "कृपया अक्षांश और देशांतर दोनों प्रदान करै",
    validationNumbers: "अक्षांश और देशांतर वैध संख्याएं होनी चाहिए",
    validationRange: "अक्षांश -90 से 90 के बीच होना चाहिए, देशांतर -180 से 180 के बीच",
    validationRequired: "कृपया सभी आवश्यक फील्ड भरै",
    success: "सुझाव सफलतापूर्वक जमा किया गया",
  },
  gallery: {
    title: "सार्वजनिक शिकायत गैलरी",
    allCategories: "सभी श्रेणियां",
    allAreas: "सभी क्षेत्र",
    loadError: "सार्वजनिक शिकायतें लोड करने में विफल",
    empty: "कोनो शिकायत उपलब्ध नहीं",
  },
  admin: {
    sidebar: {
      dashboard: "डैशबोर्ड",
      complaints: "शिकायतें",
      suggestions: "सुझाव",
      analytics: "विश्लेषण",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",
      loggedOut: "आप लॉगआउट हो गए हैं",
    },
    settings: {
      title: "सेटिंग्स",
      subtitle: "प्रशासक वरीयताएं और नियंत्रण",
    },
  },
};

export default BI;
