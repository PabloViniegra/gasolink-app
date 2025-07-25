import {
  Search,
  AlertCircle,
  RotateCcw,
  WifiOff,
  MapPin,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import GradientText from "../components/shared/GradientText";
import Header from "../components/shared/Header";
import { Input, Button } from "@heroui/react";
import { FAQItem } from "../types";

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const commonIssues: FAQItem[] = [
    {
      question: "La aplicación no se carga correctamente",
      answer:
        "Intenta estos pasos: 1) Actualiza la página (F5 o Ctrl+R) 2) Limpia la caché del navegador 3) Verifica tu conexión a internet",
      icon: <RotateCcw className="w-5 h-5 text-primary" />,
    },
    {
      question: "No puedo ver las estaciones de servicio",
      answer:
        "Asegúrate de que: 1) La ubicación esté activada en tu dispositivo 2) Has concedido los permisos de ubicación al navegador 3) Estás en una zona con cobertura",
      icon: <MapPin className="w-5 h-5 text-primary" />,
    },
    {
      question: "Problemas de conexión",
      answer:
        "Verifica que: 1) Tu conexión a internet esté activa 2) No estés usando un VPN que pueda bloquear la conexión 3) Intenta cambiar entre WiFi y datos móviles",
      icon: <WifiOff className="w-5 h-5 text-primary" />,
    },
    {
      question: "La aplicación consume mucha batería",
      answer:
        "Para optimizar el consumo: 1) Cierra la aplicación cuando no la uses 2) Reduce el brillo de la pantalla 3) Actualiza a la última versión de la aplicación",
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
        <div className="text-center mb-12">
          <GradientText className="text-4xl font-extrabold mb-4 font-display">
            Centro de Ayuda
          </GradientText>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans-serif tracking-wide text-lg my-2">
            Encuentra soluciones rápidas a los problemas más comunes o busca en
            nuestra base de conocimiento.
          </p>
        </div>
        <div className="w-1/2 mx-auto my-5">
          <Input
            type="text"
            placeholder="Buscar en la ayuda..."
            variant="underlined"
            className="py-2 px-1 bg-card/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/70"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={
              <Search className="size-5 text-muted-foreground pointer-events-none shrink-0" />
            }
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Preguntas Frecuentes
          </h2>

          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue, index) => (
              <div
                key={index}
                className="bg-card/50 border border-border rounded-lg overflow-hidden hover:bg-accent/10 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-accent/5 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{issue.icon}</span>
                    <span className="font-medium text-foreground">
                      {issue.question}
                    </span>
                  </div>
                  {expandedItems[index] ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {expandedItems[index] && (
                  <div className="px-6 pb-4 pt-2 border-t border-border">
                    <p className="text-muted-foreground/90">{issue.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground">
                Intenta con otros términos de búsqueda o revisa nuestras
                preguntas frecuentes.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-card/70 border border-border rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              ¿Necesitas más ayuda?
            </h3>
            <p className="text-muted-foreground mb-6">
              Si no encuentras solución a tu problema, nuestro equipo de soporte
              está aquí para ayudarte.
            </p>
            <Button
              variant="solid"
              className="font-lexend font-normal bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              Contactar con soporte
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HelpPage;
