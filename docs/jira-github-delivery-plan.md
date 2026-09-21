# JobBoard — Jira and GitHub delivery plan

This document is a practical delivery plan for the current JobBoard project. It is split into two parts:

1. A two-person overview of the complete project.
2. The followed-offers / `localStorage` work added after the initial codebase.

Replace `Developer A` and `Developer B` with the real contributor names in Jira and GitHub.

## Important Git rule

Use these commit messages only for commits that match the actual files and changes being committed. Do not create a misleading artificial history or rewrite a collaborator's commits. A small number of focused, meaningful commits is better than many empty commits.

---

# Part 1 — Complete project overview

## 1. Product objective

Build a responsive client-side job board for internships and alternances. Offers are stored in external JSON, displayed dynamically with JavaScript, searchable, filterable, sortable, and saved as followed offers in the browser with `localStorage`.

## 2. Suggested responsibility split

| Area | Developer A — collaborator | Developer B — you |
| --- | --- | --- |
| Product framing | Requirements analysis, Jira backlog, Figma references | Review acceptance criteria and prepare the demo flow |
| Static interface | HTML pages, navigation, responsive CSS, public/detail/admin/deposit pages | UI review and integration checks |
| JSON and dynamic list | Offer dataset and first fetch/render implementation | Verify data shape, loading/error states, result count |
| Search, filters and sort | Combined search/filter/sort implementation | Test edge cases and reset behavior |
| Followed offers | Review integration and UI consistency | `localStorage`, bookmark state, dynamic followed page, documentation |
| Delivery | Review pull requests | Final QA, README, demo preparation, merge to `main` |

This is a suggested split, not a claim about work already completed. Update the assignee of each Jira item to reflect the real contributor.

## 3. Jira structure for the complete project

Use the real project key from your board. The examples below use `JOB` because the existing Jira URL uses that key.

### Epic: JOB-1 — Product setup and static responsive interface

**Goal:** provide the initial responsive JobBoard interface and project documentation.

| User story | Acceptance criteria | Suggested owner |
| --- | --- | --- |
| `JOB-2` — As a visitor, I can navigate between the public pages. | Navigation reaches offers, followed offers, offer detail, deposit and admin pages. | Developer A |
| `JOB-3` — As a visitor, I can use the interface on desktop and mobile. | Layout remains readable and controls remain usable at responsive breakpoints. | Developer A |
| `JOB-4` — As a project team, we have product and delivery documentation. | README, requirements analysis, Figma link and Jira backlog are available. | Developer A |

Suggested subtasks:

- Build `index.html` and page navigation.
- Build `offre-detail.html`, `deposer-offre.html`, `offres-suivies.html` and `admin.html` templates.
- Create responsive CSS with Flexbox, Grid and focus states.
- Add requirements analysis and Jira/Figma documentation.

### Epic: JOB-5 — External offer data and dynamic rendering

**Goal:** replace hardcoded offer cards on the homepage with data loaded from JSON.

| User story | Acceptance criteria | Suggested owner |
| --- | --- | --- |
| `JOB-6` — As a visitor, I see current offers loaded from external data. | At least 12 valid offers are loaded from `data/offers.json` with `fetch()` and `async/await`. | Developer A |
| `JOB-7` — As a visitor, I understand loading and loading-failure states. | The page displays loading feedback and a user-friendly error message. | Developer A |
| `JOB-8` — As a visitor, I see how many offers match the current view. | The visible result count updates after rendering. | Developer A |

Suggested subtasks:

- Create the offer JSON dataset with all required business fields.
- Implement `fetchOffers()` in `js/data.js`.
- Create `createOfferCard()` and `renderOffers()` in `js/render.js`.
- Add loading, error and no-results UI states.

### Epic: JOB-9 — Search, filters and sorting

**Goal:** enable visitors to find relevant offers without a backend.

| User story | Acceptance criteria | Suggested owner |
| --- | --- | --- |
| `JOB-10` — As a visitor, I can search offers with keywords. | Search checks title, company, short description and technologies. | Developer A |
| `JOB-11` — As a visitor, I can combine filters. | Contract, city and technology filters work together. | Developer A |
| `JOB-12` — As a visitor, I can sort offers by publication date. | Newest and oldest order both work. | Developer A |
| `JOB-13` — As a visitor, I can reset the current filters. | Reset returns the list to all offers and the default order. | Developer A |

Suggested subtasks:

- Read form values with `querySelector()`.
- Combine conditions with `filter()`.
- Sort a copied/filtered list by `datePublication`.
- Use `reduce()` to count offers by contract.
- Connect the reset and sort controls with `addEventListener()`.

### Epic: JOB-14 — Followed offers with localStorage

**Goal:** let visitors save offers locally without an account.

| User story | Acceptance criteria | Suggested owner |
| --- | --- | --- |
| `JOB-15` — As a visitor, I can follow or unfollow an offer. | Bookmark state is visible and can be toggled. | Developer B |
| `JOB-16` — As a visitor, my followed offers stay after refresh. | Followed IDs are saved with `JSON.stringify()` and restored with `JSON.parse()`. | Developer B |
| `JOB-17` — As a visitor, I can see my saved offers on a dedicated page. | The page fetches JSON and renders only saved offers. | Developer B |
| `JOB-18` — As a visitor, I can remove one or all saved offers. | Unfollow and clear-all update the UI, count and `localStorage`. | Developer B |

### Epic: JOB-19 — Quality assurance and delivery

**Goal:** make the project demonstrable and explainable.

| User story | Acceptance criteria | Suggested owner |
| --- | --- | --- |
| `JOB-20` — As an evaluator, I can launch and test the app locally. | README gives a working server command and documents JSON, filters and storage. | Developer B |
| `JOB-21` — As an evaluator, I can follow the team delivery history. | Jira items have real statuses; Git commits are atomic and PRs are reviewable. | Both |

Suggested subtasks:

- Verify the site through a local HTTP server.
- Test no-result, empty-followed, remove and clear-all states.
- Update README.
- Review and merge pull requests only after testing.

## 4. Suggested complete Git history

These messages describe a healthy project progression. Keep an existing commit if it already truthfully covers the same change instead of duplicating it.

```text
docs: add project analysis and Jira backlog
feat: build responsive job board public pages
style: improve keyboard focus and mobile layouts
feat: add offers JSON dataset
feat: render offers from JSON data
feat: add combined filters search and date sorting
feat(storage): add localStorage helpers for followed offers
feat(offers): persist bookmark state and update followed counter
feat(followed): render saved offers from JSON
style(followed): add empty-state and responsive controls
docs: document local setup and localStorage flow
```

Confirmed existing repository commits that already cover part of this story include:

```text
edaa827 add offers json dataset
4e0baa5 show the fetched data & adding filter and search features
2377a3d style: improve keyboard focus and mobile layouts
```

Do not re-create those existing commits. Build new commits only for the uncommitted followed-offers work.

## 5. Branch and merge plan

The collaborator's existing code is on a branch. The clean strategy is:

1. Fork the collaborator repository to your GitHub account, or create a new repository only if your instructor permits it.
2. Keep the collaborator's repository configured as `upstream` and your fork as `origin`.
3. Create an integration branch from the collaborator branch and open a pull request into `main`.
4. After that base PR is reviewed and merged, create the new feature branch from the updated `main`.
5. Commit the followed-offers work in the order in Part 2.
6. Open a second PR from `brief-2/followed-offers` into `main`.
7. Merge only after testing the complete flow with a local server.

Example commands — replace placeholders before running them:

```bash
git clone <your-fork-url>
cd Job-Board
git remote add upstream <collaborator-repository-url>
git fetch upstream

git switch -c integration/collaborator-base upstream/<collaborator-branch>
git push -u origin integration/collaborator-base
# Open and merge a pull request: integration/collaborator-base -> main

git switch main
git pull origin main
git switch -c brief-2/followed-offers
```

Avoid merging the collaborator branch directly into `main` without reviewing it first. A PR shows what entered the project and makes the two-person workflow credible.

---

# Part 2 — Followed offers / localStorage delivery

This section maps the work added to the eight changed files:

```text
css/style.css
index.html
js/app.js
js/render.js
js/storage.js
js/followed.js
offres-suivies.html
readme.md
```

## 1. Jira items first

### Story: JOB-15 — Follow and unfollow an offer

**User story**

> As a visitor, I want to bookmark an offer so that I can find it later.

**Acceptance criteria**

- Every dynamically rendered card has a bookmark control.
- Clicking the bookmark follows or unfollows the matching offer.
- A followed offer remains visibly checked after filtering, sorting or reloading.
- The followed count updates after a bookmark change.

**Subtasks**

- `JOB-15a` Create a `storage.js` module for followed offer IDs.
- `JOB-15b` Read the current followed state in `render.js`.
- `JOB-15c` Add one delegated bookmark event in `app.js`.
- `JOB-15d` Update the homepage badge in `index.html`.

### Story: JOB-16 — Persist followed offers locally

**User story**

> As a visitor, I want my followed offers to remain saved after refreshing the browser.

**Acceptance criteria**

- `localStorage` uses one key: `followedOffers`.
- The stored value is a JSON array of offer IDs, for example `[2, 7, 10]`.
- Missing or invalid data falls back to an empty array.
- No account, backend or database is required.

**Subtasks**

- `JOB-16a` Implement `getFollowedOfferIds()` with `JSON.parse()`.
- `JOB-16b` Implement save/toggle/remove/clear helpers with `JSON.stringify()`.
- `JOB-16c` Verify saved data after a browser refresh.

### Story: JOB-17 — View followed offers on a dedicated page

**User story**

> As a visitor, I want to see only my followed offers on a dedicated page.

**Acceptance criteria**

- The page has no hardcoded offer cards.
- It fetches `data/offers.json`.
- It uses the saved IDs to filter offers.
- It renders the shared offer-card UI.
- It has loading, error and empty states.
- It can sort followed offers by publication date.

**Subtasks**

- `JOB-17a` Create `js/followed.js`.
- `JOB-17b` Replace static followed cards in `offres-suivies.html` with an empty render container.
- `JOB-17c` Load offers, filter saved IDs and call `renderOffers()`.
- `JOB-17d` Add date sorting and a clear empty state.

### Story: JOB-18 — Manage saved offers

**User story**

> As a visitor, I want to remove a saved offer or clear my list so that it stays relevant.

**Acceptance criteria**

- Unchecking a followed offer removes only that ID.
- “Tout effacer” clears the list.
- The counter and the page state refresh immediately.

**Subtasks**

- `JOB-18a` Handle removal from the followed-offers page.
- `JOB-18b` Handle the clear-all control.
- `JOB-18c` Update count elements after every storage change.

### Story: JOB-20 — Document and verify local behavior

**User story**

> As an evaluator, I want clear launch and architecture notes so I can test the app correctly.

**Acceptance criteria**

- README instructs the user to run a local HTTP server.
- README explains the JSON → filter → render flow.
- README explains the `followedOffers` storage value.
- The empty state is understandable and responsive.

**Subtasks**

- `JOB-20a` Update README.
- `JOB-20b` Add CSS for empty and followed-page states.
- `JOB-20c` Test following, reload, removal and clear-all through a local server.

## 2. Proposed Git commits for this feature branch

Create these commits in this order while on `brief-2/followed-offers`.

### Commit 1

```text
feat(storage): add localStorage helpers for followed offers
```

Files:

```text
js/storage.js
```

Purpose: add `getFollowedOfferIds`, `isOfferFollowed`, `toggleFollowedOffer`, `removeFollowedOffer` and `clearFollowedOffers`.

### Commit 2

```text
feat(offers): persist bookmark state and update followed counter
```

Files:

```text
js/app.js
js/render.js
index.html
```

Purpose: render checked bookmarks from storage, use delegated bookmark events, update the badge and use `reduce()` for contract counts.

### Commit 3

```text
feat(followed): render saved offers from JSON
```

Files:

```text
js/followed.js
offres-suivies.html
```

Purpose: fetch offers, filter by saved IDs, render followed cards, sort them, remove one offer and clear all offers.

### Commit 4

```text
style(followed): add empty-state and responsive followed controls
```

Files:

```text
css/style.css
```

Purpose: present the empty state and keep followed-offer controls usable on mobile.

### Commit 5

```text
docs: document local setup and localStorage flow
```

Files:

```text
readme.md
```

Purpose: document the required local server, module roles and storage format.

## 3. Commands to create the feature commits

Run these only after checking the staged files are exactly the files listed for that commit.

```bash
git switch brief-2/followed-offers

git add js/storage.js
git commit -m "feat(storage): add localStorage helpers for followed offers"

git add js/app.js js/render.js index.html
git commit -m "feat(offers): persist bookmark state and update followed counter"

git add js/followed.js offres-suivies.html
git commit -m "feat(followed): render saved offers from JSON"

git add css/style.css
git commit -m "style(followed): add empty-state and responsive followed controls"

git add readme.md
git commit -m "docs: document local setup and localStorage flow"

git status
git push -u origin brief-2/followed-offers
```

## 4. Pull request template

**Title**

```text
feat: add followed offers with localStorage
```

**Description**

```markdown
## What changed
- Added localStorage helpers that save followed offer IDs.
- Connected bookmark controls to persistent followed state.
- Rebuilt the followed-offers page from JSON data instead of static cards.
- Added remove-one, clear-all, sorting and empty states.
- Updated the README with launch and architecture instructions.

## How to test
1. Start a local server: `python3 -m http.server 8000`.
2. Open `http://localhost:8000`.
3. Bookmark one or more offers.
4. Refresh the page and verify the bookmarks remain checked.
5. Open `offres-suivies.html` and verify only followed offers display.
6. Remove one offer, then test “Tout effacer”.

## Jira
- JOB-15
- JOB-16
- JOB-17
- JOB-18
- JOB-20
```

## 5. Five-minute demo order

1. Start the local server and explain why `fetch()` requires it.
2. Show the 12 JSON offers rendering on the homepage.
3. Search and combine at least two filters.
4. Sort by oldest/newest.
5. Bookmark an offer and point out the count change.
6. Refresh to prove `localStorage` persistence.
7. Open the followed page, remove one offer, then clear the list.
8. Open `storage.js` and explain `getItem` → `JSON.parse` and `JSON.stringify` → `setItem`.
