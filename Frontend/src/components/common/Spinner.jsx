import React from 'react';
import { MdChurch } from 'react-icons/md';

export default function Spinner({ message = "Loading grace..." }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4 animate-fade-in-up">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-[#ffe088] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[#570013]">
                    <MdChurch className="text-xl animate-pulse" />
                </div>
            </div>
            <p className="text-sm font-oswald uppercase tracking-widest text-[#570013] animate-pulse">
                {message}
            </p>
        </div>
    );
}
