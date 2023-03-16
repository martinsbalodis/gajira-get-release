# Jira Find Version

## Usage

```yaml
- name: Get jira version
  uses: martinsbalodis/gajira-get-release@master
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
${{ steps.version.outputs.name }}

// For version name without prefix "1.3.0"
${{ steps.version.outputs.nameWithoutPrefix }}
```

----
## Action Spec:

### Inputs
- `projectKey` - Jira project key case sensitive
- `prefix` - Version prefix
- `status` - Version status. (released, unreleased, archived)
- `order` - Order direction, ordered by id. (asc, desc)

### Outputs
- `name` - Full version name (Cloud 1.3.0)
- `nameWithoutPrefix` - Version name without prefix (1.3.0)
