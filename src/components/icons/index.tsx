import dynamic from 'next/dynamic';

export const LeftArrow = dynamic(() => import('./leftArrow.svg'));
export const RightArrow = dynamic(() => import('./rightArrow.svg'));
