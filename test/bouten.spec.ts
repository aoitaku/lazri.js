import { describe, it, expect } from 'vitest'
import { parse } from '../src/main'

describe('bouten', () => {
  it('bouten', () => {
    expect(parse('``傍点つき文字列``')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'bouten',
            content: '傍点つき文字列'
          }]
        }]
      }]
    }])
  })
  it('text, bouten, text', () => {
    expect(parse('途中で``傍点つき文字列``が入る')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'text',
            content: '途中で'
          },{
            type: 'bouten',
            content: '傍点つき文字列'
          },{
            type: 'text',
            content: 'が入る'
          }]
        }]
      }]
    }])
  })
  it('backtick inside bouten', () => {
    expect(parse('``傍点の中に`バッククオートつき`文字列``')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'bouten',
            content: '傍点の中に`バッククオートつき`文字列'
          }]
        }]
      }]
    }])
  })
  it('bouten with escaped backtick', () => {
    expect(parse('\\``ここ傍点じゃない``傍点の中に`バッククオートつき\\``文字列``')).toMatchObject([{
      type: 'section', content: [{
        type: 'paragraph', content: [{
          type: 'sentence', content: [{
            type: 'text',
            content: '``ここ傍点じゃない'
          },{
            type: 'bouten',
            content: '傍点の中に`バッククオートつき``文字列'
          }]
        }]
      }]
    }])
  })
})
