import { DSVRowArray } from 'd3'

import * as React from 'react'
import Controls from './components/Controls'
import DataContainer from './components/DataContainer'
import MajorSelection from './components/MajorSelection'
import NlpField from './components/NlpField'
import SelectionState from './state/SelectionState'
import './styles/app.css'
import DataUtils from './utils/DataUtils'

interface IState {
  majors: string[]
  data: string[] | DSVRowArray
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
    Promise.resolve(DataUtils.fetchData())
    .then(data => {
      this.setState(data)
    })
  }

  public render() {
    const { majors, data } = this.state

    if (majors.length > 0) {
      return (
        <div className="App">
          <div className='controls'>
            <Controls />
            <MajorSelection
              majors={majors}
              selectionState={SelectionState}
            />
          </div>
          <div className='visualization'>
            <NlpField />
            <DataContainer
              data={data}
              selectionState={SelectionState}
            />
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
