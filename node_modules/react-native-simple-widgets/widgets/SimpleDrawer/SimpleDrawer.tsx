import * as React from "react";
import Drawer from "react-native-simple-elements/components/Drawer";

type DrawerItemProps = {
    label: string,
    icon?: React.ReactElement,
    url?: string,
    [key: string]: any,
}

type Props = {
    items: DrawerItemProps[],
    onItemPress?: (item) => void,
    drawerPaddingTop?: number | string,
    showMask?: boolean,
    animated?: boolean,
    children?: React.ReactNode,
};

const defaultProps = {
    drawerPaddingTop: 0,
    showMask: true,
    animated: true,
};

const SimpleDrawer = (props: Props) => {

    const {
        items,
        onItemPress,
        drawerPaddingTop,
        showMask,
        animated,
        children,
    } = props;

    const _handleItemPress = (item) => {
        if (typeof onItemPress === "function") {
            onItemPress(item);
        }
    };

    return (
        <Drawer
            drawerPaddingTop={drawerPaddingTop}
            showMask={showMask}
            animated={animated}
        >
            {(Array.isArray(items) && items.length > 0) &&
                items.map((item, index) => {
                    return (
                        <Drawer.Item
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            onPress={() => _handleItemPress(item)}
                        />
                    );
                })
            }
            {children}
        </Drawer>
    );
};

SimpleDrawer.defaultProps = defaultProps;

export default SimpleDrawer;
