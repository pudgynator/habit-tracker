import { format } from "date-fns";

type MonthProps = {
    monthName: Date[],
    monthColumnMap: Map<string, number>
}

export function MonthLabels({ monthName, monthColumnMap}: MonthProps) {
    const renderedMonths = new Set<string>();
    
    return (
        <div className="flex h-7 relative w-max min-w-full">
            {
                monthName.map((month, index) => {
                    const key = `${month.getFullYear()}-${month.getMonth()}`;
            
                    if (renderedMonths.has(key)) return null;
            
                    let col = monthColumnMap.get(key);
                    if (col === undefined) return null;
                    
                    if (index > 0) {
                        const prevMonth = monthName[index - 1];
                        const prevKey = `${prevMonth.getFullYear()}-${prevMonth.getMonth()}`;
                        const prevCol = monthColumnMap.get(prevKey);
            
                        if (prevCol !== undefined && (col - prevCol) < 2) {
                            col = prevCol+2;
                        }
                    }
            
                    renderedMonths.add(key);
            
                    return (
                        <div 
                            className="flex absolute whitespace-nowrap"
                            key={key}
                            style={{ left: `${col * 20}px` }} 
                        >
                            {format(month, 'MMM')}
                        </div>
                    );
                })
            };      
        </div>

    )
}
