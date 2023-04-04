import * as React from "react";
import { View, TouchableHighlight, FlatList } from "react-native";
import Collapsible from "./Collapsible";

const COLLAPSIBLE_PROPS = [
    "align",
    "collapsed",
    "collapsedHeight",
    "renderChildrenCollapsed",
    "enablePointerEvents",
    "duration",
    "easing",
    "style",
    "onAnimationEnd",
];

type Props = {
    underlayColor?: string,
    disabled?: boolean,
    expandFromBottom?: boolean,
    expandMultiple?: boolean,
    activeSections?: string[],
    onChange?: (evt?) => void,
    containerStyle?: any,
    sectionContainerStyle?: any,
    sections?: any[],
    touchableProps?: any,
    touchableComponent?: React.ReactNode,
    renderContent?: (props, key, check, sections) => React.ReactElement,
    renderHeader?: (props, key, check, sections) => React.ReactElement,
    renderFooter?: (props, key, check, sections) => React.ReactElement,
    renderSectionTitle?: (props, key, check, sections?) => React.ReactElement,
    onAnimationEnd?: (evt?, key?) => void,
    renderAsFlatList?: boolean,
    keyExtractor?: (props, index?) => void,
};

class Accordion extends React.Component<Props> {

    static defaultProps = {
        underlayColor: "black",
        disabled: false,
        expandFromBottom: false,
        expandMultiple: false,
        touchableComponent: TouchableHighlight,
        keyExtractor: (item, index) => index,
        renderSectionTitle: () => null,
        onAnimationEnd: () => null,
        sectionContainerStyle: {},
        renderAsFlatList: false,
    };

    _toggleSection(section) {
        if (!this.props.disabled) {
            const { activeSections, expandMultiple, onChange } = this.props;

            let updatedSections = [];

            if (activeSections.includes(section)) {
                updatedSections = activeSections.filter((a) => a !== section);
            } else if (expandMultiple) {
                updatedSections = [...activeSections, section];
            } else {
                updatedSections = [section];
            }

            if (onChange) {
                onChange(updatedSections);
            }
        }
    }

    _renderContainer = (section, key, renderCollapsible) => {
        const {
            activeSections,
            sectionContainerStyle,
            expandFromBottom,
            sections,
            underlayColor,
            touchableProps,
            touchableComponent: Touchable,
            renderHeader,
            renderFooter,
            renderSectionTitle,
        } = this.props;
        return (
            <View key={key} style={sectionContainerStyle}>
                {renderSectionTitle(section, key, activeSections.includes(key))}

                {expandFromBottom && renderCollapsible(section, key)}

                {/* @ts-ignore */}
                <Touchable
                    onPress={() => this._toggleSection(key)}
                    underlayColor={underlayColor}
                    {...touchableProps}
                    accessibilityState={{
                        expanded: activeSections.includes(key),
                    }}
                >
                    {renderHeader(section, key, activeSections.includes(key), sections)}
                </Touchable>

                {!expandFromBottom && renderCollapsible(section, key)}

                {renderFooter &&
                    renderFooter(section, key, activeSections.includes(key), sections)}
            </View>
        );
    };

    render() {
        const {
            activeSections,
            // expandMultiple,
            // onChange,
            containerStyle,
            // sectionContainerStyle,
            // expandFromBottom,
            sections,
            // underlayColor,
            // touchableProps,
            // touchableComponent: Touchable,
            onAnimationEnd,
            renderContent,
            // renderHeader,
            // renderFooter,
            // renderSectionTitle,
            // disabled,
            renderAsFlatList,
            keyExtractor,
            ...restProps
        } = this.props;

        const viewProps = {};
        const collapsibleProps = {};

        Object.keys(restProps).forEach((key) => {
            if (COLLAPSIBLE_PROPS.includes(key)) {
                collapsibleProps[key] = restProps[key];
            } else {
                viewProps[key] = restProps[key];
            }
        });

        const renderCollapsible = (section, key) => (
            <Collapsible
                collapsed={!activeSections.includes(key)}
                {...collapsibleProps}
                onAnimationEnd={() => onAnimationEnd(section, key)}
            >
                {renderContent(section, key, activeSections.includes(key), sections)}
            </Collapsible>
        );

        if (renderAsFlatList) {
            return (
                <FlatList
                    style={containerStyle}
                    data={sections}
                    extraData={activeSections}
                    nestedScrollEnabled={true}
                    keyExtractor={keyExtractor as any}
                    renderItem={({ item, index }) => {
                        const section = item;
                        const key = keyExtractor(item, index);
                        return this._renderContainer(section, key, renderCollapsible);
                    }}
                    {...viewProps}
                />
            );
        }

        return (
            <View style={containerStyle} {...viewProps}>
                {sections.map((section, index) => {
                    const key = keyExtractor(section, index);
                    return this._renderContainer(section, key, renderCollapsible);
                })}
            </View>
        );
    }
}

export default Accordion;
