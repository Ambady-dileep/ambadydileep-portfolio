import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

const spring = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1,
};

function useEmblaControls(emblaApi) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onDotClick = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);
  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateSelectionState = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  }, []);

  const onInit = useCallback(
    (api) => {
      setScrollSnaps(api.scrollSnapList());
      updateSelectionState(api);
    },
    [updateSelectionState]
  );

  const onSelect = useCallback(
    (api) => {
      updateSelectionState(api);
    },
    [updateSelectionState]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    emblaApi.on('reInit', onInit).on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onInit).off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  };
}

function DotButton({ selected, label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={false}
      aria-label={label}
      aria-current={selected ? 'true' : undefined}
      className="flex cursor-pointer select-none items-center justify-center rounded-full border-none bg-[#2563EB] text-white text-xs overflow-hidden focus-ring carousel-dot-btn"
      animate={{
        width: selected ? 64 : 10,
        height: selected ? 26 : 10,
        opacity: selected ? 1 : 0.45,
      }}
      transition={spring}
    >
      <motion.span
        layout
        initial={false}
        className="block whitespace-nowrap px-2.5 py-0.5 font-medium"
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0.6,
          filter: selected ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={spring}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

function CarouselNavButton({ onClick, disabled, children, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-9 h-9 rounded-full glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-30 disabled:pointer-events-none transition-colors focus-ring"
    >
      {children}
    </button>
  );
}

export function MotionCarousel({ slides, renderSlide, options, onIndexChange, className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi);

  useEffect(() => {
    onIndexChange?.(selectedIndex);
  }, [selectedIndex, onIndexChange]);

  return (
    <div
      className={cn(
        'w-full space-y-5',
        '[--slide-spacing:1rem] sm:[--slide-spacing:1.25rem]',
        '[--slide-size:88%] sm:[--slide-size:78%] md:[--slide-size:72%]',
        className
      )}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)*-0.5)]">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <motion.div
                key={slide.id ?? index}
                className="min-w-0 flex-none pl-[var(--slide-spacing)] basis-[var(--slide-size)]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? 'blur(0px)' : 'blur(1.5px)',
                  }}
                  transition={spring}
                  className="h-full carousel-slide-wrapper"
                >
                  {renderSlide(slide, index, isActive)}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-1">
        <CarouselNavButton onClick={onPrev} disabled={prevDisabled} label="Previous project">
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        </CarouselNavButton>

        <div className="flex flex-wrap justify-center items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              label={`${index + 1}`}
              selected={index === selectedIndex}
              onClick={() => onDotClick(index)}
            />
          ))}
        </div>

        <CarouselNavButton onClick={onNext} disabled={nextDisabled} label="Next project">
          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        </CarouselNavButton>
      </div>
    </div>
  );
}
