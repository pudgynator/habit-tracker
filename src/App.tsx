import { Header } from "./components/Header";
import { HabitForm } from "./components/HabitForm";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex-col gap-4" >
      <Header />
      <HabitForm />
    </div>
  )
}



