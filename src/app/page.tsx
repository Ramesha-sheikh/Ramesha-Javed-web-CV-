export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto bg-white px-12 py-10">

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-1">RAMESHA JAVED</h1>
          <p className="text-xl text-teal-600 font-medium mb-3">
            Founder & CEO, VisionDX AI | AI-Native Full Stack Developer & Agentic Systems Engineer
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 mb-1">
            <span>📍 Karachi, Pakistan</span>
            <span>📞 +92 313-0384064</span>
            <span>✉️ Rameshajaved1@gmail.com</span>
          </div>
          <div className="flex flex-wrap gap-x-4 text-sm text-blue-600 mb-4">
            <span className="underline">LinkedIn: www.linkedin.com/in/rameesha20</span>
            <span className="underline">GitHub: https://github.com/Ramesha-sheikh</span>
            <span className="underline">Facebook: https://www.facebook.com/ramesha.javed.2025</span>
          </div>
          <div className="h-0.5 bg-teal-600"></div>
        </header>

        {/* Profile */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">PROFILE</h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            AI-Native Full Stack Developer building production-grade autonomous agents using Spec-Kit, Gemini CLI, MCP
            servers, OpenAI SDK, and RAG systems. Expert in Next.js, TypeScript, Python, Node.js, Google Gemini, Hugging Face,
            and cloud-native deployment. Licensed Homeopathic Doctor bridging medical expertise with AI-driven health-tech.
            Founder & CEO of VisionDX AI — AI-powered medical imaging startup (NIC Karachi registered).
            Built prototype for Governor Sindh IT Initiative (50K+ users).
            Deployed 25+ projects | 500+ community members.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">TECHNICAL SKILLS</h2>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Languages & Frameworks</h3>
            <p className="text-gray-800 text-sm">
              Python • TypeScript • JavaScript (ES6+)<br/>
              Next.js • Node.js • Tailwind CSS • Sanity CMS
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">AI-Native & Agentic Systems (Advanced)</h3>
            <p className="text-gray-800 text-sm">
              Spec-Kit Framework • Gemini CLI • MCP Server • Multi-Agent Orchestration • HITL Patterns<br/>
              OpenAI SDK (Assistants, Tools, File Search, Code Interpreter)<br/>
              Gemini API (1.5 Pro/Flash) • Google Cloud AI Studio<br/>
              OpenRouter (Claude 3.5, Grok) • Pydantic • Structured Outputs
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">RAG & Vector Databases</h3>
            <p className="text-gray-800 text-sm">
              Retrieval-Augmented Generation (RAG) • Vector Embeddings<br/>
              Qdrant • pgvector • Cohere • Semantic Search • Document Processing
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Backend & Cloud Technologies</h3>
            <p className="text-gray-800 text-sm">
              FastAPI • SQLModel • RESTful APIs • Firebase<br/>
              Gmail API • Twilio WhatsApp API • Hugging Face (Model Deployment) • Google Cloud Platform • Serverless Architecture
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Databases</h3>
            <p className="text-gray-800 text-sm">
              PostgreSQL • Neon PostgreSQL • Firebase Firestore • SQLite
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">DevOps / AI Deployment (Learning)</h3>
            <p className="text-gray-800 text-sm">
              Docker • Kubernetes (Minikube) • Helm Charts • Kafka • Dapr
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Auth & Documentation</h3>
            <p className="text-gray-800 text-sm">
              Better Auth • JWT • Docusaurus • GitHub Pages
            </p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Tools & Deployment</h3>
            <p className="text-gray-800 text-sm">
              Vercel • Netlify • Git/GitHub • Figma (UI/UX)
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">PROFESSIONAL EXPERIENCE</h2>

          <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-bold text-gray-900">Founder & CEO</h3>
              <span className="text-gray-700 text-sm">2026 - Present</span>
            </div>
            <p className="text-teal-600 font-semibold text-sm mb-2">VisionDX AI (Registered with NIC Karachi)</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm">
              <li>Founded AI-powered medical imaging startup for X-ray, MRI, CT scan analysis</li>
              <li>Built diagnostic system analyzing 25+ types of medical images with AI-driven reports</li>
              <li>Deployed production-grade AI vision models for clinical diagnostics</li>
              <li>Registered startup with National Incubation Center (NIC) Karachi</li>
              <li>Bridging medical expertise with intelligent AI-based diagnostics</li>
            </ul>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-bold text-gray-900">AI Developer & Cloud Engineer</h3>
              <span className="text-gray-700 text-sm">2026 - Present</span>
            </div>
            <p className="text-teal-600 font-semibold text-sm mb-2">Freelance / Self-Employed</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm">
              <li>Developed autonomous agents using Gemini CLI and MCP server implementations</li>
              <li>Integrated Hugging Face models for advanced NLP applications</li>
              <li>Implemented cloud-based solutions using Google Cloud Platform and serverless architecture</li>
              <li>Built production-grade AI systems with Spec-Kit framework and multi-agent orchestration</li>
              <li>Created RAG-based systems with vector databases for intelligent document processing and retrieval</li>
            </ul>
          </div>
        </section>

        {/* Key Projects & Achievements */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">KEY PROJECTS & ACHIEVEMENTS</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                AI-Native Autonomous Agent Suite — <span className="font-normal text-gray-600">Spec-Kit + Gemini CLI + MCP Server</span>
              </h3>
              <p className="text-gray-800 text-sm">
                Production multi-agent system with real-time model routing (Gemini ↔ Claude ↔ Grok), persistent memory, file processing.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Governor Sindh IT Initiative Platform
              </h3>
              <p className="text-gray-800 text-sm">
                Full-stack Next.js + PostgreSQL prototype for 50,000+ student registrations.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                E-Commerce Autonomous Chatbot & Dashboard
              </h3>
              <p className="text-gray-800 text-sm">
                Gemini-powered agent + real-time analytics using Next.js, Node.js, Sanity CMS.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                VisionDX AI — Medical Image Analysis Startup <span className="font-normal text-gray-600">(Founder & CEO | NIC Karachi)</span>
              </h3>
              <p className="text-gray-800 text-sm">
                AI-powered diagnostic platform analyzing X-ray, MRI, CT scan, and 25+ medical imaging types. Registered startup bridging clinical expertise with intelligent AI-driven diagnostics.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Physical AI Textbook with RAG Chatbot
              </h3>
              <p className="text-gray-800 text-sm">
                Spec-Kit generated book with Qdrant-backed RAG chatbot, Better Auth, deployed via Docusaurus on GitHub Pages.
              </p>
            </div>
          </div>
        </section>

        {/* Hackathon Participations */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">HACKATHON PARTICIPATIONS</h2>

          <div className="space-y-3">
            <p className="text-gray-800 text-sm">
              <strong>Hackathon I: Physical AI Textbook</strong> (Nov 2025) — Spec-driven AI book with RAG chatbot (Qdrant), Better Auth, Docusaurus + GitHub Pages.
            </p>

            <p className="text-gray-800 text-sm">
              <strong>Hackathon II: Spec-Driven Todo & Microservices</strong> (Jan 2026) — Monolith → microservices: SQLModel + Neon DB + Docker + Kubernetes + Kafka + Dapr + OpenAI Agents SDK + MCP.
            </p>

            <p className="text-gray-800 text-sm">
              <strong>Hackathon 0: Personal AI Employee</strong> (Jan–Feb 2026) — Autonomous FTE using Python Watchers, MCP servers, HITL patterns, and Obsidian automation.
            </p>

            <p className="text-gray-800 text-sm">
              <strong>Hackathon 5: CRM Digital FTE Factory</strong> (Feb 2026) — 24/7 AI Customer Success employee built with Claude Code + OpenAI Agents SDK + FastAPI + PostgreSQL + pgvector + Kafka + Kubernetes + Gmail API + Twilio WhatsApp + MCP Server.
            </p>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">EDUCATION & CERTIFICATIONS</h2>

          <div className="space-y-2">
            <p className="text-gray-800 text-sm">
              <strong>Certified Agentic & Robotic AI Engineer</strong> — Presidential Initiative for Artificial Intelligence & Computing (PIAIC) | Quarter 4 (Ongoing)
            </p>
            <p className="text-gray-800 text-sm">
              <strong>Full Stack + Agentic AI</strong> — Governor Sindh Initiative for Artificial Intelligence (GIAIC) (2026–Present)
            </p>
            <p className="text-gray-800 text-sm">
              <strong>Spec-Kit Framework & MCP Server</strong> — Completed • In Progress (PIAIC Cloud, 2025)
            </p>
            <p className="text-gray-800 text-sm">
              <strong>Python for Data Science & Agentic AI</strong> — PIAIC (Completed)
            </p>
            <p className="text-gray-800 text-sm">
              <strong>Cloud Computing & Backend Development</strong> — Google Cloud, Hugging Face (Ongoing)
            </p>
            <p className="text-gray-800 text-sm">
              <strong>Diploma in Homeopathic Medical Science (DHMS)</strong> — Central Homeopathic College, Karachi (2015–2019)
            </p>
          </div>

          <p className="text-center text-gray-500 text-xs mt-6 italic">
            References available upon request
          </p>
        </section>

      </div>
    </div>
  );
}
