import { Lazri } from '../lazri'

function htmlTransform(parsed: Lazri.Root) {
  return parsed.map((node) => {
    switch (node.type) {
    case 'section':
      return transformSection(node.content)
    case 'blankline':
      return ''
    case 'title':
      return transformTitle(node.content)
    case 'heading':
      return transformHeading(node.content)
    case 'subheading':
      return transformSubheading(node.content)
    case 'indented':
      return transformIndentedBlock(node.content)
    case 'align-right':
      return transformRightAlignedBlock(node.content)
    case 'ruler':
      return '<hr>'
    }
  }).join('\n')
}

function transformTitle(content: Lazri.InlineNode[]) {
  return `<h1>${ transformSentence(content) }</h1>`
}

function transformHeading(content: Lazri.InlineNode[]) {
  return `<h2>${ transformSentence(content) }</h2>`
}

function transformSubheading(content: Lazri.InlineNode[]) {
  return `<h3>${ transformSentence(content) }</h3>`
}

function transformSection(nodes: Lazri.Paragraph[]) {
  return `<div class="section">${
    nodes.filter(({ type }) => type === 'paragraph')
      .map(({ content }) => {
        return transformParagraph(content)
      })
      .join('\n')
  }</div>`
}

function transformParagraph(nodes: Lazri.Sentence[]) {
  return `<p>${
    nodes.filter(({ type }) => type === 'sentence')
      .map(({ content }) => {
        return transformSentence(content)
      })
      .join('<br>\n')
  }</p>`
}

function transformIndentedBlock(nodes: Array<Lazri.BlankLine | Lazri.Sentence>) {
  return `<div class="indented section"><p>${
    nodes.filter((node): node is Lazri.Sentence => node.type === 'sentence')
      .map(({ content }) => {
        return transformSentence(content)
      })
      .join('<br>\n')
  }</p></div>`
}

function transformRightAlignedBlock(nodes: Array<Lazri.BlankLine | Lazri.Sentence>) {
  return `<div data-align="right"><p>${
    nodes.filter((node): node is Lazri.Sentence => node.type === 'sentence')
      .map(({ content }) => {
        return transformSentence(content)
      })
      .join('<br>\n')
  }</p></div>`
}

function transformSentence(nodes: Lazri.InlineNode[]) {
  return nodes.map(({ type, content }) => {
    switch (type) {
    case 'text':
      return content
    case 'bouten':
      return transformBouten(content)
    case 'rubi':
      return transformRubi(content)
    case 'cite':
      return transformCite(content)
    }
  }).join('')
}

function transformBouten(content: Lazri.Text) {
  return `<em class="bouten">${ content }</em>`
}

function transformCite(content: Lazri.Text) {
  return `<cite>${ content }</cite>`
}

function transformRubi(content: { base: Lazri.Text, rubi: Lazri.Text }) {
  const { base, rubi } = content
  return `<ruby>${ base }<rp>（</rp><rt>${ rubi }</rt><rp>）</rp></ruby>`
}

export {
  htmlTransform,
}
