const config = {
  'packages/website/**/*': () => [
    'npm run fix --workspace=@kanagawa-rifle/website',
  ],
};

export default config;
