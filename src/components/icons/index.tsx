import dynamic from 'next/dynamic';

export const Menu = dynamic(() => import('./Menu.svg'));
export const LeftArrow = dynamic(() => import('./LeftArrow.svg'));
export const RightArrow = dynamic(() => import('./RightArrow.svg'));
