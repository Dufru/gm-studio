# GM Studio — Architecture

## 1. Overview

GM Studio will be a cross-platform desktop application with a local-first architecture.

The application will be divided into independent components to make development, testing, and maintenance easier.

## 2. Planned Components

### Desktop Application
- Electron will provide the desktop application environment.
- React will build the user interface.
- TypeScript will provide type checking and help prevent common programming errors.
- Vite will support the frontend development workflow.

### Local Data
- SQLite stores structured information such as campaigns, notes, and settings.
- Files such as images, PDFs, and audio will be stored locally.
- Autosave and backup mechanisms will protect user data.

The desktop app currently uses Electron's built-in `node:sqlite` module for campaign metadata. The database lives in Electron's per-user `userData` directory and is accessed only by the main process. The preload exposes narrow, validated campaign operations to the renderer. Campaign notes, media, backups, and migrations remain future work.

### Discord and Audio Service
- Python will handle the Discord bot and selected background tasks.
- FFmpeg will be evaluated for audio processing and mixing.
- The desktop application will communicate with this service through a defined interface.

## 3. Security

- Application secrets must never be committed to the public repository.
- Discord tokens must be stored separately from source code.
- Communication between Electron components must be validated.
- External web content must not receive unrestricted access to the computer.
- Campaign data must be isolated appropriately.

## 4. Performance

The application must be tested on modest hardware.

Large images, audio playback, mind-map rendering, and background services should be evaluated for memory and CPU usage.

## 5. Cross-Platform Support

Windows and Linux are the initial targets.

Platform-specific behavior must be tested, and installation packages should be provided so end users do not need development tools.

## 6. Architecture Decisions

The desktop interface uses an in-memory tab and navigation history for the current run. Campaign metadata is stored in SQLite without an added database package. These choices establish the initial desktop workflow; larger data models and backup behavior will be validated before they are introduced.
