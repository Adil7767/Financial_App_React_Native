import Button from "./Button";
import withPreventDoubleTap from "../hocs/withPreventDoubleTap";

// @ts-ignore
const DebounceButton = withPreventDoubleTap(Button, false, "Button");

export {
    Button as default,
    DebounceButton,
};
