import * as React from "react";
import { View, Text, Image, StyleProp, ViewStyle } from "react-native";
import ViewTransformer from "../ViewTransformer";

type DimensionProps = {
    width: number,
    height: number,
}

type ImageSourceProps = {
    source: any,
}

type Props = {
    image: ImageSourceProps | number,
    // image: PropTypes.shape({
    //     source: PropTypes.oneOfType([
    //         PropTypes.object,
    //         PropTypes.number
    //     ]).isRequired,
    //     dimensions: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number })
    // }).isRequired,
    style?: StyleProp<ViewStyle>,
    onLoad?: (evt?) => void,
    onLoadStart?: (evt?) => void,
    enableTransform?: boolean,
    enableScale?: boolean,
    enableTranslate?: boolean,
    onTransformGestureReleased?: (evt?) => void,
    onViewTransformed?: (evt?) => void,
    imageComponent?: (props?) => React.ReactNode,
    resizeMode?: string,
    errorComponent?: (props?) => React.ReactNode,
};

type State = {
    viewWidth?: number,
    viewHeight?: number,
    imageLoaded?: boolean,
    imageDimensions?: DimensionProps,
    keyAcumulator: number,
    error?: boolean,
    keyAccumulator?: any,
}

export default class TransformableImage extends React.PureComponent<Props, State> {

    static defaultProps = {
        enableTransform: true,
        enableScale: true,
        enableTranslate: true,
        imageComponent: undefined,
        resizeMode: "contain"
    };

    _mounted;

    viewTransformer;

    constructor(props) {
        super(props);

        this.onLayout = this.onLayout.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.getViewTransformerInstance = this.getViewTransformerInstance.bind(this);
        this.renderError = this.renderError.bind(this);

        this.state = {
            viewWidth: 0,
            viewHeight: 0,
            imageLoaded: false,
            imageDimensions: props.image.dimensions,
            keyAcumulator: 1
        };
    }

    UNSAFE_componentWillMount() {
        if (!this.state.imageDimensions) {
            this.getImageSize(this.props.image);
        }
    }

    componentDidMount() {
        this._mounted = true;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!sameImage(this.props.image, nextProps.image)) {
            // image source changed, clear last image's imageDimensions info if any
            this.setState({ imageDimensions: nextProps.image.dimensions, keyAcumulator: this.state.keyAcumulator + 1 });
            if (!nextProps.image.dimensions) { // if we don't have image dimensions provided in source
                this.getImageSize(nextProps.image);
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    onLoadStart(e) {
        this.props.onLoadStart && this.props.onLoadStart(e);
        if (this.state.imageLoaded) {
            this.setState({ imageLoaded: false });
        }
    }

    onLoad(e) {
        this.props.onLoad && this.props.onLoad(e);
        if (!this.state.imageLoaded) {
            this.setState({ imageLoaded: true });
        }
    }

    onLayout(e) {
        const { width, height } = e.nativeEvent.layout;
        if (this.state.viewWidth !== width || this.state.viewHeight !== height) {
            this.setState({ viewWidth: width, viewHeight: height });
        }
    }

    getImageSize(image) {
        if (!image) {
            return;
        }
        const { source, dimensions } = image;

        if (dimensions) {
            this.setState({ imageDimensions: dimensions });
            return;
        }

        if (source && source.uri) {
            Image.getSize(
                source.uri,
                (width, height) => {
                    if (width && height) {
                        if (this.state.imageDimensions && this.state.imageDimensions.width === width && this.state.imageDimensions.height === height) {
                            // no need to update state
                        } else {
                            this._mounted && this.setState({ imageDimensions: { width, height } });
                        }
                    }
                },
                () => {
                    this._mounted && this.setState({ error: true });
                }
            );
        } else {
            // console.warn("react-native-image-gallery", "Please provide dimensions of your local images");
        }
    }

    getViewTransformerInstance() {
        // return this.refs["viewTransformer"];
        return this.viewTransformer;
    }

    renderError() {
        return (this.props.errorComponent && this.props.errorComponent()) || (
            <View style={{ flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 15, fontStyle: "italic" }}>This image cannot be displayed...</Text>
            </View>
        );
    }

    render() {
        const { imageDimensions, viewWidth, viewHeight, error, keyAccumulator, imageLoaded } = this.state;
        const { style, image, imageComponent, resizeMode, enableTransform, enableScale, enableTranslate, onTransformGestureReleased, onViewTransformed } = this.props;

        let maxScale = 1;
        let contentAspectRatio;
        let width, height; // imageDimensions

        if (imageDimensions) {
            width = imageDimensions.width;
            height = imageDimensions.height;
        }

        if (width && height) {
            contentAspectRatio = width / height;
            if (viewWidth && viewHeight) {
                maxScale = Math.max(width / viewWidth, height / viewHeight);
                maxScale = Math.max(1, maxScale);
            }
        }

        const imageProps = {
            ...this.props,
            imageLoaded,
            // @ts-ignore
            source: image.source,
            style: [style, { backgroundColor: "transparent" }],
            resizeMode: resizeMode,
            onLoadStart: this.onLoadStart,
            onLoad: this.onLoad,
            capInsets: { left: 0.1, top: 0.1, right: 0.1, bottom: 0.1 }
        };

        // @ts-ignore
        const content = imageComponent ? imageComponent(imageProps, imageDimensions) : <Image {...imageProps} />;

        return (
            <ViewTransformer
                // ref={"viewTransformer"}
                ref={(el) => {
                    this.viewTransformer = el;
                }}
                key={"viewTransformer#" + keyAccumulator} // when image source changes, we should use a different node to avoid reusing previous transform state
                enableTransform={enableTransform && imageLoaded} // disable transform until image is loaded
                enableScale={enableScale}
                enableTranslate={enableTranslate}
                enableResistance={true}
                onTransformGestureReleased={onTransformGestureReleased}
                onViewTransformed={onViewTransformed}
                maxScale={maxScale}
                contentAspectRatio={contentAspectRatio}
                onLayout={this.onLayout}
                // @ts-ignore
                style={style}>
                {error ? this.renderError() : content}
            </ViewTransformer>
        );
    }
}

function sameImage(source, nextSource) {
    if (source === nextSource) {
        return true;
    }
    if (source && nextSource) {
        if (source.uri && nextSource.uri) {
            return source.uri === nextSource.uri;
        }
    }
    return false;
}
