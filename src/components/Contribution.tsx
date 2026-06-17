import { format  } from "date-fns";
import { Button } from "./Button";
import type { Habit } from "../context/useHabits";

type ContributionProps = {
    habit: Habit;
    yearDates : Date[];
}

export function Contribution({  yearDates }: ContributionProps) {

    return (
        <div className="bg-zinc-800 px-4 py-2 overflow-x-auto rounded-lg">
            <div className="grid w-max grid-cols-53 grid-rows-7 grid-flow-col gap-y-1 gap-x-1 ">
                {yearDates.map(date => (
                    <Button
                        className="size-3  rounded-sm"
                        key={date.toISOString()} 
                        title={format(date, 'MMM d')}
                        variant={'contribute'}
                    >
                    </Button>
                ))}

            </div>
        </div>
    )
}