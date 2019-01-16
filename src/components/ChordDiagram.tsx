import { observer } from 'mobx-react'
import * as React from 'react'
import Vivus from 'vivus'
import '../styles/chord.css'
import DataUtils from '../utils/DataUtils'
import ChordGroups from './ChordGroups'
import ChordRibbons from './ChordRibbons'

interface IProps {
    width: number
    height: number
    data: any
    selectionState: any
}

interface IState {
    matrix: number[][]
    labels: string[]
}

interface IChord {
    arc: any
    color: any
    chords: any
    innerRadius: number
    labelColors: any
    ribbon: any
}

@observer
export default class ChordDiagram extends React.Component<IProps, IState> {
    public vChordDiagram: any
    public state = {
        labels: [],
        matrix: [[]],
    }

    public chord: IChord = {
        arc: null,
        chords: null,
        color: null,
        innerRadius: 0,
        labelColors: ['#fff'],
        ribbon: null,
    }

    public componentDidMount() {
        const { data } = this.props
        const matrix = DataUtils.generateMatrix(data)

        this.animateSVG()

        this.setState({
            labels: data.columns.slice(1, -1),
            matrix,
        })
    }

    public componentDidUpdate() {
        this.animateSVG()
    }

    public svgMouseLeave = () => {
        this.vChordDiagram.stop()
        this.setMouseOverGroup(null)()
    }

    public animateSVG = () => {
        if (document.getElementById('chordDiagram')) {
            this.vChordDiagram = new Vivus('chordDiagram', {
                animTimingFunction: Vivus.EASE,
                duration: 75,
            })
        }
    }

    public setMouseOverGroup = (group: any) => () => {
        const { selectionState } = this.props
        selectionState.updateGroup(group)

        this.setMouseOverGroup = this.setMouseOverGroup.bind(this)
    }

    public render() {
        const { width, height, selectionState } = this.props
        const { selectedGroup } = selectionState
        const { labels, matrix } = this.state

        if (matrix && matrix.length > 1) {
            this.chord = {
                ...this.chord,
                ...DataUtils.getChord(this.props.width, this.props.height, matrix)
            }
            const { arc, chords, color, labelColors, ribbon, innerRadius } = this.chord

            return (
                <svg
                    width={width}
                    height={height}
                    className='chord'
                    id='chordDiagram'
                    style={{ overflow: 'visible' }}
                    onMouseLeave={this.svgMouseLeave}
                >
                    <g
                        transform={`translate(${width/2},${height/2})`} 
                    >
                        <ChordGroups
                            id={'chordGroups'}
                            chords={chords}
                            color={color}
                            arc={arc}
                            setMouseOverGroup={this.setMouseOverGroup}
                            groupLabels={ labels }
                            labelColors={ labelColors }
                            selectionState={selectionState}
                            innerRadius={innerRadius}
                        />
                        <ChordRibbons
                            chords={chords}
                            color={color}
                            data={this.props.data}
                            mouseOverGroup={selectedGroup}
                            ribbon={ribbon}
                        />
                    </g>
                </svg>
            )
        }
        else {
            return (
                <div>Loading...</div>
            )
        }
    }
}