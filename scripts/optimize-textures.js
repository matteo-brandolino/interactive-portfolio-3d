#!/usr/bin/env node

import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readdirSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const texturesDir = join(__dirname, '../public/textures')

console.log('🖼️  Optimizing textures...\n')

const files = readdirSync(texturesDir)
  .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))

let totalSavings = 0

for (const file of files) {
  const inputPath = join(texturesDir, file)
  const fileNameWithoutExt = file.replace(/\.(jpg|jpeg|png)$/i, '')
  const webpPath = join(texturesDir, `${fileNameWithoutExt}.webp`)

  const originalSize = statSync(inputPath).size

  try {
    // Convert to WebP with quality 80
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath)

    const webpSize = statSync(webpPath).size
    const savings = originalSize - webpSize
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1)

    totalSavings += savings

    console.log(`✓ ${file}`)
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(webpSize / 1024 / 1024).toFixed(2)}MB (${savingsPercent}% reduction)`)

    // Also create a compressed JPG fallback for critical textures
    if (file.includes('grass_color') || originalSize > 200 * 1024) {
      const compressedJpgPath = join(texturesDir, `${fileNameWithoutExt}_compressed.jpg`)

      await sharp(inputPath)
        .jpeg({ quality: 75, progressive: true })
        .toFile(compressedJpgPath)

      const compressedSize = statSync(compressedJpgPath).size
      console.log(`  Fallback JPG: ${(compressedSize / 1024 / 1024).toFixed(2)}MB`)
    }

    console.log()
  } catch (err) {
    console.error(`✗ Failed to convert ${file}:`, err.message)
  }
}

console.log(`\n🎉 Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)}MB\n`)
