import React, { useState } from 'react';
import { MdClose, MdZoomIn, MdPhotoLibrary } from 'react-icons/md';
// ── Integration: useGalleryData fetches from GET /api/gallery/ ───────────────
import { useGalleryData } from '../hooks/useGalleryData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

// ── Static fallback photos shown when the API returns nothing ─────────────────
const FALLBACK_PHOTOS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYm5Urp1fukVfl-u-D8canOcBRVcAlSeb7oraAW8r5BClZ5VPjdsA1VAJlJfbpDomXbbgz8N3kEFx6oPLnsBmncGG-VCwiUm2FTQQBYiHNPQoObCPsTSUBPDN6zeH_SEURa0AgremE_nlpV_5yaNKiVk5fCABQZyF1Q1VFjK2przqEC2B1LGZ4EWboXOBA0dARClO6eJAwXJNu5_rYOpvNubv11o8GrMqtCd5Vo0ouBcshQbiBcGjYeJBqKaxvNPTcPyRZ3mmWEE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCqwoNCZ5B9gnFNMxeJ61wBSO3gAJf1zYeAHckAx7XAC05N7VyIVaJt4D_p5wVUcTLDtxRdpQMlQ2MqHoZ3KqKfL28FQmlGa7feOLIYgvfsiu8hMPEkoieNpJEyBaHCBBZWRnxJ7levB5Nr6LJ-uuO21wyTMXBxa1skep9rPCcl6-uiSqjFQlQ28bdAUkJYXrhdMsnKHWIvO3tKdsaEe41CRMPmLzz40JsMRmw55BjluxTqHxXuhC_n5tZ6nJgcPkszScOYcS29n8F-',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgT_hg800pBQY1Wa1JmYdY_rC4nav0fj2sAMadsEoaz35wr6L9DmPoADB0ZomxPHIQGoq6CN7yJk8Mtvwt7qVi9wsd-7qBCbspEP-djYMZSSEoWYTF-x2yIHfFlg-NHF7TPmLnbfyEEMwWXDVJ5QJprlVk2nCb0lr7TlVCxw6e3ZKk8leD7_HwHr3bG2M3i6odbXn0f1Wy1SsXrS-zACfLyt3-9dLxlHxUdVo4t-GfYCAOa0moBxlkfFWufsrvYTSvqdD8SgRTYGFs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBR5pf7TReMMBZXHGe0GKHnogXAJd-R5U5okO05Y0m47zDfIQXAo2J_dA0HoxEz9t4xLCu1EucxwWwdvW9aSaRVYDwKDsMh304ZkTNwz7QP9L4A5vhikxjGu6o1DHdqL_Znda1Azr0ai9kbmae3t2L1IkvvC6-VQgJwX8bzESls5DsbevIscrMiL9iok8MNJzuzF4anEnPSafEwcVNZbjHpTOojWDAqH4Xgu1PvKU-URaIwge_JxXa84ixsVQmnkn_qeSOXnCRg0B85',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhO09i81tMyCYNiZXqEHEs9ka7ihgQ4vYetISlLF2JjKhNDszS6QWlBiBKCOwDZgqJkCDlVEObljJVJrOR7gq81-9E80pADUK_zfJlIwTr1uVf3-j6O4CsQZG6L4inO-0-v-Zl60Mj8jqUf0yWTulFH-YWWa9qO0XRcHkQqTmJr-VMWv3eLIGQsDtgLO_Hwk7oFmwl3y2lFt4ol_k_KoSnt8TEST1ZX2S3IddKSHBDzH1Vs3MbmY3-K8_ZKz7KZKwO14-8nzTXZPI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAR9GTYHL0XoBpCnByjLrtcWQDK7X-gUyS9FVvy9jYLiOoD4ymdT7GSzRwdcMhLh4-HA0OFJH1G9ayeIjLHT9oXYAt_5hicIs7PVBlhtwwLnrs46sgBpjN8Z6b2HUNvILywdIQhRXpcWY_nh5ae39DISdsvbfdqwVGtcAzLtOJpG_ulyB7p1ftNFvhHHOgOILP8sX90HVz3oHIQp2TUs_EDH89rmq7hWJnubrqQy7loU9xCrqv-3nWfrrKJ58EPaE3kcM-XNjxUbAy',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCGy4YWJ_7pE4d-9TgXz9AGX5Do8t89PWWPHEf18ZujMAbyMKr4oWYQnI8H_Q8gzUI6XYuvK8jDxb4JZ5CZVXPB0HAbdPSqnlfyCV6GVzT4XVHjhKfNLAcaJbdrXEaIzHsLh3XZ_qFT4xIGoTPY7pDqgTBnvMJ5XVkK7JUFkhMK-RVbJF9Hgwo2CX9i2MG3yDWpHftbZiD_9-c1WNdsZi3dH0RAh2cf4pQF-KsnyAlSxwFnUGuuoU--gLorhRpNkYMlP9hSzw9Wedo9',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDiFp6Nv9HQK8JMgy_cvZMl2YmkcrusObqEl0T-0Utz_8oSVTZgma-xfB9PGr1FWpfaTejdgrUWgC6QW705s7_ae16dBqGOeyXxxudijlIxfTgKKEdjMN7n1q7wXcwYhE3GBLfbao78by3SA2E7qK8l0Os4bRnLhApjJs3zsFfCvdWQFPvhWFevFJk71K9Av7e2wUoCBNvzHP7OijaaGAayhXwJ5S_WmSZrm2-RtCSB8snf17X2ut1Ikphu8MN0dauMOrFWJdCDiWTb',
];

const REVEAL_ATTRS = [
    'data-reveal-left', 'data-reveal-zoom', 'data-reveal-right',
    'data-reveal-flip', 'data-reveal-bounce', 'data-reveal-spin',
];

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null);

    // ── Integration: fetch real gallery media from the backend ────────────────
    const { media, loading } = useGalleryData();

    // Derive the display list — use API media if available, else fallback photos
    const displayPhotos = media.length > 0
        ? media.map((m) => ({ src: m.src, caption: m.caption }))
        : FALLBACK_PHOTOS.map((src) => ({ src, caption: '' }));

    return (
        <>
            <section className="py-16 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <div data-reveal>
                    <h1 className="text-display-lg mb-4" style={{ color: 'var(--accent-maroon)' }}>
                        Parish Gallery
                    </h1>
                    <p className="text-body-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Glimpses of grace across our beautiful sanctuary and vibrant community life.
                    </p>
                    <div className="w-16 h-1 bg-[#735c00] mx-auto mt-4 rounded-full" />
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                {/* ── Integration: loading skeleton ──────────────────────────────── */}
                {loading && (
                    <Spinner message="Loading the beauty of our parish..." />
                )}

                {/* ── Integration: empty state (backend returned nothing) ─────────── */}
                {!loading && displayPhotos.length === 0 && (
                    <EmptyState
                        title="Gallery Coming Soon"
                        message="Our beautiful moments are being processed. They will be shared here with the parish community shortly. May God bless you!"
                        icon={MdPhotoLibrary}
                    />
                )}

                {/* ── Integration: masonry grid with real media URLs ─────────────── */}
                {!loading && displayPhotos.length > 0 && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {displayPhotos.map(({ src, caption }, i) => (
                            <div
                                key={i}
                                {...{ [REVEAL_ATTRS[i % REVEAL_ATTRS.length]]: '' }}
                                data-delay={i * 80}
                                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group shadow-sm card-hover border"
                                style={{ borderColor: 'var(--border-color)' }}
                                onClick={() => setLightbox({ src, caption })}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={src}
                                        alt={caption || `Parish gallery ${i + 1}`}
                                        className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        onError={(e) => {
                                            // Hide broken images gracefully
                                            e.target.closest('[class*="break-inside"]').style.display = 'none';
                                        }}
                                    />
                                    {/* hover overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                                        style={{ background: 'rgba(87,0,19,0.45)', backdropFilter: 'blur(2px)' }}>
                                        <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                                            <MdZoomIn className="text-4xl" />
                                            <p className="font-oswald text-sm tracking-widest uppercase mt-1">View</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Lightbox — shows caption from the API if available */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
                    onClick={() => setLightbox(null)}
                >
                    <div className="relative max-w-5xl w-full mx-4 animate-fade-in-up">
                        <img src={lightbox.src} alt={lightbox.caption || 'Gallery photo'}
                            className="w-full rounded-2xl shadow-2xl max-h-[85vh] object-contain" />
                        {lightbox.caption && (
                            <p className="text-white/80 text-center text-sm mt-3 font-serif">{lightbox.caption}</p>
                        )}
                        <button
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors flex items-center justify-center"
                            onClick={() => setLightbox(null)}
                        >
                            <MdClose />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
