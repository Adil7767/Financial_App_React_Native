import * as React from "react";
import { AvatarText } from "react-native-simple-elements/components/Avatar";
import Menu from "react-native-simple-elements/components/Menu";
import ImageButton from "react-native-simple-elements/components/ImageButton";
import Divider from "react-native-simple-elements/components/Divider";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import TouchableRipple from "react-native-simple-elements/components/TouchableRipple";

const parseAvatarText = (fullName) => {
    const parts = (fullName || "").split(" ");
    let text = "";
    if (parts.length >= 1) {
        text = text + parts[0].charAt(0).toUpperCase();
    }
    if (parts.length >= 2) {
        text = text + parts[1].charAt(0).toUpperCase();
    }
    return text;
}

export type MenuItemProps = {
    label: string,
    icon?: React.ReactElement,
    url?: string,
};

type Props = {
    circle?: boolean,
    avatarSize?: number,
    avatarStyle?: StyleProp<ViewStyle>,
    avatarLabelStyle?: StyleProp<TextStyle>,
    loggedInUser?: Record<string, any>,
    onViewProfileClick?: () => void,
    onLogoutClick?: () => void,
    userMenuItems?: MenuItemProps[],
    onUserMenuItemPress?: (item?) => void,
}

const defaultProps = {
    circle: false,
};

const AuthorizedUserMenu = ({
    loggedInUser,
    circle,
    avatarSize,
    avatarStyle,
    avatarLabelStyle,
    onViewProfileClick,
    onLogoutClick,
    userMenuItems,
    onUserMenuItemPress,
}: Props) => {

    const {
        firstName,
        avatarUrl,
    } = loggedInUser || {} as any;

    const [ isOpen, setIsOpen ] = React.useState(false);

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const _handleMenuItemPress = (item) => {
        if (onUserMenuItemPress) {
            onUserMenuItemPress(item);
        }
    };

    return (
        <Menu
            visible={isOpen}
            onDismiss={closeMenu}
            anchor={loggedInUser?.userId && avatarUrl?
                <ImageButton
                    source={{ uri: avatarUrl }}
                    circle={circle}
                    onPress={openMenu}
                />
                :
                <TouchableRipple
                    onPress={openMenu}
                >
                    <AvatarText
                        label={parseAvatarText(loggedInUser?.fullName)}
                        size={avatarSize}
                        style={avatarStyle}
                        labelStyle={avatarLabelStyle}
                    />
                </TouchableRipple>
            }
            alignRight={true}
        >
            {loggedInUser?.userId &&
                <Menu.Item
                    title={firstName || ""}
                    titleStyle={{
                        textAlign: "center",
                    }}
                    onPress={() => {
                        if (typeof onViewProfileClick === "function") {
                            onViewProfileClick();
                        }
                    }}
                />
            }
            <Divider />
            {Array.isArray(userMenuItems) && userMenuItems.length > 0 ?
                userMenuItems.map((item, index) => {
                    return (
                        <Menu.Item
                            key={index}
                            title={item.label}
                            icon={item.icon}
                            onPress={() => _handleMenuItemPress(item)}
                        />
                    );
                })
                : null
            }
            <Divider />
            {loggedInUser?.userId &&
                <Menu.Item
                    title="Logout"
                    onPress={() => {
                        if (typeof onLogoutClick === "function") {
                            onLogoutClick();
                        }
                    }}
                />
            }
        </Menu>
    );
};

AuthorizedUserMenu.defaultProps = defaultProps;

export default AuthorizedUserMenu;
