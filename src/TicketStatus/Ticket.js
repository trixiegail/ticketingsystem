import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../css/styles.css";
import {
    Input,
    Dropdown,
    Button,
    Icon,
    Table, TableCell, Label,
} from "semantic-ui-react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import TicketMenu from "../Components/TicketMenu";
import TicketDetails from "./TicketDetails";
import StatusChangeModal from "../Components/StatusChangeModal";
import AddTicketModal from "./AddTicketModal";

const PRIORITY_DEADLINES = {
    high: 24, // 1 day in hours
    medium: 72, // 3 days in hours
    low: 120 // 5 days in hours
};

// Function to check if a ticket is overdue based on its priority
const isTicketOverdue = (ticket) => {
    if (!ticket.date || !ticket.priority || ticket.status === "completed") {
        return false;
    }

    const submissionDate = new Date(ticket.date);
    const currentDate = new Date();
    const hoursDifference = (currentDate - submissionDate) / (1000 * 60 * 60);
    const deadlineHours = PRIORITY_DEADLINES[ticket.priority];

    return hoursDifference > deadlineHours;
};

// Warning threshold (percentage of deadline when ticket should show yellow)
const WARNING_THRESHOLD = 0.25; // 25% of time remaining

const options = [
    { key: 'placeholder', text: 'Select Priority', value: '' },  // Placeholder added
    { key: 1, text: "High", value: "high", label: { color: "red", empty: true, circular: true } },
    { key: 2, text: "Medium", value: "medium", label: { color: "yellow", empty: true, circular: true } },
    { key: 3, text: "Low", value: "low", label: { color: "green", empty: true, circular: true } },
];

const statusOptions = [
    { key: "new", text: "New", value: "new" },
    { key: "pending", text: "Pending", value: "pending" },
    { key: "ongoing", text: "Ongoing", value: "ongoing" },
    { key: "completed", text: "Completed", value: "completed" },
];

const natureOfAccidentOptions = [
    { key: 1, text: "Accident 1", value: "Accident 1" },
    { key: 2, text: "Accident 2", value: "Accident 2" },
    { key: 3, text: "Accident 3", value: "Accident 3" },
]

const companyList=[
    {key:1, text:"Company 1", value:"Company 1"},
    {key:2, text:"Company 2", value:"Company 2"},
    {key:3, text:"Company 3", value:"Company 3"}
]

const tickets = [
    { id: 123456, name: "Trixie Hale", email: "trixie@email.com", address:"Talisay,Cebu", date: "Jan 24, 2025", category: "Software Issue", description: "Matthew has software issues. Matthew has software issues. Matthew has software issues.", status: "pending", statusColor: "red", company: "Company 1", priority: "high", lastUpdated: "Jan 24, 2025",
        history: [
            { previousStatus: "new", newStatus: "pending", timestamp: "Jan 24, 2025, 10:00 AM" },
        ], project: "Support",},
    { id: 123457, name: "Patrick Ace", email: "patrick@email.com", address:"Cebu City,Cebu", date: "Jan 25, 2025", category: "Hardware Issue", description: "John has trouble with his laptop screen.", status: "ongoing", statusColor: "green", company: "Company 3", priority: "low", lastUpdated: "Feb 2, 2025",
        history: [
            { previousStatus: "new", newStatus: "pending", timestamp: "Jan 24, 2025, 10:00 AM" },
        ], project: "Support",},
    { id: 123458, name: "Spongebob Borite", email: "spongebob@email.com", address:"Mandaue,Cebu", date: "March 26, 2025", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "completed", statusColor: "yellow", company: "Company 1", priority: "medium", lastUpdated: "June 2, 2025",
        history: [], project: "Support"},
    { id: 123459, name: "Sunjae Ryu", email: "sunjae@email.com", address:"Mandaue,Cebu", date: "Jan 27, 2025", category: "Account Issue", description: "Mike cannot access his account.", status: "ongoing", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "July 19, 2025",
        history: [], project: "Billing"},
    { id: 123460, name: "Im Sol", email: "spongebob@email.com", address:"Talisay,Cebu", date: "Apr 26, 2025", category: "Network Issue", description: "Sarah's internet connection is unstable.", status: "completed", statusColor: "green", company: "Company 1", priority: "low", lastUpdated: "August 12, 2025",
        history: [], project: "Billing"},
    { id: 123461, name: "Kim Taesung", email: "kimtaesung@email.com", address:"Cebu City,Cebu", date: "Jan 27, 2025", category: "Account Issue", description: "Mike cannot access his account.", status: "ongoing", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "October 23, 2025",
        history: [], project: "Billing"},
    { id: 123462, name: "Jeon Jungkook", email: "jungkook@email.com", address:"Cebu City,Cebu", date: "Jan 27, 2025", category: "Account Issue", description: "Mike cannot access his account.", status: "new", statusColor: "red", company: "Company 2", priority: "high", lastUpdated: "October 23, 2025",
        history: [], project: "Unassigned"},
];

const Ticket = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("all-tickets");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [addtickets, setAddTickets] = useState([]);
    const [incidentDate, setIncidentDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newTicketStatus, setNewTicketStatus] = useState(tickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [ticketToUpdate, setTicketToUpdate] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [newTicket, setNewTicket] = useState({
        subject: "",
        company: "",
        name: "",
        address: "",
        email: "",
        category: "",
        description: "",
        priority: "",
        date: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleString(),
        status: "new",
        statusColor: "",
        history: [],
        project: "",
        assignee: ""
    });

    useEffect(() => {
        console.log("Updated Tickets:", addtickets);
    }, [addtickets]);

    const handleItemMenu = (e, { name }) => setActiveMenu(name);
    const toggleForm = () => setShowForm(!showForm);

    // Function to get ticket deadline status
    const getDeadlineStatus = (ticket) => {
        if (!ticket.date || !ticket.priority || ticket.status === "completed") {
            return "green";
        }

        const submissionDate = new Date(ticket.date);
        const currentDate = new Date();
        const hoursDifference = (currentDate - submissionDate) / (1000 * 60 * 60);
        const deadlineHours = PRIORITY_DEADLINES[ticket.priority];
        const remainingHours = deadlineHours - hoursDifference;

        // If overdue
        if (remainingHours <= 0) {
            return "red";
        }

        // If less than WARNING_THRESHOLD of time remaining
        if (remainingHours <= (deadlineHours * WARNING_THRESHOLD)) {
            return "yellow";
        }

        // Plenty of time remaining
        return "green";
    };

    // Get time remaining message
    const getTimeStatus = (ticket) => {
        if (!ticket.date || !ticket.priority || ticket.status === "completed") {
            return "";
        }

        const submissionDate = new Date(ticket.date);
        const currentDate = new Date();
        const hoursDifference = (currentDate - submissionDate) / (1000 * 60 * 60);
        const deadlineHours = PRIORITY_DEADLINES[ticket.priority];
        const remainingHours = deadlineHours - hoursDifference;

        if (remainingHours <= 0) {
            const overdueDays = Math.abs(Math.floor(remainingHours / 24));
            const overdueHours = Math.abs(Math.floor(remainingHours % 24));
            return `Overdue by ${overdueDays}d ${overdueHours}h`;
        } else {
            const remainingDays = Math.floor(remainingHours / 24);
            const hours = Math.floor(remainingHours % 24);
            return `${remainingDays}d ${hours}h`;
        }
    };

    const countTickets = (status) => {
        const allTickets = [...newTicketStatus, ...addtickets];
        if (status === "all-tickets") {
            return allTickets.length;
        } else if (status === "completed" && selectedMonth && selectedYear) {
            return allTickets.filter(ticket =>
                ticket.status === status &&
                new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                new Date(ticket.date).getFullYear() === selectedYear
            ).length;
        } else if(status === "ongoing" && selectedMonth && selectedYear) {
            return allTickets.filter(ticket =>
                ticket.status === status &&
                new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                new Date(ticket.date).getFullYear() === selectedYear
            ).length;
        }
        else if(status === "pending" && selectedMonth && selectedYear) {
            return allTickets.filter(ticket =>
                ticket.status === status &&
                new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                new Date(ticket.date).getFullYear() === selectedYear
            ).length;
        }
        else if(status === "new" && selectedMonth && selectedYear) {
            return allTickets.filter(ticket =>
                ticket.status === status &&
                new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                new Date(ticket.date).getFullYear() === selectedYear
            ).length;
        }
        else if(status === "all-tickets" && selectedMonth && selectedYear) {
            return allTickets.filter(ticket =>
                ticket.status === status &&
                new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                new Date(ticket.date).getFullYear() === selectedYear
            ).length;
        }else {
            return allTickets.filter(ticket => ticket.status === status).length;
        }
    };

    const filteredTickets = [...newTicketStatus, ...addtickets]
        .filter(ticket => {
            if (activeMenu === "all-tickets") {
                if (selectedMonth && selectedYear) {
                    return new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                        new Date(ticket.date).getFullYear() === selectedYear;
                }
                return true;
            } else if (selectedMonth && selectedYear) {
                return ticket.status === activeMenu &&
                    new Date(ticket.date).toLocaleString('default', { month: 'long' }) === selectedMonth &&
                    new Date(ticket.date).getFullYear() === selectedYear;
            } else {
                return ticket.status === activeMenu;
            }
        })
        .filter(ticket => selectedPriority ? ticket.priority === selectedPriority : true)
        .filter(ticket => {
            const query = searchQuery.toLowerCase();
            return (
                ticket.company.toLowerCase().includes(query) ||
                ticket.name.toLowerCase().includes(query) ||
                ticket.category.toLowerCase().includes(query) ||
                ticket.id.toString().includes(query)
            );
        })
        .sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
        });

    const openTicket = (id) => {
        navigate(`/all-tickets/${id}`);
    };

    const handleMonthChange = (e, { value }) => {
        setSelectedMonth(value);
    };

    const handleYearChange = (e, { value }) => {
        setSelectedYear(value);
    };

    const handleInputChange = (e, { name, value }) => {
        let updatedTicket = { ...newTicket, [name]: value };

        if (name === "priority") {
            const priorityColors = { high: "red", medium: "yellow", low: "green" };
            updatedTicket.statusColor = priorityColors[value] || "black";
        }

        setNewTicket(updatedTicket);
    };

    const generateRandomId = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSubmit = () => {
        const newTicketWithId = {
            ...newTicket,
            id: generateRandomId(), // Ensure unique ID
            lastUpdated: new Date().toLocaleString(),
        };

        // Check if the ticket already exists to prevent duplicates
        if (!newTicketStatus.some(ticket => ticket.id === newTicketWithId.id)) {
            setNewTicketStatus(prevTickets => [...prevTickets, newTicketWithId]);
        }

        setNewTicket({
            subject: "",
            company: "",
            name: "",
            address: "",
            email: "",
            category: "",
            description: "",
            priority: "",
            date: new Date().toLocaleDateString(),
            lastUpdated: new Date().toLocaleString(),
            status: "pending",
            statusColor: "red",
            history: [],
            project: "",
            assignee: ""
        });

        toggleForm();
    };

    const updateTicketStatus = (ticketId, newStatus) => {
        const updateStatus = (ticketList) => {
            return ticketList.map(ticket => {
                if (ticket.id === ticketId) {
                    const newHistoryEntry = {
                        previousStatus: ticket.status,
                        newStatus,
                        timestamp: new Date().toLocaleString(),
                    };

                    return {
                        ...ticket,
                        status: newStatus,
                        lastUpdated: new Date().toLocaleString(),
                        history: [...ticket.history, newHistoryEntry],
                    };
                }
                return ticket;
            });
        };

        setNewTicketStatus(prevTickets => updateStatus(prevTickets));
        setAddTickets(prevTickets => updateStatus(prevTickets));
    };

    const handleStatusChange = (ticket, status) => {
        setTicketToUpdate(ticket);
        setNewStatus(status);
        setModalOpen(true);
    };

    const confirmStatusChange = () => {
        updateTicketStatus(ticketToUpdate.id, newStatus);
        setModalOpen(false);
        setTicketToUpdate(null);
        setNewStatus("");
    };


    return (
        <DashboardLayout>
            <div className="page-container">
                <div className="content-wrapper">
                        <div style={{marginBottom: "10px", marginTop: "20px"}}>
                            <Input icon="search" placeholder="Search..." value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)} style={{width: "650px"}}/>
                            <div style={{display: "flex", alignItems: "center", gap: "10px", float: "right"}}>
                                <Dropdown
                                    clearable
                                    placeholder="Select Priority"
                                    openOnFocus
                                    selection
                                    options={options}
                                    onChange={(e, {value}) => setSelectedPriority(value)}
                                    value={selectedPriority}
                                />

                                <Button color="black" floated="right" onClick={toggleForm}
                                        style={{backgroundColor: "#176D7F"}}>
                                    <Icon name="edit"/> Add Ticket
                                </Button>
                            </div>
                        </div>

                        <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", alignItems: "center", marginRight: "20px"}}>
                            <p style={{ margin: 0 }}>Priority Legend:</p>
                            <Label color="red" empty circular />
                            <p style={{ margin: 0 }}>High</p>
                            <Label color="yellow" empty circular />
                            <p style={{ margin: 0 }}>Medium</p>
                            <Label color="green" empty circular />
                            <p style={{ margin: 0 }}>Low</p>
                        </div>

                    <TicketMenu
                        activeMenu={activeMenu}
                        handleItemMenu={handleItemMenu}
                        ticketCounts={{
                            all: tickets.length + addtickets.length,
                            pending: countTickets("pending"),
                            ongoing: countTickets("ongoing"),
                            completed: countTickets("completed"),
                            new: countTickets("new")
                        }}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        handleMonthChange={handleMonthChange}
                        handleYearChange={handleYearChange}
                    />
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "10px"}}>


                    </div>
                    <div className="table-container-ticket">
                        <Table celled selectable>
                            <Table.Header className="fixed-header">
                                <Table.Row>
                                    <Table.HeaderCell width={2}>Ticket ID</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Company</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Contact/Location</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Project</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Category</Table.HeaderCell>
                                    <Table.HeaderCell width={3}>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Last Updated</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>History</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {filteredTickets.map(ticket => (
                                    <Table.Row key={ticket.id}
                                               style={{ cursor: "pointer" }}>
                                        <Table.Cell onClick={() => openTicket(ticket.id)}>
                                            <div>
                                                <Icon name="circle" color={ticket.statusColor}/>
                                                {ticket.id}
                                            </div>
                                            <div style={{
                                                color: isTicketOverdue(ticket) ? 'red' : 'gray',
                                                fontWeight: isTicketOverdue(ticket) ? 'bold' : 'normal',
                                                fontSize: "0.9em"
                                            }}>
                                                <Icon name="calendar" color={getDeadlineStatus(ticket)}/>
                                                {getTimeStatus(ticket)}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div>{ticket.company}</div>
                                            <div style={{color: "gray", fontSize: "0.9em"}}>
                                                Filed on {ticket.date}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div>{ticket.name}</div>
                                            <div style={{color: "gray", fontSize: "0.9em"}}>
                                                <Icon name="map marker alternate"/> {ticket.address} &nbsp;
                                            </div>
                                        </Table.Cell>
                                        <TableCell>
                                            <div>{ticket.project}</div>
                                            <div style={{color: "gray", fontSize: "0.9em"}}>
                                                <Icon name="user"/> {ticket.assignee} &nbsp;
                                            </div>
                                        </TableCell>
                                        <Table.Cell>{ticket.category}</Table.Cell>
                                        <Table.Cell>{ticket.description}</Table.Cell>
                                        <Table.Cell>
                                            <Dropdown
                                                options={statusOptions}
                                                value={ticket.status}
                                                onChange={(e, {value}) => handleStatusChange(ticket, value)}
                                                selection
                                            />
                                        </Table.Cell>
                                        <TableCell>{ticket.lastUpdated}</TableCell>
                                        <TableCell><Button onClick={() => setSelectedTicket(ticket)}>View
                                            History</Button></TableCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                    {selectedTicket && <TicketDetails ticket={selectedTicket} onClose={() => setSelectedTicket(null)}/>}

                    <AddTicketModal
                        showForm={showForm}
                        toggleForm={toggleForm}
                        newTicket={newTicket}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        companyList={companyList}
                        options={options}
                        natureOfAccidentOptions={natureOfAccidentOptions}
                        incidentDate={incidentDate}
                        setIncidentDate={setIncidentDate}
                    />

                    <StatusChangeModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        newStatus={newStatus}
                        confirmStatusChange={confirmStatusChange}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Ticket;
