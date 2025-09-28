# FinAI Developer Guide

## Project Overview

FinAI is an AI-powered personal finance manager with a focus on cryptocurrency and investment tracking. The application provides users with tools to manage expenses, track investments, optimize credit scores, and receive AI-driven financial insights.

## Architecture

The application follows a modern microservices architecture:

- **Frontend**: Next.js 15 with React 19
- **Backend**: NestJS with Node.js
- **Database**: PostgreSQL with TypeORM
- **Caching**: Redis (Upstash)
- **AI Services**: OpenRouter
- **Market Data**: Alpaca, Alpha Vantage, CoinGecko

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Redis
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FINAI
   ```

2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install
   cd ..

   # Backend
   cd backend
   npm install
   cd ..
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` in both frontend and backend directories and configure with your API keys.

### Development

#### Running the Application

1. Start the backend:
   ```bash
   cd backend
   npm run start:dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

#### Running Tests

- Frontend tests:
  ```bash
  cd frontend
  npm run test
  ```

- Backend tests:
  ```bash
  cd backend
  npm run test
  ```

### Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE finance_manager;
   ```

2. Run the initialization script:
   ```bash
   psql -U postgres -d finance_manager -f init-database.sql
   ```

## Code Structure

### Frontend

```
frontend/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # ShadCN UI components
│   │   └── ...           # Custom components
│   ├── lib/              # Utility functions
│   └── ...
├── public/               # Static assets
└── ...
```

### Backend

```
backend/
├── src/
│   ├── user/             # User management module
│   ├── expense/          # Expense tracking module
│   ├── investment/       # Investment management module
│   ├── market-data/      # Market data services
│   ├── ai-insights/      # AI-powered insights
│   ├── dashboard/        # Dashboard aggregation
│   ├── database/         # Database configuration
│   ├── redis/            # Redis caching
│   ├── config/           # Configuration management
│   └── ...
├── test/                 # Unit and integration tests
└── ...
```

## API Design

The backend follows RESTful API principles with the following conventions:

- **Endpoints**: Use nouns, not verbs (e.g., `/users` not `/getUsers`)
- **HTTP Methods**: Use appropriate methods (GET, POST, PUT, DELETE)
- **Status Codes**: Follow standard HTTP status codes
- **Error Handling**: Return consistent error responses
- **Pagination**: Implement pagination for large datasets

## Component Development

### Creating New Components

1. Create a new component file in `frontend/src/components/`
2. Use TypeScript for type safety
3. Follow the existing component structure
4. Export the component properly
5. Add tests when applicable

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Use ShadCN UI components when possible
- Maintain consistency with the dark crypto theme

## Testing

### Frontend Testing

- Use Jest and React Testing Library
- Write unit tests for components
- Test user interactions
- Ensure accessibility

### Backend Testing

- Use Jest for unit tests
- Test service logic
- Mock external dependencies
- Write integration tests for APIs

## Deployment

### Docker Deployment

Use the provided `docker-compose.yml` file:

```bash
docker-compose up -d
```

### Manual Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

3. Deploy to your preferred hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write clear, concise comments
- Keep functions small and focused
- Use meaningful variable names

### Pull Request Process

1. Ensure tests pass
2. Update documentation if needed
3. Follow the PR template
4. Request review from maintainers

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check database credentials in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **API Key Issues**
   - Verify API keys in `.env`
   - Check API key permissions
   - Ensure API services are accessible

3. **Dependency Issues**
   - Run `npm install` in both frontend and backend
   - Check Node.js version compatibility
   - Clear npm cache if needed

### Getting Help

- Check existing issues on GitHub
- Review documentation
- Contact maintainers