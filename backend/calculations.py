import math
from typing import List, Dict, Tuple


def calculate_emi(principal: float, annual_rate: float, tenure_months: int) -> Dict:
    """
    Calculate EMI using the formula:
    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
    """
    monthly_rate = annual_rate / 12 / 100
    
    if monthly_rate == 0:
        emi = principal / tenure_months
    else:
        emi = (principal * monthly_rate * math.pow(1 + monthly_rate, tenure_months)) / \
              (math.pow(1 + monthly_rate, tenure_months) - 1)
    
    total_payment = emi * tenure_months
    total_interest = total_payment - principal
    
    return {
        "emi": round(emi, 2),
        "total_payment": round(total_payment, 2),
        "total_interest": round(total_interest, 2),
        "principal": principal,
        "monthly_rate": round(monthly_rate * 100, 4)
    }


def normalize_value(value: float, min_val: float, max_val: float, inverse: bool = False) -> float:
    """
    Normalize value to 0-100 scale.
    If inverse=True, lower values get higher scores (for costs, interest, etc.)
    """
    if max_val == min_val:
        return 50.0
    
    normalized = ((value - min_val) / (max_val - min_val)) * 100
    
    if inverse:
        normalized = 100 - normalized
    
    return normalized


def calculate_loan_score(
    emi: float,
    total_interest: float,
    total_cost: float,
    tenure: int,
    processing_fee: float,
    all_emis: List[float],
    all_interests: List[float],
    all_costs: List[float],
    all_tenures: List[int],
    all_fees: List[float]
) -> float:
    """
    Calculate weighted MCDA score for a loan.
    Weights: Interest (35%), EMI (25%), Total Cost (20%), Tenure (10%), Fees (10%)
    """
    # Normalize metrics (inverse=True for costs - lower is better)
    norm_interest = normalize_value(total_interest, min(all_interests), max(all_interests), inverse=True)
    norm_emi = normalize_value(emi, min(all_emis), max(all_emis), inverse=True)
    norm_cost = normalize_value(total_cost, min(all_costs), max(all_costs), inverse=True)
    norm_tenure = normalize_value(tenure, min(all_tenures), max(all_tenures), inverse=True)
    norm_fee = normalize_value(processing_fee, min(all_fees), max(all_fees), inverse=True)
    
    # Apply weights
    score = (
        norm_interest * 0.35 +
        norm_emi * 0.25 +
        norm_cost * 0.20 +
        norm_tenure * 0.10 +
        norm_fee * 0.10
    )
    
    return round(score, 2)


def compare_loans(loans: List[Dict]) -> List[Dict]:
    """
    Compare multiple loans using MCDA algorithm and rank them.
    """
    # Calculate EMI and metrics for all loans
    loan_metrics = []
    for loan in loans:
        emi_data = calculate_emi(loan['principal'], loan['interest_rate'], loan['tenure_months'])
        total_cost = emi_data['total_payment'] + loan.get('processing_fee', 0)
        
        loan_metrics.append({
            'id': loan['id'],
            'name': loan['name'],
            'emi': emi_data['emi'],
            'total_interest': emi_data['total_interest'],
            'total_cost': total_cost,
            'tenure': loan['tenure_months'],
            'processing_fee': loan.get('processing_fee', 0)
        })
    
    # Extract all values for normalization
    all_emis = [m['emi'] for m in loan_metrics]
    all_interests = [m['total_interest'] for m in loan_metrics]
    all_costs = [m['total_cost'] for m in loan_metrics]
    all_tenures = [m['tenure'] for m in loan_metrics]
    all_fees = [m['processing_fee'] for m in loan_metrics]
    
    # Calculate scores
    for metric in loan_metrics:
        metric['score'] = calculate_loan_score(
            metric['emi'],
            metric['total_interest'],
            metric['total_cost'],
            metric['tenure'],
            metric['processing_fee'],
            all_emis,
            all_interests,
            all_costs,
            all_tenures,
            all_fees
        )
    
    # Sort by score (highest first)
    loan_metrics.sort(key=lambda x: x['score'], reverse=True)
    
    # Assign ranks and badges
    first_loan_cost = loan_metrics[0]['total_cost']
    
    for i, metric in enumerate(loan_metrics):
        metric['rank'] = i + 1
        metric['savings_vs_first'] = metric['total_cost'] - first_loan_cost if i > 0 else 0
        
        # Assign badges
        if i == 0:
            metric['badge'] = "Best Overall"
        elif metric['emi'] == min(all_emis):
            metric['badge'] = "Most Affordable EMI"
        elif metric['tenure'] == min(all_tenures):
            metric['badge'] = "Fastest Payoff"
    
    return loan_metrics


def calculate_prepayment_impact(
    principal: float,
    annual_rate: float,
    tenure_months: int,
    prepayment_amount: float,
    prepayment_month: int,
    reduce_emi: bool = False
) -> Dict:
    """
    Calculate the impact of prepayment on loan.
    """
    # Original loan details
    original_emi_data = calculate_emi(principal, annual_rate, tenure_months)
    original_emi = original_emi_data['emi']
    
    # Calculate remaining principal at prepayment month
    monthly_rate = annual_rate / 12 / 100
    remaining_principal = principal
    
    for month in range(prepayment_month):
        interest_payment = remaining_principal * monthly_rate
        principal_payment = original_emi - interest_payment
        remaining_principal -= principal_payment
    
    # Apply prepayment
    new_principal = remaining_principal - prepayment_amount
    remaining_tenure = tenure_months - prepayment_month
    
    if reduce_emi:
        # Keep tenure same, reduce EMI
        new_emi_data = calculate_emi(new_principal, annual_rate, remaining_tenure)
        new_emi = new_emi_data['emi']
        new_tenure = remaining_tenure
    else:
        # Keep EMI same, reduce tenure
        new_emi = original_emi
        # Calculate new tenure
        if monthly_rate == 0:
            new_tenure = int(new_principal / new_emi)
        else:
            new_tenure = math.ceil(
                math.log(new_emi / (new_emi - new_principal * monthly_rate)) / 
                math.log(1 + monthly_rate)
            )
    
    # Calculate new total interest
    new_total_payment = new_emi * new_tenure
    new_total_interest = new_total_payment - new_principal
    
    # Add interest already paid
    interest_already_paid = (original_emi * prepayment_month) - (principal - remaining_principal)
    new_total_interest += interest_already_paid
    
    # Calculate savings
    interest_saved = original_emi_data['total_interest'] - new_total_interest
    months_saved = tenure_months - (prepayment_month + new_tenure)
    
    # Calculate break-even (when savings exceed prepayment)
    break_even_months = 0
    if interest_saved > 0:
        monthly_savings = interest_saved / remaining_tenure if remaining_tenure > 0 else 0
        if monthly_savings > 0:
            break_even_months = math.ceil(prepayment_amount / monthly_savings)
    
    return {
        "original_emi": round(original_emi, 2),
        "new_emi": round(new_emi, 2),
        "original_total_interest": round(original_emi_data['total_interest'], 2),
        "new_total_interest": round(new_total_interest, 2),
        "interest_saved": round(interest_saved, 2),
        "original_tenure": tenure_months,
        "new_tenure": prepayment_month + new_tenure,
        "months_saved": max(0, months_saved),
        "break_even_months": break_even_months
    }


def generate_amortization_schedule(principal: float, annual_rate: float, tenure_months: int) -> List[Dict]:
    """
    Generate month-by-month amortization schedule.
    """
    emi_data = calculate_emi(principal, annual_rate, tenure_months)
    emi = emi_data['emi']
    monthly_rate = annual_rate / 12 / 100
    
    schedule = []
    remaining_balance = principal
    
    for month in range(1, tenure_months + 1):
        interest_payment = remaining_balance * monthly_rate
        principal_payment = emi - interest_payment
        remaining_balance -= principal_payment
        
        # Handle rounding in last month
        if month == tenure_months:
            principal_payment += remaining_balance
            remaining_balance = 0
        
        schedule.append({
            "month": month,
            "emi": round(emi, 2),
            "principal_payment": round(principal_payment, 2),
            "interest_payment": round(interest_payment, 2),
            "remaining_balance": round(max(0, remaining_balance), 2)
        })
    
    return schedule
