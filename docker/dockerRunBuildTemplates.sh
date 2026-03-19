#!/bin/bash
CODE_PATH="/home/tuulia/gitRepos/opt_me_out/OptMeOut/"
printf "\n-----------------------\n\n Mounting Python files from $CODE_PATH \n\n-----------------------\n"
docker rm opt_me_out_template_builder; docker run  --name opt_me_out_template_builder  --privileged=true  -v $CODE_PATH:/usr/app/src  img_opt_me_out_template_builder