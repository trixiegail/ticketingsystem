import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Segment,
    Statistic,
    Header,
    Table,
    Menu,
    Icon,
    Dropdown,
    Button,
    Card,
    Divider,
    Label,
    Progress,
    Tab
} from "semantic-ui-react";
import { Pie, Bar } from "react-chartjs-2";
import DashboardLayout from "../Dashboard/DashboardLayout";

// Sample data from your ticket.js file
const tickets = [
    { id: 123456, name: "Trixie Hale", email: "trixie@email.com", address:"Talisay,Cebu", date: "Jan 24, 2025", category: "Software Issue", description: "Matthew has software issues.", status: "pending", statusColor: "red", company: "Company 1", priority: "high", lastUpdated: "Jan 24, 2025", history: [{ previousStatus: "new", newStatus: "pending", timestamp: "Jan 24, 2025, 10:00 AM" }], project: "Support", assignee: "Mark Keifer Watson"},
    { id: 123457, name: "Patrick Ace", email: "patrick@email.com", address:"Cebu City,Cebu", date: "Jan 25, 2025", category: "Hardware Issue", description: "John has trouble with his laptop screen.", status: "ongoing", statusColor: "green", company: "Company 3", priority: "low", lastUpdated: "Feb 2, 2025", history: [{ previousStatus: "new", newStatus: "pending", timestamp: "Jan 24, 2025, 10:00 AM" }], project: "Support", assignee: "Yuri Hwang"},
    { id: 123458, name: "Spongebob Borite", email: "spongebob@email.com", address:"Mandaue,Cebu", date: "March 26, 2024", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "completed", statusColor: "yellow", company: "Company 1", priority: "medium", lastUpdated: "June 2, 2023", history: [], project: "Support", assignee: "Ella Tuhong"},
    { id: 123459, name: "Sunjae Ryu", email: "sunjae@email.com", address:"Mandaue,Cebu", date: "Jan 27, 2024", category: "Account Issue", description: "Mike cannot access his account.", status: "ongoing", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "July 19, 2024", history: [], project: "Billing", assignee: "Elijah Almaden"},
    { id: 123460, name: "Im Sol", email: "spongebob@email.com", address:"Talisay,Cebu", date: "Apr 26, 2024", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "completed", statusColor: "green", company: "Company 1", priority: "low", lastUpdated: "August 12, 2024", history: [], project: "Billing", assignee: "Bob Stewarts"},
    { id: 123461, name: "Kim Taesung", email: "kimtaesung@email.com", address:"Cebu City,Cebu", date: "Jan 27, 2024", category: "Account Issue", description: "Mike cannot access his account.", status: "ongoing", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "October 23, 2024", history: [], project: "Billing", assignee: "Jurisdicio Macalos"},
    { id: 123462, name: "Jeon Jungkook", email: "jungkook@email.com", address:"Cebu City,Cebu", date: "Jan 27, 2024", category: "Account Issue", description: "Mike cannot access his account.", status: "new", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "February 17, 2024", history: [], project: "Support", assignee: "Jackielou Quilantang"},
];

// Extract unique assignees and companies
const assignees = [...new Set(tickets.map(ticket => ticket.assignee))];
const companies = [...new Set(tickets.map(ticket => ticket.company))];

const Dashboard = () => {
    const [activeView, setActiveView] = useState('overview');
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [selectedCompany, setSelectedCompany] = useState('all');
    const [selectedAssignee, setSelectedAssignee] = useState('all');

    // Calculate statistics
    const totalTickets = tickets.length;
    const newTickets = tickets.filter(t => t.status === "new").length;
    const pendingTickets = tickets.filter(t => t.status === "pending").length;
    const ongoingTickets = tickets.filter(t => t.status === "ongoing").length;
    const completedTickets = tickets.filter(t => t.status === "completed").length;

    // Recent tickets (last 5)
    const recentTickets = [...tickets]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Filter options
    const periodOptions = [
        { key: 'all', text: 'All Time', value: 'all' },
        { key: 'week', text: 'Last Week', value: 'week' },
        { key: 'month', text: 'Last Month', value: 'month' },
        { key: 'quarter', text: 'Last Quarter', value: 'quarter' }
    ];

    const companyOptions = [
        { key: 'all', text: 'All Companies', value: 'all' },
        ...companies.map((company, index) => ({
            key: index,
            text: company,
            value: company
        }))
    ];

    const assigneeOptions = [
        { key: 'all', text: 'All Assignees', value: 'all' },
        ...assignees.map((assignee, index) => ({
            key: index,
            text: assignee,
            value: assignee
        }))
    ];

    // Calculate company statistics
    const companyStats = companies.map(company => {
        const companyTickets = tickets.filter(t => t.company === company);
        return {
            company,
            total: companyTickets.length,
            new: companyTickets.filter(t => t.status === "new").length,
            pending: companyTickets.filter(t => t.status === "pending").length,
            ongoing: companyTickets.filter(t => t.status === "ongoing").length,
            completed: companyTickets.filter(t => t.status === "completed").length
        };
    });

    // Calculate assignee statistics
    const assigneeStats = assignees.map(assignee => {
        const assigneeTickets = tickets.filter(t => t.assignee === assignee);
        return {
            assignee,
            total: assigneeTickets.length,
            new: assigneeTickets.filter(t => t.status === "new").length,
            pending: assigneeTickets.filter(t => t.status === "pending").length,
            ongoing: assigneeTickets.filter(t => t.status === "ongoing").length,
            completed: assigneeTickets.filter(t => t.status === "completed").length
        };
    });

    // Chart data
    const statusData = {
        labels: ['New', 'Pending', 'Ongoing', 'Completed'],
        datasets: [
            {
                data: [newTickets, pendingTickets, ongoingTickets, completedTickets],
                backgroundColor: ['#1E88E5', '#FFC107', '#FF9800', '#4CAF50'],
                hoverBackgroundColor: ['#1976D2', '#FFB300', '#F57C00', '#388E3C']
            }
        ]
    };

    const companyTicketsData = {
        labels: companies,
        datasets: [
            {
                label: 'Total Tickets',
                backgroundColor: '#36A2EB',
                data: companies.map(company =>
                    tickets.filter(t => t.company === company).length
                )
            }
        ]
    };

    const assigneeTicketsData = {
        labels: assignees,
        datasets: [
            {
                label: 'Total Tickets',
                backgroundColor: '#FF6384',
                data: assignees.map(assignee =>
                    tickets.filter(t => t.assignee === assignee).length
                )
            }
        ]
    };

    // Tab panes
    const panes = [
        {
            menuItem: 'Company Overview',
            render: () => (
                <Tab.Pane attached={false}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Total Tickets</Table.HeaderCell>
                                <Table.HeaderCell>New</Table.HeaderCell>
                                <Table.HeaderCell>Pending</Table.HeaderCell>
                                <Table.HeaderCell>Ongoing</Table.HeaderCell>
                                <Table.HeaderCell>Completed</Table.HeaderCell>
                                <Table.HeaderCell>Completion Rate</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {companyStats.map((stat, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{stat.company}</Table.Cell>
                                    <Table.Cell>{stat.total}</Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="blue">{stat.new}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="yellow">{stat.pending}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="orange">{stat.ongoing}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="green">{stat.completed}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Progress percent={Math.round((stat.completed / stat.total) * 100)} success size="tiny" />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Assignee Overview',
            render: () => (
                <Tab.Pane attached={false}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Assignee</Table.HeaderCell>
                                <Table.HeaderCell>Total Tickets</Table.HeaderCell>
                                <Table.HeaderCell>New</Table.HeaderCell>
                                <Table.HeaderCell>Pending</Table.HeaderCell>
                                <Table.HeaderCell>Ongoing</Table.HeaderCell>
                                <Table.HeaderCell>Completed</Table.HeaderCell>
                                <Table.HeaderCell>Completion Rate</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {assigneeStats.map((stat, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{stat.assignee}</Table.Cell>
                                    <Table.Cell>{stat.total}</Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="blue">{stat.new}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="yellow">{stat.pending}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="orange">{stat.ongoing}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="green">{stat.completed}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Progress percent={Math.round((stat.completed / stat.total) * 100)} success size="tiny" />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Tab.Pane>
            ),
        }
    ];

    return (
        <DashboardLayout>
            <Container fluid style={{ padding: "20px" }}>
                <Header as="h1" dividing>
                    <Icon name="dashboard" />
                    <Header.Content>
                        Ticketing System Dashboard
                        <Header.Subheader>Monitor tickets, assignees, and companies</Header.Subheader>
                    </Header.Content>
                </Header>

                <Menu secondary>
                    <Menu.Item
                        name='overview'
                        active={activeView === 'overview'}
                        onClick={() => setActiveView('overview')}
                    />
                    <Menu.Item
                        name='assignees'
                        active={activeView === 'assignees'}
                        onClick={() => setActiveView('assignees')}
                    />
                    <Menu.Item
                        name='companies'
                        active={activeView === 'companies'}
                        onClick={() => setActiveView('companies')}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Dropdown
                                placeholder='Time Period'
                                selection
                                options={periodOptions}
                                value={filterPeriod}
                                onChange={(e, { value }) => setFilterPeriod(value)}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
                                placeholder='Company'
                                selection
                                options={companyOptions}
                                value={selectedCompany}
                                onChange={(e, { value }) => setSelectedCompany(value)}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
                                placeholder='Assignee'
                                selection
                                options={assigneeOptions}
                                value={selectedAssignee}
                                onChange={(e, { value }) => setSelectedAssignee(value)}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Button primary>
                                <Icon name="sync" /> Refresh
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                {activeView === 'overview' && (
                    <>
                        <Grid columns={4} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Segment padded>
                                        <Label attached='top' color="blue">Total Tickets</Label>
                                        <Statistic>
                                            <Statistic.Value>{totalTickets}</Statistic.Value>
                                            <Statistic.Label>Tickets</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment padded>
                                        <Label attached='top' color="teal">Unique Companies</Label>
                                        <Statistic>
                                            <Statistic.Value>{companies.length}</Statistic.Value>
                                            <Statistic.Label>Companies</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment padded>
                                        <Label attached='top' color="purple">Support Agents</Label>
                                        <Statistic>
                                            <Statistic.Value>{assignees.length}</Statistic.Value>
                                            <Statistic.Label>Assignees</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment padded>
                                        <Label attached='top' color="green">Completion Rate</Label>
                                        <Statistic>
                                            <Statistic.Value>
                                                {Math.round((completedTickets / totalTickets) * 100)}%
                                            </Statistic.Value>
                                            <Statistic.Label>Completed</Statistic.Label>
                                        </Statistic>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid columns={4} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Card fluid color="blue">
                                        <Card.Content>
                                            <Card.Header>New</Card.Header>
                                            <Card.Description>
                                                <Statistic size="tiny">
                                                    <Statistic.Value>{newTickets}</Statistic.Value>
                                                    <Statistic.Label>Tickets</Statistic.Label>
                                                </Statistic>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='file' />
                                            {Math.round((newTickets / totalTickets) * 100)}% of total
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid color="yellow">
                                        <Card.Content>
                                            <Card.Header>Pending</Card.Header>
                                            <Card.Description>
                                                <Statistic size="tiny">
                                                    <Statistic.Value>{pendingTickets}</Statistic.Value>
                                                    <Statistic.Label>Tickets</Statistic.Label>
                                                </Statistic>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='clock' />
                                            {Math.round((pendingTickets / totalTickets) * 100)}% of total
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid color="orange">
                                        <Card.Content>
                                            <Card.Header>Ongoing</Card.Header>
                                            <Card.Description>
                                                <Statistic size="tiny">
                                                    <Statistic.Value>{ongoingTickets}</Statistic.Value>
                                                    <Statistic.Label>Tickets</Statistic.Label>
                                                </Statistic>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='spinner' />
                                            {Math.round((ongoingTickets / totalTickets) * 100)}% of total
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid color="green">
                                        <Card.Content>
                                            <Card.Header>Completed</Card.Header>
                                            <Card.Description>
                                                <Statistic size="tiny">
                                                    <Statistic.Value>{completedTickets}</Statistic.Value>
                                                    <Statistic.Label>Tickets</Statistic.Label>
                                                </Statistic>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='check circle' />
                                            {Math.round((completedTickets / totalTickets) * 100)}% of total
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid columns={2} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Segment>
                                        <Header as="h3">Ticket Status Distribution</Header>
                                        <Pie data={statusData} />
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Header as="h3">Recent Tickets</Header>
                                        <Table celled>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                                    <Table.HeaderCell>Assignee</Table.HeaderCell>
                                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {recentTickets.map(ticket => (
                                                    <Table.Row key={ticket.id}>
                                                        <Table.Cell>{ticket.id}</Table.Cell>
                                                        <Table.Cell>{ticket.date}</Table.Cell>
                                                        <Table.Cell>{ticket.company}</Table.Cell>
                                                        <Table.Cell>{ticket.assignee}</Table.Cell>
                                                        <Table.Cell>
                                                            <Label color={
                                                                ticket.status === 'new' ? 'blue' :
                                                                    ticket.status === 'pending' ? 'yellow' :
                                                                        ticket.status === 'ongoing' ? 'orange' : 'green'
                                                            }>
                                                                {ticket.status}
                                                            </Label>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='bar chart' />
                                Detailed Statistics
                            </Header>
                        </Divider>

                        <Tab panes={panes} />
                    </>
                )}

                {activeView === 'assignees' && (
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Segment>
                                    <Header as="h3">Tickets per Assignee</Header>
                                    <Bar
                                        data={assigneeTicketsData}
                                        options={{
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Segment>
                                    <Header as="h3">Assignee Performance</Header>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Assignee</Table.HeaderCell>
                                                <Table.HeaderCell>Total</Table.HeaderCell>
                                                <Table.HeaderCell>New</Table.HeaderCell>
                                                <Table.HeaderCell>Pending</Table.HeaderCell>
                                                <Table.HeaderCell>Ongoing</Table.HeaderCell>
                                                <Table.HeaderCell>Completed</Table.HeaderCell>
                                                <Table.HeaderCell>Efficiency</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {assigneeStats
                                                .sort((a, b) => b.completed - a.completed)
                                                .map((stat, index) => (
                                                    <Table.Row key={index}>
                                                        <Table.Cell>{stat.assignee}</Table.Cell>
                                                        <Table.Cell>{stat.total}</Table.Cell>
                                                        <Table.Cell>{stat.new}</Table.Cell>
                                                        <Table.Cell>{stat.pending}</Table.Cell>
                                                        <Table.Cell>{stat.ongoing}</Table.Cell>
                                                        <Table.Cell>{stat.completed}</Table.Cell>
                                                        <Table.Cell>
                                                            <Progress
                                                                percent={Math.round((stat.completed / stat.total) * 100)}
                                                                size="tiny"
                                                                color={
                                                                    (stat.completed / stat.total) > 0.7 ? 'green' :
                                                                        (stat.completed / stat.total) > 0.4 ? 'yellow' : 'red'
                                                                }
                                                            />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}

                {activeView === 'companies' && (
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Segment>
                                    <Header as="h3">Tickets per Company</Header>
                                    <Bar
                                        data={companyTicketsData}
                                        options={{
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Segment>
                                    <Header as="h3">Company Ticket Distribution</Header>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Company</Table.HeaderCell>
                                                <Table.HeaderCell>Total Tickets</Table.HeaderCell>
                                                <Table.HeaderCell>Status Distribution</Table.HeaderCell>
                                                <Table.HeaderCell>Priority Overview</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {companyStats.map((stat, index) => {
                                                const companyTickets = tickets.filter(t => t.company === stat.company);
                                                const highPriority = companyTickets.filter(t => t.priority === "high").length;
                                                const mediumPriority = companyTickets.filter(t => t.priority === "medium").length;
                                                const lowPriority = companyTickets.filter(t => t.priority === "low").length;

                                                return (
                                                    <Table.Row key={index}>
                                                        <Table.Cell>{stat.company}</Table.Cell>
                                                        <Table.Cell>{stat.total}</Table.Cell>
                                                        <Table.Cell>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                                <Label size="tiny" color="blue">New: {stat.new}</Label>
                                                                <Label size="tiny" color="yellow">Pending: {stat.pending}</Label>
                                                                <Label size="tiny" color="orange">Ongoing: {stat.ongoing}</Label>
                                                                <Label size="tiny" color="green">Completed: {stat.completed}</Label>
                                                            </div>
                                                            <Progress multi>
                                                                <Progress.Bar color='blue' value={stat.new} total={stat.total} />
                                                                <Progress.Bar color='yellow' value={stat.pending} total={stat.total} />
                                                                <Progress.Bar color='orange' value={stat.ongoing} total={stat.total} />
                                                                <Progress.Bar color='green' value={stat.completed} total={stat.total} />
                                                            </Progress>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                                <Label size="tiny" color="red">High: {highPriority}</Label>
                                                                <Label size="tiny" color="yellow">Medium: {mediumPriority}</Label>
                                                                <Label size="tiny" color="green">Low: {lowPriority}</Label>
                                                            </div>
                                                            <Progress multi>
                                                                <Progress.Bar color='red' value={highPriority} total={stat.total} />
                                                                <Progress.Bar color='yellow' value={mediumPriority} total={stat.total} />
                                                                <Progress.Bar color='green' value={lowPriority} total={stat.total} />
                                                            </Progress>
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
                )}
            </Container>
        </DashboardLayout>
    );
};

export default Dashboard;