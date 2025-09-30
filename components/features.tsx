import { Card, CardContent } from "@/components/ui/card"
import { Mic2, Calendar, Activity } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Mic2,
      title: "Encontre o Artista Ideal",
      description: "Explore uma variedade de músicos e bandas. Filtre por gênero, localização ou estilo para encontrar o talento perfeito para seu evento."
    },
    {
      icon: Calendar,
      title: "Contrate com Facilidade",
      description: "Processo simplificado de contratação com pagamento seguro e garantido."
    },
    {
      icon: Activity,
      title: "Acompanhe o Seu Evento",
      description: "Monitore todos os detalhes do seu evento em tempo real."
    }
  ]

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-blue-500">Descomplique</span> sua música ao vivo
          </h2>
          <p className="text-zinc-600">
            Simplificamos a contratação para que você possa focar no que realmente importa: curtir o show!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" aria-label={feature.title} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
