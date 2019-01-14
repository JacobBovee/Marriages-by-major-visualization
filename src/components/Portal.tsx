import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface IProps {
    children: any
    portalId: string
}

export default class Portal extends React.Component<IProps> {
    public portalElement: any

    public componentDidMount() {
        const portal = this.props.portalId && document.getElementById(this.props.portalId)
        if (!portal) {
            const portalElement = document.createElement('div')
            portalElement.id = this.props.portalId
            document.body.appendChild(portalElement)   
            this.portalElement = portalElement              
        }
        else {
            this.portalElement = portal
        }
        this.componentDidUpdate()
    }

    public componentWillUnmount() {
        document.body.removeChild(this.portalElement)
    }

    public componentDidUpdate() {
        ReactDOM.render(<div className='portal' {...this.props}>{this.props.children}</div>, this.portalElement)
    }
    
    public render() {
        return null
    }
}