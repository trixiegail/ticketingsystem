import React, { useState } from 'react';
import DashboardLayout from "../Dashboard/DashboardLayout";
import '../css/styles.css';
import {
    Icon, Button, Input, Dropdown, Table
} from 'semantic-ui-react';
import AddAssigneeModal from "./AddAssigneeModal";
import EditAssigneeModal from "./EditAssigneeModal";

const role = [
    { key: '', text: 'Select role', value: '' },
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

                    <div className="table-container-assignee">
                        <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Role</Table.HeaderCell>
                                    <Table.HeaderCell>Department</Table.HeaderCell>
                                    <Table.HeaderCell>Employee ID</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {filteredAssignees.map(assignee => (
                                    <Table.Row key={assignee.id}>
                                        <Table.Cell>{assignee.name}</Table.Cell>
                                        <Table.Cell>{assignee.role}</Table.Cell>
                                        <Table.Cell>{assignee.department}</Table.Cell>
                                        <Table.Cell>{assignee.employeeId}</Table.Cell>
                                        <Table.Cell>
                                            <Button basic color='green' onClick={() => openEditForm(assignee)}>Edit</Button>
                                            <Button basic color='red'>Assign to</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Assignees;