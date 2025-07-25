import { useState } from 'react';
import { RotateCcw, WifiOff, MapPin, Zap } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/shared/Header';
import { FAQItem } from '../types';
import HelpHero from '../components/help/HelpHero';
import SearchBar from '../components/help/SearchBar';
import FAQList from '../components/help/FAQList';
import SupportBanner from '../components/help/SupportBanner';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const commonIssues: FAQItem[] = [
    {
      question: 'La aplicación no se carga correctamente',
      answer:
        'Intenta estos pasos: 1) Actualiza la página (F5 o Ctrl+R) 2) Limpia la caché del navegador 3) Verifica tu conexión a internet',
      icon: <RotateCcw className="w-5 h-5 text-primary" />,
    },
    {
      question: 'No puedo ver las estaciones de servicio',
      answer:
        'Asegúrate de que: 1) La ubicación esté activada en tu dispositivo 2) Has concedido los permisos de ubicación al navegador 3) Estás en una zona con cobertura',
      icon: <MapPin className="w-5 h-5 text-primary" />,
    },
    {
      question: 'Problemas de conexión',
      answer:
        'Verifica que: 1) Tu conexión a internet esté activa 2) No estés usando un VPN que pueda bloquear la conexión 3) Intenta cambiar entre WiFi y datos móviles',
      icon: <WifiOff className="w-5 h-5 text-primary" />,
    },
    {
      question: 'La aplicación consume mucha batería',
      answer:
        'Para optimizar el consumo: 1) Cierra la aplicación cuando no la uses 2) Reduce el brillo de la pantalla 3) Actualiza a la última versión de la aplicación',
      icon: <Zap className="w-5 h-5 text-primary" />,
    },
  ];

  const filteredIssues = commonIssues.filter(
    (issue) =>
      issue.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        <HelpHero
          title="Centro de Ayuda"
          description="Encuentra soluciones rápidas a los problemas más comunes o busca en nuestra base de conocimiento."
        />
        
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Buscar en la ayuda..."
        />

        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Preguntas Frecuentes
          </h2>
          <FAQList faqs={filteredIssues} />
        </div>

        <SupportBanner />
      </div>
    </MainLayout>
  );
};

export default HelpPage;
