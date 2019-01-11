import * as React from 'react'
import '../styles/selection.css'

const initialState = {
    selectedMajors: [],
}

type State = Readonly<typeof initialState>

interface IProps {
    majors: string[],
}

export default class MajorSelection extends React.Component<IProps> {
    public state: State = initialState
    
    constructor(props: IProps) {
        super(props)
    }
    
    public render() {
        const { majors } = this.props
                
        return (
            <div className='major-selection'>
                <ul>
                    {majors.map((major: string, i: number) => <li key={i}>{major}</li>)}
                </ul>
            </div>
        )
    }
}