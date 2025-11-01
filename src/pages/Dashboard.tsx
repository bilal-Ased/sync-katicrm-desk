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
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card/90 to-card/80 p-8 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/30 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow animate-pulse">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="border-primary/50 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your KatiCRM command center. Monitor companies, generate reports, and automate workflows.
            </p>
            
            <div className="flex gap-3 mt-6">
              <Link to="/reports">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium group">
                  <FileText className="mr-2 h-5 w-5" />
                  Generate Report
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/companies">
                <Button size="lg" variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
                  <Building2 className="mr-2 h-5 w-5" />
                  View Companies
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="w-32 h-32 rounded-3xl bg-gradient-primary shadow-glow flex items-center justify-center animate-float">
              <Activity className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
              <div>
                <CardDescription className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/80">
                  {stat.title}
                </CardDescription>
                <div className="flex items-baseline gap-2 mt-2">
                  {stat.isStatus ? (
                    <StatusBadge status={String(stat.value)} />
                  ) : (
                    <CardTitle className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {stat.value}
                    </CardTitle>
                  )}
                </div>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.iconBg} rounded-xl shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                {stat.change && (
                  <span className={`text-xs font-semibold ${
                    stat.trend === 'up' ? 'text-green-500' : 
                    stat.trend === 'down' ? 'text-red-500' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            <p className="text-sm text-muted-foreground mt-1">Get started with common tasks</p>
          </div>
          <Link to="/settings">
            <Button variant="outline" size="sm" className="border-border/50">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link key={action.title} to={action.link}>
              <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="relative pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 bg-gradient-to-br ${action.color} rounded-xl shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {action.badge}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="relative">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                  <div className="flex items-center mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Get started
                    <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity / System Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  System Overview
                </CardTitle>
                <CardDescription className="mt-1">Key metrics and insights</CardDescription>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Operational
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Active Companies</p>
                  <p className="text-sm text-muted-foreground">Ready to generate reports</p>
                </div>
              </div>
              <span className="text-2xl font-bold">{companies?.length || 0}</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">API Status</p>
                  <p className="text-sm text-muted-foreground">Version {health?.version || 'Loading...'}</p>
                </div>
              </div>
              <StatusBadge status={health?.status || 'Loading'} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">Scheduled Reports</p>
                  <p className="text-sm text-muted-foreground">Automation ready</p>
                </div>
              </div>
              <span className="text-2xl font-bold">0</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card via-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Getting Started
            </CardTitle>
            <CardDescription>Quick setup guide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="p-1.5 bg-green-500/10 rounded-lg mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">System Connected</p>
                <p className="text-xs text-muted-foreground">Backend API is running</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Add Companies</p>
                <p className="text-xs text-muted-foreground">Configure your first client</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="p-1.5 bg-blue-500/10 rounded-lg mt-0.5">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Generate Reports</p>
                <p className="text-xs text-muted-foreground">Create your first ticket report</p>
              </div>
            </div>

            <Link to="/schedules">
              <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
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
