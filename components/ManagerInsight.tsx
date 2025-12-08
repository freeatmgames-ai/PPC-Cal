import React, { useState } from 'react';
import { BidState } from '../types';
import { AlertTriangle, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { getPPCStrategyAdvice } from '../services/geminiService';

interface ManagerInsightProps {
  data: BidState;
}

export const ManagerInsight: React.FC<ManagerInsightProps> = ({ data }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalTosBid = data.baseBid * (1 + data.tosPercentage / 100);
  const increaseRatio = finalTosBid / (data.baseBid || 1); // Avoid div by zero

  const isAggressiveTOS = increaseRatio > 1.5; // > 50% increase
  
  const handleGetAiAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const insight = await getPPCStrategyAdvice(data);
      setAiInsight(insight);
    } catch (err) {
      setError("Unable to fetch AI insights. Check API Key configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Standard Deterministic Insight */}
      <div className="bg-white rounded-lg shadow-sm border-l-4 border-amazon-orange p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-amazon-orange" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">PPC Manager Insight</h3>
            <div className="mt-2 text-sm text-gray-600 space-y-2">
              <p>
                Your <span className="font-semibold">Top of Search</span> Max Bid is 
                <span className="font-bold text-gray-900"> ₹{finalTosBid.toFixed(2)}</span>.
              </p>
              {isAggressiveTOS && (
                <div className="mt-3 flex items-start p-3 bg-red-50 rounded-md">
                   <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                   <p className="text-red-700">
                     <strong>Attention:</strong> Your Top of Search bid is significantly higher ({((increaseRatio - 1) * 100).toFixed(0)}%) than your Base Bid. 
                     Ensure your <strong>Conversion Rate (CVR)</strong> for Top of Search justifies this premium cost. 
                     If CVR is low, you may overspend quickly.
                   </p>
                </div>
              )}
              {!isAggressiveTOS && data.tosPercentage > 0 && (
                <p>
                  This is a moderate increase for Top of Search. Monitor your Impression Share to see if this is enough to win the top spots.
                </p>
              )}
               {data.tosPercentage === 0 && data.ppPercentage === 0 && (
                <p>
                  You are using a flat bidding strategy across all placements. Consider adding small modifiers if you notice better performance in specific placements.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Enhanced Insight */}
      <div className="border-t pt-6">
        {!aiInsight && !loading && (
          <button
            onClick={handleGetAiAdvice}
            className="flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Strategy Advice
          </button>
        )}

        {loading && (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="ml-2 text-sm text-gray-500">Analyzing strategy with Gemini...</span>
          </div>
        )}

        {error && (
           <div className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded text-center">
             {error}
           </div>
        )}

        {aiInsight && (
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100 animate-fade-in">
             <h4 className="flex items-center text-indigo-900 font-semibold mb-3">
               <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
               AI Strategic Assessment
             </h4>
             <div className="prose prose-sm text-indigo-800">
               {aiInsight.split('\n').map((line, i) => (
                 <p key={i} className="mb-1">{line}</p>
               ))}
             </div>
             <button 
               onClick={() => setAiInsight(null)}
               className="mt-4 text-xs text-indigo-600 underline hover:text-indigo-800"
             >
               Clear Analysis
             </button>
          </div>
        )}
      </div>
    </div>
  );
};