import { useEffect, useState } from "react";

export default function Timer({ setTimeOut}) {
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  return timer;
}