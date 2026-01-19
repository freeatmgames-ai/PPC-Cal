export interface BidState {
  baseBid: number;
  tosPercentage: number;
  ppPercentage: number;
  estimatedClicks: number;
  targetSales: number;
}

export interface CalculationRow {
  placement: string;
  adjustment: number;
  formula: string;
  finalBid: number;
  adSpend: number;
  acos: number | null;
}

export enum PlacementType {
  REST_OF_SEARCH = 'Rest of Search',
  TOP_OF_SEARCH = 'Top of Search (First Page)',
  PRODUCT_PAGES = 'Product Pages'
}