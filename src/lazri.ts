export namespace Lazri {
  export type Text = {
    type: 'text'
    content: string
  }
  export type Rubi = {
    type: 'rubi'
    content: {
      base: Text
      rubi: Text
    }
  }
  export type Bouten = {
    type: 'bouten'
    content: Text
  }
  export type Cite = {
    type: 'cite'
    content: Text
  }
  export type InlineElement = Cite | Bouten | Rubi
  export type InlineNode = InlineElement | Text
  export type Sentence = {
    type: 'sentence'
    content: InlineNode[]
  }
  export type Paragraph = {
    type: 'paragraph'
    content: Sentence[]
  }
  export type Section = {
    type: 'section'
    content: Paragraph[]
  }
  export type IndentedBlock = {
    type: 'indented'
    content: Array<BlankLine | Sentence>
  }
  export type RightAlignedBlock = {
    type: 'align-right'
    content: Array<BlankLine | Sentence>
  }
  export type Subheading = {
    type: 'subheading'
    content: InlineNode[]
  }
  export type Heading = {
    type: 'heading'
    content: InlineNode[]
  }
  export type Title = {
    type: 'title'
    content: InlineNode[]
  }
  export type Header = Title | Heading | Subheading
  export type Ruler = {
    type: 'ruler'
  }
  export type BlockElement = Ruler | Header | RightAlignedBlock | IndentedBlock
  export type BlankLine = {
    type: 'blankline'
  }
  export type BlockNode = BlankLine | BlockElement | Section
  export type Root = BlockNode[]
}
