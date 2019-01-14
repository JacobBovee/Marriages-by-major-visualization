import * as React from 'react'
import '../styles/chord.css'
import DataUtils from '../utils/DataUtils'
import ChordGroups from './ChordGroups'
import ChordRibbons from './ChordRibbons'

interface IProps {
    width: number
    height: number
    data: any
}

interface IState {
    mouseOverGroup: any
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

export default class ChordDiagram extends React.Component<IProps, IState> {
    public state = {
        labels: [],
        matrix: [[]],
        mouseOverGroup: null,
    }

    public chord: IChord = {
        arc: null,
        chords: null,
        color: null,
        innerRadius: 0,
        labelColors: ['#fff'],
        ribbon: null,
    }

    constructor(props: IProps) {
        super(props)

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
        this.setState({ mouseOverGroup: group })
        this.setMouseOverGroup = this.setMouseOverGroup.bind(this)
    }


    public render() {
        const { width, height } = this.props
        const { labels, mouseOverGroup, matrix } = this.state

        if (matrix && matrix.length > 1) {
            this.chord = {
                ...this.chord,
                ...DataUtils.getChord(this.props.width, this.props.height, matrix)
            }
            const { arc, chords, color, labelColors, ribbon, innerRadius } = this.chord

            return (
                <svg width={width} height={height} className='chord' onMouseOut={this.setMouseOverGroup(null)} style={{ overflow: 'visible' }}>
                    <g transform={`translate(${width/2},${height/2})`}>
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
                            mouseOverGroup={mouseOverGroup}
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