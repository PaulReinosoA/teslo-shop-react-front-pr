import { tesloApi } from '@/api/teslo-api';
import type { Product } from '@/interfaces/product.interfaces';

interface Options {
  id?: string;
}

export const getProductByIdActions = async (
  options: Options
): Promise<Product> => {
  const { id } = options;

  if (!id) throw new Error('Product ID is required');

  if (id == 'new')
    return {
      id: 'new',
      title: '',
      description: '',
      price: 0,
      images: [],
      tags: [],
      sizes: [],
      gender: 'men',
      stock: 0,
    } as unknown as Product;

  const { data } = await tesloApi.get<Product>(`/products/${id}`);

  return {
    ...data,
    images: data.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    ),
  };
};
