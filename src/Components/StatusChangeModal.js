import React from "react";
import { Modal, Button } from "semantic-ui-react";

const StatusChangeModal = ({ modalOpen, setModalOpen, newStatus, confirmStatusChange }) => {
    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small">
            <Modal.Header>Confirm Status Change</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to change the status of this ticket to "{newStatus}"?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button primary onClick={confirmStatusChange}>Confirm</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default StatusChangeModal;