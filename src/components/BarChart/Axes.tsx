import * as React from 'react'
import Axis from './Axis'

interface IAxisProps {
    orient: string
    scale: any
    translate: string
    tickSize: number
}

interface IProps {
    xProps: IAxisProps
    yProps: IAxisProps
}

export default class Axes extends React.Component<IProps> {
    public render() {
        const { xProps, yProps } = this.props
        
        return (
            <g>
                <Axis {...xProps} />
                <Axis {...yProps} />
            </g>
        ) 
    }
}
