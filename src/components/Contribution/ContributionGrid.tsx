import { format, isFuture } from "date-fns";
import { Button } from "../Button";
import { getContributionLevel } from "./ContributionUtils";


export function ContributionGrid( {yearDates, habits}) {
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