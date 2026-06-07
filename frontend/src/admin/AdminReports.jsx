import { useEffect, useState } from "react";
import { getDayWiseReport, getWeekWiseReport, getMonthWiseReport } from "../api/adminApi";
import "../assets/css/admin.css";

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState("day");
  const [dayReport, setDayReport] = useState(null);
  const [weekReport, setWeekReport] = useState(null);
  const [monthReport, setMonthReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Date and time filters
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Fetch day-wise report
  const fetchDayReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDayWiseReport(selectedDate);
      setDayReport(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch day-wise report";
      setError(errorMsg);
      console.error("Day-wise report error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch week-wise report
  const fetchWeekReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getWeekWiseReport(selectedDate);
      setWeekReport(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch week-wise report";
      setError(errorMsg);
      console.error("Week-wise report error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch month-wise report
  const fetchMonthReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMonthWiseReport(selectedYear, selectedMonth);
      setMonthReport(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch month-wise report";
      setError(errorMsg);
      console.error("Month-wise report error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load reports on tab change
  useEffect(() => {
    if (activeTab === "day") {
      fetchDayReport();
    } else if (activeTab === "week") {
      fetchWeekReport();
    } else if (activeTab === "month") {
      fetchMonthReport();
    }
  }, [activeTab]);

  // Load initial report
  useEffect(() => {
    fetchDayReport();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleDateFilter = () => {
    if (activeTab === "day") {
      fetchDayReport();
    } else if (activeTab === "week") {
      fetchWeekReport();
    }
  };

  const handleMonthFilter = () => {
    if (activeTab === "month") {
      fetchMonthReport();
    }
  };

  return (
    <div className="admin-reports-container">
      <h1>Complaint Reports</h1>

      {/* Tab Navigation */}
      <div className="report-tabs">
        <button
          className={`tab-button ${activeTab === "day" ? "active" : ""}`}
          onClick={() => setActiveTab("day")}
        >
          📅 Day-Wise
        </button>
        <button
          className={`tab-button ${activeTab === "week" ? "active" : ""}`}
          onClick={() => setActiveTab("week")}
        >
          📊 Week-Wise
        </button>
        <button
          className={`tab-button ${activeTab === "month" ? "active" : ""}`}
          onClick={() => setActiveTab("month")}
        >
          📈 Month-Wise
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Day-Wise Report */}
      {activeTab === "day" && (
        <div className="report-section">
          <div className="filter-section">
            <label htmlFor="dayDate">Select Date:</label>
            <input
              id="dayDate"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button onClick={handleDateFilter} className="btn-filter">
              Load Report
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : dayReport ? (
            <div className="report-content">
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Date</h3>
                  <p>{dayReport.date}</p>
                </div>
                <div className="summary-card">
                  <h3>Total Complaints</h3>
                  <p className="total-count">{dayReport.totalComplaints}</p>
                </div>
              </div>

              {/* Top Users */}
              <div className="report-section-box">
                <h3>Top Users Filing Complaints</h3>
                {dayReport.topUsers && dayReport.topUsers.length > 0 ? (
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayReport.topUsers.map((user, idx) => (
                        <tr key={user.userId}>
                          <td>{idx + 1}</td>
                          <td>{user.userName}</td>
                          <td>{user.userId}</td>
                          <td className="complaint-count">{user.complaintCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No complaints on this date</p>
                )}
              </div>

              {/* Top Areas */}
              <div className="report-section-box">
                <h3>Top Areas with Complaints</h3>
                {dayReport.topAreas && dayReport.topAreas.length > 0 ? (
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Area/Location</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayReport.topAreas.map((area, idx) => (
                        <tr key={area.area}>
                          <td>{idx + 1}</td>
                          <td>{area.area}</td>
                          <td className="complaint-count">{area.complaintCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No area data available</p>
                )}
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      {/* Week-Wise Report */}
      {activeTab === "week" && (
        <div className="report-section">
          <div className="filter-section">
            <label htmlFor="weekDate">Select Date (for week calculation):</label>
            <input
              id="weekDate"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button onClick={handleDateFilter} className="btn-filter">
              Load Report
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : weekReport ? (
            <div className="report-content">
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Week Period</h3>
                  <p>
                    {weekReport.weekStart} to {weekReport.weekEnd}
                  </p>
                </div>
                <div className="summary-card">
                  <h3>Total Complaints</h3>
                  <p className="total-count">{weekReport.totalComplaints}</p>
                </div>
              </div>

              {/* Top Users */}
              <div className="report-section-box">
                <h3>Top Users Filing Complaints</h3>
                {weekReport.topUsers && weekReport.topUsers.length > 0 ? (
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weekReport.topUsers.map((user, idx) => (
                        <tr key={user.userId}>
                          <td>{idx + 1}</td>
                          <td>{user.userName}</td>
                          <td>{user.userId}</td>
                          <td className="complaint-count">{user.complaintCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No complaints in this week</p>
                )}
              </div>

              {/* Top Areas */}
              <div className="report-section-box">
                <h3>Top Areas with Complaints</h3>
                {weekReport.topAreas && weekReport.topAreas.length > 0 ? (
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Area/Location</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weekReport.topAreas.map((area, idx) => (
                        <tr key={area.area}>
                          <td>{idx + 1}</td>
                          <td>{area.area}</td>
                          <td className="complaint-count">{area.complaintCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No area data available</p>
                )}
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      {/* Month-Wise Report */}
      {activeTab === "month" && (
        <div className="report-section">
          <div className="filter-section">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="yearSelect">Year:</label>
                <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
                  {[...Array(5)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="monthSelect">Month:</label>
                <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleMonthFilter} className="btn-filter">
              Load Report
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : monthReport ? (
            <div className="report-content">
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Month</h3>
                  <p>
                    {monthReport.monthName} {monthReport.year}
                  </p>
                </div>
                <div className="summary-card">
                  <h3>Total Complaints</h3>
                  <p className="total-count">{monthReport.totalComplaints}</p>
                </div>
              </div>

              {/* Top Users */}
              <div className="report-section-box">
                <h3>Top Users Filing Complaints</h3>
                {monthReport.topUsers && monthReport.topUsers.length > 0 ? (
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthReport.topUsers.map((user, idx) => (
                        <tr key={user.userId}>
                          <td>{idx + 1}</td>
                          <td>{user.userName}</td>
                          <td>{user.userId}</td>
                          <td className="complaint-count">{user.complaintCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No complaints in this month</p>
                )}
              </div>

              {/* Top Areas */}
              <div className="report-section-box">
                <h3>Top Areas with Complaints</h3>
                {monthReport.topAreas && monthReport.topAreas.length > 0 ? (
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Area/Location</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthReport.topAreas.map((area, idx) => (
                        <tr key={area.area}>
                          <td>{idx + 1}</td>
                          <td>{area.area}</td>
                          <td className="complaint-count">{area.complaintCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No area data available</p>
                )}
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
