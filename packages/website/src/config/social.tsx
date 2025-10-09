import * as React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

type SocialKey = 'facebook' | 'twitter' | 'instagram';

export type SocialItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

export const social: Record<SocialKey, SocialItem> = {
  facebook: {
    name: 'Facebook',
    url: 'https://twitter.com/KanagawaRifle',
    icon: <FaFacebook />,
  },
  twitter: {
    name: 'Twitter',
    url: 'https://www.facebook.com/KanagawaRifle',
    icon: <FaTwitter />,
  },
  instagram: {
    name: 'Instagram',
    url: 'https://www.instagram.com/KanagawaRifle',
    icon: <FaInstagram />,
  },
};
