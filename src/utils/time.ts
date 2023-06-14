import { Product } from '@/types/product';

export const second = (ms: number) => ms * 1000;
export const minute = (ms: number) => ms * 60 * 1000;
export const hour = (ms: number) => ms * 60 * 60 * 1000;

export const dateString = (yyyy: string, mm: string, dd: string) => {
  return `${yyyy}.${mm.length > 1 ? '' : '0'}${mm}.${dd.length > 1 ? '' : '0'}${dd}`;
};

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const atLeastPromiseTime = async <T>(callback: () => Promise<T>, time: number) => {
  await sleep(time);
  const result = await callback();
  return result;
};
