import { extendTheme } from '@mui/joy/styles';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';


const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#e3d5ff",
          100: "#b8a9ff",
          200: "#8d7dff",
          300: "#6251ff",
          400: "#4f3dff",
          500: "#3925ea",
          600: "#2f1fd6",
          700: "#2619c1",
          800: "#1c13ac",
          900: "#130e97"
        },
        warning: {
          50: "#fce6d2",
          100: "#f9b8a0",
          200: "#f5956f",
          300: "#f4723d",
          400: "#f15f1b",
          500: "#ee6b48",
          600: "#e24e2e",
          700: "#d13414",
          800: "#b92a00",
          900: "#9e1f00"
        },
        danger: {
          50: "#fef0f2",
          100: "#fbd2d9",
          200: "#f8b3c0",
          300: "#f694a7",
          400: "#f48aa8",
          500: "#f57e8f",
          600: "#e14c82",
          700: "#c94470",
          800: "#b03c5f",
          900: "#9a3355"
        }
      }
    },
    dark: {
      palette: {}
    }
  },
  components: {
    JoyListItemButton: {
      styleOverrides: {
        root: {
            [`&.${listItemButtonClasses.selected}`]: {
              backgroundColor: "#fef0f2", // Remplacez par la couleur souhaitée
            },
        },
      },
    },
  },
});

export default theme;
