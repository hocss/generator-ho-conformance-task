
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
                taskName: 'ho-conformance-test',
                authorName: 'testUser',
                userName: 'testuser'
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
