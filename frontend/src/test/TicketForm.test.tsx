import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import TicketForm from '../components/tickets/TicketForm';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TicketForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<TicketForm />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reporter name/i)).toBeInTheDocument();
  });

  it('should render create ticket button', () => {
    render(<TicketForm />);
    
    expect(screen.getByRole('button', { name: /create ticket/i })).toBeInTheDocument();
  });

  it('should render cancel button', () => {
    render(<TicketForm />);
    
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('should show validation errors on submit with empty form', async () => {
    const user = userEvent.setup();
    render(<TicketForm />);
    
    const submitButton = screen.getByRole('button', { name: /create ticket/i });
    await user.click(submitButton);
    
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/reporter name is required/i)).toBeInTheDocument();
  });

  it('should update form fields on user input', async () => {
    const user = userEvent.setup();
    render(<TicketForm />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const reporterInput = screen.getByLabelText(/reporter name/i);
    
    await user.type(titleInput, 'Test Ticket Title');
    await user.type(descriptionInput, 'This is a test description that is long enough');
    await user.type(reporterInput, 'Amal Perera');
    
    expect(titleInput).toHaveValue('Test Ticket Title');
    expect(descriptionInput).toHaveValue('This is a test description that is long enough');
    expect(reporterInput).toHaveValue('Amal Perera');
  });

  it('should have default category and priority values', () => {
    render(<TicketForm />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    
    expect(categorySelect).toHaveValue('Bug');
    expect(prioritySelect).toHaveValue('Medium');
  });

  it('should allow changing category', async () => {
    const user = userEvent.setup();
    render(<TicketForm />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, 'Request');
    
    expect(categorySelect).toHaveValue('Request');
  });

  it('should allow changing priority', async () => {
    const user = userEvent.setup();
    render(<TicketForm />);
    
    const prioritySelect = screen.getByLabelText(/priority/i);
    await user.selectOptions(prioritySelect, 'High');
    
    expect(prioritySelect).toHaveValue('High');
  });

  it('should show character count for description', () => {
    render(<TicketForm />);
    
    expect(screen.getByText(/0\/20 characters minimum/i)).toBeInTheDocument();
  });

  it('should update character count as user types', async () => {
    const user = userEvent.setup();
    render(<TicketForm />);
    
    const descriptionInput = screen.getByLabelText(/description/i);
    await user.type(descriptionInput, 'Hello');
    
    expect(screen.getByText(/5\/20 characters minimum/i)).toBeInTheDocument();
  });
});
