import { PageEnum } from '../enum/page.enum';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface PageInterface {
  title: string;
  faIcon: IconProp;
  isPageActive: boolean;
  visible: boolean;
  role: PageEnum;
  handler: () => void;
}
