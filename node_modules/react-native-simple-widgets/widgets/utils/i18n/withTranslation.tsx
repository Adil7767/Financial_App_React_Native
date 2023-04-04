import * as React from "react";
import { LocaleProviderCtx } from "./LocaleProvider";

const withTranslation = WrappedComponent => {
    return props => {
        return (
            <LocaleProviderCtx.Consumer>
                {polyglot => <WrappedComponent {...props} translate={polyglot.t} />}
            </LocaleProviderCtx.Consumer>
        );
    };
};

export default withTranslation;
