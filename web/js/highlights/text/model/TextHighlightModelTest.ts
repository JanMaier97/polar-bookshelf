import assert from 'assert';
import {TextHighlightModel} from './TextHighlightModel';
import {AnnotationEvent} from '../../../annotations/components/AnnotationEvent';
import {assertJSON} from '../../../test/Assertions';
import {DocMetas} from '../../../metadata/DocMetas';
import {TextHighlightRecords} from '../../../metadata/TextHighlightRecords';
import {Rect} from '../../../Rect';
import {TextRect} from '../../../metadata/TextRect';
import {TestingTime} from '../../../test/TestingTime';

const {Proxies} = require("../../../proxies/Proxies");

TestingTime.freeze();

describe('TextHighlightModel', function() {

    // https://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object

    describe('Listen for new highlights', function() {

        it("Initial values", function () {

            let docMeta = createDocMeta();

            let textHighlightModel = new TextHighlightModel();

            let mutations: any[] = [];

            textHighlightModel.registerListener(docMeta, (textHighlightEvent) => {
                mutations.push(summarize(textHighlightEvent));
            } );

            let expected = [
                {
                    "pageNum": 1,
                    "textHighlight": {
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
                                "text": "hello world",
                                "rect": null
                            }
                        },
                        "text": "hello world",
                        "notes": {},
                        "questions": {},
                        "flashcards": {},
                        "images": {}
                    },
                    "mutationType": "INITIAL"
                }
            ];

            assertJSON(mutations, expected);

        });

        it("New text highlights on new pages", function () {

            let docMeta = createDocMeta();

            let textHighlightModel = new TextHighlightModel();

            let mutations: any[] = [];

            textHighlightModel.registerListener(docMeta, function (textHighlightEvent) {
                mutations.push(summarize(textHighlightEvent));
            } );

            mutations = [];

            let textHighlightRecord = createTextHighlightRecord();

            docMeta.getPageMeta(3).textHighlights[textHighlightRecord.id] = textHighlightRecord.value;

            let expected = [
                {
                    "pageNum": 3,
                    "textHighlight": {
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
                                "text": "hello world",
                                "rect": null
                            }
                        },
                        "text": "hello world",
                        "notes": {},
                        "questions": {},
                        "flashcards": {},
                        "images": {}
                    },
                    "mutationType": "SET"
                }
            ];

            console.log(mutations);

            assertJSON(mutations, expected);

        });

    });

});

function summarize(textHighlightEvent: AnnotationEvent): any {
    return {
        pageNum: textHighlightEvent.pageMeta.pageInfo.num,
        textHighlight: textHighlightEvent.value,
        mutationType: textHighlightEvent.mutationType
    };
}

function createDocMeta() {

    let fingerprint = "110dd61fd57444010b1ab5ff38782f0f";

    let docMeta = DocMetas.createWithinInitialPagemarks(fingerprint, 14);
    DocMetas.addPagemarks(docMeta, {nrPages: 1, offsetPage: 4, percentage: 50})

    // create some initial highlights.

    let textHighlightRecord = createTextHighlightRecord();

    docMeta.getPageMeta(1).textHighlights[textHighlightRecord.id] = textHighlightRecord.value;

    return Proxies.create(docMeta);

}

function createTextHighlightRecord() {

    let rects: Rect[] = [ new Rect({top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100}) ];
    let textSelections: TextRect[] = [new TextRect({text: "hello world"})];
    let text = "hello world";

    return TextHighlightRecords.create(rects, textSelections, text);

}
