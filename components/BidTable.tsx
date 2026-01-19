import React from 'react';
import { BidState, PlacementType, CalculationRow } from '../types';

interface BidTableProps {
  data: BidState;
}

export const BidTable: React.FC<BidTableProps> = ({ data }) => {
  const { baseBid, tosPercentage, ppPercentage, estimatedClicks, targetSales } = data;

  const calculateRow = (placement: string, adj: number): CalculationRow => {
    const finalBid = baseBid * (1 + adj / 100);
    const adSpend = finalBid * estimatedClicks;
    const acos = targetSales > 0 ? (adSpend / targetSales) * 100 : null;
    
    return {
      placement,
      adjustment: adj,
      formula: `₹${baseBid.toFixed(2)} × (1 + ${adj}%)`,
      finalBid,
      adSpend,
      acos
    };
  };

  const rows: CalculationRow[] = [
    {
      placement: PlacementType.REST_OF_SEARCH,
      adjustment: 0,
      formula: `₹${baseBid.toFixed(2)} (Base)`,
      finalBid: baseBid,
      adSpend: baseBid * estimatedClicks,
      acos: targetSales > 0 ? ((baseBid * estimatedClicks) / targetSales) * 100 : null
    },
    calculateRow(PlacementType.TOP_OF_SEARCH, tosPercentage),
    calculateRow(PlacementType.PRODUCT_PAGES, ppPercentage),
  ];

  const getAcosColor = (acos: number | null) => {
    if (acos === null) return 'bg-gray-100 text-gray-600';
    if (acos <= 15) return 'bg-green-100 text-green-800 border-green-200';
    if (acos <= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-amazon-dark">Bid & Spend Simulation</h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
          {estimatedClicks} Clicks Baseline
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Placement
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Final Bid (₹)
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50/30">
                Est. Spend (₹)
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-amazon-blue uppercase tracking-wider bg-blue-50/30">
                Est. ACOS (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={idx} className={row.adjustment > 0 ? "hover:bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{row.placement}</div>
                  <div className="text-xs text-gray-500">{row.adjustment}% modifier</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-700">
                  ₹{row.finalBid.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-indigo-700 bg-indigo-50/10">
                  ₹{row.adSpend.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right bg-blue-50/10">
                  {row.acos !== null ? (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getAcosColor(row.acos)}`}>
                      {row.acos.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};