import React, { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import {
  Phone,
  Mail,
  Globe,
  Download,
  Sparkles,
  Shirt,
  Star,
  Wand2,
  Layers,
  ChevronDown,
  ArrowUpRight,
  Search,
  Smartphone,
  CheckCircle2,
  Quote,
} from "lucide-react";

const APP_URL = "https://play.google.com/store/apps/details?id=com.bradwear.app";
const APP_ICON =
  "https://play-lh.googleusercontent.com/VzuVjhFiWC93aAOR0Wc3gSqzxcSk0tJvIylhq-UXIRnPT-fSb9zTcU8Yf36m3yJ1t3syy7XyGiWMYjvmGrLdmw=w240-h480-rw";

const SCREENSHOTS = [
  "https://play-lh.googleusercontent.com/OhF_2GmhSHe4PF5xcUnK6Fc6RKKUIQmWsEuM1SN3Omb2nNI0GJXiVLu0vTJLEI88zN6veqHXTWjXqJPFh-ef=w526-h296-rw",
  "https://play-lh.googleusercontent.com/Pc7ZsQaB70Ic0mPHzLvnPhWMy3avaJlbgvVuj_Lz2Dx14X_RprPtA5X4-LcVbVzNGHAGfMOoOvQ13vOkQhhMSA=w526-h296-rw",
  "https://play-lh.googleusercontent.com/IH9agBlv5QKWxi68PVtvqRytafKCMjv2K2kNxYZm3BQ7zbb9SIwf3ZooZr7mhK3EvI6zeERtDYJbwJjIHLrH=w526-h296-rw",
  "https://play-lh.googleusercontent.com/QOZPUFDQHIC9lMTa7ETFDDPHZd-S1NJRVOIhB6gvS_2YzgeP35svBrjGSe2sRhDzaaBW0KovqUU7oFK2DGMi=w526-h296-rw",
  "https://play-lh.googleusercontent.com/Ry5ejWcR1KfUs85IXdVl93zsIdg5WFxjJr3gi1xXnkXPrAqj0RVhWp8iUUW3o8kF4SD8XarixrZjjYGictHp=w526-h296-rw",
  "https://play-lh.googleusercontent.com/wZ2dYP9Dy_mT8N8-gO_iCcsCW1pqLZKBKzSzNTeoqG4m2jNv626scUTtY8ijXCTw59br4zEzX5qHfOv1E0AN=w526-h296-rw",
  "https://play-lh.googleusercontent.com/pRwu0N9gGjyh-zh0KF7ttS79SziGLPuoHrT6ZG72Vbrb4DM_8ozFdtcnElNDCx9RVjporfvwRuFHJ6gr05KdCJE=w526-h296-rw",
  "https://play-lh.googleusercontent.com/x83anV6boUW0muCJpc1pEzOFKQ9hk4nv_mPITh5u9SIpCqvKkVzaouqakHypactkFV5iOfFeiN3rCpKBq5QsCw=w526-h296-rw",
];

/* ======================== 3D PHONE ======================== */
function Phone3D({ screenTex }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.35;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.08;
  });

  return (
    <group ref={group} scale={1.3}>
      {/* Phone body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.55, 3.1, 0.2]} />
        <meshPhysicalMaterial
          color="#1f1f22"
          metalness={0.85}
          roughness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.25}
        />
      </mesh>
      {/* Edge bevel ring */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 3.15, 0.12]} />
        <meshStandardMaterial color="#3a3a3f" metalness={1} roughness={0.25} />
      </mesh>
      {/* Screen black mat */}
      <mesh position={[0, 0, 0.103]}>
        <planeGeometry args={[1.46, 3.0]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* Screen image */}
      {screenTex && (
        <mesh position={[0, 0, 0.104]}>
          <planeGeometry args={[1.4, 2.95]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
      )}
      {/* Side accent bar */}
      <mesh position={[0.79, 0.6, 0]}>
        <boxGeometry args={[0.04, 0.5, 0.2]} />
        <meshStandardMaterial color="#22FF66" emissive="#22FF66" emissiveIntensity={1.2} />
      </mesh>
      {/* Camera bump */}
      <mesh position={[-0.5, 1.18, -0.12]}>
        <cylinderGeometry args={[0.14, 0.14, 0.06, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.5, 1.18, -0.155]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 32]} />
        <meshStandardMaterial color="#22FF66" emissive="#22FF66" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function HeroCanvas() {
  const [tex, setTex] = React.useState(null);
  React.useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      SCREENSHOTS[0],
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        setTex(t);
      },
      undefined,
      () => setTex(null)
    );
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      data-testid="hero-3d-canvas"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
      <spotLight position={[5, 6, 5]} angle={0.5} penumbra={1} intensity={2.6} color="#ffffff" castShadow />
      <spotLight position={[-4, -2, 3]} angle={0.6} penumbra={1} intensity={1.8} color="#FF4500" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffffff" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
          <Phone3D screenTex={tex} />
        </Float>
        <ContactShadows position={[0, -1.95, 0]} opacity={0.6} scale={7} blur={2.8} far={4} />
      </Suspense>
    </Canvas>
  );
}

/* Lazy mount Canvas only when in viewport (saves mobile battery & first paint) */
function LazyHeroCanvas() {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRender(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.01 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" data-testid="hero-3d-lazy-mount">
      {shouldRender ? (
        <HeroCanvas />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-glow" />
        </div>
      )}
    </div>
  );
}

/* ======================== NAVBAR ======================== */
function Navbar() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 glass"
      data-testid="site-navbar"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2" data-testid="nav-brand">
          <span className="inline-block w-2.5 h-2.5 bg-accent rounded-sm" />
          <span className="font-display text-lg tracking-tight">BRADWEAR</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <li><a href="#tentang" className="hover:text-white transition" data-testid="nav-link-about">Tentang</a></li>
          <li><a href="#fitur" className="hover:text-white transition" data-testid="nav-link-features">Fitur</a></li>
          <li><a href="#galeri" className="hover:text-white transition" data-testid="nav-link-gallery">Galeri</a></li>
          <li><a href="#testimoni" className="hover:text-white transition" data-testid="nav-link-testimonials">Testimoni</a></li>
          <li><a href="#unduh" className="hover:text-white transition" data-testid="nav-link-download">Cara Download</a></li>
          <li><a href="#faq" className="hover:text-white transition" data-testid="nav-link-faq">FAQ</a></li>
        </ul>
        <a
          href={APP_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition"
          data-testid="nav-cta-download"
        >
          <Download className="w-4 h-4" />
          Unduh
          <ArrowUpRight className="w-3.5 h-3.5 -mr-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </nav>
    </header>
  );
}

/* ======================== HERO ======================== */
function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden spotlight">
      {/* gridlines */}
      <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-white/10 px-3 py-1 rounded-full text-xs tracking-[0.2em] uppercase text-zinc-400 mb-6"
            data-testid="hero-eyebrow"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow" />
            Tersedia di Google Play
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.95] text-balance"
            data-testid="hero-headline"
          >
            Tampil <span className="italic text-accent">Tajam.</span>
            <br />
            Percaya Diri.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed"
            data-testid="hero-subtitle"
          >
            Bradwear Indonesia — spesialis kemeja kerja & seragam profesional dari Tasikmalaya.
            Perpaduan streetwear dan gaya kerja formal yang membuat setiap langkah terlihat lebih tegas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-md font-medium hover:bg-accent hover:text-white transition"
              data-testid="hero-cta-download"
            >
              <svg viewBox="0 0 512 512" className="w-5 h-5" aria-hidden="true">
                <path fill="currentColor" d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              Unduh di Google Play
              <ArrowUpRight className="w-4 h-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#fitur"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white px-4 py-3 border border-white/10 rounded-md hover:border-white/30 transition"
              data-testid="hero-cta-features"
            >
              Lihat Fitur Aplikasi
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex items-center gap-6 text-xs text-zinc-500"
          >
            <div className="flex items-center gap-2" data-testid="hero-rating">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>Premium Quality</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <span data-testid="hero-developer">marsh.dev · Tasikmalaya</span>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <span className="hidden sm:inline">Art &amp; Design</span>
          </motion.div>
        </div>

        {/* Right - 3D phone */}
        <div className="relative h-[460px] md:h-[560px] lg:h-[640px] w-full">
          <div className="absolute inset-0 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0">
            <LazyHeroCanvas />
          </div>
          {/* floating tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-xs flex items-center gap-2"
            data-testid="hero-floating-tag-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Workshirt Specialist
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="absolute bottom-8 right-6 glass px-4 py-2 rounded-full text-xs flex items-center gap-2"
            data-testid="hero-floating-tag-2"
          >
            <Shirt className="w-3.5 h-3.5 text-accent" /> Brad V-1 · V-2 · Ventura
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ======================== ABOUT ======================== */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="tentang" ref={ref} className="relative py-32 md:py-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y }} className="md:col-span-5 relative">
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 relative">
            <img
              src="https://images.unsplash.com/photo-1608366592358-4a372c5857e6?crop=entropy&cs=srgb&fm=jpg&w=900&q=80"
              alt="Profesional Bradwear"
              className="w-full h-full object-cover opacity-90"
              data-testid="about-image"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-zinc-300">Made in</span>
              <span className="font-display text-2xl tracking-tight">Tasikmalaya</span>
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-5" data-testid="about-eyebrow">
            Tentang Aplikasi
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] text-balance" data-testid="about-headline">
            Aplikasi resmi untuk pengalaman seragam profesional Anda — dirancang untuk Indonesia yang bergerak cepat.
          </h2>
          <p className="mt-6 text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed" data-testid="about-description">
            Bradwear hadir untuk Anda yang mencari keseimbangan antara fungsionalitas kerja dan gaya urban modern.
            Dari potongan presisi hingga bahan pilihan yang tangguh dan tetap sejuk dipakai — setiap produk
            didesain agar Anda tampil sharper, neater, dan more authoritative dalam setiap aktivitas.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="V-1" label="Brad Series" />
            <Stat value="V-2" label="Brad Series" />
            <Stat value="VTR" label="Ventura" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="border-l border-white/10 pl-4">
      <div className="font-display text-3xl md:text-4xl tracking-tight text-accent" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{label}</div>
    </div>
  );
}

/* ======================== FEATURES ======================== */
const FEATURES = [
  {
    icon: Shirt,
    title: "Spesialis Kemeja Kerja",
    desc: "Koleksi kemeja kerja dengan potongan presisi yang menciptakan tampilan profesional sekaligus tegas.",
    span: "md:col-span-2 md:row-span-2",
    big: true,
  },
  {
    icon: Star,
    title: "Kualitas Premium",
    desc: "Bahan pilihan, tangguh untuk aktivitas tinggi namun tetap sejuk dan nyaman dipakai seharian.",
    span: "md:col-span-2",
  },
  {
    icon: Layers,
    title: "Koleksi Terlaris",
    desc: "Brad V-1, V-2, dan Ventura Series — dipercaya oleh ribuan pengguna.",
    span: "md:col-span-1",
  },
  {
    icon: Wand2,
    title: "Pesan Kustom Mudah",
    desc: "Integrasi pemesanan langsung untuk produk maupun seragam instansi.",
    span: "md:col-span-1",
  },
  {
    icon: Sparkles,
    title: "Desain Modern",
    desc: "Streetwear meets formal — tetap keren di luar jam kantor.",
    span: "md:col-span-2",
  },
];

function Features() {
  return (
    <section id="fitur" className="relative py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4" data-testid="features-eyebrow">
              Mengapa Bradwear
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] max-w-2xl" data-testid="features-headline">
              Lima alasan ribuan profesional memilih Bradwear.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm" data-testid="features-description">
            Standar tinggi yang dirancang untuk daya tahan maksimal tanpa mengorbankan kenyamanan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`bento-card relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 p-7 flex flex-col justify-between ${f.span}`}
              data-testid={`feature-card-${i}`}
            >
              <div className="flex items-start justify-between">
                <f.icon className="w-6 h-6 text-accent" />
                <span className="font-display text-zinc-700 text-sm">0{i + 1}</span>
              </div>
              <div>
                <h3 className={`font-display tracking-tight ${f.big ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                  {f.title}
                </h3>
                <p className={`text-zinc-400 mt-3 leading-relaxed ${f.big ? "text-base max-w-md" : "text-sm"}`}>
                  {f.desc}
                </p>
              </div>
              {f.big && (
                <div className="absolute -bottom-12 -right-10 opacity-10 pointer-events-none">
                  <Shirt className="w-56 h-56" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== SCREENSHOTS MARQUEE ======================== */
function Screenshots() {
  const tracks = [...SCREENSHOTS, ...SCREENSHOTS];
  return (
    <section id="galeri" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4" data-testid="gallery-eyebrow">
          Galeri Aplikasi
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] max-w-3xl" data-testid="gallery-headline">
          Intip aplikasi <span className="text-accent italic">Bradwear</span> dari dekat.
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
        <div className="marquee-track animate-marquee gap-6" data-testid="gallery-marquee">
          {tracks.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[320px] md:w-[420px] aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
            >
              <img
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                data-testid={`screenshot-${i}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== TESTIMONIALS ======================== */
const TESTIMONIALS = [
  {
    name: "Rifqi A.",
    role: "Site Engineer · Bandung",
    rating: 5,
    quote:
      "Potongan Brad V-2 pas banget di badan, bahannya adem walaupun panas-panasan di lapangan. Tampilan tetap rapi waktu meeting klien.",
  },
  {
    name: "Dewi S.",
    role: "HRD · Jakarta",
    rating: 5,
    quote:
      "Pesan seragam kantor 40 pcs lewat aplikasi prosesnya cepat dan tracking-nya jelas. Hasilnya rapi, jahitannya halus.",
  },
  {
    name: "Agus P.",
    role: "Owner Bengkel · Surabaya",
    rating: 4,
    quote:
      "Ventura Series ini favorit saya. Awet dipakai harian, warnanya tidak gampang pudar. Worth banget.",
  },
  {
    name: "Putri N.",
    role: "Marketing Manager · Yogyakarta",
    rating: 5,
    quote:
      "Aplikasinya simpel, navigasinya enak. Suka fitur custom order untuk seragam tim event kami.",
  },
  {
    name: "Bagus W.",
    role: "Field Supervisor · Tasikmalaya",
    rating: 5,
    quote:
      "Sebagai orang lokal, bangga produk Tasikmalaya bisa setajam ini. Detailnya premium, harganya masuk akal.",
  },
  {
    name: "Lina H.",
    role: "Procurement · Bekasi",
    rating: 4,
    quote:
      "Komunikasi tim Bradwear responsif. Sample bisa di-request, ukuran bisa disesuaikan. Repeat order pasti.",
  },
];

const RATING_AVG = (
  TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length
).toFixed(1);

function StarRow({ value, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} dari 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${size} ${i < value ? "text-accent fill-accent" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section
      id="testimoni"
      className="relative py-32 border-t border-white/5 overflow-hidden"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <p
              className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4"
              data-testid="testimonials-eyebrow"
            >
              Testimoni Pengguna
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] max-w-3xl"
              data-testid="testimonials-headline"
            >
              Cerita mereka yang sudah <span className="text-accent italic">tampil tajam</span>.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div
              className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-10 lg:gap-6 items-start sm:items-center lg:items-start"
              data-testid="testimonials-rating-card"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-6xl md:text-7xl tracking-tighter text-white">
                  {RATING_AVG}
                </span>
                <span className="text-zinc-500 text-lg">/ 5.0</span>
              </div>
              <div className="flex flex-col gap-2">
                <StarRow value={Math.round(parseFloat(RATING_AVG))} size="w-5 h-5" />
                <p className="text-sm text-zinc-400">
                  Berdasarkan {TESTIMONIALS.length} ulasan pengguna terverifikasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bento-card relative rounded-xl border border-white/10 bg-zinc-950/80 p-7 flex flex-col"
              data-testid={`testimonial-card-${i}`}
            >
              <Quote className="w-6 h-6 text-accent mb-4 opacity-80" />
              <p className="text-zinc-200 leading-relaxed text-base flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-base tracking-tight" data-testid={`testimonial-name-${i}`}>
                    {t.name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">{t.role}</div>
                </div>
                <StarRow value={t.rating} />
              </div>
            </motion.article>
          ))}
        </div>

        <p
          className="text-xs text-zinc-600 mt-10 max-w-xl"
          data-testid="testimonials-disclaimer"
        >
          * Testimoni dikurasi dari pengguna aplikasi Bradwear Indonesia. Akan diperbarui otomatis
          mengikuti review terbaru di Google Play Store.
        </p>
      </div>
    </section>
  );
}

/* ======================== DOWNLOAD STEPS ======================== */
const STEPS = [
  {
    icon: Smartphone,
    title: "Buka Google Play Store",
    desc: "Pastikan perangkat Android Anda terhubung internet, lalu buka aplikasi Google Play Store.",
  },
  {
    icon: Search,
    title: "Cari \"Bradwear Indonesia\"",
    desc: "Ketik kata kunci pada kolom pencarian. Pilih aplikasi resmi dari pengembang marsh.dev.",
  },
  {
    icon: Download,
    title: "Tekan Tombol Install",
    desc: "Tunggu proses unduh dan instalasi selesai. Aplikasi otomatis tersimpan di layar utama.",
  },
  {
    icon: CheckCircle2,
    title: "Mulai Belanja",
    desc: "Buka aplikasi, jelajahi koleksi V-1, V-2, Ventura, hingga pesan kustom seragam.",
  },
];

function DownloadSteps() {
  return (
    <section id="unduh" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4" data-testid="download-eyebrow">
              Cara Download
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] max-w-3xl" data-testid="download-headline">
              Empat langkah mudah untuk mulai.
            </h2>
          </div>
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="self-start inline-flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-md font-medium hover:bg-white hover:text-black transition"
            data-testid="download-cta-top"
          >
            Buka Play Store
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative grid grid-cols-12 items-center gap-6 py-8 border-b border-white/10 hover:bg-white/[0.02] transition pl-2 md:pl-6"
              data-testid={`download-step-${i + 1}`}
            >
              <div className="col-span-2 md:col-span-2 font-display text-6xl md:text-8xl text-white/[0.06] group-hover:text-accent/30 transition">
                0{i + 1}
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent transition">
                  <s.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:text-accent transition" />
                </div>
              </div>
              <div className="col-span-8 md:col-span-7">
                <h3 className="font-display text-2xl md:text-3xl tracking-tight">{s.title}</h3>
                <p className="text-zinc-400 mt-2 max-w-xl leading-relaxed">{s.desc}</p>
              </div>
              <div className="hidden md:flex col-span-2 justify-end">
                <ArrowUpRight className="w-6 h-6 text-zinc-700 group-hover:text-accent transition" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 to-zinc-900">
          <div className="flex items-center gap-4">
            <img src={APP_ICON} alt="App icon" className="w-16 h-16 rounded-xl border border-white/10" data-testid="download-app-icon" />
            <div>
              <div className="font-display text-xl tracking-tight">Bradwear Indonesia</div>
              <div className="text-xs text-zinc-500 mt-1">marsh.dev · Art &amp; Design · Everyone</div>
            </div>
          </div>
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-md font-medium hover:bg-accent hover:text-white transition"
            data-testid="download-cta-bottom"
          >
            <Download className="w-5 h-5" />
            Unduh Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}

/* ======================== FAQ ======================== */
const FAQS = [
  {
    q: "Apa itu Bradwear Indonesia?",
    a: "Bradwear adalah aplikasi belanja resmi untuk produk kemeja kerja & seragam profesional dari Tasikmalaya. Tagline-nya: experience your professional uniform.",
  },
  {
    q: "Apakah aplikasinya gratis?",
    a: "Ya, aplikasi tersedia gratis di Google Play Store. Anda hanya membayar untuk produk yang dipesan.",
  },
  {
    q: "Perangkat apa saja yang didukung?",
    a: "Saat ini Bradwear tersedia untuk perangkat Android melalui Google Play Store.",
  },
  {
    q: "Apakah bisa pesan seragam kustom?",
    a: "Bisa. Aplikasi terintegrasi langsung dengan layanan pemesanan kustom untuk produk personal maupun seragam instansi.",
  },
  {
    q: "Bagaimana cara menghubungi Bradwear?",
    a: "Via telepon di +62 823-1922-6530 atau email gilangsetianugraha9@gmail.com.",
  },
];

function FaqItem({ item, idx }) {
  const [open, setOpen] = React.useState(idx === 0);
  return (
    <div className="border-b border-white/10" data-testid={`faq-item-${idx}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        data-testid={`faq-trigger-${idx}`}
      >
        <span className="font-display text-lg md:text-xl tracking-tight pr-6 group-hover:text-accent transition">
          {item.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${open ? "rotate-180 text-accent" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-zinc-400 leading-relaxed max-w-2xl" data-testid={`faq-answer-${idx}`}>
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="relative py-32 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4" data-testid="faq-eyebrow">FAQ</p>
        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] mb-12" data-testid="faq-headline">
          Pertanyaan yang sering ditanyakan.
        </h2>
        <div>
          {FAQS.map((it, i) => (
            <FaqItem key={i} item={it} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== FOOTER ======================== */
function Footer() {
  return (
    <footer className="relative pt-32 pb-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-10 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2.5 h-2.5 bg-accent" />
              <span className="font-display text-lg tracking-tight">BRADWEAR</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
              Tampil tajam, percaya diri. Spesialis kemeja kerja & seragam profesional dari Tasikmalaya, Indonesia.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">Kontak</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+6282319226530" className="flex items-center gap-3 text-zinc-300 hover:text-accent transition" data-testid="footer-phone">
                  <Phone className="w-4 h-4" /> +62 823-1922-6530
                </a>
              </li>
              <li>
                <a href="mailto:gilangsetianugraha9@gmail.com" className="flex items-center gap-3 text-zinc-300 hover:text-accent transition" data-testid="footer-email">
                  <Mail className="w-4 h-4" /> gilangsetianugraha9@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.bradwearindonesia.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-accent transition"
                  data-testid="footer-website"
                >
                  <Globe className="w-4 h-4" /> bradwearindonesia.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">Aplikasi</p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-5 py-3 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition"
              data-testid="footer-cta-download"
            >
              <Download className="w-4 h-4" />
              Unduh di Google Play
            </a>
            <div className="mt-6 text-xs text-zinc-500 space-y-1">
              <div>Pengembang: marsh.dev</div>
              <div>Kategori: Art &amp; Design</div>
              <div>Updated: Apr 2026</div>
            </div>
          </div>
        </div>

        {/* MASSIVE WORDMARK */}
        <div className="pt-12 select-none pointer-events-none">
          <h2 className="font-display tracking-[-0.04em] leading-none text-[18vw] md:text-[14vw] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-white/[0.02] text-center">
            BRADWEAR
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-3 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Bradwear Indonesia. All rights reserved.</span>
          <span>Designed for those who lead.</span>
        </div>
      </div>
    </footer>
  );
}

/* ======================== APP ======================== */
export default function App() {
  return (
    <div className="grain min-h-screen bg-ink text-zinc-100" data-testid="app-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Screenshots />
        <Testimonials />
        <DownloadSteps />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
