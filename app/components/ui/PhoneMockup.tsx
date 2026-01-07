'use client';
import React from 'react';
import Image from 'next/image';

interface PhoneMockupProps {
    src: string;
    alt: string;
    className?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ src, alt, className = '' }) => {
    return (
        <div className={`relative mx-auto ${className}`}>
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[580px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-4 border-zinc-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-2xl z-20" />
                
                {/* Screen */}
                <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-black">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover object-top"
                        sizes="280px"
                    />
                </div>
                
                {/* Side Button (Power) */}
                <div className="absolute -right-1 top-28 w-1 h-12 bg-zinc-700 rounded-l-sm" />
                
                {/* Side Buttons (Volume) */}
                <div className="absolute -left-1 top-24 w-1 h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute -left-1 top-36 w-1 h-8 bg-zinc-700 rounded-r-sm" />
            </div>
        </div>
    );
};

export default PhoneMockup;
