# SWA Document Management System

A comprehensive document management system built with React and Vite for the Saudi Water Authority (SWA). This application provides a modern, responsive interface for managing documents across different departments with advanced features including data visualization, export capabilities, and full CRUD operations.

## Features

### Dashboard & Analytics

- Interactive Charts: Bar charts, pie charts, and line charts using Chart.js
- Real-time Statistics: Document counts across all departments
- Department Overview: Clickable department summaries with navigation
- Export Functionality: Export dashboard data to Excel format

### Department Management

- Multi-Department Support: Law Department, PMO, Cyber Security, and more
- Document Statistics: Track under process, late, and closed documents
- Department Icons: Visual identification for each department
- Responsive Design: Optimized for desktop, tablet, and mobile devices

### Document Operations

- Full CRUD Operations: Create, Read, Update, Delete documents
- Advanced Search: Search by document number, subject, or description
- Smart Filtering: Filter by document status (All, Open, Late, Closed)
- Sorting Options: Sort by document number, subject, or dates
- Pagination: Display 10 documents per page with navigation

### Modern UI/UX

- Responsive Design: Mobile-first approach with Tailwind CSS
- RTL Support: Full Arabic language support with right-to-left layout
- Interactive Modals: Modern modal dialogs for document operations
- Toast Notifications: User feedback for all operations
- Loading States: Smooth loading animations with SWA branding

### Mobile Responsiveness

- Hamburger Menu: Collapsible sidebar for mobile devices
- Touch Optimized: Large touch targets and gestures
- Adaptive Layout: Content adjusts to screen size
- Swipe Navigation: Smooth transitions between views

### Print & Export

- PDF Generation: Print-friendly document layouts
- Excel Export: Export department data and dashboard summaries
- Professional Formatting: Clean, printable document designs

## Technology Stack

- Frontend Framework: React 18 with Hooks
- Build Tool: Vite
- Styling: Tailwind CSS
- Charts: Chart.js with react-chartjs-2
- Icons: Lucide React
- Data Export: XLSX library
- Routing: React Router DOM
- State Management: React useState and useMemo

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with sidebar
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── Pagination.jsx      # Pagination component
│   ├── Loading.jsx         # Loading screen
├── pages/
│   ├── Dashboard.jsx       # Main dashboard
│   ├── DepartmentPage.jsx  # Department-specific page
│   └── ProfilePage.jsx     # User profile page
├── data/
│   ├── law.js             # Law department data
│   ├── pmo.js             # PMO department data
│   └── cyber.js           # Cyber security department data
└── assets/
    └── swa_logo.jpg       # SWA logo
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/HamadAloqayli/swa-assignment
   cd swa-assignment
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server

   ```bash
   npm run dev
   ```

4. Open your browser
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Dashboard Features

### Statistics Cards

- Total Documents (Purple): Overall document count
- In Progress (Blue): Active documents being processed
- Late Documents (Red): Documents past due date
- Closed Documents (Green): Completed documents

### Interactive Charts

- Bar Chart: Document distribution by department
- Pie Chart: Document status breakdown
- Line Chart: Document trends over time

## Department Management

### Supported Departments

- Law Department: Legal document management
- PMO (Project Management Office): Project documentation
- Cyber Security: Security-related documents
- Extensible: Easy to add new departments

### Document Operations

- Add: Create new documents with auto-generated IDs
- View: Read-only document details
- Edit: Modify document information
- Delete: Remove documents with confirmation
- Print: Generate PDF reports

## UI Components

### Modals

- ViewModal: Display document details
- EditModal: Edit document information
- DeleteModal: Confirm document deletion

### Responsive Design

- Desktop: Full sidebar with all features
- Tablet: Collapsible sidebar
- Mobile: Hamburger menu with slide-out sidebar

## Mobile Features

- Touch Navigation: Swipe and tap gestures
- Responsive Tables: Horizontal scrolling for data tables
- Mobile Menus: Collapsible navigation
- Touch Targets: Optimized button sizes

## Export & Print

### Excel Export

- Department Data: Export filtered document lists
- Dashboard Summary: Export overall statistics
- Formatted Output: Professional Excel formatting

### Print Functionality

- Document Reports: Print individual documents
- Professional Layout: Clean, printable design
- Auto-close: Print windows close automatically

## Internationalization

- Arabic Language: Full RTL support
- Date Formats: Arabic date formatting
- Number Formats: Arabic number display
- Cultural Adaptation: Saudi-specific formatting

## Configuration

### Environment Setup

- Development: Hot reload with Vite
- Production: Optimized build with minification
- ESLint: Code quality enforcement

### Customization

- Colors: Easily customizable color scheme
- Departments: Add new departments in data files
- Charts: Modify chart types and configurations

## Performance

- Fast Loading: Vite for rapid development
- Optimized Builds: Production-ready bundles
- Lazy Loading: Components loaded on demand
- Responsive Images: Optimized asset loading

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Host

The built files in `dist/` can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for the Saudi Water Authority (SWA) as an assignment project.

## Support

For support or questions about this project, please contact the development team.

---

**Saudi Water Authority (SWA) - Document Management System**  
_Streamlining document workflows with modern technology_
