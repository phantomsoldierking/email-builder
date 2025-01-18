import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const template = await request.json()
    
    // Create HTML with inline styles
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${template.title}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            max-width: 200px;
          }
          .title {
            text-align: center;
            margin-bottom: 30px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${template.logo ? `
            <div class="logo">
              <img src="${template.logo}" alt="Logo">
            </div>
          ` : ''}
          
          <h1 class="title">${template.title}</h1>
          
          ${template.sections.map((section: { styles: { fontFamily: any; fontSize: any; color: any; textAlign: any; isBold: any; isItalic: any; isUnderline: any }; type: string; content: any }) => `
            <div style="
              font-family: ${section.styles.fontFamily};
              font-size: ${section.styles.fontSize}px;
              color: ${section.styles.color};
              text-align: ${section.styles.textAlign};
              font-weight: ${section.styles.isBold ? 'bold' : 'normal'};
              font-style: ${section.styles.isItalic ? 'italic' : 'normal'};
              text-decoration: ${section.styles.isUnderline ? 'underline' : 'none'};
              margin-bottom: 20px;
            ">
              ${section.type === 'text' ? `
                <p>${section.content}</p>
              ` : section.type === 'button' ? `
                <a href="#" style="
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #000;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                ">${section.content}</a>
              ` : `
                <img src="${section.content}" alt="" style="max-width: 100%;">
              `}
            </div>
          `).join('')}
          
          <div class="footer">
            ${template.footer}
          </div>
        </div>
      </body>
      </html>
    `
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename=email-template.html'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error rendering template' },
      { status: 500 }
    )
  }
}

