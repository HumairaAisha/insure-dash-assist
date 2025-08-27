
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import ClaimsTable from '@/components/dashboard/ClaimsTable';

export default function Dashboard() {
  const statsCards = [
    {
      title: "New Claims Today",
      value: "24",
      change: "+12% from yesterday",
      changeType: "positive" as const,
      icon: FileText,
      gradient: "primary" as const,
      subtitle: "Across all channels"
    },
    {
      title: "Fastest Processed",
      value: "2.3 min", 
      change: "-30 sec improvement",
      changeType: "positive" as const,
      icon: Clock,
      gradient: "success" as const,
      subtitle: "Average processing time"
    },
    {
      title: "Pending Reviews",
      value: "47",
      change: "5 flagged for fraud",
      changeType: "neutral" as const,
      icon: AlertTriangle,
      gradient: "warning" as const,
      subtitle: "Awaiting approval"
    },
    {
      title: "Claims by Channel",
      value: "WhatsApp 65%",
      change: "SMS 25%, USSD 10%",
      changeType: "neutral" as const,
      icon: BarChart3,
      subtitle: "Most popular channel"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-neutral-300 text-lg">
                Here's what's happening with your claims today
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Shield className="w-12 h-12 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <StatsCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              changeType={card.changeType}
              icon={card.icon}
              subtitle={card.subtitle}
              gradient={card.gradient}
              onClick={() => console.log(`Clicked ${card.title}`)}
            />
          ))}
        </div>

        {/* Claims Table */}
        <ClaimsTable />
      </div>
    </DashboardLayout>
  );
}
