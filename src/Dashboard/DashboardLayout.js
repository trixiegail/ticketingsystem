import React, {useState} from 'react';
import '../css/styles.css';
import {
    Header,
    Menu,
    Sidebar,
    Icon,
    Container, Modal, Dropdown, DropdownMenu, DropdownItem
} from 'semantic-ui-react';
import {Link, useNavigate} from "react-router-dom";

const options = [
    {
        key: 'user',
        text: (
            <span>
        Signed in as <strong>Bob Smith</strong>
      </span>
        ),
        disabled: true,
    },
    { key: 'profile', text: 'Your Profile' },
    { key: 'stars', text: 'Your Stars' },
    { key: 'explore', text: 'Explore' },
    { key: 'integrations', text: 'Integrations' },
    { key: 'help', text: 'Help' },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' },
]

const trigger = (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Icon name='user'/>
    <span style={{ fontWeight: '600' }}>Hello, Bob</span>
  </span>
)

const DashboardLayout = ({ children }) => {
    const [activeItem, setActiveItem] = useState();
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    const handleItemClick = (e, { name }) => setActiveItem(name);
    const profile = () => {setShowProfile(!showProfile)};

    return (
        <div style={{display: 'flex'}}>

            {/* Sidebar */}
            <Sidebar
                as={Menu}
                icon="labeled"
                inverted
                vertical
                visible={true}
                width="100px"
                style={{backgroundColor: "gray"}}
            >
                <Menu.Item
                    as={Link}
                    to={"/dashboard"}
                    name='dashboard'
                    active={activeItem === 'dashboard'}
                    onClick={handleItemClick}
                    style={{marginTop: "90%"}}>
                    <Icon name="th large"/>
                    <span className="menu-text">Dashboard</span>
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to={"/company"}
                    name="users"
                    active={activeItem === 'users'}
                    onClick={handleItemClick}>
                    <Icon name="users"/>
                    <span className="menu-text">Company</span>
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to={"/all-tickets"}
                    name="calendar"
                    active={activeItem === 'calendar'}
                    onClick={handleItemClick}>
                    <Icon name="calendar"/>
                    <span className="menu-text">Tickets</span>
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to={"/assignees"}
                    name='assignee'
                    active={activeItem === 'assignee'}
                    onClick={handleItemClick}>
                    <Icon name="users"/>
                    <span className="menu-text">Assignees</span>
                </Menu.Item>
            </Sidebar>

            {/* Fixed Top Menu */}
            <div className="fixed-menu">
                <Menu secondary>
                    <Menu.Item>
                        <Header as="h2">Welcome Admin!</Header>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Icon name="bell"/>
                    </Menu.Item>
                    <Menu.Item onClick={profile}>
                        <Dropdown
                            trigger={trigger}
                            options={options}
                            pointing='top right'
                            className="custom-dropdown"
                            style={{
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            }}
                            icon={null}
                        >
                            <Dropdown.Menu
                                style={{
                                    borderRadius: '8px',
                                    padding: '10px 0',
                                    minWidth: '200px',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                                }}
                            >
                                {options.map(option => (
                                    <Dropdown.Item key={option.key} text={option.text} disabled={option.disabled} />
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Menu.Item>
                </Menu>
            </div>

            <Modal open={showProfile} onClose={profile} size={"mini"}>
                <Modal.Header>Alex Gonzaga</Modal.Header>
                <Modal.Content>
                    <Container textAlign="center">
                        <Icon name="user" size="massive"/>
                        <p>lkdbvdhf</p>
                    </Container>
                </Modal.Content>
            </Modal>


            {/* Main Content */}
            <div style={{marginLeft: '90px', width: '100%', padding: '20px'}}>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;