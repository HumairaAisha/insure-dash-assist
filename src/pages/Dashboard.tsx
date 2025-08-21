import { 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  MapPin,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import ClaimsTable from '@/components/dashboard/ClaimsTable';
import { Button } from '@/components/ui/button';

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
        <div className="bg-gradient-to-r from-trust-blue-600 to-trust-blue-800 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Administrator</h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your claims today
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-blue-200">Today's Date</p>
                <p className="text-xl font-semibold">January 20, 2024</p>
              </div>
              <Shield className="w-12 h-12 text-blue-200" />
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Claims Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-card-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Claims by Location</h3>
                  <p className="text-sm text-muted-foreground">Interactive fraud risk heatmap</p>
                </div>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Full Map
                </Button>
              </div>
              
              {/* Simulated Map View */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">Interactive Map View</p>
                  <p className="text-xs text-muted-foreground mt-1">Click pins to view claim details</p>
                </div>
                
                {/* Sample pins */}
                <div className="absolute top-4 left-8 w-3 h-3 bg-success-green rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-12 right-12 w-3 h-3 bg-alert-orange rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute bottom-8 left-1/3 w-3 h-3 bg-trust-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-card-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start button-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Flagged Claims
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md border border-card-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success-green rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Claim CLM-001 approved</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-alert-orange rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">High fraud score detected</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-trust-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">New WhatsApp claim received</p>
                    <p className="text-xs text-muted-foreground">8 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <ClaimsTable />
      </div>
    </DashboardLayout>
  );
}