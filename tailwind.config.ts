/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme.js'
import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'

export const screens = {
    '3xs': '21em',
    '2xs': '23em',
    xs: '25.625em',
    sm: '30em',
    'sm-md': '35em',
    md: '43.125em',
    lg: '54.875em',
    xl: '79.6875em',
    '2xl': '90em',
    '3xl': '100em',
    max: '1848px'
}

/**
 * Font Scale
 * Can be adjusted using the link below.
 * @link https://utopia.fyi/type/calculator?c=320,14,1.2,1848,16,1.38,6,0,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12
 */
export default {
    future: {
        hoverOnlyWhenSupported: true
    },
    content: [
        './assets/scss/**/*.scss',
        './pages/**/*.{js,vue}',
        './components/**/*.{js,vue}',
        './src/**/*.svg'
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans]
        },
        fontSize: {
            /* Step -1: 14.17px → 16.00px */
            sm: [
                'clamp(0.89rem, calc(0.86rem + 0.14vw), 1.00rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            /* Step 0: 17.00px → 21.33px */
            base: [
                'clamp(1.06rem, calc(1.00rem + 0.33vw), 1.33rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            /* Step 1: 20.40px → 28.43px */
            md: [
                'clamp(1.28rem, calc(1.15rem + 0.61vw), 1.78rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            /* Step 2: 24.48px → 37.90px */
            lg: [
                'clamp(1.53rem, calc(1.33rem + 1.02vw), 2.37rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            /* Step 3: 29.38px → 50.52px */
            xl: [
                'clamp(1.84rem, calc(1.52rem + 1.60vw), 3.16rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            /* Step 4: 35.25px → 67.35px */
            '2xl': [
                'clamp(2.20rem, calc(1.72rem + 2.43vw), 4.21rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ],
            /* Step 5: 42.30px → 89.77px */
            '3xl': [
                'clamp(2.64rem, calc(1.92rem + 3.60vw), 5.61rem)',
                {
                    lineHeight: 'calc(100% + 10px)'
                }
            ]
        },
        screens: screens,
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                inherit: 'inherit',
                // Generate shades from a base colour: https://www.tailwindshades.com/
                blue: {
                    DEFAULT: '#0053A0',
                    50: '#F2F6FA',
                    100: '#E6EEF6',
                    200: '#BFD4E7',
                    300: '#99BAD9',
                    400: '#4D87BD',
                    500: '#0053A0',
                    600: '#004B90',
                    700: '#003260',
                    800: '#002548',
                    900: '#001930'
                },
                green: {
                    DEFAULT: '#6abe46',
                    '50': '#FAFCF5',
                    '100': '#F4FAEB',
                    '200': '#DFF0C9',
                    '300': '#CAE6AC',
                    '400': '#9CD477',
                    '500': '#6abe46',
                    '600': '#5AAD39',
                    '700': '#438F28',
                    '800': '#2E7319',
                    '900': '#1E570F',
                    '950': '#103806'
                }
            },
            aspectRatio: {
                landscape: '383 / 235',
                '2/3': '2 / 3'
            },
            spacing: {
                '1/2': '50%',
                '3/2': '150%',
                '1/3': '33.333333%',
                '2/3': '66.666667%',
                '1/4': '25%',
                '2/4': '50%',
                '3/4': '75%',
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
                '1/6': '16.666667%',
                '2/6': '33.333333%',
                '3/6': '50%',
                '4/6': '66.666667%',
                '5/6': '83.333333%',
                '1/12': '8.333333%',
                '2/12': '16.666667%',
                '3/12': '25%',
                '4/12': '33.333333%',
                '5/12': '41.666667%',
                '6/12': '50%',
                '7/12': '58.333333%',
                '8/12': '66.666667%',
                '9/12': '75%',
                '10/12': '83.333333%',
                '11/12': '91.666667%',
                full: '100%',
                max: '999em',
                '50vw': '50vw',
                '25vh': '25vh',
                '50vh': '50vh',
                '75vh': '75vh'
            },
            zIndex: {
                '-1': -1
            },
            inset: {
                ...defaultTheme.spacing
            },
            maxWidth: {
                ...defaultTheme.screen,
                ...defaultTheme.spacing,
                max: 'max-content'
            },
            minWidth: {
                ...defaultTheme.spacing
            },
            maxHeight: {
                ...defaultTheme.screen,
                ...defaultTheme.spacing,
                none: 'none'
            },
            minHeight: {
                ...defaultTheme.spacing
            },
            gridTemplateRows: {
                0: 'repeat(1, minmax(0, 0fr));'
            },
            transitionDuration: {
                DEFAULT: '500ms'
            }
        }
    },
    plugins: [containerQueries, forms],
    corePlugins: {
        container: false,
        preflight: true
    }
}
