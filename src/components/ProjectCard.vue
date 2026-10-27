<script setup>
import { ref, computed } from 'vue'
import { 
  ExternalLink, 
  Github, 
  Trash2, 
  Edit3, 
  Calendar, 
  Layers, 
  ArrowUpRight,
  Lock,
  Globe,
  Sparkles
} from 'lucide-vue-next'
import { getWebsitePreviewUrl, getDomain } from '../utils/preview'

const props = defineProps({
  project: { type: Object, required: true },
  isAdmin: { type: Boolean, default: false }
})

const emit = defineEmits(['edit', 'delete'])

const imgError = ref(false)
const imgLoaded = ref(false)

const domain = computed(() => getDomain(props.project.url))

const previewUrl = computed(() => {
  if (imgError.value) {
    return props.project.image_url || ''
  }
  // Primary: Live Website Preview generated from project URL
  const webPreview = getWebsitePreviewUrl(props.project.url)
  return webPreview || props.project.image_url || ''
})

function handleImgError() {
  imgError.value = true
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

// Cursor-following spotlight
function onMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <article class="project-card glass-card" @mousemove="onMove">
    <!-- Live Website Preview Window Frame -->
    <div class="card-browser-frame">
      <!-- Browser Top Bar -->
      <div class="browser-topbar">
        <div class="mac-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>

        <div class="browser-address-bar" :title="project.url">
          <Lock :size="9" class="lock-icon" />
          <span class="browser-domain">{{ domain }}</span>
        </div>

        <div class="browser-preview-tag font-tech">
          <span class="live-dot"></span>
          <span>PREVIEW</span>
        </div>
      </div>

      <!-- Browser Viewport / Screen -->
      <div class="browser-viewport">
        <!-- Live Web Preview Image -->
        <img 
          v-if="previewUrl" 
          :src="previewUrl" 
          :alt="project.title" 
          class="website-preview-img" 
          loading="lazy"
          @load="imgLoaded = true"
          @error="handleImgError" 
        />

        <!-- Fallback Wireframe Mockup if no preview is available -->
        <div v-else class="preview-placeholder">
          <div class="wireframe-mock">
            <div class="wf-header"></div>
            <div class="wf-hero-box"></div>
            <div class="wf-grid-boxes">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="placeholder-caption font-tech">
            <Globe :size="14" />
            <span>{{ domain }}</span>
          </div>
        </div>

        <!-- Subtle Top Gradient Shadow -->
        <div class="viewport-inner-shadow"></div>

        <!-- Category Badge -->
        <span class="badge badge-category media-category-badge">
          {{ project.category || 'Web App' }}
        </span>

        <!-- Hover Overlay: Quick Visit Prompt -->
        <a 
          :href="project.url" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="viewport-hover-overlay"
          title="คลิกเพื่อเข้าชมเว็บไซต์จริง"
        >
          <div class="hover-cta-pill font-tech">
            <ExternalLink :size="13" />
            <span>เข้าชมเว็บไซต์จริง</span>
          </div>
        </a>

        <!-- Admin Only Actions -->
        <div v-if="isAdmin" class="media-actions" @click.stop>
          <button class="icon-action-btn edit" @click.stop="emit('edit', project)" title="แก้ไขข้อมูลผลงาน">
            <Edit3 :size="15" />
          </button>
          <button class="icon-action-btn delete" @click.stop="emit('delete', project.id)" title="ลบผลงานนี้">
            <Trash2 :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <h3 class="card-title" :title="project.title">{{ project.title }}</h3>
      <p class="card-desc">{{ project.description || 'ไม่มีคำอธิบายสำหรับผลงานนี้' }}</p>

      <div v-if="project.tags && project.tags.length" class="tags-container">
        <span v-for="(tag, index) in project.tags.slice(0, 4)" :key="index" class="tag-item">#{{ tag }}</span>
        <span v-if="project.tags.length > 4" class="tag-item more">+{{ project.tags.length - 4 }}</span>
      </div>

      <div class="card-meta">
        <span class="meta-item">
          <Calendar :size="13" />
          <span>{{ formatDate(project.created_at) || 'เร็วๆ นี้' }}</span>
        </span>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer">
      <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener noreferrer"
        class="btn btn-secondary btn-sm footer-btn" title="เปิดดูซอร์สโค้ด GitHub">
        <Github :size="16" />
        <span>GitHub</span>
      </a>
      <a :href="project.url" target="_blank" rel="noopener noreferrer"
        class="btn btn-primary btn-sm footer-btn live-btn">
        <span>เข้าชมผลงาน</span>
        <ArrowUpRight :size="16" class="arrow" />
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  animation: cardIn 0.8s var(--ease-out) backwards;
  animation-delay: calc(var(--i, 0) * 80ms);
  transition: transform 0.45s var(--ease-out), box-shadow 0.45s ease, border-color 0.3s ease;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
    filter: blur(8px);
  }
}

/* Cursor spotlight + glowing border */
.project-card::before,
.project-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
  z-index: 5;
}

.project-card::before {
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(0, 240, 255, 0.14), transparent 45%);
}

.project-card::after {
  padding: 1px;
  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(0, 225, 255, 0.9), transparent 50%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 50px -18px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(0, 240, 255, 0.35);
}

.project-card:hover::before,
.project-card:hover::after {
  opacity: 1;
}

/* ---------- Browser Window Mockup Frame ---------- */
.card-browser-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 220px;
  background: #090e1d;
  border-bottom: 1px solid rgba(0, 240, 255, 0.18);
  overflow: hidden;
}

/* Browser Top Bar */
.browser-topbar {
  height: 30px;
  background: rgba(13, 20, 38, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.85rem;
  z-index: 3;
}

.mac-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.85;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #ffb703; }
.dot.green { background: #00f5a0; }

.browser-address-bar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(5, 8, 19, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.65rem;
  border-radius: 5px;
  font-size: 0.68rem;
  color: #94a3b8;
  max-width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lock-icon {
  color: #00f5a0;
  flex-shrink: 0;
}

.browser-domain {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.browser-preview-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.62rem;
  font-weight: 800;
  color: var(--b2n-cyan);
  background: rgba(0, 240, 255, 0.1);
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--b2n-cyan);
  box-shadow: 0 0 6px var(--b2n-cyan);
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

/* Browser Viewport */
.browser-viewport {
  position: relative;
  height: calc(100% - 30px);
  width: 100%;
  overflow: hidden;
  background: #060a16;
}

/* Live Website Preview Image */
.website-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 1.2s var(--ease-out), filter 0.4s ease;
  filter: saturate(1.05);
}

/* Pan down on hover to simulate looking at the website */
.project-card:hover .website-preview-img {
  transform: translateY(-8%) scale(1.03);
  filter: saturate(1.15);
}

.viewport-inner-shadow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 12px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

/* Category Badge */
.media-category-badge {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  backdrop-filter: blur(10px);
  background: rgba(6, 10, 22, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.4);
  font-size: 0.7rem;
  font-weight: 700;
  z-index: 3;
}

/* Hover Overlay */
.viewport-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 10, 22, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 4;
  text-decoration: none;
}

.project-card:hover .viewport-hover-overlay {
  opacity: 1;
}

.hover-cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(0, 240, 255, 0.2);
  border: 1px solid var(--b2n-cyan);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-full);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
  transform: translateY(6px);
  transition: transform 0.3s var(--ease-spring);
}

.project-card:hover .hover-cta-pill {
  transform: translateY(0);
}

/* Wireframe Fallback */
.preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #0e172c 0%, #060a16 100%);
  padding: 1rem;
}

.wireframe-mock {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  opacity: 0.5;
  margin-bottom: 0.65rem;
}

.wf-header {
  height: 8px;
  background: rgba(0, 240, 255, 0.3);
  border-radius: 4px;
}

.wf-hero-box {
  height: 38px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
}

.wf-grid-boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
}

.wf-grid-boxes span {
  height: 20px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
}

.placeholder-caption {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

/* Admin Actions */
.media-actions {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  display: flex;
  gap: 0.4rem;
  z-index: 5;
  opacity: 0;
  transform: translateY(-6px) scale(0.92);
  transition: all 0.3s var(--ease-spring);
}

.project-card:hover .media-actions {
  opacity: 1;
  transform: none;
}

.icon-action-btn {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: rgba(10, 14, 24, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-full);
  color: var(--text-main);
  cursor: pointer;
  transition: var(--transition);
}

.icon-action-btn:hover {
  transform: scale(1.12);
  color: #fff;
}

.icon-action-btn.edit:hover {
  background: var(--b2n-blue);
  border-color: var(--b2n-cyan);
}

.icon-action-btn.delete:hover {
  background: #ef4444;
  border-color: #ef4444;
}

/* Body */
.card-body {
  padding: 1.25rem 1.35rem 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.project-card:hover .card-title {
  color: #00f0ff;
}

.card-desc {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.1rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.tag-item {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.18rem 0.55rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: #aab4c8;
  transition: var(--transition);
}

.project-card:hover .tag-item {
  border-color: rgba(0, 240, 255, 0.3);
}

.tag-item.more {
  background: rgba(0, 240, 255, 0.12);
  color: #00f0ff;
}

.card-meta {
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.8rem;
  font-size: 0.76rem;
  color: var(--text-dim);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.card-footer {
  padding: 0.25rem 1.35rem 1.35rem;
  display: flex;
  gap: 0.7rem;
}

.footer-btn {
  flex: 1;
}

.live-btn {
  flex: 1.6;
}

.live-btn .arrow {
  transition: transform 0.35s var(--ease-spring);
}

.live-btn:hover .arrow {
  transform: translate(3px, -3px);
}
</style>