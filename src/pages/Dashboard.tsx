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
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/30 p-10 shadow-md">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Dashboard</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-3 text-foreground tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Your KatiCRM command center. Monitor companies, generate reports, and automate workflows with ease.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/reports">
              <Button size="lg" className="shadow-sm">
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
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  {stat.isStatus ? (
                    <StatusBadge status={String(stat.value)} />
                  ) : (
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  )}
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
            
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 -z-10"></div>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Common tasks and operations</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.link} className="group">
              <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/15 group-hover:to-primary/10 transition-colors">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {action.badge}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">System Overview</CardTitle>
            <CardDescription>Key metrics and insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">Active Companies</p>
                  <p className="text-xs text-muted-foreground">Ready to generate reports</p>
                </div>
              </div>
              <span className="text-2xl font-bold">{companies?.length || 0}</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">API Status</p>
                  <p className="text-xs text-muted-foreground">Version {health?.version || 'Loading...'}</p>
                </div>
              </div>
              <StatusBadge status={health?.status || 'Loading'} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Getting Started</CardTitle>
            <CardDescription>Quick setup guide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-0.5">System Connected</p>
                <p className="text-xs text-muted-foreground">Backend API is running smoothly</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-0.5">Add Companies</p>
                <p className="text-xs text-muted-foreground">Configure your first client</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-0.5">Generate Reports</p>
                <p className="text-xs text-muted-foreground">Create your first ticket report</p>
              </div>
            </div>

            <Link to="/schedules" className="block mt-5">
              <Button className="w-full shadow-sm">
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
