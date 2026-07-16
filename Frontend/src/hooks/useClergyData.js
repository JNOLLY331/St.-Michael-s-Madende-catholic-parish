import { useEffect, useState } from 'react';
import { resolveMediaUrl } from '../api/client';
import { churchApi } from '../api/endpoints/church';

const FALLBACK_CLERGY = [
    {
        role: 'Parish Priest',
        name: 'Rev. Fr. Michael O\'Malley',
        bio: "Serving St. Michael's since 2015, Fr. Michael is dedicated to youth ministry and liturgical music excellence.",
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcmIp9j0kdavKepp6m7dYg3xSVHDIf9VRJsTIBan3u6LXJyY9lScUIzheFO1jJXuHbK481o8iwaDXuhE_6WsgPVDt5ghcrQeSKK4tS5JCbemZAwR3hTVJrTfUu-ZnU34fjoEaXuYzKNk4ouozcag3I5Lt-6JwbP22Zqfa1xhO_mSHqofQ6y828CAUArBNnG3oEhhMFbiuLV5-osoFgsTQJJIhLFoDOxjMlCOH6RzQc5ezzvzKRt2rHfB3BxeWeVhXoYmWQfw8ADUDX',
        action: 'schedule',
    },
    {
        role: 'Assistant Priest',
        name: 'Rev. Fr. David Kiptoo',
        bio: "Fr. David brings a passion for social justice and leads our community outreach and food pantry initiatives.",
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxuiYTYZpzUFzxe2CQ6BxhMFZ4Iwvgj0K-1_IwVM93jZjfjPDpOpSBQg7o-7ja5OHekCbuhW39EnXbaXLY-AJoAgggjSLDqI8wAu0W_gn9WSItoHdOMMwqI0-U64z5A69B1oN56gXDGE2JBC_yJBO_6cpWfae26E1bI12U8gH9LjCRgO3U0M5ZfSKujGNJeSy_4wAGDKDzyY8pSSZ3ghip0OlXVkWtoDLuFRUcWsZb16qrNRXY-D2eXS7_QQPza0enyoy4We03Is1u',
        action: 'schedule',
    },
    {
        role: 'Priest in Residence',
        name: 'Msgr. John Mutua',
        bio: "Retired but active, Monsignor Mutua provides spiritual direction and historical perspective for our parish family.",
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD74zNhbOod1Y4shax1-hf-0qmVISE_YnH7jAvxYFXgiXEh1ES3ChSG8V9JIwAhnaMlZIRn1kr5CE7ru3Jtz4vUnf2lWSRhZzftdl1ntHr5nkdzo1MnpWM5sscB-44OQgnXZ5w-tBE9-q83nwRjSx_dPdiQXtj9kp5FEEzNYMztp9kVW2k3w0a8-XgZggBCQ6w5nyNGKkt8M0sMmFQrWNM81S_mJT5A1beILZSszKuU-B2HMWnIOuAg8tOfworVGyed-ly8Nma_pVS',
        action: 'history',
    }
];

export function useClergyData() {
    const [clergy, setClergy] = useState(FALLBACK_CLERGY);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const data = await churchApi.getLeadership();
                if (!cancelled) {
                    if (data && data.length > 0) {
                        setClergy(data.map(l => ({
                            role: l.position,
                            name: l.name,
                            bio: l.message || '',
                            img: resolveMediaUrl(l.photo) || FALLBACK_CLERGY[0].img, // fallback image
                            email: l.email || '',
                            action: 'mail'
                        })));
                    } else {
                        setClergy(FALLBACK_CLERGY);
                    }
                }
            } catch {
                if (!cancelled) setClergy(FALLBACK_CLERGY);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    return { clergy, loading };
}
