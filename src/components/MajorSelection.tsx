import { observer } from 'mobx-react'
import * as React from 'react'
import '../styles/selection.css'

interface IProps {
    majors: string[],
    selectionState: any,
}

@observer
export default class MajorSelection extends React.Component<IProps> {
    
    constructor(props: IProps) {
        super(props)
    }

    public setMouseOverGroup = (group: any) => () => {
        const { selectionState } = this.props
        selectionState.updateGroup(group)
        this.setMouseOverGroup = this.setMouseOverGroup.bind(this)
    }

    public pushGroupState = (group: any) => () => {
        this.props.selectionState.updateClickSelectedGroup(group)
        this.pushGroupState = this.pushGroupState.bind(this)
    }
    
    public render() {
        const { majors, selectionState } = this.props

        return (
            <div className='major-selection'>
                <ul>
                    {majors.map((major: string, i: number) => 
                        <li
                            key={i}
                            onMouseOver={this.setMouseOverGroup(i)}
                            onMouseOut={this.setMouseOverGroup(null)}
                            onClick={this.pushGroupState(i)}
                            style={{
                                backgroundColor: selectionState.isClickSelected(i) ? 'rgb(72, 134, 188)' : 'transparent',
                            }}
                        >
                            {major}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}