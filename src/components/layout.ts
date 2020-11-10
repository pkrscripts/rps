import { div, main, VNode } from '@cycle/dom';
import { Stream } from 'xstream';
import { Sources, Component, Sinks } from '../interfaces';
import choiceNode from './choice';
import xs from 'xstream';
import AIPlayer from './ai-player';
import { spriteSvg } from '../svg-sprite';

export default function Layout ( main$: Stream<any>) : Component{
    let won=0,lost=0,draw=0,aiSpriteClass='', humanSpriteClass='';
    const getRandomInt= (max: number=3) =>{
        return Math.floor(Math.random() * Math.floor(max));
    }
    const getAIChoice = () => {
        switch(getRandomInt(3)){
            case 1:
                return 'rock';
            case 2:
                return 'paper';
            case 3:
                return 'scissors'
            default:
                return 'rock';
        }
    }

    const humansMatchResult = (humanChoice: string, aiChoice: string) => {
        let result = 'DRAW';
        result = humanChoice ==='rock' && aiChoice === 'paper'? 'LOST' :
                 humanChoice ==='paper' && aiChoice === 'scissors'? 'LOST' :
                 humanChoice ==='scissors' && aiChoice === 'rock'? 'LOST' :
                 humanChoice === aiChoice ? 'DRAW': 'WIN!'
        return result;
    }

    const setScore = (c:string, aiChoice: string, result: string) => {
        switch(result){
            case 'LOST':
                aiSpriteClass= '.green-path';
                humanSpriteClass= '.red-path';
                lost++;
                break;
            case 'DRAW':
                aiSpriteClass= '.gray-path';
                humanSpriteClass= '.gray-path';
                draw++;
                break;
            case 'WIN!':
                won++;
                aiSpriteClass= '.red-path';
                humanSpriteClass= '.green-path';
                break;
        }
    }
    

    const component =(c:string,t1:number) => {
        let aiChoice='',result='';
        if(t1===3){
            aiChoice = getAIChoice();
            result = humansMatchResult(c,aiChoice)
            setScore(c, aiChoice, result);
        }
        return main('.game',[div('.game-panel',[
        div([
            div('.text-center','You'),
            div('.player-card', [
                div('.player1-row1'),
                div('.sprite-gray',[
                    t1<3? spriteSvg(c,'.blue-path') : spriteSvg(c,humanSpriteClass)
                ]),
                t1===3?choiceNode('.choice', 'Play again:'):div()
            ])
        ]),
        div('.result',result),
        AIPlayer(c,t1, aiChoice, aiSpriteClass)]),
        div('.score','Won: '+ won + '   Lost: '+  lost + '   Draw: '+ draw)
        ])};
    
    
    return (sources: Sources) => {
        
        const number$ = xs.periodic(1000)
        .endWhen(xs.periodic(5000).take(1))
        

        let result: Sinks = {
            DOM : main$.map(([v,c])=> {
                    return v==='landing' ? xs.of(main('.landing',choiceNode('.card', 'Choose:'))): 
                    number$.map(t1 =>component(c,t1)
                );}).flatten() 
        };
       
        return result;
    }
    
}
