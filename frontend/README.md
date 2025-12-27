# UCS Mini Service Desk

A modern support ticket management system built with React, TypeScript, and Tailwind CSS. This application allows users to create, view, manage, and track support tickets with a clean and responsive user interface.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)

##  Live Demo

[View Live Application](https://your-deployment-url.vercel.app)

##  Features

### Core Features
- **Ticket Creation** - Create tickets with title, description, category, priority, and reporter name
- **Ticket List** - View all tickets in a responsive card layout with key information
- **Ticket Details** - View complete ticket information with status updates and internal notes
- **Search & Filters** - Search by title/description, filter by status/priority, sort by date
- **Dashboard Summary** - Visual overview with ticket counters and distribution chart

### Bonus Features
- **Mock Authentication** - Simple login system with protected routes
- **Dark Mode** - Toggle between light and dark themes (persisted in localStorage)
- **Export Functionality** - Export tickets as JSON or CSV files
- **Responsive Design** - Fully responsive UI for mobile and desktop
- **Context API** - Global state management using React Context
- **Unit Tests** - 43+ tests using Vitest and React Testing Library

##  Tech Stack

- **Framework:** React 19 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **State Management:** React Context API with useReducer
- **Testing:** Vitest + React Testing Library
- **Persistence:** localStorage

##  Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ucs-service-desk.git
   cd ucs-service-desk/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

##  Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |

##  Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── Login.tsx          # Login screen
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx      # Dashboard with stats
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   └── Layout.tsx         # Main layout wrapper
│   │   └── tickets/
│   │       ├── TicketCard.tsx     # Ticket card component
│   │       ├── TicketDetail.tsx   # Ticket details view
│   │       ├── TicketForm.tsx     # Create ticket form
│   │       └── TicketList.tsx     # Ticket list with filters
│   ├── context/
│   │   └── AppContext.tsx         # Global state management
│   ├── test/
│   │   ├── setup.ts               # Test setup
│   │   ├── test-utils.tsx         # Test utilities
│   │   ├── Dashboard.test.tsx     # Dashboard tests
│   │   ├── TicketCard.test.tsx    # TicketCard tests
│   │   ├── TicketForm.test.tsx    # TicketForm tests
│   │   └── validation.test.ts     # Validation tests
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   ├── export.ts              # Export utilities
│   │   ├── storage.ts             # localStorage utilities
│   │   └── validation.ts          # Form validation
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

##  Authentication

The app uses mock authentication for demonstration:
- Any username and password (min 4 characters) will work
- Use the "Fill Demo Credentials" button for quick login
- Auth state is persisted in localStorage
- Protected routes redirect to login if not authenticated

##  Data Model

### Ticket
```typescript
interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'Bug' | 'Request' | 'Support';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  reporterName: string;
  createdAt: string;
  notes: Note[];
}
```

### Note
```typescript
interface Note {
  id: string;
  content: string;
  createdAt: string;
}
```

##  Dark Mode

- Click the moon/sun icon in the header to toggle
- Theme preference is saved to localStorage
- Seamless transition between themes

##  Export

From the Tickets page, click "Export" to download:
- **JSON** - Complete ticket data in JSON format
- **CSV** - Spreadsheet-compatible format

##  Known Limitations

1. **Mock Authentication** - No real backend authentication; any credentials work
2. **Local Storage Only** - Data is stored in browser localStorage (not synced across devices)
3. **No Real-time Updates** - Single-user experience without real-time sync
4. **No Ticket Assignment** - Tickets cannot be assigned to specific users
5. **No Email Notifications** - No notification system implemented

##  Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!


##  Testing

The project includes 43+ unit tests covering:

- **Validation Tests** - Form validation logic
- **Dashboard Tests** - Dashboard component rendering
- **TicketCard Tests** - Ticket card display and interactions
- **TicketForm Tests** - Form input and submission

Run tests:
```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

## License

This project is created as part of a recruitment task for UCS.

##  Author
 wwww.github.com/malindup2
