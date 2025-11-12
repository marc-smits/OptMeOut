OPT_ME_OUT_PATH=${PWD/}
 echo $OPT_ME_OUT_PATH

 docker rm opt_me_out_template_builder; docker run  --name opt_me_out_template_builder  --privileged=true  -v $OPT_ME_OUT_PATH:/usr/app/src  img_opt_me_out_template_builder
