import type { Ticket } from '../types';

const TICKETS_KEY = 'ucs_service_desk_tickets';
const THEME_KEY = 'ucs_service_desk_theme';
const AUTH_KEY = 'ucs_service_desk_auth';

// Auth Storage
export interface AuthData {
  isAuthenticated: boolean;
  username: string;
}

export const saveAuth = (auth: AuthData): void => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error('Error saving auth to localStorage:', error);
  }
};

export const loadAuth = (): AuthData => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : { isAuthenticated: false, username: '' };
  } catch (error) {
    console.error('Error loading auth from localStorage:', error);
    return { isAuthenticated: false, username: '' };
  }
};

export const clearAuth = (): void => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Error clearing auth from localStorage:', error);
  }
};

// Ticket Storage
export const saveTickets = (tickets: Ticket[]): void => {
  try {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error('Error saving tickets to localStorage:', error);
  }
};

export const loadTickets = (): Ticket[] => {
  try {
    const data = localStorage.getItem(TICKETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tickets from localStorage:', error);
    return [];
  }
};

// Theme Storage
export const saveTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

export const loadTheme = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return theme === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'light';
  }
};
