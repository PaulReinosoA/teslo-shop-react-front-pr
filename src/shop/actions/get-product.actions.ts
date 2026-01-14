import { tesloApi } from '@/api/teslo-api';
import type { Product } from '@/interfaces/product.interfaces';

interface Options {
  id?: number | string;
}

export const getProductActions = async (
  options: Options
): Promise<Product> => {
  const { id } = options;
  const { data } = await tesloApi.get<Product>(`/products/${id}`);

  return {
    ...data,
    images: data.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    ),
  };
};
