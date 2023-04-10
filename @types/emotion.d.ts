import '@emotion/react';
import type { Theme as ThemeModel } from '../src/styles/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeModel {}
}
