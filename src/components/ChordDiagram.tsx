import { observer } from 'mobx-react'
import * as React from 'react'
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

        this.setState({
            labels: data.columns.slice(1, -1),
            matrix,
        })
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
                <svg width={width} height={height} className='chord' style={{ overflow: 'visible' }}>
                    <g
                        transform={`translate(${width/2},${height/2})`}
                        onMouseOut={this.setMouseOverGroup(null)}
                    >
                        <ChordGroups
                            id={'chordGroups'}
                            chords={chords}
                            color={color}
                            arc={arc}
                            setMouseOverGroup={this.setMouseOverGroup}
                            groupLabels={ labels }
                            labelColors={ labelColors }
                            innerRadius={innerRadius}
                        />
                        <ChordRibbons
                            chords={chords}
                            color={color}
                            mouseOverGroup={selectedGroup}
                            ribbon={ribbon}
                            innerRadius={innerRadius}
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