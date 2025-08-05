/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import type { ParserRuleContext } from "../ParserRuleContext";
import type { ErrorNode } from "./ErrorNode";
import type { TerminalNode } from "./TerminalNode";

export interface ParseTreeListener {
    visitTerminal(node: TerminalNode): void;
    visitErrorNode(node: ErrorNode): void;
    enterEveryRule(node: ParserRuleContext): void;
    exitEveryRule(node: ParserRuleContext): void;
}
