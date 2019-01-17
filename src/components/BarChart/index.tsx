import * as React from 'react'
import DataUtils from '../../utils/DataUtils'
import Axes from './Axes'

interface IProps {
    width: number
    height: number
    data: any
    selectionState: any
}

interface IBarChart {
    axesProps: any
}

export default class BarChart extends React.Component<IProps> {
    public barChart: IBarChart = {
        axesProps: null,
    }

    public componentDidMount() {
        const { width, height, data, selectionState } = this.props
        this.barChart = DataUtils.computeBarChart(height, width, DataUtils.generateBarData(data, selectionState.clickSelectedGroups[0]))
    }

    public render() {
        const { height, width } = this.props
        const { axesProps } = this.barChart
        if (this.barChart.axesProps !== null) {
            return (
                <svg width={width} height={height}>
                    <Axes xProps={axesProps.x} yProps={axesProps.y}/>
                </svg>
            )
        }
        return (
            <div>Loading...</div>
        )
    }
}