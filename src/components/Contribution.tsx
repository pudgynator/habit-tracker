import { format, isFuture, isSameDay } from "date-fns";
import { Button } from "./Button";
import { useMemo } from "react";
import { useHabits } from "../context/useHabits";

type ContributionProps = {
    yearDates : Date[];
    monthName: Date[]
}

const levels = ['none', 'low', 'medium', 'high', 'max'] as const;

export function Contribution({  yearDates, monthName }: ContributionProps) {
    const { habits } = useHabits();

    const contributionLevel = (date) => {
        const totalHabits = habits.length;
        if( totalHabits === 0 ) return 'none';

        const doneToday = habits.filter( h => h.completions.some(
            c => isSameDay(new Date(c), date)
        )).length

        if (doneToday === totalHabits) return 'max';

        const levelIndex = Math.min(
            levels.length - 1, Math.ceil( (doneToday / totalHabits) * (levels.length - 1 ))
        );

        return levels[levelIndex];

    }

    const monthColumnMap = useMemo(() => {
        const map = new Map<string, number>();

        yearDates.forEach((day, index) => {
            const key = `${day.getFullYear()}-${day.getMonth()}`;

            if (map.has(key)) {
                return;
            }

            const col = Math.floor(index / 7)
            map.set(key, col);
        })

        return map;
    }, [yearDates])

    return (

        <div className="bg-zinc-800 px-4 py-2  rounded-lg ">

            <div className="overflow-x-auto">
                <div className="flex h-7 relative w-max min-w-full">
                {(() => {
                    const renderedMonths = new Set<string>();
                    
                    return monthName.map((month, index) => {
                        const key = `${month.getFullYear()}-${month.getMonth()}`;

                        if (renderedMonths.has(key)) return null;

                        let col = monthColumnMap.get(key);
                        if (col === undefined) return null;
                        
                        if (index > 0) {
                            const prevMonth = monthName[index - 1];
                            const prevKey = `${prevMonth.getFullYear()}-${prevMonth.getMonth()}`;
                            const prevCol = monthColumnMap.get(prevKey);
            
                            if (prevCol !== undefined && (col - prevCol) < 2) {
                                col = prevCol+2;
                            }
                        }

                        renderedMonths.add(key);

                        return (
                            <div 
                                className="flex absolute whitespace-nowrap"
                                key={key}
                                style={{ left: `${col * 20}px` }} 
                            >
                                {format(month, 'MMM')}
                            </div>
                        );
                    }); 
                })()}
                
                </div>

                <div className="grid w-max grid-cols-53 grid-rows-7 grid-flow-col gap-y-1 gap-x-1 mb-1">
                    {yearDates.map(date => {
                        const currVariant = contributionLevel(date);
                        return (
                            <Button
                            className="size-3  rounded-sm"
                            key={date.toISOString()} 
                            disabled={isFuture(date)}
                            title={format(date, 'MMM d')}
                            variant={currVariant}
                        >
                        </Button>
                        )
                    })}
                </div>
            </div>

            <div className="flex sticky  w-max right-0 ml-auto gap-0.5 items-center">
                <span className="font-medium">Less</span>
                <Button className="size-3  rounded-sm" variant={'none'} />
                <Button className="size-3  rounded-sm" variant={'low'} />
                <Button className="size-3  rounded-sm" variant={'medium'} />
                <Button className="size-3  rounded-sm" variant={'high'} />
                <Button className="size-3  rounded-sm" variant={'max'} />
                <span className="font-medium">More</span>
            </div>
        </div>
    )
}