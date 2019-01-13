import { descending } from 'd3-array'
import { chord, ribbon } from 'd3-chord'
import { csvParse } from 'd3-dsv'
import { scaleOrdinal } from 'd3-scale'
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
        console.log(data)
        const matrix = data.map((row: any) => {
            return Object.keys(row).map(key => {
                return parseInt(row[key].replace(',', ''), 10)
            }).slice(1, -1)
        }).slice(0, -1)

        console.log(matrix)

        return matrix
    }

    public getChord(width: number, height: number, matrix: number[][]) {
        const outerRadius = Math.min(width, height) * 0.5 - 40
        const innerRadius = outerRadius - 30

        console.log(matrix)
        
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
}

export default new DataUtils()