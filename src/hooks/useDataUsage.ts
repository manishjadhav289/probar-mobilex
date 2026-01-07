import { useState, useEffect, useMemo } from 'react';
import data from '../data.json';

// Define the shape of our data
export interface UserData {
    userId: string;
    userName: string;
    planName: string;
    totalDataMB: number;
    initialUsedMB: number;
    currency: string;
}

// Hook return type
interface UseDataUsage {
    userData: UserData;
    usedData: number;
    remainingData: number;
    percentageRemaining: number;
    progressColor: string;
    handleRecharge: () => void;
}

export const useDataUsage = (): UseDataUsage => {
    // Initialize state from JSON data
    const [userData] = useState<UserData>(data);
    const [usedData, setUsedData] = useState<number>(data.initialUsedMB);

    // Derived state
    const remainingData = useMemo(() => {
        return Math.max(0, userData.totalDataMB - usedData);
    }, [userData.totalDataMB, usedData]);

    const percentageRemaining = useMemo(() => {
        if (userData.totalDataMB === 0) return 0;
        return Math.max(0, Math.min(100, (remainingData / userData.totalDataMB) * 100));
    }, [remainingData, userData.totalDataMB]);

    // Determine color based on percentage
    const progressColor = useMemo(() => {
        if (percentageRemaining < 20) {
            return '#e74c3c'; // Red
        } else if (percentageRemaining < 50) {
            return '#f39c12'; // Orange
        }
        return '#2ecc71'; // Green
    }, [percentageRemaining]);

    // Simulate data consumption effect
    useEffect(() => {
        const interval = setInterval(() => {
            setUsedData((prev) => {
                if (prev < userData.totalDataMB) {
                    // Simulate consuming a small random amount
                    const consumption = Math.random() * 2 + 0.1;
                    return Math.min(prev + consumption, userData.totalDataMB);
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [userData.totalDataMB]);

    const handleRecharge = () => {
        setUsedData(0);
    };

    return {
        userData,
        usedData,
        remainingData,
        percentageRemaining,
        progressColor,
        handleRecharge,
    };
};
