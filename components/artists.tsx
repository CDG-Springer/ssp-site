"use client"

import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-cards"

const artists = [
  {
    id: 1,
    name: "Vento Solaris",
    image: "https://i.imgur.com/EGJ8Gu2.png",
    bio: "Banda de rock alternativo com influências modernas e letras introspectivas.",
    genre: "Rock Alternativo",
    latestAlbum: "Ecos do Amanhã",
    popularTrack: "Brisa Noturna",
  },
  {
    id: 2,
    name: "Carla Monteiro",
    image: "https://i.imgur.com/DiOkpYm.png",
    bio: "Cantora de MPB aclamada pela crítica, conhecida por sua voz marcante e composições poéticas.",
    genre: "MPB",
    latestAlbum: "Versos do Mar",
    popularTrack: "Saudade em Canção",
  },
  {
    id: 3,
    name: "Raízes",
    image: "https://i.imgur.com/XKr72Gj.png",
    bio: "Grupo que funde ritmos tradicionais brasileiros com sonoridades contemporâneas.",
    genre: "World Music",
    latestAlbum: "Terra e Ritmo",
    popularTrack: "Tambores da Floresta",
  },
]

export function Artists() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [currentArtist, setCurrentArtist] = useState(artists[0])
  const [direction, setDirection] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex
    const oldIndex = swiper.previousIndex
    setDirection(newIndex > oldIndex ? 1 : -1)
    setCurrentArtist(artists[newIndex])
    
    // Adicionar rastreamento de visualização de artista
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: artists[newIndex].name,
        content_category: 'Artist View',
        content_type: 'artist',
        genre: artists[newIndex].genre
      });
    }
  }

  const handleListenSample = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: currentArtist.name,
        content_category: 'Sample Listen',
        content_type: 'audio',
        genre: currentArtist.genre,
        track: currentArtist.popularTrack
      });
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Artistas em Destaque</h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="w-full max-w-md">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="w-full h-[300px] md:h-[400px]" // Responsive height
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={handleSlideChange}
            >
              {artists.map((artist) => (
                <SwiperSlide key={artist.id} className="bg-gray-100 rounded-lg shadow-xl overflow-hidden">
                  {artist.image.startsWith('http') ? (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                aria-label="Artista anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                aria-label="Próximo artista"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtist.id}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-md text-gray-800"
            >
              <h3 className="text-3xl font-bold mb-4">{currentArtist.name}</h3>
              <p className="text-gray-600 mb-6">{currentArtist.bio}</p>
              <div className="space-y-2 mb-6">
                <p>
                  <span className="font-semibold">Gênero:</span> {currentArtist.genre}
                </p>
                <p>
                  <span className="font-semibold">Último Álbum:</span> {currentArtist.latestAlbum}
                </p>
                <p>
                  <span className="font-semibold">Faixa Popular:</span> {currentArtist.popularTrack}
                </p>
              </div>
              <button 
                onClick={handleListenSample}
                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <PlayCircle className="w-6 h-6 mr-2" />
                Ouvir Amostra
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
