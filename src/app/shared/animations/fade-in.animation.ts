import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({ opacity: 0, transform: 'scale(0.2)' }),

      // animation and styles at end of transition
      animate('0.8s cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'scale(1.05)'})),
      animate('0.8s cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'scale(1)'}))
    ]),
  ]);
