import React, { useState } from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import "../css/styles.css";
import {
    Table,
    TableCell,
    Button,
    Segment,
    Icon,
    Input,
    Checkbox, Modal, Form, Grid, Dropdown
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const initialCompanies = [
    {
        id: 123456,
        name: "Trixie Hale",
        email: "trixie@email.com",
        contact: "0987654321",
        date: "Jan 24, 2025",
        category: "Software Issue",
        description: "Matthew has software issues.",
        status: "pending",
        companyName: "Company 1",
    },
    {
        id: 123457,
        name: "Patrick Ace",
        email: "hotpatrick@email.com",
        contact: "0987654321",
        date: "Jan 25, 2025",
        category: "Hardware Issue",
        description: "John has trouble with his laptop screen.",
        status: "ongoing",
        companyName: "Company 3",
    },
    {
        id: 123458,
        name: "Spongebob Borite",
        email: "spongebobgwapo@email.com",
        contact: "0987654321",
        date: "Jan 26, 2025",
        category: "Network Issue",
        description: "Sarah's internet connection is unstable.",
        status: "completed",
        companyName: "Company 1",
    },
    {
        id: 123459,
        name: "Sunjae Ryu",
        email: "sunjaemasgwapo@email.com",
        contact: "0987654321",
        date: "Jan 27, 2025",
        category: "Account Issue",
        description: "Mike cannot access his account.",
        status: "started",
        companyName: "Company 2",
    },
];

const accountInfoOptions=[
    { key: "1", text: "Account info 1", value: "Admin" },
    { key: "2", text: "Account info 2", value: "User" },
    { key: "3", text: "Account info 3", value: "Guest" },
]

const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);

const Company = () => {
    const [companies, setCompanies] = useState(initialCompanies);
    const [showForm, setShowForm] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showEditCompanyForm, setShowEditCompanyForm] = useState(false);
    const navigate = useNavigate();
    const [showTicketHistory, setShowTicketHistory] = useState(false);
    const [formData, setFormData] = useState({
        name: "", companyName: "", email: "", contact: "", address: "", accountInfo: ""
    });
    const [searchQuery, setSearchQuery] = useState("");

    const toggleForm = () => {
        setShowForm(!showForm);
        setEditingCompany(null);
        setFormData({ name: "", companyName: "", email: "", contact: "", address: "", accountInfo: "" });
    };

    const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (editingCompany) {
            setCompanies(companies.map(c => (c.id === editingCompany.id ? { ...formData, id: editingCompany.id } : c)));
        } else {
            setCompanies([...companies, { ...formData, id: generateRandomId() }]);
        }
        toggleForm();
    };

    const openEditCompanyForm = (company) => {
        setEditingCompany(company);
        setFormData(company);
        setShowEditCompanyForm(true);
    };

    const handleEditCompany = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const saveEditCompany = () => {
        setCompanies(companies.map(company => (company.id === formData.id ? formData : company)));
        setShowEditCompanyForm(false);
    };

    const openTicketHistory = (companyName) => {
        setSelectedCompany(companyName);
        setShowTicketHistory(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCompanies = companies.filter(company =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="page-container">
                <div className="content-wrapper">
                    <Segment basic>
                        <div style={{float: "right"}}>
                            <Input
                                icon='search'
                                placeholder='Search...'
                                style={{width: "300px", marginRight: "30px", marginBottom: "30px"}}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button onClick={toggleForm}>Add Company</Button>
                        </div>

                        {/* Add Company Form */}
                        <Modal open={showForm} onClose={toggleForm} size="small">
                            <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>
                                ADD COMPANY
                            </Modal.Header>

                            <Modal.Content>
                                <div style={{ maxHeight: "400px", paddingRight: "10px" }}>
                                    <Form>
                                        {/* Contact Person Details */}
                                        <h4>Company Details</h4>

                                        <Grid columns={3} stackable>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Form.Input label="Company Name" placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleChange}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Form.Input label="Contact Person" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Form.Input label="Contact Number" placeholder="Contact Number" name="contact" value={formData.contact} onChange={handleChange}/>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Grid columns={3} stackable style={{marginBottom:"5px"}}>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Form.Input label="Email Address" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <div><p><strong>Account Information</strong></p></div>
                                                    <Dropdown placeholder="Specify" openOnFocus selection options={accountInfoOptions} name="accountInfo" value={formData.accountInfo} onChange={(e, { value }) => setFormData({ ...formData, accountInfo: value })}/>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Form.Input label="Address" placeholder="Address" name="address" value={formData.address} onChange={handleChange}/>
                                    </Form>
                                </div>
                            </Modal.Content>

                            {/* Modal Actions (Buttons) */}
                            <Modal.Actions>
                                <Button basic onClick={toggleForm}>
                                    CANCEL
                                </Button>
                                <Button onClick={handleSave}>
                                    ADD
                                </Button>
                            </Modal.Actions>
                        </Modal>

                        {/* Edit Company Form */}
                        <Modal open={showEditCompanyForm} onClose={() => setShowEditCompanyForm(false)} size="small">
                            <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>
                                EDIT COMPANY
                            </Modal.Header>

                            <Modal.Content>
                                <div style={{ maxHeight: "400px", paddingRight: "10px" }}>
                                    <Form>
                                        {/* Contact Person Details */}
                                        <h4>Company Details</h4>

                                        <Grid columns={3} stackable>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Form.Input label="Company Name" placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleEditCompany}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Form.Input label="Contact Person" placeholder="Full Name" name="name" value={formData.name} onChange={handleEditCompany}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Form.Input label="Contact Number" placeholder="Contact Number" name="contact" value={formData.contact} onChange={handleEditCompany}/>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Grid columns={3} stackable style={{marginBottom:"5px"}}>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Form.Input label="Email Address" placeholder="Email Address" name="email" value={formData.email} onChange={handleEditCompany}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <div><p><strong>Account Information</strong></p></div>
                                                    <Dropdown placeholder="Specify" openOnFocus selection options={accountInfoOptions} name="accountInfo" value={formData.accountInfo} onChange={(e, { value }) => setFormData({ ...formData, accountInfo: value })}/>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Form.Input label="Address" placeholder="Address" name="address" value={formData.address} onChange={handleEditCompany} />
                                    </Form>
                                </div>
                            </Modal.Content>

                            {/* Modal Actions (Buttons) */}
                            <Modal.Actions>
                                <Button basic onClick={() => setShowEditCompanyForm(false)}>
                                    CANCEL
                                </Button>
                                <Button onClick={saveEditCompany}>
                                    SAVE
                                </Button>
                            </Modal.Actions>
                        </Modal>

                        <div className="table-container">
                            <Table celled selectable className="striped-table">
                                <Table.Header className="fixed-header">
                                    <Table.Row>
                                        <Table.HeaderCell>Company</Table.HeaderCell>
                                        <Table.HeaderCell>Contact/Location</Table.HeaderCell>
                                        <Table.HeaderCell>Account Information</Table.HeaderCell>
                                        <Table.HeaderCell style={{width: "50px"}}>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {filteredCompanies.map((company) => (
                                        <Table.Row key={company.id} onClick={() => openTicketHistory(company.companyName)} style={{ cursor: "pointer"}}>
                                            <Table.Cell>
                                                <div>{company.companyName}</div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div>{company.name}</div>
                                                <div style={{color: "gray", fontSize: "0.9em"}}>
                                                    <Icon name="map marker alternate" style={{marginLeft: "10px"}}/> Cebu
                                                    City &nbsp;
                                                    <Icon name="mail" style={{marginLeft: "10px"}}/> {company.email}
                                                    <Icon name="phone" style={{marginLeft: "10px"}}/> {company.contact}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                            <TableCell>
                                                <div style={{
                                                    display: "flex",
                                                    alignContent: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <Icon name="edit" onClick={() => openEditCompanyForm(company)} style={{ cursor: "pointer" }} />
                                                    <Icon name="trash"/>
                                                </div>
                                            </TableCell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </Segment>

                    {/* Ticket History Modal*/}
                    <Modal open={showTicketHistory} onClose={() => setShowTicketHistory(false)}>
                        <Modal.Header>Ticket History for {selectedCompany}</Modal.Header>
                        <Modal.Content>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Category</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {initialCompanies.filter(ticket => ticket.companyName === selectedCompany).map(ticket => (
                                        <Table.Row key={ticket.id}>
                                            <Table.Cell>{ticket.date}</Table.Cell>
                                            <Table.Cell>{ticket.category}</Table.Cell>
                                            <Table.Cell>{ticket.description}</Table.Cell>
                                            <Table.Cell>{ticket.status}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => setShowTicketHistory(false)}>Close</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Company;