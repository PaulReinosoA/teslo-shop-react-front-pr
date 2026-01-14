import { RouterProvider } from 'react-router';
import { AppRouter } from './app.router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 105, // 1 hora y 45 minutos
    refetchOnWindowFocus: true, // cada vez que la ventana recupere el foco
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return <>{children}</>;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/** <Toaster /> notificaciones en pantalla*/}
      <Toaster />
      <CheckAuthProvider>
        {/* The rest of your application */}
        <RouterProvider router={AppRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
