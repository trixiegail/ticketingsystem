import React, {Component} from 'react';

class Table extends Component {
    render() {
        return (
            <div>
                <Table celled striped selectable sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center" style={{ verticalAlign: "middle" }}>
                                <Checkbox checked={selectAll} onClick={this.toggleAll} />
                            </Table.HeaderCell>
                            {[
                                { label: "Company", column: "company" },
                                { label: "ICCID", column: "iccid" },
                                { label: "Sim Number", column: "simcard_number" },
                                { label: "IMEI", column: "serial_number" },
                                { label: "Network", column: "network" },
                                { label: "Plan", column: "plan" },
                                { label: "Activation Date", column: "activation_date" },
                                { label: "Active", column: "isEnable" },
                                { label: "Cost", column: "cost" },
                            ].map(({ label, column }) => (
                                <Table.HeaderCell
                                    key={column}
                                    sorted={sortConfig.column === column ? sortConfig.direction : null}
                                    onClick={() => this.handleSort(column)}
                                >
                                    {label}
                                </Table.HeaderCell>
                            ))}
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.getPaginatedData().map((row) => (
                            <Table.Row
                                key={row._id}
                                onClick={() => this.toggleSelection(row._id)}
                                style={{ cursor: "pointer" }}
                            >
                                <Table.Cell textAlign="center" style={{ verticalAlign: "middle" }}>
                                    <Checkbox
                                        checked={selectedSims.includes(row._id)}
                                        onChange={(e) => this.handleCheckboxChange(e, row._id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </Table.Cell>
                                <Table.Cell>{row.company ? row.company.company_name : "Not Assigned"}</Table.Cell>
                                <Table.Cell>{row.iccid}</Table.Cell>
                                <Table.Cell>{row.simcard_number}</Table.Cell>
                                <Table.Cell>{row.serial_number}</Table.Cell>
                                <Table.Cell>{row.network}</Table.Cell>
                                <Table.Cell>{row.plan ? row.plan.plan_name : ""}</Table.Cell>
                                <Table.Cell>{row.activation_date ? this.dateFormat(new Date(row.activation_date).getTime()) : "~"}</Table.Cell>
                                <Table.Cell>{row.isEnable ? "True" : "False"}</Table.Cell>
                                <Table.Cell>{row.plan ? row.plan.amount : ""}</Table.Cell>
                                <Table.Cell>
                <span className="row-icon-group">
                  <Popup
                      content="Edit"
                      trigger={<Icon name="edit" link onClick={(e) => this.handleIconClick(e, 'edit', row)} />}
                      position="top center"
                  />
                    {this.props.user.userLevelAccess === "Admin" && (
                        <Popup
                            content="Archive"
                            trigger={<Icon name="archive" link onClick={(e) => this.handleIconClick(e, 'archive', row)} />}
                            position="top center"
                        />
                    )}
                    <Popup
                        content="Notes"
                        trigger={<Icon name="file alternate" link onClick={(e) => this.handleIconClick(e, 'notes', row)} />}
                        position="top center"
                    />
                </span>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Table;