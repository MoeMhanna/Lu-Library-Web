import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MajorsBo } from '../bo/majors.bo';

export const MajorsActions = createActionGroup({
  source: 'majors',
  events: {
    'load majors': emptyProps(),
    'load majors success': props<{ majorsBoList: Array<MajorsBo> }>(),
    'load majors error': props<{ error: string }>(),

    'create majors': props<{ majorName: string }>(),
    'create majors success': emptyProps(),
    'create majors error': props<{ error: string }>(),

    'delete majors': props<{ majorId: number }>(),
    'delete majors success': emptyProps(),
    'delete majors error': props<{ error: string }>(),
  }
})
