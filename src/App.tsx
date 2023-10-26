import { Toaster } from "sonner";
import AppRoutes from "./presentation/routes/app.routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./app.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5e2cf5", // Cambia el color principal
        },
        secondary: {
            main: "#333", // Cambia el color secundario
        },
    },
});

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppRoutes />
                <Toaster />
            </ThemeProvider>
        </>
    );
};

export default App;
