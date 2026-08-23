export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
}

export const awards: Award[] = [
  {
    title: "Dean's Award",
    issuer: "AIUB — Faculty of Science and Technology",
    date: "Fall 2022-23",
    description: "GPA 3.91 in the CSE program, recognizing outstanding academic achievement.",
    imageUrl: "/images/fall-22-23.jpg",
  },
  {
    title: "Dean's Award",
    issuer: "AIUB — Faculty of Science and Technology",
    date: "Spring 2022-23",
    description: "Perfect GPA 4.00 in the CSE program, recognizing outstanding academic achievement.",
    imageUrl: "/images/spring-22-23.jpg",
  },
  {
    title: "Dean's Award",
    issuer: "AIUB — Faculty of Science and Technology",
    date: "Fall 2023-24",
    description: "GPA 3.85 in the CSE program, recognizing outstanding academic achievement.",
    imageUrl: "/images/fall-23-24.jpg",
  },
  {
    title: "Dean's Award",
    issuer: "AIUB — Faculty of Science and Technology",
    date: "Spring 2023-24",
    description: "GPA 3.80 in the CSE program, recognizing outstanding academic achievement.",
    imageUrl: "/images/spring-23-24.jpg",
  },
  {
    title: "Dean's Award",
    issuer: "AIUB — Faculty of Science and Technology",
    date: "Fall 2024-25",
    description: "GPA 3.85 in the CSE program, recognizing outstanding academic achievement.",
    imageUrl: "/images/fall-24-25.jpg",
  },
  {
    title: "Poster Presentation Certificate",
    issuer: "AIUB Computer Club",
    date: "2024",
    description:
      "Excellent performance in the Science Poster Contest (Senior Group), organized by the Department of Physics and ACC.",
    imageUrl: "/images/poster-presentation.jpg",
  },
];
