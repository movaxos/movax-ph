import { clsx } from 'clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
