import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Ticket, TicketStatus, Note, TicketFormData, Theme } from '../types';
import { saveTickets, loadTickets, saveTheme, loadTheme, saveAuth, loadAuth, clearAuth } from '../utils/storage';

// State
interface AppState {
  tickets: Ticket[];
  theme: Theme;
  isAuthenticated: boolean;
  username: string;
}

// Actions
type Action =
  | { type: 'LOAD_TICKETS'; payload: Ticket[] }
  | { type: 'ADD_TICKET'; payload: TicketFormData }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: TicketStatus } }
  | { type: 'ADD_NOTE'; payload: { ticketId: string; content: string } }
  | { type: 'DELETE_TICKET'; payload: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_AUTH'; payload: { isAuthenticated: boolean; username: string } };

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOAD_TICKETS':
      return { ...state, tickets: action.payload };

    case 'ADD_TICKET': {
      const newTicket: Ticket = {
        id: uuidv4(),
        ...action.payload,
        status: 'Open',
        createdAt: new Date().toISOString(),
        notes: [],
      };
      const updatedTickets = [...state.tickets, newTicket];
      saveTickets(updatedTickets);
      return { ...state, tickets: updatedTickets };
    }

    case 'UPDATE_STATUS': {
      const updatedTickets = state.tickets.map((ticket) =>
        ticket.id === action.payload.id
          ? { ...ticket, status: action.payload.status }
          : ticket
      );
      saveTickets(updatedTickets);
      return { ...state, tickets: updatedTickets };
    }

    case 'ADD_NOTE': {
      const newNote: Note = {
        id: uuidv4(),
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      };
      const updatedTickets = state.tickets.map((ticket) =>
        ticket.id === action.payload.ticketId
          ? { ...ticket, notes: [...ticket.notes, newNote] }
          : ticket
      );
      saveTickets(updatedTickets);
      return { ...state, tickets: updatedTickets };
    }

    case 'DELETE_TICKET': {
      const updatedTickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
      saveTickets(updatedTickets);
      return { ...state, tickets: updatedTickets };
    }

    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      saveTheme(newTheme);
      return { ...state, theme: newTheme };
    }

    case 'SET_THEME': {
      saveTheme(action.payload);
      return { ...state, theme: action.payload };
    }

    case 'LOGIN': {
      saveAuth({ isAuthenticated: true, username: action.payload });
      return { ...state, isAuthenticated: true, username: action.payload };
    }

    case 'LOGOUT': {
      clearAuth();
      return { ...state, isAuthenticated: false, username: '' };
    }

    case 'LOAD_AUTH': {
      return { ...state, isAuthenticated: action.payload.isAuthenticated, username: action.payload.username };
    }

    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addTicket: (data: TicketFormData) => void;
  updateStatus: (id: string, status: TicketStatus) => void;
  addNote: (ticketId: string, content: string) => void;
  deleteTicket: (id: string) => void;
  toggleTheme: () => void;
  getTicketById: (id: string) => Ticket | undefined;
  login: (username: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    tickets: [],
    theme: 'light',
    isAuthenticated: false,
    username: '',
  });

  // Load initial data
  useEffect(() => {
    const tickets = loadTickets();
    const theme = loadTheme();
    const auth = loadAuth();
    dispatch({ type: 'LOAD_TICKETS', payload: tickets });
    dispatch({ type: 'SET_THEME', payload: theme });
    dispatch({ type: 'LOAD_AUTH', payload: auth });
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Helper functions
  const addTicket = (data: TicketFormData) => {
    dispatch({ type: 'ADD_TICKET', payload: data });
  };

  const updateStatus = (id: string, status: TicketStatus) => {
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
  };

  const addNote = (ticketId: string, content: string) => {
    dispatch({ type: 'ADD_NOTE', payload: { ticketId, content } });
  };

  const deleteTicket = (id: string) => {
    dispatch({ type: 'DELETE_TICKET', payload: id });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const getTicketById = (id: string) => {
    return state.tickets.find((ticket) => ticket.id === id);
  };

  const login = (username: string) => {
    dispatch({ type: 'LOGIN', payload: username });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addTicket,
        updateStatus,
        addNote,
        deleteTicket,
        toggleTheme,
        getTicketById,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
