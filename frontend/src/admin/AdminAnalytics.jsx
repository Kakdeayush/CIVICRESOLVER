import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../assets/css/admin.css";

const complaintsTrend = [
  { month: "Jan", complaints: 120 },
  { month: "Feb", complaints: 180 },
  { month: "Mar", complaints: 150 },
  { month: "Apr", complaints: 220 },
  { month: "May", complaints: 260 },
];

const categoryData = [
  { name: "Road", value: 35 },
  { name: "Water", value: 25 },
  { name: "Electricity", value: 20 },
  { name: "Sanitation", value: 20 },
];

const resolutionData = [
  { week: "W1", resolved: 40 },
  { week: "W2", resolved: 65 },
  { week: "W3", resolved: 55 },
  { week: "W4", resolved: 80 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const AdminAnalytics = () => {
  return (
    <div className="admin-analytics">
      {/* HEADER */}
      <div className="analytics-header">
        <div>
          <h1>Analytics & Insights</h1>
          <p>Visual overview of civic complaint performance</p>
        </div>
      </div>

      {/* GRID */}
      <div className="analytics-grid">
        {/* TREND */}
        <div className="analytics-card">
          <h2>Complaints Trend</h2>
          <p className="hint">Monthly reported complaints</p>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={complaintsTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="complaints"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY */}
        <div className="analytics-card">
          <h2>Complaints by Category</h2>
          <p className="hint">Distribution of issue types</p>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="legend">
            {categoryData.map((c, i) => (
              <span key={i}>
                <i style={{ background: COLORS[i] }}></i>
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* RESOLUTION */}
        <div className="analytics-card wide">
          <h2>Resolution Efficiency</h2>
          <p className="hint">Weekly resolved complaints</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resolved" radius={[8, 8, 0, 0]} fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
