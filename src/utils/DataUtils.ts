import { descending } from 'd3-array'
import { chord, ribbon } from 'd3-chord'
import { csvParse } from 'd3-dsv'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import { schemeDark2 } from 'd3-scale-chromatic'
import { arc } from 'd3-shape'

class DataUtils {
    public fetchData = async () => {
        const [data, majors] = await fetch('/spousematching.csv')
            .then(r => r.text())
            .then(csv => {
                const csvValue = csvParse(csv)
                return [
                    csvValue,
                    csvValue.columns.slice(1, csvValue.columns.length-1),
                ]
            })

        return { data, majors }
    }

    public generateMatrix = (data: any) => {
        const matrix = data.map((row: any) => {
            return Object.keys(row).map(key => {
                return parseInt(row[key].replace(',', ''), 10)
            }).slice(1, -1)
        }).slice(0, -1)

        return matrix
    }

    public getChord = (width: number, height: number, matrix: number[][]) => {
        const outerRadius = Math.min(width, height) * 0.5 - 40
        const innerRadius = outerRadius - 30
        
        const d3Chord = chord()
            .padAngle(0.04)
            .sortSubgroups(descending)
            .sortChords(descending)
            .sortGroups(null)

        const chords = d3Chord(matrix)

        const d3Arc = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        const d3Ribbon = ribbon()
            .radius(innerRadius)
        
        const color = scaleOrdinal(schemeDark2)
        
        return {
            arc: d3Arc,
            chords,
            color,
            innerRadius,
            ribbon: d3Ribbon,
        }       
    }

    public generateBarData = (data: any, selectedGroup: number) => {
        const groupData = data[selectedGroup]
        delete groupData.Total
        delete groupData.major
        
        const barData = Object.keys(groupData).map((key: string, i: number) => {
            return { 
                title: key,
                value: parseInt(groupData[key], 10),
            }
        })

        return barData
    }

    public computeBarChart = (width: number, height: number, data: any) => {
        const margins = { bottom: 100, left: 80, right: 10, top: 50 }

        const maxValue = Math.max(...data.map((d: any) => d.value))
        
        const xScale = scaleBand()
            .padding(0.5)
            .domain(data.map((d: any) => d.title))
            .range([margins.left, width - margins.right])
        
        const yScale = scaleLinear()
            .domain([0, maxValue])
            .range([height - margins.bottom, margins.top])

        const axesProps = {
            x: {
                orient: 'Bottom', 
                scale: xScale,
                tickSize: height - margins.top - margins.bottom,
                translate: `translate(0, ${height - margins.bottom})`,
            },
            y: {
                orient: 'Left',
                scale: yScale,
                tickSize: width - margins.left - margins.right,
                translate: `translate(${margins.left}, 0)`,
            },
        }

        return {
            axesProps,
            bottomMargin: margins.bottom,
            colorScale: scaleOrdinal(schemeDark2),
            xScale,
            yScale,
        }
    }
}

export default new DataUtils()