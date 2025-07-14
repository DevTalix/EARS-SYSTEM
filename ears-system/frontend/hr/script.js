document.addEventListener('DOMContentLoaded', function() {
    // --- DUMMY DATA ---
    const reportsData = [
        { internName: 'Alice Johnson', division: 'Technology', week: 5, supervisor: 'Bob Williams', status: 'Approved', dateSubmitted: '2024-07-10' },
        { internName: 'Charlie Brown', division: 'Marketing', week: 4, supervisor: 'Diana Prince', status: 'Pending', dateSubmitted: '2024-07-12' },
        { internName: 'David Smith', division: 'Human Resources', week: 5, supervisor: 'Ethan Hunt', status: 'Rejected', dateSubmitted: '2024-07-09' },
        { internName: 'Eve Williams', division: 'Finance', week: 6, supervisor: 'Fiona Glenanne', status: 'Approved', dateSubmitted: '2024-07-11' },
        { internName: 'Frank Miller', division: 'Technology', week: 3, supervisor: 'Bob Williams', status: 'Pending', dateSubmitted: '2024-07-14' },
        { internName: 'Grace Lee', division: 'Marketing', week: 5, supervisor: 'Diana Prince', status: 'Approved', dateSubmitted: '2024-07-08' },
        { internName: 'Henry Wilson', division: 'Technology', week: 4, supervisor: 'Bob Williams', status: 'Pending', dateSubmitted: '2024-07-13' },
        { internName: 'Ivy Green', division: 'Finance', week: 5, supervisor: 'Fiona Glenanne', status: 'Rejected', dateSubmitted: '2024-07-10' },
        { internName: 'Jack Davis', division: 'Human Resources', week: 6, supervisor: 'Ethan Hunt', status: 'Approved', dateSubmitted: '2024-07-12' },
        { internName: 'Karen White', division: 'Technology', week: 5, supervisor: 'Bob Williams', status: 'Approved', dateSubmitted: '2024-06-28' },
    ];

    const tableBody = document.getElementById('reports-table-body');
    const divisionFilter = document.getElementById('division-filter');
    let currentSort = { column: null, direction: 'asc' };
    let tableData = [...reportsData]; // Use a mutable copy for sorting

    // --- INITIALIZATION ---
    function init() {
        populateDivisionFilter();
        renderTable(tableData);
        setupEventListeners();
    }

    // --- RENDERING FUNCTIONS ---
    function renderTable(data) {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No reports found.</td></tr>`;
            return;
        }

        data.forEach(report => {
            const row = document.createElement('tr');
            const statusClass = `badge status-${report.status.toLowerCase()}`;
            row.innerHTML = `
                <td>${report.internName}</td>
                <td>${report.division}</td>
                <td>${report.week}</td>
                <td>${report.supervisor}</td>
                <td><span class="${statusClass}">${report.status}</span></td>
                <td>${report.dateSubmitted}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function populateDivisionFilter() {
        const divisions = [...new Set(reportsData.map(report => report.division))];
        divisions.sort().forEach(division => {
            const option = document.createElement('option');
            option.value = division;
            option.textContent = division;
            divisionFilter.appendChild(option);
        });
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        const filters = ['name-filter', 'division-filter', 'status-filter', 'date-start-filter', 'date-end-filter'];
        filters.forEach(id => {
            document.getElementById(id).addEventListener('input', applyFilters);
            document.getElementById(id).addEventListener('change', applyFilters);
        });

        document.getElementById('clear-filters').addEventListener('click', clearAllFilters);
        
        document.querySelectorAll('#reports-table th[data-sort]').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-sort');
                sortData(column);
            });
        });

        document.getElementById('export-pdf').addEventListener('click', () => alert('Export to PDF functionality to be implemented.'));
        document.getElementById('export-excel').addEventListener('click', () => alert('Export to Excel functionality to be implemented.'));
    }

    // --- FILTERING AND SORTING LOGIC ---
    function applyFilters() {
        const nameFilter = document.getElementById('name-filter').value.toLowerCase();
        const divisionFilterValue = document.getElementById('division-filter').value;
        const statusFilterValue = document.getElementById('status-filter').value;
        const startDateFilter = document.getElementById('date-start-filter').value;
        const endDateFilter = document.getElementById('date-end-filter').value;

        let filteredData = reportsData.filter(report => {
            const reportDate = new Date(report.dateSubmitted);
            const startDate = startDateFilter ? new Date(startDateFilter) : null;
            const endDate = endDateFilter ? new Date(endDateFilter) : null;
            if (endDate) endDate.setHours(23, 59, 59, 999);

            return (
                report.internName.toLowerCase().includes(nameFilter) &&
                (!divisionFilterValue || report.division === divisionFilterValue) &&
                (!statusFilterValue || report.status === statusFilterValue) &&
                (!startDate || reportDate >= startDate) &&
                (!endDate || reportDate <= endDate)
            );
        });

        tableData = [...filteredData]; // Update the data copy
        renderTable(tableData);
    }

    function clearAllFilters() {
        document.getElementById('name-filter').value = '';
        document.getElementById('division-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('date-start-filter').value = '';
        document.getElementById('date-end-filter').value = '';
        tableData = [...reportsData];
        renderTable(tableData);
    }

    function sortData(column) {
        if (currentSort.column === column) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = column;
            currentSort.direction = 'asc';
        }

        tableData.sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            if (column === 'week') {
                return currentSort.direction === 'asc' ? valA - valB : valB - valA;
            }
            
            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            
            if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
            if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });

        renderTable(tableData);
    }

    // --- START THE APP ---
    init();
});
