import { Header } from "./components/Header";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { HabitProvider } from "./context/HabitProvider";
import { Contribution } from './components/Contribution'
import { useState } from "react";
import { addWeeks, eachDayOfInterval, endOfWeek, endOfYear, startOfWeek, startOfYear } from "date-fns";


export default function App() {
  const [weekOffset, setWeekOffset] = useState(0)
  const week = addWeeks(new Date(), weekOffset);
  const date = new Date();

  const visibleDates = eachDayOfInterval( {
      start: startOfWeek(week, { weekStartsOn: 1 }), 
      end: endOfWeek(week, { weekStartsOn: 1 })
    }
  );

  const yearDates = eachDayOfInterval( {
    start: startOfYear(date), 
    end: endOfYear(date)
    }
  );

  return (
    <div className="max-w-2xl mx-auto p-4 flex-col gap-4" >
      <HabitProvider>
        <Header 
          visibleDates={visibleDates} 
          onPrev={() => setWeekOffset( O => O - 1 )} 
          onNext={() => setWeekOffset( O => O + 1)} 
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates}/>
        <Contribution 
          yearDates={yearDates}
        />
      </HabitProvider>

    </div>
  )
}



