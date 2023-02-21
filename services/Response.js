class Response {
  constructor(status, data, error, notification = {}) {
    this.status = status;
    this.data = data;
    this.notification = notification;
    this.error = error || {};
    this.success = error ? false : true;
    if (error && typeof data === "object") {
      this.error.info = this.data;
    }
  }
  getError(cb) {
    cb({
      status: this.status,
      data: this.data,
      error: {
        stackMsg: this.error.message || "",
        systemName: "",
        frendlyMsg: this.error.frendlyMsg || "",
        action: "none",
        show: true,
      },
      succes: this.success,
      notification: this.notification,
    });
  }
}

module.exports = Response;
