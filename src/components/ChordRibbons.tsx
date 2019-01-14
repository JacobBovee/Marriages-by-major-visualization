import { rgb } from 'd3-color'
import * as React from 'react'
import { isRibbonHidden } from '../utils/util'
import Popover from './Popover'

interface IProps {
    chords: any
    color: any
    ribbon: any
    mouseOverGroup: any
}

interface IState {
    selectedRibbon: number[] | null
    x: number | null
    y: number | null
}

export default class ChordRibbons extends React.Component<IProps, IState> {
    public state = {
        selectedRibbon: null,
        x: null,
        y: null,
    }

    constructor(props: IProps) {
        super(props)
    }

    public shouldDisplay = (mouseOverGroup: any, chordSourceIndex: number, chordTargetIndex: any) => {
        const { selectedRibbon } = this.state

        if (selectedRibbon === null) {
            return isRibbonHidden(mouseOverGroup, chordSourceIndex, chordTargetIndex) ? 'none': 'block'
        }
        else if (selectedRibbon[0] === chordSourceIndex && selectedRibbon[1] === chordTargetIndex) {
            return 'block'
        }
        return 'none'
    }

    public mouseOverRibbon = (ribbon: number[] | null) => (e: React.MouseEvent) => {
        this.setSelectedRibbon(ribbon)
        const open = ribbon === null ? false : true
        this.updatePopover(e, open)
        this.mouseOverRibbon = this.mouseOverRibbon.bind(this)
    }

    public setSelectedRibbon = (ribbon: number[] | null) => {
        this.setState({ selectedRibbon: ribbon })
    }

    public updatePopover = (e: React.MouseEvent, open: boolean) => {
        console.log(e)
        if (open) {
            this.setState({
                x: e.clientX,
                y: e.clientY,
            })
        }
        else {
            this.setState({
                x: null,
                y: null,
            })
        }
    }

    public render() {
        const { chords, color, mouseOverGroup, ribbon } = this.props
        const { x, y } = this.state

        return (
            <g
                className='ribbons'
                fillOpacity='0.6'
            >
                <Popover x={x} y={y} />
                {chords.map((chord: any, chordIndex: number) => (
                    <path
                        onMouseOver={this.mouseOverRibbon([chord.source.index, chord.target.index])}
                        onMouseOut={this.mouseOverRibbon(null)}
                        key={chordIndex}
                        fill={color(chord.target.index)}
                        style={{
                            display: this.shouldDisplay(mouseOverGroup, chord.source.index, chord.target.index),
                        }}
                        stroke={`${rgb(color(chord.target.index)).darker()}`}
                        d={`${ribbon({source: chord.source, target: chord.target})}`}
                    />
                ))}
            </g>
        )
    }
}