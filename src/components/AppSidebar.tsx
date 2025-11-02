import { Building2, Calendar, FileText, Home, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "Users", url: "/users", icon: Users },
  { title: "Schedules", url: "/schedules", icon: Calendar },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar-background">
      <SidebarContent>
        <div className="px-6 py-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">KatiCRM</h1>
          <p className="text-xs text-muted-foreground mt-1">Ticket Management System</p>
        </div>
        
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft font-medium"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                          <span className="text-sm">{item.title}</span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
