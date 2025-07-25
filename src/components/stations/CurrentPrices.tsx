interface FuelPrice {
  name: string;
  price: string | null;
  color: string;
}

interface CurrentPricesProps {
  prices: {
    Gasolina95: string | null;
    Gasolina98: string | null;
    Diesel: string | null;
    DieselPremium: string | null;
    DieselB: string | null;
    GLP_media: string | null;
  };
  lastUpdate?: string | Date | null;
}

const CurrentPrices: React.FC<CurrentPricesProps> = ({
  prices,
  lastUpdate,
}) => {
  const fuelTypes: FuelPrice[] = [
    {
      name: "Gasolina 95",
      price: prices.Gasolina95,
      color: "text-chart-1",
    },
    {
      name: "Gasolina 98",
      price: prices.Gasolina98,
      color: "text-chart-2",
    },
    {
      name: "Diésel",
      price: prices.Diesel,
      color: "text-chart-3",
    },
    {
      name: "Diésel Premium",
      price: prices.DieselPremium,
      color: "text-chart-4",
    },
    {
      name: "Diésel B",
      price: prices.DieselB,
      color: "text-chart-5",
    },
    {
      name: "GLP",
      price: prices.GLP_media,
      color: "text-primary",
    },
  ].filter((item) => item.price !== null && item.price !== undefined);

  return (
    <div className="bg-card/50 border border-border rounded-xl p-6 mb-8 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-foreground font-sans mb-6">
        Precios actuales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fuelTypes.map((item, index) => (
          <div
            key={index}
            className="bg-accent/5 border border-border/30 rounded-xl p-4 hover:bg-accent/10 transition-colors duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="font-sans font-medium text-foreground/90">
                {item.name}
              </span>
              <span
                className={`text-xl font-bold ${
                  item.price ? item.color : "text-muted-foreground/50"
                }`}
              >
                {item.price ? `${item.price} €/L` : "—"}
              </span>
            </div>
            {lastUpdate && (
              <div className="mt-2 text-xs font-mono text-muted-foreground/70">
                Actualizado: {new Date(lastUpdate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPrices;
