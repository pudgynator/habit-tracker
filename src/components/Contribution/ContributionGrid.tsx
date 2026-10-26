import { format, isFuture } from "date-fns";
import type { Habit } from "../../context/useHabits";
import { Button } from "../Button";
import { getContributionLevel } from "./ContributionUtils";

type ContributionGridProps = {
    yearDates: Date[];
    habits: Habit[];
}

export function ContributionGrid({ yearDates, habits }: ContributionGridProps) {
    return(
        <div className="grid w-max grid-cols-53 grid-rows-7 grid-flow-col gap-y-1 gap-x-1 mb-1">
            {yearDates.map(date => {
                const level = getContributionLevel(date, habits);
                return (
                    <Button
                    className="size-3  rounded-sm"
                    key={date.toISOString()} 
                    disabled={isFuture(date)}
                    title={format(date, 'MMM d')}
                    variant={level}
                >
                </Button>
                )
            })}
        </div>
    )
}