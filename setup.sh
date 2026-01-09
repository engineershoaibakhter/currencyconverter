#!/bin/bash

echo "================================"
echo "Currency Converter - Setup Script"
echo "================================"
echo ""

echo "[1/4] Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error: Backend installation failed!"
    exit 1
fi
echo "✓ Backend dependencies installed"
echo ""

echo "[2/4] Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error: Frontend installation failed!"
    exit 1
fi
echo "✓ Frontend dependencies installed"
echo ""

echo "[3/4] Setup Complete!"
echo ""
echo "================================"
echo "Next Steps:"
echo "================================"
echo ""
echo "1. Start Backend (in a new terminal):"
echo "   cd backend"
echo "   npm run start:dev"
echo ""
echo "2. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Open browser:"
echo "   http://localhost:4200"
echo ""
echo "================================"
echo "For deployment instructions, see DEPLOYMENT.md"
echo "================================"
echo ""
