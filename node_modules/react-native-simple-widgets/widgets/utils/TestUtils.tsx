import { ThemeProvider } from "styled-components";
import { render } from "react-native-testing-library";
import { shallow } from "enzyme";
import { oneOfType, element, arrayOf } from "prop-types";

const ProviderWrapper = ({ children }) => (
    <ThemeProvider theme={{} as any}>{children}</ThemeProvider>
);

ProviderWrapper.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
};

export const shallowWithProvider = (component, options) => {
    return shallow(component, {
        wrappingComponent: ProviderWrapper,
        ...options,
    });
};

export const renderWithProvider = (component, options?) => {
    return render(component, {
        wrapper: ProviderWrapper,
        ...options,
    });
};

// Hooks can only be called from a functional component or from other hooks
const TestHook = ({ hook }) => {
    hook();
    return null;
};

export const testHook = targetHook => {
    shallow(<TestHook hook={targetHook} />);
};

export { shallowWithProvider as shallow, renderWithProvider as render };
