import React from 'react';

const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => {
    const size = Math.random() * 4 + 2; // size between 2px and 6px
    const left = Math.random() * 100; // random percentage position
    const duration = Math.random() * 20 + 15; // float duration between 15s and 35s
    const delay = Math.random() * -20; // start instantly at different points

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          background: 'rgba(99, 102, 241, 0.4)',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.8), 0 0 20px rgba(236, 72, 153, 0.4)',
          borderRadius: '50%',
          left: `${left}%`,
          bottom: '-10px',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `floatUp ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          pointerEvents: 'none',
        }}
      />
    );
  });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: -1, pointerEvents: 'none' }}>
      {particles}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-105vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
