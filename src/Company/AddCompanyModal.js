import React from 'react';
import { Modal, Form, Button, Grid, Dropdown } from 'semantic-ui-react';

const AddCompanyModal = ({ showForm, toggleForm, formData, handleChange, handleSave, accountInfoOptions }) => {
    return (
        <Modal open={showForm} onClose={toggleForm} size="small">
            <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>
                ADD COMPANY
            </Modal.Header>
            <Modal.Content>
                <div style={{ maxHeight: "400px", paddingRight: "10px" }}>
                    <Form>
                        <h4>Company Details</h4>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input label="Company Name" placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label="Contact Person" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label="Contact Number" placeholder="Contact Number" name="contact" value={formData.contact} onChange={handleChange} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={3} stackable style={{ marginBottom: "5px" }}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input label="Email Address" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} />
                                </Grid.Column>
                                <Grid.Column>
                                    <div><p><strong>Account Information</strong></p></div>
                                    <Dropdown placeholder="Specify" openOnFocus selection options={accountInfoOptions} name="accountInfo" value={formData.accountInfo} onChange={(e, { value }) => handleChange(e, { name: 'accountInfo', value })} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Input label="Address" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic onClick={toggleForm}>CANCEL</Button>
                <Button onClick={handleSave}>ADD</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AddCompanyModal;