import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function CircularTimer({ duration, running, onTimerEnd, reset }) {
    const [progress, setProgress] = useState(100);
    const [timeLeft, setTimeLeft] = useState(duration);
    const timerRef = useRef(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [running]);

    useEffect(() => {
        if (reset) {
            setTimeLeft(duration);
            setProgress(100);
            if (running) {
                clearInterval(timerRef.current);
                timerRef.current = setInterval(() => {
                    setTimeLeft(prevTime => prevTime - 1);
                }, 1000);
            }
        }
    }, [reset, duration, running]);

    useEffect(() => {
        setProgress((timeLeft / duration) * 100);

        if (timeLeft === 0) {
            clearInterval(timerRef.current);
            onTimerEnd && onTimerEnd();
        }
    }, [timeLeft, duration, onTimerEnd]);

    return (
        <Box position="relative" display="inline-flex" alignItems="center" justifyContent="center">
            <CircularProgress variant="determinate" value={progress} size={100} thickness={5} sx={{ color: 'black' }} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {`${Math.round(timeLeft)}`}s
                </Typography>
            </Box>
        </Box>
    );
}
