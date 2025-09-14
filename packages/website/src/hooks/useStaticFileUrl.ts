const useStaticFileUrl = (path?: string): string => {
  const baseUrl: string = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL || 'https://static.kanagawa-rifle.org/website';

  if (!path) return baseUrl;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath: string = path.startsWith('/') ? path : `/${path}`;
  const cleanBaseUrl: string = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  return `${cleanBaseUrl}${normalizedPath}`;
};

export default useStaticFileUrl;
