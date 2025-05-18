
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Cell, Legend, ResponsiveContainer } from "recharts";

// Empty data placeholders - to be replaced with Supabase data
const monthlyLoanData = [];
const repaymentPerformanceData = [];
const userGrowthData = [];

const repaymentColors = ["#4ade80", "#facc15", "#f87171"];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics & Reporting</h2>
          <p className="text-gray-500 mt-1">Visualize app performance and statistics</p>
        </div>
        
        <div>
          <Button variant="outline">
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Loan Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 flex items-center justify-center">
              {monthlyLoanData.length > 0 ? (
                <ChartContainer
                  config={{
                    loans: { color: "#818CF8" },
                    amount: { color: "#34D399" }
                  }}
                >
                  <BarChart data={monthlyLoanData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip />
                    <Bar yAxisId="left" dataKey="loans" fill="var(--color-loans, #818CF8)" name="Number of Loans" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="amount" fill="var(--color-amount, #34D399)" name="Total Amount ($)" radius={[4, 4, 0, 0]} />
                    <Legend />
                  </BarChart>
                </ChartContainer>
              ) : (
                <p className="text-gray-500">No monthly loan data available yet</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Repayment Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 flex items-center justify-center">
              {repaymentPerformanceData.length > 0 ? (
                <ChartContainer
                  config={{
                    "On Time": { color: "#4ade80" },
                    "Late": { color: "#facc15" },
                    "Outstanding": { color: "#f87171" }
                  }}
                >
                  <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <ChartTooltip />
                    <Pie
                      data={repaymentPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {repaymentPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={repaymentColors[index % repaymentColors.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ChartContainer>
              ) : (
                <p className="text-gray-500">No repayment performance data available yet</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Growth (Last 6 weeks)</CardTitle>
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
    </div>
  );
};

export default Analytics;
