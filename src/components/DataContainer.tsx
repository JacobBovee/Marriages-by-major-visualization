import * as React from 'react'
import '../styles/datacontainer.css'
import ChordDiagram from './ChordDiagram'

interface IProps {
    data: any
}

export default class DataContainer extends React.Component<IProps> {
    public dataContainer: any

    constructor(props: any) {
        super(props)

        this.dataContainer = React.createRef()
    }

    public render() {
        const { data } = this.props
        
        return (
            <div className='data-container' ref={this.dataContainer}>
                <ChordDiagram
                    height={700}
                    width={700}
                    data={data}
                />
            </div>
        )
    }
}