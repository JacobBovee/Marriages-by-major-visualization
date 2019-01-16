import { rgb } from 'd3-color'
import * as React from 'react'
import { isRibbonHidden } from '../utils/util'
import Popover from './Popover'

interface IProps {
    chords: any
    color: any
    data: any
    ribbon: any
    mouseOverGroup: any
    innerRadius: number
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

    public shouldDisplay = (mouseOverGroup: any, chordSourceIndex: number, chordTargetIndex: number) => {
        const { selectedRibbon } = this.state
        
        if (selectedRibbon === null) {
            return isRibbonHidden(mouseOverGroup, chordSourceIndex, chordTargetIndex) ? 'none' : 'block'
        }
        else if (selectedRibbon[0] === chordSourceIndex && selectedRibbon[1] === chordTargetIndex) {
            return 'block'
        }
        return 'none'
    }

    public mouseOverRibbon = (ribbon: number[] | null) => (e: React.MouseEvent) => {
        const open = ribbon === null ? false : true
        this.setSelectedRibbon(ribbon)
        this.updatePopover(e, open)
        this.mouseOverRibbon = this.mouseOverRibbon.bind(this)
    }

    public setSelectedRibbon = (ribbon: number[] | null) => {
        this.setState({ selectedRibbon: ribbon })
    }

    public updatePopover = (e: React.MouseEvent, open: boolean) => {
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

    public calculateListItems = () => {
        const { data } = this.props
        const { selectedRibbon } = this.state

        const computePercent = (occurences: string, total: string) => {
            return (Math.round((parseInt(occurences, 10) / parseInt(total, 10)) * 100 * 100) / 100)
        }

        if (selectedRibbon !== null) {
            const occurences = data[selectedRibbon[0]][data.columns[selectedRibbon[1]+1]]
            const secondOccurence = data[selectedRibbon[1]][data.columns[selectedRibbon[0]+1]]

            return {
                occurences,
                [`% of ${data.columns[selectedRibbon[0]+1]}`]: `${computePercent(occurences, data[selectedRibbon[0]].Total)}%`,
                [`% of ${data.columns[selectedRibbon[1]+1]}`]: `${computePercent(secondOccurence, data[selectedRibbon[1]].Total)}%`,
            }
        }
        return {}
    }

    public render() {
        const { chords, color, data, innerRadius, mouseOverGroup, ribbon } = this.props
        const { selectedRibbon, x, y } = this.state

        return (
            <g
                className='ribbons'
                fillOpacity='0.8'
            >
                <Popover
                    x={x}
                    y={y}
                    title={selectedRibbon ?
                        `${data.columns[selectedRibbon[0]+1]} + ${data.columns[selectedRibbon[1]+1]}`
                        :
                        ''
                    }
                    listView={true}
                    listItems={this.calculateListItems()}
                />
                <circle
                    r={innerRadius}
                />
                {chords.map((chord: any, chordIndex: number) => (
                    <path
                        onMouseOver={this.mouseOverRibbon([chord.source.index, chord.target.index])}
                        onMouseOut={this.mouseOverRibbon(null)}
                        key={chordIndex}
                        fill={color(chord.target.index)}
                        style={{
                            display: this.shouldDisplay(mouseOverGroup, chord.source.index, chord.target.index),
                        }}
                        stroke={`${rgb(color(chord.target.index)).brighter()}`}
                        d={`${ribbon({source: chord.source, target: chord.target})}`}
                    />
                ))}
            </g>
        )
    }
}