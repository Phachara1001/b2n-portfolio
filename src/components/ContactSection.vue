<script setup>
import { ref } from 'vue'
import { 
  ArrowUpRight,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Copy,
  Check
} from 'lucide-vue-next'

const emit = defineEmits(['notify'])

const copied = ref(false)
const fbUrl = 'https://www.facebook.com/prachwit.tlemmungpan.2024'

function copyLink() {
  navigator.clipboard.writeText(fbUrl)
  copied.value = true
  emit('notify', 'คัดลอกลิงก์ Facebook สำเร็จแล้ว!', 'success')
  setTimeout(() => {
    copied.value = false
  }, 2500)
}
</script>

<template>
  <section id="contact" class="contact-section reveal-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-badge-wrap">
        <div class="section-badge">
          <MessageCircle :size="14" class="sparkle-icon" />
          <span class="font-tech">GET IN TOUCH</span>
        </div>
        <h2 class="section-title">
          ช่องทางการติดต่อ <span class="gradient-text font-tech">B2N Dev Service</span>
        </h2>
        <p class="section-subtitle">
          พร้อมเริ่มต้นโปรเจกต์ใหม่ หรือต้องการคำปรึกษาและประเมินราคา สามารถติดต่อผู้ประสานงานโครงการได้โดยตรง
        </p>
      </div>

      <!-- Single Centered Official Contact Card (Facebook Only) -->
      <div class="contact-card-wrapper">
        <div class="info-card glass-card">
          <div class="ae-header-badge font-tech">
            <span>OFFICIAL CONTACT PERSON</span>
          </div>

          <!-- Profile Showcase -->
          <div class="ae-profile-box">
            <div class="ae-photo-wrapper">
              <img src="/img/prachwit.png" alt="Prachwit Tlemmungpan (Not)" class="ae-photo-img" />
            </div>
            <div class="ae-profile-details">
              <span class="ae-role-pill font-tech">Account Executive</span>
              <h3 class="ae-name-th">ปราชวิชญ์ เทียมเมืองแพน <span class="ae-nickname">( น็อต )</span></h3>
              <div class="ae-name-en font-tech">Prachwit Tlemmungpan ( Not )</div>
              <p class="ae-bio">
                ผู้ประสานงานโครงการและดูแลลูกค้า พร้อมให้คำปรึกษา แนะนำการทำเว็บไซต์ &amp; ระบบ Web Application ตลอดจนประเมินงบประมาณเบื้องต้นฟรี
              </p>
            </div>
          </div>

          <!-- Prominent Facebook Contact Button Card -->
          <a 
            :href="fbUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="facebook-action-card"
          >
            <div class="fb-icon-box">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div class="fb-content">
              <span class="fb-badge font-tech">DIRECT FACEBOOK CHAT</span>
              <div class="fb-title">ทักแชท Facebook เพื่อติดต่อสอบถาม / เริ่มโปรเจกต์</div>
              <div class="fb-url font-tech">facebook.com/prachwit.tlemmungpan.2024</div>
            </div>
            <div class="fb-arrow">
              <ArrowUpRight :size="22" />
            </div>
          </a>

          <!-- Quick Action Buttons -->
          <div class="contact-actions-row">
            <a 
              :href="fbUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary direct-open-btn"
            >
              <ExternalLink :size="16" />
              <span>เปิด Facebook ทันที</span>
            </a>
            <button 
              type="button" 
              class="btn btn-secondary copy-link-btn" 
              @click="copyLink"
            >
              <Check v-if="copied" :size="16" class="check-green" />
              <Copy v-else :size="16" />
              <span>{{ copied ? 'คัดลอกลิงก์แล้ว' : 'คัดลอกลิงก์ Facebook' }}</span>
            </button>
          </div>

          <!-- Service Guarantee Note -->
          <div class="service-note-box">
            <div class="note-row">
              <ShieldCheck :size="18" class="note-icon green" />
              <span>ประเมินขอบเขตงานและค่าใช้จ่ายเบื้องต้นฟรี ไม่มีข้อผูกมัด</span>
            </div>
            <div class="note-row">
              <Clock :size="18" class="note-icon cyan" />
              <span>ตอบกลับรวดเร็ว พร้อมนัดประชุมวางแผนความต้องการของโปรเจกต์</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 5rem 0 4.5rem;
  position: relative;
}

.section-badge-wrap {
  text-align: center;
  max-width: 780px;
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

/* Centered Single Card Wrapper */
.contact-card-wrapper {
  max-width: 720px;
  margin: 0 auto;
}

.info-card {
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(0, 240, 255, 0.25);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.12);
}

.ae-header-badge {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: var(--b2n-gold);
  background: rgba(255, 183, 3, 0.12);
  border: 1px solid rgba(255, 183, 3, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  width: fit-content;
  margin-bottom: 1.5rem;
}

/* Profile Box */
.ae-profile-box {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
}

.ae-photo-wrapper {
  width: 115px;
  height: 125px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: radial-gradient(circle, rgba(255, 183, 3, 0.22) 0%, rgba(11, 18, 36, 0.95) 80%);
  border: 1px solid rgba(255, 183, 3, 0.45);
  box-shadow: 0 0 25px rgba(255, 183, 3, 0.25);
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.ae-photo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
}

.ae-profile-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.ae-role-pill {
  font-size: 0.74rem;
  font-weight: 800;
  color: var(--b2n-gold);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.ae-name-th {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0.2rem 0;
  line-height: 1.3;
}

.ae-nickname {
  color: var(--b2n-cyan);
  font-weight: 700;
}

.ae-name-en {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 0.55rem;
}

.ae-bio {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Facebook Action Card */
.facebook-action-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.35rem 1.6rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(24, 119, 242, 0.22) 0%, rgba(13, 20, 38, 0.9) 100%);
  border: 1px solid rgba(24, 119, 242, 0.5);
  box-shadow: 0 12px 30px -5px rgba(24, 119, 242, 0.3);
  transition: all 0.35s var(--ease-spring);
  margin-bottom: 1.25rem;
  text-decoration: none;
}

.facebook-action-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: #1877f2;
  box-shadow: 0 18px 40px rgba(24, 119, 242, 0.5), 0 0 25px rgba(0, 240, 255, 0.35);
  background: linear-gradient(135deg, rgba(24, 119, 242, 0.38) 0%, rgba(13, 20, 38, 0.98) 100%);
}

.fb-icon-box {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: #1877f2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(24, 119, 242, 0.45);
  transition: transform 0.3s;
}

.facebook-action-card:hover .fb-icon-box {
  transform: scale(1.1) rotate(4deg);
}

.fb-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.fb-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: #60a5fa;
  letter-spacing: 0.6px;
}

.fb-title {
  font-size: 1.12rem;
  font-weight: 700;
  color: #fff;
  margin: 0.15rem 0;
}

.fb-url {
  font-size: 0.82rem;
  color: #93c5fd;
  word-break: break-all;
}

.fb-arrow {
  color: #93c5fd;
  transition: transform 0.3s;
}

.facebook-action-card:hover .fb-arrow {
  transform: translate(4px, -4px);
  color: #fff;
}

/* Action Buttons Row */
.contact-actions-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0.85rem;
  margin-bottom: 1.75rem;
}

.direct-open-btn, .copy-link-btn {
  padding: 0.85rem 1.2rem;
  justify-content: center;
  font-size: 0.92rem;
  text-decoration: none;
}

.check-green {
  color: #00f5a0;
}

/* Service Note Box */
.service-note-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.15rem 1.35rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.note-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.86rem;
  color: var(--text-muted);
}

.note-icon.green { color: #00f5a0; flex-shrink: 0; }
.note-icon.cyan { color: #00f0ff; flex-shrink: 0; }

@media (max-width: 650px) {
  .ae-profile-box {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .contact-actions-row {
    grid-template-columns: 1fr;
  }
  .info-card {
    padding: 1.75rem 1.25rem;
  }
  .facebook-action-card {
    flex-direction: column;
    text-align: center;
    gap: 0.85rem;
  }
  .fb-arrow {
    display: none;
  }
}
</style>
