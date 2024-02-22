import React from 'react';
import Calendar from '../../../components/Calendar';



const calendarPage: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
   //console.log(`year: ${year}, month: ${month}`);
    return (
        <div className='h-full w-full overflow-x-auto overflow-y-auto pr-6 px-3'>
            <Calendar year = {year} month={month}/>
        </div>
    );
};

export default calendarPage;