import { useProduct } from '@/shop/hooks/useProduct';
import { Star, ShoppingCart, Truck, Shield, Heart } from 'lucide-react';
import { useState } from 'react';

// const mockProduct = {
//   id: '1',
//   name: 'Premium Wireless Headphones',
//   description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding. Perfect for music lovers, travelers, and professionals who demand the best audio experience.',
//   price: 299.99,
//   image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200',
//   category: 'Electronics',
//   stock: 45,
//   rating: 4.8,
//   reviews: 1247,
//   features: [
//     'Active Noise Cancellation',
//     '30-hour battery life',
//     'Premium comfort padding',
//     'Bluetooth 5.0',
//     'Built-in microphone',
//     'Foldable design'
//   ]
// };

export const ProductPage = () => {
  const { data: mockProduct } = useProduct();

  console.log({ data: mockProduct });

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (Number(mockProduct?.stock) || 0)) {
      setQuantity(newQuantity);
    }
  };

  const imagesLength = mockProduct?.images.length || 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square max-h-[80vh] bg-gray-50 rounded-2xl overflow-hidden relative">
              <img
                src={mockProduct?.images[0]}
                alt={mockProduct?.title}
                 className="w-full h-auto object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: imagesLength }, (_, i) => i).map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <img
                    src={mockProduct?.images[i]}
                    alt={`${mockProduct?.title} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-4">
                {mockProduct?.tags.join(', ')}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {mockProduct?.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(mockProduct?.price || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {mockProduct?.price} ({mockProduct?.stock} reviews)
                </span>
              </div>

              <p className="text-5xl font-bold text-gray-900 mb-6">
                ${mockProduct?.price}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                {mockProduct?.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Features
              </h3>
              <ul className="space-y-2">
                {mockProduct?.tags.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {mockProduct?.stock} in stock
                </span>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-primary/30">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors">
                Buy Now
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">2 Year Warranty</p>
                  <p className="text-sm text-gray-600">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
