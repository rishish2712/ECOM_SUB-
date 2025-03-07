import { useEffect } from 'react';

type ToastProps = {
    message: string;
    isVisible: boolean;
    onClose: () => void;
};

const Toast = ({ message, isVisible, onClose }: ToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        isVisible && (
            <div className="toast-container">
                <div className="toast">{message}</div>
            </div>
        )
    );
};

export default Toast;
