# Sure Loan Optimizer - Complete Setup Verification

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Sure Loan Optimizer Setup Check   " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
$pythonCheck = Get-Command python -ErrorAction SilentlyContinue
if ($pythonCheck) {
    $pythonVersion = python --version 2>&1
    Write-Host "  [OK] Python installed: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Python not found" -ForegroundColor Red
    $allGood = $false
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCheck) {
    $nodeVersion = node --version
    Write-Host "  [OK] Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmCheck = Get-Command npm -ErrorAction SilentlyContinue
if ($npmCheck) {
    $npmVersion = npm --version
    Write-Host "  [OK] npm installed: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] npm not found" -ForegroundColor Red
    $allGood = $false
}

# Check backend venv
Write-Host "Checking backend virtual environment..." -ForegroundColor Yellow
if (Test-Path "backend\venv") {
    Write-Host "  [OK] Virtual environment exists" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Virtual environment not found" -ForegroundColor Red
    $allGood = $false
}

# Check backend .env
Write-Host "Checking backend .env file..." -ForegroundColor Yellow
if (Test-Path "backend\.env") {
    $envContent = Get-Content "backend\.env" -Raw
    if ($envContent -match "GEMINI_API_KEY=\w+") {
        Write-Host "  [OK] .env file configured" -ForegroundColor Green
    } else {
        Write-Host "  [WARNING] .env file exists but GEMINI_API_KEY not set" -ForegroundColor Yellow
        Write-Host "    Get your key from: https://makersuite.google.com/app/apikey" -ForegroundColor Cyan
        $allGood = $false
    }
} else {
    Write-Host "  [ERROR] .env file not found" -ForegroundColor Red
    Write-Host "    Copy .env.example to .env and add your API key" -ForegroundColor Cyan
    $allGood = $false
}

# Check frontend node_modules
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules") {
    Write-Host "  [OK] Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Frontend dependencies not installed" -ForegroundColor Yellow
    Write-Host "    Run: cd frontend; npm install" -ForegroundColor Cyan
}

# Check backend requirements
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\venv\Lib\site-packages\fastapi") {
    Write-Host "  [OK] Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Backend dependencies not fully installed" -ForegroundColor Yellow
    Write-Host "    Activate venv and run: pip install -r requirements.txt" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "[SUCCESS] All checks passed! Ready to start." -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the application:" -ForegroundColor Yellow
    Write-Host "  1. Backend:  .\start-backend.ps1" -ForegroundColor Cyan
    Write-Host "  2. Frontend: .\start-frontend.ps1" -ForegroundColor Cyan
    Write-Host "     (Run in separate terminals)" -ForegroundColor Gray
} else {
    Write-Host "[FAILED] Some checks failed. Fix issues above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Need help? Check QUICKSTART.md" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
