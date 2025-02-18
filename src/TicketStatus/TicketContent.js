import React, { useState } from 'react';
import { Table, TableRow, TableCell, TableBody, Dropdown, Icon, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardLayout from "../Dashboard/DashboardLayout";
import { useParams } from "react-router-dom";

// Dummy Ticket Data
const tickets = [
    { id: 123456, fullname: "Trixie Hale", email: "trixie@email.com", contact: "0987654321", category: "Software Issue", description: "Matthew has software issues.", status: "Started", statusColor: "blue", priority: "High", date:"12/15/2024", assigneeId: 1, company: "Company 1" },
    { id: 123457, fullname: "Spongebob Borite", email: "spongebobgwapo@email.com", contact: "0987654321", category: "Hardware Issue", description: "John has trouble with his laptop screen.", status: "Ongoing", statusColor: "red", priority: "Medium", date:"06/11/2023", scheduledDate: "12/10/2024", assigneeId: 2, company: "Company 1" },
    { id: 123458, fullname: "Patrick Ace", email: "patrickgwapo@email.com", contact: "0987654321", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "Completed", statusColor: "yellow", priority: "Low", date:"02/08/2022", scheduledDate: "12/20/2024", assigneeId: 1, company: "Company 1" },
    { id: 123459, fullname: "Sunjae Ryu", email: "sunjaemasgwapo@email.com", contact: "0987654321", category: "Account Issue", description: "Mike cannot access his account.", status: "Started", statusColor: "green", priority: "High", date:"05/02/2021", scheduledDate: "12/18/2024", assigneeId: 2, company: "Company 1" },
];

// Dummy Assignee Data
const assignees = [
    { id: 1, name: "Steve Sanders", role: "Tech Support", department: "IT" },
    { id: 2, name: "Molly Thomas", role: "Tech Support", department: "IT" },
    { id: 3, name: "Jenny Lawrence", role: "Tech Support", department: "IT" },
    { id: 4, name: "David Miller", role: "Sales Support", department: "Sales" },
    { id: 5, name: "Sophia Johnson", role: "Sales Support", department: "Sales" },
    { id: 6, name: "Michael Brown", role: "Sales Support", department: "Sales" }
];

const TicketContent = () => {
    const [dateOfServicing, setDateOfServicing] = useState(null);
    const [expectedDeadline, setExpectedDeadline] = useState(null);
    const [project, setProject] = useState('');
    const [status, setStatus] = useState('New');
    const { id } = useParams();
    const ticket = tickets.find(t => t.id.toString() === id);
    const [assignedTo, setAssignedTo] = useState(ticket?.assigneeId || '');

    if (!ticket) return <h3 style={{ textAlign: "center" }}>Ticket Not Found</h3>;

    const handleProjectChange = (e, { value }) => {
        setProject(value);
        setStatus(value === 'Billing' ? 'Started' : 'In Progress');
    };

    const filteredAssignees = assignees.filter(a =>
        project === 'Billing' ? a.department === 'Sales' : a.department === 'IT'
    );

    const assigneeOptions = filteredAssignees.map(a => ({
        key: a.id,
        text: `${a.name} (${a.department})`,
        value: a.id
    }));

    // Find Assignee Info
    const assignedPerson = assignees.find(a => a.id === assignedTo);

    const projectOptions = [
        { key: 'p1', text: 'Billing', value: 'Billing' },
        { key: 'p2', text: 'Support', value: 'Support' }
    ];

    const statusOptions = [
        { key: 'new', text: 'New', value: 'New' },
        { key: 'pending', text: 'Pending', value: 'Pending' },
        { key: 'ongoing', text: 'Ongoing', value: 'Ongoing' },
        { key: 'completed', text: 'Completed', value: 'Completed' },
    ];

    const returntoTicket = () => {
        window.location.href = "/all-tickets";
    }

    return (
        <DashboardLayout>
                <Table celled style={{ borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", marginTop: "70px", marginLeft: "5px" }}>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan="4" style={{ backgroundColor: "#176D7F", color: "white", fontSize: "large" }}>
                                PROCESS COMPLAINT
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Date of Servicing:</strong></TableCell>
                            <TableCell>
                                <DatePicker selected={dateOfServicing} onChange={date => setDateOfServicing(date)} placeholderText="From" />
                            </TableCell>
                            <TableCell><strong>Expected Deadline:</strong></TableCell>
                            <TableCell>
                                <DatePicker selected={expectedDeadline} onChange={date => setExpectedDeadline(date)} placeholderText="From Date" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Project:</strong></TableCell>
                            <TableCell>
                                <Dropdown selection options={projectOptions} value={project} onChange={(e, { value }) => setProject(value)} placeholder="Select Project" />
                            </TableCell>
                            <TableCell><strong>Initial Status:</strong></TableCell>
                            <TableCell>
                                <Dropdown selection options={statusOptions} value={status} onChange={(e, { value }) => setStatus(value)} placeholder="Select Status" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Assignee:</strong></TableCell>
                            <TableCell colSpan="3">
                                <Dropdown selection options={assigneeOptions} value={assignedTo} onChange={(e, { value }) => setAssignedTo(value)} placeholder="Select Assignee" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="4" style={{ backgroundColor: "#F5F5F5" }}><strong>Complaint Information</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Ticket Subject:</strong></TableCell>
                            <TableCell>{ticket.category}</TableCell>
                            <TableCell><strong>Filed Date:</strong></TableCell>
                            <TableCell>{ticket.date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Ticket Details:</strong></TableCell>
                            <TableCell>{ticket.description}</TableCell>
                            <TableCell><strong>Nature of Accident:</strong></TableCell>
                            <TableCell>Dinanghag</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Severity:</strong></TableCell>
                            <TableCell>{ticket.priority}</TableCell>
                            <TableCell><strong>Device Info:</strong></TableCell>
                            <TableCell>samsung,SM-T515,MobilityManagerV.1.4.39</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="4" style={{ backgroundColor: "#F5F5F5" }}><strong>Contact Person</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Fullname:</strong></TableCell>
                            <TableCell>{ticket.fullname}</TableCell>
                            <TableCell><strong>Contact Info:</strong></TableCell>
                            <TableCell>
                                <Icon name="phone" /> {ticket.contact} <Icon name="mail" style={{marginLeft: "10px"}} /> {ticket.email}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>Address:</strong>
                            </TableCell>
                            <TableCell colSpan={3}>No address provided</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="4" style={{ backgroundColor: "#F5F5F5" }}><strong>Attachments</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="4">No attachments</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="4" style={{ textAlign: "right" }}>
                                <Button basic onClick={returntoTicket}>CANCEL</Button>
                                <Button onClick={returntoTicket}>SUBMIT</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
        </DashboardLayout>
    );
};

export default TicketContent;
