# Start Frontend Development Server
Write-Host "Starting Sure Loan Optimizer Frontend..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "$PSScriptRoot\frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies first time..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host ""
Write-Host "Starting React development server..." -ForegroundColor Green
Write-Host "Application will open at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Make sure backend is running at: http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start
