export const formatCurrency = (amount: number, symbol: string = '₹'): string => {
  return `${symbol}${amount.toLocaleString('en-IN')}`;
};
