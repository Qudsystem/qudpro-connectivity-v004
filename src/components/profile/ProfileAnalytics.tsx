import { Card } from "@/components/ui/card";
import { ProfileType } from "@/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ProfileAnalyticsProps {
  profile: ProfileType;
}

export const ProfileAnalytics = ({ profile }: ProfileAnalyticsProps) => {
  const data = [
    { name: 'Mon', views: 24 },
    { name: 'Tue', views: 13 },
    { name: 'Wed', views: 98 },
    { name: 'Thu', views: 39 },
    { name: 'Fri', views: 48 },
    { name: 'Sat', views: 38 },
    { name: 'Sun', views: 43 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Profile Analytics</h3>
      <div className="space-y-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#1a365d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{profile.views}</span> profile views this week
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{profile.connections}</span> total connections
          </p>
        </div>
      </div>
    </Card>
  );
};