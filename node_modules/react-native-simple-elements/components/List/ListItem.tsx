import color from "color";
import * as React from "react";
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import Text from "../Text";
import { $RemoveChildren, EllipsizeProp } from "../types";
import { DefaultTheme, ThemeContext } from "styled-components";

type Description =
    | React.ReactNode
    | ((props: {
        selectable: boolean;
        ellipsizeMode: EllipsizeProp | undefined;
        color: string;
        fontSize: number;
    }) => React.ReactNode);

type Props = $RemoveChildren<typeof TouchableRipple> & {
    /**
     * Title text for the list item.
     */
    title?: React.ReactNode;
    /**
     * Description text for the list item or callback which returns a React element to display the description.
     */
    description?: Description | null;
    /**
     * Callback which returns a React element to display on the left side.
     */
    left?: (props: {
        color: string;
        style: {
            marginLeft: number;
            marginRight: number;
            marginVertical?: number;
        };
    }) => React.ReactNode;
    /**
     * Callback which returns a React element to display on the right side.
     */
    right?: (props: {
        color: string;
        style?: {
            marginRight: number;
            marginVertical?: number;
        };
    }) => React.ReactNode;
    /**
     * Callback which returns a React element to display on the right side.
     */
    content?: (props: {
        color: string;
        style?: {
            marginRight?: number;
            marginVertical?: number;
        };
    }) => React.ReactNode;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * @optional
     */
    theme?: DefaultTheme;
    /**
     * Style that is passed to the wrapping TouchableRipple element.
     */
    style?: StyleProp<ViewStyle>;

    focusedStyle?: StyleProp<ViewStyle>;
    hoveredStyle?: StyleProp<ViewStyle>;
    pressedStyle?: StyleProp<ViewStyle>;

    /**
     * Style that is passed to wrap content.
     */
    rowStyle?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to wrap content.
     */
    contentStyle?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to Title element.
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * Style that is passed to Description element.
     */
    descriptionStyle?: StyleProp<TextStyle>;
    /**
     * Truncate Title text such that the total number of lines does not
     * exceed this number.
     */
    titleNumberOfLines?: number;
    /**
     * Truncate Description text such that the total number of lines does not
     * exceed this number.
     */
    descriptionNumberOfLines?: number;
    /**
     * Ellipsize Mode for the Title.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
     *
     * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
     */
    titleEllipsizeMode?: EllipsizeProp;
    /**
     * Ellipsize Mode for the Description.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
     *
     * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
     */
    descriptionEllipsizeMode?: EllipsizeProp;
};

/**
 * A component to show tiles inside a List.
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/list-item-1.png" />
 *   <img class="medium" src="screenshots/list-item-2.png" />
 *   <img class="medium" src="screenshots/list-item-3.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ListItem } from 'react-native-simple-elements/components/List';
 *
 * const MyComponent = () => (
 *   <ListItem
 *     title="First Item"
 *     description="Item description"
 *     left={props => <List.Icon {...props} icon="folder" />}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 */
const ListItem = ({
    left,
    right,
    content,
    title,
    description,
    onPress,
    style,
    focusedStyle,
    hoveredStyle,
    pressedStyle,
    rowStyle,
    contentStyle,
    titleStyle,
    titleNumberOfLines = 1,
    descriptionNumberOfLines = 2,
    titleEllipsizeMode,
    descriptionEllipsizeMode,
    descriptionStyle,
    ...rest
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const renderDescription = (
        descriptionColor: string,
        description?: Description | null
    ) => {
        return typeof description === "function" ? (
            description({
                selectable: false,
                ellipsizeMode: descriptionEllipsizeMode,
                color: descriptionColor,
                fontSize: styles.description.fontSize,
            })
        ) : (
            <Text
                selectable={false}
                numberOfLines={descriptionNumberOfLines}
                ellipsizeMode={descriptionEllipsizeMode}
                style={[
                    styles.description,
                    { color: descriptionColor },
                    descriptionStyle,
                ]}
            >
                {description}
            </Text>
        );
    };

    const titleColor = color(theme.colors.text).alpha(0.87).rgb().string();
    const descriptionColor = color(theme.colors.text).alpha(0.54).rgb().string();

    return (
        <TouchableRipple
            {...rest}
            style={[styles.container, style]}
            focusedStyle={focusedStyle}
            hoveredStyle={hoveredStyle}
            pressedStyle={pressedStyle}
            onPress={onPress}
        >
            <View style={[styles.row, rowStyle]}>
                {left
                    ? left({
                        color: descriptionColor,
                        style: description
                            ? styles.iconMarginLeft
                            : {
                                ...styles.iconMarginLeft,
                                ...styles.marginVerticalNone,
                            },
                    })
                    : null}
                <View style={[styles.item, styles.content, contentStyle]}>
                    {content
                        ? content({
                            color: titleColor,
                            style: {
                            }
                        })
                        : (
                            <>
                                <Text
                                    selectable={false}
                                    ellipsizeMode={titleEllipsizeMode}
                                    numberOfLines={titleNumberOfLines}
                                    style={[styles.title, { color: titleColor }, titleStyle]}
                                >
                                    {title}
                                </Text>
                                {description
                                    ? renderDescription(descriptionColor, description)
                                    : null}
                            </>
                        )
                    }
                </View>
                {right
                    ? right({
                        color: descriptionColor,
                        style: description
                            ? styles.iconMarginRight
                            : {
                                ...styles.iconMarginRight,
                                ...styles.marginVerticalNone,
                            },
                    })
                    : null}
            </View>
        </TouchableRipple>
    );
};

ListItem.displayName = "List.Item";

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
    },
    marginVerticalNone: { marginVertical: 0 },
    iconMarginLeft: { marginLeft: 0, marginRight: 16 },
    iconMarginRight: { marginRight: 0 },
    item: {
        marginVertical: 6,
        paddingLeft: 8,
    },
    content: {
        flexBasis: "auto",
        flexGrow: 1,
        justifyContent: "center",
    },
});

export default ListItem;
