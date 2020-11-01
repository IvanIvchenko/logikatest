import React from 'react';
import style from '../assets/buttons.css';
//countdown for homepage
export const Countdown = ({ seconds }) => {
    const [timerValues, setTimerValue] = React.useState();
  
    React.useEffect(() => {
      setTimerValue(seconds);
      const timer = setInterval(() => {
        setTimerValue(prevTimerValue => prevTimerValue - 1);
      }, 1000);
  
      return () => {
        clearInterval(timer);
      }
    }, [seconds]);
  
    return timerValues >= 0 ? <p className="countdown" >Cooldown: {timerValues}</p> : null;
  };
