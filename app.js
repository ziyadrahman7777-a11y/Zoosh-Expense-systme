// ZOOSH Finance - Core Logic & Local Storage Database Engine

// Default database seeding structures
const SEED_USERS = [
    { id: 'usr-1', name: 'Ziyad (Owner)', role: 'owner', email: 'owner@zoosh.com' },
    { id: 'usr-2', name: 'Madhavan (Manager)', role: 'manager', email: 'manager@zoosh.com' },
    { id: 'usr-3', name: 'Rahim (Staff)', role: 'staff', email: 'staff@zoosh.com' },
    { id: 'usr-4', name: 'Geetha (Accountant)', role: 'accountant', email: 'accountant@zoosh.com' }
];

const SEED_VENDORS = [
    { id: 'vnd-1', name: 'Malabar Wood & Plywoods', phone: '9847012345', gst: '32AABCM1234F1Z9', address: 'Main Road, Kallai, Kozhikode', openingBalance: 0, outstandingAmount: 0 },
    { id: 'vnd-2', name: 'Steel Craft Hardwares', phone: '9847056789', gst: '32AAPCH9876C1ZA', address: 'Link Road, Kozhikode', openingBalance: 0, outstandingAmount: 0 },
    { id: 'vnd-3', name: 'Royal Fabrics & Foam', phone: '9447123456', gst: '32AAECR4567R1ZB', address: 'Stadium Junction, Palakkad', openingBalance: 0, outstandingAmount: 0 },
    { id: 'vnd-4', name: 'Speed Logistics & Transport', phone: '9846098765', gst: '32AATCT0987D1ZC', address: 'NH Bypass, Palakkad', openingBalance: 0, outstandingAmount: 0 },
    { id: 'vnd-5', name: 'Power Tools & Spares', phone: '9446012345', gst: '32AAPCP4321P1ZD', address: 'Town Bus Stand, Pattambi', openingBalance: 0, outstandingAmount: 0 },
    { id: 'vnd-6', name: 'Office Depot & Stationers', phone: '9947112233', gst: '32AABCO5555S1ZE', address: 'Palakkad Road, Pattambi', openingBalance: 0, outstandingAmount: 0 }
];

const SEED_PROJECTS = [
    { id: 'prj-1', name: 'Villa Project - Palakkad', client: 'Dr. Haridasan Nair', budget: 1200000, spent: 0 },
    { id: 'prj-2', name: 'House Project - Pattambi', client: 'Smt. Valsala Devi', budget: 800000, spent: 0 },
    { id: 'prj-3', name: 'Office Furniture Renovation', client: 'Malabar Capital Group', budget: 350000, spent: 0 },
    { id: 'prj-4', name: 'General Factory Expense', client: 'Internal Factory', budget: 500000, spent: 0 },
    { id: 'prj-none', name: 'No Project (General Office)', client: 'N/A', budget: 0, spent: 0 }
];

const SEED_EXPENSES = [];

const SEED_INCOMES = [
    { id: 'INC-001', amount: 500000, customer: 'Dr. Haridasan Nair', bankAccount: 'HDFC Current Account', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Advance Payment for Villa Project - Palakkad', attachments: [] },
    { id: 'INC-002', amount: 200000, customer: 'Smt. Valsala Devi', bankAccount: 'Hafeez Personal Account', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), description: 'Advance Payment for House Project - Pattambi', attachments: [] }
];

const SEED_TRANSFERS = [
    { id: 'TRF-001', fromAccount: 'HDFC Current Account', toAccount: 'Hafeez Personal Account', amount: 150000, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Internal Transfer of Funds', attachments: [] },
    { id: 'TRF-002', fromAccount: 'Hafeez Personal Account', toAccount: 'Cash', amount: 20000, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Cash withdrawal for office petty expenses', attachments: [] }
];

const SEED_NOTIFICATIONS = [];

const CATEGORY_ICONS = {
    'Wood': 'layers',
    'Plywood': 'grid',
    'Laminate': 'square',
    'Hardware': 'nut',
    'Glass': 'wind',
    'Mirror': 'smile',
    'Paint': 'paint-brush',
    'Polish': 'sparkles',
    'Upholstery': 'sofa',
    'Transport': 'truck',
    'Salary': 'contact-2',
    'Advance': 'badge-indian-rupee',
    'Electricity': 'zap',
    'Rent': 'home',
    'Office': 'printer',
    'Machinery': 'cpu',
    'Tools': 'wrench',
    'Maintenance': 'shield-alert',
    'Marketing': 'megaphone',
    'Petty Cash': 'wallet',
    'Other': 'package'
};

// Database class wrapping Local Storage
class Database {
    constructor() {
        this.init();
    }

    init() {
        // Migration reset block v5 to clean all finance data including transactions
        if (!localStorage.getItem('zoosh_db_clean_reset_v5')) {
            localStorage.setItem('zoosh_expenses', JSON.stringify([]));
            localStorage.setItem('zoosh_notifications', JSON.stringify([]));
            localStorage.setItem('zoosh_transactions', JSON.stringify([]));
            localStorage.setItem('zoosh_incomes', JSON.stringify(SEED_INCOMES));
            localStorage.setItem('zoosh_transfers', JSON.stringify(SEED_TRANSFERS));
            
            // Reset projects spent to 0
            const projects = JSON.parse(localStorage.getItem('zoosh_projects') || JSON.stringify(SEED_PROJECTS));
            projects.forEach(p => p.spent = 0);
            localStorage.setItem('zoosh_projects', JSON.stringify(projects));
            
            // Reset vendors outstanding to 0
            const vendors = JSON.parse(localStorage.getItem('zoosh_vendors') || JSON.stringify(SEED_VENDORS));
            vendors.forEach(v => {
                v.openingBalance = 0;
                v.outstandingAmount = 0;
            });
            localStorage.setItem('zoosh_vendors', JSON.stringify(vendors));
            
            localStorage.setItem('zoosh_db_clean_reset_v5', 'true');
        }

        if (!localStorage.getItem('zoosh_users')) {
            localStorage.setItem('zoosh_users', JSON.stringify(SEED_USERS));
        }
        if (!localStorage.getItem('zoosh_vendors')) {
            localStorage.setItem('zoosh_vendors', JSON.stringify(SEED_VENDORS));
        }
        if (!localStorage.getItem('zoosh_projects')) {
            localStorage.setItem('zoosh_projects', JSON.stringify(SEED_PROJECTS));
        }
        if (!localStorage.getItem('zoosh_expenses')) {
            localStorage.setItem('zoosh_expenses', JSON.stringify(SEED_EXPENSES));
        }
        if (!localStorage.getItem('zoosh_incomes')) {
            localStorage.setItem('zoosh_incomes', JSON.stringify(SEED_INCOMES));
        }
        if (!localStorage.getItem('zoosh_transfers')) {
            localStorage.setItem('zoosh_transfers', JSON.stringify(SEED_TRANSFERS));
        }
        if (!localStorage.getItem('zoosh_notifications')) {
            localStorage.setItem('zoosh_notifications', JSON.stringify(SEED_NOTIFICATIONS));
        }
        if (!localStorage.getItem('zoosh_custom_categories')) {
            localStorage.setItem('zoosh_custom_categories', JSON.stringify([]));
        }
    }

    getTransactions() {
        if (!localStorage.getItem('zoosh_transactions')) {
            localStorage.setItem('zoosh_transactions', JSON.stringify([]));
        }
        return this.getData('zoosh_transactions') || [];
    }

    getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getUsers() { return this.getData('zoosh_users'); }
    getVendors() { return this.getData('zoosh_vendors'); }
    getProjects() { return this.getData('zoosh_projects'); }
    getExpenses() { return this.getData('zoosh_expenses'); }
    getIncomes() {
        if (!localStorage.getItem('zoosh_incomes')) {
            localStorage.setItem('zoosh_incomes', JSON.stringify([]));
        }
        return this.getData('zoosh_incomes') || [];
    }
    getTransfers() {
        if (!localStorage.getItem('zoosh_transfers')) {
            localStorage.setItem('zoosh_transfers', JSON.stringify([]));
        }
        return this.getData('zoosh_transfers') || [];
    }
    getNotifications() { return this.getData('zoosh_notifications'); }
    getCustomCategories() { return this.getData('zoosh_custom_categories'); }

    saveIncome(income) {
        const incomes = this.getIncomes();
        const index = incomes.findIndex(i => i.id === income.id);
        if (index > -1) {
            incomes[index] = income;
        } else {
            incomes.unshift(income);
        }
        this.setData('zoosh_incomes', incomes);
        if (typeof pushToSupabase === 'function') {
            pushToSupabase('incomes', income);
        }
    }

    deleteIncome(id) {
        let incomes = this.getIncomes();
        incomes = incomes.filter(i => i.id !== id);
        this.setData('zoosh_incomes', incomes);
        if (typeof deleteFromSupabase === 'function') {
            deleteFromSupabase('incomes', id);
        }
    }

    saveTransfer(transfer) {
        const transfers = this.getTransfers();
        const index = transfers.findIndex(t => t.id === transfer.id);
        if (index > -1) {
            transfers[index] = transfer;
        } else {
            transfers.unshift(transfer);
        }
        this.setData('zoosh_transfers', transfers);
        if (typeof pushToSupabase === 'function') {
            pushToSupabase('transfers', transfer);
        }
    }

    deleteTransfer(id) {
        let transfers = this.getTransfers();
        transfers = transfers.filter(t => t.id !== id);
        this.setData('zoosh_transfers', transfers);
        if (typeof deleteFromSupabase === 'function') {
            deleteFromSupabase('transfers', id);
        }
    }

    saveExpense(expense) {
        const expenses = this.getExpenses();
        const index = expenses.findIndex(e => e.id === expense.id);
        if (index > -1) {
            expenses[index] = expense;
        } else {
            expenses.unshift(expense);
        }
        this.setData('zoosh_expenses', expenses);
        this.recalculateProjectSpending();
        if (typeof pushToSupabase === 'function') {
            pushToSupabase('expenses', expense);
        }
    }

    deleteExpense(id) {
        let expenses = this.getExpenses();
        expenses = expenses.filter(e => e.id !== id);
        this.setData('zoosh_expenses', expenses);
        this.recalculateProjectSpending();
        if (typeof deleteFromSupabase === 'function') {
            deleteFromSupabase('expenses', id);
        }
    }

    recalculateProjectSpending() {
        const expenses = this.getExpenses();
        const projects = this.getProjects();
        
        projects.forEach(proj => {
            if (proj.id === 'prj-none') return;
            const projectExpenses = expenses.filter(e => e.projectId === proj.id && (e.status === 'Approved' || e.status === 'Paid' || e.status === 'Pending'));
            proj.spent = projectExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
        });
        
        this.setData('zoosh_projects', projects);
    }
}

// App State Management
const db = new Database();
let currentRole = 'owner';
let currentUser = db.getUsers().find(u => u.role === 'owner');
let activeView = 'dashboard';
let expenseFilterDate = 'this-month';
let expenseFilterSearch = '';
let expenseSort = 'newest';
let activeFilters = {
    vendor: 'all',
    category: 'all',
    project: 'all',
    paymentMethod: 'all',
    status: 'all'
};
let voiceRecordingState = {
    isRecording: false,
    duration: 0,
    interval: null
};

// UI Element Bindings
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    initSupabase();
    switchView('dashboard');
});

function initApp() {
    // Populate role avatar
    updateUserContext();
    populateSelectDropdowns();
    renderNotifications();
}

function updateUserContext() {
    currentUser = db.getUsers().find(u => u.role === currentRole);
    
    // Update role select values
    const roleSelect = document.getElementById('active-role-switcher');
    const roleSelectMob = document.getElementById('active-role-switcher-mob');
    if (roleSelect) roleSelect.value = currentRole;
    if (roleSelectMob) roleSelectMob.value = currentRole;
    
    // Update top bar role displays
    document.querySelectorAll('.user-avatar').forEach(el => {
        el.textContent = currentUser.name.charAt(0);
    });
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = currentUser.name;
    });
    document.querySelectorAll('.user-role').forEach(el => {
        el.textContent = currentUser.role;
    });
    
    // Manage sidebar visibility and controls according to role-based permission matrix
    const accountantMenu = document.querySelector('[data-view="add-expense"]');
    if (currentRole === 'accountant') {
        accountantMenu?.style.setProperty('display', 'none', 'important');
        document.querySelector('.floating-add-btn')?.style.setProperty('display', 'none', 'important');
    } else {
        accountantMenu?.style.removeProperty('display');
        document.querySelector('.floating-add-btn')?.style.removeProperty('display');
    }

    // Refresh active view to enforce role checks immediately
    switchView(activeView);
}

function populateSelectDropdowns() {
    const expenses = db.getExpenses();
    const projects = db.getProjects();
    const customCats = db.getCustomCategories();
    
    // Add Expense dropdowns (if exists)
    const expProject = document.getElementById('exp-project');
    if (expProject) {
        expProject.innerHTML = '<option value="">Select Project (Optional)</option>';
        projects.forEach(p => {
            expProject.innerHTML += `<option value="${p.id}">${p.name} (${p.client})</option>`;
        });
    }

    // Populate category dropdown (if exists)
    const expCategory = document.getElementById('exp-category');
    if (expCategory) {
        expCategory.innerHTML = '<option value="">Select Category</option>';
        const defaultCats = [
            'Wood', 'Plywood', 'Laminate', 'Hardware', 'Glass', 'Mirror', 
            'Paint', 'Polish', 'Upholstery', 'Transport', 'Salary', 'Advance', 
            'Electricity', 'Rent', 'Office', 'Machinery', 'Tools', 'Maintenance', 
            'Marketing', 'Petty Cash', 'Other'
        ];
        const allCats = [...defaultCats, ...customCats];
        allCats.forEach(c => {
            expCategory.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }

    // Filter controls dropdowns
    const filterVendor = document.getElementById('filter-vendor');
    if (filterVendor) {
        filterVendor.innerHTML = '<option value="all">All Vendors</option>';
        const uniqueVendors = [...new Set(expenses.map(e => e.vendorId).filter(Boolean))];
        uniqueVendors.sort().forEach(v => {
            filterVendor.innerHTML += `<option value="${v}">${v}</option>`;
        });
    }

    const filterProject = document.getElementById('filter-project');
    if (filterProject) {
        filterProject.innerHTML = '<option value="all">All Projects</option>';
        projects.forEach(p => {
            filterProject.innerHTML += `<option value="${p.id}">${p.name}</option>`;
        });
    }
}

// Global Routing
function switchView(viewId) {
    activeView = viewId;
    
    // Check permissions
    if (viewId === 'add-expense' && currentRole === 'accountant') {
        switchView('dashboard');
        return;
    }

    // Toggle active class on views
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Toggle active class on sidebar items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === viewId) {
            item.classList.add('active');
        }
    });

    // Toggle active class on mobile bottom navigation
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === viewId) {
            item.classList.add('active');
        }
    });

    // Execute view initialization triggers
    if (viewId === 'dashboard') {
        renderDashboard();
    } else if (viewId === 'expenses') {
        renderExpensesList();
    } else if (viewId === 'incomes') {
        renderIncomesList();
    } else if (viewId === 'transfers') {
        renderTransfersList();
    } else if (viewId === 'vendors') {
        renderVendorsList();
    } else if (viewId === 'projects') {
        renderProjectsList();
    } else if (viewId === 'reports') {
        renderReportsView();
    }
    
    // Close sidebar on mobile
    document.querySelector('.app-sidebar').classList.remove('active');
    
    // Scroll window to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------
// VIEW RENDERING MODULES
// ----------------------------------------------------

function renderDashboard() {
    const expenses = db.getExpenses();
    const vendors = db.getVendors();
    const projects = db.getProjects();
    const incomes = db.getIncomes();
    const transfers = db.getTransfers();
    
    // ----------------------------------------------------
    // DYNAMIC BANK ACCOUNT RECALCULATIONS
    // ----------------------------------------------------
    // HDFC Current Account
    const incomesToHdfc = incomes.filter(i => i.bankAccount === 'HDFC Current Account').reduce((sum, i) => sum + Number(i.amount), 0);
    const transfersToHdfc = transfers.filter(t => t.toAccount === 'HDFC Current Account').reduce((sum, t) => sum + Number(t.amount), 0);
    const expensesFromHdfc = expenses.filter(e => e.bankAccount === 'HDFC Current Account' && e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);
    const transfersFromHdfc = transfers.filter(t => t.fromAccount === 'HDFC Current Account').reduce((sum, t) => sum + Number(t.amount), 0);
    
    const hdfcIncome = incomesToHdfc + transfersToHdfc;
    const hdfcExpenses = expensesFromHdfc + transfersFromHdfc;
    const hdfcBalance = hdfcIncome - hdfcExpenses;

    // Hafeez Personal Account
    const incomesToHafeez = incomes.filter(i => i.bankAccount === 'Hafeez Personal Account').reduce((sum, i) => sum + Number(i.amount), 0);
    const transfersToHafeez = transfers.filter(t => t.toAccount === 'Hafeez Personal Account').reduce((sum, t) => sum + Number(t.amount), 0);
    const expensesFromHafeez = expenses.filter(e => e.bankAccount === 'Hafeez Personal Account' && e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);
    const transfersFromHafeez = transfers.filter(t => t.fromAccount === 'Hafeez Personal Account').reduce((sum, t) => sum + Number(t.amount), 0);
    
    const hafeezIncome = incomesToHafeez + transfersToHafeez;
    const hafeezExpenses = expensesFromHafeez + transfersFromHafeez;
    const hafeezBalance = hafeezIncome - hafeezExpenses;

    // Overall metrics
    const overallTotalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    const overallTotalExpenses = expenses.filter(e => e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);
    const netCashFlow = overallTotalIncome - overallTotalExpenses;

    // Expense calculation helper for top cards
    const today = new Date().toISOString().split('T')[0];
    const todayExpenses = expenses
        .filter(e => e.createdAt.startsWith(today) && e.status !== 'Rejected' && e.status !== 'Cancelled')
        .reduce((sum, e) => sum + Number(e.amount), 0);
        
    const todayTransactionsCount = expenses.filter(e => e.createdAt.startsWith(today)).length;
    
    // Calculate week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekExpenses = expenses
        .filter(e => new Date(e.createdAt) >= oneWeekAgo && e.status !== 'Rejected' && e.status !== 'Cancelled')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    // Calculate month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const monthExpenses = expenses
        .filter(e => new Date(e.createdAt) >= startOfMonth && e.status !== 'Rejected' && e.status !== 'Cancelled')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const supplierOutstanding = expenses.filter(e => e.status !== 'Paid' && e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);

    // Update UI Cards
    const todayExpEl = document.getElementById('dash-today-expenses');
    if (todayExpEl) todayExpEl.textContent = formatCurrency(todayExpenses);
    const todayTxnEl = document.getElementById('dash-today-txns');
    if (todayTxnEl) todayTxnEl.textContent = todayTransactionsCount + ' Payments';
    const weekExpEl = document.getElementById('dash-week-expenses');
    if (weekExpEl) weekExpEl.textContent = formatCurrency(weekExpenses);
    const monthExpEl = document.getElementById('dash-month-expenses');
    if (monthExpEl) monthExpEl.textContent = formatCurrency(monthExpenses);
    const outstandEl = document.getElementById('dash-supplier-outstanding');
    if (outstandEl) outstandEl.textContent = formatCurrency(supplierOutstanding);

    // Update bank wallets displays
    const hdfcBalEl = document.getElementById('dash-hdfc-balance');
    const hdfcIncEl = document.getElementById('dash-hdfc-income');
    const hdfcExpEl = document.getElementById('dash-hdfc-expenses');
    
    const hafeezBalEl = document.getElementById('dash-hafeez-balance');
    const hafeezIncEl = document.getElementById('dash-hafeez-income');
    const hafeezExpEl = document.getElementById('dash-hafeez-expenses');
    
    const overallIncEl = document.getElementById('dash-overall-income');
    const overallExpEl = document.getElementById('dash-overall-expenses');
    const netCashFlowEl = document.getElementById('dash-net-cash-flow');

    if (hdfcBalEl) hdfcBalEl.textContent = formatCurrency(hdfcBalance);
    if (hdfcIncEl) hdfcIncEl.textContent = formatCurrency(hdfcIncome);
    if (hdfcExpEl) hdfcExpEl.textContent = formatCurrency(hdfcExpenses);
    
    if (hafeezBalEl) hafeezBalEl.textContent = formatCurrency(hafeezBalance);
    if (hafeezIncEl) hafeezIncEl.textContent = formatCurrency(hafeezIncome);
    if (hafeezExpEl) hafeezExpEl.textContent = formatCurrency(hafeezExpenses);
    
    if (overallIncEl) overallIncEl.textContent = formatCurrency(overallTotalIncome);
    if (overallExpEl) overallExpEl.textContent = formatCurrency(overallTotalExpenses);
    
    if (netCashFlowEl) {
        netCashFlowEl.textContent = formatCurrency(netCashFlow);
        netCashFlowEl.style.color = netCashFlow >= 0 ? 'var(--success)' : 'var(--danger)';
    }

    // Render Quick Category Totals Summary
    const categoryTotals = {};
    expenses.forEach(e => {
        if (e.status !== 'Rejected' && e.status !== 'Cancelled') {
            categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
        }
    });

    const categoryGrid = document.getElementById('category-totals-grid');
    if (categoryGrid) {
        categoryGrid.innerHTML = '';
        const allCategories = ['Wood', 'Plywood', 'Hardware', 'Upholstery', 'Transport', 'Salary', 'Tools', 'Electricity', 'Office', 'Other'];
        
        allCategories.forEach(cat => {
            const amt = categoryTotals[cat] || 0;
            const iconName = CATEGORY_ICONS[cat] || 'package';
            categoryGrid.innerHTML += `
                <div class="category-summary-item">
                    <div class="cat-item-icon">
                        <i data-lucide="${iconName}"></i>
                    </div>
                    <div class="cat-item-name">${cat}</div>
                    <div class="cat-item-value">${formatCurrency(amt)}</div>
                </div>
            `;
        });
        lucide.createIcons();
    }

    // Recent Expenses rendering
    const recentExpenses = expenses.slice(0, 5);
    const recentList = document.getElementById('recent-expenses-list');
    if (recentList) {
        recentList.innerHTML = '';
        if (recentExpenses.length === 0) {
            recentList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">No recent expenses.</div>';
        } else {
            recentExpenses.forEach(exp => {
                const vendorName = vendors.find(v => v.id === exp.vendorId)?.name || exp.vendorId || 'Unknown Vendor';
                const projectName = projects.find(p => p.id === exp.projectId)?.name || 'No Project';
                const timeString = new Date(exp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                recentList.innerHTML += `
                    <div class="expense-row-card" onclick="viewExpenseDetail('${exp.id}')">
                        <div class="expense-card-left" style="width: 70%;">
                            <div class="expense-cat-icon">
                                <i data-lucide="receipt"></i>
                            </div>
                            <div class="expense-title-details" style="width: calc(100% - 60px);">
                                <div class="expense-vendor-title">${vendorName}</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; white-space: pre-wrap; overflow-wrap: break-word; word-wrap: break-word; word-break: break-all;" class="expense-description-text">${exp.description || 'No description provided'}</div>
                                <div class="expense-meta-info" style="margin-top: 6px;">
                                    <span>${timeString}</span>
                                </div>
                            </div>
                        </div>
                        <div class="expense-card-right" style="width: 30%; text-align: right;">
                            <div>
                                <div class="expense-amount-display">${formatCurrency(exp.amount)}</div>
                                <div class="expense-sub-text">${exp.bankAccount || exp.paymentMethod}</div>
                            </div>
                            <span class="badge ${exp.status.toLowerCase()}">${exp.status}</span>
                        </div>
                    </div>
                `;
            });
            lucide.createIcons();
        }
    }

    // Render Mini Projects list
    const miniProjList = document.getElementById('projects-mini-list');
    if (miniProjList) {
        miniProjList.innerHTML = '';
        const activeProjects = projects.filter(p => p.id !== 'prj-none');
        if (activeProjects.length === 0) {
            miniProjList.innerHTML = '<div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 10px;">No projects.</div>';
        } else {
            activeProjects.forEach(p => {
                const pct = p.budget > 0 ? Math.min(100, Math.round((p.spent / p.budget) * 100)) : 0;
                let barColor = '';
                if (pct >= 95) barColor = 'danger';
                else if (pct >= 80) barColor = 'warning';
                
                miniProjList.innerHTML += `
                    <div class="project-progress-card" style="padding: 12px; border:none; background-color:var(--bg-app); margin-bottom:0;">
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:700;">
                            <span>${p.name}</span>
                            <span style="${pct >= 95 ? 'color:var(--danger)' : (pct >= 80 ? 'color:var(--warning)' : 'color:var(--primary)')}">${pct}%</span>
                        </div>
                        <div class="progress-bar-bg" style="margin-top:6px; margin-bottom:0;">
                            <div class="progress-bar-fill ${barColor}" style="width: ${pct}%"></div>
                        </div>
                    </div>
                `;
            });
        }
    }

    // Update mobile green hero card values
    const mobileValEl = document.getElementById('dash-today-expenses-val');
    const mobileCountEl = document.getElementById('dash-today-txns-count');
    if (mobileValEl) mobileValEl.textContent = formatCurrency(todayExpenses);
    if (mobileCountEl) mobileCountEl.textContent = todayTransactionsCount + (todayTransactionsCount === 1 ? ' Transaction' : ' Transactions');

    // Render mobile Quick Summary grid
    renderQuickSummary();
}

let quickSummaryFilterValue = 'this-month';

function handleQuickSummaryFilterChange(val) {
    quickSummaryFilterValue = val;
    renderQuickSummary();
}

function renderQuickSummary() {
    const expenses = db.getExpenses();
    
    // Filter expenses based on selected period
    let filtered = expenses.filter(e => e.status !== 'Rejected' && e.status !== 'Cancelled');
    
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    if (quickSummaryFilterValue === 'today') {
        filtered = filtered.filter(e => e.createdAt.startsWith(todayStr));
    } else if (quickSummaryFilterValue === 'this-week') {
        filtered = filtered.filter(e => new Date(e.createdAt) >= startOfWeek);
    } else if (quickSummaryFilterValue === 'this-month') {
        filtered = filtered.filter(e => new Date(e.createdAt) >= startOfMonth);
    }
    
    // Calculations
    const totalExpensesSum = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
    const woodSum = filtered.filter(e => e.category === 'Wood' || e.category === 'Plywood' || e.category === 'Wood & Plywood').reduce((sum, e) => sum + Number(e.amount), 0);
    const salariesSum = filtered.filter(e => e.category === 'Salary' || e.category === 'Labour').reduce((sum, e) => sum + Number(e.amount), 0);
    const transportSum = filtered.filter(e => e.category === 'Transport').reduce((sum, e) => sum + Number(e.amount), 0);
    
    // Update Quick Summary card elements
    const totalEl = document.getElementById('quick-total-val');
    const woodEl = document.getElementById('quick-wood-val');
    const salariesEl = document.getElementById('quick-salaries-val');
    const transportEl = document.getElementById('quick-transport-val');
    
    if (totalEl) totalEl.textContent = formatCurrency(totalExpensesSum);
    if (woodEl) woodEl.textContent = formatCurrency(woodSum);
    if (salariesEl) salariesEl.textContent = formatCurrency(salariesSum);
    if (transportEl) transportEl.textContent = formatCurrency(transportSum);
}

function renderExpensesList() {
    const expenses = db.getExpenses();
    const vendors = db.getVendors();
    const projects = db.getProjects();
    const users = db.getUsers();

    const listContainer = document.getElementById('expense-items-list');
    if (!listContainer) return;

    // Apply Filter Logic
    let filtered = expenses;

    // Permissions check: Staff can only see their own expenses
    if (currentRole === 'staff') {
        filtered = filtered.filter(e => e.createdBy === currentUser.id);
    }

    // Filter by Date Badges
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const now = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    if (expenseFilterDate === 'today') {
        filtered = filtered.filter(e => e.createdAt.startsWith(todayStr));
    } else if (expenseFilterDate === 'yesterday') {
        filtered = filtered.filter(e => e.createdAt.startsWith(yesterdayStr));
    } else if (expenseFilterDate === 'this-week') {
        filtered = filtered.filter(e => new Date(e.createdAt) >= startOfWeek);
    } else if (expenseFilterDate === 'this-month') {
        filtered = filtered.filter(e => new Date(e.createdAt) >= startOfMonth);
    }

    // Advanced drop-down filters
    if (activeFilters.vendor !== 'all') {
        filtered = filtered.filter(e => e.vendorId === activeFilters.vendor);
    }
    if (activeFilters.project !== 'all') {
        filtered = filtered.filter(e => e.projectId === activeFilters.project);
    }
    if (activeFilters.category !== 'all') {
        filtered = filtered.filter(e => e.category === activeFilters.category);
    }
    if (activeFilters.paymentMethod !== 'all') {
        filtered = filtered.filter(e => e.paymentMethod === activeFilters.paymentMethod);
    }
    if (activeFilters.status !== 'all') {
        filtered = filtered.filter(e => e.status === activeFilters.status);
    }

    // Global Text Search
    if (expenseFilterSearch.trim()) {
        const query = expenseFilterSearch.toLowerCase();
        filtered = filtered.filter(e => {
            const vName = (vendors.find(v => v.id === e.vendorId)?.name || e.vendorId || '').toLowerCase();
            const pName = (projects.find(p => p.id === e.projectId)?.name || '').toLowerCase();
            return (
                e.id.toLowerCase().includes(query) ||
                vName.includes(query) ||
                pName.includes(query) ||
                e.category.toLowerCase().includes(query) ||
                (e.description || '').toLowerCase().includes(query) ||
                (e.transactionNo || '').toLowerCase().includes(query)
            );
        });
    }

    // Sorting
    filtered.sort((a, b) => {
        if (expenseSort === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (expenseSort === 'oldest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (expenseSort === 'highest') {
            return b.amount - a.amount;
        } else if (expenseSort === 'lowest') {
            return a.amount - b.amount;
        }
        return 0;
    });

    // Render list
    listContainer.innerHTML = '';
    if (filtered.length === 0) {
        if (expenses.length === 0) {
            listContainer.innerHTML = `
                <div style="text-align: center; padding: 48px 24px; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
                    <i data-lucide="info" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--text-muted); display: block;"></i>
                    <h4 style="margin-bottom: 8px;">No expenses found</h4>
                    <p style="font-size: 0.85rem;">Click 'Add Expense' to create your first expense.</p>
                </div>
            `;
        } else {
            listContainer.innerHTML = `
                <div style="text-align: center; padding: 48px 24px; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
                    <i data-lucide="info" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--text-muted); display: block;"></i>
                    <h4 style="margin-bottom: 8px;">No Expenses Found</h4>
                    <p style="font-size: 0.85rem;">Try adjusting your filters, search term, or create a new expense entry.</p>
                </div>
            `;
        }
    } else {
        filtered.forEach(exp => {
            const vendorName = vendors.find(v => v.id === exp.vendorId)?.name || exp.vendorId || 'Unknown Vendor';
            const projectName = projects.find(p => p.id === exp.projectId)?.name || 'No Project';
            const dateStr = new Date(exp.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            const createdByUser = users.find(u => u.id === exp.createdBy)?.name || 'Staff';

            listContainer.innerHTML += `
                <div class="expense-row-card" onclick="viewExpenseDetail('${exp.id}')">
                    <div class="expense-card-left" style="width: 70%;">
                        <div class="expense-cat-icon">
                            <i data-lucide="receipt"></i>
                        </div>
                        <div class="expense-title-details" style="width: calc(100% - 60px);">
                            <div class="expense-vendor-title">${vendorName}</div>
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; white-space: pre-wrap; overflow-wrap: break-word; word-wrap: break-word; word-break: break-all;" class="expense-description-text">${exp.description || 'No description provided'}</div>
                            <div class="expense-meta-info" style="margin-top: 6px;">
                                <span>By ${createdByUser}</span>
                                <div class="dot-separator"></div>
                                <span>${dateStr}</span>
                            </div>
                        </div>
                    </div>
                    <div class="expense-card-right" style="width: 30%; text-align: right;">
                        <div>
                            <div class="expense-amount-display">${formatCurrency(exp.amount)}</div>
                            <div class="expense-sub-text">${exp.bankAccount || exp.paymentMethod}</div>
                        </div>
                        <span class="badge ${exp.status.toLowerCase()}">${exp.status}</span>
                    </div>
                </div>
            `;
        });
    }
    lucide.createIcons();
}

function renderVendorsList() {
    const vendors = db.getVendors();
    const expenses = db.getExpenses();
    
    const container = document.getElementById('vendors-cards-grid');
    if (!container) return;

    container.innerHTML = '';
    vendors.forEach(v => {
        const purchaseCount = expenses.filter(e => e.vendorId === v.id).length;
        
        container.innerHTML += `
            <div class="project-progress-card">
                <div class="project-card-header" style="margin-bottom: 8px;">
                    <div>
                        <h4 style="font-size: 1.1rem;">${v.name}</h4>
                        <span class="project-client-name">GST: ${v.gst || 'N/A'}</span>
                    </div>
                    <div class="card-icon-wrap">
                        <i data-lucide="contact-2"></i>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">
                    <p style="margin-bottom: 4px; display:flex; align-items:center; gap:6px;"><i data-lucide="phone" style="width:14px;"></i> ${v.phone}</p>
                    <p style="display:flex; align-items:center; gap:6px;"><i data-lucide="map-pin" style="width:14px;"></i> ${v.address}</p>
                </div>
                <div class="vendor-balance-row">
                    <div class="vendor-balance-item">
                        <span>Opening Balance</span>
                        <p>${formatCurrency(v.openingBalance)}</p>
                    </div>
                    <div class="vendor-balance-item outstanding">
                        <span>Outstanding</span>
                        <p>${formatCurrency(v.outstandingAmount)}</p>
                    </div>
                    <div class="vendor-balance-item" style="text-align: right;">
                        <span>Purchases</span>
                        <p>${purchaseCount} items</p>
                    </div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function renderProjectsList() {
    const projects = db.getProjects();
    const expenses = db.getExpenses();
    
    const container = document.getElementById('projects-cards-grid');
    if (!container) return;

    container.innerHTML = '';
    
    projects.forEach(p => {
        if (p.id === 'prj-none') return;
        
        const pct = p.budget > 0 ? Math.min(100, Math.round((p.spent / p.budget) * 100)) : 0;
        const remaining = p.budget - p.spent;
        
        // Color code progress bar
        let progressBarColorClass = '';
        if (pct >= 95) {
            progressBarColorClass = 'danger';
        } else if (pct >= 80) {
            progressBarColorClass = 'warning';
        }

        // Calculate profitability metrics (Mock calculation: Spent is within budget, positive health)
        const isProfitable = p.spent < p.budget;
        const profitStatusText = isProfitable ? 'Healthy Budget' : 'Budget Exceeded';
        const profitColorClass = isProfitable ? 'success' : 'danger';

        container.innerHTML += `
            <div class="project-progress-card">
                <div class="project-card-header">
                    <div>
                        <h4>${p.name}</h4>
                        <span class="project-client-name">Client: ${p.client}</span>
                    </div>
                    <div class="card-icon-wrap">
                        <i data-lucide="briefcase"></i>
                    </div>
                </div>
                
                <div class="project-budget-stats">
                    <span>Spent: ${formatCurrency(p.spent)}</span>
                    <span>Budget: ${formatCurrency(p.budget)}</span>
                </div>
                
                <div class="budget-progress-wrap">
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill ${progressBarColorClass}" style="width: ${pct}%"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700;">
                        <span style="color:var(--text-secondary)">${pct}% Used</span>
                        <span style="color: ${remaining >= 0 ? 'var(--text-secondary)' : 'var(--danger)'}">
                            ${remaining >= 0 ? 'Remaining: ' + formatCurrency(remaining) : 'Over Budget: ' + formatCurrency(Math.abs(remaining))}
                        </span>
                    </div>
                </div>

                <div class="project-profitability-badge" style="background-color: var(--${profitColorClass}-light); color: var(--${profitColorClass});">
                    <i data-lucide="${isProfitable ? 'check-circle' : 'alert-triangle'}" style="width: 14px; height: 14px;"></i>
                    <span>${profitStatusText}</span>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

// ----------------------------------------------------
// REPORTS / ANALYTICS MODULES (CHART.JS)
// ----------------------------------------------------
let categoryChart = null;
let monthlyChart = null;
let trendChart = null;

function renderReportsView() {
    const expenses = db.getExpenses();
    const vendors = db.getVendors();
    const projects = db.getProjects();

    const activeExpenses = expenses.filter(e => e.status !== 'Rejected' && e.status !== 'Cancelled');

    // 1. Calculate Analytics Summary Cards
    const totalExp = activeExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const avgDaily = activeExpenses.length > 0 ? (totalExp / 30) : 0; // Avg monthly daily rate
    const highestExpense = activeExpenses.length > 0 ? Math.max(...activeExpenses.map(e => e.amount)) : 0;
    const lowestExpense = activeExpenses.length > 0 ? Math.min(...activeExpenses.map(e => e.amount)) : 0;

    document.getElementById('rep-total-expenses').textContent = formatCurrency(totalExp);
    document.getElementById('rep-avg-daily').textContent = formatCurrency(avgDaily);
    document.getElementById('rep-highest-expense').textContent = formatCurrency(highestExpense);
    document.getElementById('rep-lowest-expense').textContent = formatCurrency(lowestExpense);

    // 2. Chart data processing
    // A. Categories Spending
    const catData = {};
    activeExpenses.forEach(e => {
        catData[e.category] = (catData[e.category] || 0) + Number(e.amount);
    });

    // B. Monthly Expenses
    const monthlyData = {};
    activeExpenses.forEach(e => {
        const date = new Date(e.createdAt);
        const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
        monthlyData[monthYear] = (monthlyData[monthYear] || 0) + Number(e.amount);
    });

    // C. Daily Trend (last 10 days)
    const dailyData = {};
    for (let i = 9; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayStr = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        dailyData[dayStr] = 0;
    }
    
    activeExpenses.forEach(e => {
        const dayStr = new Date(e.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });
        if (dailyData[dayStr] !== undefined) {
            dailyData[dayStr] += Number(e.amount);
        }
    });

    // Destroy existing charts to avoid layout bugs
    if (categoryChart) categoryChart.destroy();
    if (monthlyChart) monthlyChart.destroy();
    if (trendChart) trendChart.destroy();

    // Render Category Pie Chart
    const ctxCat = document.getElementById('chart-category').getContext('2d');
    categoryChart = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: Object.keys(catData),
            datasets: [{
                data: Object.values(catData),
                backgroundColor: [
                    '#0B5D3F', '#1F8C64', '#44B28A', '#72D7B2', '#004B49', 
                    '#EAA023', '#EA580C', '#DC2626', '#2563EB', '#7C3AED', '#4B5563'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, font: { family: 'Plus Jakarta Sans', size: 10 } }
                }
            }
        }
    });

    // Render Monthly Expenses Bar Chart
    const ctxMonthly = document.getElementById('chart-monthly').getContext('2d');
    monthlyChart = new Chart(ctxMonthly, {
        type: 'bar',
        data: {
            labels: Object.keys(monthlyData).length > 0 ? Object.keys(monthlyData) : ['Jul 26'],
            datasets: [{
                label: 'Expenses',
                data: Object.keys(monthlyData).length > 0 ? Object.values(monthlyData) : [0],
                backgroundColor: '#0B5D3F',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });

    // Render Daily Trend Line Chart
    const ctxTrend = document.getElementById('chart-trend').getContext('2d');
    trendChart = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: Object.keys(dailyData),
            datasets: [{
                label: 'Daily Spending',
                data: Object.values(dailyData),
                borderColor: '#0B5D3F',
                backgroundColor: 'rgba(11, 93, 63, 0.05)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });

    // 3. Render Top Categories / Projects tables
    const topCatsList = document.getElementById('top-categories-list');
    if (topCatsList) {
        topCatsList.innerHTML = '';
        const sortedCats = Object.entries(catData).sort((a, b) => b[1] - a[1]).slice(0, 5);
        sortedCats.forEach(([cat, val]) => {
            topCatsList.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.85rem; font-weight:600;">
                    <span>${cat}</span>
                    <span style="font-weight:700;">${formatCurrency(val)}</span>
                </div>
            `;
        });
    }

    const topProjectsList = document.getElementById('top-projects-list');
    if (topProjectsList) {
        topProjectsList.innerHTML = '';
        const sortedProjects = [...projects].filter(p => p.id !== 'prj-none').sort((a, b) => b.spent - a.spent).slice(0, 5);
        sortedProjects.forEach(p => {
            topProjectsList.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.85rem; font-weight:600;">
                    <span>${p.name}</span>
                    <span style="font-weight:700;">${formatCurrency(p.spent)}</span>
                </div>
            `;
        });
    }
}

// ----------------------------------------------------
// EXPENSE DETAIL VIEW MODAL MODULE
// ----------------------------------------------------
let selectedExpenseIdForModal = null;

function viewExpenseDetail(expenseId) {
    selectedExpenseIdForModal = expenseId;
    const exp = db.getExpenses().find(e => e.id === expenseId);
    if (!exp) return;

    const vendor = db.getVendors().find(v => v.id === exp.vendorId) || { name: 'Unknown', phone: '', gst: '' };
    const creator = db.getUsers().find(u => u.id === exp.createdBy) || { name: 'Staff' };
    const approver = db.getUsers().find(u => u.id === exp.approvedBy) || { name: 'N/A' };
    
    // Set UI elements
    document.getElementById('det-expense-num').textContent = exp.id;
    document.getElementById('det-amount').textContent = formatCurrency(exp.amount);
    
    const statusBadge = document.getElementById('det-status-badge');
    statusBadge.className = `badge ${exp.status.toLowerCase()}`;
    statusBadge.textContent = exp.status;

    document.getElementById('det-vendor').textContent = vendor.name !== 'Unknown' ? vendor.name : (exp.vendorId || 'Unknown');
    document.getElementById('det-bank-account').textContent = exp.bankAccount || exp.paymentMethod || 'HDFC Current Account';
    document.getElementById('det-description').textContent = exp.description || 'No description provided.';
    document.getElementById('det-date').textContent = new Date(exp.createdAt).toLocaleString();
    document.getElementById('det-created-by').textContent = creator.name;
    document.getElementById('det-approved-by').textContent = approver.name;

    // Render bills
    const billListContainer = document.getElementById('det-bills-list');
    billListContainer.innerHTML = '';
    if (exp.attachments && exp.attachments.length > 0) {
        exp.attachments.forEach(file => {
            billListContainer.innerHTML += `
                <div class="attachment-file-card">
                    <div class="file-info-wrap">
                        <i data-lucide="file-text"></i>
                        <span>${file.name} (${file.size})</span>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button class="file-action-btn" onclick="previewFileMock('${file.name}')">Preview</button>
                        <button class="file-action-btn" onclick="downloadFileMock('${file.name}')">Download</button>
                    </div>
                </div>
            `;
        });
    } else {
        billListContainer.innerHTML = '<p style="font-size:0.85rem; color:var(--text-muted);">No bills attached.</p>';
    }

    // Render Approval Timeline Nodes
    renderApprovalTimeline(exp);

    // Render action buttons according to Role Matrix permissions
    const actionContainer = document.getElementById('modal-workflow-actions');
    actionContainer.innerHTML = '';

    // Action permission buttons logic
    const isOwner = currentRole === 'owner';
    const isManager = currentRole === 'manager';
    const isStaff = currentRole === 'staff';

    // Duplicate & edit buttons visible for creator or manager/owner
    if (currentRole !== 'accountant') {
        actionContainer.innerHTML += `<button class="btn btn-secondary" onclick="duplicateExpenseAction('${exp.id}')"><i data-lucide="copy" style="width:16px;"></i> Duplicate</button>`;
        
        if (exp.status === 'Pending') {
            actionContainer.innerHTML += `<button class="btn btn-secondary" onclick="editExpenseAction('${exp.id}')"><i data-lucide="edit" style="width:16px;"></i> Edit</button>`;
        }
    }

    // Workflow approvals actions: Manager reviews, Owner final approvals
    if (exp.status === 'Pending') {
        if (isManager || isOwner) {
            actionContainer.innerHTML += `
                <button class="btn btn-primary" onclick="changeStatusAction('${exp.id}', 'Approved')">Approve (Review)</button>
                <button class="btn btn-danger" onclick="changeStatusAction('${exp.id}', 'Rejected')">Reject</button>
            `;
        }
    } else if (exp.status === 'Approved') {
        if (isOwner) {
            actionContainer.innerHTML += `
                <button class="btn btn-primary" onclick="changeStatusAction('${exp.id}', 'Paid')">Mark Paid (Finalize)</button>
                <button class="btn btn-danger" onclick="changeStatusAction('${exp.id}', 'Rejected')">Reject</button>
            `;
        } else if (isManager) {
            actionContainer.innerHTML += `<p style="font-size: 0.75rem; color: var(--text-muted); font-weight:700;">Awaiting Owner Finalization</p>`;
        }
    }

    // Delete Expense action
    if (isOwner && exp.status !== 'Paid') {
        actionContainer.innerHTML += `<button class="btn btn-danger" style="margin-left:auto;" onclick="deleteExpenseAction('${exp.id}')"><i data-lucide="trash-2" style="width:16px;"></i> Delete</button>`;
    }

    // Show Overlay
    document.getElementById('detail-modal-overlay').classList.add('active');
    lucide.createIcons();
}

function renderApprovalTimeline(exp) {
    const timeline = document.getElementById('approval-timeline-steps');
    if (!timeline) return;

    // Node 1: Creation (Staff)
    // Node 2: Review (Manager)
    // Node 3: Approval (Owner)
    const isRejected = exp.status === 'Rejected';
    const isCancelled = exp.status === 'Cancelled';

    let n1Class = 'completed';
    let n2Class = '';
    let n3Class = '';

    if (exp.status === 'Approved') {
        n2Class = 'completed';
        n3Class = 'current';
    } else if (exp.status === 'Paid') {
        n2Class = 'completed';
        n3Class = 'completed';
    } else if (exp.status === 'Pending') {
        n2Class = 'current';
    }

    if (isRejected) {
        if (exp.approvedBy === 'usr-2') { // manager rejected
            n2Class = 'rejected-step';
        } else {
            n3Class = 'rejected-step';
            n2Class = 'completed';
        }
    }

    timeline.innerHTML = `
        <div class="timeline-step-node ${n1Class}">
            <div class="step-node-dot">
                <i data-lucide="check"></i>
            </div>
            <span class="step-node-label">Submitted</span>
            <span class="step-node-time"> Rahim (Staff)</span>
        </div>
        <div class="timeline-step-node ${n2Class}">
            <div class="step-node-dot">
                <i data-lucide="${isRejected && exp.approvedBy === 'usr-2' ? 'x' : 'check'}"></i>
            </div>
            <span class="step-node-label">Reviewed</span>
            <span class="step-node-time">Madhavan (Mngr)</span>
        </div>
        <div class="timeline-step-node ${n3Class}">
            <div class="step-node-dot">
                <i data-lucide="${isRejected && exp.approvedBy !== 'usr-2' ? 'x' : 'check'}"></i>
            </div>
            <span class="step-node-label">Finalized</span>
            <span class="step-node-time">Ziyad (Owner)</span>
        </div>
    `;
    lucide.createIcons();
}

function closeDetailModal() {
    document.getElementById('detail-modal-overlay').classList.remove('active');
    selectedExpenseIdForModal = null;
}

// ----------------------------------------------------
// ACTIONS IMPLEMENTATIONS
// ----------------------------------------------------

function changeStatusAction(expId, newStatus) {
    const expenses = db.getExpenses();
    const exp = expenses.find(e => e.id === expId);
    if (!exp) return;

    exp.status = newStatus;
    exp.approvedBy = currentUser.id;
    exp.updatedAt = new Date().toISOString();


    db.saveExpense(exp);

    // Send notifications to Staff
    const staffUser = db.getUsers().find(u => u.id === exp.createdBy);
    if (staffUser) {
        const notifs = db.getNotifications();
        notifs.unshift({
            id: 'notif-' + Date.now(),
            title: `Expense ${newStatus}`,
            message: `Your expense ${exp.id} of ₹${exp.amount.toLocaleString()} has been ${newStatus.toLowerCase()} by ${currentUser.name}.`,
            time: 'Just now',
            unread: true,
            roles: ['staff']
        });
        db.setData('zoosh_notifications', notifs);
    }

    closeDetailModal();
    initApp();
    
    // Add success toast / confetti if paid
    if (newStatus === 'Paid') {
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 }
        });
    }
}

function deleteExpenseAction(expId) {
    if (confirm('Are you sure you want to delete this expense?')) {
        db.deleteExpense(expId);
        closeDetailModal();
        initApp();
    }
}

function duplicateExpenseAction(expId) {
    const exp = db.getExpenses().find(e => e.id === expId);
    if (!exp) return;

    switchView('add-expense');
    
    // Prefill form
    document.getElementById('exp-id').value = '';
    document.getElementById('exp-amount').value = exp.amount;
    document.getElementById('exp-vendor').value = exp.vendorId;
    document.getElementById('exp-bank-account').value = exp.bankAccount || 'HDFC Current Account';
    document.getElementById('exp-description').value = `${exp.description} (Duplicate)`;
    document.getElementById('exp-date').value = new Date().toISOString().slice(0, 16);
    
    closeDetailModal();
}

function editExpenseAction(expId) {
    const exp = db.getExpenses().find(e => e.id === expId);
    if (!exp) return;

    switchView('add-expense');
    
    // Prefill form
    document.getElementById('exp-id').value = exp.id;
    document.getElementById('exp-amount').value = exp.amount;
    document.getElementById('exp-vendor').value = exp.vendorId;
    document.getElementById('exp-bank-account').value = exp.bankAccount || 'HDFC Current Account';
    document.getElementById('exp-description').value = exp.description;
    document.getElementById('exp-date').value = new Date(exp.createdAt).toISOString().slice(0, 16);
    
    closeDetailModal();
}

// Save Expense Logic
function saveExpenseForm(event) {
    event.preventDefault();
    
    const amount = Number(document.getElementById('exp-amount').value);
    const vendorId = document.getElementById('exp-vendor').value;
    const bankAccount = document.getElementById('exp-bank-account').value;
    const description = document.getElementById('exp-description').value.trim();
    const dateInput = document.getElementById('exp-date').value;
    const expId = document.getElementById('exp-id').value;

    if (!amount || !vendorId || !bankAccount || !description) {
        alert('Please fill out all required fields.');
        return;
    }

    const nextId = expId || 'EXP-' + String(db.getExpenses().length + 1).padStart(3, '0');
    const createdAt = dateInput ? new Date(dateInput).toISOString() : new Date().toISOString();

    const expenseObj = {
        id: nextId,
        vendorId,
        projectId: 'prj-none',
        category: 'Other',
        amount,
        tax: Math.round(amount * 0.18), // 18% default GST calculation
        gst: '',
        bankAccount,
        paymentMethod: bankAccount,
        transactionNo: '',
        description,
        createdBy: expId ? (db.getExpenses().find(e => e.id === expId)?.createdBy || currentUser.id) : currentUser.id,
        approvedBy: '',
        status: 'Pending',
        attachments: [{ name: 'attached_bill.pdf', size: '1.4 MB' }],
        createdAt,
        updatedAt: new Date().toISOString()
    };

    db.saveExpense(expenseObj);

    // Notify Owner / Manager of new submission
    const notifs = db.getNotifications();
    notifs.unshift({
        id: 'notif-' + Date.now(),
        title: 'New Expense Added',
        message: `${currentUser.name} added an expense for ₹${amount.toLocaleString()} from ${bankAccount}.`,
        time: 'Just now',
        unread: true,
        roles: ['owner', 'manager']
    });
    db.setData('zoosh_notifications', notifs);

    // Reset Form
    document.getElementById('expense-entry-form').reset();
    document.getElementById('exp-id').value = '';
    
    // Visual Confetti feedback
    confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 }
    });

    switchView('expenses');
    initApp();
}

// Custom Categories
function handleCreateCustomCategory() {
    const name = prompt('Enter name for the new custom category:');
    if (!name || !name.trim()) return;

    const customCats = db.getCustomCategories();
    if (customCats.includes(name.trim())) {
        alert('Category already exists!');
        return;
    }

    customCats.push(name.trim());
    db.setData('zoosh_custom_categories', customCats);
    populateSelectDropdowns();
    alert('Category created successfully!');
}

// Custom Vendor Creator
function handleCreateCustomVendor() {
    const name = prompt('Enter Vendor/Supplier Name:');
    if (!name) return;
    const phone = prompt('Enter Phone Number:');
    const gst = prompt('Enter GST Number (Optional):');
    const address = prompt('Enter Address:');
    const opBal = Number(prompt('Enter Opening Balance (₹):') || 0);

    const vendors = db.getVendors();
    const newVnd = {
        id: 'vnd-' + (vendors.length + 1),
        name,
        phone: phone || 'N/A',
        gst: gst || 'N/A',
        address: address || 'N/A',
        openingBalance: opBal,
        outstandingAmount: opBal
    };

    vendors.push(newVnd);
    db.setData('zoosh_vendors', vendors);
    if (typeof pushToSupabase === 'function') {
        pushToSupabase('vendors', newVnd);
    }
    populateSelectDropdowns();
    alert('Vendor created successfully!');
}

function handleCreateCustomProject() {
    const name = prompt('Enter Project / Site Name (e.g. Villa Project - Palakkad):');
    if (!name || !name.trim()) return;
    const client = prompt('Enter Client Name / Reference (e.g. Palakkad):');
    if (!client || !client.trim()) return;
    const budgetStr = prompt('Enter Total Allocated Budget (₹):') || '0';
    const budget = Number(budgetStr);
    
    if (isNaN(budget) || budget < 0) {
        alert('Invalid budget amount.');
        return;
    }

    const projects = db.getProjects();
    const newProj = {
        id: 'prj-' + (projects.length + 1),
        name: name.trim(),
        client: client.trim(),
        budget: budget,
        spent: 0
    };

    projects.push(newProj);
    db.setData('zoosh_projects', projects);
    if (typeof pushToSupabase === 'function') {
        pushToSupabase('projects', newProj);
    }
    populateSelectDropdowns();
    
    if (activeView === 'projects') {
        renderProjectsList();
    }
    
    alert('Project created successfully!');
}

// ----------------------------------------------------
// OCR BILL AUTOMATIC AUTO-FILL SIMULATION
// ----------------------------------------------------
function simulateOCRScan(file) {
    const dropArea = document.getElementById('ocr-drop-area');
    if (!dropArea) return;

    dropArea.innerHTML = `
        <div class="ocr-scanner-loading">
            <i data-lucide="loader-2"></i>
            <p>Analyzing document with AI GST Scanner...</p>
        </div>
    `;
    lucide.createIcons();

    setTimeout(() => {
        // Randomly select vendor, category, and mock amount
        const mockVendors = db.getVendors();
        const randVendor = mockVendors[Math.floor(Math.random() * mockVendors.length)];
        const mockCats = ['Wood', 'Hardware', 'Upholstery', 'Transport', 'Tools'];
        const randCat = mockCats[Math.floor(Math.random() * mockCats.length)];
        
        const randAmount = Math.floor(Math.random() * 85000) + 5000;
        
        // Fill form fields
        document.getElementById('exp-amount').value = randAmount;
        document.getElementById('exp-vendor').value = randVendor.name;
        document.getElementById('exp-category').value = randCat;
        document.getElementById('exp-payment').value = 'UPI';
        document.getElementById('exp-description').value = `Auto-scanned invoice from bill: ${file.name}. Validated GST ${randVendor.gst || 'detecting...'}`;
        document.getElementById('exp-txn-number').value = 'OCR' + Math.floor(Math.random() * 900000);
        
        // Restore Drag Area
        dropArea.innerHTML = `
            <div class="upload-icon">
                <i data-lucide="check-circle" style="color:var(--success);"></i>
            </div>
            <p style="font-weight: 700; color:var(--success);">Invoice Scanned Successfully!</p>
            <p style="font-size:0.75rem; color:var(--text-secondary);">Detected ₹${randAmount.toLocaleString()} from ${randVendor.name}</p>
        `;
        lucide.createIcons();

        confetti({ particleCount: 30, spread: 30 });
    }, 1500);
}

// ----------------------------------------------------
// VOICE RECORDER SIMULATOR
// ----------------------------------------------------
function toggleVoiceRecording() {
    const btn = document.getElementById('voice-rec-btn');
    const status = document.getElementById('voice-status');
    
    if (!btn || !status) return;

    if (!voiceRecordingState.isRecording) {
        // Start
        voiceRecordingState.isRecording = true;
        voiceRecordingState.duration = 0;
        btn.classList.add('recording');
        status.textContent = 'Recording Voice Note... 0:00';
        
        voiceRecordingState.interval = setInterval(() => {
            voiceRecordingState.duration++;
            const secs = voiceRecordingState.duration % 60;
            const mins = Math.floor(voiceRecordingState.duration / 60);
            status.textContent = `Recording Voice Note... ${mins}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    } else {
        // Stop
        clearInterval(voiceRecordingState.interval);
        voiceRecordingState.isRecording = false;
        btn.classList.remove('recording');
        status.textContent = `Voice Note Saved (${voiceRecordingState.duration}s)`;
        
        // Add dummy note content
        const descField = document.getElementById('exp-description');
        if (descField) {
            descField.value += `\n[Voice Note Transcribed]: "Delivered wood planks to site A and paid delivery boy via cash."`;
        }
    }
}

// ----------------------------------------------------
// EXPORTING MODULES (SIMULATORS)
// ----------------------------------------------------
function exportReport(format) {
    const expenses = db.getExpenses();
    const vendors = db.getVendors();
    const incomes = db.getIncomes();
    const transfers = db.getTransfers();
    
    let content = '';
    let filename = `zoosh_report_${Date.now()}`;

    if (format === 'csv') {
        filename += '.csv';
        content = 'Expense ID,Vendor,Bank Account,Amount,GST,Date,Description\n';
        expenses.forEach(e => {
            const vName = vendors.find(v => v.id === e.vendorId)?.name || e.vendorId || 'Unknown';
            const desc = (e.description || '').replace(/"/g, '""');
            content += `"${e.id}","${vName}","${e.bankAccount || e.paymentMethod}",${e.amount},${e.tax},"${e.createdAt}","${desc}"\n`;
        });
        downloadBlob(content, filename, 'text/csv');
    } else if (format === 'excel') {
        filename += '.xls';
        content = '<table><tr><th>Expense ID</th><th>Vendor</th><th>Bank Account</th><th>Amount</th><th>GST</th><th>Description</th></tr>';
        expenses.forEach(e => {
            const vName = vendors.find(v => v.id === e.vendorId)?.name || e.vendorId || 'Unknown';
            content += `<tr><td>${e.id}</td><td>${vName}</td><td>${e.bankAccount || e.paymentMethod}</td><td>${e.amount}</td><td>${e.tax}</td><td>${e.description || ''}</td></tr>`;
        });
        content += '</table>';
        downloadBlob(content, filename, 'application/vnd.ms-excel');
    } else if (format === 'pdf') {
        // Calculate dynamic figures for wallets
        const incomesToHdfc = incomes.filter(i => i.bankAccount === 'HDFC Current Account').reduce((sum, i) => sum + Number(i.amount), 0);
        const transfersToHdfc = transfers.filter(t => t.toAccount === 'HDFC Current Account').reduce((sum, t) => sum + Number(t.amount), 0);
        const expensesFromHdfc = expenses.filter(e => e.bankAccount === 'HDFC Current Account' && e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);
        const transfersFromHdfc = transfers.filter(t => t.fromAccount === 'HDFC Current Account').reduce((sum, t) => sum + Number(t.amount), 0);
        const hdfcBalance = incomesToHdfc + transfersToHdfc - expensesFromHdfc - transfersFromHdfc;

        const incomesToHafeez = incomes.filter(i => i.bankAccount === 'Hafeez Personal Account').reduce((sum, i) => sum + Number(i.amount), 0);
        const transfersToHafeez = transfers.filter(t => t.toAccount === 'Hafeez Personal Account').reduce((sum, t) => sum + Number(t.amount), 0);
        const expensesFromHafeez = expenses.filter(e => e.bankAccount === 'Hafeez Personal Account' && e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);
        const transfersFromHafeez = transfers.filter(t => t.fromAccount === 'Hafeez Personal Account').reduce((sum, t) => sum + Number(t.amount), 0);
        const hafeezBalance = incomesToHafeez + transfersToHafeez - expensesFromHafeez - transfersFromHafeez;

        const supplierOutstanding = expenses.filter(e => e.status !== 'Paid' && e.status !== 'Rejected' && e.status !== 'Cancelled').reduce((sum, e) => sum + Number(e.amount), 0);
        const totalExpensesSum = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

        // Generate Expense Rows HTML
        let expenseRows = '';
        if (expenses.length === 0) {
            expenseRows = '<tr><td colspan="6" style="text-align:center; color:#9CA3AF;">No expenses recorded yet.</td></tr>';
        } else {
            expenses.forEach(e => {
                const vName = vendors.find(v => v.id === e.vendorId)?.name || e.vendorId || 'Unknown';
                const descHtml = e.description ? `<span class="desc-highlight">${e.description}</span>` : '<span style="color:#9CA3AF; font-size:0.75rem; font-style:italic;">No details provided</span>';
                expenseRows += `
                    <tr>
                        <td><strong>${e.id}</strong></td>
                        <td>${vName}</td>
                        <td>${e.bankAccount || e.paymentMethod}</td>
                        <td><strong>${formatCurrency(e.amount)}</strong></td>
                        <td><span class="badge ${e.status.toLowerCase()}">${e.status}</span></td>
                        <td>${descHtml}</td>
                    </tr>
                `;
            });
        }

        // Generate Vendor Rows HTML
        let vendorRows = '';
        if (vendors.length === 0) {
            vendorRows = '<tr><td colspan="6" style="text-align:center; color:#9CA3AF;">No vendors recorded.</td></tr>';
        } else {
            vendors.forEach(v => {
                vendorRows += `
                    <tr>
                        <td><strong>${v.name}</strong></td>
                        <td>${v.phone}</td>
                        <td>${v.gst || 'N/A'}</td>
                        <td>${v.address}</td>
                        <td>${formatCurrency(v.openingBalance)}</td>
                        <td><strong style="color: ${v.outstandingAmount > 0 ? '#EF4444' : '#111827'};">${formatCurrency(v.outstandingAmount)}</strong></td>
                    </tr>
                `;
            });
        }

        content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>ZOOSH Finance Statement Report</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                    
                    body {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        color: #111827;
                        background-color: #ffffff;
                        padding: 30px;
                        margin: 0;
                        line-height: 1.4;
                    }
                    
                    .report-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 2px solid #E5E7EB;
                        padding-bottom: 24px;
                        margin-bottom: 30px;
                    }
                    
                    .brand-info h1 {
                        font-size: 1.6rem;
                        font-weight: 800;
                        color: #0B5D3F;
                        margin: 0;
                    }
                    
                    .brand-info span {
                        font-size: 0.8rem;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        color: #0B5D3F;
                        font-weight: 700;
                    }
                    
                    .report-meta {
                        text-align: right;
                        font-size: 0.85rem;
                        color: #4B5563;
                    }
                    
                    /* Accounts Summary Cards */
                    .summary-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 16px;
                        margin-bottom: 35px;
                    }
                    
                    .summary-card {
                        background-color: #F8F9FA;
                        border: 1px solid #E5E7EB;
                        border-radius: 12px;
                        padding: 16px;
                        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                    }
                    
                    .card-label {
                        font-size: 0.75rem;
                        font-weight: 700;
                        color: #6B7280;
                        text-transform: uppercase;
                        margin-bottom: 6px;
                    }
                    
                    .card-value {
                        font-size: 1.3rem;
                        font-weight: 800;
                        color: #0B5D3F;
                    }
                    
                    /* Section Layout styling */
                    .section-title {
                        font-size: 1.1rem;
                        font-weight: 800;
                        color: #0B5D3F;
                        margin-top: 40px;
                        margin-bottom: 16px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        border-bottom: 1px solid #E5E7EB;
                        padding-bottom: 8px;
                        page-break-after: avoid;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 24px;
                    }
                    
                    th {
                        background-color: #E6F4EA;
                        color: #0B5D3F;
                        font-weight: 700;
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        padding: 10px 14px;
                        border: 1px solid #E5E7EB;
                        text-align: left;
                    }
                    
                    td {
                        padding: 10px 14px;
                        border: 1px solid #E5E7EB;
                        font-size: 0.85rem;
                        color: #1F2937;
                    }
                    
                    tr:nth-child(even) {
                        background-color: #F9FAFB;
                    }
                    
                    /* Badges */
                    .badge {
                        display: inline-flex;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        font-weight: 700;
                        text-transform: uppercase;
                    }
                    
                    .badge.pending { background-color: #FEF3C7; color: #F59E0B; }
                    .badge.approved { background-color: #DBEAFE; color: #3B82F6; }
                    .badge.rejected { background-color: #FEE2E2; color: #EF4444; }
                    .badge.paid { background-color: #D1FAE5; color: #10B981; }
                    .badge.cancelled { background-color: #E5E7EB; color: #4B5563; }
                    
                    /* Page Breaks control */
                    .printable-section {
                        page-break-inside: avoid;
                    }
                    
                    .desc-highlight {
                        font-size: 0.775rem;
                        color: #0B5D3F;
                        background-color: #E6F4EA;
                        padding: 6px 10px;
                        border-radius: 6px;
                        font-weight: 500;
                        border-left: 3px solid #0B5D3F;
                        display: inline-block;
                        margin: 2px 0;
                        word-break: break-word;
                        max-width: 250px;
                    }
                    
                    @media print {
                        body {
                            padding: 0;
                        }
                        .no-print {
                            display: none;
                        }
                        th {
                            background-color: #E6F4EA !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .badge.paid {
                            background-color: #D1FAE5 !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .badge.pending {
                            background-color: #FEF3C7 !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .badge.rejected {
                            background-color: #FEE2E2 !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                </style>
            </head>
            <body>
                <!-- Header area -->
                <div class="report-header">
                    <div class="brand-info">
                        <h1>ZOOSH FINANCE</h1>
                        <span>Furniture Manufacturing Systems</span>
                    </div>
                    <div class="report-meta">
                        <p style="margin:0; font-weight:700;">Financial Audit Statement</p>
                        <p style="margin:2px 0 0 0; font-size:0.75rem;">Generated on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>

                <!-- Accounts balances cards -->
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="card-label">HDFC Current Account</div>
                        <div class="card-value">${formatCurrency(hdfcBalance)}</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-label">Hafeez Personal Account</div>
                        <div class="card-value">${formatCurrency(hafeezBalance)}</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-label">Supplier Outstanding</div>
                        <div class="card-value" style="color: #EF4444;">${formatCurrency(supplierOutstanding)}</div>
                    </div>
                    <div class="summary-card">
                        <div class="card-label">Total Expense Registry</div>
                        <div class="card-value" style="color: #1F2937;">${formatCurrency(totalExpensesSum)}</div>
                    </div>
                </div>

                <!-- Section: Expenses -->
                <div class="printable-section">
                    <div class="section-title">Expense Transactions Registry</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Expense ID</th>
                                <th>Vendor/Supplier</th>
                                <th>Bank Account</th>
                                <th>Gross Amount</th>
                                <th>Status</th>
                                <th>Description / Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${expenseRows}
                        </tbody>
                    </table>
                </div>

                <!-- Section: Vendors -->
                <div class="printable-section">
                    <div class="section-title">Supplier & Vendor Directory</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th>Phone Number</th>
                                <th>GST Reference</th>
                                <th>Address</th>
                                <th>Opening Balance</th>
                                <th>Outstanding Dues</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vendorRows}
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
        `;

        const win = window.open('', '_blank');
        win.document.write(content);
        win.document.close();
        win.print();
        return;
    }

    alert(`${format.toUpperCase()} Exported successfully! Check downloads.`);
}

function downloadBlob(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// ----------------------------------------------------
// EVENT LISTENERS SETUP
// ----------------------------------------------------
function toggleSidebarDrawer() {
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function setupEventListeners() {
    // Menu items
    document.querySelectorAll('.menu-item, .mobile-nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const view = btn.getAttribute('data-view');
            if (view) switchView(view);
        });
    });

    // Mobile Menu overlay trigger
    const mobToggle = document.getElementById('mobile-menu-toggle');
    if (mobToggle) {
        mobToggle.addEventListener('click', () => {
            document.querySelector('.app-sidebar').classList.toggle('active');
        });
    }

    // Role Switchers (both desktop top bar and mobile sidebar)
    const roleSelect = document.getElementById('active-role-switcher');
    const roleSelectMob = document.getElementById('active-role-switcher-mob');
    
    function handleRoleChange(newRole) {
        currentRole = newRole;
        if (roleSelect) roleSelect.value = newRole;
        if (roleSelectMob) roleSelectMob.value = newRole;
        updateUserContext();
    }

    if (roleSelect) {
        roleSelect.addEventListener('change', (e) => handleRoleChange(e.target.value));
    }
    if (roleSelectMob) {
        roleSelectMob.addEventListener('change', (e) => handleRoleChange(e.target.value));
    }

    // Search bar logic
    const searchField = document.getElementById('global-search');
    if (searchField) {
        searchField.addEventListener('input', (e) => {
            expenseFilterSearch = e.target.value;
            renderExpensesList();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-expenses');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            expenseSort = e.target.value;
            renderExpensesList();
        });
    }

    // Date Filters Badges
    document.querySelectorAll('.filter-badge[data-date]').forEach(badge => {
        badge.addEventListener('click', () => {
            document.querySelectorAll('.filter-badge[data-date]').forEach(b => b.classList.remove('active'));
            badge.classList.add('active');
            expenseFilterDate = badge.getAttribute('data-date');
            renderExpensesList();
        });
    });

    // Expandable Filters Panel
    const advBtn = document.getElementById('toggle-adv-filters');
    if (advBtn) {
        advBtn.addEventListener('click', () => {
            const panel = document.getElementById('advanced-filters-panel');
            panel.classList.toggle('show');
            if (panel.classList.contains('show')) {
                advBtn.innerHTML = 'Hide Advanced Filters <i data-lucide="chevron-up" style="width:16px;"></i>';
            } else {
                advBtn.innerHTML = 'Show Advanced Filters <i data-lucide="chevron-down" style="width:16px;"></i>';
            }
            lucide.createIcons();
        });
    }

    // Advanced Select Filters change triggers
    const filterSelectors = {
        vendor: 'filter-vendor',
        category: 'filter-category',
        project: 'filter-project',
        paymentMethod: 'filter-payment',
        status: 'filter-status'
    };

    Object.entries(filterSelectors).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => {
                activeFilters[key] = e.target.value;
                renderExpensesList();
            });
        }
    });

    // Form Submissions
    const expForm = document.getElementById('expense-entry-form');
    if (expForm) {
        expForm.addEventListener('submit', saveExpenseForm);
    }

    const incForm = document.getElementById('income-entry-form');
    if (incForm) {
        incForm.addEventListener('submit', saveIncomeForm);
    }

    const trfForm = document.getElementById('transfer-entry-form');
    if (trfForm) {
        trfForm.addEventListener('submit', saveTransferForm);
    }

    // OCR Drag & Drop events
    const dropArea = document.getElementById('ocr-drop-area');
    if (dropArea) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropArea.classList.remove('dragover');
            }, false);
        });

        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                simulateOCRScan(files[0]);
            }
        });

        // Click file selector simulation
        dropArea.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*,application/pdf';
            fileInput.onchange = (e) => {
                if (e.target.files.length > 0) {
                    simulateOCRScan(e.target.files[0]);
                }
            };
            fileInput.click();
        });
    }

    // Dark Mode Toggle
    const darkToggle = document.getElementById('theme-toggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkToggle.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            lucide.createIcons();
            
            // Re-render reports charts if theme switches to align text colors
            if (activeView === 'reports') {
                renderReportsView();
            }
        });
    }

    // Notification Panel Toggle
    const notifBell = document.getElementById('notif-bell');
    if (notifBell) {
        notifBell.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('notifications-dropdown').classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        document.getElementById('notifications-dropdown')?.classList.remove('active');
    });

    document.getElementById('notifications-dropdown')?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function renderNotifications() {
    const list = document.getElementById('notifications-list');
    const countBadge = document.getElementById('notif-count-badge');
    if (!list) return;

    const notifs = db.getNotifications().filter(n => n.roles.includes(currentRole));
    const unreadCount = notifs.filter(n => n.unread).length;

    if (countBadge) {
        if (unreadCount > 0) {
            countBadge.style.display = 'block';
            countBadge.textContent = unreadCount;
        } else {
            countBadge.style.display = 'none';
        }
    }

    list.innerHTML = '';
    if (notifs.length === 0) {
        list.innerHTML = '<div style="text-align:center; padding:16px; font-size:0.8rem; color:var(--text-muted);">No notifications.</div>';
    } else {
        notifs.forEach(n => {
            list.innerHTML += `
                <div class="notif-item" onclick="markNotificationRead('${n.id}')">
                    <div class="notif-icon-dot" style="${n.unread ? '' : 'background-color:transparent'}"></div>
                    <div class="notif-content">
                        <h6>${n.title}</h6>
                        <p>${n.message}</p>
                        <span>${n.time}</span>
                    </div>
                </div>
            `;
        });
    }
}

function markNotificationRead(id) {
    const notifs = db.getNotifications();
    const n = notifs.find(item => item.id === id);
    if (n) {
        n.unread = false;
        db.setData('zoosh_notifications', notifs);
        renderNotifications();
    }
}

// ----------------------------------------------------
// HELPER UTILITIES
// ----------------------------------------------------
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function previewFileMock(name) {
    alert(`📄 Invoice Preview: Simulated view of attached document "${name}".`);
}

function downloadFileMock(name) {
    alert(`📥 Downloading File: "${name}" saved to your local downloads folder.`);
}

function openAddIncomeModal() {
    const account = prompt("Enter deposit account ('cash' or 'bank'):");
    if (!account) return;
    const accountLower = account.trim().toLowerCase();
    if (accountLower !== 'cash' && accountLower !== 'bank') {
        alert("Invalid account. Please enter 'cash' or 'bank'.");
        return;
    }
    
    const amountStr = prompt("Enter deposit/income amount (₹):");
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount.");
        return;
    }
    
    const source = prompt("Enter source / description (e.g. 'Owner Capital', 'Client Advance'):");
    
    // Save to transactions
    const txns = db.getTransactions();
    const newTxn = {
        id: 'TXN-INC-' + Date.now(),
        type: 'Income',
        amount: amount,
        method: accountLower === 'cash' ? 'Cash' : 'Bank',
        description: source || 'Income Deposit',
        createdAt: new Date().toISOString()
    };
    txns.push(newTxn);
    db.setData('zoosh_transactions', txns);
    if (typeof pushToSupabase === 'function') {
        pushToSupabase('transactions', newTxn);
    }
    
    // Refresh
    renderDashboard();
    
    if (typeof confetti === 'function') {
        confetti({ particleCount: 30, spread: 30 });
    }
    alert("Balance added successfully!");
}

function exportSingleExpensePDF(expenseId) {
    if (!expenseId) return;
    const exp = db.getExpenses().find(e => e.id === expenseId);
    if (!exp) return;

    const vendor = db.getVendors().find(v => v.id === exp.vendorId) || { name: exp.vendorId || 'Unknown Vendor', phone: 'N/A', gst: 'N/A', address: 'N/A' };
    const project = db.getProjects().find(p => p.id === exp.projectId) || { name: 'No Project (General Office)', client: 'N/A' };
    const creator = db.getUsers().find(u => u.id === exp.createdBy) || { name: 'Staff' };
    const approver = db.getUsers().find(u => u.id === exp.approvedBy) || { name: 'Pending Finalization' };

    const dateStr = new Date(exp.createdAt).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ZOOSH Expense Voucher - ${exp.id}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    color: #111827;
                    background-color: #ffffff;
                    padding: 40px;
                    margin: 0;
                    line-height: 1.4;
                }
                
                .voucher-container {
                    border: 2px solid #0B5D3F;
                    border-radius: 16px;
                    padding: 30px;
                    max-width: 800px;
                    margin: 0 auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                
                .voucher-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px dashed #E5E7EB;
                    padding-bottom: 20px;
                    margin-bottom: 24px;
                }
                
                .brand-info h1 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #0B5D3F;
                    margin: 0;
                }
                
                .brand-info span {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #0B5D3F;
                    font-weight: 700;
                }
                
                .voucher-title {
                    text-align: right;
                }
                
                .voucher-title h2 {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #0B5D3F;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .voucher-title p {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #6B7280;
                    margin: 4px 0 0 0;
                }
                
                .amount-banner {
                    background-color: #E6F4EA;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 28px;
                    border: 1px solid #0B5D3F;
                }
                
                .amount-banner span {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #0B5D3F;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    display: block;
                    margin-bottom: 4px;
                }
                
                .amount-banner h3 {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: #0B5D3F;
                    margin: 0;
                }
                
                .grid-details {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px 24px;
                    margin-bottom: 28px;
                }
                
                .detail-item {
                    border-bottom: 1px solid #F3F4F6;
                    padding-bottom: 8px;
                }
                
                .detail-item h4 {
                    font-size: 0.725rem;
                    color: #6B7280;
                    text-transform: uppercase;
                    margin: 0 0 4px 0;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                }
                
                .detail-item p {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                }
                
                .description-box {
                    background-color: #F9FAFB;
                    border: 1px solid #E5E7EB;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 32px;
                }
                
                .description-box h4 {
                    font-size: 0.725rem;
                    color: #6B7280;
                    text-transform: uppercase;
                    margin: 0 0 8px 0;
                    font-weight: 700;
                }
                
                .description-box p {
                    font-size: 0.875rem;
                    color: #374151;
                    margin: 0;
                    white-space: pre-wrap;
                }
                
                /* Signature Areas */
                .signature-section {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-top: 50px;
                    border-top: 1px dashed #E5E7EB;
                    padding-top: 30px;
                }
                
                .sig-box {
                    text-align: center;
                }
                
                .sig-line {
                    width: 80%;
                    height: 1px;
                    background-color: #9CA3AF;
                    margin: 0 auto 8px auto;
                }
                
                .sig-label {
                    font-size: 0.725rem;
                    font-weight: 700;
                    color: #4B5563;
                    text-transform: uppercase;
                }
                
                .sig-name {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #111827;
                    margin-top: 4px;
                }
                
                .badge {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .badge.pending { background-color: #FEF3C7; color: #F59E0B; }
                .badge.approved { background-color: #DBEAFE; color: #3B82F6; }
                .badge.rejected { background-color: #FEE2E2; color: #EF4444; }
                .badge.paid { background-color: #D1FAE5; color: #10B981; }
                
                @media print {
                    body {
                        padding: 0;
                    }
                    .voucher-container {
                        box-shadow: none;
                        border: 2px solid #0B5D3F !important;
                    }
                    .amount-banner {
                        background-color: #E6F4EA !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .badge.paid {
                        background-color: #D1FAE5 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
            </style>
        </head>
        <body>
            <div class="voucher-container">
                <div class="voucher-header">
                    <div class="brand-info">
                        <h1>ZOOSH FURNITURES</h1>
                        <span>Custom Furniture Manufacture</span>
                    </div>
                    <div class="voucher-title">
                        <h2>Payment Voucher</h2>
                        <p>Voucher ID: ${exp.id}</p>
                    </div>
                </div>

                <div class="amount-banner">
                    <span>Voucher Amount Paid</span>
                    <h3>${formatCurrency(exp.amount)}</h3>
                </div>

                <div class="grid-details">
                    <div class="detail-item">
                        <h4>Vendor / Supplier</h4>
                        <p>${vendor.name}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Date & Time</h4>
                        <p>${dateStr}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Bank Account</h4>
                        <p>${exp.bankAccount || exp.paymentMethod || 'HDFC Current Account'}</p>
                    </div>
                    <div class="detail-item">
                        <h4>GST Identification Number</h4>
                        <p>${exp.gst || 'N/A'}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Workflow Status</h4>
                        <p><span class="badge ${exp.status.toLowerCase()}">${exp.status}</span></p>
                    </div>
                </div>

                <div class="description-box">
                    <h4>Description Details</h4>
                    <p>${exp.description || 'No description notes provided for this transaction.'}</p>
                </div>

                <div class="signature-section">
                    <div class="sig-box">
                        <div class="sig-line"></div>
                        <div class="sig-label">Prepared By</div>
                        <div class="sig-name">${creator.name} (${creator.role})</div>
                    </div>
                    <div class="sig-box">
                        <div class="sig-line"></div>
                        <div class="sig-label">Reviewed By</div>
                        <div class="sig-name">Madhavan (Manager)</div>
                    </div>
                    <div class="sig-box">
                        <div class="sig-line"></div>
                        <div class="sig-label">Approved By</div>
                        <div class="sig-name">${exp.status === 'Paid' ? 'Ziyad (Owner)' : 'Awaiting Final Approval'}</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    win.document.close();
    win.print();
}

function exportExpensesPDF() {
    const expenses = db.getExpenses();
    const vendors = db.getVendors();
    
    // Apply exact same filters as renderExpensesList()
    let filtered = expenses;
    if (currentRole === 'staff') {
        filtered = filtered.filter(e => e.createdBy === currentUser.id);
    }
    
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const now = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    if (expenseFilterDate === 'today') {
        filtered = filtered.filter(e => e.createdAt.startsWith(todayStr));
    } else if (expenseFilterDate === 'yesterday') {
        filtered = filtered.filter(e => e.createdAt.startsWith(yesterdayStr));
    } else if (expenseFilterDate === 'this-week') {
        filtered = filtered.filter(e => new Date(e.createdAt) >= startOfWeek);
    } else if (expenseFilterDate === 'this-month') {
        filtered = filtered.filter(e => new Date(e.createdAt) >= startOfMonth);
    }

    if (activeFilters.vendor !== 'all') {
        filtered = filtered.filter(e => e.vendorId === activeFilters.vendor);
    }
    if (activeFilters.status !== 'all') {
        filtered = filtered.filter(e => e.status === activeFilters.status);
    }

    if (expenseFilterSearch.trim()) {
        const query = expenseFilterSearch.toLowerCase();
        filtered = filtered.filter(e => {
            const vName = (vendors.find(v => v.id === e.vendorId)?.name || e.vendorId || '').toLowerCase();
            return (
                e.id.toLowerCase().includes(query) ||
                vName.includes(query) ||
                (e.description || '').toLowerCase().includes(query)
            );
        });
    }

    // Sort
    filtered.sort((a, b) => {
        if (expenseSort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (expenseSort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (expenseSort === 'highest') return b.amount - a.amount;
        if (expenseSort === 'lowest') return a.amount - b.amount;
        return 0;
    });

    const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);

    let rowsHtml = '';
    if (filtered.length === 0) {
        rowsHtml = '<tr><td colspan="6" style="text-align:center; color:#9CA3AF;">No expenses matched the current filters.</td></tr>';
    } else {
        filtered.forEach(e => {
            const vName = vendors.find(v => v.id === e.vendorId)?.name || e.vendorId || 'Unknown';
            const dateStr = new Date(e.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
            const descHtml = e.description ? `<span class="desc-highlight">${e.description}</span>` : '<span style="color:#9CA3AF; font-size:0.75rem; font-style:italic;">No details provided</span>';
            rowsHtml += `
                <tr>
                    <td>${dateStr}</td>
                    <td><strong>${e.id}</strong></td>
                    <td>${vName}</td>
                    <td>${e.bankAccount || e.paymentMethod || 'HDFC Current Account'}</td>
                    <td><strong>${formatCurrency(e.amount)}</strong></td>
                    <td>${descHtml}</td>
                </tr>
            `;
        });
    }

    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ZOOSH Expense Statement</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; padding: 40px; margin: 0; }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; margin-bottom: 30px; }
                .brand h1 { font-size: 1.5rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                .brand span { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #0B5D3F; }
                .meta { text-align: right; font-size: 0.8rem; color: #4B5563; }
                .summary { background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; display: flex; gap: 30px; margin-bottom: 30px; }
                .summary-item span { font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; display: block; margin-bottom: 4px; }
                .summary-item p { font-size: 1.25rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background-color: #E6F4EA; color: #0B5D3F; font-size: 0.75rem; text-transform: uppercase; padding: 10px 14px; border: 1px solid #E5E7EB; text-align: left; }
                td { padding: 10px 14px; border: 1px solid #E5E7EB; font-size: 0.85rem; color: #1F2937; }
                tr:nth-child(even) { background-color: #F9FAFB; }
                .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
                .badge.pending { background-color: #FEF3C7; color: #F59E0B; }
                .badge.approved { background-color: #DBEAFE; color: #3B82F6; }
                .badge.rejected { background-color: #FEE2E2; color: #EF4444; }
                .badge.paid { background-color: #D1FAE5; color: #10B981; }
                .desc-highlight {
                    font-size: 0.775rem;
                    color: #0B5D3F;
                    background-color: #E6F4EA;
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-weight: 500;
                    border-left: 3px solid #0B5D3F;
                    display: inline-block;
                    margin: 2px 0;
                    word-break: break-word;
                    max-width: 250px;
                }
                @media print {
                    th { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .badge.paid { background-color: #D1FAE5 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .badge.pending { background-color: #FEF3C7 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .badge.rejected { background-color: #FEE2E2 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .desc-highlight { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="brand">
                    <h1>ZOOSH FURNITURES</h1>
                    <span>Expense Ledger Statement</span>
                </div>
                <div class="meta">
                    <p style="margin:0; font-weight:700;">Expenses Statement Report</p>
                    <p style="margin:2px 0 0 0;">Generated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
            <div class="summary">
                <div class="summary-item">
                    <span>Total Expense Amount</span>
                    <p>${formatCurrency(total)}</p>
                </div>
                <div class="summary-item">
                    <span>Transactions Count</span>
                    <p>${filtered.length} entries</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Expense Number</th>
                        <th>Vendor / Supplier</th>
                        <th>Bank Account</th>
                        <th>Gross Amount</th>
                        <th>Description / Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
}

function exportIncomesPDF() {
    const incomes = db.getIncomes();
    
    let rowsHtml = '';
    if (incomes.length === 0) {
        rowsHtml = '<tr><td colspan="6" style="text-align:center; color:#9CA3AF;">No income records found.</td></tr>';
    } else {
        incomes.forEach(inc => {
            const dateStr = new Date(inc.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
            const descHtml = inc.description ? `<span class="desc-highlight">${inc.description}</span>` : '<span style="color:#9CA3AF; font-size:0.75rem; font-style:italic;">No details provided</span>';
            rowsHtml += `
                <tr>
                    <td>${dateStr}</td>
                    <td><strong>${inc.id}</strong></td>
                    <td>${inc.customer}</td>
                    <td>${inc.bankAccount}</td>
                    <td><strong>${formatCurrency(inc.amount)}</strong></td>
                    <td>${descHtml}</td>
                </tr>
            `;
        });
    }

    const total = incomes.reduce((sum, i) => sum + Number(i.amount), 0);

    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ZOOSH Income Statement</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; padding: 40px; margin: 0; }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; margin-bottom: 30px; }
                .brand h1 { font-size: 1.5rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                .brand span { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #0B5D3F; }
                .meta { text-align: right; font-size: 0.8rem; color: #4B5563; }
                .summary { background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; display: flex; gap: 30px; margin-bottom: 30px; }
                .summary-item span { font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; display: block; margin-bottom: 4px; }
                .summary-item p { font-size: 1.25rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background-color: #E6F4EA; color: #0B5D3F; font-size: 0.75rem; text-transform: uppercase; padding: 10px 14px; border: 1px solid #E5E7EB; text-align: left; }
                td { padding: 10px 14px; border: 1px solid #E5E7EB; font-size: 0.85rem; color: #1F2937; }
                tr:nth-child(even) { background-color: #F9FAFB; }
                .desc-highlight {
                    font-size: 0.775rem;
                    color: #0B5D3F;
                    background-color: #E6F4EA;
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-weight: 500;
                    border-left: 3px solid #0B5D3F;
                    display: inline-block;
                    margin: 2px 0;
                    word-break: break-word;
                    max-width: 250px;
                }
                @media print {
                    th { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .desc-highlight { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="brand">
                    <h1>ZOOSH FURNITURES</h1>
                    <span>Income Statement</span>
                </div>
                <div class="meta">
                    <p style="margin:0; font-weight:700;">Customer Incomes Registry</p>
                    <p style="margin:2px 0 0 0;">Generated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
            <div class="summary">
                <div class="summary-item">
                    <span>Total Income Amount</span>
                    <p>${formatCurrency(total)}</p>
                </div>
                <div class="summary-item">
                    <span>Entries Count</span>
                    <p>${incomes.length} records</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Income Number</th>
                        <th>Customer</th>
                        <th>Deposit Account</th>
                        <th>Gross Amount</th>
                        <th>Description / Notes</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
}

function exportTransfersPDF() {
    const transfers = db.getTransfers();
    
    let rowsHtml = '';
    if (transfers.length === 0) {
        rowsHtml = '<tr><td colspan="5" style="text-align:center; color:#9CA3AF;">No transfer records found.</td></tr>';
    } else {
        transfers.forEach(trf => {
            const dateStr = new Date(trf.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
            const descHtml = trf.description ? `<span class="desc-highlight">${trf.description}</span>` : '<span style="color:#9CA3AF; font-size:0.75rem; font-style:italic;">No details provided</span>';
            rowsHtml += `
                <tr>
                    <td>${dateStr}</td>
                    <td>${trf.fromAccount}</td>
                    <td>${trf.toAccount}</td>
                    <td><strong>${formatCurrency(trf.amount)}</strong></td>
                    <td>${descHtml}</td>
                </tr>
            `;
        });
    }

    const total = transfers.reduce((sum, t) => sum + Number(t.amount), 0);

    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ZOOSH Transfers Statement</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; padding: 40px; margin: 0; }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; margin-bottom: 30px; }
                .brand h1 { font-size: 1.5rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                .brand span { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #0B5D3F; }
                .meta { text-align: right; font-size: 0.8rem; color: #4B5563; }
                .summary { background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; display: flex; gap: 30px; margin-bottom: 30px; }
                .summary-item span { font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; display: block; margin-bottom: 4px; }
                .summary-item p { font-size: 1.25rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background-color: #E6F4EA; color: #0B5D3F; font-size: 0.75rem; text-transform: uppercase; padding: 10px 14px; border: 1px solid #E5E7EB; text-align: left; }
                td { padding: 10px 14px; border: 1px solid #E5E7EB; font-size: 0.85rem; color: #1F2937; }
                tr:nth-child(even) { background-color: #F9FAFB; }
                .desc-highlight {
                    font-size: 0.775rem;
                    color: #0B5D3F;
                    background-color: #E6F4EA;
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-weight: 500;
                    border-left: 3px solid #0B5D3F;
                    display: inline-block;
                    margin: 2px 0;
                    word-break: break-word;
                    max-width: 250px;
                }
                @media print {
                    th { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .desc-highlight { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="brand">
                    <h1>ZOOSH FURNITURES</h1>
                    <span>Transfers Statement</span>
                </div>
                <div class="meta">
                    <p style="margin:0; font-weight:700;">Account Transfers Directory</p>
                    <p style="margin:2px 0 0 0;">Generated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
            <div class="summary">
                <div class="summary-item">
                    <span>Total Volume Transferred</span>
                    <p>${formatCurrency(total)}</p>
                </div>
                <div class="summary-item">
                    <span>Transfers Count</span>
                    <p>${transfers.length} transfers</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From Account</th>
                        <th>To Account</th>
                        <th>Transfer Amount</th>
                        <th>Description / Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
}

function exportVendorsPDF() {
    const vendors = db.getVendors();
    const expenses = db.getExpenses();

    let rowsHtml = '';
    if (vendors.length === 0) {
        rowsHtml = '<tr><td colspan="6" style="text-align:center; color:#9CA3AF;">No vendors recorded.</td></tr>';
    } else {
        vendors.forEach(v => {
            rowsHtml += `
                <tr>
                    <td><strong>${v.name}</strong></td>
                    <td>${v.phone}</td>
                    <td>${v.gst || 'N/A'}</td>
                    <td>${v.address}</td>
                    <td>${formatCurrency(v.openingBalance)}</td>
                    <td><strong style="color: ${v.outstandingAmount > 0 ? '#EF4444' : '#111827'};">${formatCurrency(v.outstandingAmount)}</strong></td>
                </tr>
            `;
        });
    }

    const totalOutstanding = vendors.reduce((sum, v) => sum + v.outstandingAmount, 0);

    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ZOOSH Supplier Ledger Directory</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; padding: 40px; margin: 0; }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; margin-bottom: 30px; }
                .brand h1 { font-size: 1.5rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                .brand span { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #0B5D3F; }
                .meta { text-align: right; font-size: 0.8rem; color: #4B5563; }
                .summary { background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; display: flex; gap: 30px; margin-bottom: 30px; }
                .summary-item span { font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; display: block; margin-bottom: 4px; }
                .summary-item p { font-size: 1.25rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background-color: #E6F4EA; color: #0B5D3F; font-size: 0.75rem; text-transform: uppercase; padding: 10px 14px; border: 1px solid #E5E7EB; text-align: left; }
                td { padding: 10px 14px; border: 1px solid #E5E7EB; font-size: 0.85rem; color: #1F2937; }
                tr:nth-child(even) { background-color: #F9FAFB; }
                @media print {
                    th { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="brand">
                    <h1>ZOOSH FURNITURES</h1>
                    <span>Supplier Ledger Directory</span>
                </div>
                <div class="meta">
                    <p style="margin:0; font-weight:700;">Supplier Ledger Directory</p>
                    <p style="margin:2px 0 0 0;">Generated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
            <div class="summary">
                <div class="summary-item">
                    <span>Total Outstanding Balance</span>
                    <p style="color: #EF4444;">${formatCurrency(totalOutstanding)}</p>
                </div>
                <div class="summary-item">
                    <span>Active Vendors</span>
                    <p>${vendors.length} suppliers</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Contact Phone</th>
                        <th>GST Reference</th>
                        <th>Address</th>
                        <th>Opening Balance</th>
                        <th>Current Outstanding</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
}

function exportProjectsPDF() {
    const projects = db.getProjects().filter(p => p.id !== 'prj-none');

    let rowsHtml = '';
    if (projects.length === 0) {
        rowsHtml = '<tr><td colspan="6" style="text-align:center; color:#9CA3AF;">No projects recorded.</td></tr>';
    } else {
        projects.forEach(p => {
            const pct = p.budget > 0 ? Math.min(100, Math.round((p.spent / p.budget) * 100)) : 0;
            const remaining = p.budget - p.spent;
            rowsHtml += `
                <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>${p.client}</td>
                    <td>${formatCurrency(p.budget)}</td>
                    <td>${formatCurrency(p.spent)}</td>
                    <td>${formatCurrency(remaining)}</td>
                    <td>
                        <div style="width: 100px; height: 6px; background-color: #E5E7EB; border-radius: 3px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 8px;">
                            <div style="height: 100%; border-radius:3px; width: ${pct}%; background-color: ${pct >= 95 ? '#EF4444' : (pct >= 80 ? '#F59E0B' : '#0B5D3F')};"></div>
                        </div>
                        <span style="font-size:0.75rem; font-weight:700; color:#4B5563;">${pct}%</span>
                    </td>
                </tr>
            `;
        });
    }

    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ZOOSH Project Budget Progress</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; padding: 40px; margin: 0; }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; margin-bottom: 30px; }
                .brand h1 { font-size: 1.5rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                .brand span { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #0B5D3F; }
                .meta { text-align: right; font-size: 0.8rem; color: #4B5563; }
                .summary { background-color: #F8F9FA; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; display: flex; gap: 30px; margin-bottom: 30px; }
                .summary-item span { font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; display: block; margin-bottom: 4px; }
                .summary-item p { font-size: 1.25rem; font-weight: 800; color: #0B5D3F; margin: 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background-color: #E6F4EA; color: #0B5D3F; font-size: 0.75rem; text-transform: uppercase; padding: 10px 14px; border: 1px solid #E5E7EB; text-align: left; }
                td { padding: 10px 14px; border: 1px solid #E5E7EB; font-size: 0.85rem; color: #1F2937; }
                tr:nth-child(even) { background-color: #F9FAFB; }
                @media print {
                    th { background-color: #E6F4EA !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="brand">
                    <h1>ZOOSH FURNITURES</h1>
                    <span>Project Budget Tracking</span>
                </div>
                <div class="meta">
                    <p style="margin:0; font-weight:700;">Project Budget Statement</p>
                    <p style="margin:2px 0 0 0;">Generated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
            <div class="summary">
                <div class="summary-item">
                    <span>Total Budgets Allocated</span>
                    <p>${formatCurrency(totalBudget)}</p>
                </div>
                <div class="summary-item">
                    <span>Total Budget Spent</span>
                    <p>${formatCurrency(totalSpent)}</p>
                </div>
                <div class="summary-item">
                    <span>Active Projects</span>
                    <p>${projects.length} sites</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Client Reference</th>
                        <th>Total Budget</th>
                        <th>Spent to Date</th>
                        <th>Remaining Budget</th>
                        <th>Utilization Progress</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </body>
        </html>
    `;

    win.document.close();
    win.print();
}

// ========================================================
// SUPABASE SYNC INTEGRATION CONTROLLER MODULE
// ========================================================
function openSupabaseModal() {
    const overlay = document.getElementById('supabase-modal-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    
    // Prefill credentials if already saved
    const url = localStorage.getItem('supabase_url') || '';
    const key = localStorage.getItem('supabase_key') || '';
    document.getElementById('supabase-url-input').value = url;
    document.getElementById('supabase-key-input').value = key;
    
    const statusDiv = document.getElementById('supabase-conn-status');
    statusDiv.style.display = 'none';
}

function closeSupabaseModal() {
    const overlay = document.getElementById('supabase-modal-overlay');
    if (overlay) overlay.style.display = 'none';
}

function initSupabase() {
    // Automatically enforce and overwrite the shared project credentials on startup
    const targetUrl = 'https://bxqqwvlxcnoktctobxwk.supabase.co';
    const targetKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cXF3dmx4Y25va3RjdG9ieHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDAwMzIsImV4cCI6MjA5OTA3NjAzMn0.Q1oBnhaP8_z6yczBv6sIyb8mPRBeb3BQUclbncq2xM8';
    
    localStorage.setItem('supabase_url', targetUrl);
    localStorage.setItem('supabase_key', targetKey);

    const syncBadge = document.getElementById('menu-supabase-sync');
    if (typeof supabase !== 'undefined') {
        try {
            supabaseClient = supabase.createClient(targetUrl, targetKey);
            if (syncBadge) {
                syncBadge.querySelector('i').setAttribute('data-lucide', 'cloud');
                syncBadge.querySelector('span').textContent = 'Cloud Active';
                syncBadge.style.opacity = '1';
                lucide.createIcons();
            }
            // Asynchronously fetch the latest database updates
            pullFromSupabase();
            // Start real-time listening
            setupRealtimeSubscriptions();
        } catch (e) {
            console.error("Failed to init Supabase client:", e);
        }
    }
}

function setupRealtimeSubscriptions() {
    if (!supabaseClient) return;
    try {
        supabaseClient
            .channel('zoosh-realtime-sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, (payload) => {
                console.log('Real-time database update detected in expenses table:', payload);
                pullFromSupabase();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'incomes' }, (payload) => {
                console.log('Real-time database update detected in incomes table:', payload);
                pullFromSupabase();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transfers' }, (payload) => {
                console.log('Real-time database update detected in transfers table:', payload);
                pullFromSupabase();
            })
            .subscribe();
    } catch (err) {
        console.error("Error setting up Real-time subscriptions:", err);
    }
}

async function saveSupabaseSettings() {
    const url = document.getElementById('supabase-url-input').value.trim();
    const key = document.getElementById('supabase-key-input').value.trim();
    const statusDiv = document.getElementById('supabase-conn-status');
    const connectBtn = document.getElementById('supabase-connect-btn');
    
    if (!url || !key) {
        statusDiv.style.display = 'block';
        statusDiv.style.backgroundColor = '#FEE2E2';
        statusDiv.style.color = '#EF4444';
        statusDiv.textContent = 'Please enter both Supabase URL and Anon Key.';
        return;
    }
    
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = '#DBEAFE';
    statusDiv.style.color = '#3B82F6';
    statusDiv.textContent = 'Testing connection & syncing data...';
    connectBtn.disabled = true;
    
    try {
        const testClient = supabase.createClient(url, key);
        // Test query on users table
        const { data, error } = await testClient.from('users').select('count', { count: 'exact', head: true });
        
        if (error) {
            throw new Error(error.message);
        }
        
        // Save to settings
        localStorage.setItem('supabase_url', url);
        localStorage.setItem('supabase_key', key);
        supabaseClient = testClient;
        
        statusDiv.style.backgroundColor = '#D1FAE5';
        statusDiv.style.color = '#10B981';
        statusDiv.textContent = 'Connected successfully! Syncing records...';
        
        const syncBadge = document.getElementById('menu-supabase-sync');
        if (syncBadge) {
            syncBadge.querySelector('i').setAttribute('data-lucide', 'cloud');
            syncBadge.querySelector('span').textContent = 'Cloud Active';
            syncBadge.style.opacity = '1';
            lucide.createIcons();
        }
        
        // Trigger bidirectional synchronization
        await pushLocalDataToSupabase();
        await pullFromSupabase();
        
        setTimeout(() => {
            closeSupabaseModal();
            connectBtn.disabled = false;
        }, 1200);
        
    } catch (err) {
        console.error("Supabase Connection test failed:", err);
        statusDiv.style.backgroundColor = '#FEE2E2';
        statusDiv.style.color = '#EF4444';
        statusDiv.textContent = 'Connection failed. Verify your SQL Schema setup and credentials.';
        connectBtn.disabled = false;
    }
}

// Push all existing local data to Supabase (ran on initial connect setup)
async function pushLocalDataToSupabase() {
    if (!supabaseClient) return;
    try {
        const users = db.getUsers();
        const vendors = db.getVendors();
        const projects = db.getProjects();
        const expenses = db.getExpenses();
        const txns = db.getTransactions();
        const incomes = db.getIncomes();
        const transfers = db.getTransfers();
        
        // Push Users
        for (const u of users) {
            await pushToSupabase('users', u);
        }
        // Push Vendors
        for (const v of vendors) {
            await pushToSupabase('vendors', v);
        }
        // Push Projects
        for (const p of projects) {
            await pushToSupabase('projects', p);
        }
        // Push Expenses
        for (const e of expenses) {
            await pushToSupabase('expenses', e);
        }
        // Push Transactions
        for (const t of txns) {
            await pushToSupabase('transactions', t);
        }
        // Push Incomes
        for (const i of incomes) {
            await pushToSupabase('incomes', i);
        }
        // Push Transfers
        for (const tr of transfers) {
            await pushToSupabase('transfers', tr);
        }
        
        console.log("One-time local storage database push to Supabase complete.");
    } catch (e) {
        console.error("Local data migration fail:", e);
    }
}

async function pullFromSupabase() {
    if (!supabaseClient) return;
    try {
        // Pull Users
        const { data: users, error: errU } = await supabaseClient.from('users').select('*');
        if (!errU && users && users.length > 0) {
            db.setData('zoosh_users', users);
        }
        
        // Pull Vendors
        const { data: vendors, error: errV } = await supabaseClient.from('vendors').select('*');
        if (!errV && vendors && vendors.length > 0) {
            db.setData('zoosh_vendors', vendors);
        }
        
        // Pull Projects
        const { data: projects, error: errP } = await supabaseClient.from('projects').select('*');
        if (!errP && projects && projects.length > 0) {
            db.setData('zoosh_projects', projects);
        }

        // Pull Expenses
        const { data: expenses, error: errE } = await supabaseClient.from('expenses').select('*');
        if (!errE && expenses) {
            const mapped = expenses.map(e => ({
                id: e.id,
                amount: Number(e.amount),
                vendorId: e.vendor_id,
                category: e.category,
                projectId: e.project_id,
                description: e.description,
                tax: Number(e.tax),
                paymentMethod: e.payment_method,
                status: e.status,
                createdBy: e.created_by,
                approvedBy: e.approved_by,
                transactionNo: e.transaction_no,
                gst: e.gst,
                createdAt: e.created_at,
                bankAccount: e.bank_account
            }));
            db.setData('zoosh_expenses', mapped);
            db.recalculateProjectSpending();
        }
        
        // Pull Transactions
        const { data: txns, error: errT } = await supabaseClient.from('transactions').select('*');
        if (!errT && txns) {
            db.setData('zoosh_transactions', txns);
        }

        // Pull Incomes
        const { data: incomes, error: errInc } = await supabaseClient.from('incomes').select('*');
        if (!errInc && incomes) {
            const mappedIncomes = incomes.map(i => ({
                id: i.id,
                amount: Number(i.amount),
                customer: i.customer,
                bankAccount: i.bank_account,
                date: i.date,
                description: i.description,
                createdAt: i.created_at
            }));
            db.setData('zoosh_incomes', mappedIncomes);
        }

        // Pull Transfers
        const { data: transfers, error: errTrf } = await supabaseClient.from('transfers').select('*');
        if (!errTrf && transfers) {
            const mappedTransfers = transfers.map(t => ({
                id: t.id,
                fromAccount: t.from_account,
                toAccount: t.to_account,
                amount: Number(t.amount),
                date: t.date,
                description: t.description,
                createdAt: t.created_at
            }));
            db.setData('zoosh_transfers', mappedTransfers);
        }
        
        // Refresh views
        renderDashboard();
        renderExpensesList();
        if (typeof renderIncomesList === 'function') renderIncomesList();
        if (typeof renderTransfersList === 'function') renderTransfersList();
    } catch (e) {
        console.error("Error pulling from Supabase:", e);
    }
}

async function pushToSupabase(table, record) {
    if (!supabaseClient) return;
    try {
        let payload = {};
        if (table === 'expenses') {
            payload = {
                id: record.id,
                amount: record.amount,
                vendor_id: record.vendorId,
                category: record.category,
                project_id: record.projectId,
                description: record.description,
                tax: record.tax || 0,
                payment_method: record.paymentMethod,
                status: record.status,
                created_by: record.createdBy,
                approved_by: record.approvedBy,
                transaction_no: record.transactionNo,
                gst: record.gst,
                created_at: record.createdAt,
                bank_account: record.bankAccount
            };
        } else if (table === 'vendors') {
            payload = {
                id: record.id,
                name: record.name,
                phone: record.phone,
                gst: record.gst,
                address: record.address,
                opening_balance: record.openingBalance || 0,
                outstanding_amount: record.outstandingAmount || 0
            };
        } else if (table === 'projects') {
            payload = {
                id: record.id,
                name: record.name,
                client: record.client,
                budget: record.budget || 0,
                spent: record.spent || 0
            };
        } else if (table === 'transactions') {
            payload = {
                id: record.id,
                type: record.type,
                amount: record.amount,
                method: record.method,
                description: record.description,
                created_at: record.createdAt
            };
        } else if (table === 'incomes') {
            payload = {
                id: record.id,
                amount: record.amount,
                customer: record.customer,
                bank_account: record.bankAccount,
                date: record.date,
                description: record.description,
                created_at: record.createdAt || record.date
            };
        } else if (table === 'transfers') {
            payload = {
                id: record.id,
                from_account: record.fromAccount,
                to_account: record.toAccount,
                amount: record.amount,
                date: record.date,
                description: record.description,
                created_at: record.createdAt || record.date
            };
        } else if (table === 'users') {
            payload = {
                id: record.id,
                name: record.name,
                role: record.role
            };
        }
        
        const { error } = await supabaseClient.from(table).upsert(payload);
        if (error) console.error(`Failed to upsert to Supabase ${table}:`, error);
    } catch (e) {
        console.error(`Exception upserting to Supabase ${table}:`, e);
    }
}

async function deleteFromSupabase(table, id) {
    if (!supabaseClient) return;
    try {
        const { error } = await supabaseClient.from(table).delete().eq('id', id);
        if (error) console.error(`Failed to delete from Supabase ${table}:`, error);
    } catch (e) {
        console.error(`Exception deleting from Supabase ${table}:`, e);
    }
}

// ----------------------------------------------------
// [NEW] INCOMES & TRANSFERS MODULES DEFINITIONS
// ----------------------------------------------------

function renderIncomesList() {
    const incomes = db.getIncomes();
    const container = document.getElementById('incomes-cards-grid');
    if (!container) return;

    container.innerHTML = '';
    if (incomes.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
                <i data-lucide="info" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--text-muted); display: block;"></i>
                <h4 style="margin-bottom: 8px;">No incomes recorded</h4>
                <p style="font-size: 0.85rem;">Click 'Add Income' to record customer payment.</p>
            </div>
        `;
        return;
    }

    incomes.forEach(inc => {
        const dateStr = new Date(inc.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        container.innerHTML += `
            <div class="project-progress-card">
                <div class="project-card-header" style="margin-bottom: 12px;">
                    <div>
                        <span style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${inc.id}</span>
                        <h4 style="font-size: 1.15rem; font-weight:800; margin-top:2px;">${inc.customer}</h4>
                    </div>
                    <div class="card-icon-wrap" style="background-color: var(--primary-light); color: var(--primary);">
                        <i data-lucide="trending-up"></i>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                    <p style="font-weight:700; font-size:1.3rem; color:var(--text-primary); margin-bottom:4px;">${formatCurrency(inc.amount)}</p>
                    <p style="display:flex; align-items:center; gap:6px; font-weight:600;"><i data-lucide="landmark" style="width:14px; color:var(--primary);"></i> ${inc.bankAccount}</p>
                    <p style="display:flex; align-items:center; gap:6px; margin-top:4px;"><i data-lucide="calendar" style="width:14px;"></i> ${dateStr}</p>
                    <p style="margin-top: 8px; font-weight: 500; font-size: 0.8rem; color: var(--text-secondary); border-top:1px dashed var(--border-color); padding-top:8px; white-space: pre-wrap; overflow-wrap: break-word; word-wrap: break-word;">${inc.description}</p>
                </div>
                <div style="display:flex; gap:8px; border-top: 1px solid var(--border-color); padding-top:12px; margin-top:12px;">
                    <button class="btn btn-secondary" style="flex:1; padding: 6px 12px; font-size: 0.75rem; height: 32px;" onclick="editIncomeAction('${inc.id}')"><i data-lucide="edit-3" style="width:12px;"></i> Edit</button>
                    <button class="btn btn-danger" style="flex:1; padding: 6px 12px; font-size: 0.75rem; height: 32px;" onclick="deleteIncomeAction('${inc.id}')"><i data-lucide="trash-2" style="width:12px;"></i> Delete</button>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function renderTransfersList() {
    const transfers = db.getTransfers();
    const container = document.getElementById('transfers-cards-grid');
    if (!container) return;

    container.innerHTML = '';
    if (transfers.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
                <i data-lucide="info" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--text-muted); display: block;"></i>
                <h4 style="margin-bottom: 8px;">No transfers recorded</h4>
                <p style="font-size: 0.85rem;">Click 'Create Transfer' to transfer money between accounts.</p>
            </div>
        `;
        return;
    }

    transfers.forEach(trf => {
        const dateStr = new Date(trf.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        container.innerHTML += `
            <div class="project-progress-card">
                <div class="project-card-header" style="margin-bottom: 12px;">
                    <div>
                        <span style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${trf.id}</span>
                        <h4 style="font-weight: 800; font-size: 1rem; margin-top:2px;">Account Transfer</h4>
                    </div>
                    <div class="card-icon-wrap" style="background-color: var(--primary-light); color: var(--primary);">
                        <i data-lucide="shuffle"></i>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                    <p style="font-weight:700; font-size:1.3rem; color:var(--text-primary); margin-bottom:8px;">${formatCurrency(trf.amount)}</p>
                    <div style="display:flex; flex-direction:column; gap:4px; font-weight: 600; margin-bottom:8px;">
                        <span style="display:flex; align-items:center; gap:6px;"><i data-lucide="arrow-up-right" style="width:14px; color:var(--danger);"></i> From: <strong style="color:var(--text-primary);">${trf.fromAccount}</strong></span>
                        <span style="display:flex; align-items:center; gap:6px;"><i data-lucide="arrow-down-left" style="width:14px; color:var(--success);"></i> To: <strong style="color:var(--text-primary);">${trf.toAccount}</strong></span>
                    </div>
                    <p style="display:flex; align-items:center; gap:6px;"><i data-lucide="calendar" style="width:14px;"></i> ${dateStr}</p>
                    <p style="margin-top: 8px; font-weight: 500; font-size: 0.8rem; color: var(--text-secondary); border-top:1px dashed var(--border-color); padding-top:8px; white-space: pre-wrap; overflow-wrap: break-word; word-wrap: break-word;">${trf.description}</p>
                </div>
                <div style="display:flex; gap:8px; border-top: 1px solid var(--border-color); padding-top:12px; margin-top:12px;">
                    <button class="btn btn-secondary" style="flex:1; padding: 6px 12px; font-size: 0.75rem; height: 32px;" onclick="editTransferAction('${trf.id}')"><i data-lucide="edit-3" style="width:12px;"></i> Edit</button>
                    <button class="btn btn-danger" style="flex:1; padding: 6px 12px; font-size: 0.75rem; height: 32px;" onclick="deleteTransferAction('${trf.id}')"><i data-lucide="trash-2" style="width:12px;"></i> Delete</button>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function saveIncomeForm(event) {
    event.preventDefault();
    
    const amount = Number(document.getElementById('inc-amount').value);
    const customer = document.getElementById('inc-customer').value.trim();
    const bankAccount = document.getElementById('inc-bank-account').value;
    const dateInput = document.getElementById('inc-date').value;
    const description = document.getElementById('inc-description').value.trim();
    const incId = document.getElementById('inc-id').value;

    if (!amount || !customer || !bankAccount || !dateInput || !description) {
        alert('Please fill out all required fields.');
        return;
    }

    const nextId = incId || 'INC-' + String(db.getIncomes().length + 1).padStart(3, '0');
    const dateStr = new Date(dateInput).toISOString();

    const incomeObj = {
        id: nextId,
        amount,
        customer,
        bankAccount,
        date: dateStr,
        description,
        attachments: []
    };

    db.saveIncome(incomeObj);
    if (typeof pushToSupabase === 'function') {
        pushToSupabase('incomes', incomeObj);
    }

    // Reset form and go back
    document.getElementById('income-entry-form').reset();
    document.getElementById('inc-id').value = '';
    
    if (typeof confetti === 'function') {
        confetti({ particleCount: 30, spread: 30 });
    }
    
    switchView('incomes');
}

function saveTransferForm(event) {
    event.preventDefault();
    
    const amount = Number(document.getElementById('trf-amount').value);
    const fromAccount = document.getElementById('trf-from').value.trim();
    const toAccount = document.getElementById('trf-to').value.trim();
    const dateInput = document.getElementById('trf-date').value;
    const description = document.getElementById('trf-description').value.trim();
    const trfId = document.getElementById('trf-id').value;

    if (!amount || !fromAccount || !toAccount || !dateInput || !description) {
        alert('Please fill out all required fields.');
        return;
    }

    if (fromAccount.toLowerCase() === toAccount.toLowerCase()) {
        alert('Validation Error: From Account and To Account cannot be identical.');
        return;
    }

    if (amount <= 0) {
        alert('Validation Error: Amount must be greater than zero.');
        return;
    }

    const nextId = trfId || 'TRF-' + String(db.getTransfers().length + 1).padStart(3, '0');
    const dateStr = new Date(dateInput).toISOString();

    const transferObj = {
        id: nextId,
        amount,
        fromAccount,
        toAccount,
        date: dateStr,
        description,
        attachments: []
    };

    db.saveTransfer(transferObj);
    if (typeof pushToSupabase === 'function') {
        pushToSupabase('transfers', transferObj);
    }

    // Reset form and go back
    document.getElementById('transfer-entry-form').reset();
    document.getElementById('trf-id').value = '';
    
    if (typeof confetti === 'function') {
        confetti({ particleCount: 30, spread: 30 });
    }
    
    switchView('transfers');
}

function editIncomeAction(id) {
    const inc = db.getIncomes().find(i => i.id === id);
    if (!inc) return;

    switchView('add-income');
    document.getElementById('inc-id').value = inc.id;
    document.getElementById('inc-amount').value = inc.amount;
    document.getElementById('inc-customer').value = inc.customer;
    document.getElementById('inc-bank-account').value = inc.bankAccount;
    document.getElementById('inc-date').value = new Date(inc.date).toISOString().slice(0, 16);
    document.getElementById('inc-description').value = inc.description;
}

function deleteIncomeAction(id) {
    if (confirm('Are you sure you want to delete this income record?')) {
        db.deleteIncome(id);
        if (typeof deleteFromSupabase === 'function') {
            deleteFromSupabase('incomes', id);
        }
        renderIncomesList();
        renderDashboard();
    }
}

function editTransferAction(id) {
    const trf = db.getTransfers().find(t => t.id === id);
    if (!trf) return;

    switchView('add-transfer');
    document.getElementById('trf-id').value = trf.id;
    document.getElementById('trf-amount').value = trf.amount;
    document.getElementById('trf-from').value = trf.fromAccount;
    document.getElementById('trf-to').value = trf.toAccount;
    document.getElementById('trf-date').value = new Date(trf.date).toISOString().slice(0, 16);
    document.getElementById('trf-description').value = trf.description;
}

function deleteTransferAction(id) {
    if (confirm('Are you sure you want to delete this transfer record?')) {
        db.deleteTransfer(id);
        if (typeof deleteFromSupabase === 'function') {
            deleteFromSupabase('transfers', id);
        }
        renderTransfersList();
        renderDashboard();
    }
}
