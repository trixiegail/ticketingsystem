import React from 'react';
import { Modal, Form, Button, Grid, Dropdown } from 'semantic-ui-react';

const EditAssigneeModal = ({ showEditForm, toggleEditForm, selectedAssignee, handleEditChange, saveAssigneeChanges, role }) => {
    return (
        <Modal open={showEditForm} onClose={toggleEditForm} size="small">
            <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>
                EDIT ASSIGNEE
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <h4>Assignee Details</h4>
                    <Grid columns={2} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input
                                    label="Full Name"
                                    name="name"
                                    value={selectedAssignee?.name || ""}
                                    onChange={handleEditChange}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    label="Employee ID"
                                    name="employeeId"
                                    value={selectedAssignee?.employeeId || ""}
                                    onChange={handleEditChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={2} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Select
                                    label="Role"
                                    name="role"
                                    options={role}
                                    value={selectedAssignee?.role || ""}
                                    onChange={handleEditChange}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    label="Department"
                                    name="department"
                                    value={selectedAssignee?.department || ""}
                                    readOnly
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button basic onClick={toggleEditForm}>Cancel</Button>
                <Button primary onClick={saveAssigneeChanges}>Save</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default EditAssigneeModal;