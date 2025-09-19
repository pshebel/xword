Deployment Steps:
CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o main .
cp to /home/ec2-user
restart app