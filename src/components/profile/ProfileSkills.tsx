import { Award } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Skill {
  name: string;
  endorsements: number;
}

interface ProfileSkillsProps {
  skills: Skill[];
}

export const ProfileSkills = ({ skills }: ProfileSkillsProps) => {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold text-foreground mb-4">Skills & Endorsements</h4>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-qudpro-primary" />
              <span className="text-sm text-gray-600">{skill.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{skill.endorsements} endorsements</span>
              <button className="opacity-0 group-hover:opacity-100 text-xs text-qudpro-primary hover:text-qudpro-secondary transition-opacity">
                Endorse
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};