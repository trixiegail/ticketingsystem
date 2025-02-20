import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Segment,
    Header,
    Statistic,
    Table,
    Icon,
    Menu,
    Dropdown,
    Label,
    Card,
    Divider,
    Progress,
} from 'semantic-ui-react';

// Using the ticket data structure from your existing code
const tickets = [
    { id: 123456, name: "Trixie Hale", email: "trixie@email.com", address:"Talisay,Cebu", date: "Jan 24, 2025", category: "Software Issue", description: "Matthew has software issues.", status: "pending", statusColor: "red", company: "Company 1", priority: "high", lastUpdated: "Jan 24, 2025", project: "Support", assignee: "Mark Keifer Watson"},
    { id: 123457, name: "Patrick Ace", email: "patrick@email.com", address:"Cebu City,Cebu", date: "Jan 25, 2025", category: "Hardware Issue", description: "John has trouble with his laptop screen.", status: "ongoing", statusColor: "green", company: "Company 3", priority: "low", lastUpdated: "Feb 2, 2025", project: "Support", assignee: "Yuri Hwang"},
    { id: 123458, name: "Spongebob Borite", email: "spongebob@email.com", address:"Mandaue,Cebu", date: "March 26, 2024", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "completed", statusColor: "yellow", company: "Company 1", priority: "medium", lastUpdated: "June 2, 2023", project: "Support", assignee: "Ella Tuhong"},
    { id: 123459, name: "Sunjae Ryu", email: "sunjae@email.com", address:"Mandaue,Cebu", date: "Jan 27, 2024", category: "Account Issue", description: "Mike cannot access his account.", status: "ongoing", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "July 19, 2024", project: "Billing", assignee: "Elijah Almaden"},
    { id: 123460, name: "Im Sol", email: "spongebob@email.com", address:"Talisay,Cebu", date: "Apr 26, 2024", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "completed", statusColor: "green", company: "Company 1", priority: "low", lastUpdated: "August 12, 2024", project: "Billing", assignee: "Bob Stewarts"},
    { id: 123461, name: "Kim Taesung", email: "kimtaesung@email.com", address:"Cebu City,Cebu", date: "Jan 27, 2024", category: "Account Issue", description: "Mike cannot access his account.", status: "ongoing", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "October 23, 2024", project: "Billing", assignee: "Jurisdicio Macalos"},
    { id: 123462, name: "Jeon Jungkook", email: "jungkook@email.com", address:"Cebu City,Cebu", date: "Jan 27, 2024", category: "Account Issue", description: "Mike cannot access his account.", status: "new", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "February 17, 2024", project: "Support", assignee: "Jackielou Quilantang"},
];

const TicketingDashboard = () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    // Calculate summary statistics
    const totalTickets = tickets.length;
    const newTickets = tickets.filter(t => t.status === "new").length;
    const pendingTickets = tickets.filter(t => t.status === "pending").length;
    const ongoingTickets = tickets.filter(t => t.status === "ongoing").length;
    const completedTickets = tickets.filter(t => t.status === "completed").length;

    // Get unique assignees and companies
    const assignees = [...new Set(tickets.map(t => t.assignee))];
    const companies = [...new Set(tickets.map(t => t.company))];

    // Calculate statistics per assignee
    const assigneeStats = assignees.map(assignee => {
        const assigneeTickets = tickets.filter(t => t.assignee === assignee);
        return {
            name: assignee,
            total: assigneeTickets.length,
            new: assigneeTickets.filter(t => t.status === "new").length,
            pending: assigneeTickets.filter(t => t.status === "pending").length,
            ongoing: assigneeTickets.filter(t => t.status === "ongoing").length,
            completed: assigneeTickets.filter(t => t.status === "completed").length,
        };
    });

    // Calculate statistics per company
    const companyStats = companies.map(company => {
        const companyTickets = tickets.filter(t => t.company === company);
        return {
            name: company,
            total: companyTickets.length,
            new: companyTickets.filter(t => t.status === "new").length,
            pending: companyTickets.filter(t => t.status === "pending").length,
            ongoing: companyTickets.filter(t => t.status === "ongoing").length,
            completed: companyTickets.filter(t => t.status === "completed").length,
        };
    });

    // Get recent tickets (sorted by date)
    const recentTickets = [...tickets]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Format date for display
    const formatDate = (dateString) => {
        return dateString;
    };

    // Get status color
    const getStatusColor = (status) => {
        const statusColors = {
            new: "blue",
            pending: "yellow",
            ongoing: "orange",
            completed: "green"
        };
        return statusColors[status] || "grey";
    };

    // Get priority indicator
    const getPriorityLabel = (priority) => {
        const priorityColors = {
            high: "red",
            medium: "yellow",
            low: "green"
        };
        return <Label circular empty color={priorityColors[priority]} />;
    };

    return (
        <Container fluid style={{ padding: '20px' }}>
            <Menu inverted attached="top">
                <Menu.Item header>
                    <Icon name="ticket" />
                    Ticketing System Dashboard
                </Menu.Item>
                <Menu.Item
                    name="dashboard"
                    active={activeItem === 'dashboard'}
                    onClick={() => setActiveItem('dashboard')}
                />
                <Menu.Item
                    name="tickets"
                    active={activeItem === 'tickets'}
                    onClick={() => setActiveItem('tickets')}
                />
                <Menu.Menu position="right">
                    <Dropdown item text="Admin">
                        <Dropdown.Menu>
                            <Dropdown.Item>Users</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>

            <Grid stackable>
                {/* Summary Statistics */}
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header as="h2">Dashboard Overview</Header>
                            <Statistic.Group widths="five">
                                <Statistic>
                                    <Statistic.Value>{totalTickets}</Statistic.Value>
                                    <Statistic.Label>Total Tickets</Statistic.Label>
                                </Statistic>
                                <Statistic color="blue">
                                    <Statistic.Value>{newTickets}</Statistic.Value>
                                    <Statistic.Label>New</Statistic.Label>
                                </Statistic>
                                <Statistic color="yellow">
                                    <Statistic.Value>{pendingTickets}</Statistic.Value>
                                    <Statistic.Label>Pending</Statistic.Label>
                                </Statistic>
                                <Statistic color="orange">
                                    <Statistic.Value>{ongoingTickets}</Statistic.Value>
                                    <Statistic.Label>Ongoing</Statistic.Label>
                                </Statistic>
                                <Statistic color="green">
                                    <Statistic.Value>{completedTickets}</Statistic.Value>
                                    <Statistic.Label>Completed</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                {/* Ticket Distribution */}
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Segment>
                            <Header as="h3">Ticket Status Distribution</Header>
                            <div style={{ marginBottom: '20px' }}>
                                <Label attached="top left">New</Label>
                                <Progress percent={(newTickets / totalTickets) * 100} color="blue" />

                                <Label attached="top left">Pending</Label>
                                <Progress percent={(pendingTickets / totalTickets) * 100} color="yellow" />

                                <Label attached="top left">Ongoing</Label>
                                <Progress percent={(ongoingTickets / totalTickets) * 100} color="orange" />

                                <Label attached="top left">Completed</Label>
                                <Progress percent={(completedTickets / totalTickets) * 100} color="green" />
                            </div>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Segment>
                            <Header as="h3">Priority Distribution</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Priority</Table.HeaderCell>
                                        <Table.HeaderCell>Count</Table.HeaderCell>
                                        <Table.HeaderCell>Percentage</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label circular empty color="red" /> High
                                        </Table.Cell>
                                        <Table.Cell>{tickets.filter(t => t.priority === "high").length}</Table.Cell>
                                        <Table.Cell>
                                            {((tickets.filter(t => t.priority === "high").length / totalTickets) * 100).toFixed(1)}%
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label circular empty color="yellow" /> Medium
                                        </Table.Cell>
                                        <Table.Cell>{tickets.filter(t => t.priority === "medium").length}</Table.Cell>
                                        <Table.Cell>
                                            {((tickets.filter(t => t.priority === "medium").length / totalTickets) * 100).toFixed(1)}%
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label circular empty color="green" /> Low
                                        </Table.Cell>
                                        <Table.Cell>{tickets.filter(t => t.priority === "low").length}</Table.Cell>
                                        <Table.Cell>
                                            {((tickets.filter(t => t.priority === "low").length / totalTickets) * 100).toFixed(1)}%
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                {/* Assignee and Company Statistics */}
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Segment>
                            <Header as="h3">Tickets by Assignee</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Assignee</Table.HeaderCell>
                                        <Table.HeaderCell>Total</Table.HeaderCell>
                                        <Table.HeaderCell>Open</Table.HeaderCell>
                                        <Table.HeaderCell>Pending</Table.HeaderCell>
                                        <Table.HeaderCell>Ongoing</Table.HeaderCell>
                                        <Table.HeaderCell>Completed</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {assigneeStats.map(assignee => (
                                        <Table.Row key={assignee.name}>
                                            <Table.Cell>{assignee.name}</Table.Cell>
                                            <Table.Cell>{assignee.total}</Table.Cell>
                                            <Table.Cell>{assignee.new}</Table.Cell>
                                            <Table.Cell>{assignee.pending}</Table.Cell>
                                            <Table.Cell>{assignee.ongoing}</Table.Cell>
                                            <Table.Cell>{assignee.completed}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Segment>
                            <Header as="h3">Tickets by Company</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Company</Table.HeaderCell>
                                        <Table.HeaderCell>Total</Table.HeaderCell>
                                        <Table.HeaderCell>Open</Table.HeaderCell>
                                        <Table.HeaderCell>Pending</Table.HeaderCell>
                                        <Table.HeaderCell>Ongoing</Table.HeaderCell>
                                        <Table.HeaderCell>Completed</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {companyStats.map(company => (
                                        <Table.Row key={company.name}>
                                            <Table.Cell>{company.name}</Table.Cell>
                                            <Table.Cell>{company.total}</Table.Cell>
                                            <Table.Cell>{company.new}</Table.Cell>
                                            <Table.Cell>{company.pending}</Table.Cell>
                                            <Table.Cell>{company.ongoing}</Table.Cell>
                                            <Table.Cell>{company.completed}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                {/* Recent Tickets */}
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header as="h3">Recent Tickets</Header>
                            <Card.Group>
                                {recentTickets.map(ticket => (
                                    <Card key={ticket.id} fluid>
                                        <Card.Content>
                                            <Label ribbon color={getStatusColor(ticket.status)}>
                                                {ticket.status.toUpperCase()}
                                            </Label>
                                            <Card.Header>
                                                <span style={{ marginRight: '10px' }}>#{ticket.id}</span>
                                                {getPriorityLabel(ticket.priority)} {ticket.category}
                                            </Card.Header>
                                            <Card.Meta>
                                                <span>Submitted: {formatDate(ticket.date)}</span>
                                            </Card.Meta>
                                            <Card.Description>
                                                <p>{ticket.description}</p>
                                                <Divider />
                                                <Grid columns={2}>
                                                    <Grid.Column>
                                                        <Icon name="user" /> {ticket.name}
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Icon name="building" /> {ticket.company}
                                                    </Grid.Column>
                                                </Grid>
                                                <Grid columns={2}>
                                                    <Grid.Column>
                                                        <Icon name="user circle" /> Assigned to: {ticket.assignee}
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Icon name="folder" /> Project: {ticket.project}
                                                    </Grid.Column>
                                                </Grid>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                      <span>
                        <Icon name="clock" />
                        Last updated: {ticket.lastUpdated}
                      </span>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                {/* Ticket Category Distribution */}
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header as="h3">Ticket Categories</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Category</Table.HeaderCell>
                                        <Table.HeaderCell>Count</Table.HeaderCell>
                                        <Table.HeaderCell>Percentage</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {[...new Set(tickets.map(t => t.category))].map(category => {
                                        const count = tickets.filter(t => t.category === category).length;
                                        const percentage = ((count / totalTickets) * 100).toFixed(1);
                                        return (
                                            <Table.Row key={category}>
                                                <Table.Cell>{category}</Table.Cell>
                                                <Table.Cell>{count}</Table.Cell>
                                                <Table.Cell>
                                                    {percentage}%
                                                    <Progress percent={parseFloat(percentage)} size="tiny" />
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default TicketingDashboard;