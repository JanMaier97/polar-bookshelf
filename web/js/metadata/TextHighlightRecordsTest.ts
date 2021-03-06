import {TestingTime} from '../test/TestingTime';
import {TextHighlightRecords} from './TextHighlightRecords';
import {assertJSON} from '../test/Assertions';
import {Rect} from '../Rect';
import {TextRect} from './TextRect';
import {Dictionaries} from '../util/Dictionaries';

TestingTime.freeze();

describe('TextHighlightRecords', function() {

    describe('create', function() {

        it("basic", function () {

            let rects: Rect[] = [ new Rect({top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100})];
            let textSelections: TextRect[] = [{text: "hello world"}];
            let text = "hello world";

            // create a basic TextHighlight object..
            let textHighlightRecord = TextHighlightRecords.create(rects, textSelections, text);

            let expected = {
                "id": "1Af41QXbBH",
                "value": {
                    "id": "1Af41QXbBH",
                    "created": "2012-03-02T11:38:49.321Z",
                    "lastUpdated": "2012-03-02T11:38:49.321Z",
                    "rects": {
                        "0": {
                            "left": 100,
                            "top": 100,
                            "right": 200,
                            "bottom": 200,
                            "width": 100,
                            "height": 100
                        }
                    },
                    "textSelections": {
                        "0": {
                            "text": "hello world"
                        }
                    },
                    "text": "hello world",
                    "notes": {},
                    "questions": {},
                    "flashcards": {},
                    "images": {}
                }
            };

            assertJSON(textHighlightRecord, expected);

        });

    });

});
