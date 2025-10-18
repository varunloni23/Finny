# Neon Database Integration for Finny

This guide explains how to set up real-time database storage for expenses using Neon PostgreSQL.

## 🚀 Quick Setup

### 1. Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up/Login and create a new project
3. Choose a region close to your users
4. Copy the connection string from the dashboard

### 2. Configure Environment Variables

Update your `.env.local` file with your Neon connection string:

```bash
# Replace with your actual Neon connection string
DATABASE_URL="postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/finny_db?sslmode=require"
```

### 3. Generate and Run Database Migrations

```bash
# Generate migration files from schema
npm run db:generate

# Apply migrations to your database
npm run db:migrate

# Optional: Open Drizzle Studio to view your database
npm run db:studio
```

### 4. Start the Application

```bash
npm run dev
```

## 📊 Features

### Real-time Expense Tracking
- ✅ Add expenses with categories, amounts, dates, and descriptions
- ✅ View all expenses with real-time totals
- ✅ Delete expenses with instant database updates
- ✅ Automatic expense distribution charts based on real data
- ✅ Monthly and total expense calculations

### Database Schema
- **expenses** table with UUID primary keys
- **users** table for future user management
- Automatic timestamps for created/updated records
- Decimal precision for accurate financial calculations

### API Endpoints
- `GET /api/expenses` - Fetch all expenses with totals
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/[id]` - Get specific expense
- `PUT /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense

## 🛠 Development

### Database Management
```bash
# Generate new migrations after schema changes
npm run db:generate

# Apply migrations
npm run db:migrate

# View database in Drizzle Studio
npm run db:studio
```

### Error Handling
The application includes comprehensive error handling:
- Database connection errors show helpful messages
- Failed operations provide user feedback
- Fallback states when database is unavailable

### Data Validation
- Required fields validation on both frontend and backend
- Proper decimal handling for financial amounts
- Date validation and formatting

## 🔧 Troubleshooting

### Database Connection Issues
1. Verify your `DATABASE_URL` in `.env.local`
2. Check that your Neon database is active
3. Ensure your IP is allowed (Neon allows all IPs by default)

### Migration Issues
1. Delete the `drizzle` folder and regenerate migrations
2. Check that your schema.ts file is correct
3. Verify database permissions

### API Errors
- Check browser developer tools for detailed error messages
- Verify API endpoints are working in Network tab
- Check server logs for backend errors

## 📈 Next Steps

1. **User Authentication**: Add user accounts to separate expenses by user
2. **Categories Management**: Allow custom expense categories
3. **Budget Tracking**: Add budget limits and alerts
4. **Recurring Expenses**: Support for recurring transactions
5. **Export/Import**: CSV export and import functionality
6. **Analytics**: Advanced spending analysis and insights

## 🔐 Security Notes

- Never commit your `.env.local` file
- Use environment variables for all sensitive data
- Neon connections are SSL-encrypted by default
- Consider adding user authentication for production use

## 📋 Database Schema

```sql
-- Expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date TIMESTAMP NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Users table (for future use)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```