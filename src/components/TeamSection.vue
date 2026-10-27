<script setup>
import {
  Users,
  Github,
  Mail,
  Sparkles,
  ExternalLink
} from 'lucide-vue-next'

const teamMembers = [
  {
    name: 'Phachara Piasai',
    position: 'DEV',
    role: 'Fullstack / UX&UI',
    image: '/img/Phachara.png',
    theme: 'cyan',
    badge: 'Fullstack / UX&UI',
    description: 'เชี่ยวชาญการพัฒนา Web Application แบบ Fullstack ออกแบบประสบการณ์ผู้ใช้ (UX/UI) ที่สวยงาม ใช้งานง่าย และเชื่อมต่อระบบฐานข้อมูลได้อย่างมีประสิทธิภาพ',
    skills: ['Fullstack Web', 'UI/UX Design', 'Vue 3', 'Supabase', 'Tailwind CSS']
  },
  {
    name: 'Prachwit Tlemmungpan ( Not )',
    position: 'Account Executive',
    role: 'Project Manager & Client Relations',
    image: '/img/prachwit.png',
    theme: 'gold',
    badge: 'Account Executive',
    description: 'บริหารจัดการโครงการ ประสานงานความต้องการทางธุรกิจของลูกค้า วางแผนงบประมาณ และดูแลการส่งมอบงานให้ตรงเวลาตามเป้าหมาย ติดต่อได้โดยตรงทาง Facebook',
    skills: ['Client Relations', 'Project Planning', 'Requirements Analysis', 'Budgeting', 'Quality Assurance'],
  },
  {
    name: 'Thatchanon Rodwong',
    position: 'DEV',
    role: 'Fullstack / Backend',
    image: '/img/thatchanon.png',
    theme: 'red',
    badge: 'Fullstack / Backend',
    description: 'เชี่ยวชาญการพัฒนาระบบหลังบ้านความปลอดภัยสูง สถาปัตยกรรมฐานข้อมูล ERP/CRM และออกแบบ Cloud API สำหรับ Web Application',
    skills: ['Fullstack Web', 'Backend Architecture', 'Database ERP', 'Node.js', 'System Security']
  }
]
</script>

<template>
  <section id="team" class="team-section reveal-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-badge-wrap">
        <div class="section-badge">
          <Users :size="14" class="sparkle-icon" />
          <span class="font-tech">B2N CORE TEAM</span>
        </div>
        <h2 class="section-title">
          สมาชิกทีม <span class="gradient-text font-tech">B2N Dev Service</span>
        </h2>
        <p class="section-subtitle">
          ทีมนักพัฒนาและผู้เชี่ยวชาญพร้อมสร้างสรรค์ระบบงานคุณภาพสูง ตอบสนองทุกเป้าหมายธุรกิจของคุณ
        </p>
      </div>

      <!-- Team Members Grid -->
      <div class="team-grid">
        <div v-for="(member, index) in teamMembers" :key="index" class="team-card glass-card"
          :class="`theme-${member.theme}`">
          <!-- Full Character Portrait Showcase (No Circles, Bold & Prominent!) -->
          <div class="portrait-stage">
            <!-- Cyber Glow Aura Background -->
            <div class="stage-aura" :class="member.theme"></div>
            <div class="stage-grid"></div>

            <!-- Person Portrait Image -->
            <img :src="member.image" :alt="member.name" class="portrait-img" />

            <!-- Bottom Gradient Fade -->
            <div class="portrait-fade"></div>

            <!-- Badge floating at top right -->
            <span class="member-squad-badge font-tech">
              {{ member.badge }}
            </span>
          </div>

          <!-- Info Body -->
          <div class="member-info">
            <h3 class="member-name font-tech">{{ member.name }}</h3>

            <div class="member-position-pill">
              <span class="position-badge font-tech">{{ member.position }}</span>
            </div>

            <div class="member-role">{{ member.role }}</div>
            <p class="member-desc">{{ member.description }}</p>

            <!-- Skills -->
            <div class="skills-wrap">
              <span v-for="(skill, sIndex) in member.skills" :key="sIndex" class="skill-pill">
                {{ skill }}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 5rem 0 3.5rem;
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

/* Team Grid */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.team-card {
  padding: 1.25rem 1.25rem 1.8rem;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s var(--ease-spring), border-color 0.3s, box-shadow 0.4s;
}

.team-card:hover {
  transform: translateY(-10px);
}

.theme-cyan:hover {
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.25);
}

.theme-red:hover {
  border-color: rgba(239, 68, 68, 0.6);
  box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(239, 68, 68, 0.25);
}

.theme-gold:hover {
  border-color: rgba(255, 183, 3, 0.6);
  box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 183, 3, 0.25);
}

/* ---------- Portrait Stage (No Circles!) ---------- */
.portrait-stage {
  position: relative;
  width: 100%;
  height: 330px;
  border-radius: calc(var(--radius-lg) - 4px);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 60%, rgba(14, 23, 44, 0.9) 0%, rgba(6, 10, 22, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 1.4rem;
}

/* Cyber Glow Aura behind each person */
.stage-aura {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 220px;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  opacity: 0.6;
  transition: opacity 0.4s, transform 0.4s;
}

.stage-aura.cyan {
  background: radial-gradient(circle, #00f0ff 0%, #0066ff 60%, transparent 80%);
}

.stage-aura.red {
  background: radial-gradient(circle, #ef4444 0%, #b91c1c 60%, transparent 80%);
}

.stage-aura.gold {
  background: radial-gradient(circle, #ffb703 0%, #f97316 60%, transparent 80%);
}

.team-card:hover .stage-aura {
  opacity: 0.9;
  transform: translateX(-50%) scale(1.15);
}

/* Subtle digital grid backdrop */
.stage-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

/* The Full Person Image */
.portrait-img {
  position: relative;
  z-index: 2;
  width: 92%;
  height: 98%;
  object-fit: contain;
  object-position: center bottom;
  filter: drop-shadow(0 12px 25px rgba(0, 0, 0, 0.7));
  transition: transform 0.45s var(--ease-spring), filter 0.4s ease;
}

.team-card:hover .portrait-img {
  transform: scale(1.08) translateY(-6px);
}

.theme-cyan:hover .portrait-img {
  filter: drop-shadow(0 15px 30px rgba(0, 240, 255, 0.35));
}

.theme-red:hover .portrait-img {
  filter: drop-shadow(0 15px 30px rgba(239, 68, 68, 0.35));
}

.theme-gold:hover .portrait-img {
  filter: drop-shadow(0 15px 30px rgba(255, 183, 3, 0.35));
}

/* Gradient fade at bottom of stage to transition to text */
.portrait-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(11, 18, 36, 0.95) 0%, transparent 100%);
  z-index: 3;
  pointer-events: none;
}

/* Badge at top right */
.member-squad-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 4;
  background: rgba(6, 10, 22, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-card);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.theme-cyan .member-squad-badge {
  border-color: rgba(0, 240, 255, 0.5);
  color: #00f0ff;
}

.theme-red .member-squad-badge {
  border-color: rgba(239, 68, 68, 0.5);
  color: #fca5a5;
}

.theme-gold .member-squad-badge {
  border-color: rgba(255, 183, 3, 0.5);
  color: #fde047;
}

/* Info Body */
.member-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  padding: 0 0.5rem;
}

.member-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
  color: var(--text-main);
  letter-spacing: 0.3px;
}

.member-position-pill {
  margin-bottom: 0.5rem;
}

.position-badge {
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.22rem 0.8rem;
  border-radius: 6px;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  display: inline-block;
}

.theme-cyan .position-badge {
  background: rgba(0, 240, 255, 0.15);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
}

.theme-red .position-badge {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.4);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.25);
}

.theme-gold .position-badge {
  background: rgba(255, 183, 3, 0.15);
  color: #facc15;
  border: 1px solid rgba(255, 183, 3, 0.4);
  box-shadow: 0 0 12px rgba(255, 183, 3, 0.25);
}

.member-role {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.95rem;
}

.member-desc {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.35rem;
  flex-grow: 1;
}

.skills-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 1.4rem;
}

.skill-pill {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: #cbd5e1;
}

.member-fb-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  background: rgba(24, 119, 242, 0.15);
  border: 1px solid rgba(24, 119, 242, 0.45);
  color: #60a5fa;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s var(--ease-spring);
  margin-top: 0.3rem;
}

.member-fb-btn:hover {
  background: #1877f2;
  color: #fff;
  border-color: #1877f2;
  box-shadow: 0 0 15px rgba(24, 119, 242, 0.5);
  transform: translateY(-2px);
}

.member-footer {
  display: flex;
  gap: 0.65rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
  width: 100%;
  justify-content: center;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: var(--transition);
}

.social-btn:hover {
  background: rgba(0, 240, 255, 0.15);
  border-color: var(--b2n-cyan);
  color: #fff;
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin: 0 auto;
  }

  .portrait-stage {
    height: 360px;
  }
}
</style>
