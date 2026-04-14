# Build the image
docker build -t xword-builder .

# Create a temporary container to pull the binary out
docker create --name temp-container xword-builder
docker cp temp-container:/app/xword ./xword
docker rm temp-container

rm ~/projects/infra/scripts/xword/backend/service/xword
cp xword ~/projects/infra/scripts/xword/backend/service/xword