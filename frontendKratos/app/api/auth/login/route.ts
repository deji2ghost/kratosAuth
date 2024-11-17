// app/auth/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const KRATOS_ADMIN_API = 'http://localhost:4433';  // Admin Kratos API URL
const KRATOS_PUBLIC_API = 'http://localhost:4434'; // Public Kratos API URL

// Function to check if the user is already authenticated
async function isAuthenticated() {
  const authToken = cookies().get('kratos_session');
  if (!authToken) return false;

  const res = await fetch(`${KRATOS_ADMIN_API}/sessions/whoami`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });

  if (res.ok) {
    return true;
  }

  return false;
}

// Route handler for the login flow
export async function GET(req: Request) {
  // Check if the user is already authenticated
  if (await isAuthenticated()) {
    return NextResponse.redirect(new URL('/dashboard', req.url));  // Redirect to the dashboard if authenticated
  }

  // If the user is not authenticated, create a login flow
  const flowResponse = await fetch(`${KRATOS_PUBLIC_API}/self-service/login/browser`, {
    method: 'GET',
  });

  if (!flowResponse.ok) {
    return new NextResponse('Failed to initiate login flow', { status: 500 });
  }

  const flowData = await flowResponse.json();
  const { id: flowId } = flowData;

  // Redirect the user to the login page with the flow ID
  return NextResponse.redirect(
    new URL(`/login?flow=${flowId}`, req.url)
  );
}

// Route handler for handling the login form submission
export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const flowId = formData.get('flow') as string;

  // Submit the login request to Kratos
  const loginResponse = await fetch(`${KRATOS_PUBLIC_API}/self-service/login?flow=${flowId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      method: 'password',
      password: {
        identifier: email,
        password: password,
      },
    }),
  });

  if (!loginResponse.ok) {
    const errorData = await loginResponse.json();
    return new NextResponse(JSON.stringify(errorData), { status: 400 });
  }

  const loginData = await loginResponse.json();

  // If the login is successful, store the session cookie
  cookies().set('kratos_session', loginData.session.token);

  // Redirect to the user's dashboard or home page after successful login
  return NextResponse.redirect(new URL('/dashboard', req.url));
}

