import type { User } from './user.interfaces';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: string;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export type Size = 'L' | 'M' | 'S' | 'XL' | 'XS' | 'XXL';
export type Gender = 'kid' | 'men' | 'women' | 'unisex';
