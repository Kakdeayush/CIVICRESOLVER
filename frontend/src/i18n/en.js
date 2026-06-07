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
      ROAD: "Road",
      GARBAGE: "Garbage",
      WATER: "Water",
      ELECTRICITY: "Electricity",
      STREET_LIGHT: "Street Light",
      OTHER: "Other",
    }[code],
  ])
);

const suggestionCategories = Object.fromEntries(
  SUGGESTION_CATEGORY_CODES.map((code) => [
    code,
    {
      TRANSPORT: "Transport",
      CLEANLINESS: "Cleanliness",
      WATER_MANAGEMENT: "Water Management",
      STREET_LIGHTING: "Street Lighting",
      PARKS_AND_GREENERY: "Parks & Greenery",
      PUBLIC_SAFETY: "Public Safety",
      OTHER: "Other",
    }[code],
  ])
);

const complaintStatuses = Object.fromEntries(
  COMPLAINT_STATUS_CODES.map((code) => [
    code,
    {
      PENDING: "Pending",
      ONGOING: "Ongoing",
      RESOLVED: "Resolved",
    }[code],
  ])
);

const suggestionStatuses = Object.fromEntries(
  SUGGESTION_STATUS_CODES.map((code) => [
    code,
    {
      NEW: "New",
      UNDER_REVIEW: "Under Review",
      APPROVED: "Approved",
      REJECTED: "Rejected",
      IMPLEMENTED: "Implemented",
    }[code],
  ])
);

const EN = {
  meta: {
    title: "CivicResolver | Smart Civic Reporting",
    description:
      "CivicResolver helps citizens report civic issues, track resolution progress, and share ideas to improve their city.",
  },
  language: { label: "Language" },
  common: {
    unknown: "Unknown",
    notProvided: "Not provided",
    loading: "Loading...",
    retry: "Retry",
    reset: "Reset",
    submit: "Submit",
    submitting: "Submitting...",
    all: "All",
    noRecords: "No records found",
    noData: "No data available",
    geoTag: "Geo",
  },
  labels: {
    roles: {
      citizen: "Citizen",
      admin: "Admin",
    },
    complaintCategory: complaintCategories,
    complaintStatus: complaintStatuses,
    suggestionCategory: suggestionCategories,
    suggestionStatus: suggestionStatuses,
  },
  nav: {
    home: "Home",
    trackReport: "Track Report",
    suggestions: "Suggestions",
    gallery: "Gallery",
    about: "About Us",
    getStarted: "Get Started",
    profile: "Open profile",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    switchThemeToDark: "Switch to dark mode",
    switchThemeToLight: "Switch to light mode",
  },
  footer: {
    description:
      "Empowering citizens to report civic issues and track their resolution through transparent and efficient governance.",
    pillFast: "Report fast",
    pillTrack: "Track live",
    pillImprove: "Improve together",
    tagline: "Raise your voice, drive change",
    quickLinks: "Quick Links",
    contact: "Contact",
    rights: "All rights reserved. Building better cities, one report at a time.",
  },
  home: {
    hero: {
      kicker: "Civic reporting, reimagined",
      titleLead: "One place to",
      titleAccent: "report, track, and improve.",
      description:
        "CivicResolver helps citizens file issues with context, follow every update, and turn everyday observations into visible public action.",
      primaryAction: "Report an Issue",
      secondaryAction: "View Public Gallery",
      pills: {
        photo: "Photo-friendly",
        map: "Map-based",
        status: "Transparent status",
      },
      panel: {
        eyebrow: "Interactive civic flow",
        title: "Choose your next step",
        live: "Live",
      },
    },
    actions: {
      report: {
        title: "Report an issue",
        summary: "Capture a photo, pin the location, and send the right details.",
        badge: "Fastest route",
        detail:
          "Open the guided form and submit a complete complaint with location, category, and evidence.",
        points: [
          "Attach a photo for better context",
          "Pin the exact location on the map",
          "Send a complaint the city can act on",
        ],
      },
      track: {
        title: "Track progress",
        summary: "See every complaint move from pending to resolved.",
        badge: "Stay informed",
        detail:
          "Check the live status of your submitted complaints and follow the resolution trail in one place.",
        points: [
          "View pending, ongoing, and resolved reports",
          "Keep a clear timeline of every update",
          "Return anytime for status changes",
        ],
      },
      suggest: {
        title: "Share a suggestion",
        summary: "Offer ideas that make roads, parks, and services better.",
        badge: "Build together",
        detail:
          "Turn neighborhood ideas into actionable proposals and give city teams something concrete to review.",
        points: [
          "Suggest improvements for your area",
          "Describe the impact in a few lines",
          "Help shape future civic decisions",
        ],
      },
    },
    impact: {
      location: {
        title: "Location-first reporting",
        description:
          "Drop a pin and give every issue the context it needs to reach the right team.",
      },
      actions: {
        title: "Quick, guided actions",
        description:
          "Report, track, or suggest improvements without wading through extra steps.",
      },
      visibility: {
        title: "Citizen-friendly visibility",
        description:
          "Keep complaints visible so the process feels transparent instead of hidden.",
      },
    },
    problems: {
      title: "Problems We Solve",
      description:
        "Traditional civic issue reporting is slow, inefficient, and lacks transparency. Citizens often do not know where to report issues or how to track their resolution.",
      items: {
        complex: {
          title: "Complex Reporting Process",
          description:
            "Citizens struggle to find the right department and navigate bureaucratic processes.",
        },
        transparency: {
          title: "Lack of Transparency",
          description: "No visibility into complaint status or resolution timeline.",
        },
        slow: {
          title: "Slow Response Times",
          description:
            "Issues take weeks or months to resolve due to inefficient routing.",
        },
      },
      solution: {
        title: "Our Solution",
        points: [
          "Real-time tracking and updates",
          "Mobile-first design for accessibility",
          "Transparent communication channels",
        ],
      },
    },
    features: {
      title: "Powerful Features",
      subtitle: "Everything you need to report, track, and resolve civic issues efficiently.",
      items: {
        tracking: {
          title: "Real-time Tracking",
          description: "Track your complaints from submission to resolution in real time.",
        },
        response: {
          title: "Quick Response",
          description: "Get faster response times with automated department routing.",
        },
        security: {
          title: "Secure Platform",
          description: "Your data is protected with enterprise-grade security.",
        },
      },
    },
    cta: {
      eyebrow: "Ready to make an impact?",
      title: "Turn civic frustrations into visible progress.",
      description:
        "Report issues, watch their status, and share better ideas for your neighborhood in one place.",
      primaryAction: "Get Started",
      secondaryAction: "Learn More",
    },
  },
  about: {
    heroTitleLead: "Welcome to",
    heroTitleAccent: "CivicResolver",
    heroDescription:
      "A citizen-powered platform helping communities report, track, and resolve civic issues transparently.",
    missionTitle: "Our Mission",
    missionDescription:
      "To empower citizens to report civic issues easily and ensure faster resolution through transparency and technology.",
    visionTitle: "Our Vision",
    visionDescription:
      "To build smarter, cleaner, and more responsive cities where every citizen’s voice creates real change.",
    whyTitle: "Why Choose CivicResolver",
    features: {
      location: {
        title: "Location-Based Reporting",
        description: "Pinpoint issues accurately using maps.",
      },
      transparent: {
        title: "Transparent Tracking",
        description: "Track complaint status in real time.",
      },
      empowerment: {
        title: "Citizen Empowerment",
        description: "Your voice directly improves your city.",
      },
    },
    stats: {
      fast: { title: "Fast Reporting", description: "Submit issues in seconds" },
      realtime: { title: "Real-Time Updates", description: "Track resolution progress" },
      community: { title: "Community Driven", description: "Citizens create impact" },
    },
  },
  auth: {
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to continue making a difference",
      citizen: "Citizen",
      admin: "Admin",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      remember: "Remember me",
      forgot: "Forgot password?",
      submit: "Sign In",
      noAccount: "Don’t have an account?",
      signUp: "Sign up",
      invalid: "Invalid email or password",
    },
    register: {
      title: "Create Account",
      subtitle: "Join us and start making a difference",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Create password",
      submit: "Register",
      haveAccount: "Already have an account?",
      login: "Login",
      successAlert: "Registration successful. Please login.",
      failure: "Registration failed",
    },
    forgot: {
      title: "Forgot Password",
      subtitle: "Enter your email and we’ll send you a reset link",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      submit: "Send Reset Link",
      success: "Reset link sent to your email",
      backToLogin: "Back to Login",
    },
  },
  profile: {
    title: "Profile",
    roleLabel: "Role",
    emailLabel: "Email",
    logout: "Logout",
  },
  report: {
    title: "Report a Civic Issue",
    issueTitle: "Issue Title",
    category: "Category",
    description: "Description",
    selectLocation: "Select Location",
    locationFallback: "Bhadravati, Chandrapur",
    uploadPhoto: "Upload Photo",
    submit: "Submit Issue",
    success: "Complaint submitted successfully ✅",
    errorFill: "Please fill all fields and select location",
    errorSubmit: "Failed to submit complaint",
  },
  track: {
    title: "Track Your Complaints",
    error: "Failed to fetch complaints",
    empty: "No complaints found. Submit one from the Report Issue page.",
    complaintId: "Complaint ID",
    category: "Category",
    description: "Description",
    location: "Location",
    date: "Date",
  },
  suggestions: {
    title: "City Improvement Suggestions",
    subtitle: "Share your ideas to improve roads, public spaces, and city services.",
    submitTitle: "Submit a Suggestion",
    listTitle: "My Suggestions",
    titleLabel: "Title",
    categoryLabel: "Category",
    descriptionLabel: "Description",
    areaLabel: "Area / Locality",
    latitudeLabel: "Latitude (optional)",
    longitudeLabel: "Longitude (optional)",
    mapLabel: "Select Location on Map (optional)",
    selectedLabel: "Selected",
    titlePlaceholder: "Example: Add more zebra crossings near schools",
    descriptionPlaceholder: "Describe your idea and how it helps the city",
    areaPlaceholder: "Example: Ward 3, Main Market Road",
    latitudePlaceholder: "Example: 18.5204",
    longitudePlaceholder: "Example: 73.8567",
    submit: "Submit Suggestion",
    submitting: "Submitting...",
    loading: "Loading suggestions...",
    empty: "No suggestions yet. Share your first idea.",
    loadError: "Failed to load your suggestions",
    submitError: "Failed to submit suggestion",
    validationBoth: "Please provide both latitude and longitude",
    validationNumbers: "Latitude and longitude must be valid numbers",
    validationRange: "Latitude must be between -90 and 90, longitude between -180 and 180",
    validationRequired: "Please fill all required fields",
    success: "Suggestion submitted successfully",
  },
  gallery: {
    title: "Public Complaints Gallery",
    allCategories: "All Categories",
    allAreas: "All Areas",
    loadError: "Failed to load public complaints",
    empty: "No complaints available",
  },
  admin: {
    sidebar: {
      dashboard: "Dashboard",
      complaints: "Complaints",
      suggestions: "Suggestions",
      analytics: "Analytics",
      settings: "Settings",
      logout: "Logout",
      loggedOut: "You are logged out",
    },
    settings: {
      title: "Settings",
      subtitle: "Admin preferences and controls",
    },
  },
};

export default EN;
