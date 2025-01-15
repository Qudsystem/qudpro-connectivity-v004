import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { ProfileType } from "@/types";

interface ProfileExperienceProps {
  profile: ProfileType;
}

export const ProfileExperience = ({ profile }: ProfileExperienceProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Experience</h3>
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-6">
        {profile.experience?.map((exp, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{exp.title}</h4>
              <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
              <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};