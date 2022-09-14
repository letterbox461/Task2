class ParseError extends Error {
  private status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  public static parsingFailed(uri: string) {
    return new ParseError(500, `Failed to get text from ${uri}`);
  }
}

export default ParseError;
