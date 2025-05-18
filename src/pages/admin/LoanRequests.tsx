
import { useState } from "react";
import { Check, X, Eye } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Type for loan requests
type LoanRequest = {
  id: string;
  userName: string;
  amount: number;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  purpose: string;
  phone: string;
  email: string;
};

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<LoanRequest | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const handleViewDetails = (loan: LoanRequest) => {
    setSelectedLoan(loan);
    setViewModalOpen(true);
  };

  const handleAction = (loan: LoanRequest, action: "approve" | "reject") => {
    setSelectedLoan(loan);
    setActionType(action);
    setAdminNote("");
    setActionModalOpen(true);
  };

  const confirmAction = () => {
    if (selectedLoan && actionType) {
      // Update loan status logic - to be replaced with Supabase call
      setLoanRequests(loanRequests.map(loan => 
        loan.id === selectedLoan.id 
          ? { ...loan, status: actionType === "approve" ? "Approved" : "Rejected" } 
          : loan
      ));
      
      toast({
        title: actionType === "approve" ? "Loan Approved" : "Loan Rejected",
        description: `Loan request from ${selectedLoan.userName} has been ${actionType === "approve" ? "approved" : "rejected"}.`,
      });
      
      setActionModalOpen(false);
    }
  };

  const columns = [
    {
      header: "User",
      accessorKey: "userName" as keyof LoanRequest,
    },
    {
      header: "Amount",
      accessorKey: "amount" as keyof LoanRequest,
      cell: (loan: LoanRequest) => `$${loan.amount}`,
    },
    {
      header: "Date",
      accessorKey: "date" as keyof LoanRequest,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof LoanRequest,
      cell: (loan: LoanRequest) => {
        const statusColors = {
          Pending: "bg-yellow-100 text-yellow-800",
          Approved: "bg-green-100 text-green-800",
          Rejected: "bg-red-100 text-red-800",
        };
        
        const color = statusColors[loan.status] || "bg-gray-100";
        
        return <Badge className={color}>{loan.status}</Badge>;
      },
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof LoanRequest,
      cell: (loan: LoanRequest) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewDetails(loan)}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          
          {loan.status === "Pending" && (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-green-600 border-green-600 hover:bg-green-50" 
                onClick={() => handleAction(loan, "approve")}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => handleAction(loan, "reject")}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loan Requests</h2>
          <p className="text-gray-500 mt-1">Manage all loan applications</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Loan Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={loanRequests}
              emptyMessage="No loan requests available yet"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* View Details Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Loan Request Details</DialogTitle>
            <DialogDescription>
              Application submitted on {selectedLoan?.date}
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoan && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Applicant</p>
                  <p>{selectedLoan.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p>${selectedLoan.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={
                    selectedLoan.status === "Approved" ? "bg-green-100 text-green-800" :
                    selectedLoan.status === "Rejected" ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>
                    {selectedLoan.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Purpose</p>
                  <p>{selectedLoan.purpose}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedLoan.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedLoan.email}</p>
                </div>
              </div>
              
              {selectedLoan.status === "Pending" && (
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      setViewModalOpen(false);
                      setTimeout(() => handleAction(selectedLoan, "approve"), 100);
                    }}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setViewModalOpen(false);
                      setTimeout(() => handleAction(selectedLoan, "reject"), 100);
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Approve/Reject Modal */}
      <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Loan Request" : "Reject Loan Request"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" 
                ? "The loan will be marked as approved and funds will be prepared for disbursement."
                : "The loan will be rejected and the applicant will be notified."
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoan && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Add an admin note (optional)</p>
                <Textarea 
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Enter your notes about this decision..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button variant="outline" onClick={() => setActionModalOpen(false)}>
                  Cancel
                </Button>
                
                <Button 
                  variant={actionType === "approve" ? "default" : "destructive"}
                  onClick={confirmAction}
                >
                  {actionType === "approve" ? "Approve Loan" : "Reject Loan"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanRequests;
