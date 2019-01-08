import * as React from 'react'
import ChordDiagram from './ChordDiagram'

export default class DataContainer extends React.Component {
    public render() {
        return (
            <div className='data-container'>
                <ChordDiagram />
            </div>
        )
    }
}