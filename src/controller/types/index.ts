/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string;
};

export type BasicDateResponse = {
  message: string;
  date: Date;
};

/**
 * Error JSON response for Controllers
 */
export type ErrorResponse = {
  error: string;
  message: string;
};

/**
 * Auth JSON response for Controllers
 */
export type AuthResponse = {
  message: string;
  token: string;
};
