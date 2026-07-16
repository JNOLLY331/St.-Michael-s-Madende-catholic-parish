import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { resolveMediaUrl } from '../api/client';
import { galleryApi } from '../api/endpoints/gallery';
=======
import { galleryApi, resolveMediaUrl } from '../api';
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

/**
 * Fetches gallery albums and their media items from:
 *   GET /api/gallery/albums/
 *   GET /api/gallery/media/
 *
 * Returns { albums, media, loading, error }
 */
export function useGalleryData() {
    const [albums, setAlbums] = useState([]);
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                // Fetch albums and flat media list in parallel
                const [albumData, mediaData] = await Promise.all([
                    galleryApi.listAlbums(),
                    galleryApi.listMedia(),
                ]);

                if (!cancelled) {
                    // Normalise albums
                    const rawAlbums = Array.isArray(albumData)
                        ? albumData
                        : (albumData?.results ?? []);
                    setAlbums(
                        rawAlbums.map((a) => ({
                            id: a.id,
                            title: a.title,
                            description: a.description,
                            coverImage: resolveMediaUrl(a.cover_image),
                            date: a.date,
                        }))
                    );

                    // Normalise media items
                    const rawMedia = Array.isArray(mediaData)
                        ? mediaData
                        : (mediaData?.results ?? []);
                    setMedia(
                        rawMedia.map((m) => ({
                            id: m.id,
                            src: resolveMediaUrl(m.file || m.image || m.url),
                            caption: m.caption || m.title || '',
                            albumId: m.album,
                            type: m.media_type || 'IMAGE',
                        }))
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load gallery.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { albums, media, loading, error };
}
