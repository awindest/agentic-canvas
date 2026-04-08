import Head from "next/head";
import NavBar from "../components/NavBar";
import { colors, typography } from "../styles/tokens";
import styles from "../styles/canvas.module.css";

const PALETTE = {
  bg:    "#0f172a",
  col1:  { fill: "#4f46e5", badge: "#818cf8" },
  col2:  { fill: "#0891b2", badge: "#22d3ee" },
  col3:  { fill: "#7c3aed", badge: "#a78bfa" },
  col5a: { fill: "#0369a1", badge: "#38bdf8" },
  col5b: { fill: "#be185d", badge: "#f472b6" },
  gw:    { fill: "#b45309", badge: "#fcd34d" },
  std:   { fill: "#d97706", badge: "#fbbf24" },
  obs:   { fill: "#0f766e", badge: "#2dd4bf" },
};

const DEP_STYLES = {
  Rules:       { bg: "#dc262618", border: "#dc262666", color: "#fca5a5", label: "Depends on: Claude Rules" },
  Skills:      { bg: "#16a34a18", border: "#16a34a66", color: "#86efac", label: "Depends on: Claude Skills" },
  Local:       { bg: "#71717a18", border: "#71717a66", color: "#d4d4d8", label: "Depends on: Local Setup" },
  LocalRemote: { bg: "#92400e18", border: "#92400e66", color: "#fcd34d", label: "Depends on: Local & Remote Infrastructure" },
};

type DepType = keyof typeof DEP_STYLES;

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: `${color}22`,
      border: `1px solid ${color}55`,
      borderRadius: 4,
      fontSize: 9.5,
      padding: "1px 6px",
      fontFamily: "monospace",
      fontWeight: 700,
      color,
    }}>
      {label}
    </span>
  );
}

function Num({ n, color }: { n: string; color: string }) {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: "50%",
      border: `2px solid ${color}`,
      background: `${color}18`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 800, color, flexShrink: 0,
    }}>
      {n}
    </div>
  );
}

function PSBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: "linear-gradient(90deg, #7c3aed44, #4f46e544)",
      border: "1px solid #818cf8aa",
      color: "#c4b5fd",
      fontSize: 8.5, fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: 1,
      padding: "2px 8px",
      borderRadius: 9999,
    }}>
      ★ Personal Standard
    </span>
  );
}

function DepBadge({ type }: { type: DepType }) {
  const s = DEP_STYLES[type];
  return (
    <span style={{
      display: "inline-block",
      background: s.bg,
      border: `1px solid ${s.border}`,
      color: s.color,
      fontSize: 8.5, fontWeight: 700,
      padding: "2px 8px",
      borderRadius: 9999,
    }}>
      {s.label}
    </span>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      margin: "20px 0 16px",
    }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      <span style={{ fontSize: 9.5, color: "#475569", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

interface CellProps {
  num?: string;
  fill: string;
  badge: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  tags?: { label: string; color: string }[];
  deps?: DepType[];
  isPS?: boolean;
  children?: React.ReactNode;
}

function Cell({ num, fill, badge, title, subtitle, bullets, tags, deps, isPS, children }: CellProps) {
  return (
    <div style={{
      background: isPS ? `${fill}28` : `${fill}18`,
      border: `${isPS ? 2 : 1.5}px solid ${isPS ? `${fill}99` : `${fill}55`}`,
      boxShadow: isPS ? `0 0 12px ${fill}33` : undefined,
      borderRadius: 12,
      padding: "14px 16px",
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        {num && <Num n={num} color={badge} />}
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: badge, lineHeight: 1.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>
      {isPS && <PSBadge />}
      {bullets && bullets.length > 0 && (
        <ul style={{ margin: 0, padding: "0 0 0 14px", display: "flex", flexDirection: "column", gap: 3 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>{b}</li>
          ))}
        </ul>
      )}
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {tags.map((t) => <Tag key={t.label} label={t.label} color={t.color} />)}
        </div>
      )}
      {deps && deps.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {deps.map((d) => <DepBadge key={d} type={d} />)}
        </div>
      )}
      {children}
    </div>
  );
}

interface BandCellProps {
  fill: string;
  badge: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  tags?: { label: string; color: string }[];
  deps?: DepType[];
  isPS?: boolean;
}

function BandCell({ fill, badge, title, subtitle, bullets, tags, deps, isPS }: BandCellProps) {
  return (
    <div style={{
      background: isPS ? `${fill}28` : `${fill}18`,
      border: `${isPS ? 2 : 1}px solid ${isPS ? `${fill}99` : `${fill}44`}`,
      boxShadow: isPS ? `0 0 8px ${fill}22` : undefined,
      borderRadius: 8,
      padding: "10px 12px",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ fontSize: 11.5, fontWeight: 800, color: badge }}>{title}</div>
      {isPS && <PSBadge />}
      {subtitle && <div style={{ fontSize: 10, color: "#94a3b8" }}>{subtitle}</div>}
      {bullets && bullets.length > 0 && (
        <ul style={{ margin: 0, padding: "0 0 0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.5 }}>{b}</li>
          ))}
        </ul>
      )}
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {tags.map((t) => <Tag key={t.label} label={t.label} color={t.color} />)}
        </div>
      )}
      {deps && deps.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {deps.map((d) => <DepBadge key={d} type={d} />)}
        </div>
      )}
    </div>
  );
}

const LAYERS = [
  { num:"1", color:"#818cf8", title:"Client Layer",              desc:"How you interact with AI — the tools, IDE, and configuration that shape every session. This is where Rules and Skills are defined and where Claude Code runs." },
  { num:"2", color:"#fbbf24", title:"Standards & Frameworks Layer", desc:"How you build everything — MCP servers, agents, security controls, and input/output contracts. Defines the engineering standards that govern every artifact you produce." },
  { num:"3", color:"#fcd34d", title:"AI Gateway Layer",          desc:"The runtime control plane — routes LLM calls, proxies MCP servers, publishes agents as endpoints, and enforces budget and rate controls. Powered by LiteLLM." },
  { num:"4", color:"#2dd4bf", title:"Observability Layer",       desc:"Full visibility across every layer — traces, logs, metrics, and LLM evaluation. Built on OpenTelemetry and Arize Phoenix. Nothing runs as a black box." },
];

const TOOLS = [
  { category: "AI Model",            name: "Claude Code",             url: "https://claude.ai/code" },
  { category: "AI Model",            name: "Claude Desktop",          url: "https://claude.ai/download" },
  { category: "IDE",                 name: "VSCode",                  url: "https://code.visualstudio.com" },
  { category: "Configuration",       name: "CLAUDE.md Reference",     url: "https://docs.anthropic.com/en/docs/claude-code/memory" },
  { category: "MCP Framework",       name: "FastMCP",                 url: "https://github.com/jlowin/fastmcp" },
  { category: "Package Mgmt",        name: "Poetry",                  url: "https://python-poetry.org" },
  { category: "Testing",             name: "Pytest",                  url: "https://docs.pytest.org" },
  { category: "Linting",             name: "Megalinter",              url: "https://megalinter.io" },
  { category: "Security Scan",       name: "Trivy",                   url: "https://trivy.dev" },
  { category: "Security",            name: "OWASP MCP Top 10",        url: "https://owasp.org/www-project-mcp-top-10" },
  { category: "Secrets",             name: "1Password Connect",       url: "https://developer.1password.com/docs/connect" },
  { category: "Orchestration",       name: "LangGraph",               url: "https://github.com/langchain-ai/langgraph" },
  { category: "Agent Framework",     name: "CrewAI",                  url: "https://crewai.com" },
  { category: "Database",            name: "PostgreSQL + pgvector",   url: "https://github.com/pgvector/pgvector" },
  { category: "Containers",          name: "Chainguard Images",       url: "https://chainguard.dev" },
  { category: "Containers",          name: "Docker Hardened Images",  url: "https://hub.docker.com/search?q=&type=image&image_filter=official" },
  { category: "AI Gateway",          name: "LiteLLM",                 url: "https://litellm.ai" },
  { category: "Observability",       name: "Arize Phoenix",           url: "https://phoenix.arize.com" },
  { category: "Observability",       name: "OpenTelemetry",           url: "https://opentelemetry.io" },
  { category: "Agent — Investigator",name: "HolmesGPT",              url: "https://holmesgpt.dev" },
  { category: "Agent — Coder",       name: "Claude Code CLI",         url: "https://docs.anthropic.com/en/docs/claude-code" },
  { category: "Agent — Reviewer",    name: "PR-Agent (Qodo)",         url: "https://github.com/qodo-ai/pr-agent" },
  { category: "Agent — Security",    name: "Metis (Arm)",             url: "https://github.com/arm/metis" },
  { category: "Agent — CI Coder",    name: "GitLab Duo",              url: "https://about.gitlab.com/gitlab-duo" },
  { category: "Agent — CI Coder",    name: "GitHub Copilot",          url: "https://github.com/features/copilot" },
  { category: "MCP — Orchestration", name: "Prefect",                 url: "https://prefect.io" },
  { category: "MCP — Data",          name: "Databricks",              url: "https://databricks.com" },
  { category: "MCP — GitOps",        name: "ArgoCD MCP",              url: "https://argo-cd.readthedocs.io" },
  { category: "MCP — Infra",         name: "Kubernetes EKS/GKE",      url: "https://kubernetes.io" },
];

const SECTION_HEADING: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: "#64748b",
  letterSpacing: 2,
  textTransform: "uppercase",
  margin: "0 0 14px",
};

export default function Canvas() {
  return (
    <div style={{ background: PALETTE.bg, minHeight: "100vh", fontFamily: typography.fontSans }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GenAI Technology Stack Canvas — indest_labs.dev</title>
      </Head>
      <NavBar />

      <div style={{ padding: "60px 18px 22px" }}>

        {/* Title Block */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#475569", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            DEVELOPED BY RAPHAEL MORAES<br />MODIFIED BY INDEST LABS
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#f1f5f9", margin: "0 0 6px", lineHeight: 1.2 }}>
            GenAI Technology Stack Setup Canvas
          </h1>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>
            Opinionated, layered AI-native engineering stack for Vibe Coders · v1.1
          </div>
          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            <PSBadge />
            {(Object.keys(DEP_STYLES) as DepType[]).map((k) => <DepBadge key={k} type={k} />)}
          </div>
        </div>

        {/* Architecture Overview */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: "16px",
          marginBottom: 20,
        }}>
          <div style={SECTION_HEADING}>Architecture Overview</div>
          <div className={styles.grid4} style={{ gap: 12 }}>
            {LAYERS.map((l) => (
              <div key={l.num} style={{
                background: `${l.color}10`,
                border: `1px solid ${l.color}33`,
                borderRadius: 8,
                padding: "12px 14px",
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Num n={l.num} color={l.color} />
                  <div style={{ fontSize: 12, fontWeight: 800, color: l.color }}>{l.title}</div>
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Layer */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ ...SECTION_HEADING, color: PALETTE.col1.badge }}>Layer 1 — Client Layer</div>

          {/* Row 1: 3 columns */}
          <div className={styles.grid3} style={{ gap: 12, marginBottom: 12 }}>
            {/* Cell 1: AI Model Tool */}
            <Cell
              num="1" fill={PALETTE.col1.fill} badge={PALETTE.col1.badge}
              title="AI Model Tool" subtitle="Claude Code (primary) + Claude Desktop"
              bullets={[
                "Claude Code: terminal-first agentic coding — runs bash, edits files, manages git",
                "Claude Desktop: conversational AI, file & image analysis, document processing",
                "Both use the same underlying model but serve different interaction patterns",
              ]}
              tags={[
                { label: "Claude Code", color: PALETTE.col1.badge },
                { label: "Claude Desktop", color: PALETTE.col1.badge },
              ]}
              deps={["Rules", "Skills"]}
              isPS
            />

            {/* Cell 2: IDE Setup */}
            <Cell
              num="2" fill={PALETTE.col2.fill} badge={PALETTE.col2.badge}
              title="IDE Setup" subtitle="VSCode"
              bullets={[
                "VSCode: primary editor with Claude Code integration",
                "Extensions: GitLens, Docker, YAML, REST Client, Thunder Client",
                "Settings: auto-save, format on save, linting integration",
              ]}
              tags={[
                { label: "VSCode", color: PALETTE.col2.badge },
                { label: "GitLens", color: PALETTE.col2.badge },
                { label: "Docker Ext", color: PALETTE.col2.badge },
              ]}
            />

            {/* Cell 3: Configuration Layer */}
            <Cell
              num="3" fill={PALETTE.col3.fill} badge={PALETTE.col3.badge}
              title="Configuration Layer" subtitle="Rules & Skills"
              bullets={[
                "CLAUDE.md: project rules, coding standards, tool permissions",
                "Skills: reusable slash-command workflows for common tasks",
                "MCP config: server list, tool permissions, resource access",
              ]}
              tags={[
                { label: "CLAUDE.md", color: PALETTE.col3.badge },
                { label: "Skills", color: PALETTE.col3.badge },
                { label: "MCP Config", color: PALETTE.col3.badge },
              ]}
              deps={["Rules", "Skills"]}
              isPS
            />
          </div>

          {/* Row 2: MCP Servers + Agents */}
          <div className={styles.grid2} style={{ gap: 12, marginBottom: 20 }}>
            {/* Cell 4: MCP Servers */}
            <Cell
              num="4" fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
              title="MCP Servers" subtitle="Model Context Protocol — tool layer for Claude"
            >
              <div className={styles.grid2} style={{ gap: 8, marginTop: 4 }}>
                <div>
                  <Divider label="Local" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Filesystem MCP" subtitle="Read/write project files"
                      deps={["Local"]} />
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Git MCP" subtitle="Branch, diff, commit, log"
                      deps={["Local"]} />
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Docker MCP" subtitle="Container management"
                      deps={["Local"]} />
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Postgres MCP" subtitle="Query + schema inspection"
                      deps={["Local"]} />
                  </div>
                </div>
                <div>
                  <Divider label="Remote" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Prefect MCP" subtitle="Workflow orchestration"
                      deps={["LocalRemote"]} />
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Databricks MCP" subtitle="Data platform integration"
                      deps={["LocalRemote"]} />
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="Kubernetes MCP" subtitle="EKS / GKE cluster ops"
                      deps={["LocalRemote"]} />
                    <BandCell fill={PALETTE.col5a.fill} badge={PALETTE.col5a.badge}
                      title="ArgoCD MCP" subtitle="GitOps deployment"
                      deps={["LocalRemote"]} />
                  </div>
                </div>
              </div>
            </Cell>

            {/* Cell 5: Agents */}
            <Cell
              num="5" fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
              title="Agents" subtitle="Specialized AI agents in the stack"
            >
              <div className={styles.grid2} style={{ gap: 8, marginTop: 4 }}>
                <div>
                  <Divider label="Local" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <BandCell fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
                      title="Claude Code CLI" subtitle="Agentic coder — primary dev agent"
                      deps={["Rules", "Skills"]} isPS />
                    <BandCell fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
                      title="HolmesGPT" subtitle="Incident investigator agent"
                      deps={["Local"]} />
                  </div>
                </div>
                <div>
                  <Divider label="Remote / CI" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <BandCell fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
                      title="PR-Agent (Qodo)" subtitle="Automated code review"
                      deps={["LocalRemote"]} />
                    <BandCell fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
                      title="GitLab Duo" subtitle="CI-integrated AI coder"
                      deps={["LocalRemote"]} />
                    <BandCell fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
                      title="GitHub Copilot" subtitle="IDE + PR AI assistance"
                      deps={["LocalRemote"]} />
                    <BandCell fill={PALETTE.col5b.fill} badge={PALETTE.col5b.badge}
                      title="Metis (Arm)" subtitle="Security agent for CI"
                      deps={["LocalRemote"]} />
                  </div>
                </div>
              </div>
            </Cell>
          </div>
        </div>

        {/* Standards & Frameworks Layer */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...SECTION_HEADING, color: PALETTE.std.badge }}>Layer 2 — Standards & Frameworks Layer</div>

          {/* Row 1: 5 columns */}
          <div className={styles.grid5} style={{ gap: 12, marginBottom: 12 }}>
            <Cell
              num="6" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="MCP Server Standard" subtitle="FastMCP (Python)"
              bullets={[
                "FastMCP as the only MCP server framework",
                "Poetry for dependency management",
                "Pytest + coverage for all servers",
                "Typed inputs/outputs — no untyped tools",
              ]}
              tags={[{ label: "FastMCP", color: PALETTE.std.badge }, { label: "Poetry", color: PALETTE.std.badge }, { label: "Pytest", color: PALETTE.std.badge }]}
              isPS
            />
            <Cell
              num="7" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="Agent Standard" subtitle="LangGraph + CrewAI"
              bullets={[
                "LangGraph for stateful multi-step agent graphs",
                "CrewAI for multi-agent crew orchestration",
                "All agents emit OTEL traces",
              ]}
              tags={[{ label: "LangGraph", color: PALETTE.std.badge }, { label: "CrewAI", color: PALETTE.std.badge }]}
              isPS
            />
            <Cell
              num="8" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="Code Quality Standard" subtitle="Linting + Security"
              bullets={[
                "Megalinter: unified linting for all languages",
                "Trivy: container + IaC vulnerability scanning",
                "Pre-commit hooks enforce before every push",
              ]}
              tags={[{ label: "Megalinter", color: PALETTE.std.badge }, { label: "Trivy", color: PALETTE.std.badge }]}
              isPS
            />
            <Cell
              num="9" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="Security Standard" subtitle="OWASP MCP Top 10 + 1Password"
              bullets={[
                "OWASP MCP Top 10 as the security checklist for every MCP server",
                "1Password Connect for secrets — no .env files in repos",
                "Chainguard / Docker Hardened Images for containers",
              ]}
              tags={[{ label: "OWASP MCP", color: PALETTE.std.badge }, { label: "1Password", color: PALETTE.std.badge }, { label: "Chainguard", color: PALETTE.std.badge }]}
              isPS
            />
            <Cell
              num="10" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="Data Standard" subtitle="PostgreSQL + pgvector"
              bullets={[
                "PostgreSQL as the standard relational + vector database",
                "pgvector for embedding storage and similarity search",
                "Databricks for large-scale data processing",
              ]}
              tags={[{ label: "PostgreSQL", color: PALETTE.std.badge }, { label: "pgvector", color: PALETTE.std.badge }, { label: "Databricks", color: PALETTE.std.badge }]}
              isPS
            />
          </div>

          {/* Row 2: Inputs + Outputs */}
          <div className={styles.grid2} style={{ gap: 12 }}>
            <Cell
              num="11" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="Standard Inputs" subtitle="What every MCP server / agent accepts"
              bullets={[
                "Typed Pydantic models for all tool parameters",
                "JSON Schema validation at boundary",
                "Structured prompts with role + task + constraints",
                "Context injection via MCP resources (not raw file paths)",
              ]}
            />
            <Cell
              num="12" fill={PALETTE.std.fill} badge={PALETTE.std.badge}
              title="Standard Outputs" subtitle="What every MCP server / agent returns"
              bullets={[
                "Typed Pydantic response models",
                "Structured JSON — never raw string blobs",
                "OTEL span attached to every tool call",
                "Error objects with code + message + trace_id",
              ]}
            />
          </div>
        </div>

        {/* AI Gateway Layer */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...SECTION_HEADING, color: PALETTE.gw.badge }}>Layer 3 — AI Gateway Layer (LiteLLM)</div>
          <div style={{
            background: `${PALETTE.gw.fill}10`,
            border: `1.5px solid ${PALETTE.gw.fill}55`,
            borderRadius: 12,
            padding: "14px 16px",
          }}>
            <div className={styles.grid5} style={{ gap: 10 }}>
              <BandCell fill={PALETTE.gw.fill} badge={PALETTE.gw.badge}
                title="LLM Router" subtitle="Route calls to any provider"
                bullets={["Anthropic, OpenAI, Gemini, local Ollama", "Model fallbacks + load balancing", "Cost tracking per model"]}
                isPS />
              <BandCell fill={PALETTE.gw.fill} badge={PALETTE.gw.badge}
                title="MCP Proxy" subtitle="Remote MCP over SSE"
                bullets={["Expose local MCP servers remotely", "Auth + rate limiting", "Server-Sent Events transport"]} />
              <BandCell fill={PALETTE.gw.fill} badge={PALETTE.gw.badge}
                title="Agent Endpoint" subtitle="Publish agents as APIs"
                bullets={["LangGraph / CrewAI agents as REST endpoints", "OpenAI-compatible API surface", "Session management"]} />
              <BandCell fill={PALETTE.gw.fill} badge={PALETTE.gw.badge}
                title="Budget Controls" subtitle="Cost + rate enforcement"
                bullets={["Per-user / per-key spend limits", "Token rate limits", "Budget alerts"]}
                isPS />
              <BandCell fill={PALETTE.gw.fill} badge={PALETTE.gw.badge}
                title="OTEL Export" subtitle="Traces to observability layer"
                bullets={["All LLM calls emit OTEL spans", "Token usage as metrics", "Latency + error tracking"]}
                isPS />
            </div>
          </div>
        </div>

        {/* Observability Layer */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...SECTION_HEADING, color: PALETTE.obs.badge }}>Layer 4 — Observability Layer</div>
          <div style={{
            background: `${PALETTE.obs.fill}10`,
            border: `1.5px solid ${PALETTE.obs.fill}55`,
            borderRadius: 12,
            padding: "14px 16px",
          }}>
            <div className={styles.grid4} style={{ gap: 10 }}>
              <BandCell fill={PALETTE.obs.fill} badge={PALETTE.obs.badge}
                title="Arize Phoenix" subtitle="LLM tracing & evaluation"
                bullets={["Trace every LLM call end-to-end", "Evaluate responses for quality + safety", "Dataset curation from traces"]}
                isPS />
              <BandCell fill={PALETTE.obs.fill} badge={PALETTE.obs.badge}
                title="OpenTelemetry" subtitle="Universal trace/metric standard"
                bullets={["OTEL SDK in every MCP server and agent", "Spans propagated across service boundaries", "Export to Phoenix + any OTLP backend"]}
                isPS />
              <BandCell fill={PALETTE.obs.fill} badge={PALETTE.obs.badge}
                title="Metrics & Logs" subtitle="Structured observability"
                bullets={["Prometheus-compatible metrics from LiteLLM", "Structured JSON logs (no raw print statements)", "Log correlation via trace_id"]} />
              <BandCell fill={PALETTE.obs.fill} badge={PALETTE.obs.badge}
                title="Alerting" subtitle="Proactive incident detection"
                bullets={["Cost spike alerts via LiteLLM budget controls", "Error rate thresholds in Phoenix", "HolmesGPT for AI-driven incident investigation"]} />
            </div>
          </div>
        </div>

        {/* Tools Reference */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: 12,
          padding: "16px",
          marginBottom: 20,
        }}>
          <div style={SECTION_HEADING}>Tools Reference</div>
          <div className={styles.gridTools} style={{ gap: 8 }}>
            {TOOLS.map((t) => (
              <a
                key={`${t.category}-${t.name}`}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  padding: "8px 10px",
                  textDecoration: "none",
                  transition: "background 0.15s",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
              >
                <div style={{ fontSize: 9, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                  {t.category}
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#c4b5fd", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 9.5, color: "#64748b", fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {t.url.replace("https://", "")}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 10, color: "#334155" }}>
          indest_labs.dev · GenAI Engineering Standard v1.0 · 2026
        </div>
      </div>
    </div>
  );
}
