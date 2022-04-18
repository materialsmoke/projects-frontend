export const secondsToHoursMinutesSeconds = (seconds)=>{
  let h = Math.floor(seconds / 3600);
  if(h < 10){
      h = `0${h}`;
  }
  let diff = seconds % 3600;
  let m = Math.floor(diff / 60);
  if(m < 10){
      m = `0${m}`;
  }
  let s = diff % 60;
  if(s < 10){
      s = `0${s}`;
  }
  let time = `${h}:${m}:${s}`;

  return time;
};


/**
 * get time with this format: 45:15:01 and convert it to seconds
 * @param {*} formattedTime 
 * @return int seconds
 */
export const formattedTimeToSeconds = (formattedTime) => {
  let seconds = formattedTime[6] + formattedTime[7] + '';
  let m = formattedTime[3] + formattedTime[4] + '';
  seconds = +seconds + m * 60;
  let h = formattedTime[0] + formattedTime[1] + '';
  seconds = +seconds + h * 3600;

  return seconds;
};