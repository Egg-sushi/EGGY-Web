import dynamic from 'next/dynamic';

export const Menu = dynamic(() => import('./Menu'));
export const LeftArrow = dynamic(() => import('./LeftArrow'));
export const RightArrow = dynamic(() => import('./RightArrow'));
