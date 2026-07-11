# Backend Architecture

Record the resolved backend root, Django apps, dependency direction, composition approach, and deviations from the factory standard.

Required direction:

```txt
Controller -> DTO -> Service -> Repository contract -> Repository implementation -> ORM Model
```
