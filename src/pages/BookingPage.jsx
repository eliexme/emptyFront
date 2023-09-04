import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function YourComponent() {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null)

  // La función "isWeekday" verifica si un día es laborable (de lunes a viernes)
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('submit', startDate, startTime)
  }

  useEffect(()=>{
    console.log(startDate)
  },[startDate])

  useEffect(()=>{
    console.log(startTime)
  },[startTime])

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label>Select a weekday</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            filterDate={isWeekday}
            placeholderText="Select a weekday"
            inline
          />
        </div>

        <div>
                <input type="radio" id="startTime" name="startTime" value="12:00" onClick={(e)=>{setStartTime(e.target.value)}}/>
                <label>12:00</label>

                <input type="radio" id="startTime" name="startTime" value="15:00" onClick={(e)=>{setStartTime(e.target.value)}}/>
                <label>15:00</label>

                <input type="radio" id="startTime" name="startTime" value="18:00" onClick={(e)=>{setStartTime(e.target.value)}}/>
                <label>18:00</label>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
