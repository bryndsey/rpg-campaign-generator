export const safeGetError = (error: unknown): Error => {
  try {
    return error instanceof Error
      ? error
      : typeof error === "string"
        ? new Error(error)
        : typeof error === "object"
          ? new Error(JSON.stringify(error))
          : new Error("Unknown error");
  } catch {
    return new Error("Unknown error");
  }
};
