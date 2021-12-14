# Forms Kitchen Test

A great exercise from Forms Kitchen

------------------

# TL;DR

## Architecture
![alt text](https://raw.githubusercontent.com/getzonx/forms-kitchen-test/main/assets-db/images/architecture.png)

## Backend (GraphQL)
[http://forms.balero.digital:8080/graphql](http://forms.balero.digital:8080/graphql) just for testing `Query` and `Mutation`

## FrontEnd (Live Demo)
[http://forms.balero.digital](http://forms.balero.digital) with `Search`, `Create`, `Read`, `Update` & `Delete`

------------------

## Server prerequisites for this example (just for testing and develop proposes)

1. A linux server (Ubuntu 20.04 LTS)
2. Docker Engine
3. Docker Compose

### Configuring the linux server

1. Updating the OS from a clear installation with Ubuntu 20.04 LTS:
```bash
sudo apt update && sudo apt upgrade -y
```

2. Installing some packages to allow to `apt` tu use external repositories over HTTPS:
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

3. Add Docker's official GPG key:
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

4. Adding Docker repo to `apt` sources:
```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

5. Updating `apt` with Docker repo:
```bash
sudo apt update
```

5. Install Docker Engine with `apt` (Docker version 20.10.11, build dea9396 for this example):
```bash
sudo apt install docker-ce docker-ce-cli containerd.io
```

6. (Optional) Adding current user to the docker group for allowing non-privileged users to execute docker commands:
```bash
sudo usermod -aG docker ${USER}
```

7. Installing Docker Compose (v2.2.2):
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
```

8. Assign permissions
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

## Usage

1. Clone this repo
```bash
git clone https://github.com/getzonx/forms-kitchen-test.git
```

2. Access to folder
```bash
cd forms-kitchen-test
```

3. Run Docker Compose like service
```bash
docker-compose up --build -d
```

4. Done!, Enjoy at http://localhost or live demo http://forms.balero.digital

## License
[MIT](https://choosealicense.com/licenses/mit/)