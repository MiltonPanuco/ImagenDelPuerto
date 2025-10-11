import { useEffect, useRef } from 'react';

export default function MedicalLoadingScreen() {
    const spinnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!spinnerRef.current) return;

        const spinner = spinnerRef.current;
        let rotation = 0;
        let animationFrame: number;

        const animate = () => {
            rotation += 4;
            spinner.style.transform = `rotate(${rotation}deg)`;
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="relative w-52 h-52 flex items-center justify-center">
                    <div 
                        ref={spinnerRef}
                        className="w-24 h-24 border-4 border-slate-200 border-t-blue-600 rounded-full"
                        style={{ willChange: 'transform' }}
                    />
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-slate-800">
                        Imagen del Puerto
                    </h3>
                </div>
            </div>
        </div>
    );
}