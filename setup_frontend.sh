#!/bin/bash

echo "🌟 Setting up Frontend with Finny Voice Integration"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Installing LiveKit packages for voice integration..."
npm install @livekit/components-react @livekit/components-core livekit-client

echo "⚙️ Setting up environment configuration..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local 2>/dev/null || echo "# Add your environment variables here" > .env.local
fi

echo ""
echo "✅ Frontend setup completed successfully!"
echo ""
echo "🎯 To start the frontend:"
echo "   npm run dev"
echo ""
echo "🌟 Features added:"
echo "   📞 Finny Voice Widget - Bottom-right corner on all pages"
echo "   🎤 Real-time voice communication with Finny"
echo "   💬 Interactive financial conversations"
echo "   📈 Live market data integration"
echo "   💡 Personalized financial advice"
echo ""
echo "🔧 Next steps:"
echo "   1. Make sure Finny's backend agent is running (cd ../finny && python agent.py)"
echo "   2. Start the frontend (npm run dev)"
echo "   3. Open http://localhost:3000"
echo "   4. Click the voice widget to talk to Finny!"
echo ""
echo "💡 Pro tip: You can now ask Finny questions like:"
echo "   - 'What's the price of Apple stock?'"
echo "   - 'Help me create a budget'"
echo "   - 'Show me Bitcoin's current value'"
echo "   - 'Give me investment advice'"