interface UDocument<T> {
  id: string;
  uid: string;
  data: T;
  timestamp: number;
  utimestamp: number;
}
