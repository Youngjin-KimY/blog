export const site = {
  title: 'Writing, Playing, Coding',
  description:
    'A quiet engineering notebook for algorithms, backend systems, and practical web development.',
  url: 'https://oneday-everyday.com',
  author: 'Youngjin Kim',
  handle: '@Youngjin-KimY',
  github: 'https://github.com/Youngjin-KimY'
} as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}
