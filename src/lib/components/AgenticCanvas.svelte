<script lang="ts">
	import type { Snippet } from 'svelte';
	import { typography } from '$lib/styles/tokens';

	const PALETTE = {
		bg: '#0f172a',
		col1: { fill: '#4f46e5', badge: '#818cf8' },
		col2: { fill: '#0891b2', badge: '#22d3ee' },
		col3: { fill: '#7c3aed', badge: '#a78bfa' },
		col5a: { fill: '#0369a1', badge: '#38bdf8' },
		col5b: { fill: '#be185d', badge: '#f472b6' },
		gw: { fill: '#b45309', badge: '#fcd34d' },
		std: { fill: '#d97706', badge: '#fbbf24' },
		obs: { fill: '#0f766e', badge: '#2dd4bf' }
	};

	const DEP_STYLES = {
		Rules: {
			bg: '#dc262618',
			border: '#dc262666',
			color: '#fca5a5',
			label: 'Depends on: Claude Rules'
		},
		Skills: {
			bg: '#16a34a18',
			border: '#16a34a66',
			color: '#86efac',
			label: 'Depends on: Claude Skills'
		},
		Local: {
			bg: '#71717a18',
			border: '#71717a66',
			color: '#d4d4d8',
			label: 'Depends on: Local Setup'
		},
		LocalRemote: {
			bg: '#92400e18',
			border: '#92400e66',
			color: '#fcd34d',
			label: 'Depends on: Local & Remote Infrastructure'
		}
	};

	type DepType = keyof typeof DEP_STYLES;

	interface TagData {
		label: string;
		color: string;
	}

	interface CellProps {
		num?: string;
		fill: string;
		badge: string;
		title: string;
		subtitle?: string;
		bullets?: string[];
		tags?: TagData[];
		deps?: DepType[];
		isPS?: boolean;
	}

	interface BandCellProps {
		fill: string;
		badge: string;
		title: string;
		subtitle?: string;
		bullets?: string[];
		tags?: TagData[];
		deps?: DepType[];
		isPS?: boolean;
	}

	interface Tool {
		category: string;
		name: string;
		url: string;
		desc: string;
	}

	const LAYERS = [
		{
			num: '1',
			color: '#818cf8',
			title: 'Client Layer',
			desc: 'How you interact with AI — the tools, IDE, and configuration that shape every session. This is where Rules and Skills are defined and where Claude Code runs.'
		},
		{
			num: '2',
			color: '#fbbf24',
			title: 'Standards & Frameworks Layer',
			desc: 'How you build everything — MCP servers, agents, security controls, and input/output contracts. Defines the engineering standards that govern every artifact you produce.'
		},
		{
			num: '3',
			color: '#fcd34d',
			title: 'AI Gateway Layer',
			desc: 'The runtime control plane — routes LLM calls, proxies MCP servers, publishes agents as endpoints, and enforces budget and rate controls. Powered by LiteLLM.'
		},
		{
			num: '4',
			color: '#2dd4bf',
			title: 'Observability Layer',
			desc: 'Full visibility across every layer — traces, logs, metrics, and LLM evaluation. Built on OpenTelemetry and Arize Phoenix. Nothing runs as a black box.'
		}
	];

	const TOOLS: Tool[] = [
		{
			category: 'AI Model',
			name: 'Claude Code',
			url: 'https://claude.ai/code',
			desc: 'Terminal-first AI coding agent by Anthropic. Runs bash, edits files, manages Git, and executes multi-step agentic workflows directly in your terminal.'
		},
		{
			category: 'AI Model',
			name: 'Claude Desktop',
			url: 'https://claude.ai/download',
			desc: 'Conversational AI interface for file and image analysis, document processing, and complex reasoning. Connects to local MCP servers for extended capabilities.'
		},
		{
			category: 'IDE',
			name: 'VSCode',
			url: 'https://code.visualstudio.com',
			desc: 'Lightweight, extensible source code editor with built-in Git, debugging, IntelliSense, and a vast extension marketplace. Primary development environment.'
		},
		{
			category: 'Configuration',
			name: 'CLAUDE.md Reference',
			url: 'https://docs.anthropic.com/en/docs/claude-code/memory',
			desc: "Claude Code's memory system documentation. CLAUDE.md files define project-specific rules, coding standards, tool permissions, and behavioral guidelines."
		},
		{
			category: 'MCP Framework',
			name: 'FastMCP',
			url: 'https://github.com/jlowin/fastmcp',
			desc: 'Python framework for building Model Context Protocol servers. Decorator-based API simplifies defining tools, resources, and prompts for Claude to consume.'
		},
		{
			category: 'Package Mgmt',
			name: 'Poetry',
			url: 'https://python-poetry.org',
			desc: 'Python dependency management and packaging tool. Manages virtual environments, resolves transitive dependencies, and produces reproducible builds via lockfiles.'
		},
		{
			category: 'Testing',
			name: 'Pytest',
			url: 'https://docs.pytest.org',
			desc: 'Python testing framework with simple syntax for unit and integration tests. Supports fixtures, parameterization, and a rich plugin ecosystem including coverage.'
		},
		{
			category: 'Linting',
			name: 'Megalinter',
			url: 'https://megalinter.io',
			desc: 'Open-source meta-linter that runs 50+ linters across all languages in a single CI step. Enforces code quality, formatting, and security standards consistently.'
		},
		{
			category: 'Security Scan',
			name: 'Trivy',
			url: 'https://trivy.dev',
			desc: 'Comprehensive vulnerability scanner for containers, filesystems, IaC, and Git repos. Detects CVEs, misconfigurations, and exposed secrets in CI/CD pipelines.'
		},
		{
			category: 'Security',
			name: 'OWASP MCP Top 10',
			url: 'https://owasp.org/www-project-mcp-top-10',
			desc: 'Security checklist of the top 10 risks specific to MCP servers. Covers prompt injection, tool abuse, authorization flaws, and data exfiltration risks.'
		},
		{
			category: 'Secrets',
			name: '1Password Connect',
			url: 'https://developer.1password.com/docs/connect',
			desc: 'API for programmatic secrets access from 1Password vaults. Eliminates .env files — secrets are fetched at runtime, never stored in repositories.'
		},
		{
			category: 'Orchestration',
			name: 'LangGraph',
			url: 'https://github.com/langchain-ai/langgraph',
			desc: 'Graph-based framework for stateful, multi-step AI agent workflows. Supports cycles, conditional branching, and persistent state between execution steps.'
		},
		{
			category: 'Agent Framework',
			name: 'CrewAI',
			url: 'https://crewai.com',
			desc: 'Multi-agent orchestration where specialized AI agents collaborate as a crew to complete complex tasks with defined roles, goals, and shared tools.'
		},
		{
			category: 'Database',
			name: 'PostgreSQL + pgvector',
			url: 'https://github.com/pgvector/pgvector',
			desc: 'PostgreSQL extension adding vector similarity search. Enables hybrid relational and semantic search in one database — ideal for RAG and embedding workflows.'
		},
		{
			category: 'Containers',
			name: 'Chainguard Images',
			url: 'https://chainguard.dev',
			desc: 'Minimal, hardened container base images with near-zero CVEs. No shell, no package manager — drastically reduces attack surface for production workloads.'
		},
		{
			category: 'Containers',
			name: 'Docker Hardened Images',
			url: 'https://hub.docker.com/search?q=&type=image&image_filter=official',
			desc: 'Official Docker-maintained hardened images with reduced attack surface, no unnecessary packages, and regular security updates. Drop-in for standard bases.'
		},
		{
			category: 'AI Gateway',
			name: 'LiteLLM',
			url: 'https://litellm.ai',
			desc: 'Unified LLM API gateway supporting 100+ providers. Handles routing, load balancing, cost tracking, rate limiting, and budget enforcement for all model calls.'
		},
		{
			category: 'Observability',
			name: 'Arize Phoenix',
			url: 'https://phoenix.arize.com',
			desc: 'Open-source LLM observability platform for tracing, evaluating, and debugging AI apps. Captures every prompt, response, and token usage end-to-end.'
		},
		{
			category: 'Observability',
			name: 'OpenTelemetry',
			url: 'https://opentelemetry.io',
			desc: 'Vendor-neutral observability standard for generating, collecting, and exporting traces, metrics, and logs. OTEL SDK runs in every MCP server and agent.'
		},
		{
			category: 'Agent — Investigator',
			name: 'HolmesGPT',
			url: 'https://holmesgpt.dev',
			desc: 'AI-powered incident investigation agent. Analyzes alerts, runbooks, and logs to automatically diagnose and explain production incidents in plain language.'
		},
		{
			category: 'Agent — Coder',
			name: 'Claude Code CLI',
			url: 'https://docs.anthropic.com/en/docs/claude-code',
			desc: 'Command-line interface for the Claude Code agentic coding agent. Enables file editing, bash execution, Git management, and multi-step dev tasks from the terminal.'
		},
		{
			category: 'Agent — Reviewer',
			name: 'PR-Agent (Qodo)',
			url: 'https://github.com/qodo-ai/pr-agent',
			desc: 'AI-powered pull request reviewer that automatically analyzes code changes, flags issues, suggests improvements, and answers developer questions on PRs.'
		},
		{
			category: 'Agent — Security',
			name: 'Metis (Arm)',
			url: 'https://github.com/arm/metis',
			desc: 'AI security agent for CI/CD pipelines. Scans code changes for vulnerabilities, insecure patterns, and compliance violations during the build process.'
		},
		{
			category: 'Agent — CI Coder',
			name: 'GitLab Duo',
			url: 'https://about.gitlab.com/gitlab-duo',
			desc: "GitLab's integrated AI assistant for code generation, review, security scanning, and CI/CD optimization across the entire software development lifecycle."
		},
		{
			category: 'Agent — CI Coder',
			name: 'GitHub Copilot',
			url: 'https://github.com/features/copilot',
			desc: 'AI pair programmer that suggests code, generates tests, explains logic, and reviews pull requests directly in the IDE and on GitHub.'
		},
		{
			category: 'MCP — Orchestration',
			name: 'Prefect',
			url: 'https://prefect.io',
			desc: 'Python-based workflow orchestration for building, scheduling, and monitoring data pipelines and agentic workflows with built-in retries and observability.'
		},
		{
			category: 'MCP — Data',
			name: 'Databricks',
			url: 'https://databricks.com',
			desc: 'Unified data intelligence platform combining data engineering, ML, and analytics on Apache Spark. Integrates with AI workflows for large-scale data processing.'
		},
		{
			category: 'MCP — GitOps',
			name: 'ArgoCD MCP',
			url: 'https://argo-cd.readthedocs.io',
			desc: 'GitOps continuous delivery for Kubernetes. Synchronizes cluster state from Git repositories declaratively, with drift detection and automated reconciliation.'
		},
		{
			category: 'MCP — Infra',
			name: 'Kubernetes EKS/GKE',
			url: 'https://kubernetes.io',
			desc: 'Managed Kubernetes from AWS (EKS) and Google (GKE). Deploy, scale, and manage containerized workloads with enterprise SLAs and deep cloud integration.'
		}
	];

	function cellStyle(fill: string, isPS?: boolean): string {
		return [
			`background: ${isPS ? `${fill}28` : `${fill}18`}`,
			`border: ${isPS ? 2 : 1.5}px solid ${isPS ? `${fill}99` : `${fill}55`}`,
			...(isPS ? [`box-shadow: 0 0 12px ${fill}33`] : []),
			'border-radius: 12px',
			'padding: 14px 16px',
			'display: flex',
			'flex-direction: column',
			'gap: 8px'
		].join('; ');
	}

	function bandStyle(fill: string, isPS?: boolean): string {
		return [
			`background: ${isPS ? `${fill}28` : `${fill}18`}`,
			`border: ${isPS ? 2 : 1}px solid ${isPS ? `${fill}99` : `${fill}44`}`,
			...(isPS ? [`box-shadow: 0 0 8px ${fill}22`] : []),
			'border-radius: 8px',
			'padding: 10px 12px',
			'display: flex',
			'flex-direction: column',
			'gap: 6px'
		].join('; ');
	}

	const SECTION_HEADING =
		'font-size:10px; font-weight:700; color:#64748b; letter-spacing:2px; text-transform:uppercase; margin:0 0 14px';
</script>

<!-- ── Reusable snippets ─────────────────────────────────────── -->

{#snippet tagBadge(label: string, color: string)}
	<span
		style="display:inline-block; background:{color}22; border:1px solid {color}55; border-radius:4px; font-size:9.5px; padding:1px 6px; font-family:monospace; font-weight:700; color:{color}"
	>
		{label}
	</span>
{/snippet}

{#snippet numBadge(n: string, color: string)}
	<div
		style="width:30px; height:30px; border-radius:50%; border:2px solid {color}; background:{color}18; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; color:{color}; flex-shrink:0"
	>
		{n}
	</div>
{/snippet}

{#snippet psBadge()}
	<span
		style="display:inline-flex; align-items:center; gap:4px; background:linear-gradient(90deg,#7c3aed44,#4f46e544); border:1px solid #818cf8aa; color:#c4b5fd; font-size:8.5px; font-weight:800; text-transform:uppercase; letter-spacing:1px; padding:2px 8px; border-radius:9999px"
	>
		★ Personal Standard
	</span>
{/snippet}

{#snippet depBadge(type: DepType)}
	{@const s = DEP_STYLES[type]}
	<span
		style="display:inline-block; background:{s.bg}; border:1px solid {s.border}; color:{s.color}; font-size:8.5px; font-weight:700; padding:2px 8px; border-radius:9999px"
	>
		{s.label}
	</span>
{/snippet}

{#snippet divider(label: string)}
	<div style="display:flex; align-items:center; gap:12px; margin:20px 0 16px">
		<div style="flex:1; height:1px; background:rgba(255,255,255,0.07)"></div>
		<span
			style="font-size:9.5px; color:#475569; font-weight:700; letter-spacing:2px; text-transform:uppercase"
			>{label}</span
		>
		<div style="flex:1; height:1px; background:rgba(255,255,255,0.07)"></div>
	</div>
{/snippet}

{#snippet bandCell(p: BandCellProps)}
	<div style={bandStyle(p.fill, p.isPS)}>
		<div style="font-size:11.5px; font-weight:800; color:{p.badge}">{p.title}</div>
		{#if p.isPS}{@render psBadge()}{/if}
		{#if p.subtitle}<div style="font-size:10px; color:#94a3b8">{p.subtitle}</div>{/if}
		{#if p.bullets && p.bullets.length > 0}
			<ul style="margin:0; padding:0 0 0 12px; display:flex; flex-direction:column; gap:2px">
				{#each p.bullets as b}<li style="font-size:10px; color:#94a3b8; line-height:1.5">
						{b}
					</li>{/each}
			</ul>
		{/if}
		{#if p.tags && p.tags.length > 0}
			<div style="display:flex; flex-wrap:wrap; gap:3px">
				{#each p.tags as t}{@render tagBadge(t.label, t.color)}{/each}
			</div>
		{/if}
		{#if p.deps && p.deps.length > 0}
			<div style="display:flex; flex-wrap:wrap; gap:3px">
				{#each p.deps as d}{@render depBadge(d)}{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet cell(p: CellProps, children?: Snippet)}
	<div style={cellStyle(p.fill, p.isPS)}>
		<div style="display:flex; align-items:flex-start; gap:10px">
			{#if p.num}{@render numBadge(p.num, p.badge)}{/if}
			<div>
				<div style="font-size:13px; font-weight:800; color:{p.badge}; line-height:1.2">
					{p.title}
				</div>
				{#if p.subtitle}<div style="font-size:11px; color:#94a3b8; margin-top:2px">
						{p.subtitle}
					</div>{/if}
			</div>
		</div>
		{#if p.isPS}{@render psBadge()}{/if}
		{#if p.bullets && p.bullets.length > 0}
			<ul style="margin:0; padding:0 0 0 14px; display:flex; flex-direction:column; gap:3px">
				{#each p.bullets as b}<li style="font-size:11px; color:#94a3b8; line-height:1.5">
						{b}
					</li>{/each}
			</ul>
		{/if}
		{#if p.tags && p.tags.length > 0}
			<div style="display:flex; flex-wrap:wrap; gap:4px">
				{#each p.tags as t}{@render tagBadge(t.label, t.color)}{/each}
			</div>
		{/if}
		{#if p.deps && p.deps.length > 0}
			<div style="display:flex; flex-wrap:wrap; gap:4px">
				{#each p.deps as d}{@render depBadge(d)}{/each}
			</div>
		{/if}
		{#if children}{@render children()}{/if}
	</div>
{/snippet}

<!-- ── MCP Servers inner content ─────────────────────────────── -->
{#snippet mcpServersContent()}
	<div class="grid2" style="gap:8px; margin-top:4px">
		<div>
			{@render divider('Local')}
			<div style="display:flex; flex-direction:column; gap:6px">
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Filesystem MCP',
					subtitle: 'Read/write project files',
					deps: ['Local']
				})}
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Git MCP',
					subtitle: 'Branch, diff, commit, log',
					deps: ['Local']
				})}
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Docker MCP',
					subtitle: 'Container management',
					deps: ['Local']
				})}
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Postgres MCP',
					subtitle: 'Query + schema inspection',
					deps: ['Local']
				})}
			</div>
		</div>
		<div>
			{@render divider('Remote')}
			<div style="display:flex; flex-direction:column; gap:6px">
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Prefect MCP',
					subtitle: 'Workflow orchestration',
					deps: ['LocalRemote']
				})}
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Databricks MCP',
					subtitle: 'Data platform integration',
					deps: ['LocalRemote']
				})}
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'Kubernetes MCP',
					subtitle: 'EKS / GKE cluster ops',
					deps: ['LocalRemote']
				})}
				{@render bandCell({
					fill: PALETTE.col5a.fill,
					badge: PALETTE.col5a.badge,
					title: 'ArgoCD MCP',
					subtitle: 'GitOps deployment',
					deps: ['LocalRemote']
				})}
			</div>
		</div>
	</div>
{/snippet}

<!-- ── Agents inner content ──────────────────────────────────── -->
{#snippet agentsContent()}
	<div class="grid2" style="gap:8px; margin-top:4px">
		<div>
			{@render divider('Local')}
			<div style="display:flex; flex-direction:column; gap:6px">
				{@render bandCell({
					fill: PALETTE.col5b.fill,
					badge: PALETTE.col5b.badge,
					title: 'Claude Code CLI',
					subtitle: 'Agentic coder — primary dev agent',
					deps: ['Rules', 'Skills'],
					isPS: true
				})}
				{@render bandCell({
					fill: PALETTE.col5b.fill,
					badge: PALETTE.col5b.badge,
					title: 'HolmesGPT',
					subtitle: 'Incident investigator agent',
					deps: ['Local']
				})}
			</div>
		</div>
		<div>
			{@render divider('Remote / CI')}
			<div style="display:flex; flex-direction:column; gap:6px">
				{@render bandCell({
					fill: PALETTE.col5b.fill,
					badge: PALETTE.col5b.badge,
					title: 'PR-Agent (Qodo)',
					subtitle: 'Automated code review',
					deps: ['LocalRemote']
				})}
				{@render bandCell({
					fill: PALETTE.col5b.fill,
					badge: PALETTE.col5b.badge,
					title: 'GitLab Duo',
					subtitle: 'CI-integrated AI coder',
					deps: ['LocalRemote']
				})}
				{@render bandCell({
					fill: PALETTE.col5b.fill,
					badge: PALETTE.col5b.badge,
					title: 'GitHub Copilot',
					subtitle: 'IDE + PR AI assistance',
					deps: ['LocalRemote']
				})}
				{@render bandCell({
					fill: PALETTE.col5b.fill,
					badge: PALETTE.col5b.badge,
					title: 'Metis (Arm)',
					subtitle: 'Security agent for CI',
					deps: ['LocalRemote']
				})}
			</div>
		</div>
	</div>
{/snippet}

<!-- ════════════════════════════════════════════════════════════
     ROOT
═══════════════════════════════════════════════════════════════ -->
<div style="background:{PALETTE.bg}; min-height:100vh; font-family:{typography.fontSans}">
	<div style="padding:40px 18px 22px">
		<!-- Title Block -->
		<div style="margin-bottom:28px; text-align:center">
			<div
				style="font-size:9px; font-weight:700; color:#475569; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px"
			>
				DEVELOPED BY RAPHAEL MORAES<br />MODIFIED BY INDEST LABS
			</div>
			<h1 style="font-size:26px; font-weight:900; color:#f1f5f9; margin:0 0 6px; line-height:1.2">
				GenAI Technology Stack Setup Canvas
			</h1>
			<div style="font-size:12px; color:#94a3b8; margin-bottom:16px">
				Opinionated, layered AI-native engineering stack for Vibe Coders · v1.1
			</div>
			<!-- Legend -->
			<div style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px">
				{@render psBadge()}
				{#each Object.keys(DEP_STYLES) as k}{@render depBadge(k as DepType)}{/each}
			</div>
		</div>

		<!-- Architecture Overview -->
		<div
			style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:16px; margin-bottom:20px"
		>
			<div style={SECTION_HEADING}>Architecture Overview</div>
			<div class="grid4" style="gap:12px">
				{#each LAYERS as l}
					<div
						style="background:{l.color}10; border:1px solid {l.color}33; border-radius:8px; padding:12px 14px; display:flex; flex-direction:column; gap:8px"
					>
						<div style="display:flex; align-items:center; gap:8px">
							{@render numBadge(l.num, l.color)}
							<div style="font-size:12px; font-weight:800; color:{l.color}">{l.title}</div>
						</div>
						<div style="font-size:11px; color:#94a3b8; line-height:1.5">{l.desc}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- ── Layer 1: Client Layer ──────────────────────────────── -->
		<div style="margin-bottom:4px">
			<div style="{SECTION_HEADING}; color:{PALETTE.col1.badge}">Layer 1 — Client Layer</div>

			<!-- Row 1: 3 columns -->
			<div class="grid3" style="gap:12px; margin-bottom:12px">
				{@render cell({
					num: '1',
					fill: PALETTE.col1.fill,
					badge: PALETTE.col1.badge,
					title: 'AI Model Tool',
					subtitle: 'Claude Code (primary) + Claude Desktop',
					bullets: [
						'Claude Code: terminal-first agentic coding — runs bash, edits files, manages git',
						'Claude Desktop: conversational AI, file & image analysis, document processing',
						'Both use the same underlying model but serve different interaction patterns'
					],
					tags: [
						{ label: 'Claude Code', color: PALETTE.col1.badge },
						{ label: 'Claude Desktop', color: PALETTE.col1.badge }
					],
					deps: ['Rules', 'Skills'],
					isPS: true
				})}

				{@render cell({
					num: '2',
					fill: PALETTE.col2.fill,
					badge: PALETTE.col2.badge,
					title: 'IDE Setup',
					subtitle: 'VSCode',
					bullets: [
						'VSCode: primary editor with Claude Code integration',
						'Extensions: GitLens, Docker, YAML, REST Client, Thunder Client',
						'Settings: auto-save, format on save, linting integration'
					],
					tags: [
						{ label: 'VSCode', color: PALETTE.col2.badge },
						{ label: 'GitLens', color: PALETTE.col2.badge },
						{ label: 'Docker Ext', color: PALETTE.col2.badge }
					]
				})}

				{@render cell({
					num: '3',
					fill: PALETTE.col3.fill,
					badge: PALETTE.col3.badge,
					title: 'Configuration Layer',
					subtitle: 'Rules & Skills',
					bullets: [
						'CLAUDE.md: project rules, coding standards, tool permissions',
						'Skills: reusable slash-command workflows for common tasks',
						'MCP config: server list, tool permissions, resource access'
					],
					tags: [
						{ label: 'CLAUDE.md', color: PALETTE.col3.badge },
						{ label: 'Skills', color: PALETTE.col3.badge },
						{ label: 'MCP Config', color: PALETTE.col3.badge }
					],
					deps: ['Rules', 'Skills'],
					isPS: true
				})}
			</div>

			<!-- Row 2: MCP Servers + Agents -->
			<div class="grid2" style="gap:12px; margin-bottom:20px">
				{@render cell(
					{
						num: '4',
						fill: PALETTE.col5a.fill,
						badge: PALETTE.col5a.badge,
						title: 'MCP Servers',
						subtitle: 'Model Context Protocol — tool layer for Claude'
					},
					mcpServersContent
				)}
				{@render cell(
					{
						num: '5',
						fill: PALETTE.col5b.fill,
						badge: PALETTE.col5b.badge,
						title: 'Agents',
						subtitle: 'Specialized AI agents in the stack'
					},
					agentsContent
				)}
			</div>
		</div>

		<!-- ── Layer 2: Standards & Frameworks ───────────────────── -->
		<div style="margin-bottom:20px">
			<div style="{SECTION_HEADING}; color:{PALETTE.std.badge}">
				Layer 2 — Standards & Frameworks Layer
			</div>

			<!-- Row 1: 5 columns -->
			<div class="grid5" style="gap:12px; margin-bottom:12px">
				{@render cell({
					num: '6',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'MCP Server Standard',
					subtitle: 'FastMCP (Python)',
					bullets: [
						'FastMCP as the only MCP server framework',
						'Poetry for dependency management',
						'Pytest + coverage for all servers',
						'Typed inputs/outputs — no untyped tools'
					],
					tags: [
						{ label: 'FastMCP', color: PALETTE.std.badge },
						{ label: 'Poetry', color: PALETTE.std.badge },
						{ label: 'Pytest', color: PALETTE.std.badge }
					],
					isPS: true
				})}
				{@render cell({
					num: '7',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'Agent Standard',
					subtitle: 'LangGraph + CrewAI',
					bullets: [
						'LangGraph for stateful multi-step agent graphs',
						'CrewAI for multi-agent crew orchestration',
						'All agents emit OTEL traces'
					],
					tags: [
						{ label: 'LangGraph', color: PALETTE.std.badge },
						{ label: 'CrewAI', color: PALETTE.std.badge }
					],
					isPS: true
				})}
				{@render cell({
					num: '8',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'Code Quality Standard',
					subtitle: 'Linting + Security',
					bullets: [
						'Megalinter: unified linting for all languages',
						'Trivy: container + IaC vulnerability scanning',
						'Pre-commit hooks enforce before every push'
					],
					tags: [
						{ label: 'Megalinter', color: PALETTE.std.badge },
						{ label: 'Trivy', color: PALETTE.std.badge }
					],
					isPS: true
				})}
				{@render cell({
					num: '9',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'Security Standard',
					subtitle: 'OWASP MCP Top 10 + 1Password',
					bullets: [
						'OWASP MCP Top 10 as the security checklist for every MCP server',
						'1Password Connect for secrets — no .env files in repos',
						'Chainguard / Docker Hardened Images for containers'
					],
					tags: [
						{ label: 'OWASP MCP', color: PALETTE.std.badge },
						{ label: '1Password', color: PALETTE.std.badge },
						{ label: 'Chainguard', color: PALETTE.std.badge }
					],
					isPS: true
				})}
				{@render cell({
					num: '10',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'Data Standard',
					subtitle: 'PostgreSQL + pgvector',
					bullets: [
						'PostgreSQL as the standard relational + vector database',
						'pgvector for embedding storage and similarity search',
						'Databricks for large-scale data processing'
					],
					tags: [
						{ label: 'PostgreSQL', color: PALETTE.std.badge },
						{ label: 'pgvector', color: PALETTE.std.badge },
						{ label: 'Databricks', color: PALETTE.std.badge }
					],
					isPS: true
				})}
			</div>

			<!-- Row 2: Inputs + Outputs -->
			<div class="grid2" style="gap:12px">
				{@render cell({
					num: '11',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'Standard Inputs',
					subtitle: 'What every MCP server / agent accepts',
					bullets: [
						'Typed Pydantic models for all tool parameters',
						'JSON Schema validation at boundary',
						'Structured prompts with role + task + constraints',
						'Context injection via MCP resources (not raw file paths)'
					]
				})}
				{@render cell({
					num: '12',
					fill: PALETTE.std.fill,
					badge: PALETTE.std.badge,
					title: 'Standard Outputs',
					subtitle: 'What every MCP server / agent returns',
					bullets: [
						'Typed Pydantic response models',
						'Structured JSON — never raw string blobs',
						'OTEL span attached to every tool call',
						'Error objects with code + message + trace_id'
					]
				})}
			</div>
		</div>

		<!-- ── Layer 3: AI Gateway ────────────────────────────────── -->
		<div style="margin-bottom:20px">
			<div style="{SECTION_HEADING}; color:{PALETTE.gw.badge}">
				Layer 3 — AI Gateway Layer (LiteLLM)
			</div>
			<div
				style="background:{PALETTE.gw.fill}10; border:1.5px solid {PALETTE.gw
					.fill}55; border-radius:12px; padding:14px 16px"
			>
				<div class="grid5" style="gap:10px">
					{@render bandCell({
						fill: PALETTE.gw.fill,
						badge: PALETTE.gw.badge,
						title: 'LLM Router',
						subtitle: 'Route calls to any provider',
						bullets: [
							'Anthropic, OpenAI, Gemini, local Ollama',
							'Model fallbacks + load balancing',
							'Cost tracking per model'
						],
						isPS: true
					})}
					{@render bandCell({
						fill: PALETTE.gw.fill,
						badge: PALETTE.gw.badge,
						title: 'MCP Proxy',
						subtitle: 'Remote MCP over SSE',
						bullets: [
							'Expose local MCP servers remotely',
							'Auth + rate limiting',
							'Server-Sent Events transport'
						]
					})}
					{@render bandCell({
						fill: PALETTE.gw.fill,
						badge: PALETTE.gw.badge,
						title: 'Agent Endpoint',
						subtitle: 'Publish agents as APIs',
						bullets: [
							'LangGraph / CrewAI agents as REST endpoints',
							'OpenAI-compatible API surface',
							'Session management'
						]
					})}
					{@render bandCell({
						fill: PALETTE.gw.fill,
						badge: PALETTE.gw.badge,
						title: 'Budget Controls',
						subtitle: 'Cost + rate enforcement',
						bullets: ['Per-user / per-key spend limits', 'Token rate limits', 'Budget alerts'],
						isPS: true
					})}
					{@render bandCell({
						fill: PALETTE.gw.fill,
						badge: PALETTE.gw.badge,
						title: 'OTEL Export',
						subtitle: 'Traces to observability layer',
						bullets: [
							'All LLM calls emit OTEL spans',
							'Token usage as metrics',
							'Latency + error tracking'
						],
						isPS: true
					})}
				</div>
			</div>
		</div>

		<!-- ── Layer 4: Observability ─────────────────────────────── -->
		<div style="margin-bottom:20px">
			<div style="{SECTION_HEADING}; color:{PALETTE.obs.badge}">Layer 4 — Observability Layer</div>
			<div
				style="background:{PALETTE.obs.fill}10; border:1.5px solid {PALETTE.obs
					.fill}55; border-radius:12px; padding:14px 16px"
			>
				<div class="grid4" style="gap:10px">
					{@render bandCell({
						fill: PALETTE.obs.fill,
						badge: PALETTE.obs.badge,
						title: 'Arize Phoenix',
						subtitle: 'LLM tracing & evaluation',
						bullets: [
							'Trace every LLM call end-to-end',
							'Evaluate responses for quality + safety',
							'Dataset curation from traces'
						],
						isPS: true
					})}
					{@render bandCell({
						fill: PALETTE.obs.fill,
						badge: PALETTE.obs.badge,
						title: 'OpenTelemetry',
						subtitle: 'Universal trace/metric standard',
						bullets: [
							'OTEL SDK in every MCP server and agent',
							'Spans propagated across service boundaries',
							'Export to Phoenix + any OTLP backend'
						],
						isPS: true
					})}
					{@render bandCell({
						fill: PALETTE.obs.fill,
						badge: PALETTE.obs.badge,
						title: 'Metrics & Logs',
						subtitle: 'Structured observability',
						bullets: [
							'Prometheus-compatible metrics from LiteLLM',
							'Structured JSON logs (no raw print statements)',
							'Log correlation via trace_id'
						]
					})}
					{@render bandCell({
						fill: PALETTE.obs.fill,
						badge: PALETTE.obs.badge,
						title: 'Alerting',
						subtitle: 'Proactive incident detection',
						bullets: [
							'Cost spike alerts via LiteLLM budget controls',
							'Error rate thresholds in Phoenix',
							'HolmesGPT for AI-driven incident investigation'
						]
					})}
				</div>
			</div>
		</div>

		<!-- ── Tools Reference ────────────────────────────────────── -->
		<div
			style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.04); border-radius:12px; padding:16px; margin-bottom:20px; overflow:visible"
		>
			<div style={SECTION_HEADING}>Tools Reference</div>
			<div class="grid-tools">
				{#each TOOLS as t}
					<a
						href={t.url}
						target="_blank"
						rel="noopener noreferrer"
						class="tool-link"
						data-tooltip={t.desc}
					>
						<div class="tool-category">{t.category}</div>
						<div class="tool-name">{t.name}</div>
						<div class="tool-url">{t.url.replace('https://', '')}</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- Footer -->
		<div style="text-align:center; font-size:10px; color:#334155">
			Indest Labs · GenAI Engineering Standard v1.0 · 2026
		</div>
	</div>
</div>

<style>
	/* ── Responsive grid helpers ───────────────────────── */
	:global(.grid4) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	:global(.grid3) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	:global(.grid5) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
	:global(.grid2) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	/* ── Tools grid ────────────────────────────────────── */
	.grid-tools {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
		overflow: visible;
	}

	/* ── Tool card ─────────────────────────────────────── */
	.tool-link {
		position: relative;
		display: block;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 8px;
		padding: 8px 10px;
		text-decoration: none;
		transition: background 0.15s;
		min-width: 0;
	}

	.tool-link:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	.tool-category {
		font-size: 9px;
		color: #64748b;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 2px;
	}

	.tool-name {
		font-size: 11.5px;
		font-weight: 700;
		color: #c4b5fd;
		margin-bottom: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tool-url {
		font-size: 9.5px;
		color: #64748b;
		font-family: monospace;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ── Tooltip ───────────────────────────────────────── */
	.tool-link::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		width: 220px;
		padding: 8px 10px;
		background: #1e293b;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		color: #94a3b8;
		font-size: 11px;
		line-height: 1.5;
		font-family: Inter, system-ui, sans-serif;
		font-weight: 400;
		text-align: left;
		white-space: normal;
		word-wrap: break-word;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s;
		z-index: 100;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
	}

	.tool-link:hover::after {
		opacity: 1;
	}

	/* ── Responsive breakpoints ────────────────────────── */
	@media (max-width: 1024px) {
		:global(.grid5) {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.grid-tools {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 768px) {
		:global(.grid4) {
			grid-template-columns: 1fr 1fr;
		}
		:global(.grid3) {
			grid-template-columns: 1fr 1fr;
		}
		:global(.grid5) {
			grid-template-columns: 1fr 1fr;
		}
		:global(.grid2) {
			grid-template-columns: 1fr;
		}
		.grid-tools {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 480px) {
		:global(.grid4) {
			grid-template-columns: 1fr;
		}
		:global(.grid3) {
			grid-template-columns: 1fr;
		}
		:global(.grid5) {
			grid-template-columns: 1fr;
		}
		:global(.grid2) {
			grid-template-columns: 1fr;
		}
		.grid-tools {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 360px) {
		.grid-tools {
			grid-template-columns: 1fr;
		}
	}
</style>
