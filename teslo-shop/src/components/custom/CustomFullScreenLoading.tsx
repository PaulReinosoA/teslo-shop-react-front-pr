export const CustomFullScreenLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Overlay con opacidad */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Contenido centrado */}
      <div className="relative flex flex-col items-center space-y-4">
        {/* Spinner animado */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        {/* imagen como icono */}
        <img
          src="/src/assets/react.svg"
          alt="Logo"
          className="h-10 w-10 animate-bounce"
        />
        {/* Texto visible */}
        <p className="text-white text-lg font-semibold animate-pulse">
          Cargando, por favor espere...
        </p>
      </div>
    </div>
  );
};
