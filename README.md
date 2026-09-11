# build-pokedex

An interactive command-line Pokedex application built with TypeScript and Node.js. It simulates the experience of a Pokémon trainer's Pokedex: browse regions, explore locations, catch Pokémon, inspect their stats, and keep a personal collection — all powered by [PokeAPI](https://pokeapi.co/api/v2).

## What This Project Does

`build-pokedex` is a REPL-style (Read-Eval-Print Loop) CLI tool. You type commands at a `Pokedex >` prompt and the app fetches live data from PokeAPI to let you:

- Browse the world map of Pokémon regions/locations
- Explore which Pokémon appear in a specific location
- Attempt to catch a Pokémon (with a probability based on its base experience)
- Inspect stats of Pokémon you've caught
- View your full collection (Pokedex)

It also implements an in-memory caching layer to reduce redundant network calls to PokeAPI, with automatic periodic cleanup of expired cache entries.

## Tech Stack

- **TypeScript** (`^7.0.2`) — strict mode enabled (`strict: true`), targeting `esnext` / `nodenext` (see `tsconfig.json`)
- **Node.js** `22.15.0` (pinned via `.nvmrc`), using native ES Modules (`"type": "module"` in `package.json`)
- **@types/node** (`^26.1.1`) — Node.js type definitions
- **Vitest** (`^4.1.10`) — unit testing framework
- **Node's built-in `readline` module** — powers the REPL input/output loop
- **PokeAPI** (`https://pokeapi.co/api/v2`) — external REST API, queried via `fetch`

## Project Structure

```
build-pokedex/
├── src/
│   ├── main.ts            # Entry point: initializes state and starts the REPL
│   ├── repl.ts             # REPL loop, input cleaning (cleanInput), command dispatch
│   ├── repl.test.ts        # Unit tests for cleanInput
│   ├── state.ts             # Application state (State object)
│   ├── commands.ts          # Registers and implements all CLI commands
│   ├── pokeapi.ts           # PokeAPI client (fetches locations, Pokémon data, caching config)
│   ├── pokecache.ts         # Cache class implementation + expiry/reap loop
│   └── cacheTest.test.ts    # Unit tests for the cache
├── tsconfig.json
├── package.json
└── .nvmrc
```

## Application State (`src/state.ts`)

App state is managed through a single `State` object containing:

- A reference to the `PokeAPI` client
- Pagination cursors for browsing locations: `nextLocationsURL` and `prevLocationsURL`
- The `readline` interface for input/output
- A `commands` dictionary mapping command names to their handlers
- A `pokedex` — a `Record<string, PokeInfo>` storing every Pokémon you've caught

## Caching System (`src/pokecache.ts` & `src/pokeapi.ts`)

- A `Cache` class stores API responses in a `Map<string, CacheEntry>` to avoid repeating identical requests to PokeAPI.
- The cache runs an automatic **reap loop** on a timer that removes expired entries.
- Default expiry (configured inside the `PokeAPI` class) is **1 hour** (3,600,000 ms).

## REPL & Input Handling (`src/repl.ts` & `src/main.ts`)

- `src/main.ts` initializes the app state and calls `startREPL`.
- `src/repl.ts` contains `cleanInput`, which normalizes raw user input: lowercases it, trims/collapses extra whitespace, and splits it into an array of words for command matching.

## Available Commands

Registered in `src/commands.ts`:

| Command | Description |
|---|---|
| `help` | Shows a welcome message and lists all available commands with a short description |
| `exit` | Closes the Pokedex interface and exits the program |
| `map` | Shows the next 20 Pokémon locations (paginates forward) |
| `mapb` | Shows the previous 20 Pokémon locations (paginates backward) |
| `explore <location>` | Lists Pokémon encounterable in a given location (e.g. `pastoria-city-area`) |
| `catch <pokemon>` | Attempts to catch a Pokémon; success probability = `1 - base_experience / 500`. On success, it's added to your Pokedex |
| `inspect <pokemon>` | Shows details of a caught Pokémon: name, height, weight, stats, and types |
| `pokedex` | Lists all Pokémon you've caught so far |

## Scripts (`package.json`)

| Script | What it does |
|---|---|
| `npm run build` | Compiles TypeScript to JavaScript into the `dist/` folder |
| `npm start` | Runs the compiled app (`dist/main.js`) |
| `npm run dev` | Builds and runs the app in one step |
| `npm test` | Runs all unit tests once via Vitest (`vitest --run`) |

## Setup & Usage

### Requirements
- Node.js `22.15.0` (use `nvm use` if you have `.nvmrc` support)

### Install & Run

```bash
npm install
npm run build
npm start
```

Or, for development:

```bash
npm run dev
```

### Example Session

```
Pokedex > help
Pokedex > map
Pokedex > explore pastoria-city-area
Pokedex > catch pikachu
Pokedex > inspect pikachu
Pokedex > pokedex
Pokedex > exit
```

## Testing

Run all tests with:

```bash
npm test
```

### `src/repl.test.ts`

Verifies that `cleanInput` correctly normalizes user input into a clean array of words. Covered cases:

1. **Trimming excess whitespace** — e.g. `" hello world "` → `["hello", "world"]`
2. **Lowercasing input** — e.g. `"PIKACHU"` → `["pikachu"]`
3. **Combining whitespace-trimming and lowercasing with real commands** — e.g. `" catch pikachu "` → `["catch", "pikachu"]`

Each test case asserts two things:
- The resulting array has the expected length (`toHaveLength`)
- Each word in the array exactly matches the expected value at that position (`toBe`)

### `src/cacheTest.test.ts`

Verifies the cache's behavior: adding and retrieving entries, and confirming that entries are automatically removed once their expiry time has passed.
