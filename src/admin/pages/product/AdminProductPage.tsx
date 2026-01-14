import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from '@/shop/pages/product/UI/ProductForm';
import type { Product } from '@/interfaces/product.interfaces';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: product, isError, mutation } = useProduct(id || '');

  console.log(isLoading, product);

  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmitForm = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: () => {
        toast.success('Producto creado/actualizado con éxito', {
          position: 'top-right',
        });
        navigate('/admin/products');
      },
      onError: () => {
        console.log('Error al crear/actualizar el producto');
        toast.error('Error al crear/actualizar el producto', {
          position: 'top-right',
        });
      },
    });
  };

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
      isPending={isLoading}
      onSubmit={handleSubmitForm}
    />
  );
};
