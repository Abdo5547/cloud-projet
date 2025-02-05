import * as React from 'react';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

const lightTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#3925ea", // Couleur principale (bleu vibrant)
        },
        secondary: {
          main: "#f48aa8", // Couleur secondaire (rose clair)
        },
        background: {
          default: "#f0effe", // Couleur de fond (lavande claire)
        },
        text: {
          primary: "#060322", // Couleur du texte (presque noir)
        },
        accent: {
          main: "#ee6b48", // Couleur accent (orange rougeâtre)
        },
      },
    },
  },
});

export default function App() {
  return (
    <CssVarsProvider theme={lightTheme}>
      <ColorSchemeToggle />
    </CssVarsProvider>
  );
}

function ColorSchemeToggle(props) {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }

  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      sx={[
        mode === 'dark'
          ? { '& > *:first-child': { display: 'none' } }
          : { '& > *:first-child': { display: 'initial' } },
        mode === 'light'
          ? { '& > *:last-child': { display: 'none' } }
          : { '& > *:last-child': { display: 'initial' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  );
}
