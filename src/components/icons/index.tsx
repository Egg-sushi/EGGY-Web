import dynamic from 'next/dynamic';

export const Menu = dynamic(() => import('./Menu.svg'));
export const Filter = dynamic(() => import('./Filter.svg'));
export const Search = dynamic(() => import('./Search.svg'));
export const LeftArrow = dynamic(() => import('./LeftArrow.svg'));
export const RightArrow = dynamic(() => import('./RightArrow.svg'));
