import * as React from 'react'

interface IProps {
    colorScale: any
    width: number
    height: number
    xScale: any
    yScale: any
    data: any
    bottomMargin: number
}

export default class Bars extends React.Component<IProps> {
    
    public render() {
        const { colorScale, xScale, yScale, bottomMargin, data, height } = this.props

        return (
            <g>
                {data.map((datum: any) =>
                    <rect
                        key={datum.title}
                        x={xScale(datum.title)}
                        y={yScale(datum.value)}
                        height={height - bottomMargin - yScale(datum.value)}
                        width={xScale.bandwidth()}
                        fill={colorScale(datum.value)}
                    />
                )}
            </g>
        )
    }
}