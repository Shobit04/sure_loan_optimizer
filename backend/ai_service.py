import google.generativeai as genai
from config import get_settings
from typing import Dict, List, Optional


settings = get_settings()
genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel('gemini-pro')


def generate_loan_recommendation(
    best_loan: Dict,
    user_profile: Dict,
    all_loans: List[Dict]
) -> str:
    """
    Generate natural language recommendation for best loan option.
    """
    prompt = f"""
You are a friendly financial advisor in India. Explain the best loan option in 3-4 simple sentences.

Best Loan Option:
- Name: {best_loan['loan_name']}
- Monthly EMI: ₹{best_loan['emi']:,.2f}
- Total Interest: ₹{best_loan['total_interest']:,.2f}
- Total Cost: ₹{best_loan['total_cost']:,.2f}
- Score: {best_loan['score']}/100

User Profile:
{user_profile}

Other Options Compared: {len(all_loans)}

Focus on tangible benefits like monthly savings and years of loan-free living. Use conversational, encouraging tone. Avoid financial jargon.
Keep response to 3-4 sentences maximum.
"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        # Fallback message
        savings = abs(best_loan.get('savings_vs_first', 0))
        return f"Based on our analysis, {best_loan['loan_name']} is your best option with a monthly EMI of ₹{best_loan['emi']:,.2f}. This choice offers the optimal balance of affordability and total cost savings. You'll be on track to financial freedom with smart loan management!"


def explain_financial_term(term: str, context: Optional[Dict] = None) -> str:
    """
    Explain financial term in simple language with Indian context.
    """
    context_str = ""
    if context:
        context_str = f"\nExample context: Loan of ₹{context.get('amount', '5,00,000')} at {context.get('rate', '10')}% interest."
    
    prompt = f"""
Explain the financial term "{term}" in 2-3 simple sentences for someone taking their first loan in India.
Use everyday language and relevant examples.{context_str}

Keep it under 50 words. Be practical and helpful.
"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        # Fallback explanations
        fallbacks = {
            "emi": "EMI (Equated Monthly Installment) is the fixed amount you pay every month towards your loan. It includes both the loan amount (principal) and the interest charged by the lender.",
            "principal": "Principal is the actual loan amount you borrow from the bank. For example, if you take a ₹5 lakh loan, ₹5 lakh is your principal amount.",
            "interest rate": "Interest rate is the cost of borrowing money, shown as a percentage. If you borrow ₹1 lakh at 10% annual interest, you'll pay ₹10,000 as interest charges per year.",
            "processing fee": "Processing fee is a one-time charge banks levy to process your loan application. It typically ranges from 0.5% to 2% of the loan amount.",
            "tenure": "Tenure is the time period over which you'll repay the loan. A longer tenure means lower monthly EMI but more total interest paid.",
            "apr": "APR (Annual Percentage Rate) is the actual yearly cost of your loan including all fees and charges, not just the interest rate."
        }
        
        term_lower = term.lower()
        for key in fallbacks:
            if key in term_lower:
                return fallbacks[key]
        
        return f"{term} is an important loan term. It affects your monthly payments and total loan cost. Please consult with a financial advisor for detailed explanation."


def generate_savings_strategy(
    current_loan: Dict,
    available_savings: float,
    financial_goal: str,
    timeline_months: int
) -> str:
    """
    Generate personalized savings and prepayment strategy.
    """
    prompt = f"""
You are a financial advisor creating a personalized loan prepayment strategy for an Indian borrower.

Current Loan:
- Principal: ₹{current_loan['principal']:,.2f}
- Interest Rate: {current_loan['interest_rate']}%
- Tenure: {current_loan['tenure_months']} months
- Processing Fee: ₹{current_loan.get('processing_fee', 0):,.2f}

User Situation:
- Available Savings: ₹{available_savings:,.2f}
- Financial Goal: {financial_goal}
- Target Timeline: {timeline_months} months

Create a step-by-step prepayment strategy with:
1. Specific prepayment amounts and timing
2. Expected savings milestones
3. When to consider refinancing (if applicable)
4. Realistic timeline with key dates

Be specific with rupee amounts and months. Keep it actionable and encouraging.
Format as numbered steps. Maximum 6-8 steps.
"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        # Fallback strategy
        monthly_prepayment = available_savings / timeline_months if timeline_months > 0 else 0
        return f"""Here's your personalized savings strategy:

1. **Month 1-3**: Build emergency fund of ₹{available_savings * 0.2:,.0f} (20% of savings) for security
2. **Month 4**: Make first prepayment of ₹{monthly_prepayment * 3:,.0f} to reduce principal
3. **Month 7**: Second prepayment of ₹{monthly_prepayment * 3:,.0f} - you'll start seeing interest savings
4. **Month 12**: Review loan market for better interest rates. If you find 1-2% lower rate, consider refinancing
5. **Month {timeline_months}**: Final prepayment of remaining ₹{available_savings * 0.4:,.0f} to achieve your goal

Expected outcome: Save ₹{(available_savings * current_loan['interest_rate'] / 100):,.0f} in interest charges!"""


def chat_with_advisor(
    user_question: str,
    loan_context: Optional[Dict] = None,
    conversation_history: Optional[List[Dict]] = None
) -> str:
    """
    Chatbot assistant for loan-related questions.
    """
    context_str = ""
    if loan_context:
        context_str = f"""
User's Current Loan Context:
- Principal: ₹{loan_context.get('principal', 'N/A')}
- Interest Rate: {loan_context.get('interest_rate', 'N/A')}%
- EMI: ₹{loan_context.get('emi', 'N/A')}
- Tenure: {loan_context.get('tenure', 'N/A')} months
"""
    
    history_str = ""
    if conversation_history:
        history_str = "Previous conversation:\n"
        for item in conversation_history[-3:]:  # Last 3 exchanges
            history_str += f"User: {item.get('question', '')}\nAssistant: {item.get('answer', '')}\n\n"
    
    prompt = f"""
You are a helpful loan advisor chatbot in India. Answer the user's question in a friendly, practical way.
{context_str}
{history_str}

User Question: {user_question}

Provide a clear, concise answer (3-4 sentences). If using their loan details, reference specific numbers.
Be encouraging and helpful. If you need more information, ask follow-up questions.
"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return "I'm here to help with your loan questions! Could you provide a bit more detail about what you'd like to know? For example, are you asking about EMI calculations, interest rates, or prepayment options?"


def get_comparative_insight(loans: List[Dict]) -> str:
    """
    Generate insights comparing multiple loan options.
    """
    if not loans or len(loans) < 2:
        return "Add at least two loan options to get comparative insights."
    
    best = loans[0]
    worst = loans[-1]
    
    emi_diff = worst['emi'] - best['emi']
    interest_diff = worst['total_interest'] - best['total_interest']
    
    prompt = f"""
Compare these loan options and provide key insights in 2-3 sentences:

Best Option: {best['loan_name']}
- EMI: ₹{best['emi']:,.2f}
- Total Interest: ₹{best['total_interest']:,.2f}

Comparison Option: {worst['loan_name']}
- EMI: ₹{worst['emi']:,.2f}
- Total Interest: ₹{worst['total_interest']:,.2f}

EMI Difference: ₹{emi_diff:,.2f}/month
Interest Difference: ₹{interest_diff:,.2f} total

Explain the real-life impact of choosing the better option. Be specific and encouraging.
"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Choosing {best['loan_name']} over {worst['loan_name']} saves you ₹{emi_diff:,.2f} every month and ₹{interest_diff:,.2f} in total interest. That's significant savings you can use for other financial goals!"
