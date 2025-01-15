import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, Plus } from "lucide-react";
import { ProfileType } from "@/types";

interface ProfileEducationProps {
  profile: ProfileType;
}

export const ProfileEducation = ({ profile }: ProfileEducationProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Education</h3>
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-6">
        {profile.education?.map((edu, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <School className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{edu.school}</h4>
              <p className="text-sm text-muted-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};