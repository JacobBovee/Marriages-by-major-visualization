import * as React from 'react'
import '../styles/datacontainer.css'
import BarChart from './BarChart'
import ChordDiagram from './ChordDiagram'

interface IProps {
    data: any
    selectionState: any
}

interface IState {
    width: number
    height: number
}

export default class DataContainer extends React.Component<IProps, IState> {
    public dataContainer: any
    public state = {
        height: 700,
        width: 700,
    }

    constructor(props: any) {
        super(props)

        this.dataContainer = React.createRef()
    }

    public setWidthHeight = () => {
        const element = document.getElementById('dataContainer')
        if (element !== null) {
            this.setState({
                height: element.clientHeight - 210,
                width: element.clientWidth - 210,
            })
        }
    }

    public componentDidMount() {
        this.setWidthHeight()
        window.addEventListener('resize', () => {
            setTimeout(this.setWidthHeight, 500)
        })
    }

    public render() {
        const { data, selectionState } = this.props
        const { clickSelectedGroups } = selectionState
        const { height, width } = this.state
        
        return (
            <div className={'data-container'}
                id={'dataContainer'}
            >
            {clickSelectedGroups.length !== 0 ?
                <BarChart
                    height={height}
                    width={width}
                    data={data}
                    selectionState={selectionState}
                />
                :
                <ChordDiagram
                    height={height}
                    width={width}
                    data={data}
                    selectionState={selectionState}
                />
            }
            </div>
        )
    }
}