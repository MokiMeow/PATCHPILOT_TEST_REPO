#!/usr/bin/env bash
# Demo deploy script (intentionally contains a leaked-looking credential so the
# secret scanner has something to find). This is a FAKE token, not real.
set -e
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
export ACME_DEPLOY_TOKEN="ghp_demoFAKE1234567890abcdefghijklmnopqrst"
echo "deploying acme-checkout-api…"
