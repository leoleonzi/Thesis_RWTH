A. Steps to run container nodes:
    docker-compose build
    docker-compose run nodeX
        username: admin
        password:admin

B. CONECT TO THE NODE WITH OTHER TERMINAL:
ssh admin@10.5.0.5 -p 22

C. COMMIT, SAVE AND DEPLOY A MODIFIED DOCKER IMAGE
docker commit [containerID] [newImagename]
docker save [Imagename] > [.tar file]    ex docker save alpine-leo > /tmp/alpine.tar
docker load < /tmp/alpine.tar

D. IMPORTANT: CONFIGURATION /etc/docker/daemon.js to run sysbox:
    paste "default-runtime":"sysbox-runc",    in the beginning. and then:
    sudo systemctl restart docker
    sudo systemctl restart sysbox.service

E. useful commands:

E.1. Transfer files via http request:
    server:
        node http_server.js rio.jpg
    client:
        node http_client.js 10.5.0.5 rio.jpg

E.2. shell:
    whoami (shows the logged in user)
    scp file.txt root@IP-address:/home/root
    passwd (changes password of root)
    echo <password> | sudo -S poweroff


E.3. docker-compose:
    docker-compose down
    docker-compose build
    docker-compose run node1 sh

    docker-compose run -p 3000:3000 node1 sh   (runs the app described on docker-compose.yml, running the command sh (shell))
    
    #install docker-compose
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose


E.4. nodeJS general:
    command line arguments:
    you can use process.argv array



E.5. sysbox:
    docker run --runtime=sysbox-runc -it nestybox/ubuntu-bionic-systemd-docker
    docker run --runtime=sysbox-runc -it nestybox/alpine-docker
    docker run --runtime=sysbox-runc nestybox/alpine-docker

    sudo systemctl restart sysbox


E.6. docker:
    -- execute many shells in the same container
    docker exec -it <container> bash
    docker run --runtime=sysbox-runc -P -d(detach: run in the background)
    
    
    
    
    
