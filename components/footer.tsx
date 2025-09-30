// src/components/Footer.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Instagram, Video } from "lucide-react"
import Image from "next/image"
import { useFacebookPixel } from "@/lib/hooks/useFacebookPixel"

export default function Footer() {
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
    <>
      <footer className="bg-gradient-to-b from-white to-blue-500">
        {/* Seção superior do footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-black rounded-2xl p-8 text-center shadow-md relative overflow-hidden">
            {/* Background decorativo */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-600 via-transparent to-blue-600 pointer-events-none"></div>

            <h3 className="text-3xl font-bold text-blue-400 mb-4">Pronto para começar?</h3>
            <p className="text-white/80 mb-8">
              Baixe o app Show Shop agora e descubra como é fácil transformar o seu evento em um verdadeiro espetáculo!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-white text-black hover:bg-zinc-100 flex items-center px-6 py-3 rounded-md"
                onClick={handleOpenDialog}
              >
                <Image
                  unoptimized
                  src="https://i.imgur.com/eM63hy7.png"
                  alt="App Store"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                App Store
              </Button>
              <Button
                className="bg-white text-black hover:bg-zinc-100 flex items-center px-6 py-3 rounded-md"
                onClick={handleOpenDialog}
              >
                <Image
                  unoptimized
                  src="https://i.imgur.com/NOYdrpW.png"
                  alt="Google Play"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Google Play
              </Button>
            </div>
          </div>
        </div>

        {/* Seção inferior do footer */}
        <div className="py-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                unoptimized
                src="https://i.imgur.com/jdVt08L.png"
                alt="Show Shop"
                width={300}
                height={300}
                className="w-[160px] h-auto"
              />
            </div>
            <p className="text-white/80 text-sm text-center md:text-left">
              ©Show Shop 2024. Todos os direitos reservados
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-white/80" 
                aria-label="Instagram"
                asChild
              >
                <a 
                  href="https://www.instagram.com/showshop_app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-white/80" 
                aria-label="TikTok"
                asChild
              >
                <a 
                  href="http://tiktok.com/@showshopbr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Video className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Em breve!</DialogTitle>
          </DialogHeader>
          <p>O aplicativo estará disponível em breve. Fique ligado!</p>
          <p className="text-zinc-800">Enquanto isso, faça o pré-registro no site e entre em contato com a gente para saber como você pode se envolver.</p>
          <Button className="mt-4" onClick={handleCloseDialog}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
