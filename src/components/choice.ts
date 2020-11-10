import { Component, Sources } from '../interfaces';
import xs, { Stream } from 'xstream';
import { button, div, h2, main, span, VNode } from "@cycle/dom";
import { spriteSvg } from '../svg-sprite';

export default function Choice(className: string,title: string): VNode {

    const vnode$ = div(className, [
        h2(title),
        div('.buttons', [
          button('.rock', {
            props: {
              title: 'Rock'
            }
          }, [
            spriteSvg('rock','.white-path'),
            span('.sr-only', 'Rock')
          ]),
          button('.paper', {
            props: {
              title: 'Paper'
            }
          }, [
            spriteSvg('paper','.white-path'),
            span('.sr-only', 'Paper')
          ]),
          button('.scissors', {
            props: {
              title: 'Scissors'
            }
          }, [
            spriteSvg('scissors','.white-path'),
            span('.sr-only', 'Scissors')
          ])
        ])
    ])
    return vnode$;
    };
