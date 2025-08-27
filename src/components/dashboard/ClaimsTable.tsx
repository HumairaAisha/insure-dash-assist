import { useState } from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Smartphone,
  MessageSquare,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Claim {
  id: string;
  customerName: string;
  channel: 'USSD' | 'SMS' | 'WhatsApp';
  fraudScore: number;
  status: 'pending' | 'approved' | 'flagged' | 'processing';
  amount: string;
  date: string;
  location: string;
  claimType: string;
}

const mockClaims: Claim[] = [
  {
    id: "CLM-2024-001",
    customerName: "John Doe",
    channel: "WhatsApp",
    fraudScore: 15,
    status: "pending",
    amount: "N2,500",
    date: "2024-01-20",
    location: "Lagos, Nigeria", 
    claimType: "Vehicle Accident"
  },
  {
    id: "CLM-2024-002",
    customerName: "Sarah Johnson",
    channel: "SMS",
    fraudScore: 85,
    status: "flagged",
    amount: "N15,000",
    date: "2024-01-20",
    location: "Abuja, Nigeria",
    claimType: "Property Damage"
  },
  {
    id: "CLM-2024-003",
    customerName: "Michael Chen",
    channel: "USSD",
    fraudScore: 25,
    status: "approved",
    amount: "N1,200",
    date: "2024-01-19",
    location: "Port Harcourt, Nigeria",
    claimType: "Medical"
  },
  {
    id: "CLM-2024-004",
    customerName: "Fatima Ibrahim",
    channel: "WhatsApp", 
    fraudScore: 65,
    status: "processing",
    amount: "N5,800",
    date: "2024-01-19",
    location: "Kano, Nigeria",
    claimType: "Theft"
  },
  {
    id: "CLM-2024-005",
    customerName: "David Wilson",
    channel: "SMS",
    fraudScore: 10,
    status: "pending",
    amount: "N3,200",
    date: "2024-01-18",
    location: "Ibadan, Nigeria",
    claimType: "Vehicle Damage"
  }
];

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'WhatsApp': return MessageSquare;
    case 'SMS': return Smartphone;
    case 'USSD': return Phone;
    default: return Phone;
  }
};

const getFraudScoreClass = (score: number) => {
  if (score <= 30) return 'fraud-low';
  if (score <= 70) return 'fraud-medium';
  return 'fraud-high';
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'approved': return 'default';
    case 'pending': return 'secondary';
    case 'flagged': return 'destructive';
    case 'processing': return 'outline';
    default: return 'secondary';
  }
};

export default function ClaimsTable() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const { toast } = useToast();

    const sendSMS = async (claim: Claim, action: "approved" | "rejected") => {
    try {
      const response = await fetch("http://localhost:8080/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: "+2348032871736", // Sandbox test number
          message: `Dear ${claim.customerName}, your claim ${claim.id} has been ${action}.`
        })
      });

      const result = await response.json();

      if (result.SMSMessageData) {
        toast({
          title: "SMS Sent",
          description: `Notification sent to ${claim.customerName}`
        });
      } else {
        toast({
          title: "Failed to send SMS",
          description: result.error || "Something went wrong",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not send SMS",
        variant: "destructive"
      });
    }
  };

    const handleApprove = (claim: Claim) => {
    toast({
      title: "Claim Approved",
      description: `${claim.id} has been approved successfully.`,
    });
    sendSMS(claim, "approved");
  };

  const handleReject = (claim: Claim) => {
    toast({
      title: "Claim Rejected", 
      description: `${claim.id} has been rejected and flagged for review.`,
      variant: "destructive"
    });
    sendSMS(claim, "rejected");
  };


  /* const handleApprove = (claim: Claim) => {
    toast({
      title: "Claim Approved",
      description: `${claim.id} has been approved successfully.`,
    });
  };

  const handleReject = (claim: Claim) => {
    toast({
      title: "Claim Rejected", 
      description: `${claim.id} has been rejected and flagged for review.`,
      variant: "destructive"
    });
  }; */

  return (
    <div className="professional-table">
      <div className="p-6 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-foreground">Latest Claims</h3>
        <p className="text-sm text-muted-foreground">Review and manage recent claim submissions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Claim Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Fraud Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {mockClaims.map((claim) => {
              const ChannelIcon = getChannelIcon(claim.channel);
              return (
                <tr 
                  key={claim.id} 
                  className="table-row-hover"
                  onClick={() => setSelectedClaim(claim)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-foreground">{claim.id}</div>
                      <div className="text-sm text-muted-foreground">{claim.customerName}</div>
                      <div className="text-xs text-muted-foreground">{claim.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ChannelIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-foreground">{claim.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      getFraudScoreClass(claim.fraudScore)
                    )}>
                      {claim.fraudScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(claim.status)} className="capitalize">
                      {claim.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {claim.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleApprove(claim)}>
                          <CheckCircle className="w-4 h-4 mr-2 text-success-green" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(claim)}>
                          <XCircle className="w-4 h-4 mr-2 text-red-600" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}