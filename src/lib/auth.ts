export const SESSION_COOKIE = 'tpq_admin_session';
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET belum diset pada environment variable');
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signSession(expiresAt: number): Promise<string> {
  const payload = String(expiresAt);
  return `${payload}.${await hmac(payload)}`;
}

export async function createSessionToken(): Promise<{ token: string; expiresAt: number }> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  return { token: await signSession(expiresAt), expiresAt };
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const separator = token.lastIndexOf('.');
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expiresAt = Number(payload);
  if (!Number.isSafeInteger(expiresAt)) return false;

  let expected: string;
  try {
    expected = await hmac(payload);
  } catch {
    return false;
  }

  if (!constantTimeEqual(signature, expected)) return false;

  return expiresAt > Date.now();
}
