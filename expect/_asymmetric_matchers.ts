// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// deno-lint-ignore-file no-explicit-any

abstract class AsymmetricMatcher<T> {
  constructor(
    protected value: T,
  ) {}
  abstract equals(other: unknown): boolean;
}

export class Anything extends AsymmetricMatcher<void> {
  equals(other: unknown): boolean {
    return other !== null && other !== undefined;
  }
}

export function anything(): Anything {
  return new Anything();
}

export class Any extends AsymmetricMatcher<any> {
  constructor(value: unknown) {
    if (value === undefined) {
      throw TypeError("Expected a constructor function");
    }
    super(value);
  }
  equals(other: unknown): boolean {
    if (typeof other === "object") {
      return other instanceof this.value;
    } else {
      if (this.value === Number) {
        return typeof other === "number";
      }

      if (this.value === String) {
        return typeof other === "string";
      }

      if (this.value === Number) {
        return typeof other === "number";
      }

      if (this.value === Function) {
        return typeof other === "function";
      }

      if (this.value === Boolean) {
        return typeof other === "boolean";
      }

      if (this.value === BigInt) {
        return typeof other === "bigint";
      }

      if (this.value === Symbol) {
        return typeof other === "symbol";
      }
    }
    return false;
  }
}

export function any(c: unknown): Any {
  return new Any(c);
}

export class ArrayContaining extends AsymmetricMatcher<any[]> {
  constructor(arr: any[]) {
    super(arr);
  }
  equals(other: any[]): boolean {
    return this.value.every((e) => other.includes(e));
  }
}

export function arrayContaining(c: any[]): ArrayContaining {
  return new ArrayContaining(c);
}
