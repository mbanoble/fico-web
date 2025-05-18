
import { Users, FileText, Check, X, BarChart, Calendar } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Empty data placeholders - to be replaced with Supabase data
const loanActivityData = [];
const userGrowthData = [];
const recentLoans = [];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome to your Fico Point admin dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Users" 
          value="0" 
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatCard 
          title="Loan Requests" 
          value="0" 
          icon={<FileText className="h-6 w-6 text-indigo-600" />}
        />
        <StatCard 
          title="Loans Approved" 
          value="0" 
          icon={<Check className="h-6 w-6 text-green-600" />}
        />
        <StatCard 
          title="Loans Pending" 
          value="0" 
          icon={<Calendar className="h-6 w-6 text-yellow-600" />}
        />
        <StatCard 
          title="Amount Disbursed" 
          value="$0" 
          icon={<BarChart className="h-6 w-6 text-purple-600" />}
        />
        <StatCard 
          title="Repayments Made" 
          value="$0" 
          icon={<BarChart className="h-6 w-6 text-teal-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Loan Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 flex items-center justify-center">
              {loanActivityData.length > 0 ? (
                <ChartContainer
                  config={{
                    loans: { color: "#818CF8" },
                    repayments: { color: "#34D399" }
                  }}
                >
                  <RechartBarChart data={loanActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="loans" fill="var(--color-loans, #818CF8)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="repayments" fill="var(--color-repayments, #34D399)" radius={[4, 4, 0, 0]} />
                  </RechartBarChart>
                </ChartContainer>
              ) : (
                <p className="text-gray-500">No loan activity data available yet</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 flex items-center justify-center">
              {userGrowthData.length > 0 ? (
                <ChartContainer
                  config={{
                    users: { color: "#F472B6" }
                  }}
                >
                  <LineChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="var(--color-users, #F472B6)" 
                      strokeWidth={2} 
                      dot={{ stroke: "var(--color-users, #F472B6)", strokeWidth: 2, r: 4, fill: "#fff" }}
                      activeDot={{ r: 6, fill: "var(--color-users, #F472B6)" }}
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <p className="text-gray-500">No user growth data available yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Loan Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLoans.length > 0 ? (
                  recentLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <Link to="/admin/users" className="hover:underline">
                          {loan.user}
                        </Link>
                      </TableCell>
                      <TableCell>{loan.amount}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
                          ${
                            loan.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            loan.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`
                        }>
                          {loan.status}
                        </span>
                      </TableCell>
                      <TableCell>{loan.date}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" asChild>
                          <Link to="/admin/loan-requests">View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No loan requests available yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
