import * as React from 'react'
import '../styles/popover.css'
import Portal from './Portal'

interface IProps {
    listItems: object
    listView: boolean
    title: string
    x: number | null
    y: number | null
}

export default class Popover extends React.Component<IProps> {

    public render () {
        const { listItems, listView, title, x, y } = this.props
        
        return (
            <Portal portalId={'popoverPortal'}>
                <div
                    style={{
                        display: (!!x && !!y) ? 'block' : 'none',
                        left: !!x ? x - 40 : 0,
                        position: 'fixed',
                        top: !!y ? y - 240 : 0,
                    }}
                >
                    <div
                        className={'popover'}
                    >
                        <h6>{ title }</h6>
                        {listView && listItems &&
                            <ul className='listView'>
                                {Object.keys(listItems).map((key: string, i: number) => 
                                    <li key={i}>{key.charAt(0).toUpperCase() + key.substr(1)}: {listItems[key]}</li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
            </Portal>
        )
    }
}