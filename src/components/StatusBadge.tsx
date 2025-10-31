import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
    completed: { variant: "default", className: "bg-success text-success-foreground" },
    processing: { variant: "default", className: "bg-primary text-primary-foreground" },
    scheduled: { variant: "default", className: "bg-accent text-accent-foreground" },
    failed: { variant: "destructive", className: "" },
    sending: { variant: "default", className: "bg-warning text-warning-foreground" },
    sent: { variant: "default", className: "bg-success text-success-foreground" },
  };

  const config = variants[status.toLowerCase()] || { variant: "outline" as const, className: "" };

  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
}
