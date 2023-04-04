import * as React from "react";
import { Modal } from "react-native";
import PopupMixin from "./PopupMixin";
// import Touchable from 'rmc-feedback';
import styled from "styled-components";

const SelectPickerPopupHeader = styled.div`
    background-image: -webkit-linear-gradient(top, #e7e7e7, #e7e7e7, transparent, transparent);
    background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);
    background-position: bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    flex-direction: row;
    &-left, &-right {
        padding-left: 15px;
        padding-right: 15px;
    }
`;

const getModal = (props, visible, { getContent, hide, onDismiss, onOk }) => {
    if (!visible) {
        return null;
    }
    const { prefixCls } = props;

    return (
        <Modal
            // prefixCls={`${prefixCls}`}
            // className={props.className || ''}
            visible={true}
            // closable={false}
            // transitionName={props.transitionName || props.popupTransitionName}
            // maskTransitionName={props.maskTransitionName}
            // onClose={hide}
            style={props.style}
        >
            <div>
                <SelectPickerPopupHeader className={`${prefixCls}-header`}>
                    {/* <Touchable activeClassName={`${prefixCls}-item-active`}> */}
                    <div className={`${prefixCls}-item ${prefixCls}-header-left`} onClick={onDismiss}>
                        {props.dismissText}
                    </div>
                    {/* </Touchable> */}
                    <div className={`${prefixCls}-item ${prefixCls}-title`}>{props.title}</div>
                    {/* <Touchable activeClassName={`${prefixCls}-item-active`}> */}
                    <div className={`${prefixCls}-item ${prefixCls}-header-right`} onClick={onOk}>
                        {props.okText}
                    </div>
                    {/* </Touchable> */}
                </SelectPickerPopupHeader>
                {getContent()}
            </div>
        </Modal>
    );
};

export default PopupMixin(getModal, {
    prefixCls: "rmc-picker-popup",
    WrapComponent: "span",
    triggerType: "onClick",
    pickerValueProp: "selectedValue",
    pickerValueChangeProp: "onValueChange",
});
