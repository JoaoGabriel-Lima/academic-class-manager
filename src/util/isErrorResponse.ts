export interface ErrorResponse {
  message: string;
  errors?: string[];
}

const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ErrorResponse).message === "string"
  );
};

export default isErrorResponse;
