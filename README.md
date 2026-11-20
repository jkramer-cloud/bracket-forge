# Bracket Forge — v1.0.0

Standalone tournament and competition manager. No server, account, third-party library, internet connection, or Learning Hub update required.

## New in v1.0 — Standalone release

- **Quick tournament**: create knockout, double elimination, round robin or Swiss competitions with presets of 4/8/16/32 competitors, a custom count, or pasted names. Select higher/lower score or a best-of series; optionally randomize seeds. Quick setup uses no draws by default. Advanced setup retains all seven formats, teams and full customization.
- **Backups**: export and restore all events (including archives), rosters, templates and the contrast preference in one JSON. Restoring replaces the workspace after confirmation; it does not merge workspaces. Separate event, roster and template exports remain supported.
- **Checkpoint**: save one prior browser snapshot, with an automatic best-effort checkpoint before destructive actions and replacement imports. It uses the same browser storage and may fail because of quotas. Download regular backups as the reliable portable fallback. A failed startup load pauses autosaving and allows download of the original unreadable data, restore, or confirmed reset.
- Single-event imports check IDs: exact matches reopen; conflicting versions require confirmation to replace. Pre-v1.0 imported copies with independent IDs cannot be identified safely and should be reviewed manually. School history still groups names, not permanent institution IDs.
- Keyboard skip link, enhanced visible focus, compact quick setup, reduced-motion preference, and narrower viewports. Single elimination rendering uses a match-number lookup rather than repeated list scans.
- No cloud synchronization, separate-device live scoreboard, or external publishing. Browser quota, real-device performance, printer output and official sport rules remain to be verified. Use exported backups and district-approved handling of student data.

### v1.0 verification
Run `node test-engine.js`, `node test-advanced.js`, `node test-roster.js`, `node test-scoreboard.js`, `node test-operations.js`, `node test-reports.js`, and `node test-workspace.js`. All seven suites passed (319 scenarios/assertions: 34 + 83 + 39 + 40 + 27 + 76 + 20). Chromium exercised quick setup, restore and checkpoints, unreadable data protection, high contrast, 256-entrant bracket, narrow layouts, 15-school director workflow, reports and archives. Browser storage was simulated because local-file navigation is blocked in the test environment. Test on a target Chromebook before using actual student records or official events.

### GitHub Pages preparation (not yet published)
Create a repository such as `bracket-forge` when ready. Upload the extracted release files at the root (not the ZIP). The project has no build step or external dependencies. Configure Pages to deploy from the main branch root. Do not upload workspace JSON files or student records. The included legacy backup fixture contains fictional sample data; test files can remain in the repo or be omitted from deployment. `.nojekyll` is provided for static hosting. Once hosted, use that URL consistently since browser storage is origin-dependent. Export/import a backup to move from a local file to the hosted app. Learning Hub integration requires the existing hub source and the final repository URL.

## New in v0.6 — Archives, Statistics & Reporting

- From any active event or the Event Director, select **Reports** to see the division summary, competitor statistics, confirmed match results, school standings, and awards. Search and filter by division; the on-screen table is paginated, while CSV and print exports include every matching row. Swiss match totals reflect rounds generated so far, not promised future rounds.
- Competitor stats are calculated per division from all confirmed phases, including playoffs and consolation. Byes are recorded separately. Score totals exclude decision/forfeit matches with no numerical score. Placement heats report first places, placement points, and average finish rather than head-to-head win/loss totals. School points follow the existing generic event scoring policy, not a governing-body wrestling rulebook.
- Once a division is complete, the Awards view shows the champion, runner-up, and any third place or consolation award actually determined by the format. Print a certificate for each listed award, or print the report / save as PDF from the browser. Landscape orientation is recommended for wide statistics, and certificate print layouts may depend on browser and paper settings.
- **Archive event** removes it from the active library without deleting scores. Archived events have read-only reports; restore to resume editing. Incomplete events can be archived but are labeled accordingly. Pause live scoreboard clocks and release active station assignments before archiving.
- **Archives & templates** includes completed active events, archived events, a Hall of Champions, and school history for completed archived events. History groups schools by normalized name and counts entries, not distinct people. It does not sum unlike scoring systems or automatically deduplicate events imported as copies; archive only one authoritative copy for accurate historical totals.
- **Save template** copies the division names, formats, entrant counts, scoring and format options, scoreboard defaults and venue configuration. Rosters, results, scoreboards, match assignments and check-in data are not carried into a new event. Review custom division and station labels before sharing templates. Use a template with generic competitors or paste a fresh roster per division. New events receive fresh IDs and blank results. Format-specific rules may require compatible roster sizes.
- Export/import templates separately from event backups; the templates workspace accepts `.forge-template.json`. Event JSON retains the archive date. Separate exports remain supported; v1.0 also offers one complete workspace backup. Save a backup before clearing browser data or switching origins. No cloud sync or authentication in this release.
- The application keeps the same local storage key as prior versions. Browser storage quotas still apply; for a large event, export backups regularly. Archived reports are local read-only UI, not a security boundary or a public sharing service.

### v0.6 verification
`node test-reports.js` runs 76 reporting assertions over all seven formats, completion and awards, byes, placement records, result counts, template isolation, history and archive safeguards. The previous 223 scenarios also passed. Chromium DOM integration tests with simulated localStorage covered archive and restore, report filters, CSV payloads, certificate print markup, template import/export and creation, school history, archived event JSON, reload and contrast; the 15-school director workflow also passed unchanged. Actual printer output and device-level persistence still require verification.

## Start
1. Extract the ZIP, keeping all HTML, CSS and JavaScript files together.
2. Open `index.html` in Chrome or Edge. If school policies block local HTML, serve the folder from an approved static web host instead.
3. Choose **Try a sample event** to test seven fictional divisions covering every supported format. Or choose **Quick tournament** for a small activity or **Advanced setup** for all options.
4. Enter the event and division names, paste a roster (one name per line; optional `Name | School` or two tab-separated spreadsheet columns), or generate generic players. Choose individual players or a team size, order, format, and scoring. Generate multiple divisions with **+ Division**.
5. Click a ready match to enter a result. Completed matches can be corrected; a winner change may invalidate later matches, and the app asks before clearing them.
6. Use **Broadcast** to open the read-only display and optionally rotate through bracket/standings and ready-match views. This is a viewing mode, not authenticated access or a separate live feed.
7. **Export JSON** saves the entire event including all divisions and results. **Import** detects matching event IDs: identical events open without duplication, and a different version requires confirmation to replace. Export CSV files from the roster, standings or Options menu.

## New in v0.2 — Roster Studio
- Open **Roster studio** in the sidebar. Create a named roster, paste entries, import CSV/TSV/TXT or a roster JSON backup, or load the fictional invitational sample.
- Save up to 128 reusable rosters with up to 2,048 entries each, subject to browser storage. Fields: name, school/organization, division, optional skill (1–10), team members. For names containing commas, use quoted CSV or tab-separated data. Recommended header: `Name,School,Division,Skill,Members`.
- Filter by school, division, and search; check/uncheck entries. Generate teams of 1–64 players using random, ordered, skill-balanced or school-spread assignment. Results have balanced sizes initially. Skill and school algorithms are best-effort; unrated entrants use skill 5. School spreading applies to team composition, not avoidance of same-school bracket pairings.
- Drag seed cards or use arrow buttons. Move team members, rename teams and shuffle seeds. Create a tournament or add a division to the selected event, or save the prepared field as another reusable roster. Teams retain their member names. Already formed teams cannot be grouped again.
- From a tournament's Roster tab, save the roster for reuse or reseed an unplayed draw. A saved roster is a snapshot; edits never rewrite existing tournaments. Roster JSON and event JSON are separate backup formats.
- Existing v0.1 and v0.2 event JSON is supported. The storage key is unchanged; however, extracting to another location or changing browser origin may require exporting from v0.1 and importing into v0.5. Export rosters separately; event backups do not contain the reusable roster library.
- Prepared fields are temporary until saved as a roster or tournament. No Google Drive synchronization, shared scorekeeping, or public student data publishing.

## New in v0.3 — Advanced competition formats

| Format | Capacity | Rules |
| --- | --- | --- |
| Double elimination | 2–256 | Upper/lower brackets; automatic byes and a conditional grand-final reset. |
| First-round consolation | 2–256 | Main single-elimination draw; first-round losers have a separate bracket. Third-place match for semifinal losers when the main bracket has at least three rounds. |
| Swiss | 2–128 | 1–15 rounds, capped at field size minus one. Standings-based greedy pairing, alternating opponents where possible, win-point bye (lowest-ranked entrant without a prior bye where possible). |
| Pool-to-playoff | 2–128 | Seeded balanced pools of up to 2–16, round robin within each pool, same number of qualifiers per pool, automatic single-elimination playoffs. |
| Multiplayer placement | 2–128 | Balanced heats of up to 2–16, 1–30 rounds, custom points for each place, cumulative standings. |

- For pools and heats choose a size that leaves at least two entrants in each group. Pool qualification must provide at least two total playoff places. No guaranteed same-school or same-pool separation in playoff pairings. Uneven heat sizes use the same point scale; select evenly divisible field sizes for more uniform competition.
- Swiss: use **Generate next round** after every current pairing is complete. Pairing is a best-effort generic greedy algorithm, not a certified FIDE pairing implementation. Prior-round corrections remove all later pairings and their scores after confirmation. Pool and elimination corrections clear affected downstream results when advancing participants change.
- Choose standings tiebreakers for pool and Swiss: differential, wins, opponent points (Buchholz), or seed. Additional ties are resolved using secondary statistics and seed; a seed tiebreak is intentionally deterministic. Placement standings use points, first places, total of finishing positions, then seed. Placement results require every participant to have a unique place. No ties or DNF scoring in placement mode yet.
- The advanced bracket view distinguishes winner and loser advancement with solid/dashed links. Pools have separate standings tables and a playoff bracket. Match exports use one row per participant for multi-competitor compatibility. The generic consolation format is not a complete wrestling placement/wrestle-back ruleset.
- Double-elimination and consolation standings are match statistics, not official tournament placement. The championship is decided by the bracket.

## New in v0.4 — Scoreboard Studio

- Select a ready head-to-head match under **Scoreboard** or open it from the original match result dialog. Use Settings for eleven presets: general, basketball, soccer, wrestling, volleyball, esports, Smash Bros., hockey, board/tabletop, timed/low-score and custom. Optionally save the configuration as the division default. Applying new settings resets an existing draft only after confirmation.
- Set custom point increments, period count and labels, optional counter label, and countdown duration from 0 (untimed) to 120 minutes. Adjust scores manually, add/subtract points, and record cumulative period snapshots. Fouls and other counters are manual and cumulative.
- For volleyball or esports series, create a best-of-series division first. Award games/sets explicitly, record their point scores and undo the last award as needed. Only a completed valid series can be submitted as a score result. The engine retains its higher/lower-score and draw rules. Multiplayer placement heats continue to use the existing placement editor.
- Start, pause, adjust or reset the countdown. The deadline is stored with the draft so elapsed time is measured even if the screen is closed. Returning to a match restores its draft within the same browser storage origin. The clock does not end the match, change periods, or enforce official timing rules. System clock changes may affect the timer.
- Select Finish match, then confirm the actual result; nothing advances until accepted by the tournament engine. A pin or other ruling uses Decision; a forfeit uses Forfeit. Points for decisions/forfeits are retained in scoreboard details but excluded from numerical tournament standings. Finished scoreboards are read-only; corrections use the existing result editor. Changed results or participants invalidate stale scoreboard details. Reseeding an unplayed bracket discards drafts after warning.
- Open Spectator display for a larger read-only board; use Fullscreen and High contrast as needed. Configure automatic rotation across brackets, standings, ready matches and scoreboards. The display is local, not a shared live scoreboard or second-device feed.
- Export scoreboard details CSV from the Scoreboard tab, including draft/final status, points, counters, set results, period snapshots and notes. Event JSON includes scoreboards and defaults. v0.1–0.3 event backups remain supported. No login or network dependency.
- Presets are editable examples, not official rulebooks, certified timers or automated wrestling scoring systems. Verify durations and rules with your competition officials.

## New in v0.5 — Event Operations

- Select **Event director** from any tournament. Create up to 128 named stations (mats, courts, tables, gaming stations or mixed types); rename or disable them while retaining assignment history. The dashboard shows active stations, pending matches and totals across divisions.
- Assign any ready match to a station, optionally enter a local date/time and estimated duration, and use Call, Start and Release. Open match launches Scoreboard Studio or the placement/result editor. Finalizing a result in the tournament releases the station automatically, and records the actual finish time if the match was explicitly started. Opening a scoreboard does not itself start a station. Release returns the match to the queue without modifying its score and clears its current start time.
- Auto-fill is a conservative, ready-match dispatcher: one queued/active match per otherwise unused enabled station, no conflicting bookings, no absent entrants, and configured check-in/rest checks. It is not a complete tournament schedule optimizer. Manual assignments can queue multiple matches and flag estimated overlaps; actual rest checks depend on recorded starts and finishes. Active overlapping stations or participants are blocked even with override. Other warnings can be explicitly overridden by the organizer. Conflicts identify entrants across divisions by normalized name and organization, or team member names and team organization; identical names may be false positives, and spelling or organization differences may hide matches. Always verify scheduling and safety requirements independently.
- **Check-in** stores attendance per division entry, with school/name search, division filters, paginated results, bulk marking and CSV export. It does not automatically forfeit absent competitors. The optional check-in requirement is enforced for auto-fill and warns before manual start, with explicit organizer override.
- **Match call board** lists all divisions, filters by status, searches names and school, and sorts called, active and queued matches before unassigned matches. Announcer display is read-only in this local UI, with paginated projector layouts, high contrast and fullscreen. Automatic rotation can include the call board and school standings once per event cycle, advancing their pages before switching views. No internet feed, second-device sync or authentication yet.
- **School standings** combines match wins, draws, losses and division champions using configurable win/draw/champion points. Only actual recorded results count (no bye credit); in placement heats, first place counts as a win, all other placements as losses. The standings are intentionally generic and not official wrestling team/advancement/placement scoring. The display groups school/organization labels case-insensitively; blank labels are Unaffiliated.
- Corrections that change match participants, remove pairings or clear a completed result flag affected assignments for review and free their stations; discard/reassign these entries explicitly. A corrected final result with the same participants retains station history. Displayed division/match numbers are based on current ordering, not permanent external event numbers.
- Export event schedule, check-in and school standings CSVs separately. Event JSON includes stations, assignments, attendance and event scoring settings; the same local-storage key and older backup support are retained. For security, use fictional names in public demos. Local spectator views do not constitute privacy controls.
- **15-school sample** on the home page creates a fictional exhibition with 14 divisions, 210 entrants and six mats. It demonstrates large-event operations, not regulation wrestling brackets.

## Current limits and decisions
- Seeded single elimination: 2–256 competitors per division. Round robin: 2–64 competitors per division. Up to 128 divisions per event, subject to browser storage capacity. The application is designed to handle many divisions, but full simultaneous maximum-size events have not been load-tested.
- Teams generated from a list use the smallest number of teams needed to stay at or below the requested size, with team sizes balanced. Roster Studio also supports skill-balanced and school-spread teams, manual member moves and editable seed order. Reseeding an existing draw is allowed only before a score is recorded; it rebuilds the matches.
- The round-robin ranking is points, wins, score differential (direction follows score mode), then original seed. Forfeits/decisions do not contribute numerical score differential. This is a generic ranking, not a governing-body rule set.
- Results support higher/lower scores, best-of series, forfeits and judge/tiebreak decisions. Sport-specific scoreboard presets, periods, sets and timers are available in Scoreboard Studio, and event-wide mat assignments and generic school standings are now available. Governing-body rule automation remains deferred.
- Browser local storage is not a backup, is not synchronized across tabs/devices, and is not encrypted by this app. Export frequently and avoid private student information unless authorized by district policy. Use fictional names for testing.
- Spectator rotation can show brackets, standings, ready matches, scoreboards, event call boards and school standings, with individually selectable views. It is local, not live across devices.
- Printing is best for match lists and standings; large brackets may clip on paper. CSV results are complete.

## Verification
`node test-operations.js` runs 27 new tests for ready-match scheduling, station capacity, attendance, duplicate booking protection, rest checks, release, result correction, generic organization standings, backup validation and a 15-school event. All 223 engine scenarios passed (196 existing + 27 new). Chromium DOM tests with simulated localStorage covered the sample event, call/start, scoreboard completion and station release, auto-fill, check-in, settings, spectator rotation, contrast, backup import and reload. Earlier Scoreboard Studio browser checks also passed in v0.5. Real device storage and downloads still need verification.

`node test-scoreboard.js` runs 40 additional scenarios for settings, draft validation, clock arithmetic, period snapshots, set awards, undo, result validation and correction invalidation. All 196 automated engine scenarios passed (34 + 39 + 83 + 40). v0.4 Chromium regression and scoreboard interface tests covered points/counters, series confirmation, countdown, simulated storage restoration, scoreboard export/import, corrections, rotation settings and high contrast. Direct file and localhost navigation were blocked, so real device persistence and downloads remain unverified.

`node test-advanced.js` runs 83 advanced scenarios including complete double-elimination fields through 256 entrants, both grand-final outcomes, byes, placement results, Swiss regeneration, pool corrections and v0.2 backup compatibility. `node test-engine.js` runs 34 original scenarios. `node test-roster.js` runs 39 new roster scenarios, including 2,048 entries, 15-school grouping, CSV round trips, and reseeding safeguards. All 156 engine and roster scenarios passed. v0.3 Chromium DOM tests also covered seven sample divisions, double-elimination scoring, Swiss round generation, pool standings, duplicate placement rejection, custom points, broadcast mode, JSON event import using captured export payload, and roster-to-Swiss reseeding. Chromium DOM integration tests with simulated localStorage exercised filtering, balanced teams, renaming, member moves, seed reordering, tournament creation, score entry, reseed protection, and JSON roster import using the captured export payload. Direct file navigation was blocked in the test environment; actual browser persistence and downloading need device-level verification.

## Files
- `index.html`: application shell
- `styles.css`: responsive interface and high contrast / print styles
- `engine.js`: tournament data, pairing, advancement, result validation, rankings
- `app.js`: organizer, roster, local saving, import/export and broadcast interface
- `roster-engine.js`: parsing, team assignment and reseeding
- `roster-studio.js`: roster library and team preparation UI
- `advanced-ui.js`: format controls, advanced brackets, heat results and standings
- `scoreboard-engine.js` and `scoreboard-ui.js`: scoreboard state, timers, presets and control/display views
- `operations-engine.js` and `operations-ui.js`: event scheduling, attendance, organization standings and director/announcer UI
- `reports-engine.js` and `reports-ui.js`: reporting, templates, archives and printing
- `test-reports.js`: optional reports tests
- `test-operations.js`: optional event operations tests
- `test-scoreboard.js`: optional scoreboard-engine tests
- `test-engine.js`, `test-roster.js`, `test-advanced.js`, `test-legacy-backup.json`: optional developer tests, not needed to run the browser app

The data model separates events, divisions, participant IDs, match IDs, results and source links. Shared data and public/private permissions are intentionally deferred until a later release.
