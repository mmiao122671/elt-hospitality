import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // Validate the data
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        message: 'Missing required fields'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Create the email content
    const emailContent = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    // Send email using mailto link
    const mailtoUrl = `mailto:BFullertonLewis@hollandcollege.com?subject=Contact Form Submission from ${name}&body=${encodeURIComponent(emailContent)}`;

    return new Response(JSON.stringify({
      message: 'Success',
      mailtoUrl
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Error processing request'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 