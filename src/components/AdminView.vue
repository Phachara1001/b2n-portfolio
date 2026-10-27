<script setup>
import { ref, computed } from 'vue'
import {
  FolderPlus,
  ArrowLeft,
  Search,
  X,
  ExternalLink,
  Github,
  Edit3,
  Trash2,
  Database,
  CheckCircle2,
  ShieldAlert,
  Layers,
  Sparkles,
  Calendar,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-vue-next'
import ProjectModal from './ProjectModal.vue'
import SupabaseGuideModal from './SupabaseGuideModal.vue'
import { getWebsitePreviewUrl, getDomain } from '../utils/preview'

const props = defineProps({
  projects: { type: Array, required: true },
  isConfigured: { type: Boolean, default: false },
  categories: { type: Array, default: () => [] }
})

const emit = defineEmits([
  'goHome',
  'addProject',
  'updateProject',
  'deleteProject',
  'notify'
])

const searchQuery = ref('')
const selectedCategory = ref('ทั้งหมด')
const isModalOpen = ref(false)
const isGuideModalOpen = ref(false)
const editingProject = ref(null)

const filteredProjects = computed(() => {
  return props.projects.filter(p => {
    const matchCat = selectedCategory.value === 'ทั้งหมด' || p.category === selectedCategory.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchCat

    const matchTitle = (p.title || '').toLowerCase().includes(q)
    const matchDesc = (p.description || '').toLowerCase().includes(q)
    const matchTags = (p.tags || []).some(t => t.toLowerCase().includes(q))
    const matchCatName = (p.category || '').toLowerCase().includes(q)

    return matchCat && (matchTitle || matchDesc || matchTags || matchCatName)
  })
})

function openAddModal() {
  editingProject.value = null
  isModalOpen.value = true
}

function openEditModal(project) {
  editingProject.value = project
  isModalOpen.value = true
}

function handleDelete(project) {
  if (confirm(`คุณต้องการลบผลงาน "${project.title}" ใช่หรือไม่?`)) {
    emit('deleteProject', project.id)
  }
}

function handleSaveProject(data) {
  if (editingProject.value) {
    emit('updateProject', { id: editingProject.value.id, ...data })
  } else {
    emit('addProject', data)
  }
  isModalOpen.value = false
  editingProject.value = null
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  try {
    return new Date(dateStr).toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div class="admin-view">
    <!-- Top Admin Header -->
    <header class="admin-header">
      <div class="container admin-header-inner">
        <div class="admin-brand">
          <button class="btn btn-secondary back-btn" @click="emit('goHome')" title="กลับไปยังหน้าหลักสำหรับแสดงผล">
            <ArrowLeft :size="18" />
            <span>ดูหน้าหลัก</span>
          </button>

          <div class="brand-info">
            <div class="brand-title-row">
              <img src="/img/logo.png" alt="B2N Logo" class="admin-logo-img" />
              <h1 class="admin-title font-tech">B2N Dev Service <span class="admin-tag">Admin Mode</span></h1>
            </div>
            <div class="secret-route-badge font-tech">
              <ShieldAlert :size="13" />
              <span>Route: /ModeAdminNakubEiEi (ระบบจัดการผลงาน ไม่ต้องล็อกอิน)</span>
            </div>
          </div>
        </div>

        <div class="admin-top-actions">
          <!-- Supabase Status -->
          <button 
            v-if="isConfigured" 
            class="status-pill status-connected" 
            @click="isGuideModalOpen = true"
            title="เชื่อมต่อ Supabase สำเร็จ คลิกเพื่อดูรายละเอียด"
          >
            <span class="live-dot ok"></span>
            <CheckCircle2 :size="14" />
            <span>Supabase Active</span>
          </button>
          <button 
            v-else 
            class="status-pill status-mock" 
            @click="isGuideModalOpen = true"
            title="ทำงานในโหมด Mock LocalStorage (คลิกเพื่อดูวิธีเชื่อมต่อ Supabase จริง)"
          >
            <span class="live-dot mock"></span>
            <Database :size="14" />
            <span>Mock Mode (LocalStorage)</span>
          </button>

          <!-- Primary Add Button -->
          <button class="btn btn-primary add-project-btn" @click="openAddModal">
            <FolderPlus :size="18" />
            <span>+ เพิ่มผลงานใหม่</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="container admin-content">
      <!-- Quick Stats & Info Bar -->
      <section class="admin-stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-icon-wrap cyan">
            <Layers :size="22" />
          </div>
          <div class="stat-meta">
            <span class="stat-label">ผลงานทั้งหมดในระบบ</span>
            <span class="stat-num font-tech">{{ projects.length }} <small>โปรเจกต์</small></span>
          </div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon-wrap gold">
            <SlidersHorizontal :size="22" />
          </div>
          <div class="stat-meta">
            <span class="stat-label">หมวดหมู่ทั้งหมด</span>
            <span class="stat-num font-tech">{{ categories.length - 1 }} <small>หมวด</small></span>
          </div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon-wrap green">
            <Database :size="22" />
          </div>
          <div class="stat-meta">
            <span class="stat-label">สถานะฐานข้อมูล</span>
            <span class="stat-status-text font-tech" :class="isConfigured ? 'green' : 'gold'">
              {{ isConfigured ? 'Supabase Database' : 'Mock LocalStorage' }}
            </span>
          </div>
          <button class="stat-link-btn" @click="isGuideModalOpen = true">
            ตั้งค่า / ตรวจสอบ
          </button>
        </div>
      </section>

      <!-- Management Toolbar -->
      <section class="toolbar-section glass-card">
        <div class="toolbar-top">
          <!-- Search Box -->
          <div class="admin-search-box">
            <Search :size="18" class="search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="ค้นหาชื่อผลงาน, แท็ก, หรือคำอธิบาย..."
              class="admin-search-input"
            />
            <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
              <X :size="16" />
            </button>
          </div>

          <!-- Add Project Button inside toolbar -->
          <button class="btn btn-primary btn-sm" @click="openAddModal">
            <FolderPlus :size="16" />
            <span>เพิ่มผลงาน</span>
          </button>
        </div>

        <!-- Category Filter Pills -->
        <div class="category-filter-row">
          <span class="filter-label">กรองตามหมวดหมู่:</span>
          <div class="category-pills">
            <button 
              v-for="cat in categories" 
              :key="cat"
              class="cat-pill"
              :class="{ active: selectedCategory === cat }"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </section>

      <!-- Projects Management List / Cards -->
      <section class="projects-list-section">
        <div class="list-header">
          <h2 class="list-title font-tech">
            รายการผลงาน ({{ filteredProjects.length }} จาก {{ projects.length }})
          </h2>
          <span class="list-sub">คลิกปุ่ม "แก้ไข" หรือ "ลบ" เพื่อจัดการผลงานแต่ละชิ้น</span>
        </div>

        <!-- Project Cards Grid in Admin Mode -->
        <div v-if="filteredProjects.length" class="admin-grid">
          <div 
            v-for="p in filteredProjects" 
            :key="p.id" 
            class="admin-project-card glass-card"
          >
            <!-- Card Media & Overlay: Live Website Preview -->
            <div class="card-media-box">
              <div class="admin-browser-bar">
                <div class="mac-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="admin-domain-text">{{ getDomain(p.url) }}</span>
              </div>
              <div class="admin-media-inner">
                <img 
                  v-if="p.url" 
                  :src="getWebsitePreviewUrl(p.url) || p.image_url" 
                  :alt="p.title" 
                  class="media-thumb" 
                  loading="lazy"
                  @error="$event.target.style.display = 'none'"
                />
                <div v-else class="media-thumb-placeholder">
                  <Layers :size="32" />
                </div>
                <span class="card-category-badge">{{ p.category || 'General' }}</span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="card-info-box">
              <div class="card-header-row">
                <h3 class="project-title">{{ p.title }}</h3>
                <span class="project-date">
                  <Calendar :size="12" />
                  {{ formatDate(p.created_at) }}
                </span>
              </div>

              <p class="project-desc">{{ p.description || 'ไม่มีคำอธิบาย' }}</p>

              <!-- Tags -->
              <div v-if="p.tags && p.tags.length" class="tags-row">
                <span v-for="(tag, idx) in p.tags" :key="idx" class="tag-badge">
                  #{{ tag }}
                </span>
              </div>

              <!-- Links Row -->
              <div class="links-row">
                <a 
                  v-if="p.url" 
                  :href="p.url" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="link-pill live"
                  title="เปิดดูเว็บผลงานจริง"
                >
                  <ExternalLink :size="13" />
                  <span>{{ p.url.replace(/^https?:\/\//, '') }}</span>
                </a>
                <a 
                  v-if="p.github_url" 
                  :href="p.github_url" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="link-pill github"
                  title="เปิดดู GitHub Repo"
                >
                  <Github :size="13" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>

            <!-- Card Actions (Edit & Delete) -->
            <div class="card-action-bar">
              <button 
                class="btn btn-secondary btn-sm edit-btn" 
                @click="openEditModal(p)"
                title="แก้ไขข้อมูลผลงานนี้"
              >
                <Edit3 :size="15" />
                <span>แก้ไข</span>
              </button>
              <button 
                class="btn btn-danger btn-sm delete-btn" 
                @click="handleDelete(p)"
                title="ลบผลงานนี้ออกจากระบบ"
              >
                <Trash2 :size="15" />
                <span>ลบ</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="admin-empty-box glass-card">
          <Layers :size="48" class="empty-icon" />
          <h3 class="empty-title">ไม่พบผลงานที่ตรงกับเงื่อนไขการค้นหา</h3>
          <p class="empty-desc">
            {{ searchQuery ? `ไม่มีผลงานที่มีคำว่า "${searchQuery}"` : 'ยังไม่มีผลงานในระบบ คุณสามารถคลิกเพิ่มผลงานใหม่ได้ทันที' }}
          </p>
          <button class="btn btn-primary" @click="openAddModal">
            <FolderPlus :size="18" />
            <span>+ เพิ่มผลงานใหม่</span>
          </button>
        </div>
      </section>
    </main>

    <!-- Modals -->
    <ProjectModal 
      :isOpen="isModalOpen" 
      :editingProject="editingProject" 
      @close="isModalOpen = false; editingProject = null" 
      @save="handleSaveProject" 
    />

    <SupabaseGuideModal 
      :isOpen="isGuideModalOpen" 
      :isConfigured="isConfigured" 
      @close="isGuideModalOpen = false" 
    />
  </div>
</template>

<style scoped>
.admin-view {
  min-height: 100vh;
  background-color: var(--bg-deep);
  background-image: 
    radial-gradient(ellipse at 20% 0%, rgba(0, 240, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 10%, rgba(255, 183, 3, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 60%, rgba(13, 20, 38, 0.6) 0%, transparent 80%);
  padding-bottom: 5rem;
}

/* Header */
.admin-header {
  position: sticky;
  top: 0;
  z-index: 90;
  background: rgba(6, 10, 22, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  padding: 0.85rem 0;
}

.admin-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding: 0.5rem 0.9rem;
}

.admin-logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.brand-title-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.admin-title {
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-tag {
  font-size: 0.72rem;
  font-weight: 800;
  background: rgba(255, 183, 3, 0.15);
  border: 1px solid rgba(255, 183, 3, 0.4);
  color: #ffb703;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.secret-route-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.admin-top-actions {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

/* Status Pill */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
}

.status-connected {
  background: rgba(0, 245, 160, 0.12);
  color: #00f5a0;
  border-color: rgba(0, 245, 160, 0.4);
}

.status-mock {
  background: rgba(255, 183, 3, 0.12);
  color: #ffb703;
  border-color: rgba(255, 183, 3, 0.4);
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.live-dot.ok { background: #00f5a0; box-shadow: 0 0 6px #00f5a0; }
.live-dot.mock { background: #ffb703; box-shadow: 0 0 6px #ffb703; }

.add-project-btn {
  padding: 0.55rem 1.15rem;
  font-size: 0.9rem;
}

/* Content Area */
.admin-content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Stats */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.stat-card {
  padding: 1.35rem 1.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
}

.stat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrap.cyan {
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: var(--b2n-cyan);
}

.stat-icon-wrap.gold {
  background: rgba(255, 183, 3, 0.12);
  border: 1px solid rgba(255, 183, 3, 0.3);
  color: var(--b2n-gold);
}

.stat-icon-wrap.green {
  background: rgba(0, 245, 160, 0.12);
  border: 1px solid rgba(0, 245, 160, 0.3);
  color: var(--b2n-green);
}

.stat-meta {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.stat-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.1;
}

.stat-num small {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.stat-status-text {
  font-size: 1rem;
  font-weight: 700;
}
.stat-status-text.green { color: #00f5a0; }
.stat-status-text.gold { color: #ffb703; }

.stat-link-btn {
  margin-left: auto;
  font-size: 0.75rem;
  padding: 0.3rem 0.65rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
}

.stat-link-btn:hover {
  background: rgba(0, 240, 255, 0.15);
  border-color: var(--b2n-cyan);
  color: #fff;
}

/* Toolbar */
.toolbar-section {
  padding: 1.35rem 1.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toolbar-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}

.admin-search-box {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-grow: 1;
  background: rgba(6, 10, 22, 0.85);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.65rem 1rem;
  transition: var(--transition);
}

.admin-search-box:focus-within {
  border-color: var(--b2n-cyan);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.2);
}

.search-icon {
  color: var(--text-muted);
}

.admin-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-main);
  width: 100%;
  font-size: 0.92rem;
  font-family: inherit;
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.clear-btn:hover {
  color: #fff;
}

.category-filter-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

.category-pills {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.cat-pill {
  font-size: 0.78rem;
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
}

.cat-pill:hover {
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.2);
}

.cat-pill.active {
  background: rgba(0, 240, 255, 0.16);
  border-color: var(--b2n-cyan);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

/* List Section */
.projects-list-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.list-header {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.list-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
}

.list-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Admin Grid */
.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
}

.admin-project-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.admin-project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.15);
}

.card-media-box {
  position: relative;
  height: 200px;
  background: #090e1d;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
}

.admin-browser-bar {
  height: 28px;
  background: rgba(13, 20, 38, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  z-index: 2;
}

.mac-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #ffb703; }
.dot.green { background: #00f5a0; }

.admin-domain-text {
  font-size: 0.68rem;
  color: #94a3b8;
  font-family: inherit;
  background: rgba(5, 8, 19, 0.8);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.admin-media-inner {
  position: relative;
  height: calc(100% - 28px);
  width: 100%;
  overflow: hidden;
  background: #060a16;
}

.media-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s ease;
}

.admin-project-card:hover .media-thumb {
  transform: translateY(-5%) scale(1.02);
}

.media-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--b2n-cyan);
  background: linear-gradient(135deg, #090e1d, #141c38);
}

.card-category-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(6, 10, 22, 0.85);
  border: 1px solid var(--border-subtle);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--b2n-cyan);
  backdrop-filter: blur(8px);
}

.card-info-box {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.65rem;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
}

.project-date {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.project-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  color: #94a3b8;
  border: 1px solid var(--border-subtle);
}

.links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.link-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  transition: var(--transition);
}

.link-pill:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.25);
}

.link-pill.live {
  color: var(--b2n-cyan);
  border-color: rgba(0, 240, 255, 0.3);
}

.link-pill.live:hover {
  background: rgba(0, 240, 255, 0.15);
}

/* Card Action Bar */
.card-action-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  padding: 0.85rem 1.25rem 1.1rem;
  border-top: 1px solid var(--border-subtle);
  background: rgba(6, 10, 22, 0.4);
}

.edit-btn {
  width: 100%;
  justify-content: center;
  gap: 0.4rem;
}

.delete-btn {
  width: 100%;
  justify-content: center;
  gap: 0.4rem;
}

.btn-danger {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #f87171;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: var(--transition);
}

.btn-danger:hover {
  background: #ef4444;
  color: #fff;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
}

/* Empty Box */
.admin-empty-box {
  padding: 4rem 2rem;
  text-align: center;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  color: var(--b2n-cyan);
  opacity: 0.7;
}

.empty-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-main);
}

.empty-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  max-width: 480px;
}

@media (max-width: 900px) {
  .admin-header-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .admin-stats-grid {
    grid-template-columns: 1fr;
  }
  .admin-grid {
    grid-template-columns: 1fr;
  }
}
</style>
