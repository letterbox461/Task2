class NatsError extends Error {
  private status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  public static FailedToConnect() {
    return new NatsError(
      500,
      "Unable to connect to NATS server, check if the server is running."
    );
  }
}

export default NatsError;
