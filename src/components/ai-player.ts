import { div, VNode } from '@cycle/dom';
import { spriteSvg } from '../svg-sprite';
export default function AIPlayer(chance: string, t1: number, aichoice: string, className: string): VNode {
  const comp = t1<3? div('.ai-delay',t1+1) : div('.sprite-gray',[
    spriteSvg(aichoice,className)
  ]);
  const vnode$ = div([
    div('.text-center','AI'),
    div('.player-card', [comp])
  ]);
    
  return vnode$;
}