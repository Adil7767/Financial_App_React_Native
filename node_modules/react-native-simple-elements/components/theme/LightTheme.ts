import color from "color";
import { DefaultTheme } from "styled-components";
import { black, white, pinkA400 } from "./colors";
import configureFonts from "./fonts";

const LightTheme: DefaultTheme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: "#6200ee", // primary
        accent: "#03dac4", // secondary
        background: "#f6f6f6", // background
        surface: white, // surface
        error: "#B00020", // error
        text: black, // on primary
        onBackground: "#000000", // on background
        onSurface: "#000000", // on surface
        black: black,
        white: white,
        disabled: color(black).alpha(0.26).rgb().string(), // disabled
        placeholder: color(black).alpha(0.54).rgb().string(), // placeholder
        backdrop: color(black).alpha(0.5).rgb().string(), // backdrop
        notification: pinkA400,
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0,
    },
};

export default LightTheme;
