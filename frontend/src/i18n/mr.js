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
      ROAD: "रस्ता",
      GARBAGE: "कचरा",
      WATER: "पाणी",
      ELECTRICITY: "वीज",
      STREET_LIGHT: "रस्त्यावरील दिवा",
      OTHER: "इतर",
    }[code],
  ])
);

const suggestionCategories = Object.fromEntries(
  SUGGESTION_CATEGORY_CODES.map((code) => [
    code,
    {
      TRANSPORT: "वाहतूक",
      CLEANLINESS: "स्वच्छता",
      WATER_MANAGEMENT: "जल व्यवस्थापन",
      STREET_LIGHTING: "रस्त्यावरील प्रकाश",
      PARKS_AND_GREENERY: "उद्यान आणि हरितीकरण",
      PUBLIC_SAFETY: "सार्वजनिक सुरक्षितता",
      OTHER: "इतर",
    }[code],
  ])
);

const complaintStatuses = Object.fromEntries(
  COMPLAINT_STATUS_CODES.map((code) => [
    code,
    {
      PENDING: "प्रलंबित",
      ONGOING: "चालू",
      RESOLVED: "निकाली काढले",
    }[code],
  ])
);

const suggestionStatuses = Object.fromEntries(
  SUGGESTION_STATUS_CODES.map((code) => [
    code,
    {
      NEW: "नवीन",
      UNDER_REVIEW: "परीक्षणाखाली",
      APPROVED: "मंजूर",
      REJECTED: "नामंजूर",
      IMPLEMENTED: "अंमलात आणले",
    }[code],
  ])
);

const MR = {
  meta: {
    title: "CivicResolver | स्मार्ट नागरिक तक्रार नोंदणी",
    description:
      "CivicResolver नागरिकांना नागरी समस्या नोंदवणे, निवारणाची प्रगती पाहणे, आणि शहर सुधारण्यासाठी कल्पना शेअर करणे सोपे करते.",
  },
  language: { label: "भाषा" },
  common: {
    unknown: "अज्ञात",
    notProvided: "उपलब्ध नाही",
    loading: "लोड होत आहे...",
    retry: "पुन्हा प्रयत्न करा",
    reset: "रीसेट",
    submit: "सबमिट",
    submitting: "सबमिट होत आहे...",
    all: "सर्व",
    noRecords: "कोणतेही नोंदी आढळले नाहीत",
    noData: "कोणताही डेटा उपलब्ध नाही",
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
    trackReport: "तक्रार ट्रॅक करा",
    suggestions: "सूचना",
    gallery: "गॅलरी",
    about: "आमच्याविषयी",
    getStarted: "सुरू करा",
    profile: "प्रोफाइल उघडा",
    closeMenu: "मेनू बंद करा",
    openMenu: "मेनू उघडा",
    switchThemeToDark: "डार्क मोडवर जा",
    switchThemeToLight: "लाईट मोडवर जा",
  },
  footer: {
    description:
      "नागरिकांना नागरी समस्या नोंदवण्यासाठी आणि पारदर्शक, कार्यक्षम शासनाद्वारे त्यांचा निवारण मागोवा घेण्यासाठी सक्षम करणे.",
    pillFast: "जलद नोंदणी",
    pillTrack: "लाईव्ह ट्रॅक",
    pillImprove: "एकत्र सुधारूया",
    tagline: "आवाज उठवा, बदल घडवा",
    quickLinks: "जलद दुवे",
    contact: "संपर्क",
    rights: "सर्व हक्क राखीव. एका तक्रारीने चांगली शहरे घडवत आहोत.",
  },
  home: {
    hero: {
      kicker: "नागरिक तक्रार, नव्या स्वरूपात",
      titleLead: "एका ठिकाणी",
      titleAccent: "नोंदवा, ट्रॅक करा, आणि सुधारणा करा.",
      description:
        "CivicResolver नागरिकांना संदर्भासह समस्या नोंदवण्यास, प्रत्येक अपडेट पाहण्यास, आणि रोजच्या निरीक्षणांना सार्वजनिक कृतीमध्ये बदलण्यास मदत करते.",
      primaryAction: "समस्या नोंदवा",
      secondaryAction: "सार्वजनिक गॅलरी पहा",
      pills: {
        photo: "फोटो-सुलभ",
        map: "नकाशा आधारित",
        status: "पारदर्शक स्थिती",
      },
      panel: {
        eyebrow: "परस्परसंवादी नागरिक प्रवाह",
        title: "तुमचा पुढचा टप्पा निवडा",
        live: "लाईव्ह",
      },
    },
    actions: {
      report: {
        title: "समस्या नोंदवा",
        summary: "फोटो घ्या, ठिकाण चिन्हांकित करा, आणि योग्य तपशील पाठवा.",
        badge: "सर्वात जलद मार्ग",
        detail:
          "मार्गदर्शित फॉर्म उघडा आणि ठिकाण, श्रेणी, आणि पुराव्यासह संपूर्ण तक्रार सबमिट करा.",
        points: [
          "चांगल्या संदर्भासाठी फोटो जोडा",
          "नकाशावर नेमके ठिकाण चिन्हांकित करा",
          "शहर कारवाई करू शकेल अशी तक्रार पाठवा",
        ],
      },
      track: {
        title: "प्रगती ट्रॅक करा",
        summary: "प्रत्येक तक्रार प्रलंबितपासून निराकरणापर्यंत जाताना पहा.",
        badge: "माहितीमध्ये रहा",
        detail:
          "तुमच्या सबमिट केलेल्या तक्रारींची लाईव्ह स्थिती पाहा आणि निवारणाचा प्रवास एका ठिकाणी ट्रॅक करा.",
        points: [
          "प्रलंबित, चालू, आणि निराकृत अहवाल पहा",
          "प्रत्येक अपडेटची स्पष्ट टाइमलाइन ठेवा",
          "स्थिती बदलल्यावर कधीही परत या",
        ],
      },
      suggest: {
        title: "सूचना शेअर करा",
        summary: "रस्ते, उद्याने, आणि सेवा चांगल्या करणाऱ्या कल्पना द्या.",
        badge: "एकत्र उभे राहूया",
        detail:
          "शेजारील कल्पनांना कृतीयोग्य प्रस्तावांमध्ये बदला आणि शहर टीमला पुनरावलोकनासाठी ठोस माहिती द्या.",
        points: [
          "तुमच्या भागासाठी सुधारणा सुचवा",
          "काही ओळींमध्ये परिणाम सांगा",
          "भविष्यातील नागरिक निर्णयांना आकार द्या",
        ],
      },
    },
    impact: {
      location: {
        title: "स्थान-आधारित नोंदणी",
        description:
          "पिन ड्रॉप करा आणि प्रत्येक समस्येला योग्य टीमपर्यंत पोहोचण्यासाठी आवश्यक संदर्भ द्या.",
      },
      actions: {
        title: "त्वरित, मार्गदर्शित कृती",
        description:
          "अतिरिक्त टप्प्यांत अडकून न राहता नोंदवा, ट्रॅक करा, किंवा सुधारणा सुचवा.",
      },
      visibility: {
        title: "नागरिक-अनुकूल दृश्यमानता",
        description:
          "तक्रारी दिसत राहू द्या म्हणजे प्रक्रिया लपलेली नसून पारदर्शक वाटेल.",
      },
    },
    problems: {
      title: "आम्ही ज्या समस्या सोडवतो",
      description:
        "पारंपरिक नागरिक समस्या नोंदणी धीमी, अप्रभावी, आणि अपारदर्शक असते. नागरिकांना अनेकदा कुठे नोंदवायचे किंवा निवारण कसे पाहायचे हे माहीत नसते.",
      items: {
        complex: {
          title: "गुंतागुंतीची नोंद प्रक्रिया",
          description:
            "योग्य विभाग शोधणे आणि प्रशासकीय प्रक्रिया समजणे नागरिकांसाठी अवघड जाते.",
        },
        transparency: {
          title: "पारदर्शकतेचा अभाव",
          description: "तक्रारीची स्थिती किंवा निवारणाची वेळमर्यादा दिसत नाही.",
        },
        slow: {
          title: "मंद प्रतिसाद वेळ",
          description:
            "अकार्यक्षम राऊटिंगमुळे समस्या सोडवायला आठवडे किंवा महिने लागतात.",
        },
      },
      solution: {
        title: "आमचे समाधान",
        points: [
          "रीयल-टाइम ट्रॅकिंग आणि अपडेट्स",
          "सुलभतेसाठी मोबाइल-फर्स्ट डिझाइन",
          "पारदर्शक संवाद चॅनेल्स",
        ],
      },
    },
    features: {
      title: "शक्तिशाली वैशिष्ट्ये",
      subtitle: "नागरी समस्या कार्यक्षमतेने नोंदवण्यासाठी, ट्रॅक करण्यासाठी, आणि सोडवण्यासाठी सर्व काही.",
      items: {
        tracking: {
          title: "रीयल-टाइम ट्रॅकिंग",
          description: "तक्रार सबमिशनपासून निवारणापर्यंत लाईव्ह ट्रॅक करा.",
        },
        response: {
          title: "जलद प्रतिसाद",
          description: "स्वयंचलित विभाग राऊटिंगमुळे जलद प्रतिसाद मिळवा.",
        },
        security: {
          title: "सुरक्षित प्लॅटफॉर्म",
          description: "तुमचा डेटा एंटरप्राइझ-स्तरीय सुरक्षेसह संरक्षित आहे.",
        },
      },
    },
    cta: {
      eyebrow: "प्रभाव पाडण्यासाठी तयार आहात?",
      title: "नागरिक अस्वस्थतेचे दृश्यमान प्रगतीमध्ये रूपांतर करा.",
      description:
        "समस्या नोंदवा, त्यांची स्थिती पहा, आणि तुमच्या परिसरासाठी चांगल्या कल्पना एका ठिकाणी शेअर करा.",
      primaryAction: "सुरू करा",
      secondaryAction: "अधिक जाणून घ्या",
    },
  },
  about: {
    heroTitleLead: "स्वागत आहे",
    heroTitleAccent: "CivicResolver मध्ये",
    heroDescription:
      "एक नागरिक-संचालित प्लॅटफॉर्म जो समुदायांना नागरी समस्या पारदर्शकपणे नोंदवणे, ट्रॅक करणे, आणि सोडवणे सोपे करतो.",
    missionTitle: "आमचे ध्येय",
    missionDescription:
      "नागरिकांना सहजपणे नागरी समस्या नोंदवता याव्यात आणि पारदर्शकता व तंत्रज्ञानाद्वारे जलद निवारण सुनिश्चित व्हावे.",
    visionTitle: "आमची दृष्टी",
    visionDescription:
      "असे स्मार्ट, स्वच्छ, आणि अधिक प्रतिसादक्षम शहर तयार करणे जिथे प्रत्येक नागरिकाचा आवाज खरा बदल घडवेल.",
    whyTitle: "CivicResolver का निवडावे",
    features: {
      location: {
        title: "स्थान-आधारित नोंदणी",
        description: "नकाशांचा वापर करून समस्या अचूकपणे चिन्हांकित करा.",
      },
      transparent: {
        title: "पारदर्शक ट्रॅकिंग",
        description: "तक्रारीची स्थिती रीयल टाइममध्ये पहा.",
      },
      empowerment: {
        title: "नागरिक सक्षमीकरण",
        description: "तुमचा आवाज थेट तुमचे शहर सुधारतो.",
      },
    },
    stats: {
      fast: { title: "जलद नोंदणी", description: "काही सेकंदांत समस्या सबमिट करा" },
      realtime: { title: "रीयल-टाइम अपडेट्स", description: "निवारण प्रगती ट्रॅक करा" },
      community: { title: "समुदाय-चालित", description: "नागरिक परिणाम घडवतात" },
    },
  },
  auth: {
    login: {
      title: "पुन्हा स्वागत आहे",
      subtitle: "फरक घडवण्यासाठी साइन इन करा",
      citizen: "नागरिक",
      admin: "प्रशासक",
      emailLabel: "ईमेल पत्ता",
      emailPlaceholder: "तुमचा ईमेल टाका",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "तुमचा पासवर्ड टाका",
      remember: "मला लक्षात ठेवा",
      forgot: "पासवर्ड विसरलात?",
      submit: "साइन इन",
      noAccount: "खाते नाही?",
      signUp: "साइन अप करा",
      invalid: "अवैध ईमेल किंवा पासवर्ड",
    },
    register: {
      title: "खाते तयार करा",
      subtitle: "आमच्यात सामील व्हा आणि बदलाची सुरुवात करा",
      nameLabel: "पूर्ण नाव",
      namePlaceholder: "तुमचे नाव टाका",
      emailLabel: "ईमेल पत्ता",
      emailPlaceholder: "तुमचा ईमेल टाका",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "पासवर्ड तयार करा",
      submit: "नोंदणी करा",
      haveAccount: "आधीच खाते आहे?",
      login: "लॉगिन",
      successAlert: "नोंदणी यशस्वी झाली. कृपया लॉगिन करा.",
      failure: "नोंदणी अयशस्वी",
    },
    forgot: {
      title: "पासवर्ड विसरलात",
      subtitle: "तुमचा ईमेल टाका आणि आम्ही रीसेट लिंक पाठवू",
      emailLabel: "ईमेल पत्ता",
      emailPlaceholder: "तुमचा ईमेल टाका",
      submit: "रीसेट लिंक पाठवा",
      success: "रीसेट लिंक तुमच्या ईमेलवर पाठवली आहे",
      backToLogin: "लॉगिनवर परत या",
    },
  },
  profile: {
    title: "प्रोफाइल",
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
    locationFallback: "भद्रावती, चंद्रपूर",
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

export default MR;
