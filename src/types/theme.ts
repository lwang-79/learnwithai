// 1. import `extendTheme` function
import { extendTheme, StyleFunctionProps, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({ 
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.600', 'whiteAlpha.700')(props),
        bg: mode('gray.50', 'gray.800')(props),
        lineHeight: 'base',
      },
    }),
  },
  fonts: {
    heading: 'Roboto Mono, Open Sans, sans-serif',
    body: 'Roboto Mono, Open Sans, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight:'regular',
        rounded: 'full',
      },
      defaultProps: {
        colorScheme: 'teal',
        variant: 'outline'
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'teal'
      }
    },
    Radio: {
      defaultProps: {
        colorScheme: 'teal'
      }
    }
  },
})

export default theme