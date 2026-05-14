import {
  SignJWT,
  jwtVerify,
  type JWTPayload,
} from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET,
);

export interface JwtPayload
  extends JWTPayload {
  userId: string;
}

export async function signToken(
  payload: JwtPayload,
) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(
  token: string,
): Promise<JwtPayload> {
  const { payload } =
    await jwtVerify(token, secret);

  return payload as JwtPayload;
}