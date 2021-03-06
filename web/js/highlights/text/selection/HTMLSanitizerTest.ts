import assert from 'assert';
import {HTMLSanitizer} from './HTMLSanitizer';

describe('HTMLSanitizer', function () {

    it('basic', function () {

        assert.equal(HTMLSanitizer.sanitize('<p class="foo">'), '<p></p>');

    });


    it('with minimal CSS', function () {

        // TODO: we probably want this to work
        assert.equal(HTMLSanitizer.sanitize('<p style="font-weight: bold">'), '<p style="font-weight:bold;"></p>');

    });

    it('div', function () {

        // TODO: we probably want this to work
        assert.equal(HTMLSanitizer.sanitize('<div style="font-weight: bold">'), '<div style="font-weight:bold;"></div>');

    });

});
