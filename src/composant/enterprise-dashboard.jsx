import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #0a0c10;
    --bg2: #0f1218;
    --bg3: #151922;
    --border: #1e2530;
    --border2: #252d3a;
    --accent: #00d4aa;
    --accent2: #0088ff;
    --accent3: #ff6b35;
    --warn: #ffb800;
    --danger: #ff3b5c;
    --text: #e8edf4;
    --muted: #5a6680;
    --muted2: #8a9bb8;
    --font-head: 'Syne', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-mono); }

  .app {
    display: grid;
    grid-template-columns: 220px 1fr;
    grid-template-rows: 56px 1fr;
    min-height: 100vh;
    background: var(--bg);
  }

  /* TOPBAR */
  .topbar {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-head);
    font-weight: 800;
    font-size: 17px;
    letter-spacing: -0.5px;
    color: var(--text);
  }

  .logo-icon {
    width: 28px; height: 28px;
    background: var(--accent);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-icon svg { color: #000; }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 12px;
    color: var(--muted2);
  }

  .status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .topbar-time {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 1px;
  }

  .avatar {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }

  /* SIDEBAR */
  .sidebar {
    background: var(--bg2);
    border-right: 1px solid var(--border);
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-section {
    padding: 0 16px;
    margin-bottom: 8px;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 16px;
    cursor: pointer;
    font-size: 12px;
    color: var(--muted2);
    transition: all 0.15s;
    border-left: 2px solid transparent;
    position: relative;
  }

  .nav-item:hover { background: var(--bg3); color: var(--text); }

  .nav-item.active {
    background: var(--bg3);
    color: var(--accent);
    border-left-color: var(--accent);
  }

  .nav-badge {
    margin-left: auto;
    background: var(--danger);
    color: #fff;
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 10px;
  }

  .nav-icon { width: 16px; height: 16px; flex-shrink: 0; }

  /* MAIN */
  .main {
    overflow-y: auto;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .page-title {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
  }

  .page-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
    letter-spacing: 0.5px;
  }

  .header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 12px;
    font-family: var(--font-mono);
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid var(--border2);
    background: var(--bg3);
    color: var(--muted2);
    letter-spacing: 0.5px;
  }

  .btn:hover { border-color: var(--accent); color: var(--accent); }

  .btn-primary {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
    font-weight: 600;
  }

  .btn-primary:hover { background: #00bfa0; color: #000; }

  /* METRICS STRIP */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .metric-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
    cursor: pointer;
  }

  .metric-card:hover { border-color: var(--border2); }
  .metric-card.accent { border-top: 2px solid var(--accent); }
  .metric-card.warn { border-top: 2px solid var(--warn); }
  .metric-card.danger { border-top: 2px solid var(--danger); }
  .metric-card.info { border-top: 2px solid var(--accent2); }

  .metric-label {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .metric-value {
    font-family: var(--font-head);
    font-size: 30px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
    line-height: 1;
  }

  .metric-delta {
    font-size: 11px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .delta-up { color: var(--accent); }
  .delta-down { color: var(--danger); }
  .delta-neutral { color: var(--muted); }

  .metric-sparkline {
    position: absolute;
    right: 0; bottom: 0;
    opacity: 0.15;
  }

  /* CONTENT GRID */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 20px;
  }

  /* CARD */
  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
  }

  .card-title {
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.3px;
  }

  .card-meta {
    font-size: 11px;
    color: var(--muted);
  }

  /* TABLE */
  .table-wrap { overflow-x: auto; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  thead th {
    padding: 10px 20px;
    text-align: left;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    background: var(--bg3);
    font-weight: 500;
    white-space: nowrap;
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.1s;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--bg3); }

  td {
    padding: 12px 20px;
    color: var(--muted2);
    white-space: nowrap;
  }

  td.td-name { color: var(--text); font-weight: 500; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 10px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .badge-green { background: rgba(0, 212, 170, 0.12); color: var(--accent); border: 1px solid rgba(0, 212, 170, 0.2); }
  .badge-yellow { background: rgba(255, 184, 0, 0.12); color: var(--warn); border: 1px solid rgba(255, 184, 0, 0.2); }
  .badge-red { background: rgba(255, 59, 92, 0.12); color: var(--danger); border: 1px solid rgba(255, 59, 92, 0.2); }
  .badge-blue { background: rgba(0, 136, 255, 0.12); color: var(--accent2); border: 1px solid rgba(0, 136, 255, 0.2); }
  .badge-gray { background: rgba(90, 102, 128, 0.2); color: var(--muted2); border: 1px solid var(--border); }

  .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* MINI CHART */
  .chart-area {
    padding: 20px;
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    height: 100px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }

  .bar-group {
    flex: 1;
    display: flex;
    gap: 2px;
    align-items: flex-end;
    cursor: pointer;
  }

  .bar {
    flex: 1;
    border-radius: 3px 3px 0 0;
    transition: opacity 0.15s;
    min-width: 6px;
  }

  .bar:hover { opacity: 0.7; }

  .bar-a { background: var(--accent); }
  .bar-b { background: var(--accent2); opacity: 0.6; }

  .chart-labels {
    display: flex;
    gap: 5px;
    padding-top: 8px;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.5px;
  }

  .chart-labels span { flex: 1; text-align: center; }

  .chart-legend {
    display: flex;
    gap: 16px;
    margin-top: 14px;
    font-size: 11px;
    color: var(--muted2);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .legend-dot {
    width: 8px; height: 8px;
    border-radius: 2px;
  }

  /* ACTIVITY FEED */
  .activity-list { padding: 0; }

  .activity-item {
    display: flex;
    gap: 12px;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    transition: background 0.1s;
    cursor: pointer;
  }

  .activity-item:hover { background: var(--bg3); }
  .activity-item:last-child { border-bottom: none; }

  .activity-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
  }

  .activity-content { flex: 1; }

  .activity-text {
    font-size: 12px;
    color: var(--muted2);
    line-height: 1.5;
  }

  .activity-text strong { color: var(--text); font-weight: 500; }

  .activity-time {
    font-size: 10px;
    color: var(--muted);
    margin-top: 2px;
    letter-spacing: 0.5px;
  }

  /* BOTTOM ROW */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  /* KPI RING */
  .kpi-list { padding: 10px 20px; display: flex; flex-direction: column; gap: 14px; }

  .kpi-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .kpi-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    align-items: center;
  }

  .kpi-name { color: var(--muted2); }
  .kpi-val { color: var(--text); font-weight: 500; }

  .kpi-bar {
    height: 4px;
    background: var(--bg3);
    border-radius: 2px;
    overflow: hidden;
  }

  .kpi-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 1s ease;
  }

  /* ALERTS */
  .alerts-list { padding: 0; }

  .alert-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 13px 20px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.1s;
  }

  .alert-item:hover { background: var(--bg3); }
  .alert-item:last-child { border-bottom: none; }

  .alert-icon {
    width: 28px; height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .alert-icon.warn { background: rgba(255, 184, 0, 0.15); }
  .alert-icon.danger { background: rgba(255, 59, 92, 0.15); }
  .alert-icon.info { background: rgba(0, 136, 255, 0.15); }

  .alert-body { flex: 1; }

  .alert-title {
    font-size: 12px;
    color: var(--text);
    font-weight: 500;
  }

  .alert-desc {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  /* TABS */
  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--border);
    padding: 0 20px;
  }

  .tab {
    padding: 12px 16px;
    font-size: 12px;
    cursor: pointer;
    color: var(--muted);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.15s;
    letter-spacing: 0.5px;
  }

  .tab:hover { color: var(--muted2); }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }

  /* PROGRESS RING */
  .ring-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 24px;
  }

  .ring-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ring-center {
    position: absolute;
    text-align: center;
  }

  .ring-pct {
    font-family: var(--font-head);
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
  }

  .ring-label {
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 1px;
  }

  .ring-legend { display: flex; flex-direction: column; gap: 10px; }
  .ring-legend-item { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted2); }
  .ring-legend-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
`;

const departments = [
  { id: 1, name: "Finances", manager: "Sophie Martin", budget: "2.4M€", used: 68, status: "normal", employees: 12, trend: "+4.2%" },
  { id: 2, name: "Ressources Humaines", manager: "Karim Benali", budget: "890K€", used: 92, status: "alerte", employees: 8, trend: "+1.1%" },
  { id: 3, name: "Opérations", manager: "Lucie Dupont", budget: "5.1M€", used: 45, status: "normal", employees: 34, trend: "-2.3%" },
  { id: 4, name: "Informatique", manager: "Tom Leclerc", budget: "1.7M€", used: 78, status: "surveillance", employees: 19, trend: "+12.4%" },
  { id: 5, name: "Commercial", manager: "Ana Ferreira", budget: "3.2M€", used: 55, status: "normal", employees: 28, trend: "+8.7%" },
  { id: 6, name: "Marketing", manager: "Paul Renard", budget: "620K€", used: 101, status: "critique", employees: 7, trend: "+22.1%" },
];

const activities = [
  { id: 1, text: <><strong>Sophie Martin</strong> a approuvé le rapport trimestriel Q4</>, time: "il y a 4 min", color: "#00d4aa" },
  { id: 2, text: <><strong>Alerte budget</strong> déclenchée pour le département Marketing</>, time: "il y a 17 min", color: "#ff3b5c" },
  { id: 3, text: <><strong>Karim Benali</strong> a soumis 3 nouvelles demandes de recrutement</>, time: "il y a 42 min", color: "#0088ff" },
  { id: 4, text: <><strong>Audit de conformité</strong> planifié pour le 18 mars 2026</>, time: "il y a 1h 12min", color: "#ffb800" },
  { id: 5, text: <><strong>Tom Leclerc</strong> a mis à jour les permissions d'accès serveur</>, time: "il y a 2h 05min", color: "#00d4aa" },
  { id: 6, text: <><strong>Rapport mensuel</strong> auto-généré et envoyé aux directeurs</>, time: "il y a 3h", color: "#5a6680" },
];

const alerts = [
  { type: "danger", icon: "⚠", title: "Budget Marketing dépassé", desc: "101% — dépassement de 6.2K€" },
  { type: "warn", icon: "◉", title: "RH proche du plafond", desc: "92% du budget consommé" },
  { type: "warn", icon: "◎", title: "Contrat fournisseur expire", desc: "Renouvellement requis avant le 20/03" },
  { type: "info", icon: "ℹ", title: "Mise à jour du système", desc: "Maintenance planifiée dimanche 22h–02h" },
];

const chartData = [
  { label: "Oct", a: 55, b: 38 },
  { label: "Nov", a: 62, b: 44 },
  { label: "Déc", a: 48, b: 52 },
  { label: "Jan", a: 71, b: 40 },
  { label: "Fév", a: 65, b: 58 },
  { label: "Mar", a: 80, b: 62 },
];

const maxBar = Math.max(...chartData.flatMap(d => [d.a, d.b]));

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="topbar-time">
      {time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

function Ring({ value, color, size = 100 }) {
  const r = (size / 2) - 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e2530" strokeWidth="8" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease" }} />
    </svg>
  );
}

function Sparkline({ data, color }) {
  const w = 80, h = 40;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 0.001)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="metric-sparkline">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const statusMap = {
  normal: { label: "Normal", cls: "badge-green" },
  alerte: { label: "Alerte", cls: "badge-yellow" },
  surveillance: { label: "Surveillance", cls: "badge-blue" },
  critique: { label: "Critique", cls: "badge-red" },
};

const kpis = [
  { name: "Taux de conformité", val: "94.2%", pct: 94, color: "#00d4aa" },
  { name: "Satisfaction employés", val: "78%", pct: 78, color: "#0088ff" },
  { name: "Efficacité opérationnelle", val: "86.5%", pct: 87, color: "#ffb800" },
  { name: "Couverture audit", val: "61%", pct: 61, color: "#ff6b35" },
];

const navItems = [
  { icon: "◈", label: "Tableau de bord", id: "dashboard", active: true },
  { icon: "◫", label: "Départements", id: "depts", badge: null },
  { icon: "◎", label: "Budgets", id: "budgets", badge: null },
  { icon: "◐", label: "Ressources Humaines", id: "rh" },
  { icon: "⚑", label: "Alertes", id: "alerts", badge: "4" },
  { icon: "◷", label: "Rapports", id: "reports" },
  { icon: "◈", label: "Conformité", id: "compliance" },
  { icon: "◌", label: "Paramètres", id: "settings" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("tous");
  const [activeNav, setActiveNav] = useState("dashboard");

  const filtered = activeTab === "tous"
    ? departments
    : departments.filter(d => d.status === activeTab);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="logo">
            <div className="logo-icon">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="black" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="black" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="black" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="black" opacity="0.5" />
              </svg>
            </div>
            ControlDesk
          </div>
          <div className="topbar-right">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="status-dot" />
              <span>Système opérationnel</span>
            </div>
            <Clock />
            <div className="avatar">JD</div>
          </div>
        </header>

        {/* SIDEBAR */}
        <nav className="sidebar">
          <div style={{ marginBottom: 20 }}>
            <div className="nav-section">Navigation</div>
            {navItems.slice(0, 6).map(item => (
              <div
                key={item.id}
                className={`nav-item${activeNav === item.id ? " active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
          <div>
            <div className="nav-section">Système</div>
            {navItems.slice(6).map(item => (
              <div
                key={item.id}
                className={`nav-item${activeNav === item.id ? " active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>
              <div>Jean Dupont</div>
              <div style={{ color: "var(--accent)" }}>Directeur Général</div>
              <div style={{ marginTop: 6, fontSize: 10, opacity: 0.6 }}>v2.4.1 · Dernière synchro 4min</div>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="main">
          {/* Header */}
          <div className="page-header">
            <div>
              <div className="page-title">Vue d'ensemble</div>
              <div className="page-sub">Vendredi 13 Mars 2026 · Exercice fiscal Q1 2026</div>
            </div>
            <div className="header-actions">
              <button className="btn">↓ Exporter</button>
              <button className="btn">⊕ Nouveau rapport</button>
              <button className="btn btn-primary">Actualiser</button>
            </div>
          </div>

          {/* Metrics */}
          <div className="metrics-grid">
            <div className="metric-card accent">
              <div className="metric-label">Budget Total</div>
              <div className="metric-value">14.0M€</div>
              <div className="metric-delta delta-up">↑ +3.2% vs trimestre précédent</div>
              <Sparkline data={[40, 52, 48, 65, 58, 72]} color="#00d4aa" />
            </div>
            <div className="metric-card warn">
              <div className="metric-label">Utilisation Moy.</div>
              <div className="metric-value">73.2%</div>
              <div className="metric-delta delta-down">↑ +8.4% ce mois</div>
              <Sparkline data={[55, 60, 64, 70, 72, 73]} color="#ffb800" />
            </div>
            <div className="metric-card info">
              <div className="metric-label">Effectif Total</div>
              <div className="metric-value">108</div>
              <div className="metric-delta delta-up">↑ +5 nouvelles recrues</div>
              <Sparkline data={[95, 98, 100, 103, 105, 108]} color="#0088ff" />
            </div>
            <div className="metric-card danger">
              <div className="metric-label">Alertes Actives</div>
              <div className="metric-value">4</div>
              <div className="metric-delta delta-neutral">2 critiques · 2 avertissements</div>
              <Sparkline data={[1, 3, 2, 5, 4, 4]} color="#ff3b5c" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Departments Table */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Contrôle des Départements</div>
                <span className="card-meta">{departments.length} unités actives</span>
              </div>
              <div className="tabs">
                {["tous", "normal", "surveillance", "alerte", "critique"].map(t => (
                  <div
                    key={t}
                    className={`tab${activeTab === t ? " active" : ""}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </div>
                ))}
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Département</th>
                      <th>Responsable</th>
                      <th>Budget</th>
                      <th>Utilisation</th>
                      <th>Statut</th>
                      <th>Effectif</th>
                      <th>Variation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(d => {
                      const s = statusMap[d.status];
                      const pctColor = d.used > 100 ? "#ff3b5c" : d.used > 85 ? "#ffb800" : "#00d4aa";
                      return (
                        <tr key={d.id}>
                          <td className="td-name">{d.name}</td>
                          <td>{d.manager}</td>
                          <td>{d.budget}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 60, height: 4, background: "var(--bg3)", borderRadius: 2, overflow: "hidden" }}>
                                <div style={{ width: `${Math.min(d.used, 100)}%`, height: "100%", background: pctColor, borderRadius: 2 }} />
                              </div>
                              <span style={{ color: pctColor, fontSize: 11, fontWeight: 600 }}>{d.used}%</span>
                            </div>
                          </td>
                          <td><span className={`badge ${s.cls}`}><span className="dot" />{s.label}</span></td>
                          <td>{d.employees}</td>
                          <td style={{ color: d.trend.startsWith("+") ? "var(--accent)" : "var(--danger)", fontSize: 11 }}>
                            {d.trend}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Activité Récente</div>
                <span className="card-meta" style={{ cursor: "pointer", color: "var(--accent)" }}>Voir tout</span>
              </div>
              <div className="activity-list">
                {activities.map(a => (
                  <div key={a.id} className="activity-item">
                    <div className="activity-dot" style={{ background: a.color, boxShadow: `0 0 6px ${a.color}50` }} />
                    <div className="activity-content">
                      <div className="activity-text">{a.text}</div>
                      <div className="activity-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="bottom-grid">
            {/* Budget Chart */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Évolution Budgétaire</div>
                <span className="card-meta">6 derniers mois</span>
              </div>
              <div className="chart-area">
                <div className="chart-bars">
                  {chartData.map((d) => (
                    <div key={d.label} className="bar-group">
                      <div className="bar bar-a" style={{ height: `${(d.a / maxBar) * 100}%` }} title={`Prévu: ${d.a}%`} />
                      <div className="bar bar-b" style={{ height: `${(d.b / maxBar) * 100}%` }} title={`Réalisé: ${d.b}%`} />
                    </div>
                  ))}
                </div>
                <div className="chart-labels">
                  {chartData.map(d => <span key={d.label}>{d.label}</span>)}
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-dot" style={{ background: "var(--accent)" }} />
                    <span>Budget prévu</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot" style={{ background: "rgba(0,136,255,0.6)" }} />
                    <span>Budget consommé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Indicateurs Clés</div>
                <span className="card-meta">Q1 2026</span>
              </div>
              <div className="kpi-list">
                {kpis.map(k => (
                  <div key={k.name} className="kpi-item">
                    <div className="kpi-row">
                      <span className="kpi-name">{k.name}</span>
                      <span className="kpi-val" style={{ color: k.color }}>{k.val}</span>
                    </div>
                    <div className="kpi-bar">
                      <div className="kpi-fill" style={{ width: `${k.pct}%`, background: k.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Alertes & Notifications</div>
                <span className="badge badge-red" style={{ cursor: "pointer" }}>4 actives</span>
              </div>
              <div className="alerts-list">
                {alerts.map((a, i) => (
                  <div key={i} className="alert-item">
                    <div className={`alert-icon ${a.type}`} style={{ fontSize: 14 }}>{a.icon}</div>
                    <div className="alert-body">
                      <div className="alert-title">{a.title}</div>
                      <div className="alert-desc">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
