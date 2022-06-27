how to run the asset with compose:

    docker-compose build
    DETACHED:
        docker-compose run -d --service-ports asset node app.js
        #docker-compose run -d --service-ports asset

    Iterative:
        docker-compose run --service-ports asset


#how to run the asset without compose:

 #   docker run -t -d -p 3000:3000 alpine sh

