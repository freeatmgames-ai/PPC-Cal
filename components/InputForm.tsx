import React from 'react';
import { BidState } from '../types';
import { IndianRupee, Percent, Lock } from 'lucide-react';

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
        Configuration
      </h2>
      
      <div className="space-y-6">
        {/* Base Bid Section */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            New Base Bid (₹)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IndianRupee className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.baseBid || ''}
              onChange={handleChange('baseBid')}
              className="block w-full rounded-md border-gray-300 pl-10 py-3 text-lg focus:border-amazon-blue focus:ring-amazon-blue border bg-white text-gray-900 placeholder-gray-300 transition-colors shadow-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Placements Group */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Placement Adjustments
          </h3>

          {/* Rest of Search (Locked) */}
          <div className="opacity-75">
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center justify-between">
              <span>Rest of Search</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Base</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                disabled
                value="0"
                className="block w-full rounded-md border-gray-200 bg-gray-100 pl-10 py-2 text-gray-500 sm:text-sm border cursor-not-allowed"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Lock className="h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Top of Search */}
          <div>
            <label className="block text-sm font-medium text-amazon-dark mb-1">
              Top of Search (TOS) %
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-amazon-orange" />
              </div>
              <input
                type="number"
                min="0"
                max="900"
                value={values.tosPercentage || ''}
                onChange={handleChange('tosPercentage')}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 focus:border-amazon-blue focus:ring-amazon-blue sm:text-sm border bg-white text-gray-900 shadow-sm"
                placeholder="0"
              />
            </div>
          </div>

          {/* Product Pages */}
          <div>
            <label className="block text-sm font-medium text-amazon-dark mb-1">
              Product Pages (PP) %
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-amazon-blue" />
              </div>
              <input
                type="number"
                min="0"
                max="900"
                value={values.ppPercentage || ''}
                onChange={handleChange('ppPercentage')}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 focus:border-amazon-blue focus:ring-amazon-blue sm:text-sm border bg-white text-gray-900 shadow-sm"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};