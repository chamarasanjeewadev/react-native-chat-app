import colors from 'tailwindcss/colors'
console.log(colors.blue[200])
export const themes = {
  blue: {
    light: {
      '--primary': colors.blue[600],
      '--secondary': ' rgb(108, 117, 125)',
      '--success': ' rgb(40, 167, 69)',
      '--info': ' rgb(23, 162, 184)',
      '--warning': ' rgb(255, 193, 7)',
      '--danger': ' rgb(220, 53, 69)',
      '--light': ' rgb(248, 249, 250)',
      '--dark': ' rgb(52, 58, 64)',

      '--background': colors.white,
      '--muted': colors.slate[200],
      '--shadow': colors.emerald[100],
      '--text-primary': colors.slate[700],
      '--text-title': colors.blue[950],
      '--text-secondary': colors.white,
      '--text-muted': colors.slate[200],
      '--text-border': colors.slate[200],
      '--text-focus': colors.gray[300]
    },
    dark: {
      '--primary': ' rgb(37, 99, 235)',
      '--secondary': ' rgb(108, 117, 125)',
      '--success': ' rgb(40, 167, 69)',
      '--info': ' rgb(23, 162, 184)',
      '--warning': ' rgb(255, 193, 7)',
      '--danger': ' rgb(220, 53, 69)',
      '--light': ' rgb(248, 249, 250)',
      '--dark': ' rgb(52, 58, 64)',
      '--background': colors.gray[25],
      '--muted': ' rgb(52, 58, 64)',
      '--shadow': colors.emerald[100],
      '--text-primary': ' rgb(255,255,255)',
      '--text-title': colors.white,
      '--text-secondary': ' rgb(0, 0, 0)',
      '--text-muted': ' rgb(0, 0, 0)',
      '--text-border': ' rgb(0, 0, 0)',
      '--text-focus': colors.gray[300]
    }
  },
  orange: {
    light: {
      '--primary': colors.orange[400],
      '--secondary': ' rgb(108, 117, 125)',
      '--success': ' rgb(40, 167, 69)',
      '--info': ' rgb(23, 162, 184)',
      '--warning': ' rgb(255, 193, 7)',
      '--danger': ' rgb(220, 53, 69)',
      '--light': ' rgb(248, 249, 250)',
      '--dark': ' rgb(52, 58, 64)',
      '--muted': ' rgb(52, 58, 64)',
      '--text-primary': colors.slate[700],
      '--text-secondary': colors.white,
      '--text-muted': colors.slate[200],
      '--text-border': colors.slate[200],
      '--text-focus': colors.gray[300]
    },
    dark: {
      '--primary': ' rgb(0, 123, 255)',
      '--secondary': ' rgb(108, 117, 125)',
      '--success': ' rgb(40, 167, 69)',
      '--info': ' rgb(23, 162, 184)',
      '--warning': ' rgb(255, 193, 7)',
      '--danger': ' rgb(220, 53, 69)',
      '--light': ' rgb(248, 249, 250)',
      '--dark': ' rgb(52, 58, 64)',
      '--muted': ' rgb(52, 58, 64)',
      '--text-primary': ' rgb(0, 0, 0)',
      '--text-secondary': ' rgb(0, 0, 0)',
      '--text-muted': ' rgb(0, 0, 0)'
    }
  },
  pink: {
    light: {
      '--primary': colors.pink[600],
      '--secondary': ' rgb(255, 173, 186) ',
      '--success': ' rgb(40, 167, 69)',
      '--info': ' rgb(23, 162, 184)',
      '--warning': ' rgb(255, 193, 7)',
      '--danger': ' rgb(220, 53, 69)',
      '--light': ' rgb(248, 249, 250)',
      '--dark': ' rgb(52, 58, 64)',
      '--muted': ' rgb(52, 58, 64)',
      '--text-primary': colors.slate[700],
      '--text-secondary': colors.white,
      '--text-muted': colors.slate[200],
      '--text-border': colors.slate[200],
      '--text-focus': colors.gray[300]
    },
    dark: {
      '--primary': ' rgb(0, 123, 255)',
      '--secondary': ' rgb(108, 117, 125)',
      '--success': ' rgb(40, 167, 69)',
      '--info': ' rgb(23, 162, 184)',
      '--warning': ' rgb(255, 193, 7)',
      '--danger': ' rgb(220, 53, 69)',
      '--light': ' rgb(248, 249, 250)',
      '--dark': ' rgb(52, 58, 64)',
      '--muted': ' rgb(52, 58, 64)',
      '--text-primary': ' rgb(0, 0, 0)',
      '--text-secondary': ' rgb(0, 0, 0)',
      '--text-muted': ' rgb(0, 0, 0)'
    }
  }
}
