.PHONY: invalidate deploy-function

AWS_PROFILE ?= codevider
DISTRIBUTION_ID ?= E3NYUOXYEYF2O2
FUNCTION_NAME ?= codevider-rewrite
FUNCTION_FILE ?= aws/cloudfront-rewrite.js
FUNCTION_COMMENT ?= canonical redirects + static export index rewrite

invalidate:
	echo "**** Invalidating ****"
	aws cloudfront create-invalidation \
	--profile $(AWS_PROFILE) \
	--distribution-id $(DISTRIBUTION_ID) \
	--paths "/*"

# Create or update the CloudFront viewer-request function and publish it to LIVE.
# One-time only: associate the published function with the distribution's
# Default (*) behavior as a "Viewer request" function in the CloudFront console.
deploy-function:
	@echo "**** Publishing CloudFront function $(FUNCTION_NAME) ****"
	@ETAG=$$(aws cloudfront describe-function --profile $(AWS_PROFILE) \
		--name $(FUNCTION_NAME) --query 'ETag' --output text 2>/dev/null); \
	if [ -z "$$ETAG" ]; then \
		echo "Creating function..."; \
		aws cloudfront create-function --profile $(AWS_PROFILE) \
			--name $(FUNCTION_NAME) \
			--function-config Comment="$(FUNCTION_COMMENT)",Runtime=cloudfront-js-2.0 \
			--function-code fileb://$(FUNCTION_FILE); \
	else \
		echo "Updating function ($$ETAG)..."; \
		aws cloudfront update-function --profile $(AWS_PROFILE) \
			--name $(FUNCTION_NAME) --if-match $$ETAG \
			--function-config Comment="$(FUNCTION_COMMENT)",Runtime=cloudfront-js-2.0 \
			--function-code fileb://$(FUNCTION_FILE); \
	fi; \
	ETAG=$$(aws cloudfront describe-function --profile $(AWS_PROFILE) \
		--name $(FUNCTION_NAME) --query 'ETag' --output text); \
	echo "Publishing ($$ETAG)..."; \
	aws cloudfront publish-function --profile $(AWS_PROFILE) \
		--name $(FUNCTION_NAME) --if-match $$ETAG
