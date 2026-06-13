import { Button } from "./Button";
import { eachDayOfInterval, endOfWeek, startOfWeek, format, isFuture } from 'date-fns';

export function HeaderList() {
    const habits =[
        { id: '1', name: 'Practice CSS', }, 
    ];
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
                <HabitItem key={habit.id} habit={habit}/>
            ))}
        </div>
    )
}

type HabitItemProps = {
    habit: { id: string; name: string; };
}

function HabitItem( { habit }:  HabitItemProps) {
    const visibleDates = eachDayOfInterval( 
        {
            start: startOfWeek(new Date(), { weekStartsOn: 1 }), 
            end: endOfWeek(new Date(), { weekStartsOn: 1 })
        }
    );

    return  (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <span className="font-medium">{habit.name}</span>
                    <span className="text-sm text-amber-400">🔥 3</span>
                </div>
                <Button variant='ghost-destructive' className="text-xs">
                    Delete
                </Button>
            </div>
            <div className="flex gap-1.5 overflow-x-auto">
                {visibleDates.map(date => (
                    <Button className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs" key={date.toISOString()} disabled={isFuture(date)}>
                        <span className="font-medium">{format(date, 'EEE')}</span>
                        <span>{format(date, 'd')}</span>
                    </Button> 
                ))}
            </div>
        </div>
    )
}
