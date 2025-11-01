import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Flame } from "lucide-react";

interface HabitCardProps {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HabitCard = ({ id, name, streak, completed, onToggle, onDelete }: HabitCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onToggle(id);
  };

  return (
    <Card 
      className={`p-4 transition-all duration-300 ${
        completed 
          ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30' 
          : 'hover:shadow-md'
      } ${isAnimating ? 'scale-105' : 'scale-100'}`}
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="flex items-center gap-4">
        <Checkbox 
          id={id}
          checked={completed}
          onCheckedChange={handleToggle}
          className={`h-7 w-7 rounded-full transition-all duration-300 ${
            completed ? 'data-[state=checked]:bg-accent' : ''
          }`}
        />
        <div className="flex-1 min-w-0">
          <label
            htmlFor={id}
            className={`text-base font-medium cursor-pointer transition-all duration-300 ${
              completed ? 'line-through opacity-60' : ''
            }`}
          >
            {name}
          </label>
          {streak > 0 && (
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <Flame className="h-4 w-4 text-accent" />
              <span className="font-semibold">{streak} day streak</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
