import { useCallback } from 'react';

const useFormatDuration = () => {
    const formatDuration = useCallback((milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, []);

    return { formatDuration };
};

export default useFormatDuration;