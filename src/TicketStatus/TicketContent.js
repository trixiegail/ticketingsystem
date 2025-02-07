import {React, useState} from 'react';
import DashboardLayout from "../Dashboard/DashboardLayout";
import '../css/styles.css';
import {
    Segment, SegmentGroup,
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table, Input,
} from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TicketContent= () => {
    const [startDate, setStartDate] = useState(new Date());
        return (
            <DashboardLayout>
                <div className="page-container-ticket-content">
                    <div className="content-wrapper">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px"}}>
                            <h3>Ticket #123456</h3>
                        </div>
                        <Table celled color={"teal"} style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Subject:</strong></TableCell>
                                    <TableCell>System Performance Issue</TableCell>
                                    <TableCell><strong>Assignee:</strong></TableCell>
                                    <TableCell>Maria Labo</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Description:</strong></TableCell>
                                    <TableCell colSpan="3">
                                        My phone is very lagging. It frequently freezes and apps take too long to respond.
                                        My phone is very lagging. It frequently freezes and apps take too long to respond.
                                        My phone is very lagging. It frequently freezes and apps take too long to respond.
                                        My phone is very lagging. It frequently freezes and apps take too long to respond.
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Status:</strong></TableCell>
                                    <TableCell>Ongoing</TableCell>
                                    <TableCell><strong>Priority:</strong></TableCell>
                                    <TableCell style={{ color: "red", fontWeight: "bold" }}>High</TableCell>
                                </TableRow>
                                <TableRow colSpan="3">
                                    <TableCell><strong>Due Date:</strong></TableCell>
                                    <TableCell>12/15/2024</TableCell>
                                    <TableCell><strong>Scheduled Date:</strong></TableCell>
                                    <TableCell>12/15/2024</TableCell>
                                </TableRow>
                                <TableRow>

                                </TableRow>
                            </TableBody>
                        </Table>

                        <SegmentGroup style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"}}>
                            <Segment basic style={{ minHeight: "90vh" }}>
                                <Segment basic style={{ display: "flex", alignItems: "center" }}>
                                    <h3 style={{ padding: "0px", marginRight: "20px" }}>History</h3>
                                    <div style={{ marginLeft: "auto" }}> {/* Pushes DatePicker to the right */}
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            customInput={
                                                <Input
                                                    icon="calendar"
                                                    iconPosition="left"
                                                    placeholder="Select Date"
                                                    style={{ width: '200px' }}
                                                />
                                            }
                                            popperPlacement="bottom-end" // Ensures pop-up calendar appears to the right
                                        />
                                    </div>
                                </Segment>
                                <p align={"center"}>No History yet</p>
                            </Segment>
                        </SegmentGroup>

                    </div>
                </div>
            </DashboardLayout>
        );
}

export default TicketContent;