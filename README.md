# GenAI Technology Stack
## (based on the fantastic work of [Raphael Moraes](raphaelmoraes.dev) )

### [Website](https://.vercel.app/)

NOTE: Content of this website is not mine. Attribution is to Raphael Moraes. 

# Background

I did this experiment to learn about the tech stack and how to create a website with Claude Code from a specification file.

I leveraged Raph's work to understand how to
create a CLAUDE.md file and a repeatable AI-Prompt specification for a website to input into Claude Code.

Raph's work used the React framework and I transmorgified it to use Sveltekit. It worked. I also played around with adding some tooltips to the AI Tools section so it was easier to learn about all the tools Raph has in his genAI tech stack.

# My Process

First, I edited the CLAUDE.md file; see below.

Second, I chatted with Claude about how to create a prompt to get what I wanted. 

I then created a sveltekit project:

```
npx sv create agentic-canvas
```

(I selected the skeleton project and typescript)


Then I selected the agentic-canvas directory in Claude Code and I started prompting Claude as follows.

# Prompts for Claude Code

```
I have a SvelteKit project. I want to convert the agentic-canvas-react project to Sveltekit. I only want the ./agentic-canvas-react/pages/canvas.tsx to be ported to a single AgenticCanvas.svelte component first, then wire it into a SvelteKit route (+page.svelte). I only want one page so forget about the NavBar.tsx file. Otherwise use all of the specifications in the AI-PROMPT-BUILD-SPEC.md file and build the AgenticCanvas.svelte component modeled after canvas.tsx

For the Tools Reference, on hover, show a brief less than 100 word description of the underlying technology as a tooltip.

```

Here is my CLAUDE.md file:

# Claude Code Project Rules — llm-timeline

## Stack
- Sveltekit, TypeScript 5, Svelte


## Critical Rules
- Never delete `public/.nojekyll`
- Build with `pnpm build`
- Never add workflow files that also trigger on `push: main` (causes deployment races)

## Design System
- All design tokens live in `styles/tokens.ts` — never hardcode colors/sizes
- `colors.bgPage` (#0f172a) is the root background on ALL pages — no exceptions
- Use only sizes from `typography.scale`, spacing from `space.*`, radius from `radius.*`

## File Structure
- Page-specific styles: CSS Modules or inline styles with tokens only
- `styles/globals.css`: global reset ONLY (box-sizing + body margin)
- Local components stay in the page file — only shared components go in `components/`



