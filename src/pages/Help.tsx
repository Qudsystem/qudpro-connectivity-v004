
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const helpTopics = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: "Welcome to QudPro! Get started by creating your professional profile, connecting with other professionals across Egypt, and exploring job opportunities."
  },
  {
    id: "profile",
    title: "Profile Setup",
    content: "Upload a professional photo, add your work experience, education, and skills. Make sure to write a compelling bio that highlights your expertise."
  },
  {
    id: "networking",
    title: "Networking",
    content: "Connect with other professionals, join industry groups, and participate in discussions. Grow your network to discover new opportunities."
  },
  {
    id: "jobs",
    title: "Finding Jobs",
    content: "Search for jobs that match your skills and experience. Apply directly through QudPro and track your applications."
  },
  {
    id: "messaging",
    title: "Messaging",
    content: "Communicate with your connections through our messaging system. Keep your conversations professional and organized."
  },
  {
    id: "security",
    title: "Account Security",
    content: "Protect your account by using a strong password and enabling two-factor authentication. Review your privacy settings regularly."
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTopics = helpTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions and learn how to make the most of QudPro
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        <Card className="p-6">
          <Accordion type="single" collapsible>
            {filteredTopics.map((topic) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <AccordionTrigger className="text-left">
                  {topic.title}
                </AccordionTrigger>
                <AccordionContent>
                  {topic.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still need help? Contact our support team at{" "}
            <a href="mailto:support@qudpro.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              support@qudpro.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
