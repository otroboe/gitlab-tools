import { CoreConfig } from '@/config';

type RequestOptions = {
  relativeUrl: string;
};

/**
 * Request to Gitlab API
 */
export const makeRequest = async <T>(config: CoreConfig, options: RequestOptions): Promise<T | null> => {
  const { baseApiUrl, token } = config;
  const { relativeUrl } = options;
  const url = `${baseApiUrl}/${relativeUrl}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error while executing HTTP request', error);

    return null;
  }
};
