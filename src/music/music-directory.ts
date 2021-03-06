type MusicDirectoryType = {
  title: string;
  artist: string;
  path: string;
};

const MusicDirectory: Record<string, MusicDirectoryType> = {
  epic: {
    title: 'Epic',
    artist: 'Bensound',
    path: '/possible/epic',
  },
};
