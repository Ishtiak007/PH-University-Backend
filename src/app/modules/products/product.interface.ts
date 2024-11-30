export interface IStationaryProduct {
  name: string;
  brand: string;
  price: number;
  category:
    | 'Writing'
    | 'Office Supplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology'; //value (Writing, Office Supplies, Art Supplies, Educational, Technology)
  description: string;
  quantity: number;
  inStock: boolean;
}
