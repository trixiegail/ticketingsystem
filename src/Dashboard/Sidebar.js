import React, { Component } from 'react'
import './Sidebar.css'
import {
    MenuItem,
    Menu,
} from 'semantic-ui-react'

export default class Sidebar extends Component {
    state = { activeItem: 'Dashboard' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu secondary vertical style={{paddingTop: "50px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", height: "100vh"}}>
                <MenuItem
                    style={{padding: '1.5rem 0 1.5rem 1.5rem'}}
                    name='Dashboard'
                    active={activeItem === 'Dashboard'}
                    onClick={this.handleItemClick}
                />
                <MenuItem
                    style={{padding: '1.5rem 0 1.5rem 1.5rem'}}
                    name='Clients'
                    active={activeItem === 'Clients'}
                    onClick={this.handleItemClick}
                />
                <MenuItem
                    style={{padding: '1.5rem 0 1.5rem 1.5rem'}}
                    name='Tickets'
                    active={activeItem === 'Tickets'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}
