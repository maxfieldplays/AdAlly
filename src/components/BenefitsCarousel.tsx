import React, { useState, useEffect } from 'react';
import { DollarSign, Zap, Copy, TrendingUp, Globe } from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const BenefitsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const benefits: Benefit[] = [
    {
      icon: DollarSign,
      title: '1/20th Cost',
      description: 'Significantly reduce production expenses',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Zap,
      title: '1/10th Time',
      description: 'Generate ads 10x faster than traditional methods',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: Copy,
      title: 'Mass Production',
      description: 'Create unlimited ad variations instantly',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: TrendingUp,
      title: '5X Engagement',
      description: 'Boost your content performance dramatically',
      color: 'from-red-400 to-red-600',
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Generate videos in different languages',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, benefits.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    setAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? benefits.length - 1 : prevIndex - 1
    );
    setAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
          Why Choose Movico Studio
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover the advantages of AI-powered ad generation
        </p>
      </div>

      <div className="relative">
        {/* Main Carousel Container */}
        <div className="flex items-center justify-center min-h-64 px-4 sm:px-8">
          <div className="w-full max-w-xs">
            {/* Benefit Cards */}
            <div className="relative h-60 perspective">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const isActive = index === currentIndex;
                const position = (index - currentIndex + benefits.length) % benefits.length;

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-75 z-0'
                    }`}
                  >
                    <div
                      className={`h-full rounded-2xl bg-gradient-to-br ${benefit.color} p-6 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    >
                      <Icon className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-center">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-center text-white/90">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 px-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200"
            aria-label="Previous benefit"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot Indicators - Circular Layout */}
          <div className="flex items-center justify-center gap-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-3 h-3 bg-black'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to benefit ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200"
            aria-label="Next benefit"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          {currentIndex + 1} / {benefits.length}
        </div>
      </div>
    </div>
  );
};

export default BenefitsCarousel;
