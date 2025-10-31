import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const Reports = () => {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const { toast } = useToast();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => api.getCompanies(true),
  });

  const generateMutation = useMutation({
    mutationFn: api.fetchTickets,
    onSuccess: (data) => {
      toast({ 
        title: "Report request submitted", 
        description: `Request ID: ${data.id}. Processing tickets...` 
      });
      // Reset form
      setDateStart("");
      setDateEnd("");
      setEmailTo("");
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) {
      toast({ 
        title: "Error", 
        description: "Please select a company", 
        variant: "destructive" 
      });
      return;
    }

    generateMutation.mutate({
      company_id: selectedCompany,
      date_start: dateStart,
      date_end: dateEnd || undefined,
      email_to: emailTo || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate ticket reports for your companies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate Report
            </CardTitle>
            <CardDescription>
              Create a new ticket report for a specific date range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Select 
                  value={selectedCompany?.toString()} 
                  onValueChange={(v) => setSelectedCompany(Number(v))}
                  required
                >
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
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date_start">Start Date</Label>
                <Input
                  id="date_start"
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date_end">
                  End Date
                  <span className="text-xs text-muted-foreground ml-2">(optional)</span>
                </Label>
                <Input
                  id="date_end"
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email_to">
                  Email Recipients
                  <span className="text-xs text-muted-foreground ml-2">
                    (comma-separated, leave empty to use company users)
                  </span>
                </Label>
                <Input
                  id="email_to"
                  type="email"
                  multiple
                  placeholder="email1@example.com, email2@example.com"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={generateMutation.isPending}
              >
                {generateMutation.isPending ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </form>

            {generateMutation.data && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Request Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Request ID:</span>
                    <span className="font-mono">{generateMutation.data.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <StatusBadge status={generateMutation.data.status} />
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{new Date(generateMutation.data.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Report Information</CardTitle>
            <CardDescription>How ticket reports work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Report Generation
              </h4>
              <p className="text-sm text-muted-foreground">
                Reports are generated asynchronously and will be emailed to the specified recipients 
                once processing is complete. The report includes all tickets within the specified date range.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                Report Delivery
              </h4>
              <p className="text-sm text-muted-foreground">
                Reports are delivered as CSV files via email. If no email recipients are specified, 
                the report will be sent to all company users who have the "receive reports" option enabled.
              </p>
            </div>

            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-sm mb-1">Pro Tip</h4>
              <p className="text-xs text-muted-foreground">
                Set up automated schedules for recurring reports instead of manually generating them each time. 
                Visit the Schedules page to configure automated report generation.
              </p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Report Contents</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Ticket ID and details</li>
                <li>• Creation and closure dates</li>
                <li>• Ticket age and status</li>
                <li>• Responsible employees</li>
                <li>• Categories and dispositions</li>
                <li>• Source and routing information</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
