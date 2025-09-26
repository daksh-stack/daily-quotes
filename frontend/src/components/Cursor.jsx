import { useEffect, useRef } from "react";

function Cursor() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const colors = [
      "rgba(250,250,250,0.95)",
      "rgba(229,231,235,0.95)", // gray-200
      "rgba(209,213,219,0.95)", // gray-300
      "rgba(156,163,175,0.9)", // gray-400
    ];

    const handleMove = (e) => {
      const dot = document.createElement("span");
      const size = Math.random() * 6 + 3; // 3px - 9px
      const color = colors[Math.floor(Math.random() * colors.length)];

      dot.style.position = "absolute";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.marginLeft = `${-size / 2}px`;
      dot.style.marginTop = `${-size / 2}px`;
      dot.style.borderRadius = "9999px";
      dot.style.background = color;
      dot.style.pointerEvents = "none";
      dot.style.filter = "blur(0.2px)";
      dot.style.boxShadow = `0 0 ${Math.max(6, size * 2)}px rgba(255,255,255,0.6)`; // silver glow
      dot.style.willChange = "transform, opacity";
      dot.style.transition = `transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms linear`;
      dot.style.opacity = "1";

      // slight initial offset for motion
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 14 + 6; // 6 - 20px
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      dot.style.transform = `translate(${tx}px, ${ty}px) scale(1)`;

      layer.appendChild(dot);

      // Animate out next frame so transition applies
      requestAnimationFrame(() => {
        dot.style.opacity = "0";
        dot.style.transform = `translate(${tx * 2}px, ${ty * 2}px) scale(0.6)`;
      });

      // Cleanup after transition
      setTimeout(() => {
        if (dot && dot.parentNode) dot.parentNode.removeChild(dot);
      }, 800);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default Cursor;


