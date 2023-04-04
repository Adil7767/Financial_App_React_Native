import color from "color";
import { DefaultTheme } from "styled-components";
import MyDefaultTheme from "./LightTheme";
import { black, white, pinkA100 } from "./colors";

const DarkTheme: DefaultTheme = {
    ...MyDefaultTheme,
    dark: true,
    mode: "adaptive",
    colors: {
        ...MyDefaultTheme.colors,
        primary: "#BB86FC",
        accent: "#03dac6",
        background: "#121212",
        surface: "#121212",
        error: "#CF6679",
        text: white,
        onBackground: "#FFFFFF",
        onSurface: "#FFFFFF",
        black: black,
        white: white,
        disabled: color(white).alpha(0.38).rgb().string(),
        placeholder: color(white).alpha(0.54).rgb().string(),
        backdrop: color(black).alpha(0.5).rgb().string(),
        notification: pinkA100,
    },
};

export default DarkTheme;
