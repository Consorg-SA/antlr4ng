/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/* eslint-disable no-underscore-dangle */

import { Parser } from "./Parser";
import { ParserRuleContext } from "./ParserRuleContext";
import { ParseTreeListener } from "./tree/ParseTreeListener";
import { TerminalNode } from "./tree/TerminalNode";

export class TraceListener implements ParseTreeListener {
    private parser: Parser;

    public constructor(parser: Parser) {
        this.parser = parser;
    }

    public enterEveryRule(ctx: ParserRuleContext): void {
        console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" +
            this.parser.inputStream?.LT(1)?.text);
    }

    public visitTerminal(node: TerminalNode): void {
        console.log("consume " + node.getSymbol() + " rule " + this.parser.ruleNames[this.parser.context!.ruleIndex]);
    }

    public exitEveryRule(ctx: ParserRuleContext): void {
        console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" +
            this.parser.inputStream?.LT(1)?.text);
    }

    public visitErrorNode(_node: TerminalNode): void {
        // intentionally empty
    }
}
