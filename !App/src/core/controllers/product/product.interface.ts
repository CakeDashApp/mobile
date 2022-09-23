export interface ProductStatsInterface {
  uses: number;
  starAverage: number;
}

export interface ProductDataInterface {
  name: string;
  imageId: string | null;
  stats: ProductStatsInterface;
}

export interface ProductInterface {
  id: string;
  teamId: string;
  productData: ProductDataInterface;
}
