import Navbar from '../Navbar';
import Footer from '../Footer';
import BottomNav from '../BottomNav';

/** Wraps every public page with the Navbar, Footer, and mobile BottomNav. */
export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-page)' }}>
            <Navbar />
            {/* pt compensates for the fixed navbar (mobile: no info strip ~64px; desktop: with info strip ~96px) */}
            <main className="flex-grow pb-16 md:pb-0 page-enter pt-[64px] md:pt-[96px]">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}

