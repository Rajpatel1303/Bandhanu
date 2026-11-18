export const formatCurrency = (amount?: number | null, symbol: string = '₹'): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return `${symbol}0`;
  }
  return `${symbol}${amount.toLocaleString('en-IN')}`;
};
