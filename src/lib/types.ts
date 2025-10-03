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