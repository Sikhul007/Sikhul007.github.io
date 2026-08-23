export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "home", href: "#" },
  { name: "about", href: "#about" },
  { name: "experience", href: "#experience" },
  { name: "projects", href: "#projects" },
  { name: "awards", href: "#awards" },
  { name: "contact", href: "#contact" },
];

export const experienceLogs: string[] = [
  "Built and maintained RESTful APIs and backend services using .NET Core.",
  "Optimized SQL Server databases, improving query performance and reliability.",
  "Implemented role-based authentication and security features.",
  "Contributed to system design, debugging and testing for scalable solutions.",
  "Collaborated with senior engineers on efficient backend architecture.",
];

export interface SocialLink {
  name: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/Sikhul007" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/md-sikhul-islam-shihab/" },
  { name: "Twitter", href: "https://twitter.com/sikhulshihab" },
  { name: "Facebook", href: "https://www.facebook.com/shihab.sikhul" },
  { name: "Instagram", href: "https://www.instagram.com/sikhulshihab/" },
  { name: "YouTube", href: "https://www.youtube.com/@sikhulshihab" },
];

export const contactInfo = {
  email: "sikhulshihab@gmail.com",
  phone: "+8801889031522",
  phoneDisplay: "+88 01889 031522",
  location: "Shyampur, Dhaka, Bangladesh",
};

export const resumePath = "/resume/Md. Sikhul Islam Shihab_CV.pdf";

export const roles = ["Backend Engineer", ".NET Developer", "API Architect", "Problem Solver"];
