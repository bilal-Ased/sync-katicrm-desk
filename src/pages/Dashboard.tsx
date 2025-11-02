import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Calendar, 
  FileText, 
  Activity, 
  ArrowUpRight, 
  Sparkles,
  Clock,
  TrendingUp,
  Users,
  Settings,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";

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

  const mainStats = [
    {
      title: "Total Companies",
      value: companies?.length || 0,
      change: "+12%",
      trend: "up",
      icon: Building2,
      description: "Active organizations",
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      iconBg: "from-violet-500 to-purple-600",
    },
    {
      title: "Reports Generated",
      value: "0",
      change: "0%",
      trend: "neutral",
      icon: FileText,
      description: "This month",
      gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
      iconBg: "from-blue-500 to-cyan-600",
    },
    {
      title: "Active Schedules",
      value: "0",
      change: "0%",
      trend: "neutral",
      icon: Clock,
      description: "Automated reports",
      gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
      iconBg: "from-amber-500 to-orange-600",
    },
    {
      title: "System Status",
      value: health?.status || "Loading",
      change: health?.version || "",
      trend: "up",
      icon: Activity,
      description: "All systems operational",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      iconBg: "from-green-500 to-emerald-600",
      isStatus: true,
    },
  ];

  const quickActions = [
    {
      title: "Manage Companies",
      description: "View and configure client companies",
      icon: Building2,
      link: "/companies",
      color: "from-violet-500 to-purple-600",
      badge: "Popular",
    },
    {
      title: "Generate Report",
      description: "Create ticket reports instantly",
      icon: FileText,
      link: "/reports",
      color: "from-blue-500 to-cyan-600",
      badge: "Quick",
    },
    {
      title: "Schedule Reports",
      description: "Automate report generation",
      icon: Calendar,
      link: "/schedules",
      color: "from-amber-500 to-orange-600",
      badge: "Auto",
    },
    {
      title: "Manage Users",
      description: "Configure user permissions",
      icon: Users,
      link: "/users",
      color: "from-green-500 to-emerald-600",
      badge: "New",
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="rounded-lg border border-border bg-card p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Your KatiCRM command center. Monitor companies, generate reports, and automate workflows.
            </p>
            
            <div className="flex gap-3 mt-6">
              <Link to="/reports">
                <Button size="lg">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </Link>
              <Link to="/companies">
                <Button size="lg" variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  View Companies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-sm font-medium">
                {stat.title}
              </CardDescription>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                {stat.isStatus ? (
                  <StatusBadge status={String(stat.value)} />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.link}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {action.badge}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <h3 className="font-semibold mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Overview</CardTitle>
            <CardDescription>Key metrics and insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Active Companies</p>
                  <p className="text-xs text-muted-foreground">Ready to generate reports</p>
                </div>
              </div>
              <span className="text-lg font-semibold">{companies?.length || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">API Status</p>
                  <p className="text-xs text-muted-foreground">Version {health?.version || 'Loading...'}</p>
                </div>
              </div>
              <StatusBadge status={health?.status || 'Loading'} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Getting Started</CardTitle>
            <CardDescription>Quick setup guide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium">System Connected</p>
                <p className="text-xs text-muted-foreground">Backend API is running</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Add Companies</p>
                <p className="text-xs text-muted-foreground">Configure your first client</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Generate Reports</p>
                <p className="text-xs text-muted-foreground">Create your first ticket report</p>
              </div>
            </div>

            <Link to="/schedules" className="block mt-4">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Set Up Schedules
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
