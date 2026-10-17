import {
  BarChart3,
  Database,
  FileSpreadsheet,
  LineChart,
  LucideIcon,
  ServerCog,
  TerminalSquare
} from "lucide-react";

type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

type ProjectGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  projects: {
    title: string;
    status: string;
    stack: string;
    summary: string;
    points: string[];
  }[];
};

export const transitionPoints = [
  {
    step: "01",
    title: "Operations foundation",
    description:
      "Handled healthcare insurance data, SLA reports, production metrics, reconciliation checks, and process documentation."
  },
  {
    step: "02",
    title: "Automation mindset",
    description:
      "Used Advanced Excel, Power Query, macros, and dashboard reporting to reduce manual effort and improve visibility."
  },
  {
    step: "03",
    title: "Analyst portfolio",
    description:
      "Building SQL, Python, Power BI, and business case-study projects that translate work experience into interview evidence."
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "SQL & Data Querying",
    icon: Database,
    items: ["Joins and aggregations", "CTEs and window functions", "Data validation", "Anomaly checks"]
  },
  {
    title: "Python Analytics",
    icon: TerminalSquare,
    items: ["Pandas and NumPy", "EDA notebooks", "Matplotlib and Seaborn", "scikit-learn basics"]
  },
  {
    title: "BI & Dashboards",
    icon: BarChart3,
    items: ["Power BI", "Excel dashboards", "Pivot models", "KPI storytelling"]
  },
  {
    title: "Business Operations",
    icon: ServerCog,
    items: ["SLA reporting", "Healthcare data operations", "Root cause analysis", "Stakeholder communication"]
  }
];

export const tools = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "SQL",
  "MySQL",
  "Power BI",
  "DAX",
  "Power Query",
  "Python",
  "Pandas",
  "NumPy",
  "Advanced Excel",
  "VBA/Macros",
  "Git & GitHub"
];

export const experience = [
  {
    title: "Process Associate - Data Operations",
    company: "HCL Technologies | Chennai, Tamil Nadu",
    period: "Dec 2023 - Present",
    highlights: [
      "Analyzed healthcare insurance datasets of 10K+ records weekly for accuracy and financial reconciliation.",
      "Built automated Excel reports with macros and Power Query, reducing manual reporting effort by about 60%.",
      "Created SLA, production, quality, and attendance dashboards for operational visibility.",
      "Identified process gaps through data trends and documented reporting logic across transitions."
    ]
  },
  {
    title: "Desktop Support Engineer",
    company: "HCL Technologies | Chennai, Tamil Nadu",
    period: "Nov 2022 - Nov 2023",
    highlights: [
      "Prioritized 50+ daily ServiceNow tickets and maintained clean ticket records for reporting and audit readiness.",
      "Performed root cause analysis on recurring incidents and prepared weekly trend reports.",
      "Resolved hardware, software, operating system, and connectivity issues within SLA timelines."
    ]
  }
];

export const projectGroups: ProjectGroup[] = [
  {
    id: "web-software-projects",
    title: "Web & Software Projects",
    icon: TerminalSquare,
    projects: [
      {
        title: "TradingPilot AI",
        status: "Featured Project",
        stack: "Next.js, React, TypeScript, AI APIs, Tailwind CSS",
        summary:
          "An AI-powered trading copilot and market analysis web application offering algorithmic signal insights, responsive charting UI, and interactive prompt assistant.",
        points: [
          "Built full-stack frontend with Next.js and TypeScript featuring modern dark-mode trading interface",
          "Integrated AI analytics to scan trading market patterns and generate automated summaries",
          "Engineered responsive components with real-time UI updates and data visualization"
        ]
      },
      {
        title: "Zamss.in - Dropshipping E-Commerce Platform",
        status: "Production Ready",
        stack: "React.js, Next.js, Tailwind CSS, REST APIs, Payment Gateway",
        summary:
          "End-to-end modern dropshipping e-commerce website with fast product filtering, cart checkout workflows, mobile-optimized catalog, and seamless order management.",
        points: [
          "Developed high-conversion product catalog and dynamic storefront with clean responsive design",
          "Implemented state management for cart, checkout flows, and customer order processing",
          "Optimized SEO, image loading, and page speeds for e-commerce conversion"
        ]
      }
    ]
  },
  {
    id: "power-bi-dashboards",
    title: "Power BI Dashboards",
    icon: BarChart3,
    projects: [
      {
        title: "Healthcare Claims SLA Dashboard",
        status: "Build next",
        stack: "Power BI, DAX, Power Query",
        summary:
          "A dashboard case study based on anonymized healthcare operations metrics: SLA compliance, production volume, aging claims, and quality rate.",
        points: ["Create star schema", "Add DAX KPI measures", "Publish screenshots and business insights"]
      },
      {
        title: "Sales Performance BI Dashboard",
        status: "Portfolio-ready concept",
        stack: "Power BI, Excel, DAX",
        summary:
          "Regional sales performance dashboard showing revenue trends, top products, seasonality, and customer buying patterns.",
        points: ["Use public sales dataset", "Show executive summary", "Add downloadable PBIX or screenshots"]
      }
    ]
  },
  {
    id: "sql-projects",
    title: "SQL Projects",
    icon: Database,
    projects: [
      {
        title: "Healthcare Data Quality Audit",
        status: "Build next",
        stack: "MySQL, CTEs, Window Functions",
        summary:
          "SQL project for duplicate detection, missing-field checks, claim aging buckets, and reconciliation exception reporting.",
        points: ["Write 20+ queries", "Document business questions", "Publish schema and query outputs"]
      },
      {
        title: "Ticket Trend Analysis",
        status: "Experience-backed",
        stack: "SQL, ServiceNow export",
        summary:
          "Analysis of ticket category, priority, aging, recurrence, and resolution time to identify preventive maintenance actions.",
        points: ["Use anonymized support data", "Segment by category", "Recommend reduction actions"]
      }
    ]
  },
  {
    id: "python-projects",
    title: "Python Projects",
    icon: LineChart,
    projects: [
      {
        title: "Sales Data Analysis",
        status: "Resume project",
        stack: "Python, Pandas, NumPy, Seaborn",
        summary:
          "Cleaned and analyzed 10,000+ sales records, finding top regions, trend patterns, and customer behavior signals.",
        points: ["EDA notebook", "Clear charts", "Insight summary for non-technical readers"]
      },
      {
        title: "Employee Attrition Analysis",
        status: "Resume project",
        stack: "Python, scikit-learn",
        summary:
          "Explored HR attrition drivers and built a logistic regression baseline with encoded features and model metrics.",
        points: ["EDA before modeling", "Precision and recall", "Explain business risks"]
      }
    ]
  },
  {
    id: "excel-projects",
    title: "Excel Automation",
    icon: FileSpreadsheet,
    projects: [
      {
        title: "Operations Automation Dashboard",
        status: "Experience-backed",
        stack: "Excel, Power Query, VBA",
        summary:
          "Dashboard for attendance, production metrics, and SLA compliance with formulas, conditional formatting, and macros.",
        points: ["Before/after workflow", "Macro logic notes", "KPI screenshots"]
      }
    ]
  }
];

export const certifications = [
  {
    title: "Core Java",
    provider: "QSpiders | Core Java, OOP, Collections, Multi-threading, Exception Handling",
    date: "Completed",
    link: "https://drive.google.com/file/d/1l7XwQdN5Hx8Q8UPSXkZlDJqS5xIOZlJo/view?usp=drive_link"
  },
  {
    title: "Python Programming",
    provider: "QSpiders | Core Python, OOP, file handling, exceptions, automation basics",
    date: "2025",
    link: "https://drive.google.com/file/d/1qDOuC8J9uKB8l0BGC60oMZ0IQd56mB_p/view?usp=drive_link"
  },
  {
    title: "Data Science Bootcamp",
    provider: "Udemy | Statistics, Pandas, NumPy, Matplotlib, Seaborn, ML basics",
    date: "In progress, 2025"
  }
];
