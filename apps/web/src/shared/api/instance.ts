/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/return-await */
import ky from 'ky';
import { redirect } from 'react-router';

const BASE_URL = 'http://localhost:3000';

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 60000,
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = localStorage.getItem('access_token');
        request.headers.set('Authorization', `Bearer ${accessToken}`);
        request.headers.set('cache', 'no-store');
      },
    ],
    afterResponse: [
      (_input, _options, response) => {
        if (response.status === 403) {
          redirect('/login');
        }
      },
      // Retry with a new token on a 401 error
      async (request, _options, response) => {
        if (response.status === 401) {
          try {
            const newAccessToken = await ky.post(`${BASE_URL}/auth/refresh`, { credentials: 'include' }).text();

            if (newAccessToken) {
              localStorage.setItem('access_token', newAccessToken);
              request.headers.set('Authorization', `Bearer ${newAccessToken}`);
              return ky(request);
            }
          } catch (error) {
            localStorage.removeItem('access_token');
            redirect('/login');
          }
        }
      },
    ],
  },
});
