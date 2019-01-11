import { csvParse } from 'd3'
import { chord } from 'd3-chord'

class DataHelper {
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

    public getChord() {
        const matrix = [
            [11975,  5871, 8916, 2868],
            [ 1951, 10048, 2060, 6171],
            [ 8010, 16145, 8090, 8045],
            [ 1013,   990,  940, 6907]
        ]
        const chords = chord()
        console.log(chords(matrix))
    }
}

export default new DataHelper()