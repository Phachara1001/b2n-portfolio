<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MessageCircle, Menu, X } from 'lucide-vue-next'

defineProps({
  isConfigured: { type: Boolean, default: false },
  projectCount: { type: Number, default: 0 }
})

const emit = defineEmits(['openAddModal', 'openGuideModal'])

const scrolled = ref(false)
const progress = ref(0)
const mobileMenuOpen = ref(false)
const activeSection = ref('intro')

function onScroll() {
  scrolled.value = window.scrollY > 12
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? window.scrollY / max : 0

  // Track active section
  const sections = ['intro', 'services', 'team', 'portfolio', 'contact']
  for (const s of sections) {
    const el = document.getElementById(s)
    if (el) {
      const top = el.getBoundingClientRect().top
      if (top <= 140) {
        activeSection.value = s
      }
    }
  }
}

function scrollTo(id) {
  mobileMenuOpen.value = false
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <!-- Top Scroll Progress Bar (B2N Gradient) -->
    <div class="scroll-progress-track">
      <div class="scroll-progress-bar" :style="{ transform: `scaleX(${progress})` }"></div>
    </div>

    <div class="container navbar-inner">
      <!-- Brand Logo + Name -->
      <a class="brand" href="#intro" @click.prevent="scrollTo('intro')">
        <div class="logo-wrapper">
          <img src="/img/logo.png" alt="B2N Dev Service Logo" class="brand-logo-img" />
        </div>
        <div class="brand-text">
          <div class="brand-name font-tech">
            <span class="text-b">B</span><span class="text-2">2</span><span class="text-n">N</span>
            <span class="brand-service">Dev Service</span>
          </div>
          <span class="brand-tag">Web &amp; Software Solutions</span>
        </div>
      </a>

      <!-- Center Navigation Links -->
      <nav class="nav-links">
        <a 
          href="#intro" 
          class="nav-link" 
          :class="{ active: activeSection === 'intro' }"
          @click.prevent="scrollTo('intro')"
        >
          บทนำ
        </a>
        <a 
          href="#services" 
          class="nav-link" 
          :class="{ active: activeSection === 'services' }"
          @click.prevent="scrollTo('services')"
        >
          บริการ
        </a>
        <a 
          href="#team" 
          class="nav-link" 
          :class="{ active: activeSection === 'team' }"
          @click.prevent="scrollTo('team')"
        >
          สมาชิก
        </a>
        <a 
          href="#portfolio" 
          class="nav-link" 
          :class="{ active: activeSection === 'portfolio' }"
          @click.prevent="scrollTo('portfolio')"
        >
          ผลงาน
          <span v-if="projectCount" class="nav-badge">{{ projectCount }}</span>
        </a>
        <a 
          href="#contact" 
          class="nav-link" 
          :class="{ active: activeSection === 'contact' }"
          @click.prevent="scrollTo('contact')"
        >
          ติดต่อเรา
        </a>
      </nav>

      <!-- Right Side Actions -->
      <div class="nav-actions">
        <a 
          href="#contact" 
          class="btn btn-primary btn-sm contact-cta-btn" 
          @click.prevent="scrollTo('contact')"
        >
          <MessageCircle :size="16" />
          <span>ติดต่อเรา</span>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button 
          class="mobile-toggle-btn" 
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="เมนู"
        >
          <X v-if="mobileMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="drawer">
      <div v-if="mobileMenuOpen" class="mobile-drawer">
        <nav class="mobile-nav">
          <a href="#intro" class="mobile-nav-link" @click.prevent="scrollTo('intro')">บทนำ</a>
          <a href="#services" class="mobile-nav-link" @click.prevent="scrollTo('services')">บริการ</a>
          <a href="#team" class="mobile-nav-link" @click.prevent="scrollTo('team')">สมาชิก</a>
          <a href="#portfolio" class="mobile-nav-link" @click.prevent="scrollTo('portfolio')">ผลงาน ({{ projectCount }})</a>
          <a href="#contact" class="mobile-nav-link" @click.prevent="scrollTo('contact')">ติดต่อเรา</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(5, 8, 19, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0.7rem 0;
  transition: all 0.3s var(--ease-out);
}

.navbar.scrolled {
  background: rgba(5, 8, 19, 0.94);
  border-bottom-color: rgba(0, 240, 255, 0.22);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
  padding: 0.55rem 0;
}

/* Scroll progress */
.scroll-progress-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
}

.scroll-progress-bar {
  height: 100%;
  background: var(--brand-gradient);
  transform-origin: 0 50%;
  transition: transform 0.1s linear;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

/* Brand Logo */
.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}

.logo-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: transform 0.3s var(--ease-spring);
}

.brand:hover .logo-wrapper {
  transform: scale(1.1);
}

.brand-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: transparent;
  display: block;
  filter: drop-shadow(0 2px 10px rgba(0, 240, 255, 0.45));
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.text-b { color: var(--b2n-cyan); text-shadow: 0 0 10px rgba(0, 240, 255, 0.6); }
.text-2 { color: var(--b2n-gold); text-shadow: 0 0 10px rgba(255, 183, 3, 0.6); }
.text-n { color: var(--b2n-green); text-shadow: 0 0 10px rgba(0, 245, 160, 0.6); }

.brand-service {
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  margin-left: 0.2rem;
  letter-spacing: 0.3px;
}

.brand-tag {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(10, 16, 32, 0.5);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
}

.nav-link {
  position: relative;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-full);
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-link:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.06);
}

.nav-link.active {
  color: #fff;
  background: rgba(0, 240, 255, 0.16);
  border: 1px solid rgba(0, 240, 255, 0.35);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
}

.nav-badge {
  font-size: 0.7rem;
  background: var(--b2n-cyan);
  color: #050813;
  padding: 0.05rem 0.4rem;
  border-radius: var(--radius-full);
  font-weight: 800;
}

/* Status Pill */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
}

.status-connected {
  background: rgba(0, 245, 160, 0.1);
  color: #00f5a0;
  border-color: rgba(0, 245, 160, 0.35);
}

.status-mock {
  background: rgba(255, 183, 3, 0.1);
  color: #ffb703;
  border-color: rgba(255, 183, 3, 0.35);
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation: pulseDot 2s infinite;
}

.live-dot.ok { background: #00f5a0; box-shadow: 0 0 6px #00f5a0; }
.live-dot.mock { background: #ffb703; box-shadow: 0 0 6px #ffb703; }

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-toggle-btn {
  display: none;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  padding: 0.4rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

/* Mobile Drawer */
.mobile-drawer {
  background: rgba(9, 15, 30, 0.98);
  border-bottom: 1px solid var(--border-card);
  padding: 1rem 1.5rem 1.5rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.mobile-nav-link {
  padding: 0.65rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-main);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
}

.drawer-enter-active, .drawer-leave-active {
  transition: all 0.25s ease-out;
}
.drawer-enter-from, .drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 990px) {
  .nav-links {
    display: none;
  }
  .mobile-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .status-text {
    display: none;
  }
}
</style>