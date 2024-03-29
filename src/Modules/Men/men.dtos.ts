export interface IMen {
  id: number;
  category_type: string;
  price: number;
  quantity: number;
  sizes: string;
  ratings: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIMenDTO {
  id: number;
  category_type: string;
  price: number;
  quantity: number;
  sizes: string;
  ratings: number;
}

// export interface UserJwtDetailsDTO {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;

//   }
