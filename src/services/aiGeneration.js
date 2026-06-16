// TODO: Replace mock with Fal.ai API (fal-ai/flux-pro) or Stability AI
// Input: { imageFile, style, productCategory, colors }
// Output: { generatedImageUrl, thumbnailUrl }

import { sleep } from '../lib/utils'

// Mock placeholder images for different styles
const stylePlaceholders = {
  'hero-dramatic': 'https://images.pexels.com/photos/932261/pexels-photo-932261.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'lifestyle-scene': 'https://images.pexels.com/photos/2536967/pexels-photo-2536967.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'flat-lay-editorial': 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'floating-3d': 'https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'luxury-gold': 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'nature-organic': 'https://images.pexels.com/photos/6469/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'minimalist-clean': 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'social-media-ready': 'https://images.pexels.com/photos/2615245/pexels-photo-2615245.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'cinematic-scene': 'https://images.pexels.com/photos/2877338/pexels-photo-2877338.jpeg?auto=compress&cs=tinysrgb&w=2048',
  'seasonal': 'https://images.pexels.com/photos/7034128/pexels-photo-7034128.jpeg?auto=compress&cs=tinysrgb&w=2048',
}

export async function generateShowcase(params) {
  const { imageFile, style, productCategory, colors } = params

  // MOCK: simulate 3-5 second generation
  const generationTime = 3000 + Math.random() * 2000
  await sleep(generationTime)

  // In real implementation, this would call Fal.ai or Stability AI API
  const placeholderUrl = stylePlaceholders[style] || stylePlaceholders['minimalist-clean']

  const result = {
    generatedImageUrl: placeholderUrl,
    thumbnailUrl: placeholderUrl.replace('w=2048', 'w=512'),
    style: style,
    metadata: {
      generationTime: `${Math.round(generationTime / 1000)}s`,
      productCategory,
      colors: colors || [],
    },
    // Social media crops (in real implementation, these would be actual crops)
    socialMediaCrops: {
      square: placeholderUrl.replace('w=2048', 'w=1024&h=1024&fit=crop'),
      vertical: placeholderUrl.replace('w=2048', 'w=1080&h=1920&fit=crop'),
      horizontal: placeholderUrl.replace('w=2048', 'w=1920&h=1080&fit=crop'),
    },
  }

  return result
}

// Batch generation for multiple styles
export async function generateMultipleShowcases(params) {
  const { imageFile, styles, productCategory, colors, onProgress } = params

  const results = []

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i]

    if (onProgress) {
      onProgress({
        style,
        index: i,
        total: styles.length,
        status: 'processing',
      })
    }

    try {
      const result = await generateShowcase({
        imageFile,
        style,
        productCategory,
        colors,
      })

      results.push(result)

      if (onProgress) {
        onProgress({
          style,
          index: i,
          total: styles.length,
          status: 'completed',
          result,
        })
      }
    } catch (error) {
      if (onProgress) {
        onProgress({
          style,
          index: i,
          total: styles.length,
          status: 'failed',
          error: error.message,
        })
      }
    }
  }

  return results
}

// TODO: Implement actual API call
/*
export async function generateShowcase(params) {
  const formData = new FormData()
  formData.append('image', params.imageFile)
  formData.append('style', params.style)
  formData.append('category', params.productCategory)

  const response = await fetch('/api/generate', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Generation failed')
  }

  return response.json()
}
*/
