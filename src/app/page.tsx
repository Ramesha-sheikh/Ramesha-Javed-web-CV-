"use client";

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auto-download PDF when coming from QR code scan
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('download') === 'true') {
      // Wait for content to load, then trigger download
      setTimeout(() => {
        handleDownloadPDF();
        // Clean URL
        window.history.replaceState({}, '', '/');
      }, 1000);
    }
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-content');
    if (!element) return;

    try {
      // Hide QR before generating PDF
      setShowQR(false);
      setIsDownloading(true);

      // Wait for React to re-render with showQR=false
      await new Promise(resolve => setTimeout(resolve, 150));

      // Create a clone for PDF generation (hidden from user)
      const clone = element.cloneNode(true) as HTMLElement;

      // Remove QR code section completely from clone using section ID
      const qrSection = clone.querySelector('#qr-code-section');
      if (qrSection) {
        qrSection.remove();
      }

      // Apply PDF styles to clone (off-screen)
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '210mm';
      clone.style.maxWidth = '210mm';
      clone.style.padding = '15mm';
      clone.style.fontSize = '12px';
      clone.style.backgroundColor = '#ffffff';
      clone.classList.add('pdf-rendering');

      document.body.appendChild(clone);

      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 200));

      // Calculate proper height
      const actualHeight = clone.scrollHeight;

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: actualHeight,
        windowWidth: 794,
        windowHeight: actualHeight
      });

      // Remove clone immediately
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      // Open PDF in new tab
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const newWindow = window.open(pdfUrl, '_blank');

      if (!newWindow) {
        // If popup blocked, download directly
        pdf.save('Ramesha_Javed_CV.pdf');
        alert('Popup blocked! PDF downloaded instead.');
      }

      // Clean up
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);

      // Reset loading state
      setIsDownloading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Download Button - Fixed at top right */}
      <div id="download-btn-container" className="fixed top-4 right-4 z-50">
        <button
          id="download-btn"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2"
        >
          <span className="text-base">{isDownloading ? '⏳' : '📥'}</span>
          <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
        </button>
      </div>

      <div id="cv-content" className="max-w-4xl mx-auto bg-white px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-10">

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">RAMESHA JAVED</h1>
          <p className="text-base sm:text-lg md:text-xl text-teal-600 font-medium mb-4">
            Founder & CEO, VisionDX AI | AI-Native Full Stack Developer & Agentic Systems Engineer
          </p>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-700 mb-3">
            <span className="flex items-center gap-1">📍 Karachi, Pakistan</span>
            <span className="flex items-center gap-1">📞 +92 313-0384064</span>
            <span className="flex items-center gap-1">✉️ Rameshajaved1@gmail.com</span>
          </div>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs sm:text-sm text-teal-600 mb-4">
            <a href="https://www.linkedin.com/in/rameesha20" className="hover:underline flex items-center gap-1">
              <span>💼</span> <span className="hidden xs:inline">LinkedIn</span>
            </a>
            <a href="https://github.com/Ramesha-sheikh" className="hover:underline flex items-center gap-1">
              <span>🐙</span> <span className="hidden xs:inline">GitHub</span>
            </a>
            <a href="https://www.facebook.com/ramesha.javed.2025" className="hover:underline flex items-center gap-1">
              <span>📘</span> <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
          <div className="h-0.5 bg-teal-600"></div>
        </header>

        {/* Portfolio QR Code Section - Only for Web, Hidden in PDF */}
        <section id="qr-code-section" className="mb-6">
          <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-teal-600">Portfolio QR Code</h2>
            <button
              onClick={() => setShowQR(!showQR)}
              className={`font-medium py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                showQR
                  ? 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
                  : 'bg-white text-teal-600 border-teal-600 hover:bg-teal-50'
              }`}
            >
              {showQR ? '🔒 Hide' : '📱 Show QR'}
            </button>
          </div>

          {/* QR Code - Toggleable */}
          {showQR && (
            <div id="qr-code-container" className="flex justify-center p-4 sm:p-6 bg-gray-50 rounded-lg animate-fade-in">
              <div className="flex flex-col items-center">
                <QRCode
                  value="http://192.168.100.7:3007/?download=true"
                  size={120}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                  level="H"
                />
                <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center font-medium">Scan to Download CV</p>
              </div>
            </div>
          )}
        </section>

        {/* Profile */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">PROFILE</h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            AI-Native Full Stack Developer building production-grade autonomous agents using Spec-Kit, Gemini CLI, MCP
            servers, OpenAI SDK, and RAG systems. Expert in Next.js, TypeScript, Python, Node.js, Google Gemini, Hugging Face,
            and cloud-native deployment. Founder & CEO of VisionDX AI — AI-powered medical imaging startup (NIC Karachi registered).
            Built prototype for Governor Sindh IT Initiative (50K+ users).
            Deployed 25+ projects | 500+ community members.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-4">TECHNICAL SKILLS</h2>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Languages & Frameworks</h3>
            <p className="text-gray-800 text-sm">
              Python • TypeScript • JavaScript (ES6+)<br/>
              Next.js • Node.js • Tailwind CSS • Sanity CMS
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">AI-Native & Agentic Systems (Advanced)</h3>
            <p className="text-gray-800 text-sm">
              Spec-Kit Framework • Gemini CLI • MCP Server • Multi-Agent Orchestration • HITL Patterns<br/>
              OpenAI SDK (Assistants, Tools, File Search, Code Interpreter)<br/>
              Gemini API (1.5 Pro/Flash) • Google Cloud AI Studio<br/>
              OpenRouter (Claude 3.5, Grok) • Pydantic • Structured Outputs
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">RAG & Vector Databases</h3>
            <p className="text-gray-800 text-sm">
              Retrieval-Augmented Generation (RAG) • Vector Embeddings<br/>
              Qdrant • pgvector • Cohere • Semantic Search • Document Processing
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Backend & Cloud Technologies</h3>
            <p className="text-gray-800 text-sm">
              FastAPI • SQLModel • RESTful APIs • Firebase<br/>
              Gmail API • Twilio WhatsApp API • Hugging Face (Model Deployment) • Google Cloud Platform • Serverless Architecture
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Databases</h3>
            <p className="text-gray-800 text-sm">
              PostgreSQL • Neon PostgreSQL • Firebase Firestore • SQLite
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">DevOps / AI Deployment (Learning)</h3>
            <p className="text-gray-800 text-sm">
              Docker • Kubernetes (Minikube) • Helm Charts • Kafka • Dapr
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Auth & Documentation</h3>
            <p className="text-gray-800 text-sm">
              Better Auth • JWT • Docusaurus • GitHub Pages
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Tools & Deployment</h3>
            <p className="text-gray-800 text-sm">
              Vercel • Netlify • Git/GitHub • Figma (UI/UX)
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-4">PROFESSIONAL EXPERIENCE</h2>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="font-bold text-gray-900 text-base">Founder & CEO</h3>
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

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="font-bold text-gray-900 text-base">AI Developer & Cloud Engineer</h3>
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
          <h2 className="text-xl font-bold text-teal-600 mb-4">KEY PROJECTS & ACHIEVEMENTS</h2>

          <div className="space-y-3">
            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm">
                AI-Native Autonomous Agent Suite — <span className="font-normal text-gray-600">Spec-Kit + Gemini CLI + MCP Server</span>
              </h3>
              <p className="text-gray-800 text-sm">
                Production multi-agent system with real-time model routing (Gemini ↔ Claude ↔ Grok), persistent memory, file processing.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm">
                Governor Sindh IT Initiative Platform
              </h3>
              <p className="text-gray-800 text-sm">
                Full-stack Next.js + PostgreSQL prototype for 50,000+ student registrations.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm">
                E-Commerce Autonomous Chatbot & Dashboard
              </h3>
              <p className="text-gray-800 text-sm">
                Gemini-powered agent + real-time analytics using Next.js, Node.js, Sanity CMS.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm">
                VisionDX AI — Medical Image Analysis Startup <span className="font-normal text-gray-600">(Founder & CEO | NIC Karachi)</span>
              </h3>
              <p className="text-gray-800 text-sm">
                AI-powered diagnostic platform analyzing X-ray, MRI, CT scan, and 25+ medical imaging types. Registered startup bridging clinical expertise with intelligent AI-driven diagnostics.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-3">
              <h3 className="font-bold text-gray-900 text-sm">
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
          <h2 className="text-xl font-bold text-teal-600 mb-4">HACKATHON PARTICIPATIONS</h2>

          <div className="space-y-2 text-sm text-gray-800">
            <p>
              <strong>Hackathon I: Physical AI Textbook</strong> (Nov 2025) — Spec-driven AI book with RAG chatbot (Qdrant), Better Auth, Docusaurus + GitHub Pages.
            </p>

            <p>
              <strong>Hackathon II: Spec-Driven Todo & Microservices</strong> (Jan 2026) — Monolith → microservices: SQLModel + Neon DB + Docker + Kubernetes + Kafka + Dapr + OpenAI Agents SDK + MCP.
            </p>

            <p>
              <strong>Hackathon 0: Personal AI Employee</strong> (Jan–Feb 2026) — Autonomous FTE using Python Watchers, MCP servers, HITL patterns, and Obsidian automation.
            </p>

            <p>
              <strong>Hackathon 5: CRM Digital FTE Factory</strong> (Feb 2026) — 24/7 AI Customer Success employee built with Claude Code + OpenAI Agents SDK + FastAPI + PostgreSQL + pgvector + Kafka + Kubernetes + Gmail API + Twilio WhatsApp + MCP Server.
            </p>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-teal-600 mb-4">EDUCATION & CERTIFICATIONS</h2>

          <div className="space-y-2 text-sm text-gray-800">
            <p>
              <strong>Certified Agentic & Robotic AI Engineer</strong> — Presidential Initiative for Artificial Intelligence & Computing (PIAIC) | Quarter 4 (Ongoing)
            </p>
            <p>
              <strong>Full Stack + Agentic AI</strong> — Governor Sindh Initiative for Artificial Intelligence (GIAIC) (2026–Present)
            </p>
            <p>
              <strong>Spec-Kit Framework & MCP Server</strong> — Completed • In Progress (PIAIC Cloud, 2025)
            </p>
            <p>
              <strong>Python for Data Science & Agentic AI</strong> — PIAIC (Completed)
            </p>
            <p>
              <strong>Cloud Computing & Backend Development</strong> — Google Cloud, Hugging Face (Ongoing)
            </p>
          </div>

        </section>

        {/* References */}
        <section className="mb-6">
          <div className="border-t-2 border-gray-200 pt-4">
            <p className="text-center text-gray-600 text-sm font-medium italic">
              References available upon request
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
