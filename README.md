# Pokedex in Vanilla JS
[![Docker Image CI](https://github.com/Kori-San/pokedex-vanilla/actions/workflows/docker.yml/badge.svg)](https://github.com/Kori-San/pokedex-vanilla/actions/workflows/docker.yml) [![Makefile CI](https://github.com/Kori-San/pokedex-vanilla/actions/workflows/make.yml/badge.svg)](https://github.com/Kori-San/pokedex-vanilla/actions/workflows/make.yml)

A Simple Pokedex using only Vanilla JS

The App is accessible → [here](https://pokedex-kori-san.vercel.app/).

# Quick start
```bash
make build start
```
You can then access the app via 'http://localhost' or 'https://localhost'

# Makefile Rules
***all*** - Execute the start rule.
## Docker Rules
- ***start*** - Start Pokedex's container. The container must be built before using the 'build' rule.
- ***build*** - Build the latest image for Pokedex and create a container.
- ***stop*** - Stop the container.
- ***clean*** - Remove the container.
## Dev Rules
- ***install*** - Install all the nodes dev dependencies.
- ***test*** - Run the test suite. (DevDependencies Requiered)
- ***lint*** - Run the linter. (DevDependencies Requiered)
- ***fix*** - Run the linter and auto-fix what can be fixed. (DevDependencies Requiered)
- ***ngrok*** - Start a secure http tunnel.
## Composed Rules
- ***restart*** - Stop the container and start it again.
- ***rebuild*** - Remove the container, build the latest image for Pokedex and create a container.
- ***reload*** - Stop the container, remove it, build the latest image for Pokedex, create a container and start a the newly created container.
