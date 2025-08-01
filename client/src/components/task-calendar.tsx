import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks } = useTasks();

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getTaskCountForDate = (date: string) => {
    if (!tasks) return { high: 0, medium: 0, low: 0 };
    
    const dayTasks = tasks.filter(task => task.dueDate === date && !task.completed);
    return {
      high: dayTasks.filter(task => task.priority === 'high').length,
      medium: dayTasks.filter(task => task.priority === 'medium').length,
      low: dayTasks.filter(task => task.priority === 'low').length,
    };
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push({
        day,
        date: `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = today.getFullYear() === year && 
                      today.getMonth() === month && 
                      today.getDate() === day;
      
      days.push({
        day,
        date,
        isCurrentMonth: true,
        isToday,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    const nextMonth = new Date(year, month + 1, 1);
    for (let day = 1; day <= remainingDays; day++) {
      const date = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const days = getDaysInMonth();

  return (
    <div className="terminal-border bg-terminal-surface p-4 rounded h-full">
      <h2 className="text-cyber-cyan mb-3 text-sm font-bold">╔═══ TASK CALENDAR ═══╗</h2>
      
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigateMonth('prev')}
          className="text-matrix-green hover:text-cyber-cyan text-xs flex items-center gap-1"
        >
          <ChevronLeft size={12} /> PREV
        </button>
        <div className="text-warning-yellow font-bold text-sm">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button 
          onClick={() => navigateMonth('next')}
          className="text-matrix-green hover:text-cyber-cyan text-xs flex items-center gap-1"
        >
          NEXT <ChevronRight size={12} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs mb-4">
        {/* Week Headers */}
        {dayNames.map(day => (
          <div key={day} className="text-cyber-cyan text-center p-1 font-bold">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map(({ day, date, isCurrentMonth, isToday }, index) => {
          const taskCounts = getTaskCountForDate(date);
          const hasHighPriority = taskCounts.high > 0;
          const hasMediumPriority = taskCounts.medium > 0;
          const hasLowPriority = taskCounts.low > 0;
          const hasAnyTasks = hasHighPriority || hasMediumPriority || hasLowPriority;

          return (
            <div 
              key={index}
              className={`
                text-center p-1 cursor-pointer relative
                ${isCurrentMonth 
                  ? isToday 
                    ? 'text-warning-yellow bg-terminal-border' 
                    : 'text-matrix-green hover:bg-terminal-border'
                  : 'text-muted-gray'
                }
              `}
            >
              {day}
              {hasAnyTasks && (
                <div className="absolute -top-1 -right-1 flex gap-px">
                  {hasHighPriority && (
                    <div className="w-1.5 h-1.5 bg-error-red rounded-full"></div>
                  )}
                  {hasMediumPriority && (
                    <div className="w-1.5 h-1.5 bg-warning-yellow rounded-full"></div>
                  )}
                  {hasLowPriority && (
                    <div className="w-1.5 h-1.5 bg-matrix-green rounded-full"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="text-xs">
        <div className="text-cyber-cyan mb-2">LEGEND:</div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-error-red rounded-full"></div>
            <span className="text-muted-gray">HIGH</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-warning-yellow rounded-full"></div>
            <span className="text-muted-gray">MED</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-matrix-green rounded-full"></div>
            <span className="text-muted-gray">LOW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
