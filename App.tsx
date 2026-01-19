import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { BidTable } from './components/BidTable';
import { ManagerInsight } from './components/ManagerInsight';
import { BidState } from './types';
import { Calculator } from 'lucide-react';

const App: React.FC = () => {
  const [bidState, setBidState] = useState<BidState>({
    baseBid: 33.7,
    tosPercentage: 10,
    ppPercentage: 0,
    estimatedClicks: 10,
    targetSales: 500
  });

  const handleInputChange = (key: keyof BidState, value: number) => {
    setBidState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-amazon-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-amazon-orange" />
            <h1 className="text-xl font-bold tracking-tight">PPC-Calc India</h1>
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Amazon.in Bid Optimizer
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Amazon PPC Bid & ACOS Calculator
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Simulate your Ad Spend and ACOS across different placements in Indian Rupees (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
             <InputForm values={bidState} onChange={handleInputChange} />
             
             <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
               <h4 className="text-sm font-bold text-blue-800 mb-2">PPC Glossary</h4>
               <ul className="text-xs text-blue-700 space-y-2 list-disc pl-4">
                 <li><strong>Ad Spend:</strong> Total cost of clicks (Bid × Clicks).</li>
                 <li><strong>ACOS:</strong> (Ad Spend ÷ Ad Sales) × 100. Lower is usually more profitable.</li>
                 <li><strong>Base Bid:</strong> Your default bid before modifiers are applied.</li>
               </ul>
             </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 space-y-8">
            <BidTable data={bidState} />
            <ManagerInsight data={bidState} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PPC-Calc India. Not affiliated with Amazon Seller Central.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;