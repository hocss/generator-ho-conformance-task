# {{ taskName }}

> {{ taskDescription }}

```
npm i {{ taskName }}
```

```
import conformance from 'ho-conformance'
import {{ taskName.replace( /(^.)/, function( cap ) { return cap.toUpperCase() } ) }} from '{{ taskName }}'

let {{ taskName }} = new {{ taskName.replace( /(^.)/, function( cap ) { return cap.toUpperCase() } ) }}( opts )


conformance.register( new {{ taskName.replace( /(^.)/, function( cap ) { return cap.toUpperCase() } ) }}( opts ) )
```
