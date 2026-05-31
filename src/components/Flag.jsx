
import React from 'react';

function Flag({ code, size = 'w-8 h-8', className = '' }) {
    if (!code || code.toLowerCase() === 'un') {
        return <span className={`${size} flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-xl shadow-md ${className}`}>🌍</span>;
    }
    
    const lowerCode = code.toLowerCase();
    return (
        <img 
            src={`https://flagcdn.com/w40/${lowerCode}.png`} 
            srcSet={`https://flagcdn.com/w80/${lowerCode}.png 2x`}
            alt={`${lowerCode} flag`} 
            className={`inline-block object-cover rounded-full shadow-md ${size} ${className}`}
            onError={(e) => {
                e.target.style.display = 'none'; // hide broken images
            }}
        />
    );
}

export default React.memo(Flag);
