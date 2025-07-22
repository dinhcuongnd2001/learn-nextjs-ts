export class CustomResponse<T> extends Response {
  constructor(result: T, code: number = 200, message: string = 'Success') {
    super(JSON.stringify({ result, code, message }), {
      status: code,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
