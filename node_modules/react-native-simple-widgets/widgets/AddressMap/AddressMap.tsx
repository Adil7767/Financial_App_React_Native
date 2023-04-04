import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MapView, { Circle } from "react-native-maps";
import Button from "react-native-simple-elements/components/Button";
import { SvgIcon } from "react-native-simple-elements/components/Icon";
import Image from "react-native-simple-elements/components/Image/Image";
import { ThemeContext } from "styled-components";
import AccountIcon from "@mdi/svg/svg/account.svg";

type RegionProps = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
};

type Props = {
    innerRef: React.RefObject<any>,
    initialRegion: RegionProps,
    userLocation?: RegionProps,
    selectedLocationImageSource?: any,
    showsUserLocation?: boolean,
    showsMyLocationButton?: boolean,
    renderHeader?: (props?) => React.ReactNode,
    onRegionChangeComplete: (region?) => void,
    onUserLocationRequest?: (region?) => void,
    onConfirm?: () => void,
    confirmText?: string,
};

const defaultProps = {
    showsUserLocation: false,
    showsMyLocationButton: false,
};

const AddressMap = ({
    innerRef,
    initialRegion,
    userLocation,
    selectedLocationImageSource,
    showsUserLocation,
    showsMyLocationButton,
    renderHeader,
    onRegionChangeComplete,
    onUserLocationRequest,
    onConfirm,
    confirmText,
    ...rest
}: Props) => {
    const [region, setRegion] = React.useState(initialRegion);

    const { colors } = React.useContext(ThemeContext);

    const handleRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
        if (onRegionChangeComplete) {
            onRegionChangeComplete(newRegion);
        }
    };

    const handleUserLocationRequest = () => {
        if (onUserLocationRequest) {
            onUserLocationRequest();
        }
    };

    const handleConfirmPress = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <View style={[styles.container]}>
            <MapView
                ref={innerRef}
                style={[StyleSheet.absoluteFillObject]}
                {...rest}
                initialRegion={region}
                onRegionChangeComplete={handleRegionChangeComplete}>
                {showsUserLocation && userLocation ? (
                    <Circle
                        center={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        radius={Math.round(
                            ((region.longitudeDelta + region.latitudeDelta) / 2) * 2500,
                        )}
                        strokeColor={colors.white}
                        strokeWidth={
                            Math.round(
                                ((region.longitudeDelta + region.latitudeDelta) / 2) * 2500,
                            ) / 10
                        }
                        fillColor={"blue"}
                    />
                ) : null}
            </MapView>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                pointerEvents="box-none">
                <Image source={selectedLocationImageSource} width={24} height={40} />
            </View>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "transparent",
                }}
                pointerEvents="box-none">
                {renderHeader ? renderHeader() : null}
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        zIndex: -1,
                    }}
                    pointerEvents="box-none"
                />
                {showsMyLocationButton ? (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.white,
                                marginRight: 16,
                                marginBottom: 32,
                                padding: 5,
                            }}
                            onPress={() => handleUserLocationRequest()}>
                            <SvgIcon icon={AccountIcon} size={24} />
                        </TouchableOpacity>
                    </View>
                ) : null}
                {region ? (
                    <View
                        style={{
                            backgroundColor: colors.white,
                            padding: 16,
                            shadowColor: colors.black,
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,
                            elevation: 12,
                        }}
                        pointerEvents="box-none">
                        <Button
                            onPress={handleConfirmPress}
                        >
                            {confirmText}
                        </Button>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default AddressMap;

AddressMap.defaultProps = defaultProps;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
