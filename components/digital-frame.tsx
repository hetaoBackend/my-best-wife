'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, Music } from 'lucide-react'
import { motion } from 'framer-motion'

const images = [
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG24823.jpg?height=800&width=600",
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG25013.jpg?height=800&width=600',
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG25014.jpg?height=800&width=600",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG25016.jpg?height=800&width=600",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG25015.jpg?height=800&width=600",
]

export default function DigitalFrame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [api, setApi] = useState<any>()

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [])

  useEffect(() => {
    if (!api || !isPlaying) {
      console.log('Carousel stopped')
      return
    }
    
    console.log('Starting carousel')
    const interval = setInterval(() => {
      api.scrollNext()
    }, 2400)
    
    return () => {
      clearInterval(interval)
      console.log('Clearing carousel interval')
    }
  }, [api, isPlaying])

  useEffect(() => {
    if (!api) return
    
    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    const handleInteraction = async () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Playback failed:', error);
          if (audioRef.current) {
            audioRef.current.play();
          }
        });
      }
    };

    const events = ['click', 'touchstart', 'touchend', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, handleInteraction);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-2 sm:p-6">
        <div className="relative mb-4 sm:mb-6">
          <h1 className="text-center">
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="block text-2xl sm:text-4xl font-kuaile text-pink-600 mb-2 sm:mb-3"
            >
              ✿ 最最亲爱的你 ✿
            </motion.span>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-lg sm:text-xl font-xiaowei text-pink-500/90"
            >
              Sweet Memories With You
            </motion.span>
          </h1>
        </div>

        <Carousel 
          className="w-full max-w-md mx-auto px-2 sm:px-0"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          onFocus={(e) => e.preventDefault()}
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative w-full">
                    <div className="relative flex justify-center">
                      <div className="w-full aspect-[3/4] relative overflow-hidden rounded-lg">
                        <img
                          src={src}
                          alt={`Memory ${index + 1}`}
                          className="absolute inset-0 w-full h-full transition-opacity duration-300"
                          style={{
                            objectFit: 'contain',
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                          }}
                          loading="lazy"
                        />
                        {index === currentIndex && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (audioRef.current) {
                                if (isPlaying) {
                                  audioRef.current.pause();
                                } else {
                                  audioRef.current.play();
                                }
                              }
                            }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-300"
                          >
                            <Music
                              className={`w-4 h-4 text-pink-500 transition-transform ${
                                isPlaying ? 'animate-spin-slow' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              currentIndex === index ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="hidden sm:flex -left-12"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              api?.scrollPrev();
            }} 
          />
          <CarouselNext 
            className="hidden sm:flex -right-12"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              api?.scrollNext();
            }}
          />
        </Carousel>
        <audio
          ref={audioRef}
          src="./bgm.mp3"
          loop
          preload="auto"
          onPlay={handlePlay}
          onPause={handlePause}
          playsInline
        />
        <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
          <p className="text-base sm:text-lg text-gray-700 font-mashanzheng leading-relaxed">
            亲爱的老婆，
          </p>
          <p className="text-base sm:text-lg text-gray-700 font-mashanzheng leading-relaxed">
            感谢你让我的生命如此完整，
            <br />
            有你相伴的每一天都是最珍贵的礼物。
          </p>
          <p className="text-base sm:text-lg text-gray-700 font-mashanzheng leading-relaxed">
            现在，我们即将迎来一个新的小生命，
            <br />
            这份期待与喜悦无法用言语表达。
          </p>
          <div className="pt-3 sm:pt-4 flex flex-col items-center text-pink-600 font-mashanzheng">
            <p className="text-lg sm:text-xl mb-2">愿我们的爱</p>
            <p className="text-lg sm:text-xl mb-3">在这个温暖的小家里永远延续</p>
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2 fill-current animate-pulse" /> 
              <span className="text-lg sm:text-xl">永远爱你</span>
              <Heart className="w-5 h-5 ml-2 fill-current animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

