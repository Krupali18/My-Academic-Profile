# Instant Rollback & Disaster Recovery Procedure
## Dr. Krupali Donda Academic Portfolio

### 1. Instant Vercel Dashboard Rollback (< 5 seconds)

If an unintended regression, broken asset, or configuration issue reaches production:

1. Open the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on the project: **`krupali-donda-site`**.
3. Go to the **Deployments** tab.
4. Locate the last known good deployment (marked with a green checkmark prior to the problematic release).
5. Click the three dots (`...`) on the right of the deployment row.
6. Select **Instant Rollback** (or **Promote to Production**).
7. Confirm the rollback.
   - **Result**: Vercel instantly points traffic to the previous immutable deployment artifact at edge CDN nodes globally within 1–3 seconds. No rebuild or re-bundle is required.

---

### 2. Git-Level Rollback Procedure

To align the git repository with the rolled-back production release:

1. Revert the commit locally:
   ```bash
   git revert HEAD -m 1  # For merge commits
   # or
   git revert <commit-hash>
   ```
2. Run validation suite locally:
   ```bash
   npm run build
   ```
3. Push to `main`:
   ```bash
   git push origin main
   ```
4. GitHub Actions CI verifies the build, and Vercel automatically deploys the clean state.

---

### 3. Emergency Maintenance / Cache Purge

Because HTML documents are cached with `max-age=0, must-revalidate`, users receive updated production HTML immediately upon redeployment or rollback. Immutable hashed assets (`/assets/*.js`, `/assets/*.css`) will not conflict across revisions.
