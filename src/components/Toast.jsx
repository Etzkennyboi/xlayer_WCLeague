import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast() {
    const { state, dispatch } = useGame();

    useEffect(() => {
        if (state.toasts.length > 0) {
            const timer = setTimeout(() => {
                dispatch({ type: 'DISMISS_TOAST', payload: state.toasts[0].id });
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [state.toasts, dispatch]);

    return (
        <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {state.toasts.slice(0, 5).map(toast => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 80, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.9 }}
                        className={`pointer-events-auto px-6 py-4 rounded-xl backdrop-blur-xl border shadow-2xl font-bold text-sm max-w-sm cursor-pointer ${
                            toast.type === 'success' ? 'bg-neonGreen/20 border-neonGreen/50 text-neonGreen' :
                            toast.type === 'error' ? 'bg-neonRed/20 border-neonRed/50 text-neonRed' :
                            'bg-neonBlue/20 border-neonBlue/50 text-neonBlue'
                        }`}
                        onClick={() => dispatch({ type: 'DISMISS_TOAST', payload: toast.id })}
                    >
                        {toast.message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
