import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ProfileType } from "@/types";

interface ProfileAboutProps {
  profile: ProfileType;
}

export const ProfileAbout = ({ profile }: ProfileAboutProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">About</h3>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-muted-foreground">{profile.about}</p>
    </Card>
  );
};