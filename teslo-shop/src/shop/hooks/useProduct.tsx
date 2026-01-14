import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getProductActions } from '../actions/get-product.actions';

export const useProduct = () => {
  const { idSlug } = useParams();

  console.log({ idSlug });
  return useQuery({
    queryKey: ['product', { idSlug }],
    queryFn: () =>
      getProductActions({
        id: idSlug,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
