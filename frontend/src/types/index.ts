// Ticket Types
export type TicketCategory = 'Bug' | 'Request' | 'Support';
export type TicketPriority = 'Low' | 'Medium' | 'High';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  reporterName: string;
  createdAt: string;
  notes: Note[];
}

// Filter and Sort Types
export type SortOrder = 'newest' | 'oldest';

export interface FilterState {
  search: string;
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  sortOrder: SortOrder;
}

// Form Types
export interface TicketFormData {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  reporterName: string;
}

export interface FormErrors {
  title?: string;
  description?: string;
  reporterName?: string;
}

// Theme Type
export type Theme = 'light' | 'dark';
