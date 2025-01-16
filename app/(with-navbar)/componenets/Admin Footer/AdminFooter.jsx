import React from 'react';

export default function AdminFooter({ text = "Gallery Upload. All Rights Reserved." }) {
    return (
        <footer className="text-center py-4 mt-6 bg-gray-100 shadow-md">
            <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} {text}
            </p>
        </footer>
    );
}
