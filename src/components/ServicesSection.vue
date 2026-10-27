<script setup>
import { 
  Monitor, 
  Settings, 
  Star, 
  Building2, 
  ShoppingBag, 
  TrendingUp, 
  Database, 
  Users, 
  Home, 
  Workflow, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-vue-next'

const emit = defineEmits(['contactClick', 'portfolioClick'])
</script>

<template>
  <section id="services" class="services-section reveal-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-badge-wrap">
        <div class="section-badge">
          <Sparkles :size="14" class="sparkle-icon" />
          <span class="font-tech">B2N SERVICES &amp; SOLUTIONS</span>
        </div>
        <h2 class="section-title">
          บริการของเรา <span class="gradient-text font-tech">B2N Dev Service</span>
        </h2>
        <p class="section-subtitle">
          รับพัฒนาเว็บไซต์ &amp; แอปพลิเคชัน ครบวงจร จบในที่เดียว ไม่ว่าคุณจะเริ่มต้นธุรกิจใหม่ หรือต้องการพัฒนาระบบเพื่อยกระดับองค์กร เราพร้อมออกแบบและพัฒนาตามความต้องการของคุณ
        </p>
      </div>

      <!-- Main Services 2-Column Grid -->
      <div class="services-grid">
        <!-- Service 1: Web Development -->
        <div class="service-card glass-card card-cyan">
          <div class="card-glow-pill cyan">
            <Monitor :size="24" class="icon-cyan" />
            <span class="font-tech">WEB DEVELOPMENT</span>
          </div>

          <h3 class="service-name">พัฒนาเว็บไซต์ทุกรูปแบบ</h3>
          <p class="service-desc">
            ออกแบบและสร้างสรรค์เว็บไซต์ที่สวยงาม ทันสมัย โหลดรวดเร็ว รองรับทุกขนาดหน้าจอ (Responsive) พร้อมระบบ SEO ที่มีประสิทธิภาพ
          </p>

          <ul class="feature-list">
            <li class="feature-item">
              <div class="feature-icon cyan">
                <Building2 :size="18" />
              </div>
              <div class="feature-text">
                <strong>เว็บไซต์บริษัท / องค์กร</strong>
                <span>ดีไซน์สวย ทันสมัย บ่งบอกภาพลักษณ์แบรนด์ รองรับมือถือ 100%</span>
              </div>
            </li>

            <li class="feature-item">
              <div class="feature-icon cyan">
                <ShoppingBag :size="18" />
              </div>
              <div class="feature-text">
                <strong>ระบบร้านค้าออนไลน์ E-commerce</strong>
                <span>แคตตาล็อกสินค้า ตะกร้าสินค้า ชำระเงิน และระบบจัดการสต็อก</span>
              </div>
            </li>

            <li class="feature-item">
              <div class="feature-icon cyan">
                <TrendingUp :size="18" />
              </div>
              <div class="feature-text">
                <strong>เซลล์เพจ (Sale Page) เพิ่มยอดขาย</strong>
                <span>หน้าขายสินค้าที่กระตุ้นการตัดสินใจ ปิดการขายง่าย พร้อมติดตั้งพิกเซล</span>
              </div>
            </li>
          </ul>

          <div class="service-footer">
            <button class="btn btn-secondary btn-sm" @click="emit('portfolioClick')">
              <span>ดูตัวอย่างงานเว็บ</span>
              <ArrowRight :size="15" />
            </button>
          </div>
        </div>

        <!-- Service 2: Web Application & Custom System -->
        <div class="service-card glass-card card-gold">
          <div class="card-glow-pill gold">
            <Settings :size="24" class="icon-gold" />
            <span class="font-tech">WEB APPLICATION &amp; CUSTOM SYSTEM</span>
          </div>

          <h3 class="service-name">ระบบเว็บแอปพลิเคชัน &amp; พัฒนาเฉพาะทาง</h3>
          <p class="service-desc">
            สร้างระบบสารสนเทศอัตโนมัติที่ช่วยลดขั้นตอนการทำงาน ลดข้อผิดพลาด และเพิ่มประสิทธิภาพให้ธุรกิจของคุณดำเนินงานได้อย่างราบรื่น
          </p>

          <ul class="feature-list">
            <li class="feature-item">
              <div class="feature-icon gold">
                <Database :size="18" />
              </div>
              <div class="feature-text">
                <strong>ระบบหลังบ้านจัดการข้อมูล (Dashboard &amp; Back-office)</strong>
                <span>จัดการผู้ใช้งาน ข้อมูลสินค้า วิเคราะห์ยอดขาย และรายงานสถิติแบบ Realtime</span>
              </div>
            </li>

            <li class="feature-item">
              <div class="feature-icon gold">
                <Users :size="18" />
              </div>
              <div class="feature-text">
                <strong>ระบบ ERP / CRM บริหารความสัมพันธ์ลูกค้า</strong>
                <span>เก็บบันทึกประวัติลูกค้า การสั่งซื้อ และการบริการหลังการขายอย่างเป็นระบบ</span>
              </div>
            </li>

            <li class="feature-item">
              <div class="feature-icon gold">
                <Home :size="18" />
              </div>
              <div class="feature-text">
                <strong>ระบบจัดการหอพัก / อสังหาริมทรัพย์</strong>
                <span>ออกบิลค่าเช่า ค่าน้ำ-ไฟ แจ้งเตือนยอดค้างชำระ และสถานะห้องพัก</span>
              </div>
            </li>

            <li class="feature-item">
              <div class="feature-icon gold">
                <Workflow :size="18" />
              </div>
              <div class="feature-text">
                <strong>ระบบเฉพาะทางตามกระบวนการทำงานของธุรกิจ</strong>
                <span>ออกแบบฟังก์ชันตามขั้นตอนการทำงานจริง (Custom Workflow) ใช้งานง่ายตรงจุด</span>
              </div>
            </li>
          </ul>

          <div class="service-footer">
            <button class="btn btn-secondary btn-sm" @click="emit('contactClick')">
              <span>ปรึกษาการทำระบบ</span>
              <ArrowRight :size="15" />
            </button>
          </div>
        </div>
      </div>

      <!-- Why Choose Us Banner -->
      <div class="why-us-box glass-card">
        <div class="why-us-header">
          <div class="why-icon-badge">
            <Star :size="22" class="star-icon" />
          </div>
          <div>
            <h3 class="why-title font-tech">ทำไมต้องเลือกเรา? B2N Dev Service</h3>
            <p class="why-subtitle">มาตรฐานการพัฒนาที่ใส่ใจในทุกรายละเอียด พร้อมเคียงข้างธุรกิจคุณ</p>
          </div>
        </div>

        <div class="why-reasons-grid">
          <div class="reason-card">
            <div class="reason-icon green">
              <CheckCircle2 :size="24" />
            </div>
            <div class="reason-content">
              <h4>ออกแบบตรงโจทย์ งบไม่บานปลาย</h4>
              <p>วิเคราะห์ความต้องการอย่างละเอียดก่อนเริ่มพัฒนา เสนอทางเลือกที่คุ้มค่าที่สุด ชัดเจนในขอบเขตงานและงบประมาณ</p>
            </div>
          </div>

          <div class="reason-card">
            <div class="reason-icon cyan">
              <ShieldCheck :size="24" />
            </div>
            <div class="reason-content">
              <h4>โค้ดสะอาด ปลอดภัย รองรับอนาคต</h4>
              <p>พัฒนาด้วย Clean Code สถาปัตยกรรมที่ได้มาตรฐาน รองรับการขยายตัว (Scalability) และปลอดภัยตามมาตรฐานสากล</p>
            </div>
          </div>

          <div class="reason-card">
            <div class="reason-icon gold">
              <Clock :size="24" />
            </div>
            <div class="reason-content">
              <h4>ส่งงานตรงเวลา มีทีมดูแลหลังการขาย</h4>
              <p>รายงานความคืบหน้าอย่างต่อเนื่อง ส่งมอบระบบตรงตามกำหนด พร้อมทีมงานคอยช่วยเหลือและให้คำปรึกษาตลอดการใช้งาน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  padding: 5rem 0 3rem;
  position: relative;
}

.section-badge-wrap {
  text-align: center;
  max-width: 820px;
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
  color: #ffb703;
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

/* Services 2-Column Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3.5rem;
}

.service-card {
  padding: 2.2rem 2.2rem 1.8rem;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  transition: transform 0.35s var(--ease-spring), border-color 0.3s;
}

.service-card:hover {
  transform: translateY(-6px);
}

.card-cyan:hover {
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow: 0 20px 45px rgba(0, 240, 255, 0.18);
}

.card-gold:hover {
  border-color: rgba(255, 183, 3, 0.6);
  box-shadow: 0 20px 45px rgba(255, 183, 3, 0.18);
}

.card-glow-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 1.4rem;
  width: fit-content;
}

.card-glow-pill.cyan {
  background: rgba(0, 240, 255, 0.12);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.35);
}

.card-glow-pill.gold {
  background: rgba(255, 183, 3, 0.12);
  color: #ffb703;
  border: 1px solid rgba(255, 183, 3, 0.35);
}

.service-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.65rem;
}

.service-desc {
  font-size: 0.94rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.8rem;
}

/* Feature List */
.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-icon.cyan {
  background: rgba(0, 240, 255, 0.1);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.25);
}

.feature-icon.gold {
  background: rgba(255, 183, 3, 0.1);
  color: #ffb703;
  border: 1px solid rgba(255, 183, 3, 0.25);
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.feature-text strong {
  font-size: 0.98rem;
  color: var(--text-main);
  font-weight: 600;
}

.feature-text span {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.service-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

/* ---------- Why Choose Us Box ---------- */
.why-us-box {
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  border-color: rgba(0, 245, 160, 0.25);
  background: linear-gradient(135deg, rgba(11, 18, 36, 0.85) 0%, rgba(9, 15, 30, 0.95) 100%);
}

.why-us-header {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.why-icon-badge {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: rgba(255, 183, 3, 0.15);
  border: 1px solid rgba(255, 183, 3, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(255, 183, 3, 0.25);
}

.star-icon {
  color: #ffb703;
}

.why-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-main);
}

.why-subtitle {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.why-reasons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.reason-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.reason-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reason-icon.green {
  background: rgba(0, 245, 160, 0.12);
  color: #00f5a0;
  border: 1px solid rgba(0, 245, 160, 0.3);
}

.reason-icon.cyan {
  background: rgba(0, 240, 255, 0.12);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.reason-icon.gold {
  background: rgba(255, 183, 3, 0.12);
  color: #ffb703;
  border: 1px solid rgba(255, 183, 3, 0.3);
}

.reason-content h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--text-main);
}

.reason-content p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  .why-reasons-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
