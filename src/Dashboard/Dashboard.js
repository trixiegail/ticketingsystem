import React, { useState } from "react";
import "../css/styles.css"
import Ticket from "../TicketStatus/Ticket";
import {
    Sidebar,
    Menu,
    Icon,
    Segment,
    Header,
    Container,
    Button,
    Input,
    MenuItem,
    SegmentGroup,
    Dropdown,
    ButtonContent,
} from "semantic-ui-react";

const friendOptions = [
    {
        key: 1,
        text: 'High',
        value: 'High',
        label: { color: 'blue', empty: true, circular: true },
    },
    {
        key: '2',
        text: 'Medium',
        value: 'Medium',
        label: { color: 'yellow', empty: true, circular: true },
    },
    {
        key: '3',
        text: 'Low',
        value: 'Low',
        label: { color: 'green', empty: true, circular: true },
    },
]

const Dashboard = ({ children }) => {
    const [visible, setVisible] = useState(true);
    const [activeItem, setActiveItem] = useState("dashboard");
    const [activeMenu, setActiveMenu] = useState("home");

    const handleItemClick = (e, { name }) => setActiveItem(name);
    const handleItemMenu = (e, { name }) => setActiveMenu(name);

    return (
        <div>
            {/* Sidebar & Content */}
            <Sidebar.Pushable as={Segment} style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                <Sidebar
                    as={Menu}
                    animation="push"
                    icon="labeled"
                    inverted
                    vertical
                    visible={visible}
                    width="thin"
                    style={{ backgroundColor: "gray" }}
                >
                    <Menu.Item
                        as="a"
                        name="dashboard"
                        active={activeItem === 'dashboard'}
                        onClick={handleItemClick}>
                        <Icon name="th large" />
                        <span className="menu-text">Dashboard</span>
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        name="users"
                        active={activeItem === 'users'}
                        onClick={handleItemClick}>
                        <Icon name="users" />
                        <span className="menu-text">Users</span>
                    </Menu.Item>
                    <Menu.Item
                        as="a"
                        name="tickets"
                        active={activeItem === 'tickets'}
                        onClick={handleItemClick}>
                        <Icon name="settings" />
                        <span className="menu-text">Tickets</span>
                    </Menu.Item>
                </Sidebar>

                {/* Main Content */}
                <Sidebar.Pusher>
                    <Segment basic>
                        {/* Top Bar */}
                        <Menu secondary>
                            <Menu.Item>
                                <Button icon onClick={() => setVisible(!visible)} style={{backgroundColor:"#176D7F"}}>
                                    <Icon color={"white"} name={visible ? "unordered list" : "unordered list"} />
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Header as="h2">Dashboard</Header>
                            </Menu.Item>
                        </Menu>

                        <SegmentGroup style={{height: "100vh"}}>
                            <Segment basic>
                                <Input icon='search' placeholder='Search...'/>

                                {/* Wrap Dropdown & Button inside a Flexbox container */}
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", float: "right" }}>
                                    <Dropdown
                                        placeholder='Select priority'
                                        openOnFocus
                                        selection
                                        options={friendOptions}
                                    />
                                    <Button color={"black"} content='New Ticket' floated={"right"} style={{backgroundColor:"#176D7F"}}
                                    >
                                        <ButtonContent>
                                            <Icon name='edit' />
                                            New Ticket
                                        </ButtonContent>
                                    </Button>
                                </div>

                            </Segment>


                            <Menu className={"fok"} pointing secondary widths={4}>
                                <MenuItem
                                    name='home'
                                    active={activeMenu === 'home'}
                                    onClick={handleItemMenu}>
                                    <Icon color={"purple"} name='ticket' style={{paddingRight: "2rem"}}/>
                                    <span className="menu-text">All Tickets</span>
                                </MenuItem>

                                <MenuItem
                                    name='messages'
                                    active={activeMenu === 'messages'}
                                    onClick={handleItemMenu}>
                                    <Icon color={"yellow"} name='bookmark' style={{paddingRight: "2rem"}}/>
                                    <span className="menu-text">Started</span>
                                </MenuItem>
                                <MenuItem
                                    name='friends'
                                    active={activeMenu === 'friends'}
                                    onClick={handleItemMenu}>
                                    <Icon color={"blue"} name='history' style={{paddingRight: "2rem"}}/>
                                    <span className="menu-text">On-going</span>
                                </MenuItem>
                                <MenuItem
                                    name='completed'
                                    active={activeMenu === 'completed'}
                                    onClick={handleItemMenu}>
                                    <Icon color={"green"} name='thumbs up' style={{paddingRight: "2rem"}}/>
                                    <span className="menu-text">Completed</span>
                                </MenuItem>

                            </Menu>
                        </SegmentGroup>



                        {/* Content Area */}
                        <Container>{children}</Container>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default Dashboard;
