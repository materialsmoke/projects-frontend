import React, {useState, useEffect} from 'react'
import {secondsToHoursMinutesSeconds, formattedTimeToSeconds} from '../Utils/ConvertTime';

/**
 * 
 * @param {*} props 
 * startDate:not optional 
 * totalWorkingTime:optional if startDate exists. value example: "01:53:03"
 * @returns "01:53:03" live timer
 * usage: <LiveTimer startDate={totalWorkingTimeStartDate} totalWorkingTime={totalWorkingTime} /> 
 * 
 */
const LiveTimer = (props) => {


  let t1 = new Date(props.startDate);
  let t2 = new Date();
  let dif = ( t2.getTime() - t1.getTime() ) / 1000;
  
  let seconds = props.totalWorkingTime === undefined ? 0 : formattedTimeToSeconds(props.totalWorkingTime);
  
  const [liveSecondsTotalTime, setLiveSecondsTotalTime] = useState(+seconds + +Math.round(dif));

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSecondsTotalTime(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{secondsToHoursMinutesSeconds(liveSecondsTotalTime)}</span>
}

export default LiveTimer