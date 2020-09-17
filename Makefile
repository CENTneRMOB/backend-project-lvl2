install: install-deps

start:
	node bin/gendiff.js

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test	

test-coverage:
	npm test -- --coverage --coverageProvider=v8