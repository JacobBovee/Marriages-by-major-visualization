import { rgb } from 'd3-color'
import * as React from 'react'
import { isRibbonHidden } from '../utils/util'

interface IProps {
    chords: any
    color: any
    ribbon: any
    mouseOverGroup: any
}

export default class ChordRibbons extends React.Component<IProps> {
    public render() {
        const { chords, color, mouseOverGroup, ribbon } = this.props
        return (
            <g
                className='ribbons'
                fillOpacity='0.7'
            >
                {chords.map((chord: any, chordIndex: number) => (
                    <path
                        key={chordIndex}
                        fill={color(chord.target.index)}
                        style={{display: `${isRibbonHidden(mouseOverGroup, chord.source.index, chord.target.index) ? 'none': 'block'}`}}
                        stroke={`${rgb(color(chord.target.index)).darker()}`}
                        d={`${ribbon({source: chord.source, target: chord.target})}`}
                    />
                ))}
            </g>
        )
    }
}