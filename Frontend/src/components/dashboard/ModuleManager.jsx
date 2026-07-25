import React, { useState, useEffect, useCallback } from 'react';
import {
    MdAdd, MdEdit, MdDelete, MdSave, MdClose, MdRefresh,
    MdSearch, MdCheckCircle, MdWarning, MdImage, MdOpenInNew,
} from 'react-icons/md';
import DynamicIcon from '../DynamicIcon';

/* ─── Field types supported in the generic form ─── */
const FIELD_TYPES = { text: 'text', textarea: 'textarea', date: 'date', number: 'number', select: 'select', image: 'image', checkbox: 'checkbox' };

/* ─── Module definitions — each describes one parish section ─── */
export const MODULE_CONFIGS = {
    events: {
        label: 'Events',
        icon: 'event',
        fetcher: () => import('../../api/endpoints/events').then(m => m.eventsApi.list()),
        creator: (d) => import('../../api/endpoints/events').then(m => m.eventsApi.create(d)),
        updater: (id, d) => import('../../api/endpoints/events').then(m => m.eventsApi.update(id, d)),
        deleter: (id) => import('../../api/endpoints/events').then(m => m.eventsApi.delete(id)),
        columns: ['title', 'date', 'location', 'category'],
        fields: [
            { name: 'title', label: 'Event Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'date', label: 'Date', type: 'date', required: true },
            { name: 'end_date', label: 'End Date', type: 'date' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'category', label: 'Category', type: 'select', options: ['LITURGY', 'SOCIAL', 'YOUTH', 'SPIRITUAL', 'FUNDRAISING', 'OTHER'] },
            { name: 'is_featured', label: 'Featured', type: 'checkbox' },
            { name: 'is_published', label: 'Published', type: 'checkbox' },
        ],
    },
    announcements: {
        label: 'Announcements',
        icon: 'campaign',
        fetcher: () => import('../../api/endpoints/news').then(m => m.newsApi.list()),
        creator: (d) => import('../../api/endpoints/news').then(m => m.newsApi.create(d)),
        updater: (id, d) => import('../../api/endpoints/news').then(m => m.newsApi.update(id, d)),
        deleter: (id) => import('../../api/endpoints/news').then(m => m.newsApi.delete(id)),
        columns: ['title', 'author', 'is_featured'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'content', label: 'Content', type: 'textarea', required: true },
            { name: 'author', label: 'Author', type: 'text' },
            { name: 'is_featured', label: 'Featured', type: 'checkbox' },
        ],
    },
    ministries: {
        label: 'Ministries',
        icon: 'diversity_3',
        fetcher: () => import('../../api/endpoints/ministries').then(m => m.ministriesApi.list()),
        creator: (d) => import('../../api/endpoints/ministries').then(m => m.ministriesApi.create(d)),
        updater: (id, d) => import('../../api/endpoints/ministries').then(m => m.ministriesApi.update(id, d)),
        deleter: (id) => import('../../api/endpoints/ministries').then(m => m.ministriesApi.delete(id)),
        columns: ['name', 'category', 'is_active'],
        fields: [
            { name: 'name', label: 'Ministry Name', type: 'text', required: true },
            { name: 'slug', label: 'Slug (auto-generated if blank)', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'mission', label: 'Mission Statement', type: 'textarea' },
            { name: 'patron_saint', label: 'Patron Saint', type: 'text' },
            {
                name: 'category', label: 'Category', type: 'select', required: true, options: [
                    'GENERAL', 'LITURGICAL', 'CHOIR', 'YOUTH', 'CHILDREN',
                    'MEN', 'WOMEN', 'FAMILY', 'CHARITY', 'SMALL_COMMUNITIES',
                    'EVANGELIZATION', 'JUSTICE_AND_PEACE', 'HEALTH', 'EDUCATION', 'OTHER'
                ]
            },
            { name: 'meeting_day', label: 'Meeting Day', type: 'text', required: true, placeholder: 'e.g. Sunday' },
            { name: 'meeting_time', label: 'Meeting Time (HH:MM)', type: 'text', required: true, placeholder: 'e.g. 10:00' },
            { name: 'meeting_location', label: 'Meeting Location', type: 'text', required: true },
            { name: 'email', label: 'Contact Email', type: 'text' },
            { name: 'phone', label: 'Contact Phone', type: 'text' },
            { name: 'banner', label: 'Banner Image (Cloudinary)', type: 'image' },
            { name: 'is_featured', label: 'Featured Ministry', type: 'checkbox' },
        ],
        useFormData: true,
        imageFields: ['banner'],
    },
    mass: {
        label: 'Mass Schedule',
        icon: 'church',
        fetcher: () => import('../../api/endpoints/church').then(m => m.churchApi.getMassSchedule()),
        creator: (d) => import('../../api/endpoints/church').then(m => m.churchApi.createMassSchedule(d)),
        updater: (id, d) => import('../../api/endpoints/church').then(m => m.churchApi.updateMassSchedule(id, d)),
        deleter: (id) => import('../../api/endpoints/church').then(m => m.churchApi.deleteMassSchedule(id)),
        columns: ['day', 'time', 'location', 'language'],
        fields: [
            { name: 'day', label: 'Day of Week', type: 'select', options: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'], required: true },
            { name: 'time', label: 'Time (HH:MM)', type: 'text', required: true },
            { name: 'location', label: 'Location', type: 'text', required: true },
            { name: 'language', label: 'Language', type: 'select', options: ['ENGLISH', 'SWAHILI', 'LATIN', 'OTHER'], required: true },
            { name: 'type', label: 'Mass Type', type: 'text' }
        ],
        readOnly: false,
    },
    gallery: {
        label: 'Gallery Albums',
        icon: 'photo_library',
        fetcher: () => import('../../api/endpoints/gallery').then(m => m.galleryApi.list()),
        creator: (d) => import('../../api/endpoints/gallery').then(m => m.galleryApi.createAlbum(d)),
        updater: (id, d) => import('../../api/endpoints/gallery').then(m => m.galleryApi.updateAlbum(id, d)),
        deleter: (id) => import('../../api/endpoints/gallery').then(m => m.galleryApi.deleteAlbum(id)),
        columns: ['title', 'description', 'is_published'],
        fields: [
            { name: 'title', label: 'Album Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'cover_image', label: 'Cover Image (Cloudinary)', type: 'image' },
            { name: 'is_published', label: 'Published', type: 'checkbox' },
        ],
        useFormData: true,
        imageFields: ['cover_image'],
    },
    sacraments: {
        label: 'Sacrament Applications',
        icon: 'water_drop',
        fetcher: () => import('../../api/endpoints/sacraments').then(m => m.sacramentsApi.listAllApplications()),
        creator: (d) => import('../../api/endpoints/sacraments').then(m => m.sacramentsApi.submitApplication(d)),
        updater: (id, d) => import('../../api/endpoints/sacraments').then(m => m.sacramentsApi.updateApplication(id, d)),
        deleter: (id) => import('../../api/endpoints/sacraments').then(m => m.sacramentsApi.deleteApplication(id)),
        columns: ['applicant_name', 'status', 'created_at'],
        fields: [
            { name: 'applicant_name', label: 'Applicant Name', type: 'text', required: true },
            { name: 'sacrament', label: 'Sacrament ID', type: 'number', required: true },
            { name: 'notes', label: 'Notes', type: 'textarea' },
            { name: 'status', label: 'Application Status', type: 'select', options: ['PENDING', 'APPROVED', 'REJECTED'] },
        ],
        readOnly: false,
    },
    donations: {
        label: 'Donations',
        icon: 'volunteer_activism',
        fetcher: () => import('../../api/endpoints/donations').then(m => m.donationsApi.listAll()),
        creator: (d) => import('../../api/endpoints/donations').then(m => m.donationsApi.createDonation(d)),
        updater: (id, d) => import('../../api/endpoints/donations').then(m => m.donationsApi.updateDonation(id, d)),
        deleter: (id) => import('../../api/endpoints/donations').then(m => m.donationsApi.deleteDonation(id)),
        columns: ['amount', 'payment_method', 'created_at'],
        fields: [
            { name: 'amount', label: 'Amount', type: 'number', required: true },
            { name: 'payment_method', label: 'Method', type: 'select', options: ['MPESA', 'CARD', 'CASH', 'BANK_TRANSFER'], required: true },
            { name: 'category', label: 'Category', type: 'select', options: ['OFFERTORY', 'TITHE', 'BUILDING_FUND', 'CHARITY', 'OTHER'], required: true },
            { name: 'is_anonymous', label: 'Anonymous Donation', type: 'checkbox' },
            { name: 'message', label: 'Message', type: 'textarea' }
        ],
        readOnly: false,
    },
    parishioners: {
        label: 'Parishioners',
        icon: 'group',
        fetcher: () => import('../../api/endpoints/accounts').then(m => m.accountsApi.getUsers()),
        creator: (d) => import('../../api/endpoints/accounts').then(m => m.accountsApi.register(d)),
        updater: (id, d) => import('../../api/endpoints/accounts').then(m => m.accountsApi.updateUser(id, d)),
        deleter: (id) => import('../../api/endpoints/accounts').then(m => m.accountsApi.deleteUser(id)),
        columns: ['first_name', 'last_name', 'email', 'role', 'is_verified'],
        fields: [
            { name: 'first_name', label: 'First Name', type: 'text', required: true },
            { name: 'last_name', label: 'Last Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'text', required: true },
            { name: 'phone', label: 'Phone', type: 'text' },
            { name: 'role', label: 'Role', type: 'text' },
            { name: 'is_verified', label: 'Verified', type: 'checkbox' },
        ],
        readOnly: false,
    },
    messages: {
        label: 'Messages',
        icon: 'message',
        fetcher: () => import('../../api/endpoints/contact').then(m => m.contactApi.listMessages()),
        creator: null,
        updater: null,
        deleter: (id) => import('../../api/endpoints/contact').then(m => m.contactApi.deleteMessage(id)),
        columns: ['full_name', 'email', 'subject', 'created_at'],
        fields: [],
        readOnly: true,
        readOnlyMessage: 'Messages are incoming only. You can delete them when resolved.',
    }
};


/* ─── Generic cell renderer ─── */
function CellValue({ value }) {
    if (value === null || value === undefined) return <span className="text-gray-300">—</span>;
    if (typeof value === 'boolean') return value
        ? <span className="text-emerald-600 flex items-center gap-1"><MdCheckCircle className="text-[13px]" /> Yes</span>
        : <span className="text-gray-400">No</span>;
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))
        return <span>{new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>;
    if (typeof value === 'string' && value.startsWith('http'))
        return <a href={value} target="_blank" rel="noreferrer" className="text-[#570013] underline flex items-center gap-1"><MdOpenInNew className="text-[12px]" />Link</a>;
    return <span className="truncate max-w-[220px] inline-block" title={String(value)}>{String(value)}</span>;
}

/* ─── Record edit/create modal ─── */
function RecordModal({ title, fields, record, onSave, onClose, useFormData, imageFields }) {
    const [form, setForm] = useState(() => {
        const init = {};
        fields.forEach(f => { init[f.name] = record?.[f.name] ?? (f.type === 'checkbox' ? false : f.type === 'image' ? null : ''); });
        return init;
    });
    const [fileInputs, setFileInputs] = useState({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            // If this module uses FormData (for image uploads), build it
            const hasFileUploads = useFormData && Object.keys(fileInputs).length > 0;
            if (hasFileUploads) {
                const fd = new FormData();
                Object.entries(form).forEach(([key, val]) => {
                    if (val !== null && val !== undefined && val !== '' && !imageFields?.includes(key)) {
                        fd.append(key, typeof val === 'boolean' ? (val ? 'true' : 'false') : val);
                    }
                });
                // Attach file uploads
                Object.entries(fileInputs).forEach(([key, file]) => {
                    if (file) fd.append(key, file);
                });
                await onSave(fd);
            } else {
                // Filter out image fields if no file selected
                const payload = { ...form };
                imageFields?.forEach(k => delete payload[k]);
                await onSave(payload);
            }
            onClose();
        } catch (err) {
            setError(err?.message || 'Failed to save. Check your data and try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-lg shadow-2xl rounded-none overflow-hidden" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#570013]">
                    <h2 className="font-oswald font-bold text-[18px] text-[#ffe088] uppercase tracking-wider">{title}</h2>
                    <button onClick={onClose} className="p-1.5 text-white/60 hover:text-white transition-colors"><MdClose className="text-xl" /></button>
                </div>

                {error && (
                    <div className="flex items-start gap-2 mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                        <MdWarning className="mt-0.5 shrink-0" /><span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    {fields.map(field => (
                        <div key={field.name}>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                                {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    value={form[field.name] || ''}
                                    onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                                    rows={3}
                                    required={field.required}
                                    className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013] resize-none"
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    value={form[field.name] || ''}
                                    onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                                    required={field.required}
                                    className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013]"
                                >
                                    <option value="">— Select —</option>
                                    {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            ) : field.type === 'checkbox' ? (
                                <label className="flex items-center gap-2 cursor-pointer mt-1">
                                    <input
                                        type="checkbox"
                                        checked={!!form[field.name]}
                                        onChange={e => setForm(f => ({ ...f, [field.name]: e.target.checked }))}
                                        className="w-4 h-4 accent-[#570013]"
                                    />
                                    <span className="text-sm text-gray-600">{field.label}</span>
                                </label>
                            ) : field.type === 'image' ? (
                                <div>
                                    <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 cursor-pointer hover:border-[#570013] hover:bg-[#570013]/5 transition-colors">
                                        <MdImage className="text-gray-400 text-lg" />
                                        <span className="text-sm text-gray-500">
                                            {fileInputs[field.name]?.name || 'Choose image file…'}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={e => {
                                                const file = e.target.files?.[0];
                                                if (file) setFileInputs(fi => ({ ...fi, [field.name]: file }));
                                            }}
                                        />
                                    </label>
                                    {/* Show current image if editing and no new file chosen */}
                                    {record?.[field.name] && !fileInputs[field.name] && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <img
                                                src={record[field.name]}
                                                alt="Current"
                                                className="h-12 w-20 object-cover border border-gray-200"
                                                onError={e => e.target.style.display = 'none'}
                                            />
                                            <span className="text-xs text-gray-400">Current image</span>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-gray-400 mt-1">Uploaded to Cloudinary. Recommended: 1200×400px.</p>
                                </div>
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    value={form[field.name] || ''}
                                    onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                                    required={field.required}
                                    placeholder={field.placeholder || ''}
                                    className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013]"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex gap-3 pt-2 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-2.5 font-bold text-sm text-[#ffe088] flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
                            style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}
                        >
                            {saving ? 'Saving…' : <><MdSave className="text-base" /> Save</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ─── Delete confirmation modal ─── */
function DeleteConfirm({ label, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onCancel}>
            <div className="bg-white w-full max-w-sm shadow-2xl rounded-none p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 flex items-center justify-center shrink-0">
                        <MdDelete className="text-red-600 text-xl" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Delete Record</p>
                        <p className="text-sm text-gray-500 mt-0.5">Are you sure you want to delete <strong>"{label}"</strong>? This cannot be undone.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors">Delete</button>
                </div>
            </div>
        </div>
    );
}

/* ─── Main ModuleManager component ─── */
export default function ModuleManager({ moduleKey }) {
    const config = MODULE_CONFIGS[moduleKey];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(null); // 'create' | { record } | 'delete-{id}'
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState('');

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const load = useCallback(() => {
        if (!config) return;
        setLoading(true);
        setError('');
        config.fetcher()
            .then(res => setData(Array.isArray(res) ? res : (res?.results ?? [])))
            .catch(() => setError('Could not load data. Check your connection or permissions.'))
            .finally(() => setLoading(false));
    }, [config]);

    useEffect(() => { load(); }, [load]);

    if (!config) return <div className="p-8 text-gray-400">Module not found.</div>;

    const filtered = data.filter(row =>
        config.columns.some(col => String(row[col] ?? '').toLowerCase().includes(search.toLowerCase()))
    );

    const handleSave = async (form) => {
        if (modal === 'create') {
            await config.creator(form);
            showToast('Record created successfully.');
        } else {
            await config.updater(modal.id, form);
            showToast('Record updated successfully.');
        }
        load();
    };

    const handleDelete = async () => {
        try {
            await config.deleter(deleteTarget.id);
            showToast('Record deleted.');
            setDeleteTarget(null);
            load();
        } catch {
            showToast('Delete failed. You may not have permission.');
            setDeleteTarget(null);
        }
    };

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="font-oswald font-bold text-2xl text-gray-900 flex items-center gap-2 uppercase tracking-wide">
                        <DynamicIcon name={config.icon} className="text-[#570013] text-2xl" />
                        {config.label}
                    </h2>
                    <p className="text-gray-400 text-sm mt-0.5">{data.length} record{data.length !== 1 ? 's' : ''} loaded</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={load}
                        className="p-2 border border-gray-200 text-gray-400 hover:text-[#570013] hover:border-[#570013]/30 transition-colors"
                        title="Refresh"
                    >
                        <MdRefresh className={`text-lg ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    {!config.readOnly && config.creator && (
                        <button
                            onClick={() => setModal('create')}
                            className="flex items-center gap-2 px-5 py-2.5 font-oswald font-bold text-sm uppercase tracking-widest text-[#ffe088] shadow-md transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}
                        >
                            <MdAdd className="text-lg" /> Add New
                        </button>
                    )}
                </div>
            </div>

            {/* Read-only notice */}
            {config.readOnly && (
                <div className="flex items-center gap-3 p-4 border border-amber-200 bg-amber-50 text-amber-800 text-sm">
                    <MdWarning className="shrink-0 text-lg text-amber-500" />
                    <span>{config.readOnlyMessage}</span>
                </div>
            )}

            {/* Search */}
            <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={`Search ${config.label.toLowerCase()}…`}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013]/20 bg-white"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                    <MdWarning className="shrink-0" />{error}
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-10 text-center">
                        <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-[#570013] rounded-full animate-spin mb-3" />
                        <p className="text-gray-400 text-sm">Loading {config.label.toLowerCase()}…</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">
                        <DynamicIcon name={config.icon} className="text-4xl mb-2 opacity-20" />
                        <p className="text-sm">{search ? 'No records match your search.' : `No ${config.label.toLowerCase()} found.`}</p>
                        {!config.readOnly && config.creator && !search && (
                            <button
                                onClick={() => setModal('create')}
                                className="mt-3 text-[#570013] text-sm font-bold underline"
                            >
                                Add the first one
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">#</th>
                                    {config.columns.map(col => (
                                        <th key={col} className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                            {col.replace(/_/g, ' ')}
                                        </th>
                                    ))}
                                    {!config.readOnly && (
                                        <th className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((row, i) => (
                                    <tr key={row.id ?? i} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="py-3 px-4 text-xs text-gray-400 font-mono">#{row.id ?? i + 1}</td>
                                        {config.columns.map(col => (
                                            <td key={col} className="py-3 px-4 text-sm text-gray-700">
                                                <CellValue value={row[col]} />
                                            </td>
                                        ))}
                                        {!config.readOnly && (
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {config.updater && (
                                                        <button
                                                            onClick={() => setModal(row)}
                                                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#570013] border border-[#570013]/20 hover:bg-[#570013]/5 transition-colors"
                                                        >
                                                            <MdEdit className="text-xs" /> Edit
                                                        </button>
                                                    )}
                                                    {config.deleter && (
                                                        <button
                                                            onClick={() => setDeleteTarget(row)}
                                                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                                                        >
                                                            <MdDelete className="text-xs" /> Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer row count */}
                {!loading && filtered.length > 0 && (
                    <div className="border-t border-gray-100 px-4 py-2 bg-gray-50 flex justify-between items-center">
                        <span className="text-[11px] text-gray-400">
                            {search ? `${filtered.length} of ${data.length}` : data.length} record{data.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-[11px] text-gray-400">
                            Last refreshed just now
                        </span>
                    </div>
                )}
            </div>

            {/* Create / Edit modal */}
            {modal && modal !== 'create' && typeof modal === 'object' && config.fields.length > 0 && (
                <RecordModal
                    title={`Edit ${config.label.slice(0, -1)}`}
                    fields={config.fields}
                    record={modal}
                    onSave={handleSave}
                    onClose={() => setModal(null)}
                    useFormData={config.useFormData}
                    imageFields={config.imageFields}
                />
            )}
            {modal === 'create' && config.fields.length > 0 && (
                <RecordModal
                    title={`New ${config.label.slice(0, -1)}`}
                    fields={config.fields}
                    record={null}
                    onSave={handleSave}
                    onClose={() => setModal(null)}
                    useFormData={config.useFormData}
                    imageFields={config.imageFields}
                />
            )}

            {/* Delete confirmation */}
            {deleteTarget && (
                <DeleteConfirm
                    label={deleteTarget.title || deleteTarget.name || `#${deleteTarget.id}`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[300] bg-gray-900 text-white px-5 py-3 shadow-xl text-sm flex items-center gap-2 animate-fade-in-up">
                    <MdCheckCircle className="text-emerald-400 text-base" />
                    {toast}
                </div>
            )}
        </div>
    );
}
