export const isHidden = (screenSize, props) => {
    switch (screenSize) {
    case "small":
        return props.smHidden ? true : false;
    case "medium":
        return props.mdHidden ? true : false;
    case "large":
        return props.lgHidden ? true : false;
    default:
        return false;
    }
};

const toPercent = (num) => (num * 100) + "%";

export const getComponentWidth = (screenSize, props) => {
    switch (screenSize) {
    case "small":
        if (props.sm) {
            return toPercent(props.sm / props.rowSize);
        } else {
            return props.parentWidth;
        }
    case "medium":
        if (props.md) {
            return toPercent(props.md / props.rowSize);
        } else if (props.sm) {
            return toPercent(props.sm / props.rowSize);
        } else {
            return props.parentWidth;
        }
    case "large":
        if (props.lg) {
            return toPercent(props.lg / props.rowSize);
        } else if (props.md) {
            return toPercent(props.md / props.rowSize);
        } else if (props.sm) {
            return toPercent(props.sm / props.rowSize);
        } else {
            return props.parentWidth;
        }
    default:
        return props.parentWidth;
    }
};

export const getComponentOffset = (screenSize, props) => {
    switch (screenSize) {
    case "small":
        if (props.smOffset) {
            return toPercent(props.smOffset / props.rowSize);
        } else {
            return 0;
        }
    case "medium":
        if (props.mdOffset) {
            return toPercent(props.mdOffset / props.rowSize);
        } else if (props.smOffset) {
            return toPercent(props.smOffset / props.rowSize);
        } else {
            return 0;
        }
    case "large":
        if (props.lgOffset) {
            return toPercent(props.lgOffset / props.rowSize);
        } else if (props.mdOffset) {
            return toPercent(props.mdOffset / props.rowSize);
        } else if (props.smOffset) {
            return toPercent(props.smOffset / props.rowSize);
        } else {
            return 0;
        }
    default:
        return 0;
    }
};
