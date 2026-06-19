import { Header } from "./components/Header";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { HabitProvider } from "./context/HabitProvider";
import { Contribution } from "./components/Contribution/Contribution";
import { useState } from "react";
import {
    addWeeks,
    eachDayOfInterval,
    eachMonthOfInterval,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
    subYears,
} from "date-fns";


export default function App() {
    const [weekOffset, setWeekOffset] = useState(0);

    const date = new Date();
    //date.setDate(date.getDate());
    const week = addWeeks(date, weekOffset);
    const visibleDates = eachDayOfInterval({
        start: startOfWeek(week, { weekStartsOn: 0 }),
        end: endOfWeek(week, { weekStartsOn: 0 }),
    });

    const yearDates = eachDayOfInterval({
        start: startOfWeek(subYears(date, 1), { weekStartsOn: 0 }),
        end: endOfWeek(date, { weekStartsOn: 0 }),
    });

    const monthName = eachMonthOfInterval({
        start: startOfMonth(yearDates[0]),
        end: endOfMonth(yearDates[yearDates.length - 1]),
    });

    return (
        <div className="max-w-2xl mx-auto p-4 flex-col gap-4">
        <HabitProvider>
            <Header
                visibleDates={visibleDates}
                onPrev={() => setWeekOffset((O) => O - 1)}
                onNext={() => setWeekOffset((O) => O + 1)}
            />
            <HabitForm />
            <HabitList visibleDates={visibleDates} />
            <Contribution 
                yearDates={yearDates} 
                monthName={monthName} 
            />
        </HabitProvider>
        </div>
    );
}
