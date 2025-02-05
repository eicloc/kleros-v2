#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Etherscan docs: https://docs.etherscan.io/api-endpoints/contracts#verifying-proxy-contract-using-curl

function verify() { #deploymentDir #explorerApiUrl #apiKey
    deploymentDir=$1
    explorerApiUrl=$2
    apiKey=$3
    echo "verifying proxies on $(basename $deploymentDir)"
    for f in $(ls -1 $deploymentDir/*_Proxy.json 2>/dev/null); do
        contractName=$(basename $f .json)
        address=$(cat $f | jq -r .address)
        echo -n "verifying $contractName as a proxy at $address... "
        curl -s \
            -d "address=$address" \
            "$explorerApiUrl?module=contract&action=verifyproxycontract&apikey=$apiKey"
        echo
    done
}

. $SCRIPT_DIR/../.env

verify "$SCRIPT_DIR/../deployments/arbitrumGoerliDevnet" "https://api-testnet.arbiscan.io/api" $ARBISCAN_API_KEY
echo
verify "$SCRIPT_DIR/../deployments/arbitrumGoerli" "https://api-testnet.arbiscan.io/api" $ARBISCAN_API_KEY
echo
verify "$SCRIPT_DIR/../deployments/arbitrum" "https://api.arbiscan.io/api" $ARBISCAN_API_KEY
