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
    <div className="space-y-8 pb-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 p-12 shadow-lg backdrop-blur-sm">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm hover:bg-primary/15 transition-all">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Dashboard Overview</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-5 bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight leading-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
            Your KatiCRM command center. Monitor companies, generate reports, and automate workflows with ease.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/reports">
              <Button size="lg" className="h-12 px-7 text-[15px] font-semibold shadow-md hover:shadow-lg">
                <FileText className="mr-2 h-5 w-5" />
                Generate Report
              </Button>
            </Link>
            <Link to="/companies">
              <Button size="lg" variant="outline" className="h-12 px-7 text-[15px] font-semibold">
                <Building2 className="mr-2 h-5 w-5" />
                View Companies
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden group hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  {stat.isStatus ? (
                    <StatusBadge status={String(stat.value)} />
                  ) : (
                    <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                  )}
                </div>
              </div>
              <div className="p-3.5 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.description}
              </p>
            </CardContent>
            
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/[0.03] -z-10 group-hover:to-primary/[0.06] transition-all"></div>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Quick Actions</h2>
            <p className="text-base text-muted-foreground">Common tasks and operations</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.link} className="group">
              <Card className="hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer h-full relative overflow-hidden">
                <CardHeader className="pb-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-1">
                      {action.badge}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </CardContent>
                
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/[0.03] -z-10 group-hover:to-primary/[0.06] transition-all"></div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              System Overview
            </CardTitle>
            <CardDescription className="text-base">Key metrics and insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-muted/60 to-muted/40 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold mb-1">Active Companies</p>
                  <p className="text-sm text-muted-foreground">Ready to generate reports</p>
                </div>
              </div>
              <span className="text-3xl font-bold">{companies?.length || 0}</span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-muted/60 to-muted/40 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold mb-1">API Status</p>
                  <p className="text-sm text-muted-foreground">Version {health?.version || 'Loading...'}</p>
                </div>
              </div>
              <StatusBadge status={health?.status || 'Loading'} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Getting Started
            </CardTitle>
            <CardDescription className="text-base">Quick setup guide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/60 transition-all cursor-pointer border border-transparent hover:border-border/50">
              <div className="p-2.5 bg-success/10 rounded-xl shrink-0">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold mb-1">System Connected</p>
                <p className="text-sm text-muted-foreground">Backend API is running smoothly</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/60 transition-all cursor-pointer border border-transparent hover:border-border/50">
              <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold mb-1">Add Companies</p>
                <p className="text-sm text-muted-foreground">Configure your first client</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/60 transition-all cursor-pointer border border-transparent hover:border-border/50">
              <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold mb-1">Generate Reports</p>
                <p className="text-sm text-muted-foreground">Create your first ticket report</p>
              </div>
            </div>

            <Link to="/schedules" className="block mt-6">
              <Button className="w-full h-12 text-base">
                <Calendar className="mr-2 h-5 w-5" />
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
