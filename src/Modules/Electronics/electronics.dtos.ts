export interface IElectronics {
  id: number;
  category_type: string;
  title: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIElectronicsDTO {
  id: number;
  category_type: string;
  title: string;
  image : string;
}