'use client'

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

const RecognitionPage = () => {
    return (
        <div id="recognitions" className="min-h-screen pt-20 flex flex-col items-center bg-black text-white overflow-hidden">
            <motion.h2 
                className={`text-6xl ${anton.className} tracking-wider mb-16 [text-shadow:0_0_7px_#00BFFF,0_0_10px_#00BFFF,0_0_21px_#00BFFF,0_0_42px_#00BFFF]`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recognition
            </motion.h2>
            
            <div className="container mx-auto px-4">
                {/* Recognition content will go here */}
            </div>
        </div>
    );
};

export default RecognitionPage;