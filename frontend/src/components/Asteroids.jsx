import { useMemo } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function Asteroids({ count = 10 }) {
  const asteroids = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const size = `${randomBetween(6, 18)}px`;
      const startX = `${randomBetween(-10, 110)}vw`;
      const endX = `${randomBetween(-10, 110)}vw`;
      const startY = `${randomBetween(-10, 110)}vh`;
      const endY = `${randomBetween(-10, 110)}vh`;
      const duration = `${randomBetween(22, 44)}s`;
      const delay = `${randomBetween(0, 20)}s`;
      const spin = `${randomBetween(180, 720)}deg`;
      const blur = randomBetween(0.2, 1.2).toFixed(2);

      return {
        id: i,
        style: {
          "--size": size,
          "--x0": startX,
          "--y0": startY,
          "--x1": endX,
          "--y1": endY,
          "--duration": duration,
          "--delay": delay,
          "--spin": spin,
          filter: `blur(${blur}px)`
        }
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {asteroids.map(({ id, style }) => (
        <span
          key={id}
          style={style}
          className="asteroid shadow-[0_0_10px_rgba(255,255,255,0.15)]"
        >
          <span className="block w-full h-full rounded-full bg-gradient-to-br from-zinc-200 via-stone-300 to-neutral-400" />
        </span>
      ))}
    </div>
  );
}

export default Asteroids;


