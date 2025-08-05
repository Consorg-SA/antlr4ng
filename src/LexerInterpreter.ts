/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Lexer } from "./Lexer";
import { LexerATNSimulator } from "./atn/LexerATNSimulator";
import { PredictionContextCache } from "./atn/PredictionContextCache";
import { DFA } from "./dfa/DFA";
import { ATN } from "./atn/ATN";
import { Vocabulary } from "./Vocabulary";
import { CharStream } from "./CharStream";

export class LexerInterpreter extends Lexer {
    private decisionToDFA: DFA[];
    private sharedContextCache = new PredictionContextCache();

    private _grammarFileName: string;
    private _atn: ATN;

    private _ruleNames: string[];
    private _channelNames: string[];
    private _modeNames: string[];

    private _vocabulary: Vocabulary;

    public constructor(grammarFileName: string, vocabulary: Vocabulary, ruleNames: string[], channelNames: string[],
        modeNames: string[], atn: ATN, input: CharStream) {
        super(input);

        if (atn.grammarType !== ATN.LEXER) {
            throw new Error("IllegalArgumentException: The ATN must be a lexer ATN.");
        }

        this._grammarFileName = grammarFileName;
        this._atn = atn;

        this._ruleNames = ruleNames.slice(0);
        this._channelNames = channelNames.slice(0);
        this._modeNames = modeNames.slice(0);
        this._vocabulary = vocabulary;

        this.decisionToDFA = atn.decisionToState.map((ds, i) => {
            return new DFA(ds, i);
        });

        this.interpreter = new LexerATNSimulator(this, atn, this.decisionToDFA, this.sharedContextCache);
    }

    public /*override*/ get atn(): ATN {
        return this._atn;
    }

    public get grammarFileName(): string {
        return this._grammarFileName;
    }

    public get ruleNames(): string[] {
        return this._ruleNames;
    }

    public get channelNames(): string[] {
        return this._channelNames;
    }

    public get modeNames(): string[] {
        return this._modeNames;
    }

    public get vocabulary(): Vocabulary {
        return this._vocabulary;
    }

    public get serializedATN(): number[] {
        throw new Error("The LexerInterpreter does not support the serializedATN property.");
    }
}
