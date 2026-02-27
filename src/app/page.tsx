"use client";

import { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

export default function Home() {
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
    const downloadBtn = document.getElementById('download-btn-container');
    const qrCode = document.getElementById('qr-code-container');
    if (!element) return;

    try {
      // Show loading
      const button = document.getElementById('download-btn');
      if (button) button.textContent = 'Downloading...';

      // Hide download button and QR code from PDF
      if (downloadBtn) downloadBtn.style.display = 'none';
      if (qrCode) qrCode.style.display = 'none';

      // Save original styles
      const originalWidth = element.style.width;
      const originalMaxWidth = element.style.maxWidth;
      const originalPadding = element.style.padding;
      const originalFontSize = element.style.fontSize;

      // Add class to force fixed layout
      element.classList.add('pdf-rendering');

      // Force desktop/fixed width for PDF (A4 size simulation)
      element.style.width = '210mm';  // A4 width
      element.style.maxWidth = '210mm';
      element.style.padding = '20mm'; // Fixed padding
      element.style.fontSize = '12px'; // Base font size

      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,  // A4 width in pixels at 96 DPI (210mm)
        height: element.scrollHeight,
        windowWidth: 794,
        windowHeight: element.scrollHeight
      });

      // Restore original styles
      element.style.width = originalWidth;
      element.style.maxWidth = originalMaxWidth;
      element.style.padding = originalPadding;
      element.style.fontSize = originalFontSize;
      element.classList.remove('pdf-rendering');

      // Show download button and QR code again
      if (downloadBtn) downloadBtn.style.display = '';
      if (qrCode) qrCode.style.display = '';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Ramesha_Javed_CV.pdf');

      // Reset button text
      if (button) button.textContent = '📥 Download CV as PDF';
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Download Button - Fixed at top - Responsive */}
      <div id="download-btn-container" className="fixed top-2 right-2 md:top-4 md:right-4 z-50">
        <button
          id="download-btn"
          onClick={handleDownloadPDF}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-3 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-xs md:text-base"
        >
          📥 <span className="hidden sm:inline">Download CV as PDF</span><span className="sm:hidden">Download</span>
        </button>
      </div>

      <div id="cv-content" className="max-w-4xl mx-auto bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10">

        {/* Header */}
        <header className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 md:gap-6">
            {/* Left side - Contact Info */}
            <div className="flex-1 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1">RAMESHA JAVED</h1>
              <p className="text-base sm:text-lg md:text-xl text-teal-600 font-medium mb-2 md:mb-3">
                Founder & CEO, VisionDX AI | AI-Native Full Stack Developer & Agentic Systems Engineer
              </p>
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-700 mb-1">
                <span>📍 Karachi, Pakistan</span>
                <span>📞 +92 313-0384064</span>
                <span className="break-all">✉️ Rameshajaved1@gmail.com</span>
              </div>
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4 text-xs sm:text-sm text-blue-600 mb-3 md:mb-4">
                <span className="underline break-all">LinkedIn: www.linkedin.com/in/rameesha20</span>
                <span className="underline break-all">GitHub: https://github.com/Ramesha-sheikh</span>
                <span className="underline break-all hidden sm:inline">Facebook: https://www.facebook.com/ramesha.javed.2025</span>
              </div>
            </div>

            {/* Right side - QR Code */}
            <div id="qr-code-container" className="flex flex-col items-center bg-white p-2 md:p-3 rounded-lg border-2 border-teal-600 mx-auto md:mx-0">
              <QRCode
                value="http://192.168.100.7:3007/?download=true"
                size={100}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                level="H"
              />
              <p className="text-xs text-gray-600 mt-1 md:mt-2 text-center font-medium">Scan to Download CV</p>
            </div>
          </div>
          <div className="h-0.5 bg-teal-600 mt-3 md:mt-4"></div>
        </header>

        {/* Profile */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-2 md:mb-3">PROFILE</h2>
          <p className="text-gray-800 text-xs sm:text-sm leading-relaxed">
            AI-Native Full Stack Developer building production-grade autonomous agents using Spec-Kit, Gemini CLI, MCP
            servers, OpenAI SDK, and RAG systems. Expert in Next.js, TypeScript, Python, Node.js, Google Gemini, Hugging Face,
            and cloud-native deployment. Founder & CEO of VisionDX AI — AI-powered medical imaging startup (NIC Karachi registered).
            Built prototype for Governor Sindh IT Initiative (50K+ users).
            Deployed 25+ projects | 500+ community members.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-2 md:mb-3">TECHNICAL SKILLS</h2>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Languages & Frameworks</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              Python • TypeScript • JavaScript (ES6+)<br/>
              Next.js • Node.js • Tailwind CSS • Sanity CMS
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">AI-Native & Agentic Systems (Advanced)</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              Spec-Kit Framework • Gemini CLI • MCP Server • Multi-Agent Orchestration • HITL Patterns<br/>
              OpenAI SDK (Assistants, Tools, File Search, Code Interpreter)<br/>
              Gemini API (1.5 Pro/Flash) • Google Cloud AI Studio<br/>
              OpenRouter (Claude 3.5, Grok) • Pydantic • Structured Outputs
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">RAG & Vector Databases</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              Retrieval-Augmented Generation (RAG) • Vector Embeddings<br/>
              Qdrant • pgvector • Cohere • Semantic Search • Document Processing
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Backend & Cloud Technologies</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              FastAPI • SQLModel • RESTful APIs • Firebase<br/>
              Gmail API • Twilio WhatsApp API • Hugging Face (Model Deployment) • Google Cloud Platform • Serverless Architecture
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Databases</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              PostgreSQL • Neon PostgreSQL • Firebase Firestore • SQLite
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">DevOps / AI Deployment (Learning)</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              Docker • Kubernetes (Minikube) • Helm Charts • Kafka • Dapr
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Auth & Documentation</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              Better Auth • JWT • Docusaurus • GitHub Pages
            </p>
          </div>

          <div className="mb-2 md:mb-3">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Tools & Deployment</h3>
            <p className="text-gray-800 text-xs sm:text-sm">
              Vercel • Netlify • Git/GitHub • Figma (UI/UX)
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-2 md:mb-3">PROFESSIONAL EXPERIENCE</h2>

          <div className="mb-3 md:mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">Founder & CEO</h3>
              <span className="text-gray-700 text-xs sm:text-sm">2026 - Present</span>
            </div>
            <p className="text-teal-600 font-semibold text-xs sm:text-sm mb-2">VisionDX AI (Registered with NIC Karachi)</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800 text-xs sm:text-sm">
              <li>Founded AI-powered medical imaging startup for X-ray, MRI, CT scan analysis</li>
              <li>Built diagnostic system analyzing 25+ types of medical images with AI-driven reports</li>
              <li>Deployed production-grade AI vision models for clinical diagnostics</li>
              <li>Registered startup with National Incubation Center (NIC) Karachi</li>
              <li>Bridging medical expertise with intelligent AI-based diagnostics</li>
            </ul>
          </div>

          <div className="mb-2 md:mb-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">AI Developer & Cloud Engineer</h3>
              <span className="text-gray-700 text-xs sm:text-sm">2026 - Present</span>
            </div>
            <p className="text-teal-600 font-semibold text-xs sm:text-sm mb-2">Freelance / Self-Employed</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800 text-xs sm:text-sm">
              <li>Developed autonomous agents using Gemini CLI and MCP server implementations</li>
              <li>Integrated Hugging Face models for advanced NLP applications</li>
              <li>Implemented cloud-based solutions using Google Cloud Platform and serverless architecture</li>
              <li>Built production-grade AI systems with Spec-Kit framework and multi-agent orchestration</li>
              <li>Created RAG-based systems with vector databases for intelligent document processing and retrieval</li>
            </ul>
          </div>
        </section>

        {/* Key Projects & Achievements */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-2 md:mb-3">KEY PROJECTS & ACHIEVEMENTS</h2>

          <div className="space-y-3 md:space-y-4">
            <div className="border-l-2 md:border-l-4 border-teal-600 pl-2 md:pl-3">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                AI-Native Autonomous Agent Suite — <span className="font-normal text-gray-600">Spec-Kit + Gemini CLI + MCP Server</span>
              </h3>
              <p className="text-gray-800 text-xs sm:text-sm">
                Production multi-agent system with real-time model routing (Gemini ↔ Claude ↔ Grok), persistent memory, file processing.
              </p>
            </div>

            <div className="border-l-2 md:border-l-4 border-teal-600 pl-2 md:pl-3">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                Governor Sindh IT Initiative Platform
              </h3>
              <p className="text-gray-800 text-xs sm:text-sm">
                Full-stack Next.js + PostgreSQL prototype for 50,000+ student registrations.
              </p>
            </div>

            <div className="border-l-2 md:border-l-4 border-teal-600 pl-2 md:pl-3">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                E-Commerce Autonomous Chatbot & Dashboard
              </h3>
              <p className="text-gray-800 text-xs sm:text-sm">
                Gemini-powered agent + real-time analytics using Next.js, Node.js, Sanity CMS.
              </p>
            </div>

            <div className="border-l-2 md:border-l-4 border-teal-600 pl-2 md:pl-3">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                VisionDX AI — Medical Image Analysis Startup <span className="font-normal text-gray-600">(Founder & CEO | NIC Karachi)</span>
              </h3>
              <p className="text-gray-800 text-xs sm:text-sm">
                AI-powered diagnostic platform analyzing X-ray, MRI, CT scan, and 25+ medical imaging types. Registered startup bridging clinical expertise with intelligent AI-driven diagnostics.
              </p>
            </div>

            <div className="border-l-2 md:border-l-4 border-teal-600 pl-2 md:pl-3">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                Physical AI Textbook with RAG Chatbot
              </h3>
              <p className="text-gray-800 text-xs sm:text-sm">
                Spec-Kit generated book with Qdrant-backed RAG chatbot, Better Auth, deployed via Docusaurus on GitHub Pages.
              </p>
            </div>
          </div>
        </section>

        {/* Hackathon Participations */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-2 md:mb-3">HACKATHON PARTICIPATIONS</h2>

          <div className="space-y-2 md:space-y-3">
            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Hackathon I: Physical AI Textbook</strong> (Nov 2025) — Spec-driven AI book with RAG chatbot (Qdrant), Better Auth, Docusaurus + GitHub Pages.
            </p>

            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Hackathon II: Spec-Driven Todo & Microservices</strong> (Jan 2026) — Monolith → microservices: SQLModel + Neon DB + Docker + Kubernetes + Kafka + Dapr + OpenAI Agents SDK + MCP.
            </p>

            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Hackathon 0: Personal AI Employee</strong> (Jan–Feb 2026) — Autonomous FTE using Python Watchers, MCP servers, HITL patterns, and Obsidian automation.
            </p>

            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Hackathon 5: CRM Digital FTE Factory</strong> (Feb 2026) — 24/7 AI Customer Success employee built with Claude Code + OpenAI Agents SDK + FastAPI + PostgreSQL + pgvector + Kafka + Kubernetes + Gmail API + Twilio WhatsApp + MCP Server.
            </p>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-2 md:mb-3">EDUCATION & CERTIFICATIONS</h2>

          <div className="space-y-2">
            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Certified Agentic & Robotic AI Engineer</strong> — Presidential Initiative for Artificial Intelligence & Computing (PIAIC) | Quarter 4 (Ongoing)
            </p>
            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Full Stack + Agentic AI</strong> — Governor Sindh Initiative for Artificial Intelligence (GIAIC) (2026–Present)
            </p>
            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Spec-Kit Framework & MCP Server</strong> — Completed • In Progress (PIAIC Cloud, 2025)
            </p>
            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Python for Data Science & Agentic AI</strong> — PIAIC (Completed)
            </p>
            <p className="text-gray-800 text-xs sm:text-sm">
              <strong>Cloud Computing & Backend Development</strong> — Google Cloud, Hugging Face (Ongoing)
            </p>
          </div>

          <p className="text-center text-gray-500 text-xs mt-4 md:mt-6 italic">
            References available upon request
          </p>
        </section>

      </div>
    </div>
  );
}
