import React, { useState, useEffect } from 'react';
import { churchApi } from '../../api/endpoints/church';
import { eventsApi } from '../../api/endpoints/events';
import { newsApi } from '../../api/endpoints/news';
import { donationsApi } from '../../api/endpoints/donations';
import { galleryApi } from '../../api/endpoints/gallery';
import DynamicIcon from '../DynamicIcon';

export default function GenericDataView({ type, title, subtitle, icon }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let fetcher = null;
        switch (type) {
            case 'mass': fetcher = churchApi.getMassSchedule; break;
            case 'events': fetcher = eventsApi.list; break;
            case 'announcements': fetcher = newsApi.list; break;
            case 'donations': fetcher = donationsApi.getPledges; break;
            case 'gallery': fetcher = galleryApi.list; break;
            default: fetcher = () => Promise.resolve({ results: [] }); break;
        }

        fetcher()
            .then(res => {
                setData(Array.isArray(res) ? res : (res.results || []));
            })
            .catch(() => setData([]))
            .finally(() => setLoading(false));
    }, [type]);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="font-sans font-bold text-2xl text-gray-900 flex items-center gap-2">
                        <DynamicIcon name={icon} className="text-[#570013]" />
                        {title}
                    </h2>
                    <p className="text-gray-900/50 text-sm font-sans">{subtitle}</p>
                </div>
                <button className="btn-primary bg-[#570013] text-white px-5 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wide">
                    + Add New
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-gray-900/40">Loading data...</div>
                ) : data.length === 0 ? (
                    <div className="p-8 text-center text-gray-900/40">No {title.toLowerCase()} records found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="py-4 px-5 text-left font-sans font-bold text-xs uppercase tracking-widest text-gray-900/50">ID</th>
                                    <th className="py-4 px-5 text-left font-sans font-bold text-xs uppercase tracking-widest text-gray-900/50">Details</th>
                                    <th className="py-4 px-5 text-left font-sans font-bold text-xs uppercase tracking-widest text-gray-900/50">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((item, i) => (
                                    <tr key={item.id || i} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-5 font-sans text-sm text-gray-900/60">
                                            #{item.id || i + 1}
                                        </td>
                                        <td className="py-4 px-5 font-sans font-bold text-sm text-gray-900 truncate max-w-sm">
                                            {item.title || item.name || item.amount || item.label || 'Data Entry'}
                                            {item.date && <span className="block text-xs font-normal text-gray-400 font-sans mt-0.5">{new Date(item.date).toLocaleDateString()}</span>}
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="flex gap-3">
                                                <button className="text-[#ffe088] hover:opacity-80 transition-opacity">
                                                    <DynamicIcon name="edit" className="text-base" />
                                                </button>
                                                <button className="text-[#570013] hover:opacity-80 transition-opacity">
                                                    <DynamicIcon name="delete" className="text-base" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
