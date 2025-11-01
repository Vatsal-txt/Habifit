import { Card } from "@/components/ui/card";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

interface StatsCardProps {
  totalHabits: number;
  completedToday: number;
  averageStreak: number;
}

export const StatsCard = ({ totalHabits, completedToday, averageStreak }: StatsCardProps) => {
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <h3 className="font-semibold mb-4 text-lg">Today's Progress</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <div className="text-2xl font-bold">{completedToday}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <TrendingUp className="h-8 w-8 text-accent" />
          </div>
          <div className="text-2xl font-bold">{averageStreak}</div>
          <div className="text-xs text-muted-foreground">Avg Streak</div>
        </div>
      </div>
    </Card>
  );
};
