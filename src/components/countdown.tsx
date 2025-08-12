'use client'

import React from "react";

function padNumber(num: number) {
    return num < 10 ? `0${num}` : num.toString();
}

export default function Countdown({ discountRemaining }: Pick<Course, "discountRemaining">) {
    const initialSeconds =
        discountRemaining.daysRemaining * 86400 +
        discountRemaining.hoursRemaining * 3600 +
        discountRemaining.minutesRemaining * 60 +
        discountRemaining.secondsRemaining;

    const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds);

    React.useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const days = Math.floor(secondsLeft / 86400);
    const hours = Math.floor((secondsLeft % 86400) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max mx-auto place-content-center">
            <div className="flex flex-col">
        <span className="countdown text-xl mx-auto">
          <span
              style={{ "--value": days } as React.CSSProperties}
              aria-live="polite"
              aria-label={days.toString()}
          >
            {days}
          </span>
        </span>
                روز
            </div>
            <div className="flex flex-col">
        <span className="countdown text-xl mx-auto">
          <span
              style={{ "--value": hours } as React.CSSProperties}
              aria-live="polite"
              aria-label={hours.toString()}
          >
            {padNumber(hours)}
          </span>
        </span>
                ساعت
            </div>
            <div className="flex flex-col">
        <span className="countdown text-xl mx-auto">
          <span
              style={{ "--value": minutes } as React.CSSProperties}
              aria-live="polite"
              aria-label={minutes.toString()}
          >
            {padNumber(minutes)}
          </span>
        </span>
                دقیقه
            </div>
            <div className="flex flex-col">
        <span className="countdown text-red-500 text-xl mx-auto">
          <span
              style={{ "--value": seconds } as React.CSSProperties}
              aria-live="polite"
              aria-label={seconds.toString()}
          >
            {padNumber(seconds)}
          </span>
        </span>
                ثانیه
            </div>
        </div>
    );
}
