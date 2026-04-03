# nuxt-test-app

## Automated Semantic Versioning

This project uses **automated semantic versioning** based on PR labels.

### How It Works (Super Simple!)

1. **Create a PR** and add ONE label from the right sidebar:
   - `breaking` → Major bump (X.0.0)
   - `feature` → Minor bump (0.X.0)
   - `fix` → Patch bump (0.0.X)
   - `chore` → Patch bump (0.0.X)

2. **PR Validation** runs automatically:
   - ✅ Checks that you added a version bump label
   - ✅ Shows which version bump will occur
   - ❌ Fails if no label is added

3. **Get approval and Squash Merge** to `main`

4. **Build Workflow** runs automatically:
   - Extracts PR number from squash commit
   - Fetches PR labels from GitHub API
   - Determines version bump based on label
   - Creates git tag and builds Docker image

### Version Bump Rules

| Label | Version Bump | Example |
|-------|--------------|---------|
| `breaking` | Major (X.0.0) | v0.3.0 → v1.0.0 |
| `feature` | Minor (0.X.0) | v0.2.1 → v0.3.0 |
| `fix` | Patch (0.0.X) | v0.2.0 → v0.2.1 |
| `chore` | Patch (0.0.X) | v1.0.0 → v1.0.1 |

### That's It!

Just add a label to your PR:
1. ✅ Click "Labels" in the right sidebar →
2. ✅ Select one: `breaking`, `feature`, `fix`, or `chore`
3. ✅ Get it reviewed and approved
4. ✅ Click "Squash and Merge"
5. ✅ Version tag is created automatically

No commit message formatting required!
