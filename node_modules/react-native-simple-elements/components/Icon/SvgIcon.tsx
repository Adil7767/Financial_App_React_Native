import * as React from "react";
import {
    Text as NativeText, TextStyle, StyleProp, Platform,
    ImageSourcePropType,
} from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";

type IconSourceBase = string | ImageSourcePropType;

export type IconSource =
    | IconSourceBase
    | Readonly<{ source: IconSourceBase; direction: "rtl" | "ltr" | "auto" }>
    | ((props: IconProps & { color: string }) => React.ReactNode);

type IconProps = {
    size: number;
    allowFontScaling?: boolean;
};

const isImageSource = (source: any) =>
    // source is an object with uri
    (typeof source === "object" &&
        source !== null &&
        Object.prototype.hasOwnProperty.call(source, "uri") &&
        typeof source.uri === "string") ||
    // source is a module, e.g. - require('image')
    typeof source === "number" ||
    // image url on web
    (Platform.OS === "web" &&
        typeof source === "string" &&
        (source.startsWith("data:image") ||
            /\.(bmp|jpg|jpeg|png|gif|svg)$/.test(source)));

const getIconId = (source: any) => {
    if (
        typeof source === "object" &&
        source !== null &&
        Object.prototype.hasOwnProperty.call(source, "uri") &&
        typeof source.uri === "string"
    ) {
        return source.uri;
    }

    return source;
};

export const isValidIcon = (source: any) =>
    typeof source === "string" ||
    typeof source === "function" ||
    isImageSource(source);

export const isEqualIcon = (a: any, b: any) =>
    a === b || getIconId(a) === getIconId(b);

type Props = React.ComponentProps<typeof NativeText> & {
    icon: React.ReactElement,

    size?: number,

    color?: string,

    outline?: boolean,

    direction?: string,

    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

const SvgIcon = (props: Props) => {
    const { icon: Icon, color, ...rest } = props;
    const theme = React.useContext(ThemeContext);
    const iconColor = color || theme.colors.text;
    const size = rest.size || 24;
    const outline = rest.outline || false;

    const colorStyle = outline ? {
        stroke: iconColor,
    } : {
        fill: iconColor,
    };

    return props.icon ?
        (
            // @ts-ignore
            <Icon
                {...rest}
                {...colorStyle}
                width={size}
                height={size}
            />
        ) :
        <NativeText>Icon</NativeText>;
};

SvgIcon.defaultProps = {
    direction: "ltr",
};

export default SvgIcon;
