import { describe, it, expect } from 'vitest';
import { render, screen } from './test-utils';
import TicketCard from '../components/tickets/TicketCard';
import type { Ticket } from '../types';

const mockTicket: Ticket = {
  id: 'test-id-12345678',
  title: 'Test Ticket Title',
  description: 'This is a test description for the ticket',
  category: 'Bug',
  priority: 'High',
  status: 'Open',
  reporterName: 'John Doe',
  createdAt: '2024-01-15T10:30:00Z',
  notes: [],
};

describe('TicketCard', () => {
  it('should render ticket title', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('Test Ticket Title')).toBeInTheDocument();
  });

  it('should render ticket ID (truncated)', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('#test-id-')).toBeInTheDocument();
  });

  it('should render ticket status', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('should render ticket priority', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('should render ticket category', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('Bug')).toBeInTheDocument();
  });

  it('should render reporter name', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render ticket description', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('This is a test description for the ticket')).toBeInTheDocument();
  });

  it('should render formatted date', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    // Date should be formatted as "Jan 15, 2024"
    expect(screen.getByText(/jan 15, 2024/i)).toBeInTheDocument();
  });

  it('should be a clickable link to ticket details', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tickets/test-id-12345678');
  });

  it('should not show notes count when there are no notes', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.queryByText(/note/i)).not.toBeInTheDocument();
  });

  it('should show notes count when there are notes', () => {
    const ticketWithNotes: Ticket = {
      ...mockTicket,
      notes: [
        { id: '1', content: 'Note 1', createdAt: '2024-01-15T11:00:00Z' },
        { id: '2', content: 'Note 2', createdAt: '2024-01-15T12:00:00Z' },
      ],
    };
    
    render(<TicketCard ticket={ticketWithNotes} />);
    
    expect(screen.getByText(/2 notes/i)).toBeInTheDocument();
  });

  it('should show singular "note" for single note', () => {
    const ticketWithOneNote: Ticket = {
      ...mockTicket,
      notes: [{ id: '1', content: 'Note 1', createdAt: '2024-01-15T11:00:00Z' }],
    };
    
    render(<TicketCard ticket={ticketWithOneNote} />);
    
    expect(screen.getByText(/1 note$/i)).toBeInTheDocument();
  });

  it('should render different statuses correctly', () => {
    const inProgressTicket: Ticket = { ...mockTicket, status: 'In Progress' };
    const { rerender } = render(<TicketCard ticket={inProgressTicket} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    const resolvedTicket: Ticket = { ...mockTicket, status: 'Resolved' };
    rerender(<TicketCard ticket={resolvedTicket} />);
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });

  it('should render different priorities correctly', () => {
    const lowPriorityTicket: Ticket = { ...mockTicket, priority: 'Low' };
    const { rerender } = render(<TicketCard ticket={lowPriorityTicket} />);
    expect(screen.getByText('Low')).toBeInTheDocument();

    const mediumPriorityTicket: Ticket = { ...mockTicket, priority: 'Medium' };
    rerender(<TicketCard ticket={mediumPriorityTicket} />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });
});
