# {{ taskName }}

> {{ taskDescription }}

```
npm i {{ taskName }}
```

```
import conformance from 'ho-conformance'
import {{ _taskNamePascal }} from '{{ taskName }}'

let {{ _taskNameCamel }} = new {{ _taskNamePascal }}( opts )

conformance.register( new {{ _taskNameCamel }}( opts ) )
```
