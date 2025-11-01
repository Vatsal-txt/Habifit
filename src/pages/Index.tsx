import { useState, useEffect } from "react";
import { HabitCard } from "@/components/HabitCard";
import { AddHabitDialog } from "@/components/AddHabitDialog";
import { StatsCard } from "@/components/StatsCard";
import { Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  lastCompletedDate: string;
}

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const today = new Date().toDateString();

  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      const parsedHabits = JSON.parse(savedHabits);
      const updatedHabits = parsedHabits.map((habit: Habit) => ({
        ...habit,
        completed: habit.lastCompletedDate === today,
      }));
      setHabits(updatedHabits);
    }
  }, [today]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      streak: 0,
      completed: false,
      lastCompletedDate: "",
    };
    setHabits([...habits, newHabit]);
    toast.success("Habit added! Start your streak today 🎯");
  };

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newCompleted = !habit.completed;
          const newStreak = newCompleted
            ? habit.lastCompletedDate === new Date(Date.now() - 86400000).toDateString()
              ? habit.streak + 1
              : 1
            : Math.max(0, habit.streak - 1);

          if (newCompleted) {
            toast.success("Great job! Keep it up! 🔥", {
              description: newStreak > 1 ? `${newStreak} day streak!` : "Start your streak!",
            });
          }

          return {
            ...habit,
            completed: newCompleted,
            streak: newStreak,
            lastCompletedDate: newCompleted ? today : habit.lastCompletedDate,
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    toast.info("Habit removed");
  };

  const completedToday = habits.filter((h) => h.completed).length;
  const averageStreak = habits.length > 0
    ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">Daily Habits</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Build Your Best Self</h1>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-4">
        {/* Stats Card */}
        <StatsCard
          totalHabits={habits.length}
          completedToday={completedToday}
          averageStreak={averageStreak}
        />

        {/* Habits List */}
        <div className="mt-6 space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
              <p className="text-muted-foreground mb-6">
                Start building positive habits today!
              </p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                {...habit}
                onToggle={toggleHabit}
                onDelete={deleteHabit}
              />
            ))
          )}
        </div>

        {/* Add Habit Button */}
        <div className="mt-6">
          <AddHabitDialog onAddHabit={addHabit} />
        </div>
      </div>
    </div>
  );
};

export default Index;
