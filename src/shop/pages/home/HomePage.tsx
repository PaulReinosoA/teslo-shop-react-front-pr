import { CustomPagination } from '@/components/custom/CustomPagination';
// import { products } from '@/mocks/products.mock';
import { CustomJumbotron } from '@/shop/components/CustomJumbotron';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { useProducts } from '@/shop/hooks/useProducts';

export const HomePage = () => {
  const { data } = useProducts();
  //console.log({ data });

  return (
    <>
      <CustomJumbotron
        title="Todos los productos"
        subTitle="Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. Calidad premium para un estilo atemporal."
      />

      <ProductsGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
