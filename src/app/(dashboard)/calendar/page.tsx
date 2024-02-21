import React from 'react';
import Calendar from '../../../components/Calendar';

const calendarPage: React.FC = () => {
    return (
        <div className='h-full w-full overflow-y-auto pr-6 px-3'>
            <Calendar year = {2024} month={1}/>
        </div>
    );
};

export default calendarPage;