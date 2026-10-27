<script setup>
import { ref } from 'vue'
import { 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-vue-next'

const emit = defineEmits(['notify'])

const formName = ref('')
const formContact = ref('')
const formService = ref('Web Development')
const formMessage = ref('')
const isSubmitted = ref(false)

function handleSubmit() {
  if (!formName.value || !formContact.value) {
    emit('notify', 'กรุณากรอกชื่อและข้อมูลติดต่อให้ครบถ้วน', 'error')
    return
  }

  isSubmitted.value = true
  emit('notify', 'ส่งข้อความเรียบร้อยแล้ว! ทีมงาน B2N จะติดต่อกลับโดยเร็วที่สุด', 'success')

  setTimeout(() => {
    formName.value = ''
    formContact.value = ''
    formService.value = 'Web Development'
    formMessage.value = ''
    isSubmitted.value = false
  }, 3000)
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

      <div class="contact-grid">
        <!-- Left: Official Contact Person Card (Prachwit Facebook) -->
        <div class="contact-info-col">
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
              href="https://www.facebook.com/prachwit.tlemmungpan.2024" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="facebook-action-card"
            >
              <div class="fb-icon-box">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div class="fb-content">
                <span class="fb-badge font-tech">DIRECT FACEBOOK CHAT</span>
                <div class="fb-title">ทักแชท Facebook เพื่อติดต่อสอบถาม</div>
                <div class="fb-url font-tech">facebook.com/prachwit.tlemmungpan.2024</div>
              </div>
              <div class="fb-arrow">
                <ArrowUpRight :size="20" />
              </div>
            </a>

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

        <!-- Right: Inquiry Form -->
        <div class="contact-form-col">
          <div class="form-card glass-card">
            <h3 class="form-card-title font-tech">หรือฝากรายละเอียดโปรเจกต์ไว้ที่นี่</h3>
            <p class="form-card-desc">กรอกข้อมูลความต้องการเพื่อให้ทีมงาน B2N เตรียมข้อเสนอและติดต่อกลับ</p>

            <form @submit.prevent="handleSubmit" class="inquiry-form">
              <div class="form-group">
                <label class="form-label">ชื่อของคุณ หรือชื่อองค์กร / บริษัท *</label>
                <input 
                  v-model="formName" 
                  type="text" 
                  placeholder="เช่น คุณสมชาย (บริษัท ตัวอย่าง จำกัด)"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">เบอร์โทรศัพท์ หรือ LINE ID / Facebook สำหรับติดต่อกลับ *</label>
                <input 
                  v-model="formContact" 
                  type="text" 
                  placeholder="เช่น 081-234-5678 หรือ facebook.com/..."
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">บริการที่สนใจ</label>
                <select v-model="formService" class="form-input">
                  <option value="Web Development">พัฒนาเว็บไซต์องค์กร / บริษัท / เซลล์เพจ</option>
                  <option value="E-Commerce">ระบบร้านค้าออนไลน์ E-Commerce</option>
                  <option value="Web Application">ระบบเว็บแอปพลิเคชัน / Dashboard หลังบ้าน</option>
                  <option value="ERP / CRM">ระบบ ERP / CRM / บริหารจัดการหอพัก</option>
                  <option value="Custom System">ระบบเฉพาะทางตามกระบวนการทำงาน (Custom System)</option>
                  <option value="Other">บริการอื่นๆ (ตามสั่ง)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">รายละเอียดความต้องการเพิ่มเติม</label>
                <textarea 
                  v-model="formMessage" 
                  rows="4" 
                  placeholder="บอกเล่าความต้องการ เช่น มีกี่หน้า อยากได้ฟังก์ชันอะไร งบประมาณที่ตั้งไว้ หรือมีเว็บไซต์อ้างอิง..."
                  class="form-input"
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary submit-btn" 
                :disabled="isSubmitted"
              >
                <CheckCircle2 v-if="isSubmitted" :size="18" />
                <Send v-else :size="18" />
                <span>{{ isSubmitted ? 'ส่งข้อมูลเรียบร้อยแล้ว' : 'ส่งข้อความถึงทีมงาน B2N' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 5rem 0 4rem;
  position: relative;
}

.section-badge-wrap {
  text-align: center;
  max-width: 780px;
  margin: 0 auto 3.5rem;
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

/* 2 Columns Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
}

.info-card, .form-card {
  padding: 2.2rem;
  border-radius: var(--radius-lg);
  height: 100%;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 1.4rem;
}

/* Profile Box */
.ae-profile-box {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  margin-bottom: 1.8rem;
}

.ae-photo-wrapper {
  width: 100px;
  height: 110px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: radial-gradient(circle, rgba(255, 183, 3, 0.2) 0%, rgba(11, 18, 36, 0.9) 80%);
  border: 1px solid rgba(255, 183, 3, 0.4);
  box-shadow: 0 0 20px rgba(255, 183, 3, 0.2);
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
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--b2n-gold);
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.ae-name-th {
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0.15rem 0;
  line-height: 1.3;
}

.ae-nickname {
  color: var(--b2n-cyan);
  font-weight: 700;
}

.ae-name-en {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.ae-bio {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
}

/* Facebook Action Card */
.facebook-action-card {
  display: flex;
  align-items: center;
  gap: 1.15rem;
  padding: 1.25rem 1.4rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(24, 119, 242, 0.2) 0%, rgba(13, 20, 38, 0.85) 100%);
  border: 1px solid rgba(24, 119, 242, 0.45);
  box-shadow: 0 10px 25px -5px rgba(24, 119, 242, 0.25);
  transition: all 0.35s var(--ease-spring);
  margin-bottom: 1.5rem;
  text-decoration: none;
}

.facebook-action-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: #1877f2;
  box-shadow: 0 15px 35px rgba(24, 119, 242, 0.45), 0 0 20px rgba(0, 240, 255, 0.3);
  background: linear-gradient(135deg, rgba(24, 119, 242, 0.35) 0%, rgba(13, 20, 38, 0.95) 100%);
}

.fb-icon-box {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  background: #1877f2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(24, 119, 242, 0.4);
  transition: transform 0.3s;
}

.facebook-action-card:hover .fb-icon-box {
  transform: scale(1.08) rotate(3deg);
}

.fb-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.fb-badge {
  font-size: 0.68rem;
  font-weight: 800;
  color: #60a5fa;
  letter-spacing: 0.5px;
}

.fb-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0.1rem 0;
}

.fb-url {
  font-size: 0.8rem;
  color: #93c5fd;
  word-break: break-all;
}

.fb-arrow {
  color: #93c5fd;
  transition: transform 0.3s;
}

.facebook-action-card:hover .fb-arrow {
  transform: translate(3px, -3px);
  color: #fff;
}

/* Service Note Box */
.service-note-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.15rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  margin-top: auto;
}

.note-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.83rem;
  color: var(--text-muted);
}

.note-icon.green { color: #00f5a0; flex-shrink: 0; }
.note-icon.cyan { color: #00f0ff; flex-shrink: 0; }

/* Right Form */
.form-card-title {
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--text-main);
}

.form-card-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 1.8rem;
  line-height: 1.55;
}

.inquiry-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-main);
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(6, 10, 22, 0.8);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.92rem;
  outline: none;
  transition: var(--transition);
}

.form-input:focus {
  border-color: var(--b2n-cyan);
  box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.2);
  background: rgba(6, 10, 22, 0.95);
}

select.form-input option {
  background: #090e1d;
}

.submit-btn {
  padding: 0.9rem;
  font-size: 0.95rem;
  margin-top: 0.4rem;
}

@media (max-width: 950px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
