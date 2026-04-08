import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { colors, typography, layout, radius } from "../styles/tokens";

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: `${color}22`,
      border: `1px solid ${color}44`,
      borderRadius: radius.xs,
      fontSize: 11,
      padding: "2px 8px",
      fontFamily: typography.fontMono,
      fontWeight: typography.weight.bold,
      color,
    }}>
      {label}
    </span>
  );
}

const TECH_TAGS = [
  "Python","FastMCP","PyTest","LangGraph","LiteLLM","Openroute","n8n",
  "OpenTelemetry","Arize Phoenix","Postgres","PgVector","GitLab CI",
  "GitHub Actions","Prefect","Databricks","Docker","Docker Compose",
  "DevContainers","Kubernetes","AWS","GCP","Terraform","Crossplane",
];

const POSTS = [
  {
    href: "https://www.linkedin.com/pulse/serverless-computing-stole-our-servers-%E3%83%84-william-indest-phd/?trackingId=b6IMX2axNMGIrDSOkQHgKw%3D%3D",
    external: true,
    date: "Nov 10, 2019",
    tag: "Serverless Computing",
    tagColor: "#f472b6",
    title: "On Serverless Computing: They Stole Our Servers! ¯\\_(ツ)_/¯",
    description: "A simple overview on serverless computing: what it is, what is the value and when is it not a good idea.",
  },
];

const CERTS = [
  { title: "Certified Kubernetes Administrator",    abbr: "CKA", issuer: "CNCF / Linux Foundation",  color: "#326ce5" },
  { title: "AWS Developer Associate",               abbr: "DVA", issuer: "Amazon Web Services",       color: "#f59e0b" },
  { title: "AWS Solutions Architect Associate",     abbr: "SAA", issuer: "Amazon Web Services",       color: "#f59e0b" },
  { title: "Associate Cloud Engineer",              abbr: "ACE", issuer: "Google Cloud",              color: "#34a853" },
  { title: "GitLab Certified Associate",            abbr: "GL",  issuer: "GitLab",                   color: "#fc6d26" },
];

const EDUCATION = [
  { school: "Faculdade de Tecnologia Rocketseat",                          degree: "Postgraduate Degree in Artificial Intelligence & Automation",                               period: "Feb 2026 – Mar 2027", color: "#818cf8" },
  { school: "Pontifícia Universidade Católica do Rio Grande do Sul",       degree: "Postgraduate Degree in Full Stack Development, Computer Software Engineering",              period: "Jan 2025 – Feb 2026", color: "#38bdf8" },
  { school: "Uninove – Universidade Nove de Julho",                        degree: "Technology Degree in Database, Information Technology",                                    period: "Aug 2010 – Apr 2013", color: "#94a3b8" },
];

const SECTION_HEADING: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: colors.textMuted,
  letterSpacing: 2,
  textTransform: "uppercase",
  margin: "0 0 20px",
};

function PostCard({ post }: { post: typeof POSTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={post.href}
      target={post.external ? "_blank" : undefined}
      rel={post.external ? "noreferrer" : undefined}
      style={{
        display: "block",
        background: colors.bgSurface,
        border: `1px solid ${hovered ? colors.indigoDim : colors.borderDefault}`,
        borderRadius: radius.md,
        padding: "20px 24px",
        textDecoration: "none",
        transition: "all 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: colors.textMuted }}>{post.date}</span>
        <Tag label={post.tag} color={post.tagColor} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, marginBottom: 6 }}>{post.title}</div>
      <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>{post.description}</div>
    </a>
  );
}

function CertCard({ cert }: { cert: typeof CERTS[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: `${cert.color}18`,
        border: `1.5px solid ${cert.color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: typography.fontMono, fontSize: 11, fontWeight: 800, color: cert.color }}>{cert.abbr}</span>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>{cert.title}</div>
        <div style={{ fontSize: 12, color: colors.textMuted }}>{cert.issuer}</div>
      </div>
    </div>
  );
}

function EducationCard({ edu }: { edu: typeof EDUCATION[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: edu.color, marginTop: 5, flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>{edu.school}</div>
        <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.5 }}>{edu.degree}</div>
        <div style={{ fontSize: 12, color: colors.textMuted }}>{edu.period}</div>
      </div>
    </div>
  );
}

function ToolsCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/canvas"
      style={{
        display: "block",
        background: hovered ? "#4f46e528" : "#4f46e518",
        border: `1px solid ${hovered ? colors.indigoDim : "#4f46e555"}`,
        borderRadius: radius.md,
        padding: "20px 24px",
        textDecoration: "none",
        transition: "all 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, marginBottom: 8 }}>
        GenAI Local Setup Canvas
      </div>
      <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>
        A visual reference for building a high-standards AI-native engineering environment — client layer, MCP servers, LiteLLM gateway, observability stack, and security standards in one view.
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ background: colors.bgPage, minHeight: "100vh", fontFamily: typography.fontSans }}>
      <NavBar />
      <main style={{
        maxWidth: layout.maxWidth,
        margin: "0 auto",
        padding: `${layout.contentPaddingTop}px ${layout.contentPaddingX}px ${layout.contentPaddingBottom}px`,
      }}>
        {/* Hero */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: colors.indigo, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            Agentic Platform Engineer · AI Systems
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: colors.textPrimary, margin: "0 0 16px", lineHeight: 1.15 }}>
            Indest Labs
          </h1>
          <p style={{ fontSize: 16, color: colors.textSecondary, lineHeight: 1.7, maxWidth: 560, margin: "0 0 28px" }}>
            I build Agentic Platform Engineering tooling - MCP servers, AI agents, agentic workflows, and the security and observability standards that make them production-grade.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {TECH_TAGS.map((t) => <Tag key={t} label={t} color={colors.cyan} />)}
          </div>
        </section>

        {/* Writing */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={SECTION_HEADING}>Writing</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {POSTS.map((p) => <PostCard key={p.href} post={p} />)}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={SECTION_HEADING}>Certifications</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CERTS.map((c) => <CertCard key={c.abbr} cert={c} />)}
          </div>
        </section>

        {/* Education */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={SECTION_HEADING}>Education</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {EDUCATION.map((e) => <EducationCard key={e.school} edu={e} />)}
          </div>
        </section>

        {/* Tools */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={SECTION_HEADING}>Tools</h2>
          <ToolsCard />
        </section>
      </main>

      <footer style={{
        borderTop: `1px solid ${colors.borderDefault}`,
        padding: 24,
        textAlign: "center",
        fontSize: 12,
        color: colors.textMuted,
        fontFamily: typography.fontSans,
      }}>
        indest_labs.dev · RFCA Solutions · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
