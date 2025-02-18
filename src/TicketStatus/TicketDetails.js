import React from "react";
import { Table, Button, Modal } from "semantic-ui-react";

const TicketDetails = ({ ticket, onClose }) => {
    return (
        <Modal open={true} onClose={onClose} size="small">
            <Modal.Header>Ticket {ticket.id}</Modal.Header>
            <h3 style={{marginLeft: "20px"}}>Status Change History</h3>
            <Modal.Content>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Previous Status</Table.HeaderCell>
                            <Table.HeaderCell>New Status</Table.HeaderCell>
                            <Table.HeaderCell>Date & Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {ticket.history.length > 0 ? (
                            ticket.history.map((entry, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{entry.previousStatus}</Table.Cell>
                                    <Table.Cell>{entry.newStatus}</Table.Cell>
                                    <Table.Cell>{entry.timestamp}</Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan="3">No history available</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose}>Close</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default TicketDetails;