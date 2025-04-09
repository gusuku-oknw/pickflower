// pages/api/auth/[...auth0].ts
import { handleAuth } from '@auth0/nextjs-auth0';
console.log("handleAuth:", handleAuth);
export default handleAuth();
