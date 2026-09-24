export type SocialKey = 'facebook' | 'twitter' | 'instagram';

export type SocialItem = {
  name: string;
  url: string;
};

export const social: Record<SocialKey, SocialItem> = {
  facebook: {
    name: 'Facebook',
    url: 'https://www.facebook.com/KanagawaRifle',
  },
  twitter: {
    name: 'X (Twitter)',
    url: 'https://twitter.com/KanagawaRifle',
  },
  instagram: {
    name: 'Instagram',
    url: 'https://www.instagram.com/KanagawaRifle',
  },
};
