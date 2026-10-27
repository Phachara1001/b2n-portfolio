<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
  fetchProjects,
  addProject,
  deleteProject,
  updateProject,
  isSupabaseConfigured
} from './lib/supabase'
import { categoriesList } from './constants/categories'

import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import TeamSection from './components/TeamSection.vue'
import ContactSection from './components/ContactSection.vue'
import ProjectCard from './components/ProjectCard.vue'
import AdminView from './components/AdminView.vue'

import { 
  FolderPlus, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Search, 
  X, 
  Sparkles,
  Database,
  Terminal
} from 'lucide-vue-next'

const projects = ref([])
const isLoading = ref(true)
const dataSource = ref('mock')
const activeCategory = ref('ทั้งหมด')
const searchQuery = ref('')

const toasts = ref([])
let scrollObserver = null

// Simple routing for /ModeAdminNakubEiEi without login
function checkIsAdmin() {
  const p = window.location.pathname.toLowerCase()
  const h = window.location.hash.toLowerCase()
  return p.includes('modeadminnakubeiei') || h.includes('modeadminnakubeiei')
}

const isAdminRoute = ref(checkIsAdmin())

function updateRoute() {
  isAdminRoute.value = checkIsAdmin()
  if (!isAdminRoute.value) {
    nextTick(() => {
      setupScrollObserver()
    })
  }
}

function goToAdmin() {
  window.history.pushState({}, '', '/ModeAdminNakubEiEi')
  updateRoute()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToHome() {
  window.history.pushState({}, '', '/')
  updateRoute()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showToast(message, type = 'success') {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3500)
}

async function loadData() {
  isLoading.value = true
  try {
    const res = await fetchProjects()
    projects.value = res.data || []
    dataSource.value = res.source
  } catch (err) {
    showToast('เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + err.message, 'error')
  } finally {
    isLoading.value = false
  }
}

function setupScrollObserver() {
  if (isAdminRoute.value) return
  const sections = document.querySelectorAll('.reveal-section')
  if (!sections.length) return

  if (scrollObserver) {
    scrollObserver.disconnect()
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      } else {
        entry.target.classList.remove('is-visible')
      }
    })
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  })

  sections.forEach(sec => scrollObserver.observe(sec))
}

onMounted(() => {
  window.addEventListener('popstate', updateRoute)
  window.addEventListener('hashchange', updateRoute)
  loadData()
  nextTick(() => {
    if (!isAdminRoute.value) {
      setupScrollObserver()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('popstate', updateRoute)
  window.removeEventListener('hashchange', updateRoute)
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
})

// คำนวณสถิติ
const stats = computed(() => {
  const uniqueCats = new Set(projects.value.map(p => p.category).filter(Boolean))
  return {
    total: projects.value.length,
    categoriesCount: uniqueCats.size || categoriesList.length - 1
  }
})

// กรองผลงานตามหมวดหมู่และการค้นหา
const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return projects.value.filter(proj => {
    const matchCat = activeCategory.value === 'ทั้งหมด' || proj.category === activeCategory.value
    const matchSearch = !query ||
      (proj.title && proj.title.toLowerCase().includes(query)) ||
      (proj.description && proj.description.toLowerCase().includes(query)) ||
      (proj.tags && proj.tags.some(tag => tag.toLowerCase().includes(query)))

    return matchCat && matchSearch
  })
})

// Admin CRUD handlers
async function handleAdminAdd(data) {
  try {
    await addProject(data)
    showToast('เพิ่มผลงานใหม่เรียบร้อยแล้ว!')
    await loadData()
  } catch (err) {
    showToast('ไม่สามารถเพิ่มผลงานได้: ' + err.message, 'error')
  }
}

async function handleAdminUpdate(data) {
  try {
    const { id, ...rest } = data
    await updateProject(id, rest)
    showToast('อัปเดตข้อมูลผลงานเรียบร้อยแล้ว!')
    await loadData()
  } catch (err) {
    showToast('ไม่สามารถอัปเดตผลงานได้: ' + err.message, 'error')
  }
}

async function handleDelete(id) {
  try {
    await deleteProject(id)
    showToast('ลบผลงานเรียบร้อยแล้ว')
    await loadData()
  } catch (err) {
    showToast('ไม่สามารถลบผลงานได้: ' + err.message, 'error')
  }
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="app-wrapper">
    <!-- A. Admin View (Secret Route: /ModeAdminNakubEiEi) -->
    <AdminView
      v-if="isAdminRoute"
      :projects="projects"
      :isConfigured="isSupabaseConfigured"
      :categories="categoriesList"
      @goHome="goToHome"
      @addProject="handleAdminAdd"
      @updateProject="handleAdminUpdate"
      @deleteProject="handleDelete"
      @notify="showToast"
    />

    <!-- B. Public Showcase View (Display Only) -->
    <div v-else class="public-view">
      <!-- 1. Header & Navigation -->
      <Navbar
        :projectCount="projects.length"
      />

      <!-- 2. Section: บทนำ (Hero / Intro) -->
      <HeroSection
        :stats="stats"
        :isConfigured="isSupabaseConfigured"
      />

      <!-- 3. Section: บริการของเรา (Services) -->
      <ServicesSection
        @portfolioClick="scrollTo('portfolio')"
        @contactClick="scrollTo('contact')"
      />

      <!-- 4. Section: สมาชิกทีม (Team) -->
      <TeamSection />

      <!-- 5. Section: ผลงาน (Portfolio / Showcase - Display Only) -->
      <section id="portfolio" class="portfolio-section container reveal-section">
        <!-- Section Header -->
        <div class="section-badge-wrap">
          <div class="section-badge">
            <Layers :size="14" class="sparkle-icon" />
            <span class="font-tech">B2N PORTFOLIO &amp; SHOWCASE</span>
          </div>
          <h2 class="section-title">
            ผลงานโปรเจกต์ <span class="gradient-text font-tech">B2N Dev Service</span>
          </h2>
          <p class="section-subtitle">
            รวมตัวอย่างเว็บไซต์ และระบบงานเว็บแอปพลิเคชันที่เราพัฒนาขึ้นจริง พร้อมลิงก์เข้าชมและซอร์สโค้ด
          </p>
        </div>

        <!-- Portfolio Filter Toolbar -->
        <div class="portfolio-toolbar glass-card">
          <!-- Search Input -->
          <div class="search-box">
            <Search :size="18" class="search-icon" />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="ค้นหาชื่อผลงาน, รายละเอียด หรือแท็ก เช่น Vue 3, Supabase, E-Commerce, ERP..."
              class="search-input"
            />
            <button
              v-if="searchQuery"
              class="clear-btn"
              @click="searchQuery = ''"
              title="ล้างคำค้นหา"
            >
              <X :size="16" />
            </button>
          </div>

          <!-- Category Pills -->
          <div class="category-pills">
            <button
              v-for="cat in categoriesList"
              :key="cat"
              class="cat-pill"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Content Subheader (Display Only) -->
        <div class="content-header">
          <div class="header-left">
            <h3 class="portfolio-subheading font-tech">
              <span>รายการผลงาน</span>
              <span class="count-badge">{{ filteredProjects.length }}</span>
            </h3>
            <p class="section-desc">
              {{ activeCategory === 'ทั้งหมด' ? 'แสดงผลงานทั้งหมดในคลัง' : `หมวดหมู่: ${activeCategory}` }}
            </p>
          </div>
        </div>

        <!-- Skeleton loading -->
        <div v-if="isLoading" class="projects-grid">
          <div v-for="n in 6" :key="n" class="skeleton-card glass-card" :style="{ '--i': n }">
            <div class="sk sk-media"></div>
            <div class="sk-body">
              <div class="sk sk-line w70"></div>
              <div class="sk sk-line"></div>
              <div class="sk sk-line w50"></div>
              <div class="sk sk-btn"></div>
            </div>
          </div>
        </div>

        <!-- Projects Grid (Display Only: isAdmin="false") -->
        <TransitionGroup v-else-if="filteredProjects.length > 0" name="grid" tag="div" class="projects-grid">
          <ProjectCard
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            :project="project"
            :isAdmin="false"
            :style="{ '--i': Math.min(index, 8) }"
          />
        </TransitionGroup>

        <!-- Empty State (Display Only) -->
        <div v-else class="empty-state glass-card">
          <div class="empty-icon-box">
            <Layers :size="44" class="empty-icon" />
          </div>
          <h3 class="empty-title">ไม่พบผลงานที่ตรงกับเงื่อนไข</h3>
          <p class="empty-desc">
            {{ searchQuery ? `ไม่พบผลงานที่มีคำว่า "${searchQuery}"` :
              'ยังไม่มีผลงานในหมวดหมู่นี้ กำลังเตรียมอัปเดตผลงานใหม่เร็วๆ นี้' }}
          </p>
          <div v-if="searchQuery" class="empty-actions">
            <button class="btn btn-secondary" @click="searchQuery = ''">ล้างคำค้นหา</button>
          </div>
        </div>
      </section>

      <!-- 6. Section: ช่องทางการติดต่อ (Contact) -->
      <ContactSection @notify="showToast" />

      <!-- 7. Footer -->
      <footer class="app-footer">
        <div class="container footer-inner">
          <div class="footer-brand">
            <div class="footer-logo-row">
              <img src="/img/logo.png" alt="B2N Logo" class="footer-logo-img" />
              <div>
                <div class="brand-text font-tech">
                  <span class="text-b">B</span><span class="text-2">2</span><span class="text-n">N</span>
                  <span class="footer-badge">Dev Service</span>
                </div>
                <span class="footer-copy">
                  © 2026 Creative Tech &amp; Fullstack Engineering Solutions
                  <a href="/ModeAdminNakubEiEi" @click.prevent="goToAdmin" class="secret-admin-link" title="ระบบจัดการผลงาน">⚙️</a>
                </span>
              </div>
            </div>
          </div>

          <div class="footer-nav-links">
            <a href="#intro" @click.prevent="scrollTo('intro')">บทนำ</a>
            <a href="#services" @click.prevent="scrollTo('services')">บริการ</a>
            <a href="#team" @click.prevent="scrollTo('team')">สมาชิก</a>
            <a href="#portfolio" @click.prevent="scrollTo('portfolio')">ผลงาน</a>
            <a href="#contact" @click.prevent="scrollTo('contact')">ติดต่อเรา</a>
          </div>

          <div class="footer-tags">
            <span class="footer-pill">Vue 3</span>
            <span class="footer-pill">Supabase</span>
            <span class="footer-pill">Web Applications</span>
            <span class="footer-pill">Realtime DB</span>
          </div>
        </div>
      </footer>
    </div>

    <!-- Toast Notifications -->
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
        <CheckCircle2 v-if="toast.type === 'success'" :size="18" class="toast-icon success" />
        <AlertTriangle v-else :size="18" class="toast-icon error" />
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.public-view {
  display: flex;
  flex-direction: column;
  padding-top: 72px;
}

/* Portfolio Section */
.portfolio-section {
  padding: 5rem 1.5rem 4rem;
}

.section-badge-wrap {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 3rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: #00f0ff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 1.1rem;
}

.sparkle-icon {
  color: var(--b2n-cyan);
}

.section-title {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.7;
}

/* Portfolio Toolbar */
.portfolio-toolbar {
  max-width: 980px;
  margin: 0 auto 2.5rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  border-color: rgba(0, 240, 255, 0.2);
}

.search-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.15rem;
  color: var(--b2n-cyan);
  pointer-events: none;
}

.search-input {
  width: 100%;
  background: rgba(6, 10, 22, 0.75);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.85rem 3rem 0.85rem 3.1rem;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--b2n-cyan);
  box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.2), 0 0 20px rgba(0, 240, 255, 0.15);
  background: rgba(6, 10, 22, 0.95);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: var(--text-muted);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fff;
}

.category-pills {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.cat-pill {
  padding: 0.48rem 1.1rem;
  border-radius: var(--radius-full);
  background: rgba(14, 23, 44, 0.6);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.cat-pill:hover {
  background: rgba(20, 34, 64, 0.85);
  color: var(--text-main);
  border-color: rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

.cat-pill.active {
  background: linear-gradient(135deg, #00d2ff 0%, #0070f3 100%);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(0, 160, 255, 0.45);
  font-weight: 700;
  transform: translateY(-2px);
}

/* Content Header */
.content-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.portfolio-subheading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.count-badge {
  font-size: 0.85rem;
  background: rgba(0, 240, 255, 0.15);
  color: #00f0ff;
  padding: 0.15rem 0.65rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(0, 240, 255, 0.35);
  font-family: inherit;
}

.section-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.header-right-actions {
  display: flex;
  gap: 0.75rem;
}

/* Grid Layout */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.85rem;
}

.grid-enter-active,
.grid-leave-active {
  transition: all 0.45s var(--ease-out);
}

.grid-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}

.grid-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

.grid-move {
  transition: transform 0.45s var(--ease-spring);
}

/* Skeleton Loading */
.skeleton-card {
  height: 380px;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.sk {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.04) 25%, rgba(255, 255, 255, 0.09) 50%, rgba(255, 255, 255, 0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}

.sk-media { height: 190px; }
.sk-body { padding: 1.4rem; display: flex; flex-direction: column; gap: 0.8rem; }
.sk-line { height: 14px; border-radius: 4px; }
.sk-line.w70 { width: 70%; height: 20px; }
.sk-line.w50 { width: 50%; }
.sk-btn { height: 38px; border-radius: var(--radius-md); margin-top: auto; }

/* Empty State */
.empty-state {
  padding: 4.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 560px;
  margin: 2rem auto;
}

.empty-icon-box {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--text-dim);
}

.empty-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.75rem;
  line-height: 1.55;
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
}

/* Footer */
.app-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-subtle);
  background: rgba(5, 8, 19, 0.95);
  padding: 2.5rem 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-logo-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.footer-logo-img {
  width: 46px;
  height: 46px;
  object-fit: contain;
  background: transparent;
  filter: drop-shadow(0 2px 10px rgba(0, 240, 255, 0.4));
}

.footer-badge {
  font-size: 0.72rem;
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.3rem;
}

.brand-text {
  font-size: 1.05rem;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.text-b { color: var(--b2n-cyan); }
.text-2 { color: var(--b2n-gold); }
.text-n { color: var(--b2n-green); }

.footer-copy {
  font-size: 0.8rem;
  color: var(--text-dim);
  display: block;
  margin-top: 0.2rem;
}

.footer-nav-links {
  display: flex;
  gap: 1.25rem;
}

.footer-nav-links a {
  font-size: 0.86rem;
  color: var(--text-muted);
  transition: var(--transition);
}

.footer-nav-links a:hover {
  color: var(--b2n-cyan);
}

.footer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-pill {
  font-size: 0.74rem;
  padding: 0.22rem 0.7rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-dim);
  transition: var(--transition);
}

.footer-pill:hover {
  color: var(--b2n-cyan);
  border-color: rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

/* Toast */
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 9999;
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.3rem;
  background: rgba(9, 15, 30, 0.95);
  border: 1px solid var(--border-card);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  color: var(--text-main);
  font-size: 0.9rem;
}

.toast.success {
  border-left: 3px solid #00f5a0;
}

.toast.error {
  border-left: 3px solid #ef4444;
}

.toast-icon.success { color: #00f5a0; }
.toast-icon.error { color: #ef4444; }

.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s var(--ease-spring);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

.secret-admin-link {
  display: inline-block;
  opacity: 0.25;
  margin-left: 0.5rem;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.3s;
}

.secret-admin-link:hover {
  opacity: 1;
  transform: rotate(45deg) scale(1.15);
}
</style>