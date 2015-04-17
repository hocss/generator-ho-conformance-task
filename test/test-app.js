
var path = require( 'path' )
var assert = require( 'yeoman-generator' ).assert
var helpers = require( 'yeoman-generator' ).test

describe( 'generator-ho-conformance-task:app', function() {
    before( function( done ) {
        helpers.run( path.join( __dirname, '../app' ) )
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                someOption: true
            })
            .on( 'end', done )
    });

    it( 'creates files', function() {
        assert.file([
            'package.json',
            '.jshintrc'
        ])
    })
})
