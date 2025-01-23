import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

interface ProfileStrengthProps {
  strength: number;
  recommendations: string[];
}

export const ProfileStrength = ({ strength, recommendations }: ProfileStrengthProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ChartBar className="w-5 h-5 text-qudpro-primary" />
          <h4 className="text-lg font-semibold text-foreground">Profile Strength</h4>
        </div>
        <span className="text-sm font-medium text-qudpro-primary">{strength}%</span>
      </div>
      <Progress value={strength} className="h-2 mb-4" />
      {recommendations.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Recommendations to improve:</p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};