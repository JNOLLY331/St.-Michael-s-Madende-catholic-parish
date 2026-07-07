/** Plain shell for auth/portal pages (no navbar/footer). */
export default function PortalLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-page)' }}>
            {children}
        </div>
    );
}
