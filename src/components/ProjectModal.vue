<script setup>
import { ref, computed, watch } from 'vue'
import { X, Link2, Sparkles, AlertCircle, Lock, Globe, ExternalLink } from 'lucide-vue-next'
import { categoriesList } from '../constants/categories'
import { getWebsitePreviewUrl, getDomain } from '../utils/preview'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  editingProject: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const title = ref('')
const url = ref('')
const github_url = ref('')
const description = ref('')
const category = ref('Web App')
const image_url = ref('')
const tagsInput = ref('')
const errors = ref({})
const isSubmitting = ref(false)
const modalImgError = ref(false)

const availableCategories = categoriesList.filter(c => c !== 'ทั้งหมด')

const domain = computed(() => getDomain(url.value))

const livePreviewUrl = computed(() => {
  if (modalImgError.value) return image_url.value || ''
  const preview = getWebsitePreviewUrl(url.value)
  return preview || image_url.value || ''
})

watch(
  () => props.editingProject,
  (proj) => {
    if (proj) {
      title.value = proj.title || ''
      url.value = proj.url || ''
      github_url.value = proj.github_url || ''
      description.value = proj.description || ''
      category.value = proj.category || 'Web App'
      image_url.value = proj.image_url || ''
      tagsInput.value = Array.isArray(proj.tags) ? proj.tags.join(', ') : ''
      modalImgError.value = false
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

watch(url, () => {
  modalImgError.value = false
})

function resetForm() {
  title.value = ''
  url.value = ''
  github_url.value = ''
  description.value = ''
  category.value = 'Web App'
  image_url.value = ''
  tagsInput.value = 'Vue 3, Supabase'
  errors.value = {}
  modalImgError.value = false
}

function validate() {
  errors.value = {}
  if (!title.value.trim()) {
    errors.value.title = 'กรุณากรอกชื่อผลงาน'
  }
  if (!url.value.trim()) {
    errors.value.url = 'กรุณาใส่ลิงก์ผลงาน (เช่น https://...)'
  } else if (!url.value.startsWith('http://') && !url.value.startsWith('https://')) {
    errors.value.url = 'ลิงก์ต้องขึ้นต้นด้วย http:// หรือ https://'
  }
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  isSubmitting.value = true
  try {
    // Automatically set image_url to live website preview
    const preview = getWebsitePreviewUrl(url.value)
    const projectData = {
      title: title.value,
      url: url.value,
      github_url: github_url.value,
      description: description.value,
      category: category.value,
      image_url: preview || image_url.value || '',
      tags: tagsInput.value
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    }
    emit('save', projectData)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
      <div class="modal-card glass-card">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">
              <span class="gradient-text">{{ editingProject ? 'แก้ไขข้อมูลผลงาน' : 'เพิ่มผลงานใหม่' }}</span>
            </h2>
            <p class="modal-subtitle">บันทึกชื่อและลิงก์ผลงาน ระบบจะดึงหน้า Preview ของเว็บไซต์มาใช้เป็นปกให้อัตโนมัติ</p>
          </div>
          <button class="close-btn" @click="emit('close')" aria-label="ปิด">
            <X :size="18" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group" style="--n: 0">
            <label class="form-label">ชื่อผลงาน (Project Title) <span class="required">*</span></label>
            <input v-model="title" type="text" placeholder="เช่น E-Commerce Store หรือ Logistics Management"
              class="form-input" :class="{ 'input-error': errors.title }" />
            <Transition name="err">
              <span v-if="errors.title" class="error-msg">
                <AlertCircle :size="13" /> {{ errors.title }}
              </span>
            </Transition>
          </div>

          <div class="form-group" style="--n: 1">
            <label class="form-label">ลิงก์เว็บไซต์ผลงาน (Website URL) <span class="required">*</span></label>
            <div class="input-with-icon">
              <Link2 :size="16" class="input-icon" />
              <input v-model="url" type="url" placeholder="https://example.com หรือ https://my-project.vercel.app"
                class="form-input with-icon" :class="{ 'input-error': errors.url }" />
            </div>
            <Transition name="err">
              <span v-if="errors.url" class="error-msg">
                <AlertCircle :size="13" /> {{ errors.url }}
              </span>
            </Transition>
          </div>

          <!-- Realtime Live Website Preview Frame -->
          <div class="form-group" style="--n: 2">
            <div class="preview-header-row">
              <label class="form-label">หน้าปกผลงาน (Live Preview จาก URL อัตโนมัติ)</label>
              <span class="preview-auto-badge font-tech">LIVE PREVIEW</span>
            </div>

            <div class="modal-browser-preview">
              <div class="modal-browser-bar">
                <div class="mac-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="modal-browser-url font-tech">
                  <Lock :size="9" class="lock-icon" />
                  <span>{{ domain }}</span>
                </div>
              </div>

              <div class="modal-browser-screen">
                <img 
                  v-if="livePreviewUrl" 
                  :src="livePreviewUrl" 
                  alt="Website Preview" 
                  class="modal-preview-img"
                  @error="modalImgError = true"
                />
                <div v-else class="modal-preview-empty">
                  <Globe :size="32" class="empty-globe" />
                  <span class="empty-tip">พิมพ์หรือวางลิงก์ผลงานด้านบน ระบบจะดึงหน้า Preview ของเว็บไซต์มาใช้เป็นปกให้อัตโนมัติ</span>
                </div>
              </div>
            </div>
            <p class="preview-hint">
              * ระบบใช้ภาพ Preview ของหน้าเว็บไซต์จริงจากลิงก์ผลงาน ไม่จำเป็นต้องอัปโหลดรูปภาพ
            </p>
          </div>

          <div class="form-row" style="--n: 3">
            <div class="form-group">
              <label class="form-label">หมวดหมู่ (Category)</label>
              <select v-model="category" class="form-input">
                <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">ลิงก์ GitHub / Repo (ทางเลือก)</label>
              <input v-model="github_url" type="url" placeholder="https://github.com/..." class="form-input" />
            </div>
          </div>

          <div class="form-group" style="--n: 4">
            <label class="form-label">คำอธิบายสั้นๆ (Description)</label>
            <textarea v-model="description" rows="3"
              placeholder="สรุปฟังก์ชันหลัก เช่น ออกแบบเว็บไซต์องค์กร หรือ Dashboard จัดการข้อมูลแบบ Realtime..."
              class="form-input"></textarea>
          </div>

          <div class="form-group" style="--n: 5">
            <label class="form-label">แท็กเทคโนโลยี (คั่นด้วยจุลภาค ",")</label>
            <input v-model="tagsInput" type="text" placeholder="Vue 3, Supabase, Tailwind, Node.js" class="form-input" />
          </div>

          <div class="form-footer">
            <button type="button" class="btn btn-secondary" @click="emit('close')">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <Sparkles :size="16" />
              <span>{{ editingProject ? 'บันทึกการแก้ไข' : 'เพิ่มผลงานทันที' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(3, 6, 16, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-card {
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(0, 240, 255, 0.35);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 240, 255, 0.2);
  animation: modalPop 0.4s var(--ease-spring);
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }
}

.modal-header {
  padding: 1.5rem 1.75rem 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.modal-title {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.2;
}

.modal-subtitle {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: var(--transition);
  flex-shrink: 0;
}

.close-btn:hover {
  color: #fff;
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.2);
}

.modal-form {
  padding: 1.5rem 1.75rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.modal-form>* {
  animation: fieldIn 0.55s var(--ease-out) backwards;
  animation-delay: calc(var(--n, 6) * 55ms + 120ms);
}

@keyframes fieldIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-main);
}

.required {
  color: var(--b2n-cyan);
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-card);
  background: rgba(8, 12, 24, 0.85);
  color: var(--text-main);
  font-size: 0.92rem;
  font-family: inherit;
  transition: var(--transition);
  outline: none;
}

.form-input.with-icon {
  padding-left: 2.6rem;
}

.form-input:focus {
  border-color: var(--b2n-cyan);
  box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.18);
  background: rgba(8, 12, 24, 0.95);
}

.input-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18) !important;
}

.error-msg {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #f87171;
  margin-top: 0.15rem;
}

/* Browser Live Preview in Modal */
.preview-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-auto-badge {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--b2n-cyan);
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.35);
  padding: 0.12rem 0.5rem;
  border-radius: 4px;
}

.modal-browser-preview {
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 240, 255, 0.25);
  background: #060a16;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
}

.modal-browser-bar {
  height: 28px;
  background: rgba(13, 20, 38, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.75rem;
}

.mac-dots {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #ffb703; }
.dot.green { background: #00f5a0; }

.modal-browser-url {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  color: #94a3b8;
  background: rgba(6, 10, 22, 0.85);
  padding: 0.1rem 0.6rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.lock-icon {
  color: #00f5a0;
}

.modal-browser-screen {
  height: 180px;
  background: #070c1b;
  position: relative;
  overflow: hidden;
}

.modal-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.modal-preview-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1.5rem;
  text-align: center;
  color: var(--text-muted);
}

.empty-globe {
  color: var(--b2n-cyan);
  opacity: 0.6;
}

.empty-tip {
  font-size: 0.78rem;
  max-width: 380px;
  line-height: 1.5;
}

.preview-hint {
  font-size: 0.74rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 0.2rem;
}

.form-footer {
  margin-top: 0.6rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>