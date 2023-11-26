import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ActionButtonInterface {
  faIcon: IconProp,
  label: string
  handler: () => void
}
