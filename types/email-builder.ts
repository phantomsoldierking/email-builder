export interface ComponentBase {
    id: string
    type: 'text' | 'image' | 'button' | 'divider'
    position: { x: number; y: number }
  }
  
  export interface TextComponent extends ComponentBase {
    type: 'text'
    content: string
    styles: {
      fontSize: string
      fontFamily: string
      color: string
      backgroundColor: string
      textAlign: 'left' | 'center' | 'right'
      fontWeight: 'normal' | 'bold'
      fontStyle: 'normal' | 'italic'
      textDecoration: 'none' | 'underline'
    }
  }
  
  export interface ImageComponent extends ComponentBase {
    type: 'image'
    src: string
    alt: string
    styles: {
      width: string
      height: string
      objectFit: 'contain' | 'cover' | 'fill'
    }
  }
  
  export interface ButtonComponent extends ComponentBase {
    type: 'button'
    text: string
    link: string
    styles: {
      backgroundColor: string
      color: string
      padding: string
      borderRadius: string
      fontSize: string
      fontFamily: string
      width: 'auto' | 'full'
    }
  }
  
  export interface DividerComponent extends ComponentBase {
    type: 'divider'
    styles: {
      borderStyle: 'solid' | 'dashed' | 'dotted'
      borderWidth: string
      borderColor: string
      margin: string
    }
  }
  
  export type Component = TextComponent | ImageComponent | ButtonComponent | DividerComponent
  
  export interface Layout {
    id: string
    name: string
    template: {
      rows: number
      cols: number
      areas: string[]
    }
  }
  
  export interface GeneralSettings {
    backgroundColor: string
    backgroundImage?: string
    contentWidth: number
    alignment: 'left' | 'center' | 'right'
    underlineLinks: boolean
    responsiveDesign: boolean
    rtl: boolean
    padding: {
      desktop: number
      tablet: number
      mobile: number
    }
  }
  
  export interface EmailTemplate {
    layout: Layout
    components: Component[]
    settings: GeneralSettings
  }
  
  