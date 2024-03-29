export interface IUsers {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  created_at: Date;
  updated_at: Date;
  accesstoken: string;
  refreshtoken: string;
}

export interface CreationIUsersDTO {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  gender?: string;
  id?: number;
  accesstoken?: string;
  refreshtoken?: string;
}

export interface UserJwtDetailsDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  accesstoken?: string;
  refreshtoken?: string;
  gender?: string;
}
