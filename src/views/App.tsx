import { DSVRowArray } from 'd3'

import * as React from 'react'
import DataContainer from '../components/DataContainer'
import MajorSelection from '../components/MajorSelection'
import NlpField from '../components/NlpField'
import DataHelper from '../helpers/DataHelper'

interface IState {
  majors: string[],
  data: string[] | DSVRowArray,
}


class App extends React.Component {
  public state: IState = {
    data: [],
    majors: [],
  }

  constructor(props: any) {
    super(props)

  }

  public componentDidMount() {
    Promise.resolve(DataHelper.fetchData())
    .then(data => {
      this.setState(data)
    })
  }

  public render() {
    const { majors } = this.state

    if (majors.length > 0) {
      return (
        <div className="App">
          <NlpField />
          <DataContainer />
          <MajorSelection majors={majors} />
        </div>
      )
    }
    return (
      <div>
          loading...
      </div>
    )
  }
}

export default App
