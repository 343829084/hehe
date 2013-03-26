TESTS = $(shell ls -S `find test -type f -name "*.js" -print`)
TESTTIMEOUT = 5000
MOCHA_OPTS =
REPORTER = spec
JSCOVERAGE = ./node_modules/.bin/jscover
PROJECT_DIR = $(shell pwd)
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.6` NODE_ENV=production npm install
NPM_INSTALL_TEST = PYTHON=`which python2.6` NODE_ENV=test npm install

install:
	@$(NPM_INSTALL_PRODUCTION)

test:
	@NODE_ENV=test node_modules/.bin/mocha \
		--reporter $(REPORTER) --timeout $(TESTTIMEOUT) $(MOCHA_OPTS) $(TESTS)

reinstall: clean
	@$(MAKE) install

cov:
	@rm -rf .cov
	@$(JSCOVERAGE) ---exclude=test . .cov
	@cp -rf ./node_modules ./test .cov

test-cov: cov
	@$(MAKE) -C .cov test REPORTER=dot
	@$(MAKE) -C .cov test REPORTER=html-cov > $(PROJECT_DIR)/coverage.html

clean:
	@rm -rf ./node_modules

.PHONY: test test-cov cov clean install reinstall
