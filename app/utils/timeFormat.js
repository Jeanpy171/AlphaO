import {secondsToMinutes} from 'date-fns';
export const secsToTimestamp = (seconds) => {
  /*console.log(seconds);
  const mins = secondsToMinutes(seconds);
  const secs = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  return `${mins}:${secs}`;*/
  if(seconds){
    const hrs = seconds / 60;
    const minute = hrs.toString().split('.')[0];
    const percent = parseInt(hrs.toString().split('.')[1].slice(0,2));
    const sec = Math.ceil((60*percent)/ 100);

    if(parseInt(minute) < 10 && sec < 10){
      return `0${minute}:0${sec}`;
    }

    if(sec == 60){
      return `${minute + 1}:00`;
    }

    if(parseInt(minute) < 10 ){
      return `0${minute}:${sec}`;
    }

    if(sec < 10){
      return `${minute}:0${sec}`;
    }
  }
};
export default secsToTimestamp