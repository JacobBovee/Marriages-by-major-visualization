import * as React from 'react'
import '../styles/nlp.css'

export default class NlpField extends React.Component {
    public render() {
        return (
            <div className='nlp-field'>
                <input type='text' className='nlp-input' placeholder={'Have a question about the data?'} />
            </div>
        )
    }
}