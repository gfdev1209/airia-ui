import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
  state,
} from '@angular/animations';

export const slidePanelAnimation = trigger('slidePanel', [
  state(
    'true',
    style({ transform: 'translateX(0)', opacity: 1, visibility: 'visible' })
  ),
  state(
    'false',
    style({
      transform: 'translateX(-50%)',
      opacity: 0,
      visibility: 'hidden',
    })
  ),
  transition('* => *', animate('350ms ease-out')),
]);
