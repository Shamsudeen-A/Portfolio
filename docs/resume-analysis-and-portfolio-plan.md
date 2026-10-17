# Resume Analysis and Portfolio Plan

Analysis date: June 7, 2026

## Executive Recommendation

Use the Data Analyst-focused resume as the primary UAE/Dubai resume, but tighten it so every claim is verifiable. Your strongest positioning is not "aspiring data scientist"; it is "Data Analyst with healthcare data operations, SLA reporting, Excel automation, and dashboard experience." That is more believable and more aligned with Dubai roles that ask for SQL, Power BI, Excel, Python, reporting automation, and business-facing analysis.

Your current profile is suitable for junior Data Analyst, MIS Analyst, Reporting Analyst, Operations Analyst, BI Analyst trainee/junior, and healthcare/insurance analytics roles in the UAE. It is not yet strong enough for senior BI/Data Analyst roles that require 5+ years, Azure/cloud data platforms, ETL/ELT ownership, DAX depth, and enterprise data governance.

## Resume 1: Original Genuine Resume

### Strengths

- Genuine HCL Technologies experience gives your resume credibility.
- Healthcare insurance data, financial reconciliation, SLA reports, production reports, and process improvement are relevant to analyst work.
- Advanced Excel, macros, Power Query, and dashboard reporting are strong entry points into Data Analyst roles.
- B.Tech in Information Technology supports the transition.

### Weaknesses

- The headline says "Aspiring Data Scientist", which is too broad for UAE Data Analyst applications.
- The resume relies on tools/learning areas but does not prove enough output: screenshots, dashboards, SQL files, notebooks, GitHub links, or Power BI reports.
- Achievements need more numbers: record volume, reporting time saved, error reduction, SLA improvement, dashboard users, and before/after impact.
- The "Career Objective" sounds entry-level and passive. Replace with a value-driven summary.

## Resume 2: UAE IT/Desktop Support Version

### Strengths

- Desktop support can be useful for UAE IT Support, Service Desk, MIS, and support analytics roles.
- ServiceNow, SLA handling, root cause analysis, incident trends, and asset/ticket records can be reframed as data-adjacent operations experience.
- The split timeline makes your support-to-data story easier to understand if the Desktop Support role is true.

### Risks and Inconsistencies

- Resume 1 says Process Associate from 11/2022 to present. Resume 2 splits the same period into Desktop Support Engineer from 11/2022 to 11/2023 and Process Associate from 12/2023 to present. This is a major consistency issue.
- If the Desktop Support role was not your actual title/work, do not use it for Data Analyst applications. UAE employers may verify titles, dates, and responsibilities.
- If the support work was real but title differed, write it honestly: "Process Associate - IT Support/Data Operations" or "Process Associate, Support Operations".

## Resume 3: Data Analyst-Focused Resume

### Strengths

- Best aligned with Dubai/UAE Data Analyst roles.
- Clearer headline: "Data Analyst".
- Better keyword coverage: SQL, Python, Pandas, NumPy, Advanced Excel, Power BI, Tableau basics, statistics, ETL concepts, data validation, reporting automation.
- Stronger quantified claims: 10K+ records weekly, ~60% manual reporting reduction, 50+ daily tickets.
- Projects are now more relevant and easier for recruiters to scan.

### Improvements Needed

- Add GitHub and portfolio links near the top.
- Add a Power BI dashboard link or screenshots. The resume says Power BI, but current experience/projects mainly prove Excel dashboards.
- Add SQL project links. SQL appears strongly in the skills section, but you need query artifacts to prove it.
- Replace "QSpiders" line break issue and update certification dates/status.
- As of June 7, 2026, "Data Science Bootcamp - In Progress, 2025" looks stale. Use "Oct 2025 - Present" or mark completed if finished.
- Add DAX only if you have actually built measures.
- Avoid "Junior Data Scientist" in the objective for Data Analyst applications unless the job asks for it.

## Skills and Achievements to Highlight

- Healthcare insurance data operations and financial reconciliation.
- Weekly analysis of 10K+ records.
- Automated Excel reporting using macros/VBA and Power Query.
- Manual reporting effort reduced by about 60%.
- SLA, production, attendance, and quality metric dashboards.
- Data audits, anomaly detection, validation, and reporting logic documentation.
- ServiceNow ticket trend analysis and root cause analysis.
- B.Tech IT background and Python/Data Science upskilling.

## UAE/Dubai Market Fit

The Dubai/UAE market is a good target if you position yourself as a practical reporting and BI analyst. Digital Dubai describes Data.Dubai as combining official statistics, datasets, and advanced analytics tools to support data-driven decision-making. The UAE Cabinet's AI Strategy 2031 also names talent, data-driven infrastructure, research, governance, and AI adoption as strategic objectives.

Recent Dubai job examples show the market pattern:

- Schneider Electric Data Analyst role: Power BI dashboards, data flow automation, SQL, Excel, data modeling, large dataset management.
- edari Senior Data and BI Analyst: SQL-driven analytics, cloud data platforms, ETL/ELT, data governance, operational reporting.
- Al Khayyat Investments Data Analyst: collect, clean, transform, SQL, Azure Data Lake, Power BI, Python/R, DAX, data pipelines.

Your profile matches the junior/reporting side of this market. To compete better, prove Power BI, SQL, and dashboard storytelling through public portfolio projects.

## Resume Fix Checklist

1. Use one truthful timeline across all resumes and LinkedIn.
2. Change headline to "Data Analyst | SQL | Python | Power BI | Advanced Excel".
3. Replace career objective with a 3-line summary focused on business value.
4. Add GitHub and portfolio links.
5. Add 2 Power BI screenshots and 2 SQL project links.
6. Quantify every HCL bullet where possible.
7. Remove or reduce school-level education unless space is available.
8. Fix spelling: "Joseph", "QSpiders", "TensorFlow".
9. Keep a UAE-ready version with location preference: "Open to relocate to Dubai/UAE".
10. Use one clean ATS PDF, not a graphic-heavy resume.

## Portfolio Design Strategy

### Positioning

Premium, recruiter-friendly, analytics-first. The first viewport should immediately show:

- Shamsudeen, Data Analyst.
- SQL, Python, Power BI, Advanced Excel.
- 3+ years data operations experience.
- Healthcare/insurance operations domain.
- Resume download, LinkedIn, GitHub, and project links.

### Color Palette

- Deep ink: `#08111f`
- Panel navy: `#101b2d`
- Teal accent: `#2dd4bf`
- Sky blue accent: `#38bdf8`
- Emerald success: `#22c55e`
- Amber insight: `#f59e0b`
- Light text: `#f5f7fb`
- Muted text: `#a9b5c7`

### Fonts, Icons, Animations

- Fonts: Inter for UI/body, JetBrains Mono or system monospace for SQL/code snippets.
- Icons: Lucide React.
- Animations: subtle hover lifts, chart loading motion, section fade-ins only if they do not hurt readability.
- UI components: KPI strips, query blocks, timeline, project case-study cards, dashboard previews, skill chips, certification tiles.

## Technology Recommendation

Python can generate a portfolio or power analytics apps, but GitHub Pages does not run a Python server. Streamlit, Dash, or Flask would need a server host, not plain GitHub Pages. Python should be used for the projects behind the portfolio, not as the portfolio frontend.

Chosen technology: Next.js with static export.

Why:

- Exports to static HTML/CSS/JS for GitHub Pages.
- Works very well on Vercel.
- Better SEO metadata than a basic client-only React app.
- Reusable React components for portfolio sections.
- Easy to grow later with blog posts, case studies, or project pages.

React with Vite is also valid and simpler, but Next.js is better for recruiter-facing SEO and future case-study pages.

## Folder Structure

```text
D:\Portfolio
|-- app
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- docs
|   `-- resume-analysis-and-portfolio-plan.md
|-- lib
|   `-- portfolio-data.ts
|-- public
|   |-- og-card.svg
|   `-- resume
|       `-- Shamsudeen-Data-Analyst-Resume.pdf
|-- tools
|   `-- extract_pdf_text.py
|-- .github
|   `-- workflows
|       `-- deploy.yml
|-- .gitignore
|-- next-env.d.ts
|-- next.config.mjs
|-- package.json
|-- README.md
`-- tsconfig.json
```

## Development Roadmap

### Phase 1: Resume and Profile Cleanup

- Finalize one truthful Data Analyst resume.
- Update LinkedIn headline, About, experience, skills, and featured links.
- Create GitHub profile README.

### Phase 2: Core Portfolio Build

- Complete homepage, dark mode, responsive layout, SEO metadata, resume download, contact links.
- Add project sections for Power BI, SQL, Python, Excel.
- Deploy to Vercel first for speed, then GitHub Pages.

### Phase 3: Project Proof

- Power BI: healthcare claims SLA dashboard and sales dashboard.
- SQL: healthcare data quality audit and ticket trend analysis.
- Python: sales EDA notebook and employee attrition analysis.
- Add README files with business problem, tools, dataset, steps, insights, and screenshots.

### Phase 4: UAE Application Push

- Target titles: Data Analyst, BI Analyst, MIS Analyst, Reporting Analyst, Operations Analyst, Junior Power BI Analyst.
- Apply to healthcare, insurance, outsourcing, shared services, retail, logistics, real estate, and banking operations teams.
- Customize the top resume summary and first 4 bullets for every role.

## Exact Prompts for Future Code/Content Generation

### Portfolio Code Prompt

```text
Build a premium Data Analyst portfolio website for Shamsudeen using Next.js static export. The site must be deployable to GitHub Pages and Vercel. Sections: hero, about, career transition, skills, tools, work timeline, Power BI projects, SQL projects, Python projects, certifications, resume download, contact, GitHub, LinkedIn. Use dark mode, responsive design, recruiter-friendly copy, dashboard-style KPI UI, SQL query visual blocks, Lucide icons, SEO metadata, and accessible HTML. Use this positioning: Data Analyst with 3+ years at HCL Technologies in healthcare data operations, SLA reporting, Excel automation, Power Query/macros, SQL, Python, Power BI, and dashboard reporting.
```

### Power BI Project Prompt

```text
Create a Power BI portfolio project plan for a Healthcare Claims SLA Dashboard. Include dataset columns, star schema, Power Query transformations, DAX measures, KPI cards, charts, filters, business questions, insights, README structure, and screenshot checklist. Make it suitable for Dubai/UAE Data Analyst recruiters.
```

### SQL Project Prompt

```text
Create a SQL portfolio project for Healthcare Data Quality Audit using MySQL. Provide schema, sample data generation plan, 25 SQL queries using joins, CTEs, window functions, aggregations, duplicate detection, missing value checks, aging buckets, reconciliation exceptions, and business insight summaries.
```

### Python Project Prompt

```text
Create a Python EDA notebook outline for Sales Data Analysis using Pandas, NumPy, Matplotlib, and Seaborn. Include cleaning steps, feature engineering, visualizations, business questions, insight summaries, and a GitHub README written for recruiters.
```

### Resume Rewrite Prompt

```text
Rewrite my resume for Data Analyst roles in Dubai/UAE. Keep the timeline truthful. Emphasize healthcare data operations, SLA reporting, SQL, Python, Power BI, Advanced Excel, Power Query, macros, dashboards, data validation, reconciliation, and stakeholder reporting. Quantify impact using 10K+ weekly records, ~60% reporting effort reduction, and 50+ daily tickets only where accurate. Make it ATS-friendly and recruiter-readable.
```

## Deployment Steps

### GitHub Pages

1. Install Node.js 22+.
2. Run `npm install`.
3. Run `npm run build`.
4. Push to GitHub.
5. In repository settings, set Pages source to GitHub Actions.
6. Push to `main`; the workflow publishes the `out/` folder.

### Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use the Next.js preset.
4. Deploy.

## Sources Referenced

- GitHub Pages static hosting: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Next.js static export: https://nextjs.org/docs/pages/guides/static-exports
- Vercel Next.js deployment: https://vercel.com/docs/frameworks/full-stack/nextjs
- Vite static deployment comparison: https://github.com/vitejs/vite/blob/main/docs/guide/static-deploy.md
- Digital Dubai Data.Dubai: https://www.digitaldubai.ae/apps-services/details/data.dubai
- UAE Cabinet AI Strategy 2031: https://uaecabinet.ae/en/news/uae-cabinet-adopts-national-artificial-intelligence-strategy-2031
- Schneider Electric Dubai Data Analyst example: https://www.linkedin.com/jobs/view/4336252378/
- edari Dubai Senior Data and BI Analyst example: https://www.linkedin.com/jobs/view/4418952188/
- Al Khayyat Investments Dubai Data Analyst example: https://www.linkedin.com/jobs/view/4361756989/
