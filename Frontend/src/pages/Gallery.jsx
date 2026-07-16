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

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    // ── Integration: fetch real gallery media from the backend ────────────────
    const { media, loading } = useGalleryData();

    // Derive the display list — use API media if available, else fallback photos
    const displayPhotos = media.length > 0
        ? media.map((m) => ({ src: m.src, caption: m.caption }))
        : FALLBACK_PHOTOS.map((src) => ({ src, caption: '' }));

    return (
        <>
            {/* ── Page Header ──────────────────────────────────────────────────── */}
            <section style={{
                padding: '64px 0 32px',
                textAlign: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '64px 20px 32px',
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    color: 'var(--accent-maroon)',
                    marginBottom: '16px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                }}>
                    Parish Gallery
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                }}>
                    Glimpses of grace across our beautiful sanctuary and vibrant community life.
                </p>
                <div style={{
                    width: '64px',
                    height: '4px',
                    background: '#735c00',
                    margin: '16px auto 0',
                    borderRadius: '2px',
                }} />
            </section>

            {/* ── Gallery Grid ─────────────────────────────────────────────────── */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px 80px',
            }}>
                {/* Loading */}
                {loading && <Spinner message="Loading the beauty of our parish..." />}

                {/* Empty */}
                {!loading && displayPhotos.length === 0 && (
                    <EmptyState
                        title="Gallery Coming Soon"
                        message="Our beautiful moments are being processed. They will be shared here with the parish community shortly. May God bless you!"
                        icon={MdPhotoLibrary}
                    />
                )}

                {/* Masonry Grid */}
                {!loading && displayPhotos.length > 0 && (
                    <div style={{
                        columns: 'auto 280px',
                        gap: '20px',
                    }}>
                        {displayPhotos.map(({ src, caption }, i) => (
                            <div
                                key={i}
                                style={{
                                    breakInside: 'avoid',
                                    marginBottom: '20px',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: '1px solid var(--border-color)',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    transform: hoveredIdx === i ? 'translateY(-4px)' : 'translateY(0)',
                                    boxShadow: hoveredIdx === i
                                        ? 'var(--shadow-card-hover, 0 16px 40px -10px rgba(87,0,19,0.22))'
                                        : '0 2px 12px rgba(0,0,0,0.08)',
                                    position: 'relative',
                                }}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                onClick={() => setLightbox({ src, caption })}
                            >
                                <img
                                    src={src}
                                    alt={caption || `Parish gallery ${i + 1}`}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        display: 'block',
                                        objectFit: 'cover',
                                        transition: 'transform 0.7s ease',
                                        transform: hoveredIdx === i ? 'scale(1.08)' : 'scale(1)',
                                    }}
                                    onError={(e) => {
                                        // Hide broken images gracefully
                                        const wrapper = e.target.closest('[style*="break-inside"]') || e.target.parentElement;
                                        if (wrapper) wrapper.style.display = 'none';
                                    }}
                                />

                                {/* Hover overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(87,0,19,0.45)',
                                    backdropFilter: 'blur(2px)',
                                    opacity: hoveredIdx === i ? 1 : 0,
                                    transition: 'opacity 0.35s ease',
                                }}>
                                    <div style={{
                                        color: '#fff',
                                        textAlign: 'center',
                                        transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(12px)',
                                        transition: 'transform 0.35s ease',
                                    }}>
                                        <MdZoomIn style={{ fontSize: '2.2rem' }} />
                                        <p style={{
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            marginTop: '4px',
                                        }}>View</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Lightbox ─────────────────────────────────────────────────────── */}
            {lightbox && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.92)',
                        backdropFilter: 'blur(12px)',
                    }}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        style={{ position: 'relative', maxWidth: '960px', width: '100%', margin: '0 16px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightbox.src}
                            alt={lightbox.caption || 'Gallery photo'}
                            style={{
                                width: '100%',
                                borderRadius: '16px',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                        {lightbox.caption && (
                            <p style={{
                                color: 'rgba(255,255,255,0.8)',
                                textAlign: 'center',
                                fontSize: '0.875rem',
                                marginTop: '12px',
                                fontStyle: 'italic',
                            }}>
                                {lightbox.caption}
                            </p>
                        )}
                        <button
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
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
