import React from 'react';
import { BidState, PlacementType, CalculationRow } from '../types';
import { ArrowRight } from 'lucide-react';

interface BidTableProps {
  data: BidState;
}

export const BidTable: React.FC<BidTableProps> = ({ data }) => {
  const { baseBid, tosPercentage, ppPercentage } = data;

  const calculateRow = (placement: string, adj: number): CalculationRow => {
    const finalBid = baseBid * (1 + adj / 100);
    return {
      placement,
      adjustment: adj,
      formula: `₹${baseBid.toFixed(2)} × (1 + ${adj}%)`,
      finalBid,
    };
  };

  const rows: CalculationRow[] = [
    {
      placement: PlacementType.REST_OF_SEARCH,
      adjustment: 0,
      formula: `₹${baseBid.toFixed(2)} (Base)`,
      finalBid: baseBid
    },
    calculateRow(PlacementType.TOP_OF_SEARCH, tosPercentage),
    calculateRow(PlacementType.PRODUCT_PAGES, ppPercentage),
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-amazon-dark">Bid Simulation Table</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Placement Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Adjustment %
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                The Math
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-900 uppercase tracking-wider bg-yellow-50">
                FINAL MAX BID (₹)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={idx} className={row.adjustment > 0 ? "bg-blue-50/30" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.placement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.adjustment > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {row.adjustment > 0 ? '+' : ''}{row.adjustment}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono hidden md:table-cell">
                  {row.formula}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-amazon-dark text-right bg-yellow-50/50">
                  ₹{row.finalBid.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};