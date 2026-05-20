import React from 'react';

const SelectSkeleton = ({ label }) => {
    return (
        <div className="w-full flex flex-col gap-1 animate-pulse">
            {label && <div className="h-3.5 w-20 bg-slate-200/60 dark:bg-white/10 rounded" />}
            <div className="w-full h-11 bg-slate-200/60 dark:bg-white/10 rounded-lg border border-surface-variant" />
        </div>
    );
};

export default SelectSkeleton;