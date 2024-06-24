import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

type Params = {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
};

function Counter({ from, to, duration, delay, onComplete }: Params) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      delay,
      onComplete,
    });
    return controls.stop;
  }, []);

  return <motion.div>{rounded}</motion.div>;
}

export default Counter;
