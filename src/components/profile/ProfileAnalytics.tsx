import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Eye, TrendingUp, Users } from "lucide-react";

interface ProfileAnalyticsProps {
  views: number;
  connections: number;
  impressions: number;
  viewsData: Array<{ date: string; views: number }>;
}

export const ProfileAnalytics = ({ views, connections, impressions, viewsData }: ProfileAnalyticsProps) => {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold text-foreground mb-4">Profile Analytics</h4>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-600">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Profile Views</span>
          </div>
          <p className="text-xl font-semibold text-qudpro-primary">{views}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Connections</span>
          </div>
          <p className="text-xl font-semibold text-qudpro-primary">{connections}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Impressions</span>
          </div>
          <p className="text-xl font-semibold text-qudpro-primary">{impressions}</p>
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={viewsData}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#1a365d"
              strokeWidth={2}
              dot={{ fill: "#1a365d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};