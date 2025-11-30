import { useState } from 'react';

export interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    type: 'warning' | 'danger';
    onConfirm: () => void | Promise<void>;
}

export const useConfirmModal = () => {
    const [modalState, setModalState] = useState<ConfirmModalState | null>(null);

    const showConfirm = (config: Omit<ConfirmModalState, 'isOpen'>) => {
        setModalState({
            ...config,
            isOpen: true,
        });
    };

    const hideConfirm = () => {
        setModalState(null);
    };

    const handleConfirm = async () => {
        if (modalState?.onConfirm) {
            await modalState.onConfirm();
        }
        hideConfirm();
    };

    return {
        modalState,
        showConfirm,
        hideConfirm,
        handleConfirm,
    };
};
