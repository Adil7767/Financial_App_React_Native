import type * as React from "react";

export type Font = {
    fontFamily: string;
    fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

export type Fonts = {
    regular: Font;
    medium: Font;
    light: Font;
    thin: Font;
};

type Mode = "adaptive" | "exact";

export type Theme = {
    dark: boolean;
    mode?: Mode;
    roundness: number;
    colors: {
        primary: string;
        background: string;
        surface: string;
        accent: string;
        error: string;
        text: string;
        onSurface: string;
        onBackground: string;
        black: string;
        white: string;
        disabled: string;
        placeholder: string;
        backdrop: string;
        notification: string;
    };
    fonts: Fonts;
    animation: {
        scale: number;
    };
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
    React.ComponentPropsWithoutRef<T>,
    "children"
>;

export type EllipsizeProp = "head" | "middle" | "tail" | "clip";

declare module "styled-components" {

    export interface ThemeFont {
        fontFamily: string;
        fontWeight?:
        | "normal"
        | "bold"
        | "100"
        | "200"
        | "300"
        | "400"
        | "500"
        | "600"
        | "700"
        | "800"
        | "900";
    }

    export interface ThemeFonts {
        regular: ThemeFont;
        medium: ThemeFont;
        light: ThemeFont;
        thin: ThemeFont;
    }

    export interface ThemeColors {
        primary: string;
        background: string;
        surface: string;
        accent: string;
        error: string;
        text: string;
        onSurface: string;
        onBackground: string;
        black: string;
        white: string;
        disabled: string;
        placeholder: string;
        backdrop: string;
        notification: string;
    }

    export interface ThemeAnimation {
        scale: number;
    }

    export interface DefaultTheme {
        dark: boolean;
        mode?: Mode;
        roundness: number;
        colors: ThemeColors;
        fonts: ThemeFonts;
        animation: ThemeAnimation;
    }
}

export {

};
