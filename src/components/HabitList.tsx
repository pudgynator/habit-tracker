import { Button } from "./Button";
import { eachDayOfInterval, endOfWeek, startOfWeek, format, isFuture, isSameDay, subDays } from 'date-fns';

export type Habit = {
    id: string;
    name: string;
    completions: Date[];
}

type HabitListProps = {
    habits: Habit[];
    deleteHabit: (id: string) => void;
    toggleHabit: (id: string, date: Date) => void;
}

export function HabitList({ habits, deleteHabit, toggleHabit }: HabitListProps ) {
    if (habits.length === 0) {
        return (
            <div className="flex flex-col gap-2 bg-zinc-800 p-4 rounded-lg">
                <p>No habits yet</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => (
                <HabitItem deleteHabit={deleteHabit} toggleHabit={toggleHabit} key={habit.id} habit={habit}/>
            ))}
        </div>
    )
}

type HabitItemProps = {
    habit: Habit;
    deleteHabit: (id: string) => void;
    toggleHabit: (id: string, date: Date) => void;
}

function HabitItem( { habit, deleteHabit, toggleHabit }:  HabitItemProps) {
    const visibleDates = eachDayOfInterval( 
        {
            start: startOfWeek(new Date(), { weekStartsOn: 1 }), 
            end: endOfWeek(new Date(), { weekStartsOn: 1 })
        }
    );

    const streak = getStreak(habit.completions);

    return  (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <span className="font-medium">{habit.name}</span>
                    { streak !== 0 && (
                        <span className="text-sm text-amber-400">🔥 {streak}</span>
                    )}
                    
                </div>
                <Button 
                    variant='ghost-destructive' 
                    className="text-xs" 
                    onClick={() => deleteHabit(habit.id)}
                >
                    Delete
                </Button>
            </div>
            <div className="flex gap-1.5 overflow-x-auto">
                {visibleDates.map(date => (
                    <Button 
                        className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs" 
                        key={date.toISOString()} 
                        disabled={isFuture(date)}
                        onClick={() => toggleHabit(habit.id, date)}
                        variant={habit.completions.some( d => isSameDay(date, d)) ? 'primary' : 'secondary'}
                    >
                        <span className="font-medium">{format(date, 'EEE')}</span>
                        <span>{format(date, 'd')}</span>
                    </Button> 
                ))}
            </div>
        </div>
    )
}

function getStreak(completions: Date[]) {
    let streak = 0;
    let date = new Date();

    while (completions.some(c => isSameDay(c, date))) {
        streak++;
        date = subDays(date, 1)
    }
    return streak
}
