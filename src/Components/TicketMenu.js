import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Icon, Label, Divider } from "semantic-ui-react";
import "../css/styles.css";

const monthOptions = [
    { key: 'placeholder', text: 'Select Month', value: '' },
    ...[...Array(12)].map((_, i) => {
        const month = new Date(0, i).toLocaleString('default', { month: 'long' });
        return { key: i + 1, text: month, value: month };
    })
];

const yearOptions = [
    { key: 'placeholder', text: 'Select Year', value: '' },
    ...[...Array(10)].map((_, i) => {
        const year = new Date().getFullYear() - i;
        return { key: year, text: year.toString(), value: year };
    })
];

const getMenuIcon = (name) => {
    const icons = {
        'all-tickets': 'tickets',
        'new': 'star',
        'pending': 'clock',
        'ongoing': 'sync',
        'completed': 'check circle'
    };
    return icons[name] || 'ticket';
};

const TicketMenu = ({
                        activeMenu,
                        handleItemMenu,
                        ticketCounts,
                        selectedMonth,
                        selectedYear,
                        handleMonthChange,
                        handleYearChange
                    }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        handleMonthChange(null, { value: currentMonth });
    }, []);

    const menuItems = [
        { name: 'all-tickets', label: 'All Tickets', count: ticketCounts.all },
        { name: 'new', label: 'New', count: ticketCounts.new },
        { name: 'pending', label: 'Pending', count: ticketCounts.pending },
        { name: 'ongoing', label: 'Ongoing', count: ticketCounts.ongoing },
        { name: 'completed', label: 'Completed', count: ticketCounts.completed }
    ];

    return (
        <div padded className="ticket-menu-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Menu secondary pointing>
                        {menuItems.map(({ name, label, count }) => (
                            <Menu.Item
                                key={name}
                                name={name}
                                active={activeMenu === name}
                                onClick={handleItemMenu}
                                className={`ticket-menu-item ${visible ? 'visible' : ''}`}
                            >
                                <Icon name={getMenuIcon(name)} />
                                {label}
                                <Label circular color={activeMenu === name ? 'orange' : 'grey'} size="small">
                                    {count}
                                </Label>
                            </Menu.Item>

                        ))}
                    </Menu>
                </div>
                {(activeMenu !== 'archived') && (
                    <div className="filters-container" style={{ display: 'flex', gap: '1rem' }}>
                        <Dropdown
                            selection
                            clearable
                            placeholder="Select Month"
                            options={monthOptions}
                            onChange={handleMonthChange}
                            value={selectedMonth}
                        />
                        <Dropdown
                            selection
                            clearable
                            placeholder="Select Year"
                            options={yearOptions}
                            onChange={handleYearChange}
                            value={selectedYear}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketMenu;