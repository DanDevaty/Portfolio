/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Rocket, 
  BrainCircuit, 
  Database, 
  Zap, 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  MessageSquare,
  Lock,
  Hourglass,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-surface/80 backdrop-blur-xl py-4 shadow-2xl" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center font-headline">
        <div className="text-2xl font-bold tracking-tighter text-white">
          fast<span className="text-primary-container">mvp</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          {['Hero', 'Services', 'Work', 'Tech', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-on-surface-variant hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="bg-primary text-on-primary-container px-6 py-2 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(0,212,170,0.3)] transition-all scale-95 hover:scale-100 duration-200">
          Get in touch
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#49f4c8]" />
          <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Available for Q4 Projects</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          Daniel <span className="text-glow text-primary">Devátý</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-headline text-2xl md:text-3xl text-secondary-fixed mb-8 font-light italic"
        >
          AI MVP Developer
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light leading-relaxed mb-12"
        >
          Building fast MVPs & automation tools for small businesses. <br className="hidden md:block" />
          Delivered in <span className="text-white font-medium">days</span>, not weeks.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary-container rounded-xl font-bold text-lg hover:shadow-[0_0_25px_rgba(73,244,200,0.4)] transition-all duration-300">
            Start Your Project
          </button>
          <button className="w-full md:w-auto px-10 py-4 glass-panel border border-primary/20 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all duration-300">
            View My Work
          </button>
        </motion.div>
      </div>

      {/* Decorative Brackets */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[20rem] font-headline text-white/5 select-none pointer-events-none hidden lg:block">[</div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[20rem] font-headline text-white/5 select-none pointer-events-none hidden lg:block">]</div>
    </section>
  );
};

const Services = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const services = [
    {
      id: '01',
      title: 'Rapid MVPs',
      description: 'From idea to functional product in 14 days. Full-stack development with a surgical focus on your core value proposition and market fit.',
      icon: Rocket
    },
    {
      id: '02',
      title: 'AI Integration',
      description: 'Implementing state-of-the-art LLMs and custom automation flows to eliminate repetitive tasks and reduce manual workload by up to 80%.',
      icon: BrainCircuit
    },
    {
      id: '03',
      title: 'Data Systems',
      description: 'Architecting robust backends and specialized vector database models that handle complex data relationships and scale seamlessly.',
      icon: Database
    },
    {
      id: '04',
      title: 'Automation',
      description: 'Custom industrial-grade scripts and internal tools designed to bridge gaps in your tech stack and streamline operations into one cohesive flow.',
      icon: Zap
    }
  ];

  return (
    <section ref={targetRef} id="services" className="relative h-[300vh] bg-surface-container-low">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 absolute top-12 left-0 right-0 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                What I <span className="text-primary">Build</span>
              </h2>
              <p className="text-on-surface-variant max-w-xl text-base md:text-lg font-light">
                Tailored technical solutions designed to move the needle for your business in record time.
              </p>
            </div>
            <div className="hidden md:block font-label text-xs tracking-[0.3em] text-primary/40 uppercase mb-2">
              Scroll to explore
            </div>
          </div>
        </div>

        <motion.div style={{ x: springX }} className="flex gap-10 px-[10vw] pt-32">
          {services.map((service) => (
            <div 
              key={service.id}
              className="min-w-[75vw] md:min-w-[45vw] h-[50vh] md:h-[45vh] glass-panel border border-primary/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group hover:border-primary/40 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,212,170,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-start relative z-10">
                <service.icon className="w-12 h-12 md:w-16 md:h-16 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <span className="font-headline text-3xl md:text-5xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                  {service.id}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-xl font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* Final CTA Card */}
          <div className="min-w-[75vw] md:min-w-[45vw] h-[50vh] md:h-[45vh] bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center items-center text-center group hover:bg-primary/10 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.1),transparent)] group-hover:scale-150 transition-transform duration-1000" />
            <h3 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
              Ready to ship?
            </h3>
            <p className="text-on-surface-variant text-base md:text-lg mb-8 max-w-sm relative z-10">
              Let's turn your concept into a production-ready reality in record time.
            </p>
            <a href="#contact" className="bg-primary text-on-primary-container px-10 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(73,244,200,0.5)] hover:scale-105 transition-all relative z-10">
              Start Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8">
              Selected <span className="text-primary">Projects</span>
            </h2>
            <p className="text-on-surface-variant max-w-xl">
              A glimpse into recent engineering challenges and successful launches.
            </p>
          </div>
          <div className="font-label text-xs tracking-widest text-primary uppercase border-b border-primary/20 pb-2">
            Updated Nov 2024
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Project: FastBook */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-surface-container rounded-3xl overflow-hidden border border-outline-variant hover:border-primary/30 transition-all duration-500"
          >
            <div className="aspect-[16/10] bg-surface-container-high relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="FastBook Dashboard" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-8">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary/10 text-secondary-fixed text-[10px] font-label rounded-full uppercase tracking-tighter">Fintech</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-label rounded-full uppercase tracking-tighter">AI Automation</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-2">FastBook</h3>
              <p className="text-on-surface-variant mb-6 text-sm">
                Automated bookkeeping for digital nomads using OCR and GPT-4 processing.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary text-sm font-bold group/link">
                Case Study <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Placeholders */}
          <div className="flex flex-col gap-10">
            <div className="flex-1 glass-panel rounded-3xl border border-outline-variant flex flex-col items-center justify-center p-12 text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Lock className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
              <h4 className="font-headline text-xl font-bold text-white mb-2">Next Gen SaaS</h4>
              <p className="text-on-surface-variant text-sm">Confidential Project • Stealth Mode</p>
            </div>
            <div className="flex-1 glass-panel rounded-3xl border border-outline-variant flex flex-col items-center justify-center p-12 text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Hourglass className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
              <h4 className="font-headline text-xl font-bold text-white mb-2">Internal Tooling</h4>
              <p className="text-on-surface-variant text-sm">Launching Dec 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const stack = [
    {
      category: 'Languages',
      items: ['TypeScript', 'Python', 'Rust']
    },
    {
      category: 'Frameworks',
      items: ['Next.js', 'FastAPI', 'Node.js']
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'Pinecone (Vector)', 'Redis']
    },
    {
      category: 'Tools & AI',
      items: ['OpenAI / Anthropic', 'Docker', 'AWS / Vercel']
    }
  ];

  return (
    <section id="tech" className="py-24 bg-surface-container-low">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-center text-4xl font-bold text-white mb-16">
            The Technical <span className="text-primary">Arsenal</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stack.map((group) => (
              <div key={group.category} className="space-y-6">
                <h4 className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                  {group.category}
                </h4>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors group">
                      <span className="w-1 h-1 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto glass-panel border border-outline-variant rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-16 relative">
          {/* Decorative Glow */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          
          <div className="flex-1 space-y-8">
            <h2 className="font-headline text-4xl font-bold text-white leading-tight mb-6">
              Let's build something <span className="text-primary italic">exceptional</span>.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Ready to automate your workflow or launch your MVP? Drop a message and let's discuss how we can ship fast.
            </p>
            
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-on-surface">hello@danielddev.com</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-label uppercase text-xs tracking-widest">LinkedIn</a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-label uppercase text-xs tracking-widest">GitHub</a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-label uppercase text-xs tracking-widest">X / Twitter</a>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-2">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-xl py-4 px-6 text-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-2">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-xl py-4 px-6 text-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-2">Message</label>
                <textarea 
                  placeholder="Tell me about your vision..." 
                  rows={4}
                  className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-xl py-4 px-6 text-white transition-all resize-none"
                />
              </div>
              <button className="w-full py-4 bg-primary text-on-primary-container font-bold rounded-xl hover:shadow-[0_10px_20px_rgba(0,212,170,0.2)] hover:-translate-y-1 transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-surface w-full py-12 border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center font-label text-sm uppercase tracking-widest">
        <div className="text-lg font-black text-white mb-6 md:mb-0">
          fast<span className="text-primary">mvp</span>
        </div>
        <div className="text-on-surface-variant mb-6 md:mb-0">
          © 2024 Daniel Devátý. Built for Speed.
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-on-surface-variant hover:text-primary transition-all hover:-translate-y-1">LinkedIn</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-all hover:-translate-y-1">GitHub</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-all hover:-translate-y-1">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

import { Chatbot } from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <TechStack />
      <Contact />
      <Footer />
      <Chatbot />
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
