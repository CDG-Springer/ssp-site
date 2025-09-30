// src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download, Menu, X } from "lucide-react";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true); // State to control navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track scroll position
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-4xl bg-black text-white rounded-lg shadow-md backdrop-blur-sm p-5">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              unoptimized
              src="https://i.imgur.com/5utA0X4.png"
              alt="Show Shop"
              width={300}
              height={300}
              className="w-[160px] h-[70px]"
            />
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Navigation Links */}
          <div className={`hidden md:flex items-center space-x-8`}>
            <a href="#beneficios" className="text-gray-300 hover:text-white" aria-label="Benefícios">
              Benefícios
            </a>
            <a href="#musicos" className="text-gray-300 hover:text-white" aria-label="Músicos">
              Músicos
            </a>
            <a href="#galeria" className="text-gray-300 hover:text-white" aria-label="Galeria">
              Galeria
            </a>

            {/* Button with Icon */}
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 flex items-center space-x-2 px-4 py-2 rounded-md"
              aria-label="Baixar agora"
            >
              <span>Baixe agora</span>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {isMobileMenuOpen && (
          <div className="flex flex-col md:hidden items-center space-y-4 mt-4">
            <a href="#beneficios" className="text-gray-300 hover:text-white" aria-label="Benefícios">
              Benefícios
            </a>
            <a href="#musicos" className="text-gray-300 hover:text-white" aria-label="Músicos">
              Músicos
            </a>
            <a href="#galeria" className="text-gray-300 hover:text-white" aria-label="Galeria">
              Galeria
            </a>
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 flex items-center space-x-2 px-4 py-2 rounded-md"
              aria-label="Baixar agora"
            >
              <span>Baixe agora</span>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
