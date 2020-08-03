### init Docker

Check the Dockerfile to confirm your `MONGO_USER`, `MONGO_PASS` and `MONGO_URL` environments.

After that run `docker build -t palindrome-bff . && docker run -d --network=host palindrome-bff`

