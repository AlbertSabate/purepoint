import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import './top-navbar.sass'

class TopNavbar extends Component {
  static menu = [
    {
      click: () => {
        window.location.reload()
      },
      label: 'HOME',
    },
  ]

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
    this.navHeight = 0

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <Navbar role="navigation" light inverse fixed="top" toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand href="/" className="brand">
          <span>Recipe Finder</span>
        </NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {TopNavbar.menu.map(child => (
              <NavItem key={`nav-dropdown-${child.label}`}>
                <NavLink onClick={child.click}>
                  {child.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default TopNavbar
