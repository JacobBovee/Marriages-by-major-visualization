import * as React from 'react'
import '../styles/controls.css'

export default class Controls extends React.Component {
    public render() {
        return (
            <div className='controls'>
                <div className='information'>
                    <div className='title-space'> 
                        <h1>An exploration in undergraduate marriages</h1>
                    </div>
                    <div className='inner-controls' />
                    <div className='story'>
                        <p>The data represented is taken from the 2009 - 2016 American Community Survey representing
                        couples in which the wife married for the first time only with a sample size of 27,068.
                        Explore the data by moving your mouse over groups or individual ribbons. To view individual groups
                        represented differently click on one or more of the groups.</p>
                    </div>
                </div>
            </div>
        )
    }
}