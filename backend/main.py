from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import *
from calculations import *
from ai_service import *
from config import get_settings

settings = get_settings()

app = FastAPI(
    title="AI-Powered Loan Optimizer API",
    description="Intelligent loan comparison and optimization platform with AI recommendations",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "AI-Powered Loan Optimizer API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "active"
    }


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "loan-optimizer-api"}


@app.post("/api/calculate-emi", response_model=EMIResponse)
async def calculate_emi_endpoint(loan: LoanInput):
    """
    Calculate EMI for a single loan.
    """
    try:
        result = calculate_emi(loan.principal, loan.interest_rate, loan.tenure_months)
        return EMIResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/compare-loans")
async def compare_loans_endpoint(request: ComparisonRequest):
    """
    Compare multiple loans and return ranked results with AI insights.
    """
    try:
        if len(request.loans) < 2:
            raise HTTPException(status_code=400, detail="At least 2 loans required for comparison")
        
        if len(request.loans) > 5:
            raise HTTPException(status_code=400, detail="Maximum 5 loans can be compared")
        
        # Convert to dict format for calculations
        loans_dict = [loan.dict() for loan in request.loans]
        
        # Calculate comparisons
        results = compare_loans(loans_dict)
        
        # Generate AI insight
        try:
            ai_insight = get_comparative_insight(results)
        except:
            ai_insight = "Compare the options above to find the best fit for your financial situation."
        
        return {
            "comparisons": results,
            "ai_insight": ai_insight,
            "best_loan_id": results[0]['id'],
            "total_compared": len(results)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/calculate-prepayment", response_model=PrepaymentResponse)
async def calculate_prepayment_endpoint(request: PrepaymentRequest):
    """
    Calculate the impact of prepayment on loan.
    """
    try:
        if request.prepayment_month >= request.tenure_months:
            raise HTTPException(
                status_code=400,
                detail="Prepayment month must be before loan tenure ends"
            )
        
        result = calculate_prepayment_impact(
            request.principal,
            request.interest_rate,
            request.tenure_months,
            request.prepayment_amount,
            request.prepayment_month,
            request.reduce_emi
        )
        
        return PrepaymentResponse(**result)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/amortization-schedule")
async def amortization_schedule_endpoint(request: AmortizationScheduleRequest):
    """
    Generate month-by-month payment breakdown.
    """
    try:
        schedule = generate_amortization_schedule(
            request.principal,
            request.interest_rate,
            request.tenure_months
        )
        
        return {
            "schedule": schedule,
            "total_months": len(schedule),
            "total_payment": sum(item['emi'] for item in schedule),
            "total_principal": sum(item['principal_payment'] for item in schedule),
            "total_interest": sum(item['interest_payment'] for item in schedule)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/ai-advisor")
async def ai_advisor_endpoint(request: AIAdvisorRequest):
    """
    Get AI-powered loan recommendation in natural language.
    """
    try:
        recommendation = generate_loan_recommendation(
            request.best_loan.dict(),
            request.user_profile,
            [loan.dict() for loan in request.all_loans]
        )
        
        return {
            "recommendation": recommendation,
            "best_loan": request.best_loan,
            "confidence": "high" if request.best_loan.score > 80 else "medium"
        }
    except Exception as e:
        # Provide fallback recommendation
        best = request.best_loan
        return {
            "recommendation": f"Based on comprehensive analysis, {best.loan_name} emerges as your best choice with an affordable EMI of ₹{best.emi:,.2f} and optimized total cost. This option balances monthly affordability with long-term savings effectively.",
            "best_loan": best,
            "confidence": "medium"
        }


@app.post("/api/ai-explain-term")
async def ai_explain_term_endpoint(request: AIExplainRequest):
    """
    Get simple explanation of financial term.
    """
    try:
        explanation = explain_financial_term(request.term, request.context)
        
        return {
            "term": request.term,
            "explanation": explanation
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/ai-strategy")
async def ai_strategy_endpoint(request: AIStrategyRequest):
    """
    Generate personalized savings strategy.
    """
    try:
        strategy = generate_savings_strategy(
            request.current_loan.dict(),
            request.available_savings,
            request.financial_goal,
            request.timeline_months
        )
        
        return {
            "strategy": strategy,
            "available_savings": request.available_savings,
            "timeline_months": request.timeline_months,
            "goal": request.financial_goal
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/ai-chat")
async def ai_chat_endpoint(request: AIChatRequest):
    """
    Chatbot conversation endpoint.
    """
    try:
        response = chat_with_advisor(
            request.user_question,
            request.loan_context,
            request.conversation_history
        )
        
        return {
            "question": request.user_question,
            "answer": response,
            "timestamp": "now"
        }
    except Exception as e:
        return {
            "question": request.user_question,
            "answer": "I'm here to help! Could you rephrase your question or provide more details about your loan situation?",
            "timestamp": "now"
        }


@app.get("/api/sample-loans")
async def get_sample_loans():
    """
    Get sample loan data for testing.
    """
    return {
        "scenarios": [
            {
                "name": "Home Loan Refinancing",
                "current": {
                    "id": "current",
                    "name": "Current Home Loan",
                    "principal": 5000000,
                    "interest_rate": 11.5,
                    "tenure_months": 240,
                    "processing_fee": 0
                },
                "options": [
                    {
                        "id": "option_a",
                        "name": "Bank A - Premium Rate",
                        "principal": 5000000,
                        "interest_rate": 9.5,
                        "tenure_months": 240,
                        "processing_fee": 25000
                    },
                    {
                        "id": "option_b",
                        "name": "Bank B - Express Loan",
                        "principal": 5000000,
                        "interest_rate": 9.0,
                        "tenure_months": 180,
                        "processing_fee": 75000
                    }
                ]
            },
            {
                "name": "Personal Loan Optimization",
                "current": {
                    "id": "current",
                    "name": "Current Personal Loan",
                    "principal": 500000,
                    "interest_rate": 16.0,
                    "tenure_months": 36,
                    "processing_fee": 0
                },
                "options": [
                    {
                        "id": "option_a",
                        "name": "Bank C - Quick Cash",
                        "principal": 500000,
                        "interest_rate": 13.0,
                        "tenure_months": 36,
                        "processing_fee": 5000
                    },
                    {
                        "id": "option_b",
                        "name": "Bank D - Fast Track",
                        "principal": 500000,
                        "interest_rate": 14.0,
                        "tenure_months": 24,
                        "processing_fee": 2000
                    }
                ]
            },
            {
                "name": "Car Loan Comparison",
                "current": {
                    "id": "current",
                    "name": "Current Auto Loan",
                    "principal": 1000000,
                    "interest_rate": 10.0,
                    "tenure_months": 60,
                    "processing_fee": 0
                },
                "options": [
                    {
                        "id": "option_a",
                        "name": "Bank E - Auto Finance",
                        "principal": 1000000,
                        "interest_rate": 8.5,
                        "tenure_months": 60,
                        "processing_fee": 15000
                    },
                    {
                        "id": "option_b",
                        "name": "Bank F - Quick Auto",
                        "principal": 1000000,
                        "interest_rate": 9.0,
                        "tenure_months": 48,
                        "processing_fee": 10000
                    }
                ]
            }
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.port)
