import * as React from 'react'
import '../styles/popover.css'
import Portal from './Portal'

interface IProps {
    x: number | null
    y: number | null
}

export default class Popover extends React.Component<IProps> {

    public render () {
        const { x, y } = this.props
        
        return (
            <Portal portalId={'popoverPortal'}>
                <div
                    className='popover-wrapper'
                    style={{
                        display: (!!x && !!y) ? 'block' : 'none',
                        left: !!x ? x + 20 : 0,
                        position: 'fixed',
                        top: !!y ? y - 80 : 0,
                    }}
                >
                    <div
                        className={'popover'}
                    >
                        Popover
                    </div>
                    <svg
                        height={64}
                        width={64}
                    >
                        <polygon points="250,60 100,400 400,400" className={'triangle'} />
                    </svg>
                </div>
            </Portal>
        )
    }
}