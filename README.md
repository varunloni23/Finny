# FinAI - AI-Powered Personal Finance Manager

FinAI is a comprehensive personal finance management application with AI-powered insights and real-time market data. Built with a modern tech stack, it provides users with tools to track expenses, manage investments, optimize credit scores, and make informed financial decisions.

## Features

- **Smart Expense Tracking**: AI-powered expense categorization and insights
- **Investment Management**: Real-time market data and AI investment recommendations
- **Credit Score Optimization**: AI-driven credit improvement strategies
- **Goal Planning**: Dynamic financial goal setting with progress tracking
- **Loan & Insurance Advisor**: AI-powered comparison and recommendations
- **Multi-Currency Support**: Global coverage with region-specific compliance

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React 19** for UI components
- **Tailwind CSS** for styling
- **ShadCN UI** components
- **Recharts** for data visualization
- **Dark Crypto Theme**

### Backend
- **NestJS** for scalable, modular architecture
- **Node.js** runtime
- **PostgreSQL** for primary data storage
- **Redis** for caching real-time market data
- **TypeORM** for database ORM

### APIs & Services
- **OpenRouter** for AI financial insights
- **Alpaca** for stock market data
- **Alpha Vantage** for financial data
- **CoinGecko** for cryptocurrency data
- **Upstash Redis** for caching

## Project Structure

```
FINAI/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # Utility functions
│   └── public/         # Static assets
└── backend/            # NestJS backend API
    ├── src/
    │   ├── user/       # User management
    │   ├── expense/    # Expense tracking
    │   ├── investment/ # Investment management
    │   ├── market-data/# Market data services
    │   ├── ai-insights/# AI-powered insights
    │   ├── dashboard/  # Dashboard aggregation
    │   ├── database/   # Database configuration
    │   ├── redis/      # Redis caching
    │   └── config/     # Configuration management
    └── test/           # Unit and integration tests
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Redis instance (Upstash recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd FINAI
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup:**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Configuration:**
   Copy the `.env.example` files in both frontend and backend directories to `.env` and configure with your API keys and database credentials.

### Running the Application

1. **Start the Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application:**
   Open your browser to `http://localhost:3000`

## API Endpoints

### User Management
- `POST /user` - Create a new user
- `GET /user/:id` - Get user details
- `PUT /user/:id` - Update user details
- `DELETE /user/:id` - Delete a user

### Expense Tracking
- `POST /expense` - Add a new expense
- `GET /expense` - Get all expenses
- `GET /expense/:id` - Get a specific expense
- `GET /expense/user/:userId` - Get expenses for a user
- `PUT /expense/:id` - Update an expense
- `DELETE /expense/:id` - Delete an expense

### Investment Management
- `POST /investment` - Add a new investment
- `GET /investment` - Get all investments
- `GET /investment/:id` - Get a specific investment
- `GET /investment/user/:userId` - Get investments for a user
- `PUT /investment/:id` - Update an investment
- `DELETE /investment/:id` - Delete an investment

### Dashboard
- `GET /dashboard/:userId` - Get comprehensive dashboard data for a user

## Development

### Frontend Components
The frontend uses a component-based architecture with:
- Reusable UI components in `src/components`
- Page components in `src/app/[page-name]`
- Utility functions in `src/lib`

### Backend Modules
The backend follows NestJS modular architecture:
- Each feature has its own module (user, expense, investment, etc.)
- Services handle business logic
- Controllers manage API endpoints
- Entities define database schemas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [OpenRouter](https://openrouter.ai/)
- [Alpaca](https://alpaca.markets/)
- [CoinGecko](https://coingecko.com/)