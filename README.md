# Pokedex in Vanilla JS
A Simple Pokedex using only Vanilla JS

The App is accessible → [here](https://pokedex-kori-san.vercel.app/).

# Quick start
```bash
make build start
```
You can then access the app via 'http://localhost' or 'https://localhost'

# Makefile Rules
- ***all*** - Execute the start rule.
- ***start*** - Start Pokedex's container. The container must be built before using the 'build' rule.
- ***build*** - Build the latest image for Pokedex and create a container.
- ***stop*** - Stop the container.
- ***clean*** - Remove the container.
- ***restart*** - Stop the container and start it again.
- ***rebuild*** - Remove the container, build the latest image for Pokedex and create a container.
- ***reload*** - Stop the container, remove it, build the latest image for Pokedex, create a container and start a the newly created container.
- ***ngrok*** - Start a secure http tunnel.
