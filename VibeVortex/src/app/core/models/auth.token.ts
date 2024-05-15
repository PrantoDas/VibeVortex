export interface AuthToken {
    iss?: string;  // Issuer
    sub?: string;  // Subject
    aud?: string | string[];  // Audience
    exp: number;  // Expiration time (in seconds since the Unix epoch)
    nbf?: number;  // Not before
    iat?: number;  // Issued at (in seconds since the Unix epoch)
    jti?: string;  // JWT ID

    // Custom claims (example)
    userId?: string;  // Custom claim to store user's unique identifier
    roles?: string[];  // Custom claim to store roles associated with the user
}


