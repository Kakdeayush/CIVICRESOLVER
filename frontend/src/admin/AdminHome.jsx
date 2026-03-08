const AdminHome = () => {
  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, Admin 👋</h1>
          <p>Manage and monitor the civic complaint system</p>
        </div>

        <div className="system-status">
          <span className="dot online"></span>
          System Operational
        </div>
      </div>

      {/* SYSTEM METRICS */}
      <div className="stats-grid">
        <div className="stat-card info">
          <h3>Avg Resolution Time</h3>
          <p className="stat-number">2.4 Days</p>
          <span className="stat-hint">Last 30 days</span>
        </div>

        <div className="stat-card success">
          <h3>Officer Efficiency</h3>
          <p className="stat-number">87%</p>
          <span className="stat-hint">Tasks completed</span>
        </div>

        <div className="stat-card warning">
          <h3>Citizen Satisfaction</h3>
          <p className="stat-number">4.5 / 5</p>
          <span className="stat-hint">Feedback score</span>
        </div>

        <div className="stat-card">
          <h3>System Load</h3>
          <p className="stat-number">Normal</p>
          <span className="stat-hint">All services stable</span>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="admin-section">
        <h2>Quick Actions</h2>

        <div className="actions-grid">
          <div className="action-card">📝 Manage Complaints</div>
          <div className="action-card">👮 Assign Officers</div>
          <div className="action-card">📈 View Analytics</div>
          <div className="action-card">⚙️ System Settings</div>
        </div>
      </div>

      {/* ACTIVITY TIMELINE */}
      <div className="admin-section">
        <h2>System Activity</h2>

        <ul className="activity-list">
          <li>✔ Officer assigned to sanitation department</li>
          <li>✔ Complaint resolution time improved</li>
          <li>✔ New area added: Chandrapur</li>
          <li>✔ System maintenance completed</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
