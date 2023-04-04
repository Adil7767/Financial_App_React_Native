type _DeepPartialArray<T> = Array<DeepPartial<T>>
/** @private */
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }

// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends Function
    ? T
    : T extends Array<infer U>
    ? _DeepPartialArray<U>
    // eslint-disable-next-line @typescript-eslint/ban-types
    : T extends object
    ? _DeepPartialObject<T>
    : T | undefined
