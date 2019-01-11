import { DSVRowArray } from 'd3'

import * as React from 'react'
import Controls from '../components/Controls'
import DataContainer from '../components/DataContainer'
import MajorSelection from '../components/MajorSelection'
import NlpField from '../components/NlpField'
import DataHelper from '../helpers/DataHelper'
import '../styles/app.css'

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
          <div className='controls'>
            <Controls />
            <MajorSelection majors={majors} />
          </div>
          <div className='visualization'>
            <NlpField />
            <DataContainer />
          </div>
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
