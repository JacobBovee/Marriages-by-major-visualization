import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import * as React from 'react'
import '../../styles/axis.css'

interface IAxisProps {
    orient: string
    scale: any
    translate: string
    tickSize: number
}

export default class Axis extends React.Component<IAxisProps> {
    public axisElement: any

    public componentDidMount() {
        this.renderAxis()
    }

    public componentDidUpdate() {
        this.renderAxis()
    }

    public renderAxis = () => {
        const axisType = `axis${this.props.orient}`

        const axis = d3Axis[axisType]()
          .scale(this.props.scale)
          .tickSize(-this.props.tickSize)
          .tickPadding([12])
          .ticks([4])
    
        d3Select(this.axisElement).call(axis)
    }

    public render() {
        const { orient, translate } = this.props

        return (
            <g
                className={`Axis ${orient}`}
                ref={(el) => { this.axisElement = el}}
                transform={translate}
            />
        )
    }
}