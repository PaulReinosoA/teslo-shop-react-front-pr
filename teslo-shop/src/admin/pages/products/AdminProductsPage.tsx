import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { currencyFormatter } from '@/lib/currency-formater';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {
  const { isLoading, data } = useProducts();

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Gestiona y revisa tus productos"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>IMAGEN</TableHead>
            <TableHead>NOMBRE</TableHead>
            <TableHead>PRECIO</TableHead>
            <TableHead>PRODUCTO</TableHead>
            <TableHead>CATEGORÍA</TableHead>
            <TableHead>INVENTARIO</TableHead>
            <TableHead>TALLAS</TableHead>
            <TableHead className="text-right">ACCION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                <Link to={`/admin/products/${product.id}`} className="underline">
                  {product.title}
                </Link>
              </TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.tags[0]}</TableCell>
              <TableCell>{product.gender}</TableCell>
              <TableCell>{product.stock} stock</TableCell>
              <TableCell>{product.sizes.join(', ')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/products/${product.id}`}>
                  <PencilIcon className="w-5 h-5 text-blue-600 hover:text-gray-800" />
                </Link>
              </TableCell>
            </TableRow>
          )) || []}
        </TableBody>
      </Table>
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
