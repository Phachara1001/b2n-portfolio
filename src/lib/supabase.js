import { createClient } from '@supabase/supabase-js'
import { getWebsitePreviewUrl } from '../utils/preview'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ตรวจสอบว่ามีการใส่ Supabase URL และ Key ที่ถูกต้องหรือไม่
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-public-key' &&
  !supabaseUrl.includes('your-project-id')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * ดึงรายการผลงานทั้งหมดจาก Supabase
 */
export async function fetchProjects() {
  if (!supabase) {
    return { data: [], source: 'unconfigured', error: 'กรุณาใส่ Supabase URL และ Key ใน .env' }
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      return { data: [], source: 'supabase', error: error.message }
    }
    return { data: data || [], source: 'supabase', error: null }
  } catch (err) {
    console.error('Network / Supabase error:', err)
    return { data: [], source: 'supabase', error: err.message }
  }
}

/**
 * เพิ่มผลงานใหม่ลง Supabase
 */
export async function addProject(project) {
  if (!supabase) throw new Error('Supabase ยังไม่ได้เชื่อมต่อ')

  const preview = getWebsitePreviewUrl(project.url)
  const payload = {
    title: project.title.trim(),
    url: project.url.trim(),
    description: (project.description || '').trim(),
    category: project.category || 'Web App',
    image_url: (project.image_url || preview || '').trim(),
    github_url: (project.github_url || '').trim(),
    tags: Array.isArray(project.tags) ? project.tags : (project.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([payload])
    .select()

  if (error) throw new Error(error.message)
  return data?.[0]
}

/**
 * ลบผลงานจาก Supabase
 */
export async function deleteProject(id) {
  if (!supabase) throw new Error('Supabase ยังไม่ได้เชื่อมต่อ')

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  return true
}

/**
 * แก้ไขผลงานใน Supabase
 */
export async function updateProject(id, project) {
  if (!supabase) throw new Error('Supabase ยังไม่ได้เชื่อมต่อ')

  const preview = getWebsitePreviewUrl(project.url)
  const payload = {
    title: project.title.trim(),
    url: project.url.trim(),
    description: (project.description || '').trim(),
    category: project.category || 'Web App',
    image_url: (project.image_url || preview || '').trim(),
    github_url: (project.github_url || '').trim(),
    tags: Array.isArray(project.tags) ? project.tags : (project.tags || '').split(',').map(t => t.trim()).filter(Boolean)
  }

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()

  if (error) throw new Error(error.message)
  return data?.[0]
}
