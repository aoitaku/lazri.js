import { describe, it, expect } from 'vitest'
import { parse } from '../src/main'

describe('rubi', () => {
  it('rubi', () => {
    expect(parse('^薔薇(ばら)^薔(しょう)^薇(び)')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'rubi',
            content: {
              base: '薔薇',
              rubi: 'ばら'
            },
          },{
            type: 'rubi',
            content: {
              base: '薔',
              rubi: 'しょう'
            },
          },{
            type: 'rubi',
            content: {
              base: '薇',
              rubi: 'び'
            },
          }]
        }]
      }]
    }])
  })
  it('text, bouten, text', () => {
    expect(parse('富士の頂角、^広重(ひろしげ)の富士は八十五度、^文晁(ぶんてう)の富士も八十四度くらゐ')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'text',
            content: '富士の頂角、'
          },{
            type: 'rubi',
            content: {
              base: '広重',
              rubi: 'ひろしげ'
            },
          },{
            type: 'text',
            content: 'の富士は八十五度、'
          },{
            type: 'rubi',
            content: {
              base: '文晁',
              rubi: 'ぶんてう'
            },
          },{
            type: 'text',
            content: 'の富士も八十四度くらゐ'
          }]
        }]
      }]
    }])
  })
  it('backtick inside bouten', () => {
    expect(parse('^ルビつき文字列(の中に^サーカムフレックスが入ってる)')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'rubi',
            content: {
              base: 'ルビつき文字列',
              rubi: 'の中に^サーカムフレックスが入ってる'
            },
          }]
        }]
      }]
    }])
  })
  it('bouten with escaped backtick', () => {
    expect(parse('\\^ここルビじゃない^ルビの途中に(閉じカッコ\\)がある)とどうなる？')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'text',
            content: '^ここルビじゃない'
          },{
            type: 'rubi',
            content: {
              base: 'ルビの途中に',
              rubi: '閉じカッコ)がある'
            },
          },{
            type: 'text',
            content: 'とどうなる？'
          }]
        }]
      }]
    }])
  })
})
