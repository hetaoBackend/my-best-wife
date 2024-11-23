'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, Pause, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

const images = [
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG47.jpg?height=800&width=600",
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG41.jpg?height=800&width=600',
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG45.jpg?height=800&width=600",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG49.jpg?height=800&width=600",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG50.jpg?height=800&width=600",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG51.jpg?height=800&width=600",
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG24823.jpg?height=800&width=600',
]

export default function DigitalFrame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [api, setApi] = useState<any>()

  const togglePlayback = async () => {
    console.log('Toggle clicked, current state:', isPlaying)
    
    try {
      if (!audioRef.current) {
        console.log('No audio reference')
        return
      }

      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        console.log('Paused')
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
          console.log('Playing')
        }
      }
    } catch (error) {
      console.error('Playback error:', error)
      setIsPlaying(false)
    }
  }

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
    }, 2000)
    
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

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-3 sm:p-6">
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
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayback}
            className="rounded-full absolute right-0 top-1/2 -translate-y-1/2"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Carousel 
          className="w-full max-w-xl mx-auto px-4 sm:px-0"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative w-full max-w-2xl">
                    <div 
                      className="relative flex justify-center"
                    >
                      <img
                        src={src}
                        alt={`Memory ${index + 1}`}
                        className="rounded-lg transition-opacity duration-300"
                        style={{
                          maxHeight: '50vh',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <audio
          ref={audioRef}
          src="https://img.tukuppt.com//newpreview_music//09//01//08//5c89bdd9395b454224.mp3"
          loop
          preload="auto"
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

