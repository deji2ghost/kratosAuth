export interface DataProps{
    csrf_token: string; // CSRF token, can be an empty string
  traits: {
    email: string; // User email
  };
  password: string; // User password
}