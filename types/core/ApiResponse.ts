export interface ApiResponse<D> {
  data: D | null;
  message: string;
  errors?: string[];
}
