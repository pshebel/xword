build:
	# remove existing docker images
	@ if [ $(docker images | grep xword-ui) ]; then \
		@echo removing xword ui
		docker rmi 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-ui; \
	fi

	@ if [ $(docker images | grep xword-api) ]; then \
		@echo removing xword api
		docker rmi 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-api; \
	fi

	# build, tag, and push docker images
	@eval "eval $$\( aws ecr get-login --no-include-email --region us-east-1 \)"

	docker-compose -f ui/docker/docker-compose.yml build --no-cache
	docker tag xword-ui:latest 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-ui
	docker push 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-ui

	docker-compose -f api/docker/docker-compose.yml build --no-cache
	docker tag xword-api:latest 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-api
	docker push 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-api

