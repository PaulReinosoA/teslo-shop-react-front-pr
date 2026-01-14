import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from '@/shop/pages/product/UI/ProductForm';

export const AdminProductPage = () => {
  const { id } = useParams();

  const { isLoading, data: product, isError } = useProduct(id || '');

  console.log(isLoading, product);

  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  if (isError) {
    return <Navigate to="/admin/products" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!product) return <Navigate to="/admin/products" replace />;

  return (
    <ProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
    />
  );
};
