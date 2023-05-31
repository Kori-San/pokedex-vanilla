# Parameters
PROJECT_NAME = pokedex

# Variables
BUILD_TAG = $(PROJECT_NAME):latest
CONTAINER_NAME = $(PROJECT_NAME)
HTTPS_PORT = 443
HTTP_PORT = 80

# PHONY Rule
.PHONY: all start build stop clean install lint fix test rebuild reload restart ngrok

# Rules
all: start 

start:
	@echo "$(PROJECT_NAME): Starting '$(CONTAINER_NAME)'"
	@docker start $(CONTAINER_NAME) > /dev/null
	@echo "$(PROJECT_NAME): Server Up and Running on 'http://localhost:$(HTTP_PORT)' and 'https://localhost:$(HTTPS_PORT)'."

build:
	@echo "$(PROJECT_NAME): Building '$(BUILD_TAG)'"

	@echo ""
	@docker build -t $(BUILD_TAG) .
	@echo ""
	
	@echo "$(PROJECT_NAME): Creating Image '$(CONTAINER_NAME)'"
	@docker create -p $(HTTPS_PORT):443 -p $(HTTP_PORT):80 --name $(CONTAINER_NAME) $(BUILD_TAG) > /dev/null

stop:
	@echo "$(PROJECT_NAME): Stopping '$(CONTAINER_NAME)'"
	@docker stop $(CONTAINER_NAME) > /dev/null

clean:
	@echo "$(PROJECT_NAME): Removing '$(CONTAINER_NAME)'"
	@docker rm $(CONTAINER_NAME) > /dev/null
	@$(RM) -vfr ./node_modules

install:
	@npm install
	@npm fund

lint:
	@npx eslint . --config .eslintrc.yml

fix:
	@npx eslint . --config .eslintrc.yml --fix

test:
	@npx cypress run

restart: stop start

rebuild: clean build

reload: stop clean build start

ngrok:
	@echo "$(PROJECT_NAME): Launching ngrok's server listening on port '$(HTTPS_PORT)'"
	@./bin/ngrok http $(HTTPS_PORT)
