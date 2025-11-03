import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw } from "lucide-react";

export default function Settings() {
  const [apiUrl, setApiUrl] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedUrl = localStorage.getItem("api_url") || "http://127.0.0.1:8000";
    const savedToken = localStorage.getItem("api_bearer_token") || "";
    setApiUrl(savedUrl);
    setBearerToken(savedToken);
  }, []);

  const handleSave = () => {
    localStorage.setItem("api_url", apiUrl);
    localStorage.setItem("api_bearer_token", bearerToken);
    
    toast({
      title: "Settings saved",
      description: "API configuration has been updated. Refresh the page for changes to take effect.",
    });
  };

  const handleReset = () => {
    const defaultUrl = "http://127.0.0.1:8000";
    setApiUrl(defaultUrl);
    setBearerToken("");
    localStorage.setItem("api_url", defaultUrl);
    localStorage.setItem("api_bearer_token", "");
    
    toast({
      title: "Settings reset",
      description: "API configuration has been reset to defaults.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your API connection settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Set your production API URL and authentication token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-url">API Base URL</Label>
            <Input
              id="api-url"
              type="url"
              placeholder="https://api.example.com"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              The base URL for your API endpoints (default: http://127.0.0.1:8000)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bearer-token">Bearer Token</Label>
            <Input
              id="bearer-token"
              type="password"
              placeholder="Enter your bearer token (optional)"
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Authentication token for API requests (leave empty if not required)
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
