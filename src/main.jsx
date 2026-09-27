import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import {
  Github,
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  Code2,
  Workflow,
  Palette
} from 'lucide-react';
import './styles.css';

const GH = 'https://github.com/moztechit';
const EMAIL = 'mailto:mosegm623@gmail.com';

const projects = [
  {
    title: 'AI Color Mixing Engine',
    tag: 'AI / Creative Automation',
    desc: 'A reusable color-combination and prompt workflow for consistent short-form AI video production.',
    url: `${GH}/ai-color-mixing-engine`,
    icon: Palette
  },
  {
    title: '3D Interactive Portfolio',
    tag: 'React / Three.js',
    desc: 'This portfolio: a responsive, interactive 3D experience combining technical work, AI experiments and customer-focused product thinking.',
    url: `${GH}/moses-ai-3d-portfolio`,
    icon: Code2
  },
  {
    title: 'AI Video Workflow Lab',
    tag: 'AI / Workflow Design',
    desc: 'A structured workspace concept for turning ideas into repeatable video-production steps, prompts and deliverables.',
    url: `${GH}/ai-video-workflow-lab`,
    icon: Workflow
  }
];

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
  'purple',
  'orange',
  'white',
  'black'
];

const mix = {
  'red-blue': 'purple',
  'red-yellow': 'orange',
  'blue-yellow': 'green',
  'red-white': 'pink',
  'blue-white': 'light blue',
  'yellow-white': 'cream',
  'red-black': 'deep red',
  'blue-black': 'navy',
  'yellow-black': 'olive',
  'green-blue': 'teal',
  'green-yellow': 'lime',
  'purple-white': 'lavender',
  'purple-yellow': 'golden yellow',
  'orange-blue': 'brown'
};

function Orb() {
  const r = React.useRef();

  useFrame((s, d) => {
    if (r.current) {
      r.current.rotation.x += d * 0.18;
      r.current.rotation.y += d * 0.28;
    }
  });

  return (
    <mesh ref={r}>
      <icosahedronGeometry args={[1.65, 5]} />
      <meshStandardMaterial
        color="#8b5cf6"
        roughness={0.2}
        metalness={0.75}
        wireframe={false}
      />
    </mesh>
  );
}

function OrbitParticles() {
  const ref = React.useRef();

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.18;
      ref.current.rotation.x =
        Math.sin(s.clock.elapsedTime * 0.35) * 0.18;
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 28 }).map((_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const radius = 2.15 + (i % 3) * 0.12;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.35,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry
              args={[0.035 + (i % 3) * 0.008, 8, 8]}
            />
            <meshBasicMaterial color="#c4b5fd" />
          </mesh>
        );
      })}
    </group>
  );
}

function App() {
  const [a, setA] = useState('red');
  const [b, setB] = useState('blue');
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () =>
      mix[`${a}-${b}`] ||
      mix[`${b}-${a}`] ||
      'custom blend',
    [a, b]
  );

  const prompt = `Create a polished short-form AI video of the established African studio character mixing ${a} and ${b} paint to reveal ${result}. Keep the character, wardrobe, camera, lighting, bowls and studio consistent across the shot.`;

  async function copy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1400);
  }

  return (
    <div className="app">

      <nav>
        <a className="logo" href="#top">
          MOSES<span>.MWANGI</span>
        </a>

        <div className="navlinks">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#lab">Lab</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="talk" href={EMAIL}>
          Let's talk <ArrowUpRight size={15} />
        </a>
      </nav>

      <main id="top">

        <section className="hero">

          <div className="heroText">
            <p className="eyebrow">
              IT TECHNICIAN · WEB DEVELOPER · AI BUILDER
            </p>

            <h1>
              Technology,
              <br />
              <em>made useful.</em>
            </h1>

            <p className="lead">
              I build practical digital experiences with AI,
              automation, modern web technologies and interactive 3D.
            </p>

            <div className="actions">
              <a className="primary" href="#work">
                Explore my work <ArrowUpRight size={17} />
              </a>

              <a
                className="secondary"
                href={GH}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Github size={17} />
              </a>
            </div>
          </div>

          <div className="orb">
            <Canvas camera={{ position: [0, 0, 5] }}>

              <ambientLight intensity={0.45} />

              <pointLight
                position={[3, 2, 4]}
                intensity={25}
                color="#a78bfa"
              />

              <pointLight
                position={[-3, -2, 2]}
                intensity={10}
                color="#22d3ee"
              />

              {/* Distant background stars */}
              <Stars
                radius={10}
                depth={4}
                count={500}
                factor={2}
                fade
              />

              {/* Main rotating orb */}
              <Orb />

              {/* Small particles orbiting the orb */}
              <OrbitParticles />

              {/* Mouse interaction */}
              <OrbitControls enableZoom={false} />

            </Canvas>
          </div>

        </section>

        <section className="stats">
          <div>
            <b>19+</b>
            <span>YEARS TECH</span>
          </div>

          <div>
            <b>AI</b>
            <span>HANDS-ON</span>
          </div>

          <div>
            <b>WEB</b>
            <span>BUILDING</span>
          </div>

          <div>
            <b>REMOTE</b>
            <span>READY</span>
          </div>
        </section>

        <section id="about" className="section">

          <div className="kicker">
            01 / ABOUT
          </div>

          <div className="two">

            <h2>
              From fixing systems
              <br />
              to <em>building systems.</em>
            </h2>

            <p>
              My background spans computer maintenance, networking,
              technical support and user assistance. Today I combine
              that practical foundation with React, JavaScript,
              Three.js and AI-assisted workflows to create useful
              digital products.
            </p>

          </div>

        </section>

        <section id="work" className="section">

          <div className="kicker">
            02 / SELECTED WORK
          </div>

          <div className="cards">

            {projects.map((p, i) => {
              const I = p.icon;

              return (
                <motion.article
                  className="card"
                  whileHover={{ y: -6 }}
                  key={p.title}
                >

                  <div className="num">
                    0{i + 1}
                  </div>

                  <I size={25} />

                  <p className="tag">
                    {p.tag}
                  </p>

                  <h3>
                    {p.title}
                  </h3>

                  <p>
                    {p.desc}
                  </p>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project <ArrowUpRight size={16} />
                  </a>

                </motion.article>
              );
            })}

          </div>

        </section>

        <section id="lab" className="section lab">

          <div className="kicker">
            03 / INTERACTIVE LAB
          </div>

          <div className="two">

            <div>
              <h2>
                Color Mix
                <br />
                <em>Prompt Lab.</em>
              </h2>

              <p>
                Choose two colors. The prototype returns a structured
                result and a reusable AI-video prompt.
              </p>
            </div>

            <div className="panel">

              <div className="selects">

                <label>
                  COLOR 01

                  <select
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                  >
                    {colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                </label>

                <label>
                  COLOR 02

                  <select
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                  >
                    {colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                </label>

              </div>

              <div className="result">
                <small>RESULT</small>
                <strong>{result}</strong>
              </div>

              <div className="prompt">
                {prompt}
              </div>

              <button onClick={copy}>
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy prompt
                  </>
                )}
              </button>

            </div>

          </div>

        </section>

        <section id="contact" className="contact">

          <p className="kicker">
            04 / CONTACT
          </p>

          <h2>
            Let's build something
            <br />
            <em>useful.</em>
          </h2>

          <div className="contactlinks">

            <a href={EMAIL}>
              <Mail />
              mosegm623@gmail.com
            </a>

            <a
              href={GH}
              target="_blank"
              rel="noreferrer"
            >
              <Github />
              github.com/moztechit
            </a>

          </div>

        </section>

      </main>

      <footer>
        © 2026 Moses Mwangi · Built with React + Three.js
      </footer>

    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);
