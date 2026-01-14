import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router';
import { getProductsActions } from '../actions/get-products.actions';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const { gender } = useParams();
  const sizes = searchParams.get('sizes') || '';
  const query = searchParams.get('query') || '';

  const price = searchParams.get('price') || '';
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  switch (price) {
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100;
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;
    case '200+':
      minPrice = 200;
      maxPrice = undefined;
      break;

    default:
      break;
  }

  const offset = Number(page) * Number(limit);

  console.log({ limit, offset, gender, sizes, minPrice, maxPrice, query });
  return useQuery({
    queryKey: [
      'products',
      { limit, offset, gender, sizes, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsActions({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes: sizes,
        gender: gender || '',
        minPrice: minPrice,
        maxPrice: maxPrice,
        query,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
