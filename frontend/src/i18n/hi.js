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
      STREET_LIGHT: "स्ट्रीट लाइट",
      OTHER: "अन्य",
    }[code],
  ])
);

const suggestionCategories = Object.fromEntries(
  SUGGESTION_CATEGORY_CODES.map((code) => [
    code,
    {
      TRANSPORT: "परिवहन",
      CLEANLINESS: "स्वच्छता",
      WATER_MANAGEMENT: "जल प्रबंधन",
      STREET_LIGHTING: "स्ट्रीट लाइटिंग",
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
      ONGOING: "चालू",
      RESOLVED: "निराकृत",
    }[code],
  ])
);

const suggestionStatuses = Object.fromEntries(
  SUGGESTION_STATUS_CODES.map((code) => [
    code,
    {
      NEW: "नया",
      UNDER_REVIEW: "समीक्षा में",
      APPROVED: "स्वीकृत",
      REJECTED: "अस्वीकृत",
      IMPLEMENTED: "लागू",
    }[code],
  ])
);

const HI = {
  meta: {
    title: "CivicResolver | स्मार्ट नागरिक शिकायत प्रणाली",
    description:
      "CivicResolver नागरिकों को नागरिक समस्याएं दर्ज करने, समाधान की प्रगति देखने, और शहर सुधारने के लिए सुझाव साझा करने में मदद करता है।",
  },
  language: { label: "भाषा" },
  common: {
    unknown: "अज्ञात",
    notProvided: "उपलब्ध नहीं",
    loading: "लोड हो रहा है...",
    retry: "पुनः प्रयास करें",
    reset: "रीसेट",
    submit: "जमा करें",
    submitting: "जमा किया जा रहा है...",
    all: "सभी",
    noRecords: "कोई रिकॉर्ड नहीं मिला",
    noData: "कोई डेटा उपलब्ध नहीं है",
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
    home: "होम",
    trackReport: "रिपोर्ट ट्रैक करें",
    suggestions: "सुझाव",
    gallery: "गैलरी",
    about: "हमारे बारे में",
    getStarted: "शुरू करें",
    profile: "प्रोफ़ाइल खोलें",
    closeMenu: "मेनू बंद करें",
    openMenu: "मेनू खोलें",
    switchThemeToDark: "डार्क मोड पर जाएं",
    switchThemeToLight: "लाइट मोड पर जाएं",
  },
  footer: {
    description:
      "नागरिकों को नागरिक समस्याएं रिपोर्ट करने और पारदर्शी, प्रभावी शासन के माध्यम से उनके समाधान को ट्रैक करने में सक्षम बनाना।",
    pillFast: "तेज़ रिपोर्ट",
    pillTrack: "लाइव ट्रैक",
    pillImprove: "साथ मिलकर सुधार",
    tagline: "आवाज़ उठाओ, बदलाव लाओ",
    quickLinks: "त्वरित लिंक",
    contact: "संपर्क",
    rights: "सभी अधिकार सुरक्षित। एक रिपोर्ट के साथ बेहतर शहर बना रहे हैं।",
  },
  home: {
    hero: {
      kicker: "नागरिक रिपोर्टिंग, नया रूप",
      titleLead: "एक ही जगह पर",
      titleAccent: "रिपोर्ट करें, ट्रैक करें, और सुधारें।",
      description:
        "CivicResolver नागरिकों को संदर्भ के साथ समस्याएं दर्ज करने, हर अपडेट देखने, और रोज़मर्रा की बातों को दिखाई देने वाली सार्वजनिक कार्रवाई में बदलने में मदद करता है।",
      primaryAction: "समस्या दर्ज करें",
      secondaryAction: "सार्वजनिक गैलरी देखें",
      pills: {
        photo: "फोटो के साथ आसान",
        map: "मैप आधारित",
        status: "पारदर्शी स्थिति",
      },
      panel: {
        eyebrow: "इंटरैक्टिव नागरिक प्रवाह",
        title: "अपना अगला कदम चुनें",
        live: "लाइव",
      },
    },
    actions: {
      report: {
        title: "समस्या दर्ज करें",
        summary: "फोटो लें, स्थान चिन्हित करें, और सही विवरण भेजें।",
        badge: "सबसे तेज़ रास्ता",
        detail:
          "निर्देशित फ़ॉर्म खोलें और स्थान, श्रेणी, और प्रमाण के साथ पूरी शिकायत जमा करें।",
        points: [
          "बेहतर संदर्भ के लिए फोटो जोड़ें",
          "मैप पर सही स्थान चिन्हित करें",
          "ऐसी शिकायत भेजें जिस पर शहर कार्रवाई कर सके",
        ],
      },
      track: {
        title: "प्रगति ट्रैक करें",
        summary: "हर शिकायत को लंबित से समाधान तक जाते देखें।",
        badge: "जानकारी में रहें",
        detail:
          "अपनी दर्ज शिकायतों की लाइव स्थिति देखें और समाधान की पूरी यात्रा एक ही जगह पर ट्रैक करें।",
        points: [
          "लंबित, चालू, और समाधान वाली रिपोर्ट देखें",
          "हर अपडेट की साफ़ समयरेखा रखें",
          "स्थिति बदलने पर कभी भी लौटें",
        ],
      },
      suggest: {
        title: "सुझाव साझा करें",
        summary: "ऐसे विचार दें जो सड़क, पार्क और सेवाओं को बेहतर बनाएं।",
        badge: "साथ मिलकर बनाएं",
        detail:
          "पड़ोस के विचारों को कार्रवाई योग्य प्रस्तावों में बदलें और शहर की टीम को समीक्षा के लिए ठोस जानकारी दें।",
        points: [
          "अपने क्षेत्र के लिए सुधार सुझाएं",
          "कुछ पंक्तियों में प्रभाव बताएं",
          "भविष्य के नागरिक निर्णयों को आकार दें",
        ],
      },
    },
    impact: {
      location: {
        title: "स्थान-आधारित रिपोर्टिंग",
        description:
          "पिन लगाएं और हर समस्या को सही टीम तक पहुंचाने के लिए ज़रूरी संदर्भ दें।",
      },
      actions: {
        title: "त्वरित, निर्देशित कार्रवाई",
        description:
          "अतिरिक्त चरणों में उलझे बिना रिपोर्ट करें, ट्रैक करें, या सुधार सुझाएं।",
      },
      visibility: {
        title: "नागरिक-अनुकूल दृश्यता",
        description:
          "शिकायतों को दिखाई देने दें ताकि प्रक्रिया छुपी हुई नहीं, पारदर्शी लगे।",
      },
    },
    problems: {
      title: "हम किन समस्याओं का समाधान करते हैं",
      description:
        "पारंपरिक नागरिक समस्या रिपोर्टिंग धीमी, असंगठित, और अपारदर्शी होती है। नागरिकों को अक्सर यह नहीं पता होता कि कहां रिपोर्ट करें या समाधान कैसे ट्रैक करें।",
      items: {
        complex: {
          title: "जटिल रिपोर्टिंग प्रक्रिया",
          description:
            "नागरिकों को सही विभाग ढूंढने और प्रशासनिक प्रक्रियाओं को समझने में कठिनाई होती है।",
        },
        transparency: {
          title: "पारदर्शिता की कमी",
          description: "शिकायत की स्थिति या समाधान की समय-सीमा का कोई दृश्य नहीं होता।",
        },
        slow: {
          title: "धीमी प्रतिक्रिया",
          description:
            "अप्रभावी रूटिंग के कारण समस्याओं को हल होने में हफ्तों या महीनों लग जाते हैं।",
        },
      },
      solution: {
        title: "हमारा समाधान",
        points: [
          "रीयल-टाइम ट्रैकिंग और अपडेट",
          "पहुँच के लिए मोबाइल-फ़र्स्ट डिज़ाइन",
          "पारदर्शी संचार चैनल",
        ],
      },
    },
    features: {
      title: "शक्तिशाली सुविधाएं",
      subtitle: "नागरिक समस्याओं को कुशलता से रिपोर्ट, ट्रैक, और हल करने के लिए सब कुछ।",
      items: {
        tracking: {
          title: "रीयल-टाइम ट्रैकिंग",
          description: "अपनी शिकायतों को जमा करने से समाधान तक लाइव ट्रैक करें।",
        },
        response: {
          title: "तेज़ प्रतिक्रिया",
          description: "स्वचालित विभाग रूटिंग से तेज़ प्रतिक्रिया समय पाएं।",
        },
        security: {
          title: "सुरक्षित प्लेटफ़ॉर्म",
          description: "आपका डेटा एंटरप्राइज़-स्तरीय सुरक्षा के साथ सुरक्षित है।",
        },
      },
    },
    cta: {
      eyebrow: "प्रभाव डालने के लिए तैयार हैं?",
      title: "नागरिक निराशा को दिखाई देने वाली प्रगति में बदलें।",
      description:
        "समस्याएं दर्ज करें, उनकी स्थिति देखें, और अपने इलाके के लिए बेहतर विचार साझा करें - सब एक जगह।",
      primaryAction: "शुरू करें",
      secondaryAction: "और जानें",
    },
  },
  about: {
    heroTitleLead: "आपका स्वागत है",
    heroTitleAccent: "CivicResolver में",
    heroDescription:
      "एक नागरिक-संचालित प्लेटफ़ॉर्म जो समुदायों को नागरिक समस्याएं पारदर्शी तरीके से रिपोर्ट, ट्रैक, और हल करने में मदद करता है।",
    missionTitle: "हमारा मिशन",
    missionDescription:
      "नागरिकों को आसानी से नागरिक समस्याएं रिपोर्ट करने में सक्षम बनाना और पारदर्शिता व तकनीक के ज़रिए तेज़ समाधान सुनिश्चित करना।",
    visionTitle: "हमारी दृष्टि",
    visionDescription:
      "ऐसे स्मार्ट, स्वच्छ, और अधिक उत्तरदायी शहर बनाना जहां हर नागरिक की आवाज़ वास्तविक बदलाव लाए।",
    whyTitle: "CivicResolver क्यों चुनें",
    features: {
      location: {
        title: "स्थान-आधारित रिपोर्टिंग",
        description: "मैप का उपयोग करके समस्याओं को सही-सही चिन्हित करें।",
      },
      transparent: {
        title: "पारदर्शी ट्रैकिंग",
        description: "शिकायत की स्थिति रीयल टाइम में देखें।",
      },
      empowerment: {
        title: "नागरिक सशक्तिकरण",
        description: "आपकी आवाज़ सीधे आपके शहर को बेहतर बनाती है।",
      },
    },
    stats: {
      fast: { title: "तेज़ रिपोर्टिंग", description: "कुछ ही सेकंड में समस्या जमा करें" },
      realtime: { title: "रीयल-टाइम अपडेट", description: "समाधान की प्रगति देखें" },
      community: { title: "समुदाय-संचालित", description: "नागरिक प्रभाव पैदा करते हैं" },
    },
  },
  auth: {
    login: {
      title: "पुनः आपका स्वागत है",
      subtitle: "फर्क लाने के लिए साइन इन करें",
      citizen: "नागरिक",
      admin: "प्रशासक",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      remember: "मुझे याद रखें",
      forgot: "पासवर्ड भूल गए?",
      submit: "साइन इन",
      noAccount: "खाता नहीं है?",
      signUp: "साइन अप करें",
      invalid: "अमान्य ईमेल या पासवर्ड",
    },
    register: {
      title: "खाता बनाएं",
      subtitle: "हमसे जुड़ें और बदलाव की शुरुआत करें",
      nameLabel: "पूरा नाम",
      namePlaceholder: "अपना नाम दर्ज करें",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "पासवर्ड बनाएं",
      submit: "रजिस्टर",
      haveAccount: "पहले से खाता है?",
      login: "लॉगिन",
      successAlert: "रजिस्ट्रेशन सफल रहा। कृपया लॉगिन करें।",
      failure: "रजिस्ट्रेशन विफल",
    },
    forgot: {
      title: "पासवर्ड भूल गए",
      subtitle: "अपना ईमेल दर्ज करें और हम आपको रीसेट लिंक भेजेंगे",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      submit: "रीसेट लिंक भेजें",
      success: "रीसेट लिंक आपके ईमेल पर भेज दिया गया है",
      backToLogin: "लॉगिन पर वापस जाएं",
    },
  },
  profile: {
    title: "प्रोफ़ाइल",
    roleLabel: "भूमिका",
    emailLabel: "ईमेल",
    logout: "लॉगआउट",
  },
  report: {
    title: "नागरी समस्या नोंदवा",
    issueTitle: "समस्येचे शीर्षक",
    category: "श्रेणी",
    description: "वर्णन",
    selectLocation: "स्थान निवडा",
    locationFallback: "भद्रावती, चंद्रपुर",
    uploadPhoto: "फोटो अपलोड करा",
    submit: "समस्या सबमिट करा",
    success: "तक्रार यशस्वीपणे सबमिट झाली ✅",
    errorFill: "कृपया सर्व फील्ड भरा आणि स्थान निवडा",
    errorSubmit: "तक्रार सबमिट करण्यात अयशस्वी",
  },
  track: {
    title: "तुमच्या तक्रारी ट्रॅक करा",
    error: "तक्रारी आणण्यात अयशस्वी",
    empty: "कोणतीही तक्रार सापडली नाही. Report Issue पेजवरून एक तक्रार सबमिट करा.",
    complaintId: "तक्रार आयडी",
    category: "श्रेणी",
    description: "वर्णन",
    location: "स्थान",
    date: "तारीख",
  },
  suggestions: {
    title: "शहर सुधारणा सूचना",
    subtitle: "रस्ते, सार्वजनिक जागा, आणि शहर सेवा सुधारण्यासाठी तुमच्या कल्पना शेअर करा.",
    submitTitle: "सूचना सबमिट करा",
    listTitle: "माझ्या सूचना",
    titleLabel: "शीर्षक",
    categoryLabel: "श्रेणी",
    descriptionLabel: "वर्णन",
    areaLabel: "भाग / परिसर",
    latitudeLabel: "अक्षांश (ऐच्छिक)",
    longitudeLabel: "रेखांश (ऐच्छिक)",
    mapLabel: "नकाशावर स्थान निवडा (ऐच्छिक)",
    selectedLabel: "निवडलेले",
    titlePlaceholder: "उदाहरण: शाळेजवळ अधिक झेब्रा क्रॉसिंग जोडा",
    descriptionPlaceholder: "तुमची कल्पना वर्णन करा आणि ती शहराला कशी मदत करते ते सांगा",
    areaPlaceholder: "उदाहरण: वॉर्ड 3, मेन मार्केट रोड",
    latitudePlaceholder: "उदाहरण: 18.5204",
    longitudePlaceholder: "उदाहरण: 73.8567",
    submit: "सूचना सबमिट करा",
    submitting: "सबमिट होत आहे...",
    loading: "सूचना लोड होत आहेत...",
    empty: "अजून कोणतीही सूचना नाही. तुमची पहिली कल्पना शेअर करा.",
    loadError: "तुमच्या सूचना लोड करण्यात अयशस्वी",
    submitError: "सूचना सबमिट करण्यात अयशस्वी",
    validationBoth: "कृपया अक्षांश आणि रेखांश दोन्ही द्या",
    validationNumbers: "अक्षांश आणि रेखांश वैध संख्याच असाव्यात",
    validationRange: "अक्षांश -90 ते 90 दरम्यान आणि रेखांश -180 ते 180 दरम्यान असावा",
    validationRequired: "कृपया सर्व आवश्यक फील्ड भरा",
    success: "सूचना यशस्वीपणे सबमिट झाली",
  },
  gallery: {
    title: "सार्वजनिक तक्रार गॅलरी",
    allCategories: "सर्व श्रेणी",
    allAreas: "सर्व क्षेत्रे",
    loadError: "सार्वजनिक तक्रारी लोड करण्यात अयशस्वी",
    empty: "कोणत्याही तक्रारी उपलब्ध नाहीत",
  },
  admin: {
    sidebar: {
      dashboard: "डॅशबोर्ड",
      complaints: "तक्रारी",
      suggestions: "सूचना",
      analytics: "विश्लेषण",
      settings: "सेटिंग्ज",
      logout: "लॉगआउट",
      loggedOut: "तुम्ही लॉग आउट झाला आहात",
    },
    settings: {
      title: "सेटिंग्ज",
      subtitle: "प्रशासक प्राधान्ये आणि नियंत्रणे",
    },
  },
};

export default HI;
