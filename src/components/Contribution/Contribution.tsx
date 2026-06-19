import { Button } from "../Button";
import { useMemo } from "react";
import { useHabits } from "../../context/useHabits";
import { ContributionGrid } from "./ContributionGrid";
import { MonthLabels } from "./MonthLables";
import { createMonthColumnMap } from "./ContributionUtils";

type ContributionProps = {
    yearDates : Date[];
    monthName: Date[]
}

export function Contribution({  yearDates, monthName }: ContributionProps) {
    const { habits } = useHabits();

    const monthColumnMap = useMemo(() => 
        createMonthColumnMap(yearDates), [yearDates])

    return (
        <div className="bg-zinc-800 px-4 py-2  rounded-lg ">

            <div className="flex">
                <div className="grid grid-rows-7 gap-[3px] pr-2 mt-[28px] h-[105px] text-[10px] select-none shrink-0">
                    <div></div>
                    <div className="flex items-center font-medium">Mon</div> 
                    <div></div>
                    <div className="flex items-center font-medium">Wed</div> 
                    <div></div>
                    <div className="flex items-center font-medium">Fri</div> 
                    <div></div>
                </div>

                <div className="overflow-x-auto flex-1">
                    <MonthLabels
                        monthName={monthName}
                        monthColumnMap={monthColumnMap}
                    />

                    <ContributionGrid 
                        yearDates={yearDates}
                        habits={habits}
                    />
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