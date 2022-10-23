export declare namespace Lazri {
    type Text = {
        type: 'text';
        content: string;
    };
    type Rubi = {
        type: 'rubi';
        content: {
            base: Text;
            rubi: Text;
        };
    };
    type Bouten = {
        type: 'bouten';
        content: Text;
    };
    type Cite = {
        type: 'cite';
        content: Text;
    };
    type InlineElement = Cite | Bouten | Rubi;
    type InlineNode = InlineElement | Text;
    type Sentence = {
        type: 'sentence';
        content: InlineNode[];
    };
    type Paragraph = {
        type: 'paragraph';
        content: Sentence[];
    };
    type Section = {
        type: 'section';
        content: Paragraph[];
    };
    type IndentedBlock = {
        type: 'indented';
        content: Array<BlankLine | Sentence>;
    };
    type RightAlignedBlock = {
        type: 'align-right';
        content: Array<BlankLine | Sentence>;
    };
    type Subheading = {
        type: 'subheading';
        content: InlineNode[];
    };
    type Heading = {
        type: 'heading';
        content: InlineNode[];
    };
    type Title = {
        type: 'title';
        content: InlineNode[];
    };
    type Header = Title | Heading | Subheading;
    type Ruler = {
        type: 'ruler';
    };
    type BlockElement = Ruler | Header | RightAlignedBlock | IndentedBlock;
    type BlankLine = {
        type: 'blankline';
    };
    type BlockNode = BlankLine | BlockElement | Section;
    type Root = BlockNode[];
}
//# sourceMappingURL=lazri.d.ts.map