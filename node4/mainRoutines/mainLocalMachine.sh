docker run -t -d --name=alpineId1 alpine

# docker ps

# docker commit [containerID] [newImagename]
# docker save [Imagename] > [.tar file]    ex docker save alpine > /tmp/alpine.tar
# docker load < /tmp/alpine.tar
