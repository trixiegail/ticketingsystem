import React, { useState } from 'react';
import DashboardLayout from "../Dashboard/DashboardLayout";
import '../css/styles.css';
import {
    Icon, Button, Input, Dropdown
} from 'semantic-ui-react';
import {Card} from "semantic-ui-react";
import {CardMeta} from "semantic-ui-react";
import {CardHeader} from "semantic-ui-react";
import {CardGroup} from "semantic-ui-react";
import {CardDescription} from "semantic-ui-react";
import {CardContent} from "semantic-ui-react";
import AddAssigneeModal from "./AddAssigneeModal";
import EditAssigneeModal from "./EditAssigneeModal";

const role = [
    { key: 'Tech Support', text: 'Tech Support', value: 'Tech Support' },
    { key: 'Sales Support', text: 'Sales Support', value: 'Sales Support' }
];

const department = [
    { key: 'IT', text: 'IT', value: 'IT' },
    { key: 'Sales', text: 'Sales', value: 'Sales' }
];

const initialAssignees = [
    { id: 1, name: "Steve Sanders", role: "Tech Support", employeeId: 123456, department: "IT" },
    { id: 2, name: "Molly Thomas", role: "Tech Support", employeeId: 123457, department: "IT" },
    { id: 3, name: "Jenny Lawrence", role: "Tech Support", employeeId: 123458, department: "IT" },
    { id: 4, name: "David Miller", role: "Sales Support", employeeId: 123459, department: "Sales" },
    { id: 5, name: "Sophia Johnson", role: "Sales Support", employeeId: 123460, department: "Sales" },
    { id: 6, name: "Michael Brown", role: "Sales Support", employeeId: 123461, department: "Sales" }
];

const Assignees = () => {
    const [showForm, setShowForm] = useState(false);
    const [assignees, setAssignees] = useState(initialAssignees);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedAssignee, setSelectedAssignee] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        employeeId: "",
        role: "",
        department: ""
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const toggleForm = () => setShowForm(!showForm);
    const toggleEditForm = () => setShowEditForm(!showEditForm);

    const handleChange = (e, { name, value }) => {
        let updatedFormData = { ...formData, [name]: value };
        if (name === "role") {
            updatedFormData.department = value === "Tech Support" ? "IT" : "Sales";
        }
        setFormData(updatedFormData);
    };

    const handleSave = () => {
        const newAssignee = { ...formData, id: assignees.length + 1 };
        setAssignees([...assignees, newAssignee]);
        setFormData({ name: "", employeeId: "", role: "", department: "" });
        toggleForm();
    };

    const openEditForm = (assignee) => {
        setSelectedAssignee(assignee);
        setShowEditForm(true);
    };

    const handleEditChange = (e, { name, value }) => {
        let updatedAssignee = { ...selectedAssignee, [name]: value };
        if (name === "role") {
            updatedAssignee.department = value === "Tech Support" ? "IT" : "Sales";
        }
        setSelectedAssignee(updatedAssignee);
    };

    const saveAssigneeChanges = () => {
        setAssignees(assignees.map(assignee =>
            assignee.id === selectedAssignee.id ? selectedAssignee : assignee
        ));
        setShowEditForm(false);
    };

    const filteredAssignees = assignees
        .filter(assignee =>
            assignee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignee.role.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(assignee =>
            selectedDepartment ? assignee.department === selectedDepartment : true
        );

    return (
        <DashboardLayout>
            <div className="page-container">
                <div className="content-wrapper">
                    <h1>Assignees</h1>
                    <div style={{ display: "flex", marginBottom: "30px" }}>
                        <Input
                            icon='search'
                            placeholder='Search...'
                            style={{ width: "800px" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Dropdown
                            clearable
                            placeholder="Select Department"
                            selection
                            options={department}
                            onChange={(e, { value }) => setSelectedDepartment(value)}
                            value={selectedDepartment}
                            style={{ marginLeft: "10px" }}
                        />
                        <Button style={{ marginLeft: "auto" }} onClick={toggleForm}>Add assignee</Button>
                    </div>

                    <AddAssigneeModal
                        showForm={showForm}
                        toggleForm={toggleForm}
                        formData={formData}
                        handleChange={handleChange}
                        handleSave={handleSave}
                        role={role}
                    />

                    <EditAssigneeModal
                        showEditForm={showEditForm}
                        toggleEditForm={toggleEditForm}
                        selectedAssignee={selectedAssignee}
                        handleEditChange={handleEditChange}
                        saveAssigneeChanges={saveAssigneeChanges}
                        role={role}
                    />

                    {/*<Modal open={showEditForm} onClose={() => setShowEditForm(false)} size="small">*/}
                    {/*    <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>*/}
                    {/*        EDIT ASSIGNEE*/}
                    {/*    </Modal.Header>*/}

                    {/*    <Modal.Content>*/}
                    {/*        <Form>*/}
                    {/*            <h4>Assignee Details</h4>*/}
                    {/*            <Grid columns={2} stackable>*/}
                    {/*                <Grid.Row>*/}
                    {/*                    <Grid.Column>*/}
                    {/*                        <Form.Input*/}
                    {/*                            label="Full Name"*/}
                    {/*                            name="name"*/}
                    {/*                            value={selectedAssignee?.name || ""}*/}
                    {/*                            onChange={handleEditChange}*/}
                    {/*                        />*/}
                    {/*                    </Grid.Column>*/}
                    {/*                    <Grid.Column>*/}
                    {/*                        <Form.Input*/}
                    {/*                            label="Employee ID"*/}
                    {/*                            name="employeeId"*/}
                    {/*                            value={selectedAssignee?.employeeId || ""}*/}
                    {/*                            onChange={handleEditChange}*/}
                    {/*                        />*/}
                    {/*                    </Grid.Column>*/}
                    {/*                </Grid.Row>*/}
                    {/*            </Grid>*/}
                    {/*            <Grid columns={2} stackable>*/}
                    {/*                <Grid.Row>*/}
                    {/*                    <Grid.Column>*/}
                    {/*                        <Form.Select*/}
                    {/*                            label="Role"*/}
                    {/*                            name="role"*/}
                    {/*                            options={role}*/}
                    {/*                            value={selectedAssignee?.role || ""}*/}
                    {/*                            onChange={handleEditChange}*/}
                    {/*                        />*/}
                    {/*                    </Grid.Column>*/}
                    {/*                    <Grid.Column>*/}
                    {/*                        <Form.Input*/}
                    {/*                            label="Department"*/}
                    {/*                            name="department"*/}
                    {/*                            value={selectedAssignee?.department || ""}*/}
                    {/*                            readOnly*/}
                    {/*                        />*/}
                    {/*                    </Grid.Column>*/}
                    {/*                </Grid.Row>*/}
                    {/*            </Grid>*/}
                    {/*        </Form>*/}
                    {/*    </Modal.Content>*/}

                    {/*    <Modal.Actions>*/}
                    {/*        <Button basic onClick={() => setShowEditForm(false)}>Cancel</Button>*/}
                    {/*        <Button primary onClick={saveAssigneeChanges}>Save</Button>*/}
                    {/*    </Modal.Actions>*/}
                    {/*</Modal>*/}

                    <div className="table-container-assignee">
                    <CardGroup itemsPerRow={4}>
                        {filteredAssignees.map(assignee => (
                            <Card key={assignee.id} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
                                <CardContent>
                                    <Icon name="user circle" size="big" style={{ float: 'right', color: 'grey' }} />
                                    <CardHeader>{assignee.name}</CardHeader>
                                    <CardMeta>{assignee.role}</CardMeta>
                                    <CardDescription>
                                        {assignee.department} department
                                    </CardDescription>
                                    <CardDescription>
                                        Employee id: {assignee.employeeId}
                                    </CardDescription>
                                </CardContent>
                                <CardContent extra>
                                    <div className='ui two buttons'>
                                        <Button basic color='green' onClick={() => openEditForm(assignee)}>Edit</Button>
                                        <Button basic color='red'>Assign to</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardGroup>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Assignees;