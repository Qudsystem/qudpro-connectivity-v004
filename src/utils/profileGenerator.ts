import { ProfileType } from "@/types";

export const defaultProfile: ProfileType = {
  id: "1",  // Added missing id field
  name: "Ahmed Hassan",
  role: "Senior Software Engineer",
  company: "QudSystem",
  location: "Cairo, Egypt",
  website: "https://qudsystem.com",
  email: "ahmed.hassan@qudsystem.com",
  connections: 500,
  views: 1200,
  about: "Experienced software engineer specializing in web development and cloud solutions. Passionate about building scalable applications and mentoring junior developers.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "QudSystem",
      period: "2020 - Present",
      description: "Leading development of enterprise web applications"
    },
    {
      title: "Software Engineer",
      company: "Cairo Tech",
      period: "2018 - 2020",
      description: "Full-stack development of web applications"
    }
  ],
  education: [
    {
      school: "Cairo University",
      degree: "Bachelor's in Computer Science",
      period: "2014 - 2018"
    }
  ]
};