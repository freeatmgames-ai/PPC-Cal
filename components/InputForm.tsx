import React from 'react';
import { BidState } from '../types';
import { IndianRupee, Percent, Lock, MousePointerClick, ShoppingBag } from 'lucide-react';

interface InputFormProps {
  values: BidState;
  onChange: (key: keyof BidState, value: number) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ values, onChange }) => {
  const handleChange = (key: keyof BidState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(key, isNaN(val) ? 0 : val);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-amazon-dark mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-amazon-orange rounded-full block"></span>
        Bid Settings
      </h2>
      
      <div className="space-y-6">
        {/* Base Bid Section */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            New Base Bid (₹)
          </label>
          <div className="relative rounded-md shadow-sm group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IndianRupee className="h-5 w-5 text-gray-500 group-focus-within:text-amazon-orange transition-colors" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.baseBid || ''}
              onChange={handleChange('baseBid')}
              className="block w-full rounded-md border-gray-300 pl-10 py-3 text-lg focus:border-amazon-orange focus:ring-amazon-orange border bg-white text-gray-900 placeholder-gray-400 transition-shadow shadow-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Performance Forecasting */}
        <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100 space-y-4">
          <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-2 flex items-center gap-2">
            Performance Forecasting
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Est. Clicks
              </label>
              <div className="relative rounded-md shadow-sm group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <MousePointerClick className="h-4 w-4 text-indigo-500" />
                </div>
                <input
                  type="number"
                  min="1"
                  value={values.estimatedClicks || ''}
                  onChange={handleChange('estimatedClicks')}
                  className="block w-full rounded-md border-gray-300 pl-8 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 border bg-white text-gray-900"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Target Sales (₹)
              </label>
              <div className="relative rounded-md shadow-sm group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <ShoppingBag className="h-4 w-4 text-indigo-500" />
                </div>
                <input
                  type="number"
                  min="0"
                  value={values.targetSales || ''}
                  onChange={handleChange('targetSales')}
                  className="block w-full rounded-md border-gray-300 pl-8 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 border bg-white text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Placements Group */}
        <div className="bg-slate-50 rounded-xl p-5 border border-gray-200 space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 pb-2">
            Placement Modifiers (%)
          </h3>

          {/* Top of Search */}
          <div>
            <label className="block text-sm font-medium text-amazon-dark mb-1">
              Top of Search (TOS)
            </label>
            <div className="relative rounded-md shadow-sm group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-amazon-orange group-focus-within:text-amazon-dark transition-colors" />
              </div>
              <input
                type="number"
                min="0"
                max="900"
                value={values.tosPercentage || ''}
                onChange={handleChange('tosPercentage')}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 focus:border-amazon-blue focus:ring-amazon-blue sm:text-sm border bg-white text-gray-900 shadow-sm transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {/* Product Pages */}
          <div>
            <label className="block text-sm font-medium text-amazon-dark mb-1">
              Product Pages (PP)
            </label>
            <div className="relative rounded-md shadow-sm group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-amazon-blue group-focus-within:text-amazon-dark transition-colors" />
              </div>
              <input
                type="number"
                min="0"
                max="900"
                value={values.ppPercentage || ''}
                onChange={handleChange('ppPercentage')}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 focus:border-amazon-blue focus:ring-amazon-blue sm:text-sm border bg-white text-gray-900 shadow-sm transition-all"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};