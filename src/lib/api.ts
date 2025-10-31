const API_BASE_URL = "http://127.0.0.1:8000";

export interface Company {
  id: number;
  name: string;
  api_key: string;
  api_url: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyUser {
  id: number;
  company_id: number;
  name: string;
  email: string;
  role: string;
  receive_reports: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReportSchedule {
  id: number;
  company_id: number;
  name: string;
  description?: string;
  report_type: string;
  cron_expression?: string;
  date_start?: string;
  date_end?: string;
  recipients?: string;
  is_active: boolean;
  last_run?: string;
  run_count: number;
  created_at: string;
  updated_at: string;
}

export interface TicketRequest {
  id: number;
  company_id: number;
  date_start: string;
  date_end?: string;
  email_to?: string;
  status: string;
  total_tickets?: number;
  file_name?: string;
  error_message?: string;
  processing_time_seconds?: number;
  created_at: string;
  completed_at?: string;
}

export interface HealthStatus {
  status: string;
  version: string;
}

// API Functions
export const api = {
  // Health
  getHealth: async (): Promise<HealthStatus> => {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error("Failed to fetch health");
    return res.json();
  },

  // Companies
  getCompanies: async (active = true): Promise<Company[]> => {
    const res = await fetch(`${API_BASE_URL}/companies?active=${active}`);
    if (!res.ok) throw new Error("Failed to fetch companies");
    return res.json();
  },

  getCompany: async (id: number): Promise<Company> => {
    const res = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!res.ok) throw new Error("Failed to fetch company");
    return res.json();
  },

  createCompany: async (data: Omit<Company, "id" | "created_at" | "updated_at" | "is_active">): Promise<Company> => {
    const res = await fetch(`${API_BASE_URL}/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to create company");
    }
    return res.json();
  },

  updateCompany: async (id: number, data: Partial<Company>): Promise<Company> => {
    const res = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update company");
    return res.json();
  },

  deleteCompany: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete company");
  },

  // Users
  getCompanyUsers: async (companyId: number): Promise<CompanyUser[]> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  createUser: async (companyId: number, data: Omit<CompanyUser, "id" | "company_id" | "created_at" | "updated_at" | "is_active">): Promise<CompanyUser> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to create user");
    }
    return res.json();
  },

  updateUser: async (companyId: number, userId: number, data: Partial<CompanyUser>): Promise<CompanyUser> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  deleteUser: async (companyId: number, userId: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/users/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete user");
  },

  // Schedules
  getSchedules: async (companyId: number): Promise<ReportSchedule[]> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/schedules`);
    if (!res.ok) throw new Error("Failed to fetch schedules");
    return res.json();
  },

  createSchedule: async (companyId: number, data: Omit<ReportSchedule, "id" | "company_id" | "created_at" | "updated_at" | "last_run" | "run_count">): Promise<ReportSchedule> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/schedules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to create schedule");
    }
    return res.json();
  },

  updateSchedule: async (companyId: number, scheduleId: number, data: Partial<ReportSchedule>): Promise<ReportSchedule> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/schedules/${scheduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update schedule");
    return res.json();
  },

  deleteSchedule: async (companyId: number, scheduleId: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/schedules/${scheduleId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete schedule");
  },

  triggerSchedule: async (companyId: number, scheduleId: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/companies/${companyId}/schedules/${scheduleId}/run`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to trigger schedule");
  },

  // Tickets
  fetchTickets: async (data: {
    company_id: number;
    date_start: string;
    date_end?: string;
    email_to?: string;
  }): Promise<TicketRequest> => {
    const res = await fetch(`${API_BASE_URL}/fetch-tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to fetch tickets");
    }
    return res.json();
  },
};
