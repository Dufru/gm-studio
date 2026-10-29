# GM Studio — Requirements

## 1. Purpose

GM Studio is an open-source desktop application designed to help tabletop RPG Game Masters prepare, organize, and run campaigns from a single workspace.

## 2. Core Principles

- Local-first: campaign data is stored on the user's computer.
- Reliability: autosave and backups help protect user data.
- Customization: users can arrange panels and save workspace layouts.
- Privacy: private campaign notes and secrets must remain under the user's control.
- Accessibility: the interface should be clear, consistent, and easy to navigate.
- Cross-platform: Windows and Linux are initial targets.
- Internationalization: the application should support multiple languages.

## 3. Functional Requirements

### Campaign Management
- Create, rename, open, and delete campaigns.
- Keep each campaign's data separate.
- Save campaign changes automatically.
- Support backups and restoration.

### Workspace
- Provide customizable panels and tabs.
- Allow users to resize and rearrange panels.
- Provide layout presets for preparation, gameplay, and reference.
- Allow custom layouts to be saved.

### Notes and References
- Create and organize notes and scripts.
- Support character sheets.
- Display PDF documents.
- Open external reference links.

### Visual Mind Map
- Create cards and connect them with arrows.
- Draw freely on the canvas.
- Add images and text.
- Support zoom, pan, undo, and redo.
- Link map elements to campaign content.

### Image Library
- Import and categorize images.
- Organize images using tags.
- Drag images into the mind map.
- Send selected images to authorized Discord text channels.
- Protect GM-only content from accidental sharing.

### Audio
- Import and organize music, ambience, and sound effects.
- Play multiple audio layers simultaneously.
- Control the volume of each layer independently.
- Provide quick controls for scenes and sound effects.
- Support audio fades and keyboard shortcuts.

### Discord Integration
- Connect to a Discord bot configured by the user.
- Play audio in an authorized voice channel.
- Send images to authorized text channels.
- Provide configuration through the application interface.
- Keep tokens and other secrets out of the source code.

## 4. Quality Requirements

- Keep the application responsive on modest hardware.
- Protect local data against accidental loss.
- Validate communication between application components.
- Avoid exposing secrets in logs or error messages.
- Provide clear error messages and configuration instructions.
- Test important features before releases.

## 5. Initial Development Strategy

Build a small working version first, validate its performance, and expand it incrementally.

The first milestone is a desktop application that launches reliably, displays its main interface, and can be developed and tested locally.

## 6. Scope Management

Features are planned goals, not promises that every feature will be available in the first release. Implementation priorities may change based on technical feasibility, performance, and testing.
