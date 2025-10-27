import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingDown, Brain, Shield, Zap, BarChart3, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Smart EMI Calculator",
      description: "Real-time calculations with interactive visualizations. See your payment breakdown instantly.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Multi-Loan Comparison",
      description: "Compare up to 5 loans side-by-side with intelligent ranking based on your needs.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Recommendations",
      description: "Get personalized loan advice powered by Google's Gemini AI in simple language.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Savings Optimizer",
      description: "Discover hidden savings opportunities with prepayment strategies and refinancing options.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Prepayment Calculator",
      description: "See the impact of prepayments on your loan tenure and interest savings instantly.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Expert Insights",
      description: "AI chatbot assistant to answer all your loan questions with contextual advice.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { value: "₹10L+", label: "Avg. Savings Discovered", icon: "💰" },
    { value: "5 Mins", label: "To Compare Loans", icon: "⚡" },
    { value: "100%", label: "Free to Use", icon: "🎁" },
    { value: "AI", label: "Smart Recommendations", icon: "🤖" }
  ];

  const benefits = [
    "Save thousands on interest payments",
    "Compare loans from multiple lenders",
    "Get personalized AI recommendations",
    "Calculate prepayment impact instantly",
    "No hidden fees or charges",
    "Privacy-first, secure calculations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-bg dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-pulse-slow">
            <Sparkles className="w-4 h-4" />
            AI-Powered Loan Optimizer
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Discover Hidden
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%"> Savings </span>
            in Your Loans
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Compare, analyze, and optimize your loans with AI-powered insights. 
            Save thousands with smart recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/calculator')}
              className="group bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Saving Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/compare')}
              className="bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all border-2 border-primary-600 dark:border-primary-400 transform hover:scale-105"
            >
              Compare Loans
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-dark-card bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features to
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"> Optimize </span>
              Your Loans
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to make smarter loan decisions in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-12 shadow-2xl text-white">
            <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Sure Loan Optimizer?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white dark:bg-dark-card bg-opacity-50 dark:bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Simple. Smart. Savings.</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Enter Your Details", desc: "Input your loan information or upload existing loan documents" },
              { step: "2", title: "Get AI Analysis", desc: "Our AI analyzes and compares with thousands of loan scenarios" },
              { step: "3", title: "Save Money", desc: "Get personalized recommendations and start saving instantly" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-gray-800 dark:from-dark-card dark:to-slate-900 rounded-3xl p-12 shadow-2xl border border-gray-700">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Save Thousands?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of smart borrowers who are optimizing their loans with AI
            </p>
            <button
              onClick={() => navigate('/calculator')}
              className="group bg-gradient-to-r from-primary-500 to-purple-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Sure Loan Optimizer. Powered by AI. Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
