export interface SingupErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
  password?: string[];
  confirmPassword?: string[];
  countryCode?: string[];
  general?: string;
}

export interface SingupInitialState {
  message: string;
  errors?: SingupErrors;
}

export interface LoginErrors {
  email?: string[];
  password?: string[];
  general?: string;
}

export interface LoginInitialState {
  message: string;
  errors?: LoginErrors;
}

export interface ProductCardProps {
  activeThumb: number;
  setActiveThumb: React.Dispatch<React.SetStateAction<number>>;
  thumbnails: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StarRatingProps {
  rating: number;
  reviewId?: string;
  size?: number;
}

export interface RatingBarProps {
  star: number;
  percentage: number;
}

export interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryCode: string; // ISO code (e.g., "US")
  mobile: string;
  terms: boolean;
}

export interface FormStateType {
  message?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    countryCode?: string[]; // ISO code (e.g., "US") – for UI
    mobile?: string[];
  };
}

export interface FormStateLogin  {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};
