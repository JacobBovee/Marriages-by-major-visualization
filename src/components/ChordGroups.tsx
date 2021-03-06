import { rgb } from 'd3-color'
import { observer } from 'mobx-react'
import * as React from 'react'

interface IProps {
    id: string
    chords: any
    color: any
    arc: any
    setMouseOverGroup: any
    groupLabels: any
    labelColors: any
    innerRadius: number
    selectionState: any
}

@observer
export default class ChordGroups extends React.Component<IProps> {
    public getAngle = (group: any) => ((group.startAngle + group.endAngle) / 2)

    public getAnchor = (group: any) => ((group.startAngle + group.endAngle) / 2 > Math.PI ? "end" : undefined)

    public pushGroupState = (group: any) => () => {
        this.props.selectionState.updateClickSelectedGroup(group)
        this.pushGroupState = this.pushGroupState.bind(this)
    }

    public render() {
        const { arc, chords, color, id, setMouseOverGroup, labelColors, groupLabels, innerRadius } = this.props

        return (
            <g className='groups'>
                {chords.groups.map((group: any, groupIndex: number) =>
                    <g
                        key={groupIndex}
                        onMouseOver={setMouseOverGroup(group.index)}
                        onClick={this.pushGroupState(group.index)}
                    >
                        <path
                            id={`${id}-group${groupIndex}`}
                            fill={`${rgb(color(groupIndex)).darker()}`}
                            stroke={`${rgb(color(groupIndex)).brighter()}`}
                            d={arc(group)}
                            data-start='0'
                            data-duration='3'
                        />
                        <text
                            dy={'.25em'}
                            transform={`
                                rotate(${this.getAngle(group) * 180 / Math.PI - 90 })
                                translate(${innerRadius + 36}) ${this.getAngle(group) > Math.PI ? "rotate(180)" : ""}`}
                            fill={labelColors.length === 1 ? labelColors[0] : labelColors[groupIndex]}
                            style={{
                                letterSpacing: '1px',
                                textAnchor: this.getAnchor(group),
                            }}
                        >
                            {groupLabels[groupIndex]}
                        </text>
                    </g>
                )}
            </g>
        )
    }
}