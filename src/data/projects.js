export const projectsData = [
  {
    id: "caughtbot",
    track: "software",
    title: "CaughtBot",
    category: "AI & Security",
    featured: true,
    tagline: "Automated red-teaming for LLM chatbots",
    description: "A Hackin' Summer 2026 project that tests chatbots with prompt-injection and jailbreak attacks, evaluates the results with an LLM judge, and generates security reports with measured prompt hardening.",
    technologies: ["Python", "Streamlit", "Pydantic", "SQLite", "Groq"],
    features: [
      "40+ attacks across prompt leakage, instruction override, jailbreak, and off-limits action categories",
      "LLM-as-judge verdicts with structured evidence and severity",
      "Auto-hardening that keeps a fix only when the measured security score improves",
      "User accounts, scan history, admin dashboard, and downloadable PDF reports"
    ],
    github: "https://github.com/YanikKumar93/CaughtBot",
    stats: {
      attacks: "40+ Attack Cases",
      interface: "Streamlit UI",
      focus: "LLM Security"
    }
  },
  {
    id: "study-mate",
    track: "software",
    title: "StudyMate",
    category: "AI & Productivity",
    featured: true,
    tagline: "Provider-independent desktop AI assistant",
    description: "A Python assistant with terminal and Streamlit interfaces. It combines an OpenAI-compatible chat model with ordinary tools for web, file, weather, news, currency, memory, and document questions.",
    technologies: ["Python", "Streamlit", "RAG", "ChromaDB", "TF-IDF"],
    features: [
      "Terminal and Streamlit interfaces backed by shared routing",
      "Web, YouTube, Wikipedia, weather, news, and currency tools",
      "PDF, PPTX, TXT, and Markdown ingestion with document retrieval",
      "Persistent memory and optional provider/model fallback"
    ],
    github: "https://github.com/YanikKumar93/StudyMate",
    stats: {
      interfaces: "2 Interfaces",
      retrieval: "ChromaDB RAG",
      routing: "TF-IDF Routing"
    }
  },
  {
    id: "placement-matrix",
    track: "software",
    title: "The Placement Matrix",
    category: "Data & Python",
    featured: true,
    tagline: "Customizable college placement data explorer",
    description: "A Python and data-analysis project for exploring university placement information, including placement counts, percentages, packages, domains, locations, and visiting companies.",
    technologies: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
    features: [
      "Placement data for IITs, IIMs, and other universities",
      "Package, placement, gender, domain, and company insights",
      "Customizable analysis workflow built with Pandas and Matplotlib"
    ],
    github: "https://github.com/YanikKumar93/The-Placement-Matrix",
    stats: {
      focus: "Placement Analytics",
      language: "Python",
      output: "Visual Insights"
    }
  },
  {
    id: "programme-calc",
    track: "software",
    title: "Programme Calc",
    category: "Python Fundamentals",
    featured: false,
    tagline: "Customizable Python calculator",
    description: "A foundational Python calculator project created to perform basic calculations through a simple, customizable program.",
    technologies: ["Python"],
    features: [
      "Simple calculator operations",
      "Clear foundation for extending Python programming concepts"
    ],
    github: "https://github.com/YanikKumar93/Programme_Calc",
    stats: {
      focus: "Python Basics",
      format: "CLI Program",
      status: "Completed"
    }
  }
];
