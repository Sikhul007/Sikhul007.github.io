export interface SkillDetail {
  name: string;
  experience: string;
  level: "Advanced" | "Intermediate" | "Proficient";
  description: string;
  keyProjects?: string[];
}

export interface SkillGroup {
  label: string;
  color: string;
  items: SkillDetail[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "backend",
    color: "text-purple",
    items: [
      {
        name: "C#",
        experience: "2+ Years",
        level: "Advanced",
        description: "Primary language for building enterprise backend solutions, OOP systems, and asynchronous microservices.",
        keyProjects: ["Documentation Management System", "E-Commerce Microservices"]
      },
      {
        name: ".NET Core",
        experience: "2+ Years",
        level: "Advanced",
        description: "High-performance REST API architecture, JWT/RBAC security, middleware execution, and raw ADO.NET query execution.",
        keyProjects: ["Pathao Pay & City Bank Gateway Integrations", "E-Commerce Inventory API"]
      },
      {
        name: "ASP.NET MVC",
        experience: "1.5 Years",
        level: "Advanced",
        description: "Built server-side rendered internal applications, administrative tools, and documentation workflows.",
        keyProjects: ["Office DMS", "Payroll Systems"]
      },
      {
        name: "Node.js",
        experience: "1+ Year",
        level: "Proficient",
        description: "Asynchronous runtime environments for lightweight API endpoints, real-time events, and serverless handlers.",
        keyProjects: ["Utility Webhooks Service"]
      },
      {
        name: "Express.js",
        experience: "1+ Year",
        level: "Proficient",
        description: "Minimalist web framework utilized for quick microservices and prototype integrations.",
        keyProjects: ["Auth Proxy Service"]
      },
      {
        name: "Nest.js",
        experience: "6+ Months",
        level: "Intermediate",
        description: "Modular, TypeScript-first Node.js framework following enterprise angular-like architecture.",
        keyProjects: ["Scalable Microservice Proof-of-Concept"]
      },
      {
        name: "REST APIs",
        experience: "2+ Years",
        level: "Advanced",
        description: "RESTful standard design, hypermedia endpoints, robust request validation, rate limiting, and structured JSON contracts.",
        keyProjects: ["Payment Gateways", "CMS Catalogue Services"]
      }
    ],
  },
  {
    label: "databases",
    color: "text-green",
    items: [
      {
        name: "PostgreSQL",
        experience: "2+ Years",
        level: "Advanced",
        description: "Designing enterprise relational schemas, query tuning, stored procedure creation, and T-SQL optimization.",
        keyProjects: ["CMS Catalogue", "Payroll Database Architecture"]
      },
      {
        name: "SQL Server",
        experience: "1+ Year",
        level: "Proficient",
        description: "Relational database management, JSONB query handling, and transactional consistency across web apps.",
        keyProjects: ["E-Commerce Microservices"]
      },
      {
        name: "MySQL",
        experience: "1.5 Years",
        level: "Proficient",
        description: "Designing efficient index patterns and multi-table joining for web application storage.",
        keyProjects: ["Product & Partner Management CMS"]
      },
      {
        name: "MongoDB",
        experience: "1+ Year",
        level: "Intermediate",
        description: "NoSQL document storage for unstructured datasets, rapid prototyping, and dynamic schema storage.",
        keyProjects: ["Activity Audit Logger"]
      }
    ],
  },
  {
    label: "frontend",
    color: "text-amber",
    items: [
      {
        name: "TypeScript",
        experience: "1.5 Years",
        level: "Advanced",
        description: "Type-safe application engineering with strict contract definitions and interface modeling.",
        keyProjects: ["Live API Developer Portfolio"]
      },
      {
        name: "Next.js",
        experience: "1.5 Years",
        level: "Advanced",
        description: "Modern SSR/SSG React framework utilizing App Router, Server Components, and optimized rendering.",
        keyProjects: ["Personal Developer Platform"]
      },
      {
        name: "React",
        experience: "2+ Years",
        level: "Advanced",
        description: "Building responsive component architectures, state management flows, and custom hooks.",
        keyProjects: ["E-Commerce Admin Panel"]
      },
      {
        name: "Tailwind CSS",
        experience: "2+ Years",
        level: "Advanced",
        description: "Utility-first CSS styling system used for rapid, responsive, themeable layout creation.",
        keyProjects: ["Enterprise Dashboard Designs"]
      }
    ],
  },
  {
    label: "tools_and_soft_skills",
    color: "text-purple",
    items: [
      {
        name: "Git & GitHub",
        experience: "2.5+ Years",
        level: "Advanced",
        description: "Version control workflows, branching strategies, rebase operations, and code review management.",
        keyProjects: ["Production Monorepo Versioning"]
      },
      {
        name: "Postman",
        experience: "2+ Years",
        level: "Advanced",
        description: "API testing suites, collection documentation, automated mock testing, and environment variable scripting.",
        keyProjects: ["Payment API Automated Testing"]
      },
      {
        name: "Cloudflare Turnstile",
        experience: "1 Year",
        level: "Proficient",
        description: "Privacy-focused CAPTCHA solution integration to prevent bot abuse and brute-force entry.",
        keyProjects: ["E-Commerce Login Bot Defense"]
      }
    ],
  }
];