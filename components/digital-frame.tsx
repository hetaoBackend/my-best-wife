'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart } from 'lucide-react'

const images = [
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG40.jpg?height=800&width=600',
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG41.jpg?height=800&width=600',
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/lovha/WechatIMG42.jpg?height=800&width=600',
]

export default function DigitalFrame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isPaused, images.length])

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log('Auto-play failed:', error)
      }
    }
    
    playAudio()
  }, [])

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <Card className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">我们的幸福时光</h1>
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative w-full max-w-2xl">
                    <div 
                      className="relative flex justify-center"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
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
                  <div className="flex justify-center items-center">
                    <audio
                      ref={audioRef}
                      id="bgMusic"
                      loop
                      className="hidden"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source 
                        src="https://img.tukuppt.com//newpreview_music//09//01//08//5c89bdd9395b454224.mp3" 
                        type="audio/mpeg" 
                      />
                    </audio>
                    <button
                      onClick={toggleMusic}
                      className="flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                    >
                      {isPlaying ? '暂停音乐' : '播放音乐'} 🎵
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-700 mb-2">亲爱的,感谢你为我们的家庭付出的一切。</p>
          <p className="text-lg text-gray-700 mb-4">
            你是最棒的!我们即将迎来新的家庭成员,我无比期待与你一同开启人生的新篇章。
          </p>
          <div className="flex justify-center items-center text-pink-600">
            <Heart className="w-6 h-6 mr-2 fill-current" /> 永远爱你
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

