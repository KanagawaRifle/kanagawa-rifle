const config = {
  filters: {
    comments: true,
  },
  rules: {
    'preset-japanese': {
      'sentence-length': {
        max: 100,
      },
      'max-ten': {
        max: 3,
      },
      'max-kanji-continuous-len': {
        max: 6,
      },
      'no-mix-dearu-desumasu': {
        preferInHeader: '',
        preferInBody: 'ですます',
        preferInList: 'である',
        strict: false,
      },
      'no-double-negative-ja': true,
      'no-dropping-the-ra': true,
      'no-doubled-conjunctive-particle-ga': true,
      'no-doubled-conjunction': true,
      'no-doubled-joshi': {
        min_interval: 1,
        strict: false,
        allow: ['も', 'や'],
      },
      'no-nfd': true,
      'no-invalid-control-character': true,
      'no-zero-width-spaces': true,
    },

    'preset-ja-technical-writing': {
      'sentence-length': {
        max: 100,
      },
      'no-exclamation-question-mark': false,
      'no-doubled-conjunction': true,
      'max-ten': {
        max: 3,
      },
      'max-kanji-continuous-len': {
        max: 6,
      },
      'no-mix-dearu-desumasu': {
        preferInHeader: '',
        preferInBody: 'ですます',
        preferInList: 'である',
        strict: false,
      },
      'no-hankaku-kana': true,
      'ja-no-weak-phrase': false,
      'ja-no-successive-word': true,
      'ja-no-redundant-expression': true,
      'ja-unnatural-alphabet': true,
      'max-comma': false,
      'arabic-kanji-numbers': false,
      'no-doubled-joshi': {
        strict: false,
        allow: ['も', 'や', 'が', 'に'],
        separatorCharacters: ['、', '。', '：', ':', ';', '；', '!', '！', '?', '？'],
      },
    },

    'preset-ja-spacing': {
      'ja-space-between-half-and-full-width': {
        space: 'always',
        exceptPunctuation: true,
      },
      'ja-no-space-between-full-width': true,
      'ja-space-after-exclamation': true,
      'ja-space-after-question': true,
      'ja-nakaguro-or-halfwidth-space-between-katakana': true,
      'ja-no-space-around-parentheses': true,
    },
    'no-doubled-joshi': {
      strict: false,
      allow: ['も', 'や', 'か'],
      separatorCharacters: ['、', '。', ':', ';'],
    },
    'no-start-duplicated-conjunction': {
      interval: 2,
    },
    'no-surrogate-pair': true,
    'ja-no-inappropriate-words': true,
    'ja-no-redundant-expression': true,
    'ja-unnatural-alphabet': true,
    'ja-no-orthographic-variants': true,
    'ja-hiragana-fukushi': true,
    'ja-hiragana-hojodoushi': true,
    'prefer-tari-tari': true,
    'no-hoso-kinshi-yogo': true,
    'no-mixed-zenkaku-and-hankaku-alphabet': true,
    'jis-charset': true,
    'use-si-units': true,
  },
};

export default config;
