import type { Ticket } from '../types';

export const exportToJSON = (tickets: Ticket[]): void => {
  const dataStr = JSON.stringify(tickets, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  downloadBlob(blob, 'tickets.json');
};

export const exportToCSV = (tickets: Ticket[]): void => {
  const headers = ['ID', 'Title', 'Description', 'Category', 'Priority', 'Status', 'Reporter', 'Created At', 'Notes Count'];
  
  const rows = tickets.map(ticket => [
    ticket.id,
    `"${ticket.title.replace(/"/g, '""')}"`,
    `"${ticket.description.replace(/"/g, '""')}"`,
    ticket.category,
    ticket.priority,
    ticket.status,
    `"${ticket.reporterName.replace(/"/g, '""')}"`,
    ticket.createdAt,
    ticket.notes.length.toString()
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, 'tickets.csv');
};

const downloadBlob = (blob: Blob, filename: string): void => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
