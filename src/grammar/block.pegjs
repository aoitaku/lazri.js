{{
  const TAB4 = '    ';
  function indentLevel(indent) {
    return Math.floor(indent.replace(/\t/g, TAB4).length / 2);
  }
  function transformStructure(source) {
    const [result,] = source.reduce(([result, stack], currentItem) => {
      const currentIndent = currentItem.indentLevel;
      const currentQuote = currentItem.quoteLevel == null ? 0 : currentItem.quoteLevel;
      while (stack.length > 0) {
        const [, stackParentIndent, stackParentQuote] = stack[stack.length-1];
        if (currentQuote < stackParentQuote) {
          stack.pop();
          continue;
        }
        if (currentQuote === stackParentQuote && currentIndent <= stackParentIndent) {
          stack.pop();
          continue;
        }
        break;
      }
      if (stack.length === 0) {
        result.push(currentItem);
      } else {
        const [parentNodeOnStack,] = stack[stack.length-1];
        if (parentNodeOnStack.items == null) {
          parentNodeOnStack.items = [];
        }
        parentNodeOnStack.items.push(currentItem);
      }
      stack.push([currentItem, currentIndent, currentQuote]);
      return [result, stack]
    }, [[],[]])
    return result;
  }
  function buildHtmlTree(source) {
    return source.reduce((html, node) => {
      switch (node.type) {
        case 'unorderedListItem':
          html.push({
            type: 'ul:li',
            content: node.items == null ? [] : buildHtmlTree(node.items),
          })
          break
        case 'orderedListItem':
          html.push({
            type: 'ol:li',
            content: [{
              type: 'li:content', 
              content: node.content,
            }]
          })
          html.push({
            type: 'ol:li',
            content: node.items == null ? [] : buildHtmlTree(node.items),
          })
          break
        case 'definitionListItem':
          html.push({
            type: 'dl:dt',
            content: node.content,
          })
          html.push({
            type: 'dl:dd',
            content: node.items == null ? [] : buildHtmlTree(node.items),
          })
          break
        case 'quotation':
          html.push({
            type: 'blockquote:content',
            content: node.items == null ? node.content : buildHtmlTree(node.items),
          })
          break
        default:
          html.push({
            type: 'text:content',
            content: node.items == null ? node.content : buildHtmlTree(node.items)
          })
      }
      return html
    }, []).reduce((nodes, node) => {
      const type = node.type.split(':')[0]
      let last = nodes[nodes.length - 1]
      if (!last || last.content[last.content.length - 1].type.split(':')[0] !== type) {
        last = {
          type,
          content: [],
        }
        nodes.push(last)
      }
      last.content.push(node)
      return nodes
    }, [])
  }
  function buildHtml(source) {
    return source.map((node) => {
      const type = node.type.split(':')[1] || node.type
      if (type === 'content') {
        return Array.isArray(node.content) ? buildHtml(node.content).join("") : node.content
      }
      const tag = `<${type}>${Array.isArray(node.content) ? buildHtml(node.content).join("\n") : node.content}</${type}>`
      return tag
    })
  }
}}

// Start rule for the parser
start = Document

// Document: Consists of Blocks separated by one or more BlankLines.
Document = blocks:(BlankLine* first:Section rest:(SectionBreak+ Section)* BlankLine* {
    return { first, rest }
  })? SP* EOF {
      if (!blocks) return [];
      const result = [blocks.first];
      if (blocks.rest) {
        blocks.rest.forEach((pair) => {
          const last = result.flat().slice(-1)[0]
          result.push({
            indentLevel: last.indentLevel,
            quoteLevel: last.quoteLevel,
            type: 'sectionbreak',
          })
          result.push(pair[1])
        });
      }
      return result.flat()
    }
  / BlankLine* EOF { return []; }

Section
  = blocks:(first:Block rest:(BlankLine Block)* {
    return { first, rest }
  }) {
      if (!blocks) return [];
      const result = [blocks.first];
      if (blocks.rest) {
        blocks.rest.forEach((pair) => {
          const last = result.flat().slice(-1)[0]
          result.push({
            indentLevel: last.indentLevel,
            quoteLevel: last.quoteLevel,
            type: 'blankline',
          })
          result.push(pair[1])
        });
      }
      return result.flat()
    }

// Block: A sequence of one or more ContentLines, concatenated.
Block
  = lines:(BlockContent)+ {
      return lines.flat();
    }

Heading
  = indent:Indent prefix:HeadingPrefix " "+ content:LineContent {
      return [{
        type: 'heading',
        headingLevel: prefix.length,
        content: prefix.join(''),
        indentLevel: indentLevel(indent),
      }, ...(Array.isArray(content) ? content : [content]).map((_) => {
        return {
          ..._,
          indentLevel: indentLevel(indent),
        }
      })];
    }

HeadingPrefix "Heading Prefix"
  = "=="+

BlockContent = Heading / BlockQuote / DefinitionListItem / ListItem / NormalContentLine

DefinitionListItem
  = indent:Indent term:DefinitionTerm (Newline / EOF) {
      return [{
        type: 'definitionListItem',
        content: term,
        indentLevel: indentLevel(indent),
      }];
    }
  / indent:Indent term:DefinitionTerm " "+ content:(BlockContent) {
      return [{
        type: 'definitionListItem',
        content: term,
        indentLevel: indentLevel(indent),
      }, ...(Array.isArray(content) ? content : [content]).map((_) => {
        return {
          ..._,
          indentLevel: _.indentLevel + indentLevel(indent) + 1,
        }
      })];
    }

DefinitionTerm "Definition List Term"
  = @TermText Colon

NormalExcludingInlineColons = !SP @(EscapedChar / (!Newline !Colon @.))

TermText
  = chars:NormalExcludingInlineColons+ { return chars.join('') }

ListItem
  = indent:Indent marker:OrderedListMarker (Newline / EOF) {
      return [{
        type: 'orderedListItem',
        content: marker,
        indentLevel: indentLevel(indent),
      }];
    }
  / indent:Indent marker:OrderedListMarker " "+ content:(BlockContent) {
      return [{
        type: 'orderedListItem',
        content: marker,
        indentLevel: indentLevel(indent),
      }, ...(Array.isArray(content) ? content : [content]).map((_) => {
        return {
          ..._,
          indentLevel: _.indentLevel + indentLevel(indent) + 1,
        }
      })];
    }
  / indent:Indent marker:ListMarker " "+ content:(BlockContent) {
      return [{
        type: 'unorderedListItem',
        content: marker,
        indentLevel: indentLevel(indent),
      }, ...(Array.isArray(content) ? content : [content]).map((_) => {
        return {
          ..._,
          indentLevel: _.indentLevel + indentLevel(indent) + 1,
        }
      })];
    }

OrderedListMarker "Ordered List Marker"
  = "-" " "+ @Number

Number
  = $([0-9]+ ".")+
  / $("("? [0-9]+ ")")

ListMarker "List Marker"
  = @"-" &(" "+)

BlockQuote
  = indent:Indent quote:QuoteMarker SP* (Newline / EOF) {
      return [{
        type: 'quotation',
        content: quote,
        indentLevel: indentLevel(indent),
      }];
    }
  / indent:Indent quote:QuoteMarker " " content:(BlockContent) {
      return [{
        type: 'quotation',
        content: quote,
        indentLevel: indentLevel(indent),
        quoteLevel: 0,
      }, ...(Array.isArray(content) ? content : [content]).map((_) => {
        return {
          ..._,
          indentLevel: indentLevel(indent),
          quoteLevel: _.quoteLevel != null ? _.quoteLevel + 1 : 1,
        }
      })];
    }

QuoteMarker "Quote Marker"
  = @">" &(" "+)

Indent "Indent"
  = $(SP)*

NormalContentLine "Non-List Item Line"
  = !(Heading / BlockQuote / DefinitionListItem / ListItem) indent:Indent? content:LineContent {
      return {
        type: 'normal',
        indentLevel: indentLevel(indent),
        ...content,
      };
    }

LineContent "A line of content with tilde handling"
  = content:LineTextIncludingInlineTildes Tilde Newline &NonBlankLineContentAhead {
      return { content, tildeAction: 'concat' };
    }
  / content:LineTextIncludingInlineTildes Tilde Newline &(BlankLineContentAhead / EOF) {
      return { content, tildeAction: 'ignore' };
    }
  / content:LineTextIncludingInlineTildes Tilde EOF {
      return { content, tildeAction: 'ignore' };
    }
  / content:NormalText (Newline / EOF) {
      return { content, tildeAction: 'none' };
    }

LineTextIncludingInlineTildes =
  chars:( ( NormalExcludingInlineTildes / @(Tilde !(Newline / EOF)) )+ ) { return chars.join(''); }

NormalText = chars:NormalChar+ { return chars.join('') }

NormalExcludingInlineTildes = EscapedChar / (!Newline !Tilde @.)

NormalChar = EscapedChar / (!Newline @.)

NonBlankLineContentAhead
  = !BlankLine

BlankLineContentAhead
  = BlankLine

SectionBreak
  = (SP* Newline) (SP* Newline)+

BlankLine "One or more blank lines for separation"
  = SP* Newline

SP "Optional whitespace characters"
  = [ \t]

EscapedChar = Escape @[\\.:"'`^*()%~\-]
Escape = "\\"

Tilde = "~"
Colon = ":"
Newline = "\n" / "\r\n" / "\r"
EOF = !. // End of File marker
