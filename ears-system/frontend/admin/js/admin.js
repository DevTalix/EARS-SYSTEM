// EARS Admin Panel JavaScript

// Global variables
let currentSection = 'dashboard';
let users = [];
let divisions = [];
let departments = [];
let auditLogs = [];
let systemSettings = {};

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    loadDashboardData();
    setupEventListeners();
});

// Initialize admin panel
function initializeAdminPanel() {
    // Load initial data
    loadUsers();
    loadOrganizationalStructure();
    loadAuditLogs();
    loadSystemSettings();
    
    // Show dashboard by default
    showDashboard();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('search-user')?.addEventListener('input', function() {
        filterUsers();
    });
    
    // Form validations
    setupFormValidations();
    
    // Auto-save settings
    setupAutoSave();
}

// Navigation functions
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard-section').style.display = 'block';
    currentSection = 'dashboard';
    updateNavigation();
    loadDashboardData();
}

function showUserManagement() {
    hideAllSections();
    document.getElementById('user-management-section').style.display = 'block';
    currentSection = 'user-management';
    updateNavigation();
    loadUsers();
}

function showOrganizationalStructure() {
    hideAllSections();
    document.getElementById('organizational-structure-section').style.display = 'block';
    currentSection = 'organizational-structure';
    updateNavigation();
    loadOrganizationalStructure();
}

function showSupervisorAssignment() {
    hideAllSections();
    document.getElementById('supervisor-assignment-section').style.display = 'block';
    currentSection = 'supervisor-assignment';
    updateNavigation();
    loadSupervisorAssignments();
}

function showAuditLogs() {
    hideAllSections();
    document.getElementById('audit-logs-section').style.display = 'block';
    currentSection = 'audit-logs';
    updateNavigation();
    loadAuditLogs();
}

function showSystemSettings() {
    hideAllSections();
    document.getElementById('system-settings-section').style.display = 'block';
    currentSection = 'system-settings';
    updateNavigation();
    loadSystemSettings();
}

function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function updateNavigation() {
    // Remove active class from all nav links
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section
    const currentNavLink = document.querySelector(`[onclick="show${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}()"]`);
    if (currentNavLink) {
        currentNavLink.classList.add('active');
    }
}

// Dashboard functions
function loadDashboardData() {
    // Simulate API call to get dashboard statistics
    const stats = {
        totalUsers: 45,
        activeInterns: 32,
        totalSupervisors: 8,
        pendingReports: 12
    };
    
    updateDashboardStats(stats);
    loadRecentActivity();
}

function updateDashboardStats(stats) {
    document.getElementById('total-users').textContent = stats.totalUsers;
    document.getElementById('active-interns').textContent = stats.activeInterns;
    document.getElementById('total-supervisors').textContent = stats.totalSupervisors;
    document.getElementById('pending-reports').textContent = stats.pendingReports;
}

function loadRecentActivity() {
    const activities = [
        {
            time: '2 minutes ago',
            user: 'Tendo',
            action: 'created new user',
            details: 'Added intern: Taliq'
        },
        {
            time: '5 minutes ago',
            user: 'Admin',
            action: 'updated system settings',
            details: 'Changed session timeout to 45 minutes'
        },
        {
            time: '10 minutes ago',
            user: 'Wilber',
            action: 'assigned supervisor',
            details: 'Assigned Aron to 3 interns'
        },
        {
            time: '15 minutes ago',
            user: 'System',
            action: 'backup completed',
            details: 'Daily backup completed successfully'
        }
    ];
    
    const activityContainer = document.getElementById('recent-activity');
    activityContainer.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <span class="activity-user">${activity.user}</span>
                    <span class="activity-action">${activity.action}</span>
                    <small class="text-muted d-block">${activity.details}</small>
                </div>
                <small class="activity-time">${activity.time}</small>
            </div>
        `;
        activityContainer.appendChild(activityItem);
    });
}

// User Management functions
function loadUsers() {
    // Simulate API call to get users
    users = [
        {
            id: 1,
            firstname: 'Aron',
            lastname: 'L',
            email: 'aron.L@kcca.go.ug',
            phone: '+256 701 234 567',
            role: 'admin',
            department: 'IT',
            status: 'active',
            lastLogin: '2024-01-15 10:30:00'
        },
        {
            id: 2,
            firstname: 'Arafat',
            lastname: 'K',
            email: 'arafat.k@kcca.go.ug',
            phone: '+256 702 345 678',
            role: 'intern',
            department: 'Legal',
            status: 'active',
            lastLogin: '2024-01-15 09:15:00'
        },
        {
            id: 3,
            firstname: 'Benjamin',
            lastname: 'N',
            email: 'benjamin.n@kcca.go.ug',
            phone: '+256 703 456 789',
            role: 'supervisor',
            department: 'Finance',
            status: 'active',
            lastLogin: '2024-01-15 08:45:00'
        },
        {
            id: 3,
            firstname: 'Calvin',
            lastname: 'M',
            email: 'calvin.m@kcca.go.ug',
            phone: '+256 703 456 789',
            role: 'supervisor',
            department: 'Revenue',
            status: 'active',
            lastLogin: '2024-01-15 08:45:00'
        },
        {
            id: 3,
            firstname: 'Norman',
            lastname: 'D',
            email: 'norman.d@kcca.go.ug',
            phone: '+256 703 456 789',
            role: 'supervisor',
            department: 'IT',
            status: 'active',
            lastLogin: '2024-01-15 08:45:00'
        }
    ];
    
    renderUsersTable();
}

function renderUsersTable() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstname} ${user.lastname}</td>
            <td>${user.email}</td>
            <td><span class="badge bg-${getRoleBadgeColor(user.role)}">${user.role}</span></td>
            <td>${user.department || '-'}</td>
            <td><span class="badge bg-${getStatusBadgeColor(user.status)}">${user.status}</span></td>
            <td>${formatDateTime(user.lastLogin)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="resetPassword(${user.id})">
                    <i class="fas fa-key"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getRoleBadgeColor(role) {
    const colors = {
        'admin': 'danger',
        'hr': 'info',
        'supervisor': 'success',
        'intern': 'primary'
    };
    return colors[role] || 'secondary';
}

function getStatusBadgeColor(status) {
    const colors = {
        'active': 'success',
        'inactive': 'secondary',
        'suspended': 'danger'
    };
    return colors[status] || 'secondary';
}

function filterUsers() {
    const roleFilter = document.getElementById('role-filter').value;
    const departmentFilter = document.getElementById('department-filter').value;
    const searchTerm = document.getElementById('search-user').value.toLowerCase();
    
    const filteredUsers = users.filter(user => {
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesDepartment = !departmentFilter || user.department === departmentFilter;
        const matchesSearch = !searchTerm || 
            user.firstname.toLowerCase().includes(searchTerm) ||
            user.lastname.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm);
        
        return matchesRole && matchesDepartment && matchesSearch;
    });
    
    renderFilteredUsers(filteredUsers);
}

function renderFilteredUsers(filteredUsers) {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstname} ${user.lastname}</td>
            <td>${user.email}</td>
            <td><span class="badge bg-${getRoleBadgeColor(user.role)}">${user.role}</span></td>
            <td>${user.department || '-'}</td>
            <td><span class="badge bg-${getStatusBadgeColor(user.status)}">${user.status}</span></td>
            <td>${formatDateTime(user.lastLogin)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="resetPassword(${user.id})">
                    <i class="fas fa-key"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Modal functions
function showAddUserModal() {
    const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
    modal.show();
}

function showEditUserModal(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Populate form fields
    document.getElementById('edit-user-id').value = user.id;
    document.getElementById('edit-user-firstname').value = user.firstname;
    document.getElementById('edit-user-lastname').value = user.lastname;
    document.getElementById('edit-user-email').value = user.email;
    document.getElementById('edit-user-phone').value = user.phone || '';
    document.getElementById('edit-user-role').value = user.role;
    document.getElementById('edit-user-department').value = user.department || '';
    document.getElementById('edit-user-status').value = user.status;
    document.getElementById('edit-user-password').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

function showAssignSupervisorModal() {
    // Load interns and supervisors for the modal
    loadInternsForAssignment();
    loadSupervisorsForAssignment();
    
    const modal = new bootstrap.Modal(document.getElementById('assignSupervisorModal'));
    modal.show();
}

// User CRUD operations
function addUser() {
    const form = document.getElementById('add-user-form');
    const formData = new FormData(form);
    
    // Validate form
    if (!validateUserForm(formData)) {
        return;
    }
    
    // Simulate API call
    const newUser = {
        id: users.length + 1,
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('role'),
        department: formData.get('department'),
        status: 'active',
        lastLogin: null
    };
    
    users.push(newUser);
    renderUsersTable();
    
    // Close modal and show success message
    bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
    showAlert('User added successfully!', 'success');
    
    // Log the action
    logAuditAction('create', 'user', `Added user: ${newUser.firstname} ${newUser.lastname}`);
}

function updateUser() {
    const userId = document.getElementById('edit-user-id').value;
    const user = users.find(u => u.id == userId);
    if (!user) return;
    
    // Update user data
    user.firstname = document.getElementById('edit-user-firstname').value;
    user.lastname = document.getElementById('edit-user-lastname').value;
    user.email = document.getElementById('edit-user-email').value;
    user.phone = document.getElementById('edit-user-phone').value;
    user.role = document.getElementById('edit-user-role').value;
    user.department = document.getElementById('edit-user-department').value;
    user.status = document.getElementById('edit-user-status').value;
    
    // Update password if provided
    const newPassword = document.getElementById('edit-user-password').value;
    if (newPassword) {
        // In real implementation, hash the password
        console.log('Password updated for user:', user.email);
    }
    
    renderUsersTable();
    
    // Close modal and show success message
    bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
    showAlert('User updated successfully!', 'success');
    
    // Log the action
    logAuditAction('update', 'user', `Updated user: ${user.firstname} ${user.lastname}`);
}

function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Remove user from array
    users = users.filter(u => u.id !== userId);
    renderUsersTable();
    
    showAlert('User deleted successfully!', 'success');
    
    // Log the action
    logAuditAction('delete', 'user', `Deleted user: ${user.firstname} ${user.lastname}`);
}

function resetPassword(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Generate new password
    const newPassword = generatePassword();
    
    // In real implementation, update password in database
    console.log('New password for', user.email, ':', newPassword);
    
    showAlert(`Password reset for ${user.email}. New password: ${newPassword}`, 'info');
    
    // Log the action
    logAuditAction('update', 'password', `Reset password for user: ${user.email}`);
}

// Organizational Structure functions
function loadOrganizationalStructure() {
    // Simulate API call to get organizational structure
    divisions = [
        { id: 1, name: 'Finance Division', director: 'Norman' },
        { id: 2, name: 'Engineering Division', director: 'Kawuma' },
        { id: 3, name: 'Human Resources Division', director: 'Nabwire' }
    ];
    
    departments = [
        { id: 1, name: 'Accounting', division: 'Finance Division', manager: 'Senoga' },
        { id: 2, name: 'Budgeting', division: 'Finance Division', manager: 'Katumwa' },
        { id: 3, name: 'Civil Engineering', division: 'Engineering Division', manager: 'Mirembe' },
        { id: 4, name: 'Electrical Engineering', division: 'Engineering Division', manager: 'Namazi' },
        { id: 5, name: 'Recruitment', division: 'Human Resources Division', manager: 'Atwine' }
    ];
    
    renderOrganizationalStructure();
}

function renderOrganizationalStructure() {
    renderDivisions();
    renderDepartments();
}

function renderDivisions() {
    const container = document.getElementById('divisions-list');
    container.innerHTML = '';
    
    divisions.forEach(division => {
        const divisionCard = document.createElement('div');
        divisionCard.className = 'card mb-2';
        divisionCard.innerHTML = `
            <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${division.name}</h6>
                        <small class="text-muted">Director: ${division.director}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editDivision(${division.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDivision(${division.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(divisionCard);
    });
}

function renderDepartments() {
    const container = document.getElementById('departments-list');
    container.innerHTML = '';
    
    departments.forEach(department => {
        const departmentCard = document.createElement('div');
        departmentCard.className = 'card mb-2';
        departmentCard.innerHTML = `
            <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${department.name}</h6>
                        <small class="text-muted">Division: ${department.division}</small><br>
                        <small class="text-muted">Manager: ${department.manager}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editDepartment(${department.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDepartment(${department.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(departmentCard);
    });
}

// Supervisor Assignment functions
function loadSupervisorAssignments() {
    // Load unassigned interns
    const unassignedInterns = users.filter(user => user.role === 'intern' && !user.supervisorId);
    renderUnassignedInterns(unassignedInterns);
    
    // Load current assignments
    const assignments = [
        { intern: 'Tracy', supervisor: 'Aron', department: 'Finance', date: '2024-01-10' },
        { intern: 'Davis', supervisor: 'Calvin', department: 'Engineering', date: '2024-01-08' },
        { intern: 'Mutoni', supervisor: 'Norman', department: 'HR', date: '2024-01-05' }
    ];
    renderCurrentAssignments(assignments);
}

function renderUnassignedInterns(interns) {
    const container = document.getElementById('unassigned-interns');
    container.innerHTML = '';
    
    if (interns.length === 0) {
        container.innerHTML = '<p class="text-muted">All interns have been assigned supervisors.</p>';
        return;
    }
    
    interns.forEach(intern => {
        const internCard = document.createElement('div');
        internCard.className = 'user-card';
        internCard.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="user-avatar me-3">${intern.firstname.charAt(0)}${intern.lastname.charAt(0)}</div>
                <div class="flex-grow-1">
                    <h6 class="mb-1">${intern.firstname} ${intern.lastname}</h6>
                    <small class="text-muted">${intern.department} • ${intern.email}</small>
                </div>
                <button class="btn btn-sm btn-primary" onclick="assignSupervisorToIntern(${intern.id})">
                    Assign
                </button>
            </div>
        `;
        container.appendChild(internCard);
    });
}

function renderCurrentAssignments(assignments) {
    const container = document.getElementById('current-assignments');
    container.innerHTML = '';
    
    assignments.forEach(assignment => {
        const assignmentCard = document.createElement('div');
        assignmentCard.className = 'assignment-card';
        assignmentCard.innerHTML = `
            <div class="assignment-header">
                <span class="assignment-intern">${assignment.intern}</span>
                <small class="text-muted">${assignment.date}</small>
            </div>
            <div class="assignment-details">
                <small class="text-muted">Supervisor: </small>
                <span class="assignment-supervisor">${assignment.supervisor}</span>
                <br>
                <small class="text-muted">Department: ${assignment.department}</small>
            </div>
            <div class="mt-2">
                <button class="btn btn-sm btn-outline-warning me-1" onclick="reassignSupervisor('${assignment.intern}')">
                    Reassign
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeAssignment('${assignment.intern}')">
                    Remove
                </button>
            </div>
        `;
        container.appendChild(assignmentCard);
    });
}

function assignSupervisor() {
    const internId = document.getElementById('assign-intern').value;
    const supervisorId = document.getElementById('assign-supervisor').value;
    const notes = document.getElementById('assignment-notes').value;
    
    if (!internId || !supervisorId) {
        showAlert('Please select both intern and supervisor.', 'warning');
        return;
    }
    
    // In real implementation, save assignment to database
    console.log('Assigning supervisor', supervisorId, 'to intern', internId, 'with notes:', notes);
    
    // Close modal and show success message
    bootstrap.Modal.getInstance(document.getElementById('assignSupervisorModal')).hide();
    showAlert('Supervisor assigned successfully!', 'success');
    
    // Reload assignments
    loadSupervisorAssignments();
    
    // Log the action
    logAuditAction('create', 'assignment', `Assigned supervisor to intern`);
}

// Audit Logs functions
function loadAuditLogs() {
    // Simulate API call to get audit logs
    auditLogs = [
        {
            id: 1,
            timestamp: '2024-01-15 10:30:00',
            user: 'Tendo',
            action: 'create',
            details: 'Added new user: Taliq',
            ipAddress: '192.168.1.100'
        },
        {
            id: 2,
            timestamp: '2024-01-15 10:25:00',
            user: 'Wilber',
            action: 'login',
            details: 'User logged in successfully',
            ipAddress: '192.168.1.101'
        },
        {
            id: 3,
            timestamp: '2024-01-15 10:20:00',
            user: 'Tendo',
            action: 'update',
            details: 'Updated system settings',
            ipAddress: '192.168.1.100'
        },
        {
            id: 4,
            timestamp: '2024-01-15 10:15:00',
            user: 'Wilber',
            action: 'logout',
            details: 'User logged out',
            ipAddress: '192.168.1.102'
        }
    ];
    
    renderAuditLogs();
}

function renderAuditLogs() {
    const tbody = document.getElementById('audit-logs-table-body');
    tbody.innerHTML = '';
    
    auditLogs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDateTime(log.timestamp)}</td>
            <td>${log.user}</td>
            <td><span class="badge bg-${getActionBadgeColor(log.action)}">${log.action}</span></td>
            <td>${log.details}</td>
            <td>${log.ipAddress}</td>
        `;
        tbody.appendChild(row);
    });
}

function getActionBadgeColor(action) {
    const colors = {
        'login': 'success',
        'logout': 'secondary',
        'create': 'primary',
        'update': 'info',
        'delete': 'danger'
    };
    return colors[action] || 'secondary';
}

function filterAuditLogs() {
    const actionFilter = document.getElementById('log-action-filter').value;
    const userFilter = document.getElementById('log-user-filter').value;
    const dateFrom = document.getElementById('log-date-from').value;
    const dateTo = document.getElementById('log-date-to').value;
    
    const filteredLogs = auditLogs.filter(log => {
        const matchesAction = !actionFilter || log.action === actionFilter;
        const matchesUser = !userFilter || log.user === userFilter;
        const matchesDateFrom = !dateFrom || log.timestamp >= dateFrom;
        const matchesDateTo = !dateTo || log.timestamp <= dateTo;
        
        return matchesAction && matchesUser && matchesDateFrom && matchesDateTo;
    });
    
    renderFilteredAuditLogs(filteredLogs);
}

function renderFilteredAuditLogs(filteredLogs) {
    const tbody = document.getElementById('audit-logs-table-body');
    tbody.innerHTML = '';
    
    filteredLogs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDateTime(log.timestamp)}</td>
            <td>${log.user}</td>
            <td><span class="badge bg-${getActionBadgeColor(log.action)}">${log.action}</span></td>
            <td>${log.details}</td>
            <td>${log.ipAddress}</td>
        `;
        tbody.appendChild(row);
    });
}

function exportAuditLogs() {
    // In real implementation, generate and download CSV/Excel file
    console.log('Exporting audit logs...');
    showAlert('Audit logs exported successfully!', 'success');
}

function clearAuditLogs() {
    if (!confirm('Are you sure you want to clear all audit logs? This action cannot be undone.')) {
        return;
    }
    
    auditLogs = [];
    renderAuditLogs();
    showAlert('Audit logs cleared successfully!', 'success');
}

// System Settings functions
function loadSystemSettings() {
    // Simulate API call to get system settings
    systemSettings = {
        sessionTimeout: 30,
        maxFileSize: 5,
        maintenanceMode: false,
        requireUppercase: true,
        requireNumbers: true,
        requireSymbols: true,
        minPasswordLength: 8,
        mfaRequired: true
    };
    
    populateSystemSettingsForm();
}

function populateSystemSettingsForm() {
    document.getElementById('session-timeout').value = systemSettings.sessionTimeout;
    document.getElementById('max-file-size').value = systemSettings.maxFileSize;
    document.getElementById('maintenance-mode').checked = systemSettings.maintenanceMode;
    document.getElementById('require-uppercase').checked = systemSettings.requireUppercase;
    document.getElementById('require-numbers').checked = systemSettings.requireNumbers;
    document.getElementById('require-symbols').checked = systemSettings.requireSymbols;
    document.getElementById('min-password-length').value = systemSettings.minPasswordLength;
    document.getElementById('mfa-required').checked = systemSettings.mfaRequired;
}

function saveSystemSettings() {
    // Collect form data
    systemSettings = {
        sessionTimeout: parseInt(document.getElementById('session-timeout').value),
        maxFileSize: parseInt(document.getElementById('max-file-size').value),
        maintenanceMode: document.getElementById('maintenance-mode').checked,
        requireUppercase: document.getElementById('require-uppercase').checked,
        requireNumbers: document.getElementById('require-numbers').checked,
        requireSymbols: document.getElementById('require-symbols').checked,
        minPasswordLength: parseInt(document.getElementById('min-password-length').value),
        mfaRequired: document.getElementById('mfa-required').checked
    };
    
    // In real implementation, save to database
    console.log('Saving system settings:', systemSettings);
    
    showAlert('System settings saved successfully!', 'success');
    
    // Log the action
    logAuditAction('update', 'settings', 'Updated system settings');
}

// Utility functions
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '-';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
}

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of main content
    const main = document.querySelector('main');
    main.insertBefore(alertDiv, main.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function logAuditAction(action, resource, details) {
    const logEntry = {
        id: auditLogs.length + 1,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: 'Admin', // In real implementation, get current user
        action: action,
        details: details,
        ipAddress: '192.168.1.100' // In real implementation, get actual IP
    };
    
    auditLogs.unshift(logEntry);
    
    // Update audit logs table if currently visible
    if (currentSection === 'audit-logs') {
        renderAuditLogs();
    }
}

function setupFormValidations() {
    // Password confirmation validation
    const passwordField = document.getElementById('user-password');
    const confirmPasswordField = document.getElementById('user-confirm-password');
    
    if (passwordField && confirmPasswordField) {
        confirmPasswordField.addEventListener('input', function() {
            if (passwordField.value !== confirmPasswordField.value) {
                confirmPasswordField.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordField.setCustomValidity('');
            }
        });
    }
}

function setupAutoSave() {
    // Auto-save system settings every 30 seconds
    setInterval(() => {
        if (currentSection === 'system-settings') {
            // Only auto-save if form has been modified
            console.log('Auto-saving system settings...');
        }
    }, 30000);
}

function validateUserForm(formData) {
    const requiredFields = ['firstname', 'lastname', 'email', 'role'];
    
    for (const field of requiredFields) {
        if (!formData.get(field)) {
            showAlert(`Please fill in the ${field} field.`, 'warning');
            return false;
        }
    }
    
    // Validate email format
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'warning');
        return false;
    }
    
    // Validate password strength
    const password = formData.get('password');
    if (password && password.length < 8) {
        showAlert('Password must be at least 8 characters long.', 'warning');
        return false;
    }
    
    return true;
}

// Profile and logout functions
function showProfile() {
    // In real implementation, show user profile modal
    alert('Profile functionality - to be implemented');
}

function changePassword() {
    // In real implementation, show change password modal
    alert('Change password functionality - to be implemented');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In real implementation, clear session and redirect to login
        window.location.href = 'login.html';
    }
}

// Additional helper functions for organizational structure
function showAddDivisionModal() {
    // In real implementation, show add division modal
    alert('Add division functionality - to be implemented');
}

function showAddDepartmentModal() {
    // In real implementation, show add department modal
    alert('Add department functionality - to be implemented');
}

function editDivision(divisionId) {
    // In real implementation, show edit division modal
    alert(`Edit division ${divisionId} - to be implemented`);
}

function deleteDivision(divisionId) {
    if (confirm('Are you sure you want to delete this division?')) {
        // In real implementation, delete division
        alert(`Delete division ${divisionId} - to be implemented`);
    }
}

function editDepartment(departmentId) {
    // In real implementation, show edit department modal
    alert(`Edit department ${departmentId} - to be implemented`);
}

function deleteDepartment(departmentId) {
    if (confirm('Are you sure you want to delete this department?')) {
        // In real implementation, delete department
        alert(`Delete department ${departmentId} - to be implemented`);
    }
}

function loadInternsForAssignment() {
    const internSelect = document.getElementById('assign-intern');
    internSelect.innerHTML = '<option value="">Select Intern</option>';
    
    const interns = users.filter(user => user.role === 'intern' && !user.supervisorId);
    interns.forEach(intern => {
        const option = document.createElement('option');
        option.value = intern.id;
        option.textContent = `${intern.firstname} ${intern.lastname} (${intern.department})`;
        internSelect.appendChild(option);
    });
}

function loadSupervisorsForAssignment() {
    const supervisorSelect = document.getElementById('assign-supervisor');
    supervisorSelect.innerHTML = '<option value="">Select Supervisor</option>';
    
    const supervisors = users.filter(user => user.role === 'supervisor');
    supervisors.forEach(supervisor => {
        const option = document.createElement('option');
        option.value = supervisor.id;
        option.textContent = `${supervisor.firstname} ${supervisor.lastname} (${supervisor.department})`;
        supervisorSelect.appendChild(option);
    });
}

function assignSupervisorToIntern(internId) {
    // In real implementation, show assignment modal
    alert(`Assign supervisor to intern ${internId} - to be implemented`);
}

function reassignSupervisor(internName) {
    // In real implementation, show reassignment modal
    alert(`Reassign supervisor for ${internName} - to be implemented`);
}

function removeAssignment(internName) {
    if (confirm(`Are you sure you want to remove the supervisor assignment for ${internName}?`)) {
        // In real implementation, remove assignment
        alert(`Remove assignment for ${internName} - to be implemented`);
    }
} 