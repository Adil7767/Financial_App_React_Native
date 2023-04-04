import * as React from "react";

const defaultOptions = {
    cancelOnUnmount: true,
};

/**
 * An async-utility hook that accepts a callback function and a delay time (in milliseconds), then repeats the
 * execution of the given function by the defined milliseconds.
 */
const useInterval = (fn, milliseconds, options = defaultOptions) => {
    const opts = { ...defaultOptions, ...(options || {}) };
    const timeout = React.useRef<any>();
    const callback = React.useRef(fn);
    const [isCleared, setIsCleared] = React.useState(false);

    // the clear method
    const clear = React.useCallback(() => {
        if (timeout.current) {
            setIsCleared(true);
            clearInterval(timeout.current);
        }
    }, []);

    // if the provided function changes, change its reference
    React.useEffect(() => {
        if (typeof fn === "function") {
            callback.current = fn;
        }
    }, [fn]);

    // when the milliseconds change, reset the timeout
    React.useEffect(() => {
        if (typeof milliseconds === "number") {
            timeout.current = setInterval(() => {
                callback.current();
            }, milliseconds);
        }

        // cleanup previous interval
        return clear;
    }, [milliseconds]);

    // when component unmount clear the timeout
    React.useEffect(() => () => {
        if (opts.cancelOnUnmount) {
            clear();
        }
    }, []);

    return [isCleared, clear];
};

export default useInterval;