# docker swarm init --advertise-addr 172.25.2.2
# docker swarm join-token manager

cd /home/app/fabric-samples/4host-swarm
./host1up.sh
./mychannelup.sh

