import React, {Component, useState} from 'react';
import DashboardLayout from "./DashboardLayout";
import {Button, ButtonContent, Dropdown, Icon, Input, Menu, MenuItem, Segment, SegmentGroup} from "semantic-ui-react";
import Card from 'semantic-ui-react/dist/es/views/Card';
import CardContent from 'semantic-ui-react/dist/es/views/Card/CardContent';
import CardHeader from 'semantic-ui-react/dist/es/views/Card/CardHeader';
import CardMeta from 'semantic-ui-react/dist/es/views/Card/CardMeta';
import CardDescription from 'semantic-ui-react/dist/es/views/Card/CardDescription';
import CardGroup from 'semantic-ui-react/dist/es/views/Card/CardGroup';
const options = [
    { key: 1, text: "High", value: "High", label: { color: "blue", empty: true, circular: true } },
    { key: 2, text: "Medium", value: "Medium", label: { color: "yellow", empty: true, circular: true } },
    { key: 3, text: "Low", value: "Low", label: { color: "green", empty: true, circular: true } },
];

const ScheduledTicket = () => {
    const [active, setActiveItem] = useState();
    const [activeMenu, setActiveMenu] = useState("home");

    const handleItemMenu = (e, { name }) => setActiveMenu(name);
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };
        return (
            <DashboardLayout>
                <div className="page-container">

                    {/* Content Wrapper */}
                    <div className="content-wrapper">
                        <Segment basic>
                            <Input icon="search" placeholder="Search..." style={{width: "850px"}}/>
                            <div style={{display: "flex", alignItems: "center", gap: "10px", float: "right"}}>
                                <Dropdown placeholder="Select priority" openOnFocus selection options={options}/>
                                <Button color="black" content="New Ticket" floated="right"
                                        style={{backgroundColor: "#176D7F"}}>
                                    <ButtonContent>
                                        <Icon name="edit"/>
                                        New Ticket
                                    </ButtonContent>
                                </Button>
                            </div>
                        </Segment>

                        {/* Tabs Menu */}
                        <Menu pointing secondary widths={4}>
                            <MenuItem name="home" active={activeMenu === "home"} onClick={handleItemMenu}>
                                <Icon color="purple" name="ticket" style={{ paddingRight: "2rem" }} />
                                <span className="menu-text">All Tickets</span>
                            </MenuItem>
                            <MenuItem name="messages" active={activeMenu === "messages"} onClick={handleItemMenu}>
                                <Icon color="yellow" name="bookmark" style={{ paddingRight: "2rem" }} />
                                <span className="menu-text">Started</span>
                            </MenuItem>
                            <MenuItem name="friends" active={activeMenu === "friends"} onClick={handleItemMenu}>
                                <Icon color="blue" name="history" style={{ paddingRight: "2rem" }} />
                                <span className="menu-text">On-going</span>
                            </MenuItem>
                            <MenuItem name="completed" active={activeMenu === "completed"} onClick={handleItemMenu}>
                                <Icon color="green" name="thumbs up" style={{ paddingRight: "2rem" }} />
                                <span className="menu-text">Completed</span>
                            </MenuItem>
                        </Menu>

                        {/* Scrollable Nested Segment Group */}
                        <SegmentGroup className={"scrollable-segment-group-card"}>
                            <Segment>
                                <CardGroup>
                                    <Card fluid>
                                        <CardContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <CardHeader>
                                                    <Icon name="circle" color={"blue"} size={"small"}/>
                                                    Ticket # 123456
                                                </CardHeader>
                                                <CardMeta>Posted at January 24, 2025</CardMeta>
                                            </div>
                                            <CardMeta><b>Software Issue</b> </CardMeta>
                                            <CardDescription>Matthew is a musician living in
                                                Nashville.</CardDescription>
                                        </CardContent>
                                    </Card>
                                    <Card fluid>
                                        <CardContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <CardHeader>
                                                    <Icon name="circle" color={"blue"} size={"small"}/>
                                                    Ticket # 123456
                                                </CardHeader>
                                                <CardMeta>Posted at January 24, 2025</CardMeta>
                                            </div>
                                            <CardMeta><b>Software Issue</b> </CardMeta>
                                            <CardDescription>Matthew is a musician living in
                                                Nashville.</CardDescription>
                                        </CardContent>
                                    </Card>
                                    <Card fluid>
                                        <CardContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <CardHeader>
                                                    <Icon name="circle" color={"blue"} size={"small"}/>
                                                    Ticket # 123456
                                                </CardHeader>
                                                <CardMeta>Posted at January 24, 2025</CardMeta>
                                            </div>
                                            <CardMeta><b>Software Issue</b> </CardMeta>
                                            <CardDescription>Matthew is a musician living in
                                                Nashville.</CardDescription>
                                        </CardContent>
                                    </Card>
                                    <Card fluid>
                                        <CardContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <CardHeader>
                                                    <Icon name="circle" color={"blue"} size={"small"}/>
                                                    Ticket # 123456
                                                </CardHeader>
                                                <CardMeta>Posted at January 24, 2025</CardMeta>
                                            </div>
                                            <CardMeta><b>Software Issue</b> </CardMeta>
                                            <CardDescription>Matthew is a musician living in
                                                Nashville.</CardDescription>
                                        </CardContent>
                                    </Card>
                                </CardGroup>
                            </Segment>
                        </SegmentGroup>
                    </div>
                </div>
            </DashboardLayout>
        );
}

export default ScheduledTicket;