// src/components/Hero.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { motion } from "framer-motion"
import { useFacebookPixel } from "@/lib/hooks/useFacebookPixel"

export function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { trackViewContent } = useFacebookPixel()

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
    trackViewContent({
      content_name: 'App Download Interest',
      content_category: 'App Download',
      platform: 'AppStore'
    });
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <section className="relative min-h-screen bg-[url('https://i.imgur.com/ycLm36q.png')] flex items-center rounded-b-[5rem] pt-16">
      <div className="absolute inset-0" />
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Uma plataforma para a </span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              sua música ao vivo
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 mb-8"
          >
            Contrate agora ou agende, Show Shop conecta talentos, seu palco, e suas escolhas!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              className="bg-white text-black hover:bg-zinc-100 h-14 px-8"
              onClick={handleOpenDialog}
              aria-label="Baixar na App Store"
            >
              <Image unoptimized src="https://i.imgur.com/eM63hy7.png" alt="App Store" width={24} height={24} className="mr-2" />
              Baixar na App Store
            </Button>
            <Button
              className="bg-white text-black hover:bg-zinc-100 h-14 px-8"
              onClick={handleOpenDialog}
              aria-label="Disponível no Google Play"
            >
              <Image unoptimized src="https://i.imgur.com/NOYdrpW.png" alt="Google Play" width={24} height={24} className="mr-2" />
              Disponível no Google Play
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-16 flex justify-center flex-wrap" // Added flex-wrap for responsiveness
        >
          <div className="relative flex -space-x-12 md:-space-x-10 md:gap-x-24">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <Image
                unoptimized
                src="https://i.imgur.com/XB6pIYo.png"
                alt="App Screenshot 1"
                width={250}
                height={470}
                className="rounded-[40px] shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="relative z-20 translate-y-6"
            >
              <Image
                unoptimized
                src="https://i.imgur.com/tdu3Ggp.png"
                alt="App Screenshot 2"
                width={300}
                height={600}
                className="rounded-[40px] shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <Image
                unoptimized
                src="https://i.imgur.com/S1Mxpe0.png"
                alt="App Screenshot 3"
                width={250}
                height={470}
                className="rounded-[40px] shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Em breve!</DialogTitle>
          </DialogHeader>
          <p>O aplicativo estará disponível em breve. Fique ligado!</p>
          <Button className="mt-4" onClick={handleCloseDialog}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}
