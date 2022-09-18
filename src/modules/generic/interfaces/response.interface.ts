export interface ResponseDTO<T> {
  data?: T;
  message?: string | string[];
  success?: boolean;
  statusCode?: number;
  token?: string;
}
