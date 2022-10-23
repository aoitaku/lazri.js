Doc = BlockNode*

BlockNode = BlankLine / BlockElement / Section

BlankLine = NL+
{
  return { type: 'blankline' }
}

BlockElement = Ruler / Header / RightAlignedBlock / IndentedBlock

Ruler = !NL "***" LineEnding
{
  return { type: 'ruler' }
}

Header = Title / Heading / Subheading

TitlePrefix = !NL "======" SP+
Title = TitlePrefix content:HeaderContainables HeaderEnding
{
  return { type: 'title', content }
}

HeadingPrefix = !NL "====" SP+
Heading = HeadingPrefix content:HeaderContainables HeaderEnding
{
  return { type: 'heading', content }
}

SubheadingPrefix = !NL "==" SP+
Subheading = SubheadingPrefix content:HeaderContainables HeaderEnding
{
  return { type: 'subheading', content }
}

HeaderContainables = HeaderContainable+
HeaderContainable = InlineElement / HeaderContainableText
HeaderContainableText = content:$HeaderContainableChar+
{
  return { type: 'text', content }
}
HeaderContainableChar = !(InlineElement / HeaderSuffix / NL) .

HeaderEnding = HeaderSuffix / LineEnding
HeaderSuffix = !NL SP+ $("==" "="*) LineEnding


IndentedBlock = content:(IndentedBlockSentence / BlankLine)+ {
  return { type: 'indented', content }
}

IndentedBlockPrefix = !NL "        "
IndentedBlockSentence = IndentedBlockPrefix @Sentence

RightAlignedBlock = content:(RightAlignedBlockSentence / BlankLine)+ {
  return { type: 'align-right', content }
}

RightAlignedBlockPrefix = !NL "                " [ ]*
RightAlignedBlockSentence = RightAlignedBlockPrefix @Sentence

Section = content:(@Paragraph NL?)+
{
  return { type: 'section', content }
}

Paragraph = content:Sentence+
{
  return { type: 'paragraph', content }
}

Sentence = !(BlockElement / "    " / NL) content:InlineNodes LineEnding
{
  return { type: 'sentence', content }
}

InlineNodes = InlineNode+

InlineNode = InlineElement / Text

InlineElement = Bouten / Cite / Rubi

BoutenMarker = !EscapePrefix "``"
BoutenText = chars:(EscapedChar / (!BoutenMarker @[^\r\n]))+ { return chars.join('') }

Bouten = BoutenMarker content:BoutenText BoutenMarker
{
  return { type: 'bouten', content }
}

CiteMarker = !EscapePrefix '""'
CiteText = chars:(EscapedChar / (!CiteMarker @[^\r\n]))+ { return chars.join('') }

Cite = CiteMarker content:CiteText CiteMarker
{
  return { type: 'cite', content }
}

RubiPrefix = !(EscapePrefix "^") "^"
LParenthesis = !(EscapePrefix "(") "("
RParenthesis = !(EscapePrefix ")") ")"
RubiText = chars:(EscapedChar / [^)\r\n])+ { return chars.join('') }
RubiBase = chars:(EscapedChar / [^(\r\n])+ { return chars.join('') }

Rubi = RubiPrefix base:RubiBase LParenthesis rubi:RubiText RParenthesis
{
  return { type: 'rubi', content: { base, rubi } }
}

Text = chars:(EscapedChar / Char)+
{
  return { type: 'text', content: chars.join('') }
}

Char = !(InlineElement / EscapePrefix / NL) @.

EscapedChar = EscapePrefix @[\\"`^()%\-]
EscapePrefix = "\\"

NL = "\r\n" / [\r\n]
SP = [ \t]
EOF = !.

LineEnding = NL / EOF
