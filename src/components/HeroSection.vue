<script setup>
import { ref, watch } from 'vue'
import { Sparkles, Layers, Cpu, Database, Code2, Server, Zap, Phone, ArrowDown, ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  stats: { type: Object, required: true },
  isConfigured: { type: Boolean, default: false }
})

// Count-up animation for numeric stats
const shownTotal = ref(0)
const shownCats = ref(0)

function animateTo(target, value, duration = 1000) {
  const from = target.value
  const t0 = performance.now()
  const step = (t) => {
    const p = Math.min((t - t0) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 4)
    target.value = Math.round(from + (value - from) * eased)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

watch(() => props.stats.total, (v) => animateTo(shownTotal, v), { immediate: true })
watch(() => props.stats.categoriesCount, (v) => animateTo(shownCats, v), { immediate: true })
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

        <!-- Floating Chip: Supabase Realtime -->
        <div class="floating-chip chip-bottom">
          <Zap :size="14" class="chip-icon-green" />
          <span>Supabase Realtime</span>
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

      <!-- Stats Grid (Cyan, Gold, Emerald from B2N) -->
      <div class="stats-grid" style="--d: 5">
        <!-- 1. Total Projects (Cyan) -->
        <div class="stat-card glass-card stat-cyan">
          <div class="stat-icon-wrapper cyan">
            <Layers :size="20" />
          </div>
          <div>
            <div class="stat-value font-tech">{{ shownTotal }}</div>
            <div class="stat-label">ผลงานในคลัง</div>
          </div>
        </div>

        <!-- 2. Categories (Gold) -->
        <div class="stat-card glass-card stat-gold">
          <div class="stat-icon-wrapper gold">
            <Cpu :size="20" />
          </div>
          <div>
            <div class="stat-value font-tech">{{ shownCats }}</div>
            <div class="stat-label">หมวดหมู่เทคโนโลยี</div>
          </div>
        </div>

        <!-- 3. Source (Green) -->
        <div class="stat-card glass-card stat-green">
          <div class="stat-icon-wrapper green">
            <Database :size="20" />
          </div>
          <div>
            <div class="stat-value font-tech">{{ isConfigured ? 'Supabase' : 'Mock Mode' }}</div>
            <div class="stat-label">แหล่งข้อมูลผลงาน</div>
          </div>
        </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Stagger animation for hero elements */
.hero-content > * {
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

/* Mascot Showcase Container (Transparent, No Circles) */
.hero-mascot-container {
  position: relative;
  width: 320px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.hero-logo-box {
  position: relative;
  width: 210px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: transparent;
  animation: floatMascot 4.5s ease-in-out infinite alternate;
}

@keyframes floatMascot {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-8px) scale(1.03); }
}

.hero-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: transparent;
  display: block;
  filter: drop-shadow(0 15px 35px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 20px rgba(255, 183, 3, 0.25));
  transition: transform 0.35s var(--ease-spring), filter 0.35s ease;
}

.hero-logo-img:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 20px 45px rgba(0, 240, 255, 0.65)) drop-shadow(0 0 30px rgba(255, 183, 3, 0.4));
}

/* Floating Info Chips */
.floating-chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.32rem 0.75rem;
  background: rgba(9, 15, 30, 0.88);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-main);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 3;
  white-space: nowrap;
  transition: transform 0.3s var(--ease-spring);
}

.floating-chip:hover {
  transform: scale(1.08);
}

.chip-left { left: -20px; top: 30px; border-color: rgba(0, 240, 255, 0.4); }
.chip-right { right: -20px; top: 40px; border-color: rgba(255, 183, 3, 0.4); }
.chip-bottom { bottom: 0px; border-color: rgba(0, 245, 160, 0.4); }

.chip-icon-cyan { color: var(--b2n-cyan); }
.chip-icon-gold { color: var(--b2n-gold); }
.chip-icon-green { color: var(--b2n-green); }

/* Hero Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-full);
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.35);
  color: #88eaff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  margin-bottom: 1.25rem;
  position: relative;
  overflow: hidden;
}

.badge-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.sparkle-icon {
  color: #ffb703;
  animation: pulseSparkle 2s ease-in-out infinite;
}

@keyframes pulseSparkle {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #ffb703); }
  50% { transform: scale(1.25); filter: drop-shadow(0 0 6px #ffb703); }
}

/* Title & Subtitle */
.hero-title {
  font-size: 3.25rem;
  font-weight: 800;
  letter-spacing: -0.8px;
  max-width: 860px;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.08rem;
  color: var(--text-muted);
  max-width: 740px;
  margin-bottom: 2rem;
  font-weight: 400;
  line-height: 1.7;
}

/* Hero Actions */
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 2.75rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  width: 100%;
  max-width: 800px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.4rem;
  text-align: left;
  border-radius: var(--radius-md);
  transition: transform 0.3s var(--ease-spring), border-color 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-cyan:hover {
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.2);
}

.stat-gold:hover {
  border-color: rgba(255, 183, 3, 0.6);
  box-shadow: 0 10px 30px rgba(255, 183, 3, 0.2);
}

.stat-green:hover {
  border-color: rgba(0, 245, 160, 0.6);
  box-shadow: 0 10px 30px rgba(0, 245, 160, 0.2);
}

.stat-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrapper.cyan {
  background: rgba(0, 240, 255, 0.12);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.35);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.stat-icon-wrapper.gold {
  background: rgba(255, 183, 3, 0.12);
  color: #ffb703;
  border: 1px solid rgba(255, 183, 3, 0.35);
  box-shadow: 0 0 15px rgba(255, 183, 3, 0.2);
}

.stat-icon-wrapper.green {
  background: rgba(0, 245, 160, 0.12);
  color: #00f5a0;
  border: 1px solid rgba(0, 245, 160, 0.35);
  box-shadow: 0 0 15px rgba(0, 245, 160, 0.2);
}

.stat-value {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.1;
  letter-spacing: 0.5px;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .floating-chip {
    display: none;
  }
}
</style>