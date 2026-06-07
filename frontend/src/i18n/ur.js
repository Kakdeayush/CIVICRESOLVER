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
      ROAD: "سڑک",
      GARBAGE: "کچرا",
      WATER: "پانی",
      ELECTRICITY: "بجلی",
      STREET_LIGHT: "سڑک کی روشنی",
      OTHER: "دیگر",
    }[code],
  ])
);

const suggestionCategories = Object.fromEntries(
  SUGGESTION_CATEGORY_CODES.map((code) => [
    code,
    {
      TRANSPORT: "نقل و حمل",
      CLEANLINESS: "صفائی",
      WATER_MANAGEMENT: "پانی کی تدبیر",
      STREET_LIGHTING: "سڑک کی روشنی",
      PARKS_AND_GREENERY: "پارکس اور سبزہ",
      PUBLIC_SAFETY: "عوامی حفاظت",
      OTHER: "دیگر",
    }[code],
  ])
);

const complaintStatuses = Object.fromEntries(
  COMPLAINT_STATUS_CODES.map((code) => [
    code,
    {
      PENDING: "زیرِ التوا",
      ONGOING: "جاری",
      RESOLVED: "حل شدہ",
    }[code],
  ])
);

const suggestionStatuses = Object.fromEntries(
  SUGGESTION_STATUS_CODES.map((code) => [
    code,
    {
      NEW: "نیا",
      UNDER_REVIEW: "جائزے کے تحت",
      APPROVED: "منظور",
      REJECTED: "مسترد",
      IMPLEMENTED: "نافذ",
    }[code],
  ])
);

const UR = {
  meta: {
    title: "CivicResolver | ذہین شہری رپورٹنگ",
    description:
      "CivicResolver شہری مسائل رپورٹ کرنے، حل کی پیش رفت کو ٹریک کرنے، اور شہر کو بہتر بنانے کے لیے تجاویز شیئر کرنے میں مدد کرتا ہے۔",
  },
  language: { label: "اردو" },
  common: {
    unknown: "نامعلوم",
    notProvided: "دستیاب نہیں",
    loading: "لوڈ ہو رہا ہے...",
    retry: "دوبارہ کوشش کریں",
    reset: "دوبارہ سیٹ کریں",
    submit: "جمع کریں",
    submitting: "جمع ہو رہا ہے...",
    all: "تمام",
    noRecords: "کوئی ریکارڈ نہیں ملا",
    noData: "کوئی ڈیٹا دستیاب نہیں",
    geoTag: "جغرافیاتی",
  },
  labels: {
    roles: {
      citizen: "شہری",
      admin: "منتظم",
    },
    complaintCategory: complaintCategories,
    complaintStatus: complaintStatuses,
    suggestionCategory: suggestionCategories,
    suggestionStatus: suggestionStatuses,
  },
  nav: {
    home: "ہوم",
    trackReport: "رپورٹ ٹریک کریں",
    suggestions: "تجاویز",
    gallery: "گیلری",
    about: "ہمارے بارے میں",
    getStarted: "شروع کریں",
    profile: "پروفائل کھولیں",
    closeMenu: "مینو بند کریں",
    openMenu: "مینو کھولیں",
    switchThemeToDark: "ڈارک موڈ میں جائیں",
    switchThemeToLight: "لائٹ موڈ میں جائیں",
  },
  footer: {
    description:
      "شہری مسائل رپورٹ کرنے اور شفاف اور موثر حکمرانی کے ذریعے ان کے حل کو ٹریک کرنے میں شہری کو بااختیار بنانا۔",
    pillFast: "تیز رپورٹ",
    pillTrack: "لائیو ٹریک",
    pillImprove: "ایک ساتھ بہتری",
    tagline: "اپنی آواز اٹھائیں، تبدیلی لائیں",
    quickLinks: "فوری روابط",
    contact: "رابطہ",
    rights: "تمام حقوق محفوظ۔ ایک رپورٹ کے ساتھ بہتر شہر بناتے ہیں۔",
  },
  home: {
    hero: {
      kicker: "شہری رپورٹنگ، نیا رنگ",
      titleLead: "ایک جگہ پر",
      titleAccent: "رپورٹ کریں، ٹریک کریں، اور بہتر بنائیں۔",
      description:
        "CivicResolver شہری مسائل کو سیاق و سباق کے ساتھ درج کرنے، ہر اپڈیٹ دیکھنے، اور روز مرہ کے مشاہدات کو عوامی کارروائی میں بدلنے میں مدد کرتا ہے۔",
      primaryAction: "مسئلہ رپورٹ کریں",
      secondaryAction: "عوامی گیلری دیکھیں",
      pills: {
        photo: "فوٹو کے ساتھ آسان",
        map: "نقشہ پر مبنی",
        status: "شفاف حالت",
      },
      panel: {
        eyebrow: "بات چیت کنندہ شہری بہاؤ",
        title: "اپنا اگلا قدم منتخب کریں",
        live: "لائیو",
      },
    },
    actions: {
      report: {
        title: "مسئلہ رپورٹ کریں",
        summary: "فوٹو لیں، مقام نشان زد کریں، اور صحیح تفصیلات بھیجیں۔",
        badge: "تیز ترین راستہ",
        detail:
          "رہنمائی شدہ فارم کھولیں اور مقام، زمرہ، اور ثبوت کے ساتھ مکمل شکایت جمع کریں۔",
        points: [
          "بہتر سیاق و سباق کے لیے فوٹو شامل کریں",
          "نقشہ پر صحیح مقام نشان زد کریں",
          "ایسی شکایت بھیجیں جس پر شہر کارروائی کر سکے",
        ],
      },
      track: {
        title: "پیش رفت ٹریک کریں",
        summary: "ہر شکایت کو زیرِ التوا سے حل شدہ تک دیکھیں۔",
        badge: "مطلع رہیں",
        detail:
          "اپنی جمع کی گئی شکایتوں کی لائیو حالت چیک کریں اور ایک جگہ حل کی ٹریل فالو کریں۔",
        points: [
          "زیرِ التوا، جاری، اور حل شدہ رپورٹیں دیکھیں",
          "ہر اپڈیٹ کی واضح ٹائم لائن رکھیں",
          "حالت میں تبدیلیوں کے لیے کسی بھی وقت واپس آئیں",
        ],
      },
      suggest: {
        title: "تجویز شیئر کریں",
        summary: "ایسے خیالات پیش کریں جو سڑکوں، پارکوں اور خدمات کو بہتر بناتے ہیں۔",
        badge: "ایک ساتھ بنائیں",
        detail:
          "محل کے خیالات کو کارروائی کے قابل تجاویز میں تبدیل کریں اور شہر کی ٹیمز کو کچھ ٹھوس دیں۔",
        points: [
          "اپنے علاقے کے لیے بہتری کی تجویز دیں",
          "کچھ لائنوں میں اثرات بیان کریں",
          "مستقبل کے شہری فیصلوں کو تشکیل دینے میں مدد کریں",
        ],
      },
    },
    impact: {
      location: {
        title: "مقام پہلی رپورٹنگ",
        description:
          "ایک پن گرائیں اور ہر مسئلہ کو صحیح ٹیم تک پہنچنے کے لیے درکار سیاق و سباق دیں۔",
      },
      actions: {
        title: "تیز، رہنمائی شدہ اقدامات",
        description:
          "اضافی اقدامات کے ذریعے جائے بغیر رپورٹ کریں، ٹریک کریں، یا بہتری کی تجویز دیں۔",
      },
      visibility: {
        title: "شہری دوست نظر آنا",
        description:
          "شکایتیں نظر آنے دیں تاکہ عمل شفاف محسوس ہو بجائے پوشیدہ کے۔",
      },
    },
    problems: {
      title: "مسائل جو ہم حل کرتے ہیں",
      description:
        "روایتی شہری مسئلہ رپورٹنگ سست، غیر موثر، اور شفافیت کی کمی ہے۔ شہری اکثر نہیں جانتے کہ مسائل کی رپورٹ کہاں کریں یا ان کے حل کو کیسے ٹریک کریں۔",
      items: {
        complex: {
          title: "پیچیدہ رپورٹنگ عمل",
          description:
            "شہری کو صحیح محکمہ تلاش کرنے اور بیوروکریٹک عمل میں نیویگیٹ کرنے میں جدوجہد کرنی پڑتی ہے۔",
        },
        transparency: {
          title: "شفافیت کی کمی",
          description: "شکایت کی حالت یا حل کی ٹائم لائن میں کوئی نظر آنا نہیں۔",
        },
        slow: {
          title: "سست جواب کا وقت",
          description: "غیر موثر روٹنگ کی وجہ سے مسائل کو حل ہونے میں ہفتے یا مہینے لگتے ہیں۔",
        },
      },
      solution: {
        title: "ہمارا حل",
        points: [
          "لائیو ٹریکنگ اور اپڈیٹس",
          "رسائی کے لیے موبائل پہلے ڈیزائن",
          "شفاف مواصلات کے چینل",
        ],
      },
    },
    features: {
      title: "طاقتور خصوصیات",
      subtitle: "شہری مسائل کو موثر طریقے سے رپورٹ، ٹریک، اور حل کرنے کے لیے آپ کو سب کچھ۔",
      items: {
        tracking: {
          title: "لائیو ٹریکنگ",
          description: "اپنی شکایتوں کو جمع سے حل تک لائیو میں ٹریک کریں۔",
        },
        response: {
          title: "تیز جواب",
          description: "خودکار محکمہ روٹنگ کے ساتھ تیز جواب کا وقت حاصل کریں۔",
        },
        security: {
          title: "محفوظ پلیٹ فارم",
          description: "آپ کا ڈیٹا انٹرپرائز گریڈ سیکیورٹی کے ساتھ محفوظ ہے۔",
        },
      },
    },
    cta: {
      eyebrow: "اثر ڈالنے کے لیے تیار ہیں؟",
      title: "شہری مایوسی کو نظر آنے والی پیش رفت میں تبدیل کریں۔",
      description:
        "مسائل رپورٹ کریں، ان کی حالت دیکھیں، اور ایک جگہ اپنے محل کے لیے بہتر خیالات شیئر کریں۔",
      primaryAction: "شروع کریں",
      secondaryAction: "مزید جانیں",
    },
  },
  about: {
    heroTitleLead: "CivicResolver میں خوش آمدید",
    heroTitleAccent: "خوش آمدید",
    heroDescription:
      "ایک شہری سے چلانے والا پلیٹ فارم جو برادریوں کو شہری مسائل کو شفاف طریقے سے رپورٹ، ٹریک، اور حل کرنے میں مدد کرتا ہے۔",
    missionTitle: "ہمارا مشن",
    missionDescription:
      "شہری کو شہری مسائل کو آسانی سے رپورٹ کرنے کے لیے بااختیار بنانا اور شفافیت اور ٹیکنالوجی کے ذریعے تیز حل یقینی بنانا۔",
    visionTitle: "ہماری نگاہ",
    visionDescription:
      "ذہین، صاف، اور زیادہ جوابدہ شہر بنانا جہاں ہر شہری کی آواز حقیقی تبدیلی لاتی ہے۔",
    whyTitle: "CivicResolver کیوں منتخب کریں",
    features: {
      location: {
        title: "مقام پر مبنی رپورٹنگ",
        description: "نقشہ استعمال کرکے مسائل کو درست طریقے سے نشان زد کریں۔",
      },
      transparent: {
        title: "شفاف ٹریکنگ",
        description: "لائیو میں شکایت کی حالت ٹریک کریں۔",
      },
      empowerment: {
        title: "شہری بااختیاری",
        description: "آپ کی آواز براہ راست آپ کے شہر کو بہتر بناتی ہے۔",
      },
    },
    stats: {
      fast: { title: "تیز رپورٹنگ", description: "سیکنڈوں میں مسائل جمع کریں" },
      realtime: { title: "لائیو اپڈیٹس", description: "حل کی پیش رفت ٹریک کریں" },
      community: { title: "برادری سے چلایا جاتا ہے", description: "شہری اثر بناتے ہیں" },
    },
  },
  auth: {
    login: {
      title: "خوش آمدید",
      subtitle: "فرق ڈالتے رہنے کے لیے سائن ان کریں",
      citizen: "شہری",
      admin: "منتظم",
      emailLabel: "ای میل پتہ",
      emailPlaceholder: "اپنی ای میل درج کریں",
      passwordLabel: "پاس ورڈ",
      passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
      remember: "مجھے یاد رکھیں",
      forgot: "پاس ورڈ بھول گئے؟",
      submit: "سائن ان کریں",
      noAccount: "اکاؤنٹ نہیں ہے؟",
      signUp: "سائن اپ کریں",
      invalid: "غلط ای میل یا پاس ورڈ",
    },
    register: {
      title: "اکاؤنٹ بنائیں",
      subtitle: "ہمسے جڑیں اور فرق ڈالنا شروع کریں",
      nameLabel: "مکمل نام",
      namePlaceholder: "اپنا نام درج کریں",
      emailLabel: "ای میل پتہ",
      emailPlaceholder: "اپنی ای میل درج کریں",
      passwordLabel: "پاس ورڈ",
      passwordPlaceholder: "پاس ورڈ بنائیں",
      submit: "رجسٹر کریں",
      haveAccount: "پہلے سے اکاؤنٹ ہے؟",
      login: "لاگ ان کریں",
      successAlert: "رجسٹریشن کامیاب۔ براہ کرم لاگ ان کریں۔",
      failure: "رجسٹریشن ناکام",
    },
    forgot: {
      title: "پاس ورڈ بھول گئے",
      subtitle: "اپنی ای میل درج کریں اور ہم آپ کو ری سیٹ لنک بھیجیں گے",
      emailLabel: "ای میل پتہ",
      emailPlaceholder: "اپنی ای میل درج کریں",
      submit: "ری سیٹ لنک بھیجیں",
      success: "ری سیٹ لنک آپ کی ای میل پر بھیج دی گئی ہے",
      backToLogin: "لاگ ان پر واپس جائیں",
    },
  },
  profile: {
    title: "پروفائل",
    roleLabel: "کردار",
    emailLabel: "ای میل",
    logout: "لاگ آؤٹ",
  },
  report: {
    title: "شہری مسئلہ رپورٹ کریں",
    issueTitle: "مسئلے کا عنوان",
    category: "زمرہ",
    description: "تفصیل",
    selectLocation: "مقام منتخب کریں",
    locationFallback: "بھدراوتی، چندرپور",
    uploadPhoto: "فوٹو اپ لوڈ کریں",
    submit: "مسئلہ جمع کریں",
    success: "شکایت کامیابی سے جمع ہو گئی ✅",
    errorFill: "براہ کرم تمام فیلڈز بھریں اور مقام منتخب کریں",
    errorSubmit: "شکایت جمع کرنے میں ناکامی",
  },
  track: {
    title: "اپنی شکایتیں ٹریک کریں",
    error: "شکایتیں حاصل کرنے میں ناکامی",
    empty: "کوئی شکایت نہیں ملی۔ رپورٹ مسئلے کے صفحہ سے ایک جمع کریں۔",
    complaintId: "شکایت کی شناخت",
    category: "زمرہ",
    description: "تفصیل",
    location: "مقام",
    date: "تاریخ",
  },
  suggestions: {
    title: "شہر کی بہتری کی تجاویز",
    subtitle: "سڑکوں، عوامی مقامات، اور شہر کی خدمات کو بہتر بنانے کے لیے اپنے خیالات شیئر کریں۔",
    submitTitle: "تجویز جمع کریں",
    listTitle: "میری تجاویز",
    titleLabel: "عنوان",
    categoryLabel: "زمرہ",
    descriptionLabel: "تفصیل",
    areaLabel: "علاقہ / محل",
    latitudeLabel: "عرض بلد (اختیاری)",
    longitudeLabel: "طول بلد (اختیاری)",
    mapLabel: "نقشہ پر مقام منتخب کریں (اختیاری)",
    selectedLabel: "منتخب شدہ",
    titlePlaceholder: "مثال: اسکولوں کے پاس مزید زیبرا کراسنگ شامل کریں",
    descriptionPlaceholder: "اپنے خیال کی تفصیل کریں اور یہ شہر کی کیسے مدد کرتا ہے",
    areaPlaceholder: "مثال: وارڈ 3، مین مارکیٹ روڈ",
    latitudePlaceholder: "مثال: 18.5204",
    longitudePlaceholder: "مثال: 73.8567",
    submit: "تجویز جمع کریں",
    submitting: "جمع ہو رہا ہے...",
    loading: "تجاویز لوڈ ہو رہی ہیں...",
    empty: "ابھی کوئی تجویز نہیں۔ اپنا پہلا خیال شیئر کریں۔",
    loadError: "اپنی تجاویز لوڈ کرنے میں ناکامی",
    submitError: "تجویز جمع کرنے میں ناکامی",
    validationBoth: "براہ کرم عرض بلد اور طول بلد دونوں درج کریں",
    validationNumbers: "عرض بلد اور طول بلد درست نمبریں ہوں",
    validationRange: "عرض بلد -90 سے 90 کے درمیان ہونا چاہیے، طول بلد -180 سے 180 کے درمیان",
    validationRequired: "براہ کرم تمام ضروری فیلڈز بھریں",
    success: "تجویز کامیابی سے جمع ہو گئی",
  },
  gallery: {
    title: "عوامی شکایتوں کی گیلری",
    allCategories: "تمام زمرہ جات",
    allAreas: "تمام علاقے",
    loadError: "عوامی شکایتیں لوڈ کرنے میں ناکامی",
    empty: "کوئی شکایت دستیاب نہیں",
  },
  admin: {
    sidebar: {
      dashboard: "ڈیش بورڈ",
      complaints: "شکایتیں",
      suggestions: "تجاویز",
      analytics: "تجزیہ",
      settings: "ترتیبات",
      logout: "لاگ آؤٹ",
      loggedOut: "آپ لاگ آؤٹ ہو گئے ہیں",
    },
    settings: {
      title: "ترتیبات",
      subtitle: "منتظم کی ترجیحات اور کنٹرول",
    },
  },
};

export default UR;
