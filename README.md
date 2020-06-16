# Onboarding Project

A React frontend with a Rails backend.

## Setup

To run the server, run the following command:

```bash
make up
```

Alternatively, you can build with:

```bash
make build
```

Run `make help` for additional commands. After, visit `localhost:3000` to view the application. The mounted volumes:

```bash
volumes:
    - .:/app
    - /app/node_modules
```

allow for updates using webpacker.

## Tests

### Specs

You can run specs locally by running `rspec`, otherwise run them using docker with `make spec`.
