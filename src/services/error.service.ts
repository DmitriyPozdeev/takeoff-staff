class ErrorDataService {
  getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }
};
const errorDataService = new ErrorDataService();
export default errorDataService;