export interface IElectronics {
  id: number;
  category_type: string;
  title: string;
  image: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIElectronicsDTO {
  id: number;
  category_type: string;
  title: string;
  image: string;
}


export interface IElectronicsDetails {
  id: number;
  category_id: number;
  price: number;
  quantity: number;
  ratings: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIElectronicsDetails {
  category_id: number;
  price: number;
  quantity: number;
  ratings: number;

}
