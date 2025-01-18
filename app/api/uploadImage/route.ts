import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Generate a unique filename
    const buffer = Buffer.from(await image.arrayBuffer())
    const fileHash = crypto.createHash('md5').update(buffer).digest('hex')
    const originalName = image.name
    const extension = path.extname(originalName)
    const fileName = `${fileHash}${extension}`

    // Get the public directory path
    const publicDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(publicDir, fileName)

    // Process the image with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(800, 800, { fit: 'inside' })
      .jpeg({ quality: 80 })
      .toBuffer()

    // Write the file
    await writeFile(filePath, optimizedBuffer)

    // Return the public URL
    return NextResponse.json({ 
      url: `/uploads/${fileName}`,
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Error processing image' },
      { status: 500 }
    )
  }
}