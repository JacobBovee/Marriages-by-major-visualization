import { observer } from 'mobx-react'
import * as React from 'react'
import DataUtils from '../../utils/DataUtils'
import Axes from './Axes'
import Bars from './Bars'

interface IProps {
    width: number
    height: number
    data: any
    selectionState: any
}

interface IState {
    barChart: IBarChart | null
    clickSelectedGroup: number | null
}

interface IBarChart {
    axesProps: any
    xScale: any
    yScale: any
    bottomMargin: number
    colorScale: any
}


@observer
export default class BarChart extends React.Component<IProps, IState> {
    public state: IState = {
        barChart: null,
        clickSelectedGroup: null,
    }

    public barData: any

    public componentDidMount() {
        this.buildChart()
    }

    public buildChart = () => {
        const { width, height, data, selectionState } = this.props
        this.barData = DataUtils.generateBarData(data, selectionState.clickSelectedGroup)
        this.setState({
            barChart: DataUtils.computeBarChart(height, width, this.barData),
            clickSelectedGroup: selectionState.clickSelectedGroup,
        })
    }

    public componentWillReceiveProps(oldProps: IProps, newProps:IProps) {
        if (oldProps !== newProps) {
            this.buildChart()
        }
    }

    public render() {
        const { height, width, selectionState } = this.props
        const { barChart } = this.state

        if (barChart !== null && selectionState.clickSelectedGroup !== null) {
            const { axesProps, bottomMargin, colorScale, xScale, yScale, } = barChart

            return (
                <svg width={width} height={height} style={{ overflow: 'visible' }}>
                    <g>
                        <Axes xProps={axesProps.x} yProps={axesProps.y}/>
                        <Bars
                            width={width}
                            height={height}
                            xScale={xScale}
                            yScale={yScale}
                            data={this.barData}
                            bottomMargin={bottomMargin}
                            colorScale={colorScale}
                        />
                    </g>
                </svg>
            )
        }
        return (
            <div>Loading...</div>
        )
    }
}