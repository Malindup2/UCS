import { describe, it, expect } from 'vitest';
import { render, screen } from './test-utils';
import Dashboard from '../components/dashboard/Dashboard';

describe('Dashboard', () => {
  it('should render dashboard heading', () => {
    render(<Dashboard />);
    
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('should render welcome message', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/welcome to ucs mini service desk/i)).toBeInTheDocument();
  });

  it('should render new ticket button', () => {
    render(<Dashboard />);
    
    expect(screen.getByRole('link', { name: /new ticket/i })).toBeInTheDocument();
  });

  it('should render stats cards', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/total tickets/i)).toBeInTheDocument();
    expect(screen.getByText(/^open$/i)).toBeInTheDocument();
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/^resolved$/i)).toBeInTheDocument();
  });

  it('should render ticket distribution section', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/ticket distribution/i)).toBeInTheDocument();
  });

  it('should render recent tickets section', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/recent tickets/i)).toBeInTheDocument();
  });

  it('should show "No tickets yet" when there are no tickets', () => {
    render(<Dashboard />);
    
    expect(screen.getAllByText(/no tickets yet/i).length).toBeGreaterThan(0);
  });

  it('should have link to view all tickets', () => {
    render(<Dashboard />);
    
    expect(screen.getByRole('link', { name: /view all/i })).toBeInTheDocument();
  });

  it('should have link to create first ticket', () => {
    render(<Dashboard />);
    
    expect(screen.getByRole('link', { name: /create your first ticket/i })).toBeInTheDocument();
  });

  it('should display zero counts initially', () => {
    render(<Dashboard />);
    
    // There should be multiple "0" values for each stat
    const zeroElements = screen.getAllByText('0');
    expect(zeroElements.length).toBeGreaterThanOrEqual(4);
  });
});
