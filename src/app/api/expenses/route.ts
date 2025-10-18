import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses, type NewExpense } from '@/db/schema';
import { desc, sum } from 'drizzle-orm';

// GET - Fetch all expenses
export async function GET() {
  try {
    const allExpenses = await db.select().from(expenses).orderBy(desc(expenses.date));
    
    // Calculate total spent
    const totalResult = await db
      .select({ total: sum(expenses.amount) })
      .from(expenses);
    
    const total = totalResult[0]?.total || '0';
    
    return NextResponse.json({
      expenses: allExpenses,
      total: parseFloat(total.toString()),
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

// POST - Create new expense
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, amount, date, description } = body;

    if (!category || !amount || !date) {
      return NextResponse.json(
        { error: 'Category, amount, and date are required' },
        { status: 400 }
      );
    }

    const newExpense: NewExpense = {
      category,
      amount: amount.toString(),
      date: new Date(date),
      description: description || null,
    };

    const [createdExpense] = await db.insert(expenses).values(newExpense).returning();

    return NextResponse.json(createdExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
}