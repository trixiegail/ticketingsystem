import React from 'react';
import { Modal, Form, Button, Grid, Dropdown } from 'semantic-ui-react';

const AddAssigneeModal = ({ showForm, toggleForm, formData, handleChange, handleSave, role }) => {
    return (
        <Modal open={showForm} onClose={toggleForm} size="small">
            <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>
                ADD ASSIGNEE
            </Modal.Header>
            <Modal.Content>
                <div style={{ maxHeight: "400px", paddingRight: "10px" }}>
                    <Form>
                        <h4>Assignee Details</h4>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input
                                        label="Full Name"
                                        placeholder="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        label="Employee ID"
                                        placeholder="Employee ID"
                                        name="employeeId"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Select
                                        label="Role"
                                        placeholder="Select role"
                                        name="role"
                                        options={role}
                                        value={formData.role}
                                        onChange={handleChange}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input
                                        label="Department"
                                        placeholder="Department"
                                        name="department"
                                        value={formData.department}
                                        readOnly
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic onClick={toggleForm}>CANCEL</Button>
                <Button primary onClick={handleSave}>ADD</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AddAssigneeModal;