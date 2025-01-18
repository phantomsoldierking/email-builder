import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const config = await request.json()
    
    // Generate a unique filename
    const configString = JSON.stringify(config)
    const fileHash = crypto.createHash('md5').update(configString).digest('hex')
    const fileName = `template-${fileHash}.json`

    // Get the templates directory path
    const templatesDir = path.join(process.cwd(), 'public', 'templates')
    const filePath = path.join(templatesDir, fileName)

    // Write the configuration file
    await writeFile(filePath, configString, 'utf-8')

    return NextResponse.json({ 
      success: true,
      path: `/templates/${fileName}`,
      message: 'Template configuration saved successfully'
    })
  } catch (error) {
    console.error('Error saving configuration:', error)
    return NextResponse.json(
      { error: 'Error saving configuration' },
      { status: 500 }
    )
  }
}