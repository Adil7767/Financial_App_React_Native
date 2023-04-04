import * as React from "react";
import { View, Dimensions } from "react-native";

type Props = {
    children?: React.ReactElement,
    delay?: number,
    disabled?: boolean,
    onChange?: (visible, opts?) => void,
}

type State  = {
    prevRectTop?: number,
    rectTop?: number,
    rectBottom?: number,
    rectWidth?: number,
}

class ViewportVisibilitySensor extends React.Component<Props, State> {
    state: State = {
        prevRectTop: 0,
        rectTop: 0,
        rectBottom: 0,
    };

    interval;
    myview;
    lastValue;

    componentDidMount() {
        if (!this.props.disabled) {
            this.startWatching();
        }
    }

    componentWillUnmount() {
        this.stopWatching();
    }

    startWatching() {
        if (this.interval) {
            return;
        }
        this.interval = setInterval(() => {
            if (!this.myview) {
                return;
            }
            this.myview.measure((x, y, width, height, pageX, pageY) => {
                this.setState({
                    prevRectTop: this.state.rectTop,
                    rectTop: pageY,
                    rectBottom: pageY + height,
                    rectWidth: pageX + width,
                });
                this.isInViewPort();
            });
        }, this.props.delay || 100);
    }

    stopWatching() {
        this.interval = clearInterval(this.interval);
    }

    isInViewPort() {
        const window = Dimensions.get("window");
        const isVisible = this.state.rectBottom !== 0 &&
            this.state.rectTop >= 0 &&
            this.state.rectBottom <= window.height &&
            this.state.rectWidth > 0 &&
            this.state.rectWidth <= window.width;
        if (this.lastValue !== isVisible) {
            this.lastValue = isVisible;

            // console.log("Top ", this.state.rectTop, " Prev top ", this.state.prevRectTop);
            this.props.onChange(isVisible, {
                direction: this.state.rectTop > this.state.prevRectTop ? -1 : 1,
            });
        }
    }

    render() {
        return (
            <View
                collapsable={false}
                ref={component => {
                    this.myview = component;
                }}
                {...this.props}
            >
                {this.props.children}
            </View>
        );
    }
}

export default ViewportVisibilitySensor;
