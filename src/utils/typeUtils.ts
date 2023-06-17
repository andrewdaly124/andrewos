// :msn_embarrased:
export type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};

type Mutable<T> = { -readonly [P in keyof T]: Mutable<T[P]> };

export function deepCopy<T>(obj: T): Mutable<T> {
  return structuredClone(obj) as Mutable<T>;
}
