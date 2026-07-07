import { useLocation, useNavigate } from 'react-router-dom';
import DynamicIcon from './DynamicIcon';

const tabs = [
    { label: 'Home', to: '/', icon: 'home' },
    { label: 'Mass', to: '/mass-schedule', icon: 'church' },
    { label: 'Events', to: '/events', icon: 'calendar_month' },
    { label: 'Donate', to: '/donate', icon: 'favorite' },
    { label: 'More', to: '/about', icon: 'menu' },
];

export default function BottomNav() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleNav = (to) => {
        navigate(to);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#570013]/95 backdrop-blur-md border-t border-[#800020] shadow-[0_-4px_12px_rgba(0,0,0,0.3)] h-16 flex justify-around items-center px-5">
            {tabs.map(({ label, to, icon }) => {
                const active = pathname === to || (to !== '/' && pathname.startsWith(to));
                return (
                    <button
                        key={to}
                        onClick={() => handleNav(to)}
                        className={`flex flex-col items-center justify-center transition-all active:scale-90 ${active
                            ? 'text-[#ffe088] scale-110'
                            : 'text-white/50 hover:text-white'
                            }`}
                    >
                        <DynamicIcon name={icon} className={active ? 'text-2xl' : 'text-xl'} />
                        <span className="font-oswald font-bold text-[10px] tracking-wide uppercase mt-0.5">{label}</span>
                        {active && <span className="w-1 h-1 rounded-full bg-[#ffe088] mt-0.5" />}
                    </button>
                );
            })}
        </nav>
    );
}
