var path = require( 'path' )
var fs = require( 'fs' )
var yeoman = require( 'yeoman-generator' )
var chalk = require( 'chalk' )
var yosay = require( 'yosay' )
var osenv = require( 'osenv' )
var hogan = require( 'hogan.js' )


module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.pkg = require( '../package.json' )
    },

    /**
     * Punts everything through hogan compilation
     */
    _copy: function( from, to ) {
        // Convert first param from object and populate from and to
        if ( typeof from === 'object' ) {
            var tmp = from
            from = tmp.from
            to = tmp.to
        }

        // If there is still no to param then assume filename remains unchanged
        if ( !to ) {
            var filepath = from
            from = this.templatePath( filepath )
            to = this.destinationPath( filepath )
        }

        var tmpl = hogan.compile( this.fs.read( from ) )
        this.fs.write( to, tmpl.render( this.props ) )
    },

    // Renames files and appends yeoman paths
    _rename: function( from, to ) {
        return {
            from: this.templatePath( from ),
            to: this.destinationPath( to )
        }
    },

    // Copies all files in folder, will not recurse
    // use _copyDir( '' ) to copy root template folder, yes, this is ugly
    _copyDir: function( folder ) {
        var pathname = path.join( this.sourceRoot(), folder )
        fs.readdirSync( pathname )
            .forEach( function( file ) {
                if ( !fs.statSync( path.join( pathname, file ) ).isFile() ) {
                    return
                }

                this._copy( path.join( folder, file ) )
            }.bind( this ) )
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
            name: 'taskDescription',
            message: 'What is the description of your task?'
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

            // Create taskName versions for templating
            this.props._taskNamePascal = this.props.taskName
                .replace( /ho-conformance-/, '' )
                .split( '-' )
                .map( function( str ) {
                    // De-hyphenate
                    return str.replace( /-/, '' )
                })
                .map( function( str ) {
                    // capitalize
                    return str.replace( /(^.)/, function( cap ) {
                        return cap.toUpperCase()
                    })
                })
                .join( '' )
            this.props._taskNameCamel = this.props._taskNamePascal.replace( /(^.)/, function( cap ) { return cap.toLowerCase() } )
            this.props._taskNameCapitalize = this.props.taskName.replace( /(^.)/, function( cap ) { return cap.toUpperCase() } )

            done()
        }.bind( this ) )
    },

    writing: {
        app: function() {
            // Copy files in template root
            this._copyDir( '' )
            // Copy files in template/lib
            this._copyDir( 'lib' )
        }
    },

    install: function() {
        this.installDependencies({
            bower: false
        })
    }

})
