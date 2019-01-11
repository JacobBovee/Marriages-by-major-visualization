import * as React from 'react'
import DataHelper from '../helpers/DataHelper'

export default class ChordDiagram extends React.Component {
    constructor(props: any) {
        super(props)

        DataHelper.getChord()
    }


    public render() {
        return (
            <div className='chord'>
                chord/
            </div>
        )
    }
}