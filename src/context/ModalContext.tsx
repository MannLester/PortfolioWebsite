"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ModalContextType {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();

    // Reset modal state and body overflow when route changes
    useEffect(() => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [pathname]);

    return (
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
