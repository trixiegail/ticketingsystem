import React, { useState } from 'react';
import { Modal, Form, Button, Grid, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ticket from "./Ticket";

// Dummy Assignee Data
const assignees = [
    { id: 1, name: "Steve Sanders", role: "Tech Support", department: "IT" },
    { id: 2, name: "Molly Thomas", role: "Tech Support", department: "IT" },
    { id: 3, name: "Jenny Lawrence", role: "Tech Support", department: "IT" },
    { id: 4, name: "David Miller", role: "Sales Support", department: "Sales" },
    { id: 5, name: "Sophia Johnson", role: "Sales Support", department: "Sales" },
    { id: 6, name: "Michael Brown", role: "Sales Support", department: "Sales" }
];

const AddTicketModal = ({ showForm, toggleForm, newTicket, handleInputChange, handleSubmit, companyList, options, natureOfAccidentOptions, incidentDate, setIncidentDate }) => {
    const [project, setProject] = useState('');
    const [assignedTo, setAssignedTo] = useState(ticket?.assigneeId || '');
    const [status, setStatus] = useState('New'); // Default to 'New'
    const [assigneeOptions, setAssigneeOptions] = useState([]);

    const handleProjectChange = (e, { value }) => {
        setProject(value);
        const filteredAssignees = assignees.filter(a =>
            value === 'Billing' ? a.department === 'Sales' : a.department === 'IT'
        );
        const options = filteredAssignees.map(a => ({
            key: a.id,
            text: `${a.name} (${a.department})`,
            value: a.id
        }));
        setAssigneeOptions(options);
    };

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

    return (
        <Modal open={showForm} onClose={toggleForm} size="small">
            <Modal.Header>
                ADD TICKET
            </Modal.Header>
            <Modal.Content scrolling>
                <div style={{ maxHeight: "400px", paddingRight: "10px" }}>
                    <Form>
                        <h4>Complaint/Problem</h4>
                        <p style={{ color: "gray" }}>State the problem you have encountered</p>
                        <Dropdown
                            clearable
                            placeholder="Search Company"
                            fluid
                            search
                            selection
                            options={companyList}
                            name="company"
                            onChange={(e, { value }) => handleInputChange(e, { name: 'company', value })}
                            style={{ marginBottom: "13px" }}
                        />
                        <Form.Input placeholder="Subject" name="category" onChange={handleInputChange} />
                        <Form.TextArea placeholder="Ticket Details" name="description" onChange={handleInputChange} />
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <div><p><strong>Project</strong></p></div>
                                    <Dropdown
                                        placeholder="Project"
                                        openOnFocus
                                        selection
                                        options={projectOptions}
                                        name="project"
                                        onChange={handleProjectChange}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <div><p><strong>Assignee</strong></p></div>
                                    <Dropdown
                                        openOnFocus
                                        selection
                                        options={assigneeOptions}
                                        value={assignedTo}
                                        onChange={(e, { value }) => setAssignedTo(value)}
                                        placeholder="Select Assignee"
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <div><p><strong>Initial Status</strong></p></div>
                                    <Dropdown placeholder="Select Status" openOnFocus selection options={statusOptions}
                                              name="initstatus" onChange={handleInputChange} value={status} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <h4>Contact Person Details</h4>
                        <p style={{color: "gray"}}>Provide contact information for us to reach out if we may ask for further information</p>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input label="Full Name" placeholder="Full Name" name="name" onChange={handleInputChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label="Contact Number" placeholder="Contact Number" name="contactNumber" onChange={handleInputChange} />
                                </Grid.Column>
                                <Grid.Column style={{ marginBottom: "5px" }}>
                                    <Form.Input label="Email Address" placeholder="Email Address" name="email" onChange={handleInputChange} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Input label="Address" placeholder="Address" name="address" onChange={handleInputChange} />
                        <h4>Additional Information</h4>
                        <p style={{ color: "gray" }}>Please fill in all inputs below for us to better understand your problem.</p>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <div><p><strong>Severity</strong></p></div>
                                    <Dropdown placeholder="Severity" openOnFocus selection options={options} name="priority" onChange={handleInputChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <div><p><strong>Nature of Incident</strong></p></div>
                                    <Dropdown placeholder="Nature of Incident" openOnFocus selection options={natureOfAccidentOptions} name="natureOfAccident" onChange={handleInputChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <div><p><strong>Date of Incident</strong></p></div>
                                    <DatePicker
                                        selected={incidentDate}
                                        onChange={(date) => setIncidentDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText="Select a date"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={3} stackable>
                            <Grid.Row style={{ height: "200px" }}>
                                <Grid.Column>
                                    <Grid.Column>
                                        <h4>Attachments</h4>
                                    </Grid.Column>
                                </Grid.Column>
                                <Grid.Column><p style={{ marginTop: "80px", textAlign: "center" }}>No Attachments</p></Grid.Column>
                                <Grid.Column><Button floated={"right"}>Add Attachment</Button></Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid.Column>
                                        <h4>Additional Notes</h4>
                                        <Form.TextArea placeholder="Additional Notes" name="notes" onChange={handleInputChange} />
                                    </Grid.Column>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic onClick={toggleForm}>CANCEL</Button>
                <Button primary onClick={handleSubmit}>REPORT</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AddTicketModal;
