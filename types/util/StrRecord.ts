/**
 * Object Record.  Use when key set is NOT discrete.  Use Record when a discrete, i.e. enumerated keyset is possible
 */

export type StrRecord<V> = { [K in string]?: V };
