"use client"

import { useState, useRef, useEffect, type TouchEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GameScreenshotsCarouselProps {
  screenshots: string[]
}

export default function GameScreenshotsCarousel({ screenshots }: GameScreenshotsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Check viewport size for responsive display
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, screenshots.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  // Minimum distance required for a swipe (in pixels)
  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null) // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext()
    } else if (isRightSwipe && currentIndex > 0) {
      handlePrev()
    }

    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
  }

  if (!screenshots || screenshots.length === 0) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="flex justify-between absolute top-1/2 left-0 right-0 z-10 transform -translate-y-1/2 px-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity ${currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {screenshots.map((screenshot, index) => (
          <div key={index} className="flex-none w-full md:w-1/3 p-1" style={{ minWidth: isMobile ? "100%" : "33%" }}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <Image
                src={screenshot || "/placeholder.svg"}
                alt={`Game screenshot ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index < 2}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center mt-4 gap-1.5">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-4 bg-gray-800" : "w-2 bg-gray-300"
              }`}
            aria-label={`Go to screenshot set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
