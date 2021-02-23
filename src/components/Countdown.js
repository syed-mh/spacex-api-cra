import React, { useState, useEffect, useRef } from "react";
import CountdownSegment from "./CountdownSegment";
import { calculateCountdown } from "../scripts/utilities";

/**
 * Countdown element for the home page
 * @component
 * @param { {date: String} } props
 * @returns {React.ReactElement}
 */
const Countdown = ({ date }) => {
  const countdownCalculator = useRef(calculateCountdown);

  const [countdown, setCountdown] = useState(countdownCalculator.current(date));

  useEffect(() => {
    const countdownInterval = setInterval(
      () => setCountdown(countdownCalculator.current(date)),
      1000
    );

    return () => clearInterval(countdownInterval);
  }, [date]);

  return (
    <div className="countdown-wrapper">
      <CountdownSegment name="Days" value={countdown ? countdown.days : 0} />
      <CountdownSegment name="Hours" value={countdown ? countdown.hours : 0} />
      <CountdownSegment
        name="Minutes"
        value={countdown ? countdown.minutes : 0}
      />
      <CountdownSegment
        name="Seconds"
        value={countdown ? countdown.seconds : 0}
      />
    </div>
  );
};

export default Countdown;
