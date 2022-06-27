const shell = require("shelljs")

shell.exec("docker ps")
shell.exec("docker run -t -d --name=assetId1 alpine sh")
shell.exec("apk add nodejs")



//  "docker exec -d alpineId1 touch /tmp/execWorks.txt"

// "docker commit [containerID] [newImagename]"
// "docker save [Imagename] > [.tar file]    ex docker save alpine > /tmp/alpine.tar"
// "docker load < /tmp/alpine.tar"
