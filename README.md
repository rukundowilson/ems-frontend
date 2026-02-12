# EMS Frontend - Event Management System

A modern healthcare management system frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features

### User Interfaces
- **Homepage** - Landing page with service overview
- **Event List & Details** - Browse and view healthcare events
- **Booking Forms** - Schedule appointments with doctors
- **Patient Dashboard** - View appointments and medical history
- **Admin Dashboard** - Comprehensive management interface

### Admin Features
- **Dashboard Overview** - Statistics, charts, and recent bookings
- **Doctor Management** - Add, edit, delete, and view doctors
- **Patient Management** - Manage patient records
- **Service Management** - Configure healthcare services
- **Booking Management** - Track and manage appointments

### Technical Features
- Client-side routing with Next.js App Router
- Form validation before submission
- RESTful API communication with backend
- JWT-based authentication
- React Query for data fetching and caching
- Responsive design with Tailwind CSS
- Real-time notifications and error handling
- State management for application data

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Authentication**: JWT tokens

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend API running (see ems-backend)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ems-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. Run development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── adminstration/admin/    # Admin dashboard pages
│   │   ├── doctors/            # Doctor management
│   │   ├── patients/           # Patient management
│   │   └── page.tsx            # Admin overview
│   ├── auth/                   # Authentication pages
│   ├── providers/              # React Query provider
│   └── shared/
│       ├── hooks/              # Custom React hooks
│       └── services/           # API services
├── components/                 # Reusable components
└── types/                      # TypeScript types
```

## API Integration

The frontend communicates with the backend API at `http://localhost:4000/api`

### Key Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/signup` - User registration
- `GET /admin/doctors` - Fetch doctors
- `GET /admin/patients` - Fetch patients
- `GET /admin/services` - Fetch services
- `GET /admin/bookings` - Fetch bookings
- `POST /auth/create-doctor` - Create doctor account

## Authentication

### Admin Credentials
- **Email**: admin@gmail.com
- **Password**: admin1234
- **Role**: admin

### Token Storage
JWT tokens are stored in localStorage as `auth_token` and automatically attached to API requests via Axios interceptors.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Implementation

### Admin Dashboard
- Real-time statistics (doctors, patients, bookings, services)
- Patient gender distribution chart
- Recent bookings table with status tracking
- Appointment trends visualization

### Doctor Management
- Create doctors with specialization/service
- Auto-create services if they don't exist
- Edit doctor details (name, email, phone, availability, status)
- Delete doctors
- Search and filter functionality

### Patient Management
- Add patients with role-based filtering
- Edit patient information
- Delete patient records
- Gender and demographic tracking

### Service Integration
- Dropdown selection of existing services
- Custom service creation on-the-fly
- Automatic linking to doctor profiles

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License