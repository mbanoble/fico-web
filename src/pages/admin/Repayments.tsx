
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type for repayments
type Repayment = {
  id: string;
  user: string;
  amount: number;
  loanId: string;
  date: string;
  paymentMethod: string;
  status: "On Time" | "Late" | "Outstanding";
};

const Repayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  // Empty array to be replaced with Supabase data
  const repayments: Repayment[] = [];

  const filteredRepayments = repayments.filter((repayment) => {
    const matchesSearch = !searchQuery || 
      repayment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repayment.loanId.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !statusFilter || repayment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "User",
      accessorKey: "user" as keyof Repayment,
    },
    {
      header: "Amount",
      accessorKey: "amount" as keyof Repayment,
      cell: (repayment: Repayment) => `$${repayment.amount}`,
    },
    {
      header: "Loan ID",
      accessorKey: "loanId" as keyof Repayment,
    },
    {
      header: "Date",
      accessorKey: "date" as keyof Repayment,
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod" as keyof Repayment,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof Repayment,
      cell: (repayment: Repayment) => {
        const statusColor = 
          repayment.status === "On Time" ? "bg-green-100 text-green-800" :
          repayment.status === "Late" ? "bg-yellow-100 text-yellow-800" :
          "bg-red-100 text-red-800";
        
        return <Badge className={statusColor}>{repayment.status}</Badge>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Repayments</h2>
        <p className="text-gray-500 mt-1">Track all loan repayments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Repayments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by user or loan ID..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="On Time">On Time</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Outstanding">Outstanding</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DataTable
            columns={columns}
            data={filteredRepayments}
            emptyMessage="No repayment data available yet"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Repayments;
