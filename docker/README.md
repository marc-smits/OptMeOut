# Info

This folder contains the files to execute the pyhton file build.py by a python command in a docker container.

# Installation

## Create image

### Delete existing image

First you need to check if you already have image by the command below.

`docker images | grep 'img_opt_me_out_template_builder`

If you see the results below you need to delete the existing image. Other you can skip the paragraph Create image

```
img_opt_me_out_template_builder   latest      015677c2100f   6 weeks ago    1.02GB
```

Delete the by the command image below by adding the id of the image. (in this case see above it is 015677c2100f)

`docker rmi -f IMAGE_ID`

### Create image

Build image by runnic the command below in this folde.

`docker image build -t img_opt_me_out_template_builder   -f DockerfileBuild .`

You should see a log like below:
```
DockerfileBuild .
[+] Building 22.8s (7/7) FINISHED                                                                              docker:default
 => [internal] load build definition from DockerfileBuild                                                                0.0s
 => => transferring dockerfile: 319B                                                                                     0.0s
 => [internal] load metadata for docker.io/library/python:latest                                                         2.5s
 => [auth] library/python:pull token for registry-1.docker.io                                                            0.0s
 => [internal] load .dockerignore                                                                                        0.0s
 => => transferring context: 2B                                                                                          0.0s
 => [1/2] FROM docker.io/library/python:latest@sha256:4ea77121eab13d9e71f2783d7505f5655b25bb7b2c263e8020aae3b555dbc0b2  19.7s
 => => resolve docker.io/library/python:latest@sha256:4ea77121eab13d9e71f2783d7505f5655b25bb7b2c263e8020aae3b555dbc0b2   0.0s
 => => sha256:4ea77121eab13d9e71f2783d7505f5655b25bb7b2c263e8020aae3b555dbc0b2 9.72kB / 9.72kB                           0.0s
 => => sha256:ebed137c7c18cb1906fb8314eabc10611ddf49a281f8c1b5eab987a7137f749f 48.49MB / 48.49MB                         4.7s
 => => sha256:0a0704ac83aa7b896a68b710c24f9502bbae87d32e6c7ef6148ce6a60ce05260 2.32kB / 2.32kB                           0.0s
 => => sha256:4bbf6d52fe8de40e9e20b1453e14abb40eb1c73cd1d2b22e8ed015ad0817a088 6.32kB / 6.32kB                           0.0s
 => => sha256:c2e76af9483f2d17a3e370639403df2c53a3da1480d533116a8694cd91f15d5a 24.02MB / 24.02MB                         3.1s
 => => sha256:37f838b71c6b82c581b7543a313255b8c99c23cc9d96c1ad6f9f5f208c942553 64.40MB / 64.40MB                         4.8s
 => => sha256:873a4c80287477653c01b20948fc34bb1bacf0f826bcc2ddc3bd2fe25b342d45 211.36MB / 211.36MB                      10.4s
 => => sha256:51f8af1d7d3684de02ae52f1fdb31d31896fa310a1cf513df28496c0f688f7b2 6.16MB / 6.16MB                           5.7s
 => => extracting sha256:ebed137c7c18cb1906fb8314eabc10611ddf49a281f8c1b5eab987a7137f749f                                2.3s
 => => sha256:2effe4ca65f9da22b12c754df4a7dc92bb71be7cb4cb707918d515f01427fca0 27.39MB / 27.39MB                         7.0s
 => => sha256:e5af76e56a46c7426d79407979c3b60bb16cd18f9fc51fc57b67dcddb3456518 250B / 250B                               6.3s
 => => extracting sha256:c2e76af9483f2d17a3e370639403df2c53a3da1480d533116a8694cd91f15d5a                                0.7s
 => => extracting sha256:37f838b71c6b82c581b7543a313255b8c99c23cc9d96c1ad6f9f5f208c942553                                3.0s
 => => extracting sha256:873a4c80287477653c01b20948fc34bb1bacf0f826bcc2ddc3bd2fe25b342d45                                6.8s
 => => extracting sha256:51f8af1d7d3684de02ae52f1fdb31d31896fa310a1cf513df28496c0f688f7b2                                0.3s
 => => extracting sha256:2effe4ca65f9da22b12c754df4a7dc92bb71be7cb4cb707918d515f01427fca0                                0.9s
 => => extracting sha256:e5af76e56a46c7426d79407979c3b60bb16cd18f9fc51fc57b67dcddb3456518                                0.0s
 => [2/2] WORKDIR /usr/app/src                                                                                           0.3s
 => exporting to image                                                                                                   0.1s
 => => exporting layers                                                                                                  0.0s
 => => writing image sha256:2d14ea1ce55d6594d446325930070d3bbfc42dac94ceedd16701369c9f77aaff                             0.0s
 => => naming to docker.io/library/img_opt_me_out_template_builder                                                       0.0s

``` 

# Run


In the folder scripts we have a `scripts`  a script `build.sh` to run the command to build the templates.

First you need to make the script executable by the command
`chmod a+x scripts/build.sh`

Now you can build the templates by the command:

`./scripts/build.sh`
