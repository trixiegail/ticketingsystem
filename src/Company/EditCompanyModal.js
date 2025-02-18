// EditCompanyModal.js
import React from 'react';
import { Modal, Form, Button, Grid, Dropdown } from 'semantic-ui-react';

const EditCompanyModal = ({ showEditCompanyForm, setShowEditCompanyForm, formData, handleEditCompany, saveEditCompany, accountInfoOptions }) => {
    return (
        <Modal open={showEditCompanyForm} onClose={() => setShowEditCompanyForm(false)} size="small">
            <Modal.Header style={{ backgroundColor: "#176D7F", color: "white" }}>
                EDIT COMPANY
            </Modal.Header>
            <Modal.Content>
                <div style={{ maxHeight: "400px", paddingRight: "10px" }}>
                    <Form>
                        <h4>Company Details</h4>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input label="Company Name" placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleEditCompany} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label="Contact Person" placeholder="Full Name" name="name" value={formData.name} onChange={handleEditCompany} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label="Contact Number" placeholder="Contact Number" name="contact" value={formData.contact} onChange={handleEditCompany} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={3} stackable style={{ marginBottom: "5px" }}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Input label="Email Address" placeholder="Email Address" name="email" value={formData.email} onChange={handleEditCompany} />
                                </Grid.Column>
                                <Grid.Column>
                                    <div><p><strong>Account Information</strong></p></div>
                                    <Dropdown placeholder="Specify" openOnFocus selection options={accountInfoOptions} name="accountInfo" value={formData.accountInfo} onChange={(e, { value }) => handleEditCompany(e, { name: 'accountInfo', value })} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Input label="Address" placeholder="Address" name="address" value={formData.address} onChange={handleEditCompany} />
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic onClick={() => setShowEditCompanyForm(false)}>CANCEL</Button>
                <Button onClick={saveEditCompany}>SAVE</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default EditCompanyModal;