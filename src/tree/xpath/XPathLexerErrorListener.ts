/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Recognizer } from "../../Recognizer";
import { RecognitionException } from "../../RecognitionException";
import { Token } from "../../Token";
import { ATNSimulator } from "../../atn/ATNSimulator";
import { BaseErrorListener } from "../../BaseErrorListener";

export class XPathLexerErrorListener extends BaseErrorListener {
    public override syntaxError<S extends Token, T extends ATNSimulator>(_recognizer: Recognizer<T>,
        _offendingSymbol: S | null,
        _line: number,
        _charPositionInLine: number,
        _msg: string,
        _e: RecognitionException | null): void {
        // intentionally empty
    }
}
