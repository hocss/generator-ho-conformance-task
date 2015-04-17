
var yeoman = require( 'yeoman-generator' )
var chalk = require( 'chalk' )
var yosay = require( 'yosay' )
var osenv = require( 'osenv' )

module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.pkg = require( '../package.json' )
    },

    prompting: function() {
        var done = this.async()

        this.log( yosay(
            'Preparing to scaffold a ' + chalk.cyan( 'Ho conformance task' ) + '\n' +
            'I need to know a few things...'
        ))

        this.prompt( [{
            name: 'taskName',
            message: 'What is the name of your task?',
            validate: function( str ) {
                return !/\s/.test( str )
            }
        }, {
            name: 'authorName',
            message: 'What is the author name?',
            default: osenv.user()
        }, {
            name: 'userName',
            message: 'What is your github username?',
            default: osenv.user().toLowerCase().replace( /\s/g, '' )
        }], function( props ) {
            this.props = props

            done()
        }.bind( this ) )
    },

    writing: {

        app: function() {
            this.fs.copy( this.templatePath( '_package.json' ), this.destinationPath( 'package.json') )
        },

        projectFiles: function() {
            this.fs.copy( this.templatePath( 'jshintrc' ), this.destinationPath( '.jshintrc') )
        }
    },

    install: function() {
        this.installDependencies()
    }

})
