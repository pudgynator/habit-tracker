

export function HeaderList() {
    const habits =['Mon 8', 'Tue 9', 'Wed 10', 'Thu 11', 'Fri 12', 'Sat 13', 'Sun 14'];
    if (habits.length === 0) {
        return (
            <div className="flex flex-col gap-2 bg-zinc-800 p-4 rounded-lg">
                <p>No habits yet</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-2 bg-zinc-800 p-4 rounded-lg">
            <p>Practice CSS</p>
            <div className="flex gap-1">
                {habits.map((habit) => (
                    <div className="bg-violet-600 px-4 py-1 rounded-lg" key={habit}>{habit}</div>
                ))}
            </div>
        </div>
    )
}
