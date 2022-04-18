import { createTheme } from '@mui/material/styles';
import { blue, purple, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[200],
        },
        secondary: {
            main: purple[300],
        },
        error: {
            main: red[500],
        },
    },
});

export default theme;