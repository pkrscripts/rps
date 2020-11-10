import xs, { Stream } from 'xstream';
import { Sources, Sinks } from '../interfaces';
import { View, Choice } from './common-types';
import layout from './layout';

export function App(sources: Sources): Sinks {

  const {
    DOM,
    resize
  } = sources;

  // Intent
  const rockClick$ = DOM
    .select('.rock')
    .events('click');

  const paperClick$ = DOM
    .select('.paper')
    .events('click');

  const scissorsClick$ = DOM
    .select('.scissors')
    .events('click');

  // Model
  const view$: Stream<View> = xs
    .merge(
      rockClick$,
      paperClick$,
      scissorsClick$
    )
    .map((): View => 'game')
    .startWith('landing' as 'landing');

  const choice$: Stream<Choice> = xs
    .merge(
      rockClick$.mapTo('rock' as 'rock'),
      paperClick$.mapTo('paper' as 'paper'),
      scissorsClick$.mapTo('scissors' as 'scissors')
    )
    .startWith('rock');
  

 
  const combined$ =  xs
  .combine(
    view$,
    choice$,
  );
  // View
  const sinks =  layout(combined$)(sources)
  
  resize
    .addListener({
      next: console.log
    });

  return sinks;

}
