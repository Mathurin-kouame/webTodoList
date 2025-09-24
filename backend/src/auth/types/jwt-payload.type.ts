export type JwtPayload = {
  id(id: any): unknown;
  userId: number;
  email: string;
};
