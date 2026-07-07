import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import DynamicIcon from '../DynamicIcon';


/** A single animated stat tile used in the "Parish By the Numbers" section. */
export default function StatCard({ value, label, suffix = '', icon, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(value, 2200, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ffe088]/10"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-[#ffe088]/10 border border-[#ffe088]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <DynamicIcon name={icon} className="text-[#ffe088] text-3xl" />
      </div>
      <div className="text-5xl font-oswald font-bold text-white mb-1 leading-none">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#ffe088]/80 font-oswald tracking-widest uppercase text-sm font-semibold mt-2">
        {label}
      </div>
    </div>
  );
}
