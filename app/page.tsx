"use client"; // Certifique-se de que o componente seja tratado como Client Component

import { Artists } from "@/components/artists";
import { ContactForm } from "@/components/contact-form";
import { Features } from "@/components/features";
import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { useEffect } from "react";
import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Variável para armazenar a instância do Firebase
let firebaseApp: FirebaseApp | undefined;

export default function Home() {
  useEffect(() => {
    // Inicializar Firebase apenas se ainda não estiver inicializado
    try {
      firebaseApp = getApp(); // Tenta obter a instância existente
    } catch {
      // Se não existir, inicializa uma nova instância
      firebaseApp = initializeApp(firebaseConfig);
    }

    // Inicializar o Firebase Analytics
    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported) {
          const analytics = getAnalytics(firebaseApp);
          logEvent(analytics, 'page_view'); // Registrar o evento de visualização de página
        }
      });
    }
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Artists />
      <ContactForm />
      <Footer />
    </main>
  );
}
