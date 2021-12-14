# Forms Kitchen Test

A great exercise from Forms Kitchen

## Prerequisites for this example (just for testing and develop proposes)

1. A linux server (Ubuntu 20.04 LTS)
2. Docker
3. Express
4. MySQL

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

sudo chmod +x /usr/local/bin/docker-compose

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)