import { csvParse } from 'd3'

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
}

export default new DataHelper()