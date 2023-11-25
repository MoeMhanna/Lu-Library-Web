import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface PopoverBoxInterface<T = any> {
	role?: string,
	faIcon?: IconProp;
	label: string;
	visible?: boolean;
	disable?: boolean;
	selectedItemLabel?: string;
	data?: T;
	handler: (...params: any) => void;
}
