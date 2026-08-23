export interface Project {
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export const projects: Project[] = [
  {
    title: "Hotel Amin International",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Tailwind"],
    description:
      "Full-stack hotel management platform with booking flows, an admin dashboard and a PostgreSQL-backed NestJS API.",
    imageUrl: "/images/pro_1.png",
    projectUrl: "https://github.com/Sikhul007/Hotel-Amin-Adv.-Web",
  },
  {
    title: "Land Digitalization & Fraud Prevention",
    tags: ["AI", "Blockchain", "System Design"],
    description:
      "Integrated land and real-estate digitalization system using AI for fraud detection and blockchain for immutable transactions.",
    imageUrl: "/images/diagram.png",
    projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
  },
  {
    title: ".NET Movie Backend",
    tags: ["C#", "ASP.NET", "3-Tier Architecture"],
    description:
      "Backend built on a clean 3-tier architecture with separated data, business and presentation layers.",
    imageUrl: "/images/pro_4.png",
    projectUrl: "https://github.com/Sikhul007/Dot-Net/tree/main/Movie",
  },
  {
    title: "Travel Agency Platform",
    tags: ["PHP", "MySQL", "JavaScript"],
    description:
      "Booking platform with validated front-end forms, PHP business logic and secure database-backed storage.",
    imageUrl: "/images/pro_2.png",
    projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
  },
  {
    title: "Travel Agency (Desktop)",
    tags: ["C#", "WinForms", "SQL Server"],
    description:
      "Desktop travel management app covering UI, database management, and full documentation of the build process.",
    imageUrl: "/images/pro_3.png",
    projectUrl: "https://github.com/Sikhul007/Travel-agency-C-sharp",
  },
  {
    title: "Amazon Homepage Clone",
    tags: ["HTML", "CSS", "Responsive"],
    description:
      "Pixel-close, fully responsive recreation of the Amazon homepage across desktop, tablet and mobile breakpoints.",
    imageUrl: "/images/pro_5.png",
    projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
  },
];
