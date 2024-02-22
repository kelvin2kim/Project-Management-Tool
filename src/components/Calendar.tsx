import { cookies } from "next/headers";
import ProjectComponent from './ProjectComponent';
import Link from 'next/link';
import { getUserFromCookie } from "../lib/auth";
import { db } from "../lib/db";
import Card from "./Card";
import ModifiedCard from "./ModifiedCard";
import CalendarCard from "./CalendarCard";
import DarkModifiedCard from "./DarkModifiedCard";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendar(year, month) {

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  
    let day = 1;
    const calendar = [];
  
    // Assume 6 weeks in a month for simplicity, adjust according to your needs
    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let weekDay = 0; weekDay < 7; weekDay++) {
        if ((week === 0 && weekDay < firstDayOfMonth) || day > numDaysInMonth) {
          days.push(null); // Empty day
        } else {
          days.push(day++);
        }
      }
      calendar.push(days);
    }
  
    return calendar;
  }

const Calendar = async ({ year, month }) => {
    async function getProject() {
        const startDate = new Date(year, month, 1).toISOString();
        const endDate = new Date(year, month+1, 7).toISOString();
        console.log(`startDate: ${startDate} endDate: ${endDate}`)
        // Assuming `getUserFromCookie` and `cookies` are defined elsewhere and work as expected
        const user = await getUserFromCookie(cookies());

        const projects = await db.project.findMany({
            where: {
                ownerId: user.id,
                due: {
                    gte: startDate,
                    lte: endDate,
                },
                deleted: false,
            },
            include: {
                tasks: true,
            },
        });
        return { projects };
    }
    const {projects} = await getProject();
    //console.log(`projects: ${projects}`);
    
    const calendar = generateCalendar(year, month);
    const date = new Date();
    const monthName = date.toLocaleString('default', { month: 'long' });
    //console.log(calendar);
    //"h-full w-full overflow-y-auto pr-6 px-3"
    return (
      <div className="h-full w-full overflow-y-auto pr-6 px-3">
        <ModifiedCard className="w-full px-3 border border-gray-200">
            <div className="grid grid-cols-7 text-center">
            {daysOfWeek.map((day) => (
                <div key={day} className='text-2xl text-gray-700 font-bold text-center'>{day}</div>
                
            ))}
            </div>
        </ModifiedCard>
        <ModifiedCard className='px-3'>
            <h1 className="text-2xl text-gray-700 font-bold">{monthName}</h1>
            {calendar.map((week) => (
            <div className="grid grid-cols-7">
                {week.map((day) => (
                <div className="overflow-hidden min-h-[105px]">
                    <CalendarCard className='min-h-[105px]'>
                        {day ? day : ' '}
                    {projects.map((project) => {
                        const date = new Date(project.due);
                        //console.log(`project due: ${project.due}`)
                        if (date.getDate() === day) {
                            return (
                                <div className="text-xs">
                                    <Link href = {`/project/${project.id}`}>
                                        <DarkModifiedCard className='text-center hover:scale-105 transition-all ease-in-out duration-200'>
                                            {project.name}
                                        </DarkModifiedCard>
                                    </Link>
                                </div>
                            );
                        }
                    }
                    )}   
                    </CalendarCard>
                </div>
                ))}
            </div>
            ))}
        </ModifiedCard>
      </div>
    );
  };
  

export default Calendar;
