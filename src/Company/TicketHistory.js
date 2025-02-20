import React, { useState } from "react";
import { Table, Segment, Icon, Input, Dropdown } from "semantic-ui-react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import {useNavigate} from "react-router-dom";

const ticketStatusOptions = [
    { key: "pending", text: "Pending", value: "pending" },
    { key: "ongoing", text: "Ongoing", value: "ongoing" },
    { key: "completed", text: "Completed", value: "completed" },
    { key: "started", text: "Started", value: "started" },
];

const TicketHistory = ({ tickets }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredTickets = tickets.filter(ticket =>
        (ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? ticket.status === statusFilter : true)
    );

    return (
        <DashboardLayout>
            <div className="page-container">
                <div className="content-wrapper">
                    <Segment basic>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <Input
                                icon='search'
                                placeholder='Search by name, company, or category...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: "300px" }}
                            />
                            <Dropdown
                                placeholder='Filter by Status'
                                selection
                                options={ticketStatusOptions}
                                onChange={(e, { value }) => setStatusFilter(value)}
                                clearable
                            />
                        </div>

                        <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Ticket ID</Table.HeaderCell>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Contact Person</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {filteredTickets.map((ticket) => (
                                    <Table.Row key={ticket.id}>
                                        <Table.Cell>{ticket.id}</Table.Cell>
                                        <Table.Cell>{ticket.companyName}</Table.Cell>
                                        <Table.Cell>{ticket.name}</Table.Cell>
                                        <Table.Cell>{ticket.email}</Table.Cell>
                                        <Table.Cell>{ticket.category}</Table.Cell>
                                        <Table.Cell>{ticket.description}</Table.Cell>
                                        <Table.Cell>{ticket.date}</Table.Cell>
                                        <Table.Cell>{ticket.status}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Segment>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TicketHistory;