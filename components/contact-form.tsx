"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFacebookPixel } from "@/lib/hooks/useFacebookPixel"
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getApp } from 'firebase/app'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ContactForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { trackLead } = useFacebookPixel()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    
    try {
      const formData = new FormData(form)
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        source: formData.get('source') as string,
        createdAt: new Date()
      }

      console.log('Dados a serem enviados:', data)

      // Salvar no Firebase
      const app = getApp()
      console.log('App Firebase:', app)

      const db = getFirestore(app)
      console.log('Firestore DB:', db)

      await addDoc(collection(db, 'preRegistro'), data)
      
      // Rastrear o lead com Facebook Pixel
      trackLead({
        content_name: 'Form Submission',
        content_category: 'Contact Form',
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone,
        source: data.source
      })

      // Limpar formulário e mostrar diálogo
      form.reset()
      setIsDialogOpen(true)
      
    } catch (error: any) {
      console.error('Erro detalhado:', {
        message: error?.message || 'Erro desconhecido',
        code: error?.code || 'UNKNOWN',
        stack: error?.stack,
        fullError: error
      })
      alert(`Erro ao enviar formulário: ${error?.message || 'Erro desconhecido'}`)
    }
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Quer ficar por <span className="text-blue-500">dentro</span> de tudo?</h2>
          <p className="text-zinc-600 mb-8 text-center">Preencha o formulário ao lado e seja o primeiro a saber quando a Show Shop estiver no ar!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700">Nome</label>
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                id="name"
                name="name"
                placeholder="Digite seu nome"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">E-mail</label>
              <input
                type="email"
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">Telefone</label>
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                id="phone"
                name="phone"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-zinc-700">De onde você veio?</label>
              <Select name="source" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600"
            >
              Solicitar contato
            </Button>
          </form>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Obrigado pelo interesse!</DialogTitle>
          </DialogHeader>
          <p>Entraremos em contato em breve.</p>
          <Button className="mt-4" onClick={handleCloseDialog}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}
