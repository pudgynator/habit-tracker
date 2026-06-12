import { Button } from "./Button";

export function HabitForm() {
    return (
      <form action="" className="flex gap-2 mb-4">
        <input className="flex-1 gap-1 bg-zinc-800 px-4 py-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-500" type="text" placeholder="New habit..."/>
        <Button>Add Habit</Button>
      </form>
    )
  };