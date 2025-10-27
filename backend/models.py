from pydantic import BaseModel, Field
from typing import List, Optional


class LoanInput(BaseModel):
    principal: float = Field(..., gt=0, description="Loan principal amount")
    interest_rate: float = Field(..., gt=0, le=100, description="Annual interest rate in percentage")
    tenure_months: int = Field(..., gt=0, description="Loan tenure in months")
    processing_fee: float = Field(default=0, ge=0, description="Processing fee amount")


class EMIResponse(BaseModel):
    emi: float
    total_payment: float
    total_interest: float
    principal: float
    monthly_rate: float


class LoanOption(BaseModel):
    id: str
    name: str
    principal: float
    interest_rate: float
    tenure_months: int
    processing_fee: float = 0


class LoanComparisonResult(BaseModel):
    loan_id: str
    loan_name: str
    emi: float
    total_interest: float
    total_cost: float
    score: float
    rank: int
    savings_vs_first: float
    badge: Optional[str] = None


class ComparisonRequest(BaseModel):
    loans: List[LoanOption]


class PrepaymentRequest(BaseModel):
    principal: float
    interest_rate: float
    tenure_months: int
    prepayment_amount: float
    prepayment_month: int
    reduce_emi: bool = False


class PrepaymentResponse(BaseModel):
    original_emi: float
    new_emi: float
    original_total_interest: float
    new_total_interest: float
    interest_saved: float
    original_tenure: int
    new_tenure: int
    months_saved: int
    break_even_months: int


class AIAdvisorRequest(BaseModel):
    best_loan: LoanComparisonResult
    user_profile: dict
    all_loans: List[LoanComparisonResult]


class AIExplainRequest(BaseModel):
    term: str
    context: Optional[dict] = None


class AIStrategyRequest(BaseModel):
    current_loan: LoanInput
    available_savings: float
    financial_goal: str
    timeline_months: int


class AIChatRequest(BaseModel):
    user_question: str
    loan_context: Optional[dict] = None
    conversation_history: Optional[List[dict]] = None


class AmortizationScheduleRequest(BaseModel):
    principal: float
    interest_rate: float
    tenure_months: int
