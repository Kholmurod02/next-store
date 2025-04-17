"use client"

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

const Discount = () => {
    const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 + 23 * 60 * 60 + 19 * 60 + 56) * 1000;

    // State to store remaining time
    const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
            } else {
                setTimeLeft(difference);
            }
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTime(timeLeft);

    const t = useTranslations("Discount")

  return (

    <div>
        <div className="flex space-x-6 text-4xl font-bold text-black flex-col gap-5 ">
                    <h1 className='mr-20'>{t("1")}</h1>
                    <div className='flex gap-[20px]'>
                    <div className="text-center">
                        <p>{String(days).padStart(2, "0")}</p>
                        <span className="text-gray-500 text-sm">{t("2")}</span>
                    </div>
                    <span className="text-red-400">:</span>
                    <div className="text-center">
                        <p>{String(hours).padStart(2, "0")}</p>
                        <span className="text-gray-500 text-sm">{t("3")}</span>
                    </div>
                    <span className="text-red-400">:</span>
                    <div className="text-center">
                        <p>{String(minutes).padStart(2, "0")}</p>
                        <span className="text-gray-500 text-sm">{t("4")}</span>
                    </div>
                    <span className="text-red-400">:</span>
                    <div className="text-center">
                        <p>{String(seconds).padStart(2, "0")}</p>
                        <span className="text-gray-500 text-sm">{t("5")}</span>
                    </div>
                    </div>
                </div>
    </div>
  )
}

export default Discount