function DeleteRowIcon({ className = "h-5 w-5 mr-2" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            {/* سطر بالا */}
            <rect x="2" y="2" width="20" height="6" rx="0.5" fill="none" stroke="currentColor" />
            {/* سطر وسط قرمز */}
            <rect x="2" y="9" width="20" height="6" rx="0.5" fill="red" />
            {/* سطر پایین */}
            <rect x="2" y="16" width="20" height="6" rx="0.5" fill="none" stroke="currentColor" />
        </svg>
    );
}

function DeleteColumnIcon({ className = "h-5 w-5 mr-2" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            {/* ستون چپ */}
            <rect x="2" y="2" width="6" height="20" rx="0.5" fill="none" stroke="currentColor" />
            {/* ستون وسط قرمز */}
            <rect x="9" y="2" width="6" height="20" rx="0.5" fill="red" />
            {/* ستون راست */}
            <rect x="16" y="2" width="6" height="20" rx="0.5" fill="none" stroke="currentColor" />
        </svg>
    );
}

export { DeleteRowIcon, DeleteColumnIcon };
