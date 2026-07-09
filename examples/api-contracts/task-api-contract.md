# Example API Contract

## Resource: Tasks

### List Tasks

`GET /api/tasks/`

Response:

```json
[
  {
    "id": "task_001",
    "title": "Review MVP scope",
    "status": "open",
    "due_date": "2026-07-10"
  }
]
```

### Create Task

`POST /api/tasks/`

Request:

```json
{
  "title": "Review MVP scope",
  "due_date": "2026-07-10"
}
```
