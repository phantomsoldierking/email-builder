// utils/template-renderer.ts
import { EmailTemplate, EmailSection } from '../types/email-template'

export function generateHTML(template: EmailTemplate): string {
  const sectionToHTML = (section: EmailSection): string => {
    const styles = {
      fontFamily: section.styles.fontFamily,
      fontSize: section.styles.fontSize === 'base' ? '16px' : section.styles.fontSize,
      color: section.styles.color,
      backgroundColor: section.styles.backgroundColor,
      textAlign: section.styles.textAlign,
      fontWeight: section.styles.isBold ? 'bold' : 'normal',
      fontStyle: section.styles.isItalic ? 'italic' : 'normal',
      textDecoration: section.styles.isUnderline ? 'underline' : 'none',
      textTransform: section.styles.textTransform,
      padding: '10px',
      margin: '0'
    }

    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join(';')

    return `<div style="${styleString}">${section.content}</div>`
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.title}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: ${template.backgroundColor};">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
        <h1 style="text-align: center; color: #333333;">${template.title}</h1>
        ${template.sections.map(section => sectionToHTML(section)).join('\n')}
        <footer style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666666;">
            ${template.footer}
        </footer>
    </div>
</body>
</html>`

  return html
}