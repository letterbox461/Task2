class DBError extends Error {
  private status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  public static InitializeFailed() {
    return new DBError(
      500,
      "Unable to connect to Postgres DB, check if Postgres SQL service is running."
    );
  }
}

export default DBError;
