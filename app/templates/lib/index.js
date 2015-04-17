
import chalk from 'chalk';
import core from 'core-js/library';

import Base from 'ho-conformance-base';

/**
 * {{ _taskNamePascal }}
 * {{ taskDescription }}
 * @class
 */
export default class {{ _taskNamePascal }} extends Base {
    /**
     * @constructs
     * @param opts <Object>
     */
    constructor( opts ) {
        super()

        this.taskName = '{{ _taskNamePascal }}'
        this.runner = null

        this._bindHandlers()
    }

    /**
     * install
     * @param opts <Object>
     */
    install( opts ) {
        super.install( opts )
    }

    /**
     * destroy
     */
    destroy() {
        super.destroy()
    }


    /*-----------------------------------------------------------*\
     *
     *  Listeners
     *
    \*-----------------------------------------------------------*/


}
