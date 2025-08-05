/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNState } from "./ATNState";
import { DecisionState } from "./DecisionState";

/**
 * The Tokens rule start state linking to each lexer rule start state
 */
export class TokensStartState extends DecisionState {
    public static override readonly stateType = ATNState.TOKEN_START;
}
