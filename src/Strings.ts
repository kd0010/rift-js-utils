class _Strings {
  /**
   * Concatenates all strings provided into one string.
   * 
   * Ignores nullish values and empty strings.
   */
  joinTogether(
    ...args: (string | number | undefined | null)[]
  ) {
    return this.joinWithChar('', ...args)
  }

  /**
   * Concatenates all strings provided into one string,
   * separated by the desired character.
   * 
   * Ignores nullish values and empty strings.
   */
  joinWithChar(
    char: string,
    ...args: (string | number | undefined | null)[]
  ): string {
    let productSt = ''

    for (let i = 0; i < args.length; ++i) {
      let st = args[ i ]
      if (st == null || st === '') continue
      if (i != 0) productSt += char
      productSt += st
    }

    return productSt
  }
}

/**
 * A collection of string manipulation functions.
 */
export const Strings = new _Strings()
