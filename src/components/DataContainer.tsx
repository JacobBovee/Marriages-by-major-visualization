import * as React from 'react'
import '../styles/datacontainer.css'
import ChordDiagram from './ChordDiagram'

interface IProps {
    data: any
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
        window.addEventListener('resize', () => {
            setTimeout(this.setWidthHeight, 500)
        })
    }

    public render() {
        const { data } = this.props
        const { height, width } = this.state
        
        return (
            <div className={'data-container'}
                id={'dataContainer'}
            >
                <ChordDiagram
                    height={height}
                    width={width}
                    data={data}
                />
            </div>
        )
    }
}