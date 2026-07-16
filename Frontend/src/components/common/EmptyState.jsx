import React from 'react';
import { MdOutlineNaturePeople } from 'react-icons/md';

export default function EmptyState({ title = "Nothing to See Here", message = "We're currently preparing this content. Please check back later for updates and blessings.", icon: Icon = MdOutlineNaturePeople }) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 border border-[var(--border-color)] rounded-2xl animate-fade-in-up">
            <div className="w-20 h-20 bg-[#f5ece7] rounded-full flex items-center justify-center mb-6 text-[#570013]">
                <Icon className="text-4xl opacity-80" />
            </div>
            <h3 className="text-2xl font-serif text-[var(--accent-maroon)] mb-2">{title}</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">{message}</p>
        </div>
    );
}
