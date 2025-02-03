import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

// export const verifyToken = (token: string) => {
//   return jwtDecode(token);
// };

export const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null; // Handle invalid token
  }
};
