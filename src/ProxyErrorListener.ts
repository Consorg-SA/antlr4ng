/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { BaseErrorListener } from "./BaseErrorListener";
import { Parser } from "./Parser";
import { RecognitionException } from "./RecognitionException";
import { Recognizer } from "./Recognizer";
import { Token } from "./Token";
import { ATNConfigSet } from "./atn/ATNConfigSet";
import { ATNSimulator } from "./atn/ATNSimulator";
import { DFA } from "./dfa/DFA";
import { BitSet } from "./misc/BitSet";

export class ProxyErrorListener extends BaseErrorListener {
    public constructor(private delegates: BaseErrorListener[]) {
        super();

        return this;
    }

    public /*override*/ syntaxError<S extends Token, T extends ATNSimulator>(recognizer: Recognizer<T>,
        offendingSymbol: S | null, line: number, column: number, msg: string, e: RecognitionException | null): void {
        this.delegates.forEach((d) => {
            d.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
        });
    }

    public /*override*/ reportAmbiguity(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, exact: boolean,
        ambigAlts: BitSet | undefined, configs: ATNConfigSet): void {
        this.delegates.forEach((d) => {
            d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
        });
    }

    public /*override*/ reportAttemptingFullContext(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number,
        conflictingAlts: BitSet | undefined, configs: ATNConfigSet): void {
        this.delegates.forEach((d) => {
            d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs);
        });
    }

    public /*override*/ reportContextSensitivity(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number,
        prediction: number, configs: ATNConfigSet): void {
        this.delegates.forEach((d) => {
            d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs);
        });
    }
}
