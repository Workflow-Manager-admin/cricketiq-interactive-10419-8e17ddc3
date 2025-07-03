#!/bin/bash
cd /home/kavia/workspace/code-generation/cricketiq-interactive-10419-8e17ddc3/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

