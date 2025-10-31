import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, FileText, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";

const Dashboard = () => {
  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: api.getHealth,
    refetchInterval: 30000,
  });

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => api.getCompanies(true),
  });

  const stats = [
    {
      title: "Active Companies",
      value: companies?.length || 0,
      icon: Building2,
      link: "/companies",
      description: "Total active companies",
    },
    {
      title: "System Status",
      value: health?.status || "Loading...",
      icon: Activity,
      description: `Version ${health?.version || ""}`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to KatiCRM Ticket Management System
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.title === "System Status" ? (
                  <StatusBadge status={String(stat.value)} />
                ) : (
                  stat.value
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              {stat.link && (
                <Link to={stat.link}>
                  <Button variant="link" className="px-0 mt-2">
                    View all →
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Companies
            </CardTitle>
            <CardDescription>
              Manage your client companies and their configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/companies">
              <Button className="w-full">Manage Companies</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Schedules
            </CardTitle>
            <CardDescription>
              Configure automated report schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/schedules">
              <Button className="w-full">View Schedules</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Reports
            </CardTitle>
            <CardDescription>
              Generate and view ticket reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/reports">
              <Button className="w-full">Generate Report</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link to="/companies">
            <Button variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </Link>
          <Link to="/schedules">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Create Schedule
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
