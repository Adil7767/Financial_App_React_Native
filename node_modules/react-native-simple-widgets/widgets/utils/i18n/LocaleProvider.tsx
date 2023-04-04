import * as React from "react";
import Polyglot from "node-polyglot";
import defaultPhrases from "./locales";

export const LocaleProviderCtx = React.createContext<Polyglot>({});

const defaultLocale = "en";
let currentLocale = defaultLocale;
let polyglot = new Polyglot({
    locale: currentLocale,
    phrases: defaultPhrases.en,
});

export const setCurrentLocale = locale => {
    currentLocale = locale;
};

export const setPolyglot = newPolyglot => {
    polyglot = newPolyglot;
};

export const translate = (key, option = {}) => {
    return polyglot ? polyglot.t(key, option) : key;
};

export const getCurrentLocale = () => currentLocale;

type Props = {
    children: React.ReactNode,
    locale?: string,
    isInit: boolean,
    loadingComponent?: React.ReactNode,
    fetchLocaleJson: () => Promise<any>,
};

class LocaleProvider extends React.Component<Props> {

    state = {
        polyglot,
    };

    componentDidMount() {
        this.updatePolyglot();
    }

    componentDidUpdate(prevProps) {
        const isFilterInitChanged = prevProps.isInit !== this.props.isInit;
        const isLocaleChanged = prevProps.locale !== this.props.locale;

        if (this.props.isInit && (isFilterInitChanged || isLocaleChanged)) {
            this.updatePolyglot();
        }
    }

    updatePolyglot = () => {
        const { locale = "en", isInit, fetchLocaleJson } = this.props;
        if (!isInit) return;

        if (typeof fetchLocaleJson === "function") {
            fetchLocaleJson()
                .then(result => {
                    if (result.ok) {
                        setCurrentLocale(locale);
                        polyglot = new Polyglot({
                            locale: locale,
                            phrases: result.data,
                        });
                        this.setState({
                            polyglot,
                        });
                    } else {
                        this.setDefaultPolyglot();
                    }
                })
                .catch(() => {
                    this.setDefaultPolyglot();
                });
        }
    };

    setDefaultPolyglot = () => {
        setCurrentLocale(defaultLocale);
        polyglot = new Polyglot({
            locale: defaultLocale,
            phrases: defaultPhrases.en,
        });
        this.setState({
            polyglot,
        });
    };

    render() {
        const { children } = this.props;

        return (
            <LocaleProviderCtx.Provider value={polyglot}>
                {children}
            </LocaleProviderCtx.Provider>
        );
    }
}

export default LocaleProvider;
