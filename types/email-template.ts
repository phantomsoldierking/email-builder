// types/email-template.ts
export interface EmailStyles {
    fontFamily: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
    textAlign: string;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    textTransform: string;
  }
  
  export interface EmailSection {
    id: string;
    type: string;
    content: string;
    styles: EmailStyles;
  }
  
  export interface EmailTemplate {
    title: string;
    sections: EmailSection[];
    footer: string;
    backgroundColor: string;
  }
  
  export interface TemplateFile {
    name: string;
    path: string;
    content: EmailTemplate;
    createdAt: Date;
  }