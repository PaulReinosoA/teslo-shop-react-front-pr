import { Outlet } from 'react-router';
import { CustomHeader } from '../components/CustomHeader';
import { CustomFooter } from '../components/CustomFooter';
// import { CustomPagination } from '@/components/custom/CustomPagination';

export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />

      <Outlet />
      {/* <CustomPagination totalPages={10} /> */}
      <CustomFooter />
    </div>
  );
};
