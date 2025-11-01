import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, FileText, Activity, TrendingUp, Sparkles } from "lucide-react";
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
      description: "Total active companies",
      icon: Building2,
      link: "/companies",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "System Status",
      value: health?.status || "Loading...",
      description: `Version ${health?.version || "-"}`,
      icon: Activity,
      gradient: "from-success/20 to-success/5",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to KatiCRM Ticket Management System
          </p>
        </div>
        <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden border-border/50 backdrop-blur-sm bg-gradient-to-br from-card to-card/50 hover:shadow-glow transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-background/50 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold mb-1">
                {stat.title === "System Status" ? (
                  <StatusBadge status={String(stat.value)} />
                ) : (
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              {stat.link && (
                <Link to={stat.link}>
                  <Button variant="link" className="px-0 mt-2 text-primary hover:text-primary-glow">
                    View all →
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="relative">
            <div className="p-3 bg-gradient-primary rounded-xl w-fit mb-4 shadow-medium group-hover:scale-110 transition-transform">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">Companies</CardTitle>
            <CardDescription>
              Manage your client companies and their configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Link to="/companies">
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium">
                Manage Companies
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="relative">
            <div className="p-3 bg-gradient-primary rounded-xl w-fit mb-4 shadow-medium group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">Schedules</CardTitle>
            <CardDescription>
              Configure automated report schedules
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Link to="/schedules">
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium">
                View Schedules
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="relative">
            <div className="p-3 bg-gradient-primary rounded-xl w-fit mb-4 shadow-medium group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">Reports</CardTitle>
            <CardDescription>
              Generate and view ticket reports
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Link to="/reports">
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium">
                Generate Report
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 backdrop-blur-sm bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Quick Actions</CardTitle>
          </div>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Link to="/companies">
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
              <Building2 className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </Link>
          <Link to="/schedules">
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
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
