export interface SkillGroup {
  label: string;
  color: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "backend",
    color: "text-purple",
    items: ["C#", "ASP.NET MVC", ".NET Core", "Node.js", "Express.js", "Nest.js", "PHP", "Python", "REST APIs"],
  },
  {
    label: "databases",
    color: "text-green",
    items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    label: "frontend",
    color: "text-amber",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "Responsive Design"],
  },
  {
    label: "tools_and_soft_skills",
    color: "text-purple",
    items: ["Git", "GitHub", "Postman", "Figma", "UI/UX Principles", "Problem Solving", "Critical Thinking", "Teamwork", "Communication"],
  },
];
