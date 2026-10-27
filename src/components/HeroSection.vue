<script setup>
import { Sparkles, Layers, Code2, Server, Phone } from 'lucide-vue-next'

defineProps({
  stats: { type: Object, default: () => ({}) },
  isConfigured: { type: Boolean, default: false }
})
</script>

<template>
  <section id="intro" class="hero-section reveal-section">
    <div class="container hero-content">

      <!-- Hero Logo Showcase (Transparent Background, No Circles!) -->
      <div class="hero-mascot-container" style="--d: 0">
        <!-- Floating Chip: Code -->
        <div class="floating-chip chip-left">
          <Code2 :size="14" class="chip-icon-cyan" />
          <span>&lt;/&gt; Web &amp; Systems</span>
        </div>

        <!-- Floating Chip: Web Application -->
        <div class="floating-chip chip-right">
          <Server :size="14" class="chip-icon-gold" />
          <span>Web Application</span>
        </div>

        <!-- Center Transparent Logo Display -->
        <div class="hero-logo-box">
          <img src="/img/logo.png" alt="B2N Dev Service" class="hero-logo-img" />
        </div>
      </div>

      <!-- Pill Badge -->
      <div class="hero-badge" style="--d: 1">
        <span class="badge-glow"></span>
        <Sparkles :size="14" class="sparkle-icon" />
        <span class="font-tech">B2N DEV SERVICE • WEB &amp; WEBAPP SOLUTIONS</span>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-title" style="--d: 2">
        ยินดีต้อนรับสู่ <br />
        <span class="gradient-text font-tech">B2N Dev Service</span>
      </h1>

      <p class="hero-subtitle" style="--d: 3">
        รับพัฒนาเว็บไซต์ &amp; แอปพลิเคชัน ครบวงจร จบในที่เดียว ไม่ว่าคุณจะเริ่มต้นธุรกิจใหม่
        หรือต้องการพัฒนาระบบเพื่อยกระดับองค์กร เราพร้อมออกแบบและพัฒนาตามความต้องการของคุณ
      </p>

      <!-- Action Buttons -->
      <div class="hero-actions" style="--d: 4">
        <a href="#services" class="btn btn-primary">
          <Sparkles :size="16" />
          <span>บริการของเรา</span>
        </a>
        <a href="#portfolio" class="btn btn-secondary">
          <Layers :size="16" />
          <span>ชมผลงานโปรเจกต์</span>
        </a>
        <a href="#contact" class="btn btn-outline">
          <Phone :size="16" />
          <span>ติดต่อประเมินราคา</span>
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: 3rem 0 3.5rem;
  text-align: center;
  position: relative;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Stagger animation for hero elements */
.hero-content>* {
  animation: heroFadeIn 0.8s var(--ease-out) backwards;
  animation-delay: calc(var(--d, 0) * 110ms + 100ms);
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(22px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mascot / Logo Container (Transparent, No Ring, Pure Logo) */
.hero-mascot-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  width: 220px;
  height: 220px;
}

.hero-logo-box {
  width: 190px;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  animation: floatMascot 4s ease-in-out infinite alternate;
}

@keyframes floatMascot {
  0% {
    transform: translateY(0) scale(1);
  }

  100% {
    transform: translateY(-8px) scale(1.03);
  }
}

.hero-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: transparent;
  filter: drop-shadow(0 15px 30px rgba(0, 240, 255, 0.45));
}

/* Floating tech chips */
.floating-chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  background: rgba(9, 15, 30, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 3;
  transition: transform 0.3s var(--ease-spring);
}

.floating-chip:hover {
  transform: scale(1.08);
}

.chip-left {
  left: -20px;
  top: 30px;
  border-color: rgba(0, 240, 255, 0.4);
}

.chip-right {
  right: -20px;
  top: 40px;
  border-color: rgba(255, 183, 3, 0.4);
}

.chip-icon-cyan {
  color: var(--b2n-cyan);
}

.chip-icon-gold {
  color: var(--b2n-gold);
}

/* Hero Badge */
.hero-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.15rem;
  border-radius: var(--radius-full);
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.35);
  color: #00f0ff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  margin-bottom: 1.4rem;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
}

.badge-glow {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(90deg, #00f0ff, #ffb703, #00f5a0);
  opacity: 0.25;
  filter: blur(6px);
  z-index: -1;
}

.sparkle-icon {
  color: var(--b2n-gold);
  animation: pulseSparkle 2s infinite ease-in-out;
}

@keyframes pulseSparkle {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 2px #ffb703);
  }

  50% {
    transform: scale(1.25);
    filter: drop-shadow(0 0 6px #ffb703);
  }
}

/* Title & Subtitle */
.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 1.25rem;
  color: #fff;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 720px;
  margin-bottom: 2.2rem;
}

/* Action Buttons */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .floating-chip {
    display: none;
  }
}
</style>