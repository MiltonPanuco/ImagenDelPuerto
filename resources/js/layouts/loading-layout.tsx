export default function LoadingLayout() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-slate-950 flex items-center justify-center z-[9999] transition-opacity duration-500">
            <div className="flex flex-col items-center justify-center gap-12">
                {/* Spinner SVG animado */}
                <svg
                    className="spinner"
                    width="65px"
                    height="65px"
                    viewBox="0 0 66 66"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="path"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="33"
                        cy="33"
                        r="30"
                    />
                </svg>

            </div>

            <style>{`
                .spinner {
                    animation: rotator 1.4s linear infinite;
                }
                
                @keyframes rotator {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(270deg); }
                }
                
                .path {
                    stroke-dasharray: 187;
                    stroke-dashoffset: 0;
                    transform-origin: center;
                    animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
                }
                
                @keyframes colors {
                    0% { stroke: #2563eb; }
                    25% { stroke: #3b82f6; }
                    50% { stroke: #60a5fa; }
                    75% { stroke: #3b82f6; }
                    100% { stroke: #2563eb; }
                }
                
                @media (prefers-color-scheme: dark) {
                    @keyframes colors {
                        0% { stroke: #3b82f6; }
                        25% { stroke: #60a5fa; }
                        50% { stroke: #93c5fd; }
                        75% { stroke: #60a5fa; }
                        100% { stroke: #3b82f6; }
                    }
                }
                
                @keyframes dash {
                    0% { 
                        stroke-dashoffset: 187; 
                    }
                    50% {
                        stroke-dashoffset: 46.75;
                        transform: rotate(135deg);
                    }
                    100% {
                        stroke-dashoffset: 187;
                        transform: rotate(450deg);
                    }
                }
            `}</style>
        </div>
    );
}