import { cookies } from "next/headers";
import ProjectComponent from './ProjectComponent';
import Link from 'next/link';
import { getUserFromCookie } from "../lib/auth";
import { db } from "../lib/db";
import Card from "./Card";

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
    //console.log(calendar);
    //"h-full w-full overflow-y-auto pr-6 px-3"
    return (
      <div className="h-full w-full overflow-y-auto pr-6 px-3">
        <Card classname="h-full pr-6 w-full">
            <div className="flex">
            {daysOfWeek.map((day) => (
                <div key={day} style={{ width: '14.28%', textAlign: 'center' }}>{day}</div>
                
            ))}
            </div>
        </Card>
        {calendar.map((week) => (
          <div className="grid grid-cols-7 gap-1">
            {week.map((day) => (
              <div className="flex justify-between px-6 mb-3">
                <Card className='w-full min-h-[105px]'>
                    {day}
                {projects.map((project) => {
                    const date = new Date(project.due);
                    //console.log(`project due: ${project.due}`)
                    if (date.getDate() === day) {
                        return (
                            <div className="text-xs">
                                <Link href = {`/project/${project.id}`}>
                                    {project.name}
                                </Link>
                            </div>
                        );
                    }
                }
                )}   
                </Card>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

export default Calendar;
