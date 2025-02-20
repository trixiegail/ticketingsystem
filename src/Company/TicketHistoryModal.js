import React from 'react';
import { Modal, Table, Button } from 'semantic-ui-react';

const TicketHistoryModal = ({ showTicketHistory, setShowTicketHistory, selectedCompany, initialCompanies }) => {
    return (
        <Modal open={showTicketHistory} onClose={() => setShowTicketHistory(false)}>
            <Modal.Header>Ticket History for {selectedCompany}</Modal.Header>
            <Modal.Content>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ticket ID</Table.HeaderCell>
                            <Table.HeaderCell>Contact Person</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {initialCompanies.filter(ticket => ticket.companyName === selectedCompany).map(ticket => (
                            <Table.Row key={ticket.id}>
                                <Table.Cell>{ticket.id}</Table.Cell>
                                <Table.Cell>{ticket.name}</Table.Cell>
                                <Table.Cell>{ticket.email}</Table.Cell>
                                <Table.Cell>{ticket.category}</Table.Cell>
                                <Table.Cell>{ticket.description}</Table.Cell>
                                <Table.Cell>{ticket.date}</Table.Cell>
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
    );
};

export default TicketHistoryModal;