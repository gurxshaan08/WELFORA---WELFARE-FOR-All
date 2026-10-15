# Welfora — organized React frontend

This is a complete Vite + React project. It keeps Welfora's current visual style and local demo behavior while organizing the source into focused folders.

## Run locally

1. Extract the ZIP.
2. Open the extracted `Welfora_Refactor_Work` folder in VS Code.
3. In the terminal, run `npm.cmd install` if PowerShell blocks `npm.ps1`.
4. Run `npm.cmd run dev`.
5. Open the local URL Vite prints in the terminal.
6. To check a production build, run `npm.cmd run build`.

If you are applying these files to your existing project instead, back up your current folder first. You can replace `src` and use the supplied `package.json`/`index.html` if your current setup is a standard Vite React app. Keep the installed package versions consistent if your teacher provided a specific starter project.

## Folder structure

```text
src/
  App.jsx                       App shell, routing, and modal orchestration
  main.jsx                      React entry point
  App.css                       Welfora design system and visual styling
  index.css                     Global styles
  components/
    Sidebar.jsx                 Main navigation sidebar with theme toggle and user chip
    Topbar.jsx                  Workspace header with breadcrumbs and shortcuts
    SchemeModal.jsx             Accessible modal dialog for scheme details and actions
    SchemeCard.jsx              Reusable scheme card with fit score badge
    PageTitle.jsx               Reusable page heading with eyebrow text
    Empty.jsx                   Reusable empty state with call-to-action
    Metric.jsx                  Reusable metric tile
    QuickStat.jsx               Reusable dashboard stat button
    AuthScreen.jsx              Onboarding and user profile configuration
  pages/
    Dashboard.jsx               Main dashboard screen with hero and quick stats
    ExplorePage.jsx             Scheme exploration, search, filters, and recommendations
    SavedSchemesPage.jsx        Saved/shortlisted schemes grid
    ApplicationsPage.jsx        Application tracker, document checklists, and personal notes
    DeadlinesPage.jsx           Upcoming deadlines countdown and reminder preferences
    EligibilityPage.jsx         Interactive eligibility guidance and match evaluation
    AssistantPage.jsx           Local Q&A welfare assistance guide
    NotificationsPage.jsx       In-app notification center and reminder controls
    ProfileSettingsPage.jsx     Display name, theme toggle, and scenario test controls
    AboutPage.jsx               Project overview and purpose
    NotFoundPage.jsx            404 fallback screen
    PageViews.jsx               Modular view dispatcher
  context/
    WelforaContext.jsx          Centralized state: theme, saved, applications, scenarios, mock API
  hooks/
    usePersistentState.js       localStorage-backed reactive state hook
    useDeadlineItems.js         Deadline derivation and sorting hook
  data/
    schemes.js                  Demo scheme records
    categories.js               Scheme categories
    notifications.js            Initial demo notifications
  services/
    schemeService.js            Mock data service adapter
  utils/
    schemeUtils.js              Deadline parsing, formatting, and fit scoring logic
```

## Important data note

The scheme catalogue and dates are demonstration data. Potential-fit scores are guidance only, not official eligibility decisions. No application is submitted to a government portal and no email/SMS/push reminder is sent. This project does not include a backend or live government API.

## Manual acceptance checklist

- [ ] Dashboard loads in dark mode.
- [ ] Theme switch works and remains after refresh.
- [ ] Explore page search, category/state/fit filters, sorting and pagination work.
- [ ] Save a scheme; it appears under Saved Schemes after refresh.
- [ ] Track a scheme, change status, check documents, add a note; refresh and confirm persistence.
- [ ] Dismiss a notification; refresh and confirm it stays dismissed.
- [ ] Change reminder preferences and confirm the dashboard reflects them.
- [ ] Load Student Scenario, then Clean Scenario, then Reset Demo Data.
- [ ] Simulate the API error, verify the error banner, then click Retry.
- [ ] Keyboard-test the skip link, navigation, buttons, filters and modal Escape behavior.
- [ ] Test at desktop and narrow mobile widths.
- [ ] Run `npm.cmd run build` and resolve any build error before presentation.

## Validation performed for this package

- All 17 JavaScript/JSX files passed TypeScript's JSX syntax transpilation check.
- All relative JavaScript/JSX imports were checked and resolve to files in the package.
- A full Vite production build was not run in this environment because installing npm dependencies timed out. Run `npm.cmd install` and `npm.cmd run build` on your machine to complete that check.
