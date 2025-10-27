// Format currency in Indian Rupee format
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with Indian numbering system
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Calculate EMI locally (for real-time updates)
export const calculateEMILocal = (principal, annualRate, tenureMonths) => {
  const monthlyRate = annualRate / 12 / 100;
  
  if (monthlyRate === 0) {
    return principal / tenureMonths;
  }
  
  const emi = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  return emi;
};

// Calculate total interest
export const calculateTotalInterest = (emi, tenure, principal) => {
  return (emi * tenure) - principal;
};

// Debounce function for input handlers
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format percentage
export const formatPercentage = (value, decimals = 2) => {
  return `${value.toFixed(decimals)}%`;
};

// Calculate percentage change
export const calculatePercentageChange = (oldValue, newValue) => {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

// Validate loan input
export const validateLoanInput = (principal, interestRate, tenure) => {
  const errors = {};
  
  if (!principal || principal <= 0) {
    errors.principal = 'Principal must be greater than 0';
  }
  
  if (!interestRate || interestRate <= 0 || interestRate > 100) {
    errors.interestRate = 'Interest rate must be between 0 and 100';
  }
  
  if (!tenure || tenure <= 0) {
    errors.tenure = 'Tenure must be greater than 0';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Get badge color based on rank
export const getBadgeColor = (badge) => {
  switch (badge) {
    case 'Best Overall':
      return 'bg-success-500 text-white';
    case 'Most Affordable EMI':
      return 'bg-primary-500 text-white';
    case 'Fastest Payoff':
      return 'bg-warning-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// Get rank color
export const getRankColor = (rank) => {
  switch (rank) {
    case 1:
      return 'text-success-600 font-bold';
    case 2:
      return 'text-primary-600 font-semibold';
    case 3:
      return 'text-warning-600 font-medium';
    default:
      return 'text-gray-600';
  }
};

// Format months to years and months
export const formatTenure = (months) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${months} months`;
  } else if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  } else {
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
};

// Smooth scroll to element
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Copy to clipboard
export const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
};

// Generate unique ID
export const generateId = () => {
  return `loan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
