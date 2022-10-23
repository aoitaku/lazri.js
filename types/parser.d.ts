import { Lazri } from './lazri';
declare type peg$LiteralExpectation = {
    type: 'literal';
    text: string;
    ignoreCase: boolean;
};
declare type peg$ClassExpectation = {
    type: 'class';
    parts: string[];
    inverted: boolean;
    ignoreCase: boolean;
};
declare type peg$AnyExpectation = {
    type: 'any';
};
declare type peg$EndExpectation = {
    type: 'end';
};
declare type peg$OtherExpectation = {
    type: 'other';
    description: string;
};
declare type peg$Expectation = peg$LiteralExpectation | peg$ClassExpectation | peg$AnyExpectation | peg$EndExpectation | peg$OtherExpectation;
declare type peg$LocationPosition = {
    offset: number;
    line: number;
    column: number;
};
declare type peg$Location = {
    source?: string;
    start: peg$LocationPosition;
    end: peg$LocationPosition;
};
declare class SyntaxError {
    expected: peg$Expectation[] | null;
    found: string | null;
    location: peg$Location;
    name: string;
    format(): string;
}
declare type lazri$ParseOption = {
    grammarSource?: string;
    startRule?: string;
};
declare function parse(input: string, options?: lazri$ParseOption): Lazri.Root;
export { parse, SyntaxError };
//# sourceMappingURL=parser.d.ts.map