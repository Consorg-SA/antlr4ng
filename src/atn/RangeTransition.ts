/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { IntervalSet } from "../misc/IntervalSet";
import { ATNState } from "./ATNState";
import { Transition } from "./Transition";

export class RangeTransition extends Transition {
    public readonly start: number;
    public readonly stop: number;

    private readonly _label = new IntervalSet();

    public constructor(target: ATNState, start: number, stop: number) {
        super(target);
        this.start = start;
        this.stop = stop;
        this._label.addRange(start, stop);
    }

    public /*override*/ get label(): IntervalSet {
        return this._label;
    }

    public get transitionType(): number {
        return Transition.RANGE;
    }

    public matches(symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean {
        return symbol >= this.start && symbol <= this.stop;
    }

    public /*override*/ toString(): string {
        return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
    }
}
