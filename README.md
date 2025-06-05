# MNA Law Firm Management System

A comprehensive law firm management system built with Django and React.

## Features

- User Authentication and Authorization
- Case Management
- Document Management
- Appointment Scheduling
- Billing and Invoicing
- Leave Management
- Reminder System
- Client Management

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Frontend
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- React Router
- Formik & Yup

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- PostgreSQL

## Installation

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Development

- Backend API runs on: http://localhost:8000
- Frontend development server runs on: http://localhost:3000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 