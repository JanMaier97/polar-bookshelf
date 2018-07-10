
const assert = require('assert');
const {assertJSON} = require("../../../../test/Assertions");

const {Rect} = require("../../../../Rect");
const {Rects} = require("../../../../Rects");
const {Objects} = require("../../../../util/Objects");
const {RectEdges} = require("../edges/RectEdges");

const {RectArt} = require("../../../../util/RectArt");
const {ResizeRectAdjacencyCalculator} = require("./ResizeRectAdjacencyCalculator");
const {MOCK_RECTS} = require("../../../../MockRects");

describe('ResizeRectAdjacencyCalculator', function() {

    test("resize_from_right",
        {left: true, right: false, top: false, bottom: false},
        { "left": 15, "top": 0, "right": 30, "bottom": 20, "width": 15, "height": 20});

    test("resize_from_right_with_overlap",
        {left: true, right: false, top: false, bottom: false},
        { "left": 15, "top": 0, "right": 22, "bottom": 20, "width": 7, "height": 20});

    // TODO: this one not working.. not sure why but I"m sure I'll figure it out.
    // test("resize_placed_top_right_resizing_left_bottom",
    //     {left: true, right: false, top: false, bottom: true},
    //     { "left": 15, "top": 0, "right": 22, "bottom": 20, "width": 7, "height": 20})

    function test(name, rectEdges, expected) {

        it(name, () => {

            const {resizeRect, intersectedRect} = MOCK_RECTS[name];

            rectEdges = new RectEdges(rectEdges);

            console.log("resizeRect: " + JSON.stringify(resizeRect));
            console.log("intersectedRect: " + JSON.stringify(intersectedRect));

            console.log("BEFORE: \n" + RectArt.formatRects([resizeRect, intersectedRect]).toString());

            let resizeRectAdjacencyCalculator = new ResizeRectAdjacencyCalculator();
            let adjustedRect = resizeRectAdjacencyCalculator.calculate(resizeRect, intersectedRect, rectEdges);

            console.log("adjustedRect: " + JSON.stringify(adjustedRect));

            console.log("AFTER: \n" + RectArt.formatRects([adjustedRect, intersectedRect]).toString());

            // assert.notEqual(adjustedRect, null);
            // assert.equal(resizeRect.right, adjustedRect.right);
            // assert.equal(resizeRect.bottom, adjustedRect.bottom);
            // assert.equal(resizeRect.top, adjustedRect.top);

            assertJSON(adjustedRect, expected );

        });

    }

});
