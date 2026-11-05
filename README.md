<img src="icon512.png" width="128" height="128" alt="Emberdeep icon: an orange cat with a flame between its ears">

# Emberdeep

A real-time top-down roguelite with 100 floors and 10 bosses. It runs in the browser, and everything lives in one file.

Play it at https://slopathon.github.io/emberdeep/

Pick a class in the Hearth, walk to The Deep, and go. Nothing saves between runs. Only your settings and cosmetics stick around.

## Classes

- Wizard, Controller: elements, zones and synergy chains
- Bow, Marksman: hold to draw, release in the sweet spot
- Rogue, Striker: build Edge up close and spend it before it fades
- Priest, Support: heals run on Faith, and Faith comes from landing hits
- Knight, Vanguard: the shield only stops what you are facing

## Animals

Pick an animal in the Looking Pool by the Hearth. It is free and you can switch at any time. Each one has one power on R, or the paw button on touch. Powers recharge on every new floor.

| Animal | Power | Effect | Cooldown |
|---|---|---|---|
| Cat | Nine Lives | 6s where you cannot drop below 1 health | 45s |
| Lion | Rage | 5s of 50% more damage, and you grow bigger | 30s |
| Bear | Thick Hide | 6s of taking 60% less damage while healing 20% of your health | 40s |
| Rabbit | Zoomies | 5s of 50% more speed with dashes refilling instantly | 30s |
| Fox | Vanish | 4s where regular foes lose track of you. Your next hit deals triple damage and ends it | 30s |
| Wolf | Howl | 6s of 30% faster attacks for you and allies within reach | 35s |
| Owl | Night Watch | 4s where every foe and foe shot moves at half speed | 40s |
| Turtle | Shell | 3s of no damage with shots bounced back, but you cannot move or attack. Dash, blink or a skill ends it | 30s |

## Controls

- WASD: move
- Mouse: aim, hold to attack
- 1 2 3 4: skills
- Space: dash
- Right click or Shift: blink
- F: potion
- R: animal power
- T: auto attack
- Tab: gear and powers
- Q and E: zoom
- Esc: pause
- E: use things in the Hearth
- V: ping (in a party)

Touch controls work on phones too.

## Dungeons

Each zone is one connected dungeon of 9 generated rooms followed by its boss. Rooms come from 30 layout archetypes with mirroring, rotation, size jitter, alcoves and zone props, built from a run seed so every player in a party gets the same dungeon. Two or three forks per zone let you pick between two rooms on the same floor. The map in the top right shows the zone, the room you are in, the forks and the boss.

## Co-op

Up to 5 players. Ring the Rally Bell in the Hearth to host a party or join one with a 5 letter code or a share link. Everyone walks around the Hearth together, picks a class at the stumps and readies up at The Deep. The run starts when everyone is ready. Nothing saves and everyone starts at level 1.

- The host's game runs the world. Everyone else sends inputs and sees the host's world at 15 snapshots a second, with their own movement predicted locally.
- Gold, gear, gems, potions and chests are instanced. Every player gets the full value of every drop for their own class and only sees their own loot. XP and level are shared.
- Power and gem picks happen at the door after a clear. The door waits until everyone has picked, or 20 seconds.
- Foe and boss health scale with party size. A party of one plays exactly like solo.
- Roles: Wizard hits mark foes as controlled, Rogue deals more to controlled, stunned or chilled foes, Bow sweet spot hits mark a foe so the whole party deals more to it, Priest heals reach nearby allies, Knight draws foes and its raised shield stops shots aimed at allies behind it.
- Animal powers run on the host. Howl reaches allies close by, Night Watch slows foes for the whole party, and foes look past a vanished fox to the next player.
- A downed player is revived by an ally standing close for 3 seconds, or returns at the next room. The run ends when everyone is down.
- If someone drops they have 5 seconds before their character leaves, and they can rejoin with the same code. If the host drops, the next player takes over and the room restarts from the last checkpoint.
- The Trial Stone stays solo.

## Relay

Co-op needs a small relay because GitHub Pages only serves static files. The relay is a Cloudflare Worker with one Durable Object per party in `server/`. It only forwards messages between players, caps parties at 5, caps message size, rate limits each connection, only accepts the allowed origins, closes idle parties and stores nothing.

Deploy it:

```bash
cd server
npx wrangler login
npx wrangler deploy
```

Then put the `wss://` address it prints into the `RELAY` constant near the top of the script in `index.html`, for example `const RELAY='wss://emberrelay.example.com'`. The live game uses `wss://emberrelay.pawfectaddons.net`. Without a relay the game plays solo and the Rally Bell says multiplayer is not set up. For testing you can also add `?relay=wss://...` to the page address.

Everyone in the Hearth shares one public channel on the relay (`/lobby`, up to 30 players), so players see each other walking around without being in a party. It sends position, name, class and cosmetics, and disconnects during runs or when the tab is hidden. Hosted parties are listed on the Rally Bell, and hosts can remove players. Players can opt out with "Hide me from the Hearth" in the Still Lantern settings, which also hides their party from the list.

## Dummy yard

A test area for the planned items, behind the Hooded Stranger in the Hearth. It has 75 items (15 per class), a damage meter, and dummies for single target, area, chaining, piercing, moving, armored, on kill, status, execute and incoming damage testing. Items only exist in the yard for now and are not balanced. The password check is only there to keep players out by accident, so it sits in the page source.

## Tests

```bash
cd tests
node run.mjs
```

This needs Node 20 or newer and Playwright with Chromium (`npm i playwright` then `npx playwright install chromium`). It runs everything in `tests/`: static checks, 200 seeds of generated rooms, solo regression, AFK checks, the relay, 5 player co-op through a local relay with and without added latency, failure cases, every animal power, phone layouts and performance. Run a single suite with `node run.mjs rooms`. Set `WRANGLER` to a wrangler binary to also test the real worker locally.

## Editing

There is no build step. Change `index.html` and refresh the page. Fonts load from Google Fonts, and the whole game is in that file. The icons, share image and web manifest sit beside it.

## Credits

Particle sprites are from [Particle Pack](https://kenney.nl/assets/particle-pack) by Kenney, under CC0.
