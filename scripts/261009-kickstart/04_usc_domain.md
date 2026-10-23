# Request and connect a USC domain

Checklist prepared on 2026-10-22. Proposed address: **`starlab.usc.edu`**. Its availability and approval have not been confirmed; no request or configuration change has been made.

Keep the existing Astro site on GitHub Pages and request a USC hostname for it. USC permits external hosting, subject to eligibility and policy requirements. Direct subdomains require approval; the university's lab naming guidance also suggests paths such as `/lastnamelab` or `/acronym-lab`. See the [USC naming guidelines](https://identity.usc.edu/applying-the-brand/websites/).

## 1. Confirm the owner and requested name

- [ ] Ask Stephen Tu to sponsor the request as the faculty owner. Identify who will maintain the site and serve as its technical contact.
- [ ] Confirm `starlab.usc.edu` as the preferred name. If USC proposes a different address, agree on it before continuing and replace the examples below.
- [ ] Confirm access to the GitHub organization owner and repository administrator accounts needed for steps 4–5.

## 2. Prepare the request

Use these details in the USC request:

| Field | Value |
|---|---|
| Lab | StarLab — Statistical Techniques for Autonomous Reasoning |
| Affiliation | USC Viterbi, Department of Electrical and Computer Engineering |
| Faculty owner | Stephen Tu; confirm his sponsorship first |
| Requested hostname | `starlab.usc.edu`, subject to approval |
| Existing website | `https://starlab-usc.github.io/` |
| Repository | `https://github.com/starlab-usc/starlab-usc.github.io` |
| Hosting | Static Astro site deployed through GitHub Actions to GitHub Pages |
| Purpose | Public lab research, people, publications, news, and prospective-student information |
| Maintenance plan | Supply the confirmed maintainer's name and USC email, and explain how content and technical updates will be handled |

- [ ] Review branding, accessibility, and privacy requirements with Viterbi. USC's website guidelines require the primary USC logotype at the top right, linked to the USC homepage. This checklist does not certify the current site's compliance.
- [ ] Ask Viterbi IT whether the proposed hostname and GitHub Pages hosting are acceptable and whether any additional review is required. Use the [Viterbi Service Desk](https://viterbi.usc.edu/servicedesk/).

## 3. Submit the USC URL request and arrange timing

- [ ] Have the faculty/staff owner submit the USC URL Request Form linked from [ITS: Request a USC URL](https://itservices.usc.edu/how-to-request-a-usc-url/), using USCNet login. The service is free; ITS lists up to four business days for processing.
- [ ] Request approval/reservation first, with DNS activation coordinated after GitHub configuration. Include the existing website and maintenance plan.
- [ ] Ask the assigned IT contact to handle the TXT verification record and subsequent CNAME record below. Viterbi also provides an [external-host DNS intake form](https://viterbiit.usc.edu/services/telephone-and-network/dns-a-record-request-form/); confirm with IT whether this is needed in addition to the URL request. Although its title says “A Record,” specify that this GitHub Pages subdomain needs a CNAME.

Wait for the approved hostname and IT contact before proceeding.

## 4. Verify the approved hostname in GitHub

- [ ] As an organization owner, open **starlab-usc → Settings → Pages → Add a domain**. Enter only the approved hostname, such as `starlab.usc.edu`; do not attempt to verify all of `usc.edu`.
- [ ] Copy GitHub's exact TXT record name and value into the IT ticket. Ask USC to publish it, then select **Verify** in GitHub once it resolves.
- [ ] Keep the verification TXT record after launch. If GitHub reports conflicting ownership, resolve it with USC and GitHub before changing routing.

Use [GitHub's organization-domain verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages). Verification happens in organization settings, separately from the repository setting below.

## 5. Configure GitHub Pages, then activate DNS

- [ ] Coordinate a change window with USC; changing the Pages domain can affect the old address before DNS is ready.
- [ ] Open the [repository's Pages settings](https://github.com/starlab-usc/starlab-usc.github.io/settings/pages). Keep **GitHub Actions** as the source, set **Custom domain** to the approved hostname, and save **before** USC points DNS at GitHub.
- [ ] Ask USC to publish this record, substituting the approved name:

```text
Type:   CNAME
Name:   starlab.usc.edu
Target: starlab-usc.github.io
```

The target is a hostname, without `https://` or a path. Do not request wildcard DNS. This repository's [custom Actions workflow](../../.github/workflows/deploy.yml) does not require a repository `CNAME` file. See [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 6. Update the site's production URL

- [ ] Change `site` in [astro.config.mjs](../../astro.config.mjs) from `https://starlab-usc.github.io` to `https://starlab.usc.edu`, using the approved hostname. Keep the root-level routes.
- [ ] Update any existing canonical, sharing, sitemap, robots, and structured-data URLs that use the old origin. The [SEO note](02_seo.md) describes proposed work; check what is actually implemented when making the change.
- [ ] Run `npm run check`, `npm run build`, and `git diff --check`. Review the diff, commit the intended changes, and push to `main` to deploy through the existing workflow.

## 7. Enable HTTPS and verify the live site

- [ ] Wait for GitHub's DNS check and certificate provisioning, then enable **Enforce HTTPS**. DNS propagation and availability of this option can each take up to 24 hours. If certificate setup fails, work with USC IT on DNS/certificate restrictions before announcing the address.
- [ ] Run the checks below after replacing the hostname if necessary:

```sh
dig +short CNAME starlab.usc.edu
curl -I https://starlab.usc.edu/
curl -I https://starlab.usc.edu/people
curl -I https://starlab.usc.edu/publications
curl -IL https://starlab-usc.github.io/people
```

Expect the CNAME to resolve to `starlab-usc.github.io`, the new pages to load successfully over HTTPS, and the old People URL to reach the corresponding new page.

- [ ] Open all three pages on desktop and phone. Check images, navigation, profile links, and the HTTPS indicator.

## 8. Announce and maintain the address

- [ ] After verification, update the README's public-site link, faculty/department links, and other lab-controlled references.
- [ ] Add the new URL-prefix property in Search Console and submit the sitemap if one is implemented, following [02_seo.md](02_seo.md).
- [ ] Retain the USC ticket, approved owner, and maintenance responsibilities outside the public repository if they contain private details.

If the migration must be undone, coordinate removal or repointing of USC's CNAME before removing the GitHub custom-domain binding. Restore Astro's previous production URL and redeploy; verify the original address. Keep the ownership-verification TXT record while the hostname remains assigned to the lab. Do not leave USC DNS pointing to an unclaimed GitHub Pages domain.
