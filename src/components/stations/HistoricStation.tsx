import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Historic } from '../../types';
import { getFuelName } from '../../lib/utils';

interface HistoricStationProps {
  data: Historic['data'];
}

const CHART_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
];

const HistoricStation: React.FC<HistoricStationProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const fuelTypes = Array.from(new Set(data.map((item) => item.idFuelType)));

  const chartData = data.reduce((acc, item) => {
    const date = new Date(item.timestamp);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!acc[dateKey]) {
      acc[dateKey] = { date: date };
    }
    
    acc[dateKey][`${item.idFuelType}_price`] = parseFloat(item.precio);
    acc[dateKey][`${item.idFuelType}_name`] = getFuelName(item.idFuelType);
    
    return acc;
  }, {} as Record<string, any>);

  const chartDataArray = Object.values(chartData).sort(
    (a, b) => a.date - b.date
  );

  const formatXAxis = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <div className="bg-card/50 border border-border rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-foreground font-sans mb-6">
        Evolución de precios
      </h2>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartDataArray}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fill: 'var(--foreground)' }}
              tickMargin={10}
            />
            <YAxis
              tickFormatter={(value) => `${value} €`}
              tick={{ fill: 'var(--foreground)' }}
              tickMargin={10}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toFixed(3)} €/L`,
                getFuelName(name.replace('_price', '')),
              ]}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              }
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--foreground)',
              }}
            />
            <Legend
              formatter={(value) => getFuelName(value.replace('_price', ''))}
            />
            {fuelTypes.map((fuelType, index) => (
              <Line
                key={fuelType}
                type="monotone"
                dataKey={`${fuelType}_price`}
                name={fuelType.toString()}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                activeDot={{ r: 6 }}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricStation;
