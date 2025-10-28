## Summary

TypeScript Telegram bot that tracks matcha availability and prices. Supports manual queries and scheduled updates.

## Tech

- **Runtime:** Node.js, TypeScript
- **APIs:** Telegram Bot API
- **Features:** Scraping, Scheduler, Notifications
- **Quality:** Vitest
- **DevOps:** Git, CI/CD

## Highlights

- `/subscribe`, `/unsubscribe`, `/matcha`, `/help` commands
- Scheduled scraping and diff-based alerts
- Polite scraping with caching and retries
- Durable subscriber registry

## Architecture

- Ports/adapters design
- Isolated secrets and config
- Retry logic on network errors
