// src/components/analytics/MetricsCards.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  description: string;
  icon: React.ReactNode;
}

export function MetricsCards() {
  const metrics: MetricCard[] = [
    {
      title: 'Total Opens',
      value: '2,548',
      change: 12.5,
      description: 'vs last 30 days',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Total Clicks',
      value: '894',
      change: 8.2,
      description: 'vs last 30 days',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Open Rate',
      value: '21.8%',
      change: 1.3,
      description: 'Industry avg: 21.5%',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Click Rate',
      value: '7.8%',
      change: -0.5,
      description: 'Industry avg: 8.2%',
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
    },
    {
      title: 'Bounce Rate',
      value: '2.1%',
      change: 0,
      description: 'Industry avg: 2.5%',
      icon: <Minus className="h-5 w-5 text-gray-500" />,
    },
    {
      title: 'Unsubscribes',
      value: '24',
      change: -3.2,
      description: 'vs last 30 days',
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.icon}
                  <span className={`text-sm ml-1 ${metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">{metric.description}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}