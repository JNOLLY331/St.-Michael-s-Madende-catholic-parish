import React, { useState } from 'react';
import { MdClose, MdZoomIn, MdPhotoLibrary, MdCalendarToday, MdPerson } from 'react-icons/md';
import { useGalleryData } from '../hooks/useGalleryData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

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

// Utility to format date strings nicely
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch {
        return dateStr;
    }
};

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null);

    // Fetch real gallery media from the backend
    const { media, loading } = useGalleryData();

    // Derive the display list
    const displayPhotos = media.length > 0
        ? media.map((m) => ({
            src: m.src,
            caption: m.caption,
            uploadedBy: m.uploadedBy,
            createdAt: m.createdAt,
            type: m.type,
            albumId: m.albumId,
        }))
        : FALLBACK_PHOTOS.map((src) => ({ src, caption: '' }));

    return (
        <>
            {/* Hero Section */}
            <section className="relative flex items-center justify-center overflow-hidden mb-12 md:mb-20 max-w-[1200px] mx-auto px-4 md:px-5"
                style={{ height: 'clamp(250px, 40vw, 400px)', marginTop: '1rem' }}>
                <div className="absolute inset-0 z-0 border border-[#e0bfbf]">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiFp6Nv9HQK8JMgy_cvZMl2YmkcrusObqEl0T-0Utz_8oSVTZgma-xfB9PGr1FWpfaTejdgrUWgC6QW705s7_ae16dBqGOeyXxxudijlIxfTgKKEdjMN7n1q7wXcwYhE3GBLfbao78by3SA2E7qK8l0Os4bRnLhApjJs3zsFfCvdWQFPvhWFevFJk71K9Av7e2wUoCBNvzHP7OijaaGAayhXwJ5S_WmSZrm2-RtCSB8snf17X2ut1Ikphu8MN0dauMOrFWJdCDiWTb')`,
                            filter: 'brightness(0.6)',
                        }}
                    />
                    {/* Brand gradient overlay */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(87,0,19,0.7), transparent 70%)' }} />
                </div>
                <div className="relative z-10 text-center px-4">
                    <span className="inline-block text-[#ffe088] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3">
                        Sacred Memories
                    </span>
                    <h1 className="text-white mb-4" style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 600, lineHeight: 1.15 }}>
                        Parish Gallery
                    </h1>
                    <p className="text-white/90 max-w-xl mx-auto italic" style={{ fontFamily: 'Source Sans 3, system-ui, sans-serif', fontSize: 'clamp(15px, 2.5vw, 18px)' }}>
                        Glimpses of grace across our beautiful sanctuary and vibrant community life.
                    </p>
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto px-4 md:px-5 mb-20">
                {/* ── Loading Skeleton ── */}
                {loading && (
                    <Spinner message="Loading the beauty of our parish..." />
                )}

                {/* ── Empty State ── */}
                {!loading && displayPhotos.length === 0 && (
                    <EmptyState
                        title="Gallery Coming Soon"
                        message="Our beautiful moments are being processed. They will be shared here with the parish community shortly. May God bless you!"
                        icon={MdPhotoLibrary}
                    />
                )}

                {/* ── Masonry Grid ── */}
                {!loading && displayPhotos.length > 0 && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                        {displayPhotos.map((photo, i) => (
                            <div
                                key={i}
                                {...{ [REVEAL_ATTRS[i % REVEAL_ATTRS.length]]: '' }}
                                data-delay={i * 80}
                                className="break-inside-avoid relative overflow-hidden cursor-pointer group shadow-sm border border-[#e0bfbf] bg-[#222]"
                                onClick={() => setLightbox(photo)}
                                style={{
                                    opacity: 0,
                                    animation: `particleBlow 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.2) ${i * 150}ms forwards`
                                }}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.caption || `Parish gallery ${i + 1}`}
                                    className="w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23570013' width='400' height='300'/%3E%3Ctext fill='%23ffe088' font-family='Georgia,serif' font-size='24' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='0.35em'%3EParish Memory%3C/text%3E%3C/svg%3E";
                                    }}
                                />

                                {/* ── Rich Hover Overlay ── */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#570013]/90 via-[#570013]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                        <div className="flex items-center justify-between mb-2">
                                            {/* Type Badge */}
                                            {photo.type && (
                                                <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 border border-white/20 whitespace-nowrap">
                                                    {photo.type}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-serif font-bold text-white mb-2 line-clamp-2 leading-tight">
                                            {photo.caption || 'Parish Moment'}
                                        </h3>

                                        {/* Metadata Row */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80">
                                            {photo.createdAt && (
                                                <div className="flex items-center gap-1.5">
                                                    <MdCalendarToday className="text-white/60" />
                                                    <span>{formatDate(photo.createdAt)}</span>
                                                </div>
                                            )}
                                            {photo.uploadedBy && (
                                                <div className="flex items-center gap-1.5">
                                                    <MdPerson className="text-white/60" />
                                                    <span>{photo.uploadedBy}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-[#ffe088] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <MdZoomIn className="text-xl" />
                                            <span className="uppercase tracking-widest text-[10px]">Expand</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Lightbox ── */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    style={{ background: 'rgba(20, 10, 15, 0.95)', backdropFilter: 'blur(8px)' }}
                    onClick={() => setLightbox(null)}
                >
                    <div className="relative max-w-5xl w-full mx-auto flex flex-col items-center animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <div className="relative w-full border border-white/10 shadow-2xl bg-black">
                            <img
                                src={lightbox.src}
                                alt={lightbox.caption || 'Gallery photo'}
                                className="w-full max-h-[75vh] object-contain"
                            />

                            {/* Inner Info Bar */}
                            <div className="bg-[#111] border-t border-white/10 p-5 w-full">
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                                    {lightbox.caption || 'Parish Moment'}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    {lightbox.createdAt && (
                                        <div className="flex items-center gap-1.5">
                                            <MdCalendarToday />
                                            <span>{formatDate(lightbox.createdAt)}</span>
                                        </div>
                                    )}
                                    {lightbox.uploadedBy && (
                                        <div className="flex items-center gap-1.5">
                                            <MdPerson />
                                            <span>{lightbox.uploadedBy}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            className="absolute -top-12 right-0 md:-right-12 w-10 h-10 border border-white/20 bg-black/50 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
                            style={{ borderRadius: 0 }}
                            onClick={() => setLightbox(null)}
                            title="Close"
                        >
                            <MdClose className="text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
