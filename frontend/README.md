
Web Deploy
npx expo export -p web
aws s3 sync ./dist s3://dev-xword --delete
aws cloudfront create-invalidation --distribution-id E3PCPNL7FPFEPP --paths "/*"