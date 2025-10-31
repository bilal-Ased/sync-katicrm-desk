import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ReportSchedule } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Edit, Trash2, Plus, Play } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";

const Schedules = () => {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<ReportSchedule | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => api.getCompanies(true),
  });

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["schedules", selectedCompany],
    queryFn: () => api.getSchedules(selectedCompany!),
    enabled: !!selectedCompany,
  });

  const createMutation = useMutation({
    mutationFn: ({ companyId, data }: { companyId: number; data: any }) =>
      api.createSchedule(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast({ title: "Schedule created successfully" });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ companyId, scheduleId, data }: { companyId: number; scheduleId: number; data: any }) =>
      api.updateSchedule(companyId, scheduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast({ title: "Schedule updated successfully" });
      setOpen(false);
      setEditingSchedule(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ companyId, scheduleId }: { companyId: number; scheduleId: number }) =>
      api.deleteSchedule(companyId, scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast({ title: "Schedule deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const triggerMutation = useMutation({
    mutationFn: ({ companyId, scheduleId }: { companyId: number; scheduleId: number }) =>
      api.triggerSchedule(companyId, scheduleId),
    onSuccess: () => {
      toast({ title: "Schedule triggered successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCompany) return;

    const formData = new FormData(e.currentTarget);
    const reportType = formData.get("report_type") as string;
    
    const data: any = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      report_type: reportType,
      is_active: formData.get("is_active") === "on",
      recipients: formData.get("recipients") as string,
    };

    if (reportType === "custom") {
      data.cron_expression = formData.get("cron_expression") as string;
      data.date_start = formData.get("date_start") as string;
      data.date_end = formData.get("date_end") as string;
    } else {
      // Set default cron expressions for predefined types
      const cronExpressions = {
        daily: "0 8 * * *",
        weekly: "0 8 * * 1",
        monthly: "0 8 1 * *",
      };
      data.cron_expression = cronExpressions[reportType as keyof typeof cronExpressions];
    }

    if (editingSchedule) {
      updateMutation.mutate({ companyId: selectedCompany, scheduleId: editingSchedule.id, data });
    } else {
      createMutation.mutate({ companyId: selectedCompany, data });
    }
  };

  const [reportType, setReportType] = useState("daily");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedules</h1>
          <p className="text-muted-foreground">
            Configure automated report schedules
          </p>
        </div>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditingSchedule(null);
            setReportType("daily");
          }
        }}>
          <DialogTrigger asChild>
            <Button disabled={!selectedCompany}>
              <Plus className="mr-2 h-4 w-4" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingSchedule ? "Edit Schedule" : "Add New Schedule"}
                </DialogTitle>
                <DialogDescription>
                  Configure automated report generation
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Schedule Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingSchedule?.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingSchedule?.description}
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="report_type">Report Type</Label>
                  <Select 
                    name="report_type" 
                    defaultValue={editingSchedule?.report_type || "daily"}
                    onValueChange={setReportType}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {reportType === "custom" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="cron_expression">
                        Cron Expression
                        <span className="text-xs text-muted-foreground ml-2">
                          (minute hour day month day_of_week)
                        </span>
                      </Label>
                      <Input
                        id="cron_expression"
                        name="cron_expression"
                        placeholder="0 8 * * *"
                        defaultValue={editingSchedule?.cron_expression}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date_start">Start Date (Optional)</Label>
                        <Input
                          id="date_start"
                          name="date_start"
                          type="date"
                          defaultValue={editingSchedule?.date_start}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date_end">End Date (Optional)</Label>
                        <Input
                          id="date_end"
                          name="date_end"
                          type="date"
                          defaultValue={editingSchedule?.date_end}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="recipients">
                    Email Recipients
                    <span className="text-xs text-muted-foreground ml-2">
                      (comma-separated, leave empty to use company users)
                    </span>
                  </Label>
                  <Input
                    id="recipients"
                    name="recipients"
                    type="email"
                    multiple
                    placeholder="email1@example.com, email2@example.com"
                    defaultValue={editingSchedule?.recipients}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active">Active</Label>
                  <Switch
                    id="is_active"
                    name="is_active"
                    defaultChecked={editingSchedule?.is_active ?? true}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingSchedule ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Select Company</CardTitle>
          <CardDescription>Choose a company to view and manage its schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCompany?.toString()} onValueChange={(v) => setSelectedCompany(Number(v))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companies?.map((company) => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedCompany && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>
              Schedules for {companies?.find(c => c.id === selectedCompany)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading schedules...</div>
            ) : schedules && schedules.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cron</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Runs</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.name}</TableCell>
                      <TableCell className="capitalize">{schedule.report_type}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {schedule.cron_expression || "-"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={schedule.is_active ? "Active" : "Inactive"} />
                      </TableCell>
                      <TableCell>
                        {schedule.last_run
                          ? new Date(schedule.last_run).toLocaleString()
                          : "Never"}
                      </TableCell>
                      <TableCell>{schedule.run_count}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm("Trigger this schedule now?")) {
                                triggerMutation.mutate({ 
                                  companyId: selectedCompany, 
                                  scheduleId: schedule.id 
                                });
                              }
                            }}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingSchedule(schedule);
                              setReportType(schedule.report_type);
                              setOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this schedule?")) {
                                deleteMutation.mutate({ 
                                  companyId: selectedCompany, 
                                  scheduleId: schedule.id 
                                });
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No schedules yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create automated report schedules for this company
                </p>
                <Button onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Schedules;
