xword-api:
	go run api/cmd-server/main.go --port 7000
startdb:
	mysql.server start
initdb:
	
