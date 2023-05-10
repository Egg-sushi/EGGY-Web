import { Tag } from '@/components';
import { SkinType } from '@/types/baumann';
import { Product } from '@/types/product';

export const ProductPriceHierarchy: Record<
  Product['priceRangeName'],
  Parameters<typeof Tag>[0]['hierarchy']
> = {
  LOW: 'gray',
  MIDDLE: 'secondary',
  HIGH: 'primary',
};

export function isPriceRangeKey(str: string): str is Product['priceRangeName'] {
  return str === 'LOW' || str === 'MIDDLE' || str === 'HIGH';
}

export function isSkinType(str: string): str is SkinType {
  return (
    str === 'DSPW' ||
    str === 'DSPT' ||
    str === 'DSNW' ||
    str === 'DSNT' ||
    str === 'DRPW' ||
    str === 'DRPT' ||
    str === 'DRNW' ||
    str === 'DRNT' ||
    str === 'OSPW' ||
    str === 'OSPT' ||
    str === 'OSNW' ||
    str === 'OSNT' ||
    str === 'ORPW' ||
    str === 'ORPT' ||
    str === 'ORNW' ||
    str === 'ORNT'
  );
}
