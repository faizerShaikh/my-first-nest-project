export interface ResponseDTO<T> {
  data?: T;
  messages?: string | string[];
  success?: boolean;
  statusCode?: number;
}
