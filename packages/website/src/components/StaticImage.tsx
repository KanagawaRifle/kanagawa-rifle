import 'server-only';

import { getImageProps, type ImageProps } from 'next/image';

type Props = Pick<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'fill' | 'sizes' | 'className' | 'style' | 'loading' | 'quality' | 'unoptimized'
>;

// These images need optimized URLs and native lazy loading, but no browser-side
// state, event handlers or blur placeholders. Keep their rendering on the server.
export function StaticImage(props: Props) {
  const { props: imageProps } = getImageProps(props);
  // eslint-disable-next-line @next/next/no-img-element -- getImageProps retains Next.js image optimization.
  return <img {...imageProps} alt={props.alt} />;
}
