import * as React from "react";
import PortalConsumer from "./PortalConsumer";
import { PortalContext, PortalMethods } from "./PortalHost";
import {
    Provider as SettingsProvider,
    Consumer as SettingsConsumer,
} from "../theme/settings";
import { DefaultTheme, ThemeContext, ThemeProvider } from "styled-components";

type Props = {
    /**
     * Content of the `Portal`.
     */
    children: React.ReactNode;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * Portal allows to render a component at a different place in the parent tree.
 * You can use it to render content which should appear above other elements, similar to `Modal`.
 * It requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import Portal from 'react-native-simple-elements/components/Portal';
 * import Text from "react-native-simple-elements/components/Text";
 *
 * const MyComponent = () => (
 *   <Portal>
 *     <Text>This is rendered at a different place</Text>
 *   </Portal>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Portal = ({ children }: Props) => {

    const theme = React.useContext(ThemeContext);

    return (
        <SettingsConsumer>
            {(settings) => (
                <PortalContext.Consumer>
                    {(manager) => (
                        <PortalConsumer manager={manager as PortalMethods}>
                            <SettingsProvider value={settings}>
                                <ThemeProvider theme={theme}>{children}</ThemeProvider>
                            </SettingsProvider>
                        </PortalConsumer>
                    )}
                </PortalContext.Consumer>
            )}
        </SettingsConsumer>
    );
};

export default Portal;
