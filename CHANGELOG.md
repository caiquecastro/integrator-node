# CHANGELOG

## Version 0.7.0 - TBD

## Breaking Changes

- Deprecate dialect option on Database Adapter config in favor of client.

## Version 0.6.0 - 2019-07-07

### Features
- Postgres Driver for Database Adapter

## Fixes
- Remove potencial security vulnerabilities by updating the dependencies

## Version 0.5.1 - 2018-10-25

### Fixes
- Validate missing options for csv integration
- Insert batch into database by chunks to prevent query limit

## Version 0.5.0 - 2018-10-23

### Features
- MSSQL Driver for Database Adapter
- MySQL Driver for Database Adapter

### Chore
- Replace Travis by CircleCI

## Version 0.4.0 - 2018-10-21

### Features
- Http Adapter

### Fixes
- Validate config for Csv Adapter
- Validate config for Http Adapter
- Validate config for Database Adapter

## Version 0.3.0 - 2018-10-21

### Features
- Allow specify columns to fetch from source
- Csv Adapter

### Fixes
- Remove useNullAsDefault warnings from console

## Version 0.2.2 - 2018-10-21

### Fixes
- Add node shebang and add permission to run `cli.js`

## Version 0.2.1 - 2018-10-21

### Fixes
- Add bin entry on package.json

## Version 0.2.0 - 2018-10-21

### Features
- Database adapter

## Version 0.1.0 - 2018-10-21

### Chore
- Publish on NPM
