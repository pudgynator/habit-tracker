import { isSameDay } from "date-fns";

export const levels = [
    'none',
    'low',
    'medium',
    'high',
    'max'
] as const;

export function getContributionLevel(date: Date, habits) {
    
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

export function  createMonthColumnMap( yearDates: Date[]) {
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
}