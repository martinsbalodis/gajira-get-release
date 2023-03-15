# Jira Find Version

## Usage

```yaml
- name: Get jira version
  uses: martinsbalodis/gajira-transition@master
  id: version
  with:
    projectKey: TEST
    prefix: Cloud
    status: unreleased
    order: desc
```

Use returned version:
```yaml
// For full version name "Cloud 1.3.0"
${{ steps.version.outputs.version.name }}

// For version name without prefix "1.3.0"
${{ steps.version.outputs.version.nameWithoutPrefix }}
```

----
## Action Spec:

### Inputs
- `projectKey` - Jira project key case sensitive
- `prefix` - Version prefix
- `status` - Version status. (released, unreleased, archived)
- `order` - Order direction, ordered by id. (asc, desc)

### Outputs
- `version` - Version object

Version object example
```javascript
{
    self: 'https://x.atlassian.net/rest/api/2/version/x', 
    id: '1', 
    name: 'Cloud 1.3.0', 
    archived: false, 
    released: false, 
    startDate: '2023-03-01', 
    releaseDate: '2024-03-31', 
    overdue: false, 
    userStartDate: '01/Mar/23', 
    userReleaseDate: '31/Mar/24', 
    projectId: 2, 
    nameWithoutPrefix: '1.3.0'
}
```
