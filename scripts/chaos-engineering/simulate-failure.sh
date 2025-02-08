#!/bin/bash
# scripts/chaos-engineering/simulate-failure.sh
POD=$(kubectl get pods -l app=api -o jsonpath='{.items[0].metadata.name}')
echo "Simulating failure: Deleting pod $POD"
kubectl delete pod $POD
