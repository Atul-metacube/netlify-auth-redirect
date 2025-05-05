const cookie = require("cookie");

exports.handler = async (event, context) => {
  const { user_id, email, redirect } = event.queryStringParameters;

  if (!user_id || !email || !redirect) {
    return {
      statusCode: 400,
      body: 'Missing parameters',
    };
  }

  return {
    statusCode: 302,
    headers: {
      Location: decodeURIComponent(redirect),
    },
    multiValueHeaders: {
      'Set-Cookie': [
        cookie.serialize('user_id', user_id, {
          httpOnly: false,
          secure: true,
          sameSite: 'None',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
        cookie.serialize('email', email, {
          httpOnly: false,
          secure: true,
          sameSite: 'None',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }),
      ]
    }
  };
};
